dataset_variable1 = LoadBaseData("Calories", "2015-05-20", "2015-05-21")["data"];
dataset_variable2 = LoadBaseData("HR", "2015-05-20", "2015-05-21")["data"];

data = dataset_variable1
for ( var i = 0; i < dataset_variable2.length; i++) {
	data[i]["HR"] = dataset_variable2[i].HR
}

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


// X axis: scale and draw:
var x = d3.scaleLinear()
	.domain([0, 1.1*d3.max(data, function(d) { return + d.Calories })])     // d3.max(data, function(d) { return +d.price })
	.range([0, svgWidth]);
	
svg.append("g")
	.attr("transform", "translate(0," + svgHeight + ")")
    .call(d3.axisBottom(x));
    
// Y axis: scale and draw:
var y = d3.scaleLinear()
	.range([svgHeight, 0]);
	y.domain([0, 1.1*d3.max(data, function(d) { return + d.HR })]);   // d3.max(bins, function(d) { return d.length; })
	
svg.append("g")
	.call(d3.axisLeft(y));

// set tooltip for mouse movement
let tooltip = d3.select("#tooltip")
	.attr("class", "tooltip")
	.style("opacity", 0);

function mouseOver (event,d){
	tooltip.transition()
		.duration(200)
		.style("opacity", .9);
		tooltip.html("Calories:" + d.Calories + "<br>HR:" + d.HR);
}

function mouseOut (event,d){
	tooltip.transition()
		.duration(500)
		.style("opacity", 0);
}

// append the bar rectangles to the svg element
svg.append('g')
	.selectAll("dot")
	.data(data)
	.enter()
	.append("circle")
		.attr("cx", function (d) { return x(d.Calories); } )
		.attr("cy", function (d) { return y(d.HR); } )
		.style("fill",  "#b36969" )
		.attr("r", 3)
	.on("mouseover",mouseOver)
	.on("mouseout",mouseOut);
