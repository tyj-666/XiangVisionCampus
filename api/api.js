//引入同目录下的http.js文件
import http from "./http.js";

//调用高校位置渲染地图的数据
export const getSchoolLoaction=()=>{
	return http("/schoolLocation?apipost_id=228a0bd77bf002")
}

//调用高校详情页的数据
export const getSchoolDetail=()=>{
	return http("/schoolDetail?apipost_id=2045cfcb3bf00b")
}

//调用高校喜欢排行榜的数据
export const getSchoolRank=()=>{
	return http("/schoolRank?apipost_id=230c94457bf002")
}



export function askAi(data) {
  return new Promise((resolve, reject) => {
    // Add Token to headers
    const token = uni.getStorageSync('token');
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // Make the request
    uni.request({
      url: 'https://xnlv.lizxx.com/api/tools/ai/ask',
      method: 'POST',
      data: data,
      header: headers,
      success: (res) => {
        if(res.statusCode==200){
        	if(res.data.code==200){
        		resolve(res.data)
        	}else if(res.data.code==0){
        		uni.showToast({
        			title:res.data.message
        		})
        		reject(res.data.message)
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
