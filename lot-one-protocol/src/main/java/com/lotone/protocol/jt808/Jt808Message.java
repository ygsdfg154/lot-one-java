package com.lotone.protocol.jt808;

import lombok.Data;

@Data
public class Jt808Message {
    private Jt808Header header;
    private byte[] body;

    public Jt808Message() {
        this.header = new Jt808Header();
    }

    public int getMsgId() {
        return header.getMsgId();
    }
}
