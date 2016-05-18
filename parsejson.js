var fs = require('fs');

var parseJson = function(hash_key) {
	var queryString = function(hash_key) {
    	if (parseInt(hash_key.charAt(0))) {
    		var query = "./0-9/" + hash_key;
    		debugger
    		return query;
    	} else {
    		var query = "./" + hash_key.charAt(0) + "/" + hash_key;
    		debugger
    		return query;
    	}
	}(hash_key);
	var jsonObj = require(queryString);
	console.log(jsonObj.name);
	var baseUrl = jsonObj.design.match(/(baseUrl\S+?\,)/)[1].replace('baseUrl":"','').replace(/\/"\S+/,'');
	var seller_name = jsonObj.design.match(/(seller_name\S+?\,)/)[1].replace('seller_name":"','').replace(/"\S+/,'');
	var seller_url = jsonObj.design.match(/(seller_url\S+?\,)/)[1].replace('seller_url":"','').replace(/\/"\S+/,'');
	var InteractionScriptComponent = /InteractionScriptComponent/.test(jsonObj.design);
	var CrawleraProxyProvider = /CrawleraProxyProvider/.test(jsonObj.design);
	var WiserProxyProvider = /WiserProxyProvider/.test(jsonObj.design);
	var proxyProvider = function() { 
		debugger
		if(/CrawleraProxyProvider/.test(jsonObj.design)) {
			return "Crawlera Proxy";
		} else if (/WiserProxyProvider/.test(jsonObj.design)) {
			return "Wiser Proxy";
		} else {
			return "No proxy!";
		}
	}();
	var WiserFilterComponent = /WiserFilterComponent/.test(jsonObj.design);
	var priceSelector = jsonObj.design.match(/(selectorsMap.*\"price.*?\])/)[1].replace(/selectorsMap.*?price\"\:\[.*?selector\(\'/,'').replace(/\'.*/,'');
	var searchComponent = /SearchComponent/.test(jsonObj.design);
	var searchPatterns = function(searchComponent) {
		if (searchComponent) {
			var searchPatterns = jsonObj.design.match(/(searchPatterns.*?])/)[1].replace('searchPatterns\":[\"','').replace(/"].*/,'');
			return searchPatterns;
		} else {
			return false;
		}
	}();
	var enrichmentDslComponent = /EnrichmentDslComponent/.test(jsonObj.design);
	var multipleVariationsComponent = /MultipleVariationsComponent/.test(jsonObj.design);
	var ComparisonShoppingEngine = function() {
		var maxItemCount = parseInt(jsonObj.design.match(/(maxItemCount.*?\,)/)[1].replace('maxItemCount":','').replace('\}\,',''));
		if (maxItemCount && maxItemCount >= 2) {
			return true;
		} else {
			return false;
		}
	}();
	var scraperObj = {
		'Seller Name': seller_name,
		'Seller URL': seller_url,
		'Phantom JS': InteractionScriptComponent,
		'Search ': searchComponent,
		'Search Patterns': searchPatterns,
		'Price Selector': priceSelector,
		'Crawlera Proxy': CrawleraProxyProvider,
		'Proxy Provider': proxyProvider,
		'Wiser Proxy': WiserProxyProvider,
		'Wiser Filter': WiserFilterComponent,
		'Enrichment DSL': enrichmentDslComponent,
		'Comparison Shopping Engine': ComparisonShoppingEngine,
		'Multiple Variations': multipleVariationsComponent
	}
	console.log(scraperObj);
	return scraperObj;
}


parseJson("coppel.com_famsa.json");
//parseJson("coppel.com_famsa.json");

