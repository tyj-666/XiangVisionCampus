"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "entranceScores",
  setup(__props) {
    const entranceScores = common_vendor.ref();
    common_vendor.onLoad((options) => {
      entranceScores.value = decodeURIComponent(options.entranceScores);
      common_vendor.index.__f__("log", "at pages/entranceScores/entranceScores.vue:19", "学校历年分数线网址：", options.entranceScores);
    });
    return (_ctx, _cache) => {
      return {
        a: entranceScores.value,
        b: common_vendor.gei(_ctx, "")
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/entranceScores/entranceScores.js.map
