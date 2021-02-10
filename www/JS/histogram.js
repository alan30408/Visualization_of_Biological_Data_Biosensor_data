/* Project Biosensors - Jenko Schneider Stickel Tung */

// set svg dimensions and margins
const svgWidth = 500 ;
const svgHeight = 360;
const margin = {top: 20, right: 30, bottom: 30, left: 38};

var header = d3.select("#title").html("<h3>1000 random number between 0 and 100</h3><br/>To get new data set refresh the page (use ctrl+f5 to clear the cashe)");

// append the svg object to the body of the page
let svg = d3.select("#plot")
  .append("svg")
  .attr("width", svgWidth + margin.left + margin.right)
  .attr("height", svgHeight + margin.top + margin.bottom)
  .attr("class", "chart")
  .append("g")
  .attr("transform","translate(" + margin.left + "," + margin.top + ")");

console.log(dataset);
// get the data
data = dataset["numbers"];
// select feature to build the histogram with

// X axis: scale and draw:
var x = d3.scaleLinear()
	.domain([0, 100])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
	.range([0, svgWidth]);
	
svg.append("g")
	.attr("transform", "translate(0," + svgHeight + ")")
	.call(d3.axisBottom(x));

// set the parameters for the histogram
var histogram = d3.histogram()
	.value(function(d) { return d.price; })   // I need to give the vector of value
	.domain(x.domain())  // then the domain of the graphic
	.thresholds(x.ticks(10)); // then the numbers of bins

// And apply this function to data to get the bins
let binFunction = d3.bin()
		.value(function(test) { return test; })
		.domain(x.domain())   

console.log(data)
let bins = binFunction(data);
console.log(bins);


// Y axis: scale and draw:
var y = d3.scaleLinear()
	.range([svgHeight, 0]);
	y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
	
svg.append("g")
	.call(d3.axisLeft(y));

// append the bar rectangles to the svg element
svg.selectAll("rect")
	.data(bins)
	.enter()
	.append("rect")
	.attr("x", 1)
	.attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
	.attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
	.attr("height", function(d) { return svgHeight - y(d.length); })
	.attr("class","rectStyle")
