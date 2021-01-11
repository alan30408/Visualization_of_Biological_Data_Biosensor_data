/* Project Biosensors */


//Load dataset
dataset = LoadBaseData("HR", "2015-05-20", "2015-05-21");
console.log(dataset);
console.log(dataset["data"]);
dataset = dataset["data"]


// Specify columns that should be used as data for x and y
colx = "Time";
coly = "HR";


// Dimensions of chart and margin
let chartWidth = 500;
var chartHeight = 300;
const margin = {top: 30, right: 30, bottom: 80, left: 50};

// Create SVG and place it correctly
let svg = d3.select("#plot")
     .append("svg")
     .attr("width", chartWidth + margin.left + margin.right)
     .attr("height", chartHeight + margin.top + margin.bottom)
     .attr("class", "chart")

     .append("g")
     .attr("transform","translate(" + margin.left + "," + margin.top + ")");


// Find minimum and maximum value for our y attribute, as well as the average
let ymin = Infinity;
let ymax = -Infinity;
let sum = 0;

for (row=0;row<dataset.length;row++){ 
     if(dataset[row][coly] < ymin){
          ymin = dataset[row][coly]
     }
     if(dataset[row][coly] > ymax){
          ymax = dataset[row][coly]
     }
     sum += parseInt(dataset[row][coly])
}
let avg = sum/dataset.length;


// Define axes
let scaleX = d3.scaleBand()
     .domain(dataset.map(function(d) { return d[colx]; }))
     .range([0,chartWidth]);
let scaleY = d3.scaleLinear()
     .domain([ymin-10, ymax])
     .range([chartHeight,0]);
  
 
// Add x axis with label (can be rotated if too long)        
svg.append("g")
     .attr("transform", "translate(0," + chartHeight + ")")
     .call(d3.axisBottom(scaleX))
     .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform","rotate(-30)"); // can be left out for short values

svg.append("text")
     .attr("text-anchor", "end")
     .attr("x", chartWidth)
     .attr("y", chartHeight+margin.top+40) 
     .text(colx);


// Add y axis with label        
svg.append("g")
     .call(d3.axisLeft(scaleY));

svg.append("text")
     .attr("text-anchor", "start")
     .attr("x",-40)
     .attr("y", -10)
     .text(coly);


// Define diverging colorscale    
var divColor = d3.scaleLinear()
    .domain([ymin, avg, ymax])
    .range(["purple", "white","orange"])
    .interpolate(d3.interpolateRgb); 


// Define tooltip and its functions
let tooltip = d3.select("#tooltip")
	.style("visibility", "hidden");

function mouseOver (event,d){
	d3.select(event.currentTarget)
	tooltip
          .style("visibility","visible")
          .style("width", "50px")
		.text(Math.round(d[coly]))
}

function mouseOut (event,d){
	tooltip
	.style("visibility","hidden")
	}

function mouseClick (event,d){
	d3.select(event.currentTarget)
	tooltip
          .style("visibility","visible")
          .style("width", chartWidth+margin.left+margin.right)
		.text("Add description, more info etc.")
}


// Add bars
svg.selectAll("bars")
     .data(dataset)
     .enter()
     .append("rect")
       .attr("class", function(d) {return "bars"})
       .attr("x", function(d){return scaleX(d[colx]);})
       .attr("y", function(d) {return scaleY(d[coly]);})
       .attr("width",scaleX.bandwidth())
       .attr("height",function(d){return chartHeight - scaleY(d[coly]);})
       .attr("fill", function(d) { return divColor(d[coly]);})
       .on("mouseover",mouseOver)
	  .on("mouseout",mouseOut)
	  .on("click",mouseClick);


// Add line at average with legend
let plotAvg = chartHeight*(ymax-avg)/(ymax-(ymin));
let avgLine = svg.append("line")
     .attr("class", "avgLine")
     .attr("x1",0)
     .attr("y1", plotAvg)
     .attr("x2", chartWidth)
     .attr("y2", plotAvg);

let legLine = svg.append("line")
     .attr("class", "avgLine")
     .attr("x1", chartWidth-130)
     .attr("y1", -15)
     .attr("x2", chartWidth-90)
     .attr("y2", -15);

svg.append("text")
     .attr('x', (chartWidth-40))
     .attr("y", -10)
     .text("Average: "+ Math.round(avg))
     .attr("text-anchor", "middle")