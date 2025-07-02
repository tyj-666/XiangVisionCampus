"use strict";
const common_vendor = require("../../common/vendor.js");
const api_api = require("../../api/api.js");
const _sfc_main = {
  __name: "map",
  setup(__props) {
    const schoolLocation = common_vendor.ref({});
    common_vendor.onLoad(() => {
      api_api.getSchoolLoaction().then((res) => {
        common_vendor.index.__f__("log", "at pages/map/map.vue:32", "获取的res：", res);
        schoolLocation.value = res.data;
        const newList = res.data.map((item) => ({
          id: Number(item.schoolId),
          // 确保 id 为数字
          width: 50,
          height: 50,
          iconPath: item.schoolLogo,
          // 图标路径
          longitude: Number(item.longitude),
          // 确保经纬度为数字
          latitude: Number(item.latitude)
        }));
        schoolLocation.value = newList;
        common_vendor.index.__f__("log", "at pages/map/map.vue:45", "标点信息：", schoolLocation.value);
      });
    });
    const goSchoolDetail = (event) => {
      common_vendor.index.navigateTo({
        url: `/pages/schoolDetail/schoolDetail?schoolId=${event.markerId}`
      });
      common_vendor.index.__f__("log", "at pages/map/map.vue:55", "点击的标记点 ID:", event.markerId, "跳转到学校详情页面成功");
    };
    return (_ctx, _cache) => {
      return {
        a: schoolLocation.value,
        b: common_vendor.o(goSchoolDetail),
        c: common_vendor.gei(_ctx, "")
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/map/map.js.map
