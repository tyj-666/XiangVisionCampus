"use strict";
const common_vendor = require("../../common/vendor.js");
const api_api = require("../../api/api.js");
if (!Array) {
  const _easycom_up_navbar2 = common_vendor.resolveComponent("up-navbar");
  _easycom_up_navbar2();
}
const _easycom_up_navbar = () => "../../node-modules/uview-plus/components/u-navbar/u-navbar.js";
if (!Math) {
  _easycom_up_navbar();
}
const _sfc_main = {
  __name: "schoolDetail",
  setup(__props) {
    const introExpanded = common_vendor.ref(true);
    const historyExpanded = common_vendor.ref(true);
    const targetSchool = common_vendor.ref({});
    common_vendor.onLoad((options) => {
      api_api.getSchoolDetail().then((res) => {
        const schoolId = Number(options.schoolId);
        if (Array.isArray(res.data)) {
          targetSchool.value = res.data.find((item) => item.schoolId === schoolId);
        } else {
          targetSchool.value = res.data.find((item) => item.schoolId === 8);
        }
        common_vendor.index.__f__("log", "at pages/schoolDetail/schoolDetail.vue:121", "筛选结果：", targetSchool.value);
      });
    });
    const toggleIntro = () => {
      introExpanded.value = !introExpanded.value;
    };
    const toggleHistory = () => {
      historyExpanded.value = !historyExpanded.value;
    };
    const goLink = (item) => {
      common_vendor.index.navigateTo({
        url: `/pages/schoolWebsite/schoolWebsite?schoolWebsite=${item}`
      });
      common_vendor.index.__f__("log", "at pages/schoolDetail/schoolDetail.vue:139", "跳转到学校官网页面成功");
    };
    const goScore = (item) => {
      common_vendor.index.navigateTo({
        url: `/pages/entranceScores/entranceScores?entranceScores=${item}`
      });
      common_vendor.index.__f__("log", "at pages/schoolDetail/schoolDetail.vue:147", "跳转到学校历年分数页面成功");
    };
    const goVR = (item) => {
      common_vendor.index.navigateTo({
        url: `/pages/vrMap/vrMap?vrUrl=${item}`
      });
      common_vendor.index.__f__("log", "at pages/schoolDetail/schoolDetail.vue:155", "跳转到VR地图页面成功");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "",
          ["auto-back"]: true,
          ["bg-color"]: "#00000000",
          ["left-icon-color"]: "#000000"
        }),
        b: targetSchool.value.schoolImage,
        c: common_vendor.t(targetSchool.value.schoolName),
        d: common_vendor.f(targetSchool.value.schoolTag, (tag, index, i0) => {
          return {
            a: common_vendor.t(tag),
            b: index,
            c: tag === "211" ? 1 : "",
            d: tag === "985" ? 1 : "",
            e: tag === "双一流" ? 1 : ""
          };
        }),
        e: common_vendor.t(targetSchool.value.schoolLocation),
        f: targetSchool.value.schoolLogo,
        g: common_vendor.o(($event) => goLink(targetSchool.value.schoolWebsite)),
        h: common_vendor.o(($event) => goVR(targetSchool.value.vrUrl)),
        i: common_vendor.o(($event) => goScore(targetSchool.value.entranceScores)),
        j: common_vendor.t(introExpanded.value ? "收起" : "展开"),
        k: common_vendor.t(introExpanded.value ? "▲" : "▼"),
        l: common_vendor.o(toggleIntro),
        m: common_vendor.t(targetSchool.value.schoolIntroduction),
        n: introExpanded.value ? 1 : "",
        o: common_vendor.t(historyExpanded.value ? "收起" : "展开"),
        p: common_vendor.t(historyExpanded.value ? "▲" : "▼"),
        q: common_vendor.o(toggleHistory),
        r: common_vendor.t(targetSchool.value.schoolHistory),
        s: historyExpanded.value ? 1 : "",
        t: common_vendor.gei(_ctx, "")
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/schoolDetail/schoolDetail.js.map
