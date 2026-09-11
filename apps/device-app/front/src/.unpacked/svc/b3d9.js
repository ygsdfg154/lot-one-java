// webpack 模块 b3d9  [svc]
// 出现于: pagesFunc/app-sub-service.js
const __r = require('./__runtime.js').wrap();
(function (t, e, a) {
  "use strict";
  (a.d(e, "b", function () {
    return r;
  }), a.d(e, "c", function () {
    return i;
  }), a.d(e, "a", function () {
    return n;
  }));
  var n = {
    uSticky: require("uview-ui/components/u-sticky/u-sticky.vue").default,
    uSubsection: require("uview-ui/components/u-subsection/u-subsection.vue").default,
    uEmpty: require("uview-ui/components/u-empty/u-empty.vue").default,
    uLoadmore: require("uview-ui/components/u-loadmore/u-loadmore.vue").default
  }, r = function () {
    var t = this, e = t.$createElement, a = t._self._c || e;
    return a("view", {
      staticClass: t._$s(0, "sc", "page flex-col"),
      style: t._$s(0, "s", {
        paddingBottom: "50rpx"
      }),
      attrs: {
        _i: 0
      }
    }, [a("view", {
      staticClass: t._$s(1, "sc", "flex-row justify-center items-center p-t-mini p-b-mini"),
      attrs: {
        _i: 1
      }
    }, [a("u-sticky", {
      attrs: {
        _i: 2
      }
    }, [a("view", [a("u-subsection", {
      staticClass: t._$s(4, "sc", "m-v-sm"),
      attrs: {
        bgColor: "#6081C7",
        mode: "subsection",
        activeColor: "#6081C7",
        list: t.tripList,
        current: t.reportType,
        _i: 4
      },
      on: {
        change: t.tripTabChanged
      }
    })], 1)])], 1), a("calendarFrame", {
      attrs: {
        currentDate: t.currentDate,
        name: "trip",
        param: t.param,
        reportType: t.reportType,
        _i: 5
      },
      on: {
        "update:currentDate": function (e) {
          t.currentDate = e;
        },
        "update:current-date": function (e) {
          t.currentDate = e;
        },
        fetchData: t.fetchData
      }
    }), a("view", {
      staticClass: t._$s(6, "sc", "flex-col"),
      attrs: {
        _i: 6
      }
    }, t._l(t._$s(7, "f", {
      forItems: t.reportList
    }), function (e, n, r, i) {
      return a("view", {
        key: t._$s(7, "f", {
          forIndex: r,
          key: n
        }),
        staticClass: t._$s("7-" + i, "sc", "flex-row items-center m-t m-h-xl br-xl bg-white"),
        attrs: {
          _i: "7-" + i
        }
      }, [a("view", {
        staticClass: t._$s("8-" + i, "sc", "flex-col p-v-md p-h-xl"),
        attrs: {
          _i: "8-" + i
        }
      }, [a("view", {
        staticClass: t._$s("9-" + i, "sc", "flex-row items-center justify-between m-b-sm"),
        attrs: {
          _i: "9-" + i
        },
        on: {
          click: function (a) {
            return t.gotoDetail(e);
          }
        }
      }, [a("view", [t._$s("11-" + i, "i", 0 === t.reportType) ? a("view", {
        staticClass: t._$s("11-" + i, "sc", "flex-row"),
        attrs: {
          _i: "11-" + i
        }
      }, [a("text", {
        staticClass: t._$s("12-" + i, "sc", "text content-align"),
        attrs: {
          _i: "12-" + i
        }
      }, [t._v(t._$s("12-" + i, "t0-0", t._s(t.l("common.residence.time"))))]), t._$s("13-" + i, "i", e.minutes) ? a("text", {
        staticClass: t._$s("13-" + i, "sc", "text"),
        attrs: {
          _i: "13-" + i
        }
      }, [t._v(t._$s("13-" + i, "t0-0", t._s(e.minutes.toFixed(2))) + t._$s("13-" + i, "t0-1", t._s(t.l("common.min"))))]) : t._e()]) : t._e(), a("view", {
        staticClass: t._$s("14-" + i, "sc", "flex-row"),
        attrs: {
          _i: "14-" + i
        }
      }, [a("text", {
        staticClass: t._$s("15-" + i, "sc", "text content-align"),
        attrs: {
          _i: "15-" + i
        }
      }, [t._v(t._$s("15-" + i, "t0-0", t._s(t.l("common.time-on"))))]), a("text", {
        staticClass: t._$s("16-" + i, "sc", "text"),
        attrs: {
          _i: "16-" + i
        }
      }, [t._v(t._$s("16-" + i, "t0-0", t._s(e.startTime)))])]), a("view", {
        staticClass: t._$s("17-" + i, "sc", "flex-row"),
        attrs: {
          _i: "17-" + i
        }
      }, [a("text", {
        staticClass: t._$s("18-" + i, "sc", "text content-align"),
        attrs: {
          _i: "18-" + i
        }
      }, [t._v(t._$s("18-" + i, "t0-0", t._s(t.l("common.time-off"))))]), a("text", {
        staticClass: t._$s("19-" + i, "sc", "text"),
        attrs: {
          _i: "19-" + i
        }
      }, [t._v(t._$s("19-" + i, "t0-0", t._s(e.endTime)))])])]), a("image", {
        staticClass: t._$s("20-" + i, "sc", "m-l m-t-xl"),
        style: t._$s("20-" + i, "s", {
          width: "15rpx",
          height: "24rpx"
        }),
        attrs: {
          src: t._$s("20-" + i, "a-src", t.cdn + "/ikon/qzwl-general-right@2x.png"),
          _i: "20-" + i
        }
      })]), t._$s("21-" + i, "i", 0 === t.reportType && e.startLon && e.startLat) ? a("view", {
        staticClass: t._$s("21-" + i, "sc", "flex-row"),
        attrs: {
          _i: "21-" + i
        }
      }, [a("text", {
        staticClass: t._$s("22-" + i, "sc", "text content-align"),
        attrs: {
          _i: "22-" + i
        }
      }, [t._v(t._$s("22-" + i, "t0-0", t._s(t.l("common.addedress"))))]), t._$s("23-" + i, "i", e.address) ? a("text", {
        staticClass: t._$s("23-" + i, "sc", "text"),
        style: t._$s("23-" + i, "s", {
          width: "500rpx"
        }),
        attrs: {
          _i: "23-" + i
        }
      }, [t._v(t._$s("23-" + i, "t0-0", t._s(e.address)))]) : a("text", {
        staticClass: t._$s("24-" + i, "sc", "text text-primary"),
        style: t._$s("24-" + i, "s", {
          width: "500rpx"
        }),
        attrs: {
          _i: "24-" + i
        },
        on: {
          click: function (a) {
            return t.getAddress({
              id: e.id,
              longitude: e.startLonWGS84,
              latitude: e.startLatWGS84,
              addressName: "address"
            });
          }
        }
      }, [t._v(t._$s("24-" + i, "t0-0", t._s(e.startLonWGS84 + "," + e.startLatWGS84)))])]) : t._e(), t._$s("25-" + i, "i", 1 === t.reportType && e.startLon && e.startLat) ? a("view", {
        staticClass: t._$s("25-" + i, "sc", "flex-row"),
        attrs: {
          _i: "25-" + i
        }
      }, [a("text", {
        staticClass: t._$s("26-" + i, "sc", "text content-align"),
        attrs: {
          _i: "26-" + i
        }
      }, [t._v(t._$s("26-" + i, "t0-0", t._s(t.l("common.starting"))))]), t._$s("27-" + i, "i", e.startAddress) ? a("text", {
        staticClass: t._$s("27-" + i, "sc", "text"),
        style: t._$s("27-" + i, "s", {
          width: "500rpx"
        }),
        attrs: {
          _i: "27-" + i
        }
      }, [t._v(t._$s("27-" + i, "t0-0", t._s(e.startAddress)))]) : a("text", {
        staticClass: t._$s("28-" + i, "sc", "text text-primary"),
        style: t._$s("28-" + i, "s", {
          width: "500rpx"
        }),
        attrs: {
          _i: "28-" + i
        },
        on: {
          click: function (a) {
            return t.getAddress({
              id: e.id,
              longitude: e.startLonWGS84,
              latitude: e.startLatWGS84,
              addressName: "startAddress"
            });
          }
        }
      }, [t._v(t._$s("28-" + i, "t0-0", t._s(e.startLonWGS84 + "," + e.startLatWGS84)))])]) : t._e(), t._$s("29-" + i, "i", 1 === t.reportType && e.endLon && e.endLat) ? a("view", {
        staticClass: t._$s("29-" + i, "sc", "flex-row m-t-mini"),
        attrs: {
          _i: "29-" + i
        }
      }, [a("text", {
        staticClass: t._$s("30-" + i, "sc", "text content-align"),
        attrs: {
          _i: "30-" + i
        }
      }, [t._v(t._$s("30-" + i, "t0-0", t._s(t.l("common.destination"))))]), t._$s("31-" + i, "i", e.endAddress) ? a("text", {
        staticClass: t._$s("31-" + i, "sc", "text"),
        style: t._$s("31-" + i, "s", {
          width: "500rpx"
        }),
        attrs: {
          _i: "31-" + i
        }
      }, [t._v(t._$s("31-" + i, "t0-0", t._s(e.endAddress)))]) : a("text", {
        staticClass: t._$s("32-" + i, "sc", "text text-primary"),
        style: t._$s("32-" + i, "s", {
          width: "500rpx"
        }),
        attrs: {
          _i: "32-" + i
        },
        on: {
          click: function (a) {
            return t.getAddress({
              id: e.id,
              longitude: e.endLonWGS84,
              latitude: e.endLatWGS84,
              addressName: "endAddress"
            });
          }
        }
      }, [t._v(t._$s("32-" + i, "t0-0", t._s(e.endLonWGS84 + "," + e.endLatWGS84)))])]) : t._e()])]);
    }), 0), a("view", [t._$s(34, "i", !t.reportList.length) ? a("u-empty", {
      attrs: {
        text: t.l("common.no.more"),
        icon: t.cdn + "/draw/qzwl-empty.png",
        _i: 34
      }
    }) : t._e(), t._$s(35, "i", t.reportList.length) ? a("u-loadmore", {
      attrs: {
        status: t.status,
        line: !0,
        _i: 35
      }
    }) : t._e()], 1)], 1);
  }, i = [];
})(module, exports, __r);
