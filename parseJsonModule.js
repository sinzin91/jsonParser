var fs = require('fs');

var parseJson = function(hash_key) {
	var queryString = function(hash_key) {
      console.log(hash_key);
    	if (parseInt(hash_key[1].charAt(0))) {
    		var query = "./wiser-scraping-topologies/topologies/0-9/" + hash_key[1];
    		console.log(query);
        
    		return query;
    	} else {
        var query = "./wiser-scraping-topologies/topologies/" + hash_key[1].charAt(0).toLowerCase() + "/" + hash_key[1];
        
    		console.log(query);
        
        return query;
    	}
	}(hash_key);

  var jsonObj = require('./wiser-scraping-topologies/topologies/a/amazon.com_search.json');
  //var jsonObj = require(queryString);
  var baseUrl = function() {
    var baseUrlComponent = /(baseUrl|base_url)/.test(jsonObj.design);
    if(baseUrlComponent && /(baseUrl)/.test(jsonObj.design)) {
      console.log('have base url');

      var baseUrl = jsonObj.design.match(/(baseUrl.+?\,)/)[1].replace('baseUrl":"','').replace(/\/"\S+/,'');
      debugger
      return baseUrl;
      
    } else if (/(base_url)/.test(jsonObj.design)) {
      var baseUrl = jsonObj.design.match(/(base_url.+?\,)/)[1].replace('base_url":"','').replace(/\/"\S+/,'');
      return baseUrl;
      debugger
    } else {
      console.log('no base url');
      return false;
      debugger
    }
  }();

  var seller_name = jsonObj.design.match(/(seller_nam.+?\,)/)[1].replace('seller_name":"','').replace(/"\S+/,'');

	var seller_url = jsonObj.design.match(/(seller_ur.+?\,)/)[1].replace('seller_url":"','').replace(/\/"\S+/,'');

  var InteractionScriptComponent = function() {
    var InteractionScript = /InteractionScriptComponent/.test(jsonObj.design);
    if (InteractionScript) {
      return "true";
    } else {
      return "false";
    }
  }();

	var CrawleraProxyProvider = /CrawleraProxyProvider/.test(jsonObj.design);
	var WiserProxyProvider = /WiserProxyProvider/.test(jsonObj.design);
	var proxyProvider = function() { 
		
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
	}(searchComponent);
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
    'scraperClassName':'',
		'Seller Name': seller_name,
		'Seller URL': seller_url,
		'Phantom JS': InteractionScriptComponent,
		'Search': searchComponent,
		'Search Patterns': searchPatterns,
		'Price Selector': priceSelector,
		'Proxy Provider': proxyProvider,
		'Wiser Filter': WiserFilterComponent,
		'Enrichment DSL': enrichmentDslComponent,
		'Marketplace': ComparisonShoppingEngine,
		'Multiple Variations': multipleVariationsComponent
	}
	console.log(scraperObj);
	return scraperObj;
}
// to test
parseJson('amazon.com_search.json');
module.exports = parseJson;
