import toast from "@/utils/showToast.js"
const host = "https://leju.bufan.cloud"
export default function(config) {
	config = Object.assign({
		method: "get"
	}, config)
	if (config.pathParams) {
		config.pathParams = Object.values(config.pathParams).join("/")
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: host + config.url + (config.pathParams ? config.pathParams : ''),
			method: config.method,
			data: config.data,
			header: config.header,
			timeout: 5000,
			success(res) {
				if (!res.data.success) {
					toast('error', "发生了一些未知错误", 1000)
				}
				resolve(res)
			}
		})
	})
}
