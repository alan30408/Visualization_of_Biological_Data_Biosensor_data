/* Project Biosensors - Jenko Schneider Stickel Tung */

var svg;

// Dimensions of chart and margin
var chartWidth = 500;
var chartHeight = 600;
const margin = {top: 30, right: 30, bottom: 80, left: 50};
const boxSize = 20;

document.addEventListener("DOMContentLoaded", function(event) {
     // Specify columns that should be used as data for x and y
     colx = "Time";

     // Create SVG and place it correctly
     svg = d3.select("#plot")
          .append("svg")
          .attr("width", chartWidth + margin.left + margin.right)
          .attr("height", chartHeight + margin.top + margin.bottom)
          .attr("class", "chart")
          .append("g")
          .attr("transform","translate(" + margin.left + "," + margin.top + ")");

     // X axys
     svg.append("g")
          .attr("id", "XWithLabel")
          .attr("transform", "translate(0," + chartHeight + ")")

     svg.append("text")
          .attr("id", "XVariable")
          .attr("text-anchor", "end")
          .attr("x", chartWidth)
          .attr("y", chartHeight+margin.top+40) 


     // Y axys
     svg.append("g")
          .attr("id", "YWithLabel")

     svg.append("text")
          .attr("id", "YVariable")
          .attr("text-anchor", "start")
          .attr("x",-40)
          .attr("y", -10)

});

function DrawGraph(dataset, coly)
{
     // load min and max value from data loading
     ymin = dataset["min"][coly];
     ymax = dataset["max"][coly];

     dataset = dataset["data"];

     // Define axes
     let textX = d3.scaleBand()
          .domain(dataset.map(function(d) { return DateToString(d[colx], "monthYear"); }))
          .range([0,chartWidth]);

     let textY = d3.scaleBand()
          .domain(dataset.map(function(d) { return DateToString(d[colx], "day"); }))
          .range([chartHeight,0]);
     
     
     // Add x axis with label (can be rotated if too long)        
     d3.select("#XWithLabel")
          .call(d3.axisBottom(textX))
          .selectAll("text")
               .style("text-anchor", "end")
               .attr("dx", "-.8em")
               .attr("dy", ".15em")
               .attr("transform","rotate(-30)"); // can be left out for short values
               
     d3.select("#XVariable")
          .text("Month");
     
     // Add y axis with label        
     d3.select("#YWithLabel")
          .call(d3.axisLeft(textY));

     d3.select("#YVariable")
          .text("Day");


     // Define diverging colorscale    
     var divColor = d3.scaleLinear()
          .domain([ymin, ymax])
          .range(["white", "orange"])
          .interpolate(d3.interpolateRgb);


     // Define tooltip and its functions
     let tooltip = d3.select("#tooltip")
          .style("visibility", "hidden");

     function mouseOver (event,d){
          d3.select(event.currentTarget)
          tooltip
               .style("visibility","visible")
               .style("width", chartWidth+margin.left+margin.right)
               .text(Math.round(d[coly]*100)/100)
     }

     function mouseOut (event,d){
          //console.log(DateToString(d[colx], "monthDay"));
          tooltip
          .style("visibility","hidden")
          }

     function mouseClick (event,d){
          location.href = "generalData?date=" + DateToString(d.Time, "getParameter");
     }


     // Add bars
     d3.selectAll(".bars").remove()

          svg.selectAll("bars")
               .data(dataset)
               .enter()
               .append("rect")
               .attr("class", function(d) {return "bars"})
               .attr("x", function(d){return textX(DateToString(d[colx], "monthYear"))+12;})
               .attr("y", function(d) {return textY(DateToString(d[colx],"day"));})
               .attr("width", boxSize)
               .attr("height", boxSize)
               .attr("fill", function(d) { return divColor(d[coly]);})          
               .on("mouseover",mouseOver)
               .on("mouseout",mouseOut)
               .on("click",mouseClick);
     
}