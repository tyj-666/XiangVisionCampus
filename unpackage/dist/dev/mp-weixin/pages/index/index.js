"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  _easycom_up_icon2();
}
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  _easycom_up_icon();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const startY = common_vendor.ref(0);
    const isSwiping = common_vendor.ref(false);
    const showContent = common_vendor.ref(false);
    const showLoading = common_vendor.ref(false);
    common_vendor.onMounted(() => {
      setTimeout(() => {
        showContent.value = true;
      }, 80);
    });
    const onTouchStart = (e) => {
      startY.value = e.touches[0].clientY;
      isSwiping.value = false;
    };
    const onTouchMove = (e) => {
      const moveY = e.touches[0].clientY;
      if (startY.value - moveY > 60) {
        isSwiping.value = true;
      }
    };
    const onTouchEnd = () => {
      if (isSwiping.value) {
        showLoading.value = true;
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/home/home"
          });
        }, 150);
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0,
        b: common_assets._imports_1,
        c: common_vendor.p({
          name: "arrow-up",
          size: "38rpx",
          color: "#00aa7f"
        }),
        d: showContent.value ? 1 : "",
        e: showContent.value,
        f: showLoading.value
      }, showLoading.value ? {} : {}, {
        g: common_vendor.o(onTouchStart),
        h: common_vendor.o(onTouchMove),
        i: common_vendor.o(onTouchEnd),
        j: common_vendor.gei(_ctx, "")
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
