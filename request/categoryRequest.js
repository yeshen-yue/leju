import uniRequest from '@/request/uniRequest.js'

function findProductList(data, pathParams) {
	return uniRequest({
		url: "/lejuClient/product/findProductList/",
		method: "post",
		data,
		pathParams
	})
}

export {
	findProductList

}
