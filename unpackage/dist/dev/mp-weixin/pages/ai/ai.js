"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
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
  __name: "ai",
  setup(__props) {
    const information = common_vendor.ref("");
    const contentList = common_vendor.ref([]);
    const scrollTop = common_vendor.ref(0);
    const old = common_vendor.ref({ scrollTop: 0 });
    const screenHeight = common_vendor.ref(0);
    const currentTypingIndex = common_vendor.ref(-1);
    const showSendIcon = common_vendor.computed(() => {
      let aiIndex = -1;
      for (let i = contentList.value.length - 1; i >= 0; i--) {
        if (contentList.value[i].type === "AI") {
          aiIndex = i;
          break;
        }
      }
      if (aiIndex === 0)
        return true;
      if (aiIndex !== -1)
        return !!contentList.value[aiIndex].typingComplete;
      return true;
    });
    common_vendor.onMounted(() => {
      const windowInfo = common_vendor.index.getWindowInfo();
      screenHeight.value = windowInfo.windowHeight;
      execute();
    });
    const execute = () => {
      contentList.value.push({
        type: "AI",
        reply: `您好，我是湖南高校推荐官，您可以按以下问我：
• 湖南有哪些本科/专科高校呀？
• XX大学的特色专业是什么？
• 湖南高校近年的录取分数线是多少？
• 某所大学的校园环境、宿舍条件怎么样？
• 湖南高校的招生政策（比如省内/省外招生计划）有哪些？
• XX专业在湖南哪些高校实力较强？
• 湖南高校的奖学金、助学金政策是什么？
• 高校毕业生就业情况（比如就业率、热门就业方向）如何？
有任何想了解的，随时问我呀~`,
        showText: "",
        // 显示的文字
        cursorInex: false,
        typingComplete: false
        // 打字是否完成
      });
      startTypingEffect(contentList.value.length - 1);
    };
    const clickSending = () => {
      if (!information.value.trim()) {
        common_vendor.index.showToast({
          title: "请输入想资讯的内容",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      contentList.value.push({
        type: "user",
        text: information.value,
        cursorInex: false
      });
      scrollToBottom();
      const userInput = information.value;
      information.value = "";
      askAiRequest(userInput);
    };
    const scrolList = (e) => {
      old.value.scrollTop = e.detail.scrollTop;
    };
    const askAiRequest = (prompt) => {
      const aiMessage = {
        type: "AI",
        reply: "",
        showText: "",
        // 显示的文字
        cursorInex: true,
        typingComplete: false
      };
      contentList.value.push(aiMessage);
      currentTypingIndex.value = contentList.value.length - 1;
      scrollToBottom();
      api_api.askAi({ prompt }).then((res) => {
        if (res.code === 200) {
          const reply = res.data || "抱歉，未能获取回复内容";
          contentList.value[currentTypingIndex.value].reply = reply;
          contentList.value[currentTypingIndex.value].cursorInex = false;
          startTypingEffect(currentTypingIndex.value);
        } else {
          throw new Error(res.message || "请求失败");
        }
      }).catch((err) => {
        common_vendor.index.__f__("error", "at pages/ai/ai.vue:157", "请求出错:", err);
        contentList.value[currentTypingIndex.value].reply = "抱歉，请求出错，请稍后再试";
        contentList.value[currentTypingIndex.value].cursorInex = false;
        startTypingEffect(currentTypingIndex.value);
      });
    };
    const startTypingEffect = (index) => {
      const message = contentList.value[index];
      if (!message || message.typingComplete)
        return;
      message.showText = "";
      let currentCharIndex = 0;
      const fullText = message.reply;
      if (message.typingTimer) {
        clearInterval(message.typingTimer);
      }
      message.typingTimer = setInterval(() => {
        if (currentCharIndex >= fullText.length) {
          clearInterval(message.typingTimer);
          message.typingComplete = true;
          return;
        }
        message.showText = fullText.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        contentList.value = [...contentList.value];
        scrollToBottom();
      }, 20);
    };
    const scrollToBottom = () => {
      common_vendor.nextTick$1(() => {
        scrollTop.value = old.value.scrollTop;
        common_vendor.nextTick$1(() => {
          scrollTop.value = 999999;
        });
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(contentList.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.type == "user"
          }, item.type == "user" ? {
            b: common_vendor.t(item.text),
            c: common_assets._imports_0$1
          } : {}, {
            d: item.type == "AI"
          }, item.type == "AI" ? common_vendor.e({
            e: common_assets._imports_1,
            f: item.cursorInex
          }, item.cursorInex ? {} : {}, {
            g: common_vendor.t(item.showText || "")
          }) : {}, {
            h: index
          });
        }),
        b: scrollTop.value,
        c: common_vendor.o(scrolList),
        d: common_vendor.o(clickSending),
        e: information.value,
        f: common_vendor.o(($event) => information.value = $event.detail.value),
        g: showSendIcon.value
      }, showSendIcon.value ? {
        h: common_vendor.o(($event) => clickSending()),
        i: common_vendor.p({
          name: "arrow-up",
          size: "30px",
          tyle: "width:60rpx;height:60rpx;margin-left: 15rpx;"
        })
      } : {}, {
        j: screenHeight.value + "px",
        k: common_vendor.gei(_ctx, "")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fdb58938"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/ai/ai.js.map
