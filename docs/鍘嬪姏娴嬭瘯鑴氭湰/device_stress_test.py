#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
IoT 设备压力测试脚本
模拟大量 JT808 设备连接和数据上报
"""

import socket
import struct
import time
import threading
import random
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed

GATEWAY_HOST = '127.0.0.1'
GATEWAY_PORT = 8083
DEVICE_COUNT = 100
REPORT_INTERVAL = 3
TEST_DURATION = 300

stats = {
    'total_connected': 0,
    'total_messages': 0,
    'total_bytes': 0,
    'failed_connections': 0,
    'failed_messages': 0,
    'start_time': None,
    'latencies': []
}
stats_lock = threading.Lock()


def bcc_check(data):
    bcc = 0
    for b in data:
        bcc ^= b
    return bcc


def build_jt808_message(msg_id, phone, serial, body):
    header = struct.pack('>HH', msg_id, len(body))
    phone_bcd = bytes([0] * 6)
    header += phone_bcd
    header += struct.pack('>H', serial)
    data = header + body
    bcc = bcc_check(data)
    packet = bytes([0x7E]) + data + bytes([bcc]) + bytes([0x7E])
    return packet


def build_location_body(lat, lng, speed, direction):
    body = struct.pack('>II', 0, 0)
    body += struct.pack('>I', int(lat * 1000000))
    body += struct.pack('>I', int(lng * 1000000))
    body += struct.pack('>H', 50)
    body += struct.pack('>H', int(speed * 10))
    body += struct.pack('>H', direction)
    body += bytes([0x24, 0x09, 0x01, 0x12, 0x00, 0x00])
    return body


def build_register_body():
    body = struct.pack('>HH', 0, 0)
    body += b'12345'
    body += b'Model001' + bytes([0] * 13)
    body += b'1234567'
    body += bytes([1])
    body += b'TEST001'
    return body


def build_auth_body():
    return b'123456'


class DeviceSimulator:
    def __init__(self, device_id, phone):
        self.device_id = device_id
        self.phone = phone
        self.sock = None
        self.serial = 0
        self.lat = 30.5 + random.uniform(-0.1, 0.1)
        self.lng = 114.3 + random.uniform(-0.1, 0.1)
        self.speed = random.uniform(0, 80)
        self.direction = random.randint(0, 359)
        self.connected = False
        self.running = False

    def connect(self):
        try:
            self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            self.sock.settimeout(10)
            self.sock.connect((GATEWAY_HOST, GATEWAY_PORT))
            self.connected = True
            with stats_lock:
                stats['total_connected'] += 1
            return True
        except Exception as e:
            with stats_lock:
                stats['failed_connections'] += 1
            return False

    def register(self):
        self.serial += 1
        body = build_register_body()
        packet = build_jt808_message(0x0100, self.phone, self.serial, body)
        return self.send(packet)

    def auth(self):
        self.serial += 1
        body = build_auth_body()
        packet = build_jt808_message(0x0102, self.phone, self.serial, body)
        return self.send(packet)

    def report_location(self):
        self.serial += 1
        self.lat += random.uniform(-0.001, 0.001)
        self.lng += random.uniform(-0.001, 0.001)
        self.speed = max(0, min(120, self.speed + random.uniform(-5, 5)))
        self.direction = (self.direction + random.randint(-10, 10)) % 360
        body = build_location_body(self.lat, self.lng, self.speed, self.direction)
        packet = build_jt808_message(0x0200, self.phone, self.serial, body)
        return self.send(packet)

    def send(self, data):
        if not self.connected:
            return False
        start = time.time()
        try:
            self.sock.sendall(data)
            latency = (time.time() - start) * 1000
            with stats_lock:
                stats['total_messages'] += 1
                stats['total_bytes'] += len(data)
                stats['latencies'].append(latency)
            try:
                self.sock.setblocking(False)
                self.sock.recv(1024)
                self.sock.setblocking(True)
            except:
                self.sock.setblocking(True)
            return True
        except Exception as e:
            with stats_lock:
                stats['failed_messages'] += 1
            self.connected = False
            return False

    def run(self):
        self.running = True
        if not self.connect():
            return
        time.sleep(random.uniform(0.1, 0.5))
        self.register()
        time.sleep(0.2)
        self.auth()
        time.sleep(0.2)
        end_time = time.time() + TEST_DURATION
        while self.running and time.time() < end_time:
            if not self.connected:
                if not self.connect():
                    time.sleep(5)
                    continue
                self.register()
                time.sleep(0.2)
                self.auth()
            self.report_location()
            time.sleep(REPORT_INTERVAL)
        if self.sock:
            self.sock.close()


def print_stats():
    with stats_lock:
        elapsed = time.time() - stats['start_time'] if stats['start_time'] else 0
        msg_rate = stats['total_messages'] / elapsed if elapsed > 0 else 0
        byte_rate = stats['total_bytes'] / elapsed if elapsed > 0 else 0
        latencies = stats['latencies'][-1000:]
        avg_latency = sum(latencies) / len(latencies) if latencies else 0
        max_latency = max(latencies) if latencies else 0
        print(f"\n{'='*60}")
        print(f"  压力测试统计")
        print(f"{'='*60}")
        print(f"  运行时长:       {elapsed:.1f} 秒")
        print(f"  设备连接数:     {stats['total_connected']} / {DEVICE_COUNT}")
        print(f"  连接失败数:     {stats['failed_connections']}")
        print(f"  消息总数:       {stats['total_messages']:,}")
        print(f"  消息发送速率:   {msg_rate:.1f} 条/秒")
        print(f"  数据总量:       {stats['total_bytes'] / 1024 / 1024:.2f} MB")
        print(f"  数据发送速率:   {byte_rate / 1024:.1f} KB/s")
        print(f"  消息失败数:     {stats['failed_messages']}")
        print(f"  平均延迟:       {avg_latency:.2f} ms")
        print(f"  最大延迟:       {max_latency:.2f} ms")
        print(f"{'='*60}\n")


def main():
    global DEVICE_COUNT, TEST_DURATION, REPORT_INTERVAL
    if len(sys.argv) > 1:
        DEVICE_COUNT = int(sys.argv[1])
    if len(sys.argv) > 2:
        TEST_DURATION = int(sys.argv[2])
    if len(sys.argv) > 3:
        REPORT_INTERVAL = int(sys.argv[3])

    print(f"{'='*60}")
    print(f"  IoT 设备压力测试")
    print(f"{'='*60}")
    print(f"  网关地址:       {GATEWAY_HOST}:{GATEWAY_PORT}")
    print(f"  设备数量:       {DEVICE_COUNT}")
    print(f"  上报间隔:       {REPORT_INTERVAL} 秒")
    print(f"  测试时长:       {TEST_DURATION} 秒")
    print(f"{'='*60}\n")

    stats['start_time'] = time.time()

    def stats_printer():
        while True:
            time.sleep(10)
            print_stats()

    stats_thread = threading.Thread(target=stats_printer, daemon=True)
    stats_thread.start()

    devices = []
    for i in range(DEVICE_COUNT):
        phone = f'138{str(i).zfill(8)}'
        device = DeviceSimulator(f'DEV{str(i).zfill(6)}', phone)
        devices.append(device)

    print(f"启动 {DEVICE_COUNT} 个设备模拟器...")

    with ThreadPoolExecutor(max_workers=min(DEVICE_COUNT, 200)) as executor:
        futures = [executor.submit(device.run) for device in devices]
        for future in as_completed(futures):
            try:
                future.result()
            except Exception as e:
                print(f"设备异常: {e}")

    print("\n测试完成！")
    print_stats()


if __name__ == '__main__':
    main()
