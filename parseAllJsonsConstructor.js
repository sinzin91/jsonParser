var jsonParser = require('./parseJsonConstructor.js');
var recursive = require('recursive-readdir');
var fs = require('fs');
var json2csv = require('json2csv');

// initialize topologies string
var topologies = '';
// CSV headers
var fields = ['scraperClassName', 'Seller Name', 'Seller URL', 'Phantom JS', 'Search', 'Search Patterns', 'Price Selector', 'Proxy Provider', 'Wiser Filter', 'Enrichment DSL', 'Marketplace', 'Multiple Variations'];

// recurse through topologies directory, ignoring production jsons
recursive('../wiser-scraping-topologies/topologies', ['*-production*'], function (err, files) {
  // Files is an array of filename
  topologies += '[';
  for (var file in files) {
    var x = files[file].match(/wiser-scraping-topologies\/topologies\/.*\/(.*)/);

    var parsedFile = jsonParser(x);

    topologies += JSON.stringify(parsedFile) + ',';
  }

  topologies = topologies.replace(/}\,$/g,'}]');
  
  // output JSON
  fs.writeFile("topo.json", topologies, function(err) {
    if(err) { return console.log(err);}
  }); 

  console.log(topologies);
  
  // output CSV
  // json2csv({ data: JSON.parse(topologies), fields: fields }, function(err, csv) {
  //   if (err) console.log(err);
    
  //   fs.writeFile('file.csv', csv, function(err) {
  //     if (err) throw err;
      
  //     console.log('file saved');
  //     console.log(csv);
  //   });
  // });

});


 



