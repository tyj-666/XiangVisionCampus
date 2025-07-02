"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "schoolWebsite",
  setup(__props) {
    const schoolWebsite = common_vendor.ref();
    common_vendor.onLoad((options) => {
      schoolWebsite.value = decodeURIComponent(options.schoolWebsite);
      common_vendor.index.__f__("log", "at pages/schoolWebsite/schoolWebsite.vue:19", "学校官网：", options.schoolWebsite);
    });
    return (_ctx, _cache) => {
      return {
        a: schoolWebsite.value,
        b: common_vendor.gei(_ctx, "")
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/schoolWebsite/schoolWebsite.js.map
