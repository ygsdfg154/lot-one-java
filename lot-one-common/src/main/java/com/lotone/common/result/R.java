package com.lotone.common.result;

import lombok.Data;
import java.io.Serializable;

@Data
public class R<T> implements Serializable {

    private Integer code;
    private T data;
    private String msg;

    public static <T> R<T> success() {
        R<T> r = new R<>();
        r.setCode(0);
        r.setMsg("success");
        return r;
    }

    public static <T> R<T> success(T data) {
        R<T> r = new R<>();
        r.setCode(0);
        r.setData(data);
        r.setMsg("success");
        return r;
    }

    public static <T> R<T> fail(String msg) {
        R<T> r = new R<>();
        r.setCode(7);
        r.setMsg(msg);
        return r;
    }

    public static <T> R<T> fail(Integer code, String msg) {
        R<T> r = new R<>();
        r.setCode(code);
        r.setMsg(msg);
        return r;
    }
}
