const svgWidth = 500 ;
const svgHeight = 400;
const margin = {top: 30, right: 30, bottom: 90, left: 30};

// var	svg = d3.select("#plot")
// 		.append("svg")
// 		.attr("width", svgWidth + margin.left + margin.right)
// 		.attr("height", svgHeight + margin.top + margin.bottom)
// 		.attr("class", "chart")
// 		.append("g")
// 		.attr("transform","translate(" + margin.left + "," + margin.top + ")");

	// // X axys
	// svg.append("g")
	// 	.attr("id", "XWithLabel")
	// 	.attr("transform", "translate(0," + svgHeight + ")");

	// svg.append("text")
	// 	.attr("id", "XVariable")
	// 	// .attr("text-anchor", "end")
	// 	.attr("x", (svgWidth - margin.left - margin.right)/2)
	// 	.attr("y", svgHeight+margin.top+10);


	// // Y axys
	// svg.append("g")
	// 	.attr("id", "YWithLabel")

	// svg.append("text")
	// 	.attr("id", "YVariable")
	// 	.attr("text-anchor", "middle")
	// 	.attr("x",0)
	// 	.attr("y", -10);
	
	// // R value
	// svg.append("text")
	// 	.attr("id", "RValue")
	// 	.attr("text-anchor", "middle")
	// 	.attr("x",svgWidth-30)
	// 	.attr("y", 0);
///////////////////////////////////////////////////////////////////////////////////////////////////////////

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
		.attr("transform", "translate(0," + svgHeight + ")");

	svg.append("text")
		.attr("id", "XVariable")
		.attr("text-anchor", "middle")
		.attr("x", (svgWidth)/2)
		.attr("y", svgHeight+margin.top+5);

	// Y axys
	svg.append("g")
		.attr("id", "YWithLabel")

	svg.append("text")
		.attr("id", "YVariable")
		.attr("text-anchor", "start")
		.attr("x",-20)
		.attr("y", -10);

	// R value
	svg.append("text")
		.attr("id", "RValue")
		.attr("text-anchor", "middle")
		.attr("x",svgWidth-30)
		.attr("y", -10);
	

// Heatmap Function
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
	
	// counting number of point in cell
	var count = [];
	var split_number = 100 
	var x_split = (data.max_x+0.1)/split_number
	var y_split = (data.max_y+0.1)/split_number
	var index = 0;
	for (var i = 0; i < split_number; i++){
		for (var j = 0; j < split_number; j++){
			count.push({
				coordinata: i*split_number+j,
				count: 0
			});
		}
	}

	for (var i = 0; i < data.data.length; i++) {
		x_index = data.data[i][0]/x_split;
		y_index = data.data[i][1]/y_split;
		var index = parseInt(x_index)*split_number + parseInt(y_index)
		count[index]["count"]+=1

	}

	var header = d3.select("#title")
		.html("<h3>1000 random number between 0 and 100</h3><br/>To get new data set refresh the page (use ctrl+f5 to clear the cashe)");

	// X label: x-axis label
	var x_label = d3.scaleLinear()
		.domain([0, 1.1*data.max_x])   
		.range([0, svgWidth]);

	// Y label: y-axis label
	var y_label = d3.scaleLinear()
		.range([svgHeight, 0])
		.domain([0, 1.1*data.max_y]);   

	// Setting cell of heatmap
	var domain = []
	for (var i = 0; i< split_number; i++){
		domain.push(i)
	}

	// X scale: ploting x scale
	var x_scale = d3.scaleBand()
		.range([ 0, svgWidth])
		.domain(domain)
		.padding(0.05);

	// Y scale: ploting y scale
	var y_scale = d3.scaleBand()
		.range([ svgHeight, 0 ])
		.domain(domain)
		.padding(0.05);
	
	// Add x axis with label    
	d3.select("#XWithLabel")
		.call(d3.axisBottom(x_label))

	d3.select("#XVariable")
		.text(label_unit[variables[0]]);

	// Add y axis with label        
	d3.select("#YWithLabel")
		.call(d3.axisLeft(y_label));

	d3.select("#YVariable")
		.text(label_unit[variables[1]]);
	
	// Add r value with label
	d3.select("#RValue")
		.text("r value: "+ r_value.toFixed(4))
	
	// Legend
	d3.select("LegendLabel")
		

	// set color for heatmap
	var myColor = d3.scaleSqrt()
    	.range(["#F8F8FF", "#00a6ca","#00ccbc","#90eb9d","#ffff8c","#f9d057","#f29e2e","#e76818","#d7191c"])
		.domain([0, max(count)/9, 2*max(count)/9, 3*max(count)/9, 4*max(count)/9, 5*max(count)/9, 
			6*max(count)/9, 7*max(count)/9, 8*max(count)/9, max(count)])
	
	
	// set tooltip for mouse movement
	let tooltip = d3.select("#tooltip")
		.attr("class", "tooltip")
		.style("visibility", "hidden");

	function mouseOver (event,d){
		if (d.count != 0){
			tooltip
				.style("visibility","visible")
				.style("width", svgWidth + margin.left + margin.right)
				.style("opacity", .9)
				.html(`Count:` + d.count);
		}
	}
	
	function mouseOut (event,d){
		tooltip
			.style("visibility","hidden")
	}

	// function of split and find max value
	function splitout (d){
		d = d.coordinata
		var coor_x = parseInt(d/split_number)
		var coor_y = d - coor_x*split_number
		return [coor_x, coor_y]
	}

	function max (d){
		var max_number = 0
		for (var i = 0; i < d.length; i++){
			if (d[i]["count"] > max_number){
				max_number = d[i]["count"]
			}
		}
		return max_number
	}

	// Remove data one time per click
	d3.selectAll(".dot").remove()

	// append the dot to the svg element
	svg.append('g')
		.selectAll()
		.data(count, function(d) {return splitout(d)[0]+':'+splitout(d)[1];})
		.enter()
		.append("rect")
			.attr("x", function (d) { return x_scale( splitout(d)[0]); })
			.attr("y", function (d) { return y_scale( splitout(d)[1]); })
			.attr("class", function(d) {return "dot"})
			.attr("width", x_scale.bandwidth() )
			.attr("height", y_scale.bandwidth() )
			.style("fill", function(d) { return myColor(d.count); } )
		.on("mouseover",mouseOver)
		.on("mouseout", mouseOut)
	
	// append the legend to the svg element
	svg.append("g")
		.selectAll()
		.data(myColor.range())
		.enter()
		.append("rect")
			.attr("width", 40)
			.attr("height", 20)
			.attr("class", function(d) {return "dot"})
			.attr("x", function(d,i){ return ((svgWidth - margin.left - margin.right)/2-150) + i*40})
			.attr("y", svgHeight + margin.bottom - 40)
			.style("fill", function(d) {return d})

	// append the legend label to the svg element
	svg.append("g")
		.selectAll()
		.data(myColor.domain())
		.enter()
		.append("text")
			.attr("width", 40)
			.attr("height", 20)
			.attr("class", function(d) {return "dot"})
			.attr("x", function(d,i){ return ((svgWidth - margin.left - margin.right)/2-150) + i*40})
			.attr("y", svgHeight + margin.bottom-10 )
			.attr("text-anchor", "left")
			.style('font-size', '10px')
			.text(function(d){ return parseInt(d)})



	// svg.append('g')
	// 	.selectAll("dot")
	// 	.data(data.data)
	// 	.enter()
	// 	.append("circle")
	// 		.attr("cx", function (d) { return x_label(d[0]); } )
	// 		.attr("cy", function (d) { return y_label(d[1]); } )
	// 		.attr("class", function(d) {return "dot"})
	// 		.style("fill",  "#b36969" )
	// 		.attr("r", 3)
	// 		.attr("stroke", "black")
	// 	.on("mouseover",mouseOver)
	// 	.on("mouseout",mouseOut);

}
