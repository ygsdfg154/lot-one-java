package com.lotone.protocol.jt808.message;

import lombok.Data;

@Data
public class QueryLocation {
    public static final int MSG_ID = 0x8201;

    public byte[] encode() {
        return new byte[0];
    }
}
