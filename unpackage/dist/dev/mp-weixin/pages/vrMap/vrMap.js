"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "vrMap",
  setup(__props) {
    const vrUrl = common_vendor.ref();
    common_vendor.onLoad((options) => {
      vrUrl.value = decodeURIComponent(options.vrUrl);
      common_vendor.index.__f__("log", "at pages/vrMap/vrMap.vue:19", "学校VR全景网址：", options.vrUrl);
    });
    return (_ctx, _cache) => {
      return {
        a: vrUrl.value,
        b: common_vendor.gei(_ctx, "")
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/vrMap/vrMap.js.map
