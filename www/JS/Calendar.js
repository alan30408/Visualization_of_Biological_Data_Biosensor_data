/* Project Biosensors */

var svg;

// Dimensions of chart and margin
var chartWidth = 1080;
var chartHeight = 300;
const margin = {top: 30, right: 30, bottom: 80, left: 50};

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

  // https://blog.risingstack.com/tutorial-d3-js-calendar-heatmap/

{
     dataset = dataset["data"]

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
     d3.select("#XWithLabel")
          .call(d3.axisBottom(scaleX))
          .selectAll("text")
               .style("text-anchor", "end")
               .attr("dx", "-.8em")
               .attr("dy", ".15em")
               .attr("transform","rotate(-30)"); // can be left out for short values
               
     d3.select("#XVariable")
          .text("Hour of Day");
     
     // Add y axis with label        
     d3.select("#YWithLabel")
          .call(d3.axisLeft(scaleY));

     d3.select("#YVariable")
          .text(coly);


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
          tooltip
          .style("visibility","hidden")
          }

     function mouseClick (event,d){
          d3.select(event.currentTarget)
          tooltip
               .style("visibility","visible")
               .style("width", chartWidth+margin.left+margin.right)
               .text("")
     }


     // Add bars
     d3.selectAll(".bars").remove()

     
          svg.selectAll("bars")
               .data(dataset)
               .enter()
               .append("rect")
               .attr("class", function(d) {return "bars"})
               .attr("x", function(d){return scaleX(d[colx]);})
               .attr("y", function(d) {return scaleY(d[coly]);})
               .attr("width",scaleX.bandwidth())
               .attr("height",function(d){return chartHeight - scaleY(d[coly]);})
               .attr("fill", function(d){ return d[colx] < 15 && d[colx]> 1? "#6600cc" : "#FF9900"})             
               .on("mouseover",mouseOver)
               .on("mouseout",mouseOut)
               .on("click",mouseClick);
     
}