//请求接口
let baseUrl="https://mock.apipost.net/mock/3d372d251808000"

export default function http(url,data={},method="GET"){
	//对外使用链式调用
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+url,
			data,
			method,
			success:res=> {
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
			fail:()=>{
				uni.showToast({
					title:"服务器异常",
					icon:"exception"
				})
			}
		})
	})
}