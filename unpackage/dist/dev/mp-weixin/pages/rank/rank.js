"use strict";
const common_vendor = require("../../common/vendor.js");
const api_api = require("../../api/api.js");
const _sfc_main = {
  __name: "rank",
  setup(__props) {
    const state = common_vendor.reactive({
      rawRankings: [],
      selectedIndex: -1,
      lastLikedIndex: -1,
      shouldAnimate: false
    });
    const rankings = common_vendor.computed(() => {
      return [...state.rawRankings].sort((a, b) => b.likes - a.likes);
    });
    const { rawRankings, selectedIndex, lastLikedIndex, shouldAnimate } = common_vendor.toRefs(state);
    common_vendor.onShow(() => {
      state.shouldAnimate = false;
      api_api.getSchoolRank().then((res) => {
        state.rawRankings = res.data.map((item, index) => ({
          ...item,
          id: item.id || index,
          likeAnimating: false
        }));
        common_vendor.nextTick$1(() => {
          state.shouldAnimate = true;
        });
      });
    });
    const likeSchool = (index) => {
      const school = state.rawRankings.find((item) => item.id === rankings.value[index].id);
      if (school) {
        state.lastLikedIndex = index;
        school.likes += 1;
        school.likeAnimating = true;
        setTimeout(() => {
          school.likeAnimating = false;
        }, 500);
      }
    };
    const selectCard = (index) => {
      state.selectedIndex = state.selectedIndex === index ? -1 : index;
    };
    const handleUniversityClick = (item) => {
      common_vendor.index.navigateTo({
        url: `/pages/schoolDetail/schoolDetail?schoolId=${item.schoolId}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(rankings.value, (item, index, i0) => {
          return common_vendor.e({
            a: index < 3
          }, index < 3 ? {
            b: common_vendor.t(index + 1),
            c: common_vendor.n({
              gold: index === 0,
              silver: index === 1,
              bronze: index === 2
            })
          } : {
            d: common_vendor.t(index + 1)
          }, {
            e: item.schoolLogo,
            f: common_vendor.t(item.schoolName),
            g: item.likeAnimating ? 1 : "",
            h: common_vendor.t(item.likes),
            i: common_vendor.o(($event) => likeSchool(index), item.id),
            j: common_vendor.o(($event) => handleUniversityClick(item), item.id),
            k: item.id,
            l: common_vendor.n(`rank-${index + 1}`),
            m: common_vendor.n({
              "card-selected": common_vendor.unref(selectedIndex) === index,
              "animate-in": common_vendor.unref(shouldAnimate)
            }),
            n: common_vendor.s(common_vendor.unref(shouldAnimate) ? {
              "--delay": `${index * 0.1}s`
            } : {}),
            o: common_vendor.o(($event) => selectCard(index), item.id)
          });
        }),
        b: common_vendor.gei(_ctx, "")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-716fbf2c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/rank/rank.js.map
