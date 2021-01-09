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
	.domain([0, 100])     // d3.max(data, function(d) { return +d.price })
	.range([0, svgWidth]);
	
svg.append("g")
	.attr("transform", "translate(0," + svgHeight + ")")
    .call(d3.axisBottom(x));
    
// Y axis: scale and draw:
var y = d3.scaleLinear()
	.range([svgHeight, 0]);
	y.domain([0,100]);   // d3.max(bins, function(d) { return d.length; })
	
svg.append("g")
	.call(d3.axisLeft(y));

// set tooltip for mouse movement
var tooltip = d3.select("#plot_1").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);



// append the bar rectangles to the svg element
vg_1.append('g')
	.selectAll("dot")
	.data(dataset)
	.enter()
	.append("circle")
		.attr("class", function(d) { return d.continent} )
		.attr("cx", function (d) { return x(d.income/1000); } )
		.attr("cy", function (d) { return y(d.cellphone); } )
		.attr("r", function (d) { return z(Math.sqrt(d.population)); } )
		.style("fill", function (d) { return myColor(d.continent);} )
		.style("opacity", "0.7")
		.attr("stroke", "black")
		.style("stroke-width", "1px")
	.on("mouseover", function(event,d) {
		tooltip.transition()
			.duration(200)
			.style("opacity", .9);
			tooltip.html(d.country + "<br>Population:" + d.population + "<br>GDP:" + d.income + "<br>Cell phone:" + d.cellphone)
			.style("left", (event.pageX) + "px")
			.style("top", (event.pageY - 28) + "px");
			
		})
	.on("mouseout", function(d) {
		tooltip.transition()
			.duration(500)
			.style("opacity", 0);
		});
