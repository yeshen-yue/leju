import uniRequest from '@/request/uniRequest.js'

function goodsDetailRequest(id) {
	return uniRequest({
		url: "/lejuClient/product/productDetail/",
		pathParams: {
			id
		}
	})
}

export {
	goodsDetailRequest

}
