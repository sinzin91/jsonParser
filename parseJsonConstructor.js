var fs = require('fs');
var queries = require('./sql.js');


var scraperObj = {
  parseJson: function(hash_key) {
    
    var jsonObj = require(scraperObj.queryString(hash_key));
    
    var jsonOutput = {
      'scraperClassName': scraperObj.scraperClassName(hash_key),
      'Seller Name': scraperObj.seller_name(jsonObj),
      'Seller URL': scraperObj.baseUrl(jsonObj),
      'Javascript': scraperObj.interactionScript(jsonObj),
      'Search': scraperObj.searchComponent(jsonObj),
      'Search Terms': scraperObj.searchPatterns(jsonObj),
      'Price Selector': scraperObj.priceSelector(jsonObj),
      'Proxy Provider': scraperObj.proxyProvider(jsonObj),
      'Filter': scraperObj.wiserFilterComponent(jsonObj),
      'Enrichment DSL': scraperObj.enrichmentDsl(jsonObj),
      'Marketplace/CSE': scraperObj.comparisonShoppingEngine(jsonObj),
      'Multiple Variations': scraperObj.multipleVariations(jsonObj)
    }

    console.log(jsonOutput);
    return jsonOutput;

  },

  scraperClassName: function(hash_key) {
    return hash_key[1].replace('.json','');;
  },

  queryString: function(hash_key) {
    
    if (parseInt(hash_key[1].charAt(0))) {
      var query = "./wiser-scraping-topologies/topologies/0-9/" + hash_key[1];
      
      return query;
    } else {
      var query = "./wiser-scraping-topologies/topologies/" + hash_key[1].charAt(0).toLowerCase() + "/" + hash_key[1];
      
      
      return query;
    }
  },

  baseUrl: function(jsonObj) {
    var baseUrlComponent = /(baseUrl|base_url)/.test(jsonObj.design);
    if(baseUrlComponent && /(baseUrl)/.test(jsonObj.design)) {
      console.log('have base url');

      var baseUrl = jsonObj.design.match(/(baseUrl.+?\,)/)[1].replace('baseUrl":"','').replace(/\/"\S+/,'');
      return baseUrl;
      
    } else if (/(base_url)/.test(jsonObj.design)) {
      var baseUrl = jsonObj.design.match(/(base_url.+?\,)/)[1].replace('base_url":"','').replace(/\/"\S+/,'');
      return baseUrl;
    } else {
      console.log('no base url');
      return false;
    }
  },

  seller_name: function(jsonObj) {
    return jsonObj.design.match(/(seller_nam.+?\,)/)[1].replace('seller_name":"','').replace(/"\S+/,'');
  },

  interactionScript: function(jsonObj) {
  var InteractionScript = /InteractionScriptComponent/.test(jsonObj.design);
    if (InteractionScript) {
      return "true";
    } else {
      return "false";
    }
  },

  proxyProvider: function(jsonObj) {
    if(/CrawleraProxyProvider/.test(jsonObj.design)) {
      return "Crawlera Proxy";
    } else if (/WiserProxyProvider/.test(jsonObj.design)) {
      return "Wiser Proxy";
    } else {
      return "No proxy!";
    }
  },

  wiserFilterComponent: function(jsonObj) {
    if (/WiserFilterComponent/.test(jsonObj.design)) {
      return "true";
    } else {
      return "false";
    }
  },

  priceSelector: function(jsonObj) {
    return jsonObj.design.match(/(selectorsMap.*\"price.*?\])/)[1].replace(/selectorsMap.*?price\"\:\[.*?selector\(\'/,'').replace(/\'.*/,'');
  },

  searchComponent: function(jsonObj) {
    var searchExists = /SearchComponent/.test(jsonObj.design);
    if (searchExists) {
      return "true";
    } else {
      return "false";
    }
  },

  searchPatterns: function(jsonObj) {
    var searchExists = /SearchComponent/.test(jsonObj.design);
    if (searchExists) {
      var searchPatterns = jsonObj.design.match(/(searchPatterns.*?])/)[1].replace('searchPatterns\":[\"','').replace(/"].*/,'');
      return searchPatterns;
    } else {
      return "false";
    }
  },

  enrichmentDsl: function(jsonObj) {
    var enrichmentDslComponentExists = /EnrichmentDslComponent/.test(jsonObj.design);
    if (enrichmentDslComponentExists) {
      return "true";
    } else {
      return "false";
    }
  },

  multipleVariations: function(jsonObj) {
    var multipleVariationsComponentExists = /MultipleVariationsComponent/.test(jsonObj.design);
    if (multipleVariationsComponentExists) {
      return "true";
    } else {
      return "false";
    }
  },

  comparisonShoppingEngine: function(jsonObj) {
    var maxItemCount = parseInt(jsonObj.design.match(/(maxItemCount.*?\,)/)[1].replace('maxItemCount":','').replace('\}\,',''));
    if (maxItemCount && maxItemCount >= 2) {
      return "true";
    } else {
      return "false";
    }
  }
};

// to test
//scraperObj.parseJson('amazon.com_search.json

module.exports = scraperObj.parseJson;
