const svgWidth = 500 ;
const svgHeight = 360;
const margin = {top: 30, right: 30, bottom: 50, left: 50};

var	svg = d3.select("#plot")
		.append("svg")
		.attr("width", svgWidth + margin.left + margin.right)
		.attr("height", svgHeight + margin.top + margin.bottom)
		.attr("class", "chart")
		.append("g")
		.attr("transform","translate(" + margin.left + "," + margin.top + ")");

	// X axys
	svg.append("g")
		.attr("id", "XWithLabel")
		.attr("transform", "translate(0," + svgHeight + ")")

	svg.append("text")
		.attr("id", "XVariable")
		// .attr("text-anchor", "end")
		.attr("x", (svgWidth - margin.left - margin.right)/2)
		.attr("y", svgHeight+margin.top+10)


	// Y axys
	svg.append("g")
		.attr("id", "YWithLabel")

	svg.append("text")
		.attr("id", "YVariable")
		.attr("text-anchor", "middle")
		.attr("x",0)
		.attr("y", -10)
	
	// R value
	svg.append("text")
		.attr("id", "RValue")
		.attr("text-anchor", "middle")
		.attr("x",svgWidth-30)
		.attr("y", 0)
	

function correlation_plot(variables) {	

	var data = LoadData(variables, null, null, "correlation");
	var r_value = data.r_value;

	// set label
	var label_unit = {
		"Temperature": "Temperature (F)",
		"Calories": "Calories (kcal)",
		"HR": "HR (BPM)",
		"Steps": "Steps (steps)"
	}
	

	var header = d3.select("#title").html("<h3>1000 random number between 0 and 100</h3><br/>To get new data set refresh the page (use ctrl+f5 to clear the cashe)");

	// X axis: scale and draw:
	var x = d3.scaleLinear()
		.domain([0, 1.1*data.max_x])     // d3.max(data, function(d) { return +d.price })
		.range([0, svgWidth]);
		
	// Y axis: scale and draw:
	var y = d3.scaleLinear()
		.range([svgHeight, 0]);
		y.domain([0, 1.1*data.max_y]);   // d3.max(bins, function(d) { return d.length; })
	
	// Add x axis with label (can be rotated if too long)        
	d3.select("#XWithLabel")
		.call(d3.axisBottom(x))

	d3.select("#XVariable")
		.text(label_unit[variables[0]]);

	// Add y axis with label        
	d3.select("#YWithLabel")
		.call(d3.axisLeft(y));

	d3.select("#YVariable")
		.text(label_unit[variables[1]]);
	
	d3.select("#RValue")
		.text("r value: "+ r_value.toFixed(4))

	// set tooltip for mouse movement
	
	let tooltip = d3.select("#tooltip")
		.attr("class", "tooltip")
		.style("opacity", 0);

	function mouseOver (event,d){
		tooltip.transition()
			.duration(200)
			.style("opacity", .9);
			tooltip.html(`${variables[0]}:` + d[0].toFixed(4) + `<br>${variables[1]}:` + d[1].toFixed(4));
	}
	
	function mouseOut (event,d){
		tooltip.transition()
			.duration(500)
			.style("opacity", 0);
	}

	// append the bar rectangles to the svg element
	
	d3.selectAll(".dot").remove()
	d3.selectAll(".r_value").remove()

	svg.selectAll("r_value")
        .data(r_value)
        .enter()
        .append("text")
            .attr("x", svgWidth-30)
            .attr("y", svgHeight-30) 
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")

	svg.append('g')
		.selectAll("dot")
		.data(data.data)
		.enter()
		.append("circle")
			.attr("cx", function (d) { return x(d[0]); } )
			.attr("cy", function (d) { return y(d[1]); } )
			.attr("class", function(d) {return "dot"})
			.style("fill",  "#b36969" )
			.attr("r", 3)
			.attr("stroke", "black")
		.on("mouseover",mouseOver)
		.on("mouseout",mouseOut);
	
	
}
