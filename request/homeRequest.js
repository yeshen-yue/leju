import uniRequest from '@/request/uniRequest.js'

function bannerAds() {
	return uniRequest({
		url: "/lejuClient/home/bannerAds"
	})
}

function findCategory() {
	return uniRequest({
		url: "/lejuClient/productCategory/findCategory/",
		pathParams: {
			id: "1308336521604599809"
		}
	})
}

function recommendList() {
	return uniRequest({
		url: "/lejuClient/home/recommendList",
	})
}

function hotList() {
	return uniRequest({
		url: "/lejuClient/home/hotList",
	})
}

function lejuLatestProducts() {
	return uniRequest({
		url: "/lejuClient/home/lejuLatestProducts",
	})
}

function saleMostProducts() {
	return uniRequest({
		url: "/lejuClient/home/saleMostProducts",
	})
}
export {
	bannerAds,
	findCategory,
	recommendList,
	hotList,
	lejuLatestProducts,
	saleMostProducts
}
