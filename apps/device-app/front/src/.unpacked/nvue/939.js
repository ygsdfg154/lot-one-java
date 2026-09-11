// webpack 模块 939  [nvue]
// 出现于: pages/home/home.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = {
    props: {
      length: {
        type: [String, Number],
        default: uni.$u.props.swiperIndicator.length
      },
      current: {
        type: [String, Number],
        default: uni.$u.props.swiperIndicator.current
      },
      indicatorActiveColor: {
        type: String,
        default: uni.$u.props.swiperIndicator.indicatorActiveColor
      },
      indicatorInactiveColor: {
        type: String,
        default: uni.$u.props.swiperIndicator.indicatorInactiveColor
      },
      indicatorMode: {
        type: String,
        default: uni.$u.props.swiperIndicator.indicatorMode
      }
    }
  };
  t.default = r;
})(module, exports, __r);
