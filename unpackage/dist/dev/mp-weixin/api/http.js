"use strict";
const common_vendor = require("../common/vendor.js");
let baseUrl = "https://mock.apipost.net/mock/3d372d251808000";
function http(url, data = {}, method = "GET") {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseUrl + url,
      data,
      method,
      success: (res) => {
        if (res.statusCode == 200) {
          if (res.data.code == 200) {
            resolve(res.data);
          } else if (res.data.code == 0) {
            common_vendor.index.showToast({
              title: res.data.message
            });
            reject(res.data.message);
          }
        }
      },
      fail: () => {
        common_vendor.index.showToast({
          title: "服务器异常",
          icon: "exception"
        });
      }
    });
  });
}
exports.http = http;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/http.js.map
