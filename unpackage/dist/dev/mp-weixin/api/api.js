"use strict";
const common_vendor = require("../common/vendor.js");
const api_http = require("./http.js");
const getSchoolLoaction = () => {
  return api_http.http("/schoolLocation?apipost_id=228a0bd77bf002");
};
const getSchoolDetail = () => {
  return api_http.http("/schoolDetail?apipost_id=2045cfcb3bf00b");
};
const getSchoolRank = () => {
  return api_http.http("/schoolRank?apipost_id=230c94457bf002");
};
function askAi(data) {
  return new Promise((resolve, reject) => {
    const token = common_vendor.index.getStorageSync("token");
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    common_vendor.index.request({
      url: "https://xnlv.lizxx.com/api/tools/ai/ask",
      method: "POST",
      data,
      header: headers,
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
      fail: (error) => {
        handleNetworkError(error);
        reject(error);
      }
    });
  });
}
exports.askAi = askAi;
exports.getSchoolDetail = getSchoolDetail;
exports.getSchoolLoaction = getSchoolLoaction;
exports.getSchoolRank = getSchoolRank;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/api.js.map
