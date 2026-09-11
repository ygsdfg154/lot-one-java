package com.lotone.protocol.jt808.message;

import lombok.Data;

@Data
public class TerminalHeartbeat {
    public static final int MSG_ID = 0x0002;

    public static TerminalHeartbeat decode(byte[] body) {
        return new TerminalHeartbeat();
    }
}
