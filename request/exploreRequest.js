import uniRequest from '@/request/uniRequest.js'

function getArticle(pathParams) {
	return uniRequest({
		url: "/lejuClient/productArticle/findArticleByPage/",
		pathParams,
	})
}

function getBrand(pathParams) {
	return uniRequest({
		url: "/lejuClient/brand/findBrandsByPage/",
		pathParams,
	})
}

function articleDetail(pathParams) {
	return uniRequest({
		url: "/lejuClient/productArticle/productArticle/",
		pathParams,
	})
}

export {
	getArticle,
	getBrand,
	articleDetail

}
