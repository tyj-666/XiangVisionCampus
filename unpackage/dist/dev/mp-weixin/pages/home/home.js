"use strict";
const common_vendor = require("../../common/vendor.js");
const api_api = require("../../api/api.js");
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  _easycom_up_icon2();
}
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  _easycom_up_icon();
}
const _sfc_main = {
  __name: "home",
  setup(__props) {
    const searchText = common_vendor.ref("");
    const cityData = common_vendor.ref([{ name: "全部城市" }, { name: "湖南省长沙市" }, { name: "湖南省衡阳市" }, { name: "湖南省湘潭市" }, { name: "湖南省株洲市" }]);
    const cityIndex = common_vendor.ref(0);
    const selectedCity = common_vendor.ref("");
    const universityList = common_vendor.ref([]);
    common_vendor.onLoad(() => {
      api_api.getSchoolDetail().then((res) => {
        common_vendor.index.__f__("log", "at pages/home/home.vue:76", "所有学校数据：", res.data);
        universityList.value = res.data;
      });
    });
    const filteredList = common_vendor.computed(() => {
      return universityList.value.filter((item) => {
        const nameMatch = item.schoolName.includes(searchText.value);
        const cityMatch = !selectedCity.value || selectedCity.value === "全部城市" || item.schoolLocation === selectedCity.value;
        return nameMatch && cityMatch;
      });
    });
    const handleCityChange = (e) => {
      cityIndex.value = e.detail.value;
      selectedCity.value = cityIndex.value === 0 ? "" : cityData.value[cityIndex.value].name;
    };
    const clearSearch = () => {
      searchText.value = "";
    };
    const handleUniversityClick = (item) => {
      common_vendor.index.navigateTo({
        url: `/pages/schoolDetail/schoolDetail?schoolId=${item.schoolId}`
      });
      common_vendor.index.__f__("log", "at pages/home/home.vue:110", "点击的学校 ID:", item.schoolId, "跳转到学校详情页面成功");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(clearSearch),
        b: common_vendor.p({
          name: "search",
          size: "20px"
        }),
        c: searchText.value,
        d: common_vendor.o(($event) => searchText.value = $event.detail.value),
        e: searchText.value
      }, searchText.value ? {
        f: common_vendor.o(clearSearch),
        g: common_vendor.p({
          name: "close",
          size: "20px"
        })
      } : {}, {
        h: common_vendor.t(selectedCity.value || "选择城市"),
        i: common_vendor.o(clearSearch),
        j: common_vendor.p({
          name: "arrow-down",
          size: "18px"
        }),
        k: cityData.value,
        l: common_vendor.o(handleCityChange),
        m: cityIndex.value,
        n: common_vendor.f(filteredList.value, (item, k0, i0) => {
          return {
            a: item.schoolImage,
            b: common_vendor.t(item.schoolName),
            c: common_vendor.t(item.schoolLocation),
            d: common_vendor.f(item.schoolTag, (tag, tagIndex, i1) => {
              return {
                a: common_vendor.t(tag),
                b: tagIndex,
                c: tag === "211" ? 1 : "",
                d: tag === "985" ? 1 : "",
                e: tag === "双一流" ? 1 : ""
              };
            }),
            e: item.schoolId,
            f: common_vendor.o(($event) => handleUniversityClick(item), item.schoolId)
          };
        }),
        o: filteredList.value.length === 0
      }, filteredList.value.length === 0 ? {
        p: common_vendor.o(clearSearch),
        q: common_vendor.p({
          name: "error-circle",
          size: "50px"
        })
      } : {}, {
        r: common_vendor.gei(_ctx, "")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-07e72d3c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/home.js.map
