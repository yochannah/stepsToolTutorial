//Every query needs to start with the URL for a mine to query.
//We've used IMJS to initialise a relationship with the webservice
var flymine = new imjs.Service({
  root: 'http://www.flymine.org/flymine/service/'
});

//The Query JSON. We're keeping it simple and just selecting just the gene
//symbol and organism name at the moment, from the intermine list 'PL FlyAtlas_brain_top'
var query = {
  "from": "Gene",
  "select": [
    "symbol",
    "organism.name"
  ],
  "where": [{
    "path": "Gene",
    "op": "IN",
    "value": "PL FlyAtlas_brain_top",
    "code": "A"
  }]
};

//we'll create an HTML string and append the results of the query to it.
//In the real world you might want to do something more maintainable,
//e.g. use a templating system or framework, but we're keeping it simple for
//this tutorial.
var myHTML = "<div>";

//the .records() method returns a Promise. When the promise resolves, the code
//in the .then() block resolves, and we get a nice array of JSON objects to read from
flymine.records(query).then(function(response) {

  //add contents of the response to our webapp display HTML
  response.forEach(function(row){
    myHTML = myHTML + "Organism: " + row.organism.name + " Symbol: " + row.symbol + "<br>";
    myHTML = myHTML + "</div>";
  });

  //now append the results to our element so the user can see it.
 document.getElementById('myFirstListDisplayer').innerHTML = myHTML;
});
