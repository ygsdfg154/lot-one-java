package com.lotone.protocol.jt808;

import lombok.Data;

@Data
public class Jt808Header {
    private int msgId;
    private int msgBodyProps;
    private String terminalPhone;
    private int msgSerialNo;
    private int totalPackage;
    private int packageIndex;

    public int getMsgBodyLength() {
        return msgBodyProps & 0x3FF;
    }

    public boolean isSubpackage() {
        return (msgBodyProps & 0x2000) >> 13 == 1;
    }

    public int getEncryptionType() {
        return (msgBodyProps & 0x1C00) >> 10;
    }
}
