/* Project Biosensors */
// Help for line plot part: https://www.d3-graph-gallery.com/graph/line_change_data.html

//Print dataset to console
dataset.splice(0,1); // leave out if dataset has no header
console.log(dataset);


// Dimensions of chart and margin
var barHeight = 10;

let chartWidth = 500;
var chartHeight = dataset.length * barHeight;
const margin = {top: 30, right: 30, bottom: 80, left: 50};


// Create SVG and place it correctly
let svg = d3.select("#barDiv")
     .append("svg")
     .attr("width", chartWidth + margin.left + margin.right)
     .attr("height", chartHeight + margin.top + margin.bottom)
     .attr("class", "chart")

     .append("g")
     .attr("transform","translate(" + margin.left + "," + margin.top + ")");


// Find minimum and maximum value for our y attribute
let ymin = Infinity;
let ymax = -Infinity;

for (row=0;row<dataset.length;row++){ 
     if(dataset[row].Column2 < ymin){
          ymin = dataset[row].Column2
     }
     if(dataset[row].Column2 > ymax){
          ymax = dataset[row].Column2
     }
}


// Define axes
let scaleX = d3.scaleBand()
     .domain(dataset.map(function(d) { return d.Column1; }))
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
     .text("Label x [Unit]");


// Add y axis with label        
svg.append("g")
     .call(d3.axisLeft(scaleY));

svg.append("text")
     .attr("text-anchor", "start")
     .attr("x",-40)
     .attr("y", -10)
     .text("Label y [Unit]");
     

// Add line
const lines = svg.selectAll("lines")
    .data([dataset], function(d){return d.Column1});

lines
    .enter()
    .append("path")
    .attr("class", "avgLine")
    .merge(lines)
    .attr("d", d3.line()
          .x(function(d){return scaleX(d.Column1);})
          .y(function(d){return scaleY(d.Column2);}))
          .attr("fill", "none");
