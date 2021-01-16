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
		.attr("transform", "translate(0," + svgHeight + ")");

	svg.append("text")
		.attr("id", "XVariable")
		// .attr("text-anchor", "end")
		.attr("x", (svgWidth - margin.left - margin.right)/2)
		.attr("y", svgHeight+margin.top+10);


	// Y axys
	svg.append("g")
		.attr("id", "YWithLabel")

	svg.append("text")
		.attr("id", "YVariable")
		.attr("text-anchor", "middle")
		.attr("x",0)
		.attr("y", -10);
	
	// R value
	svg.append("text")
		.attr("id", "RValue")
		.attr("text-anchor", "middle")
		.attr("x",svgWidth-30)
		.attr("y", 0);
///////////////////////////////////////////////////////////////////////////////////////////////////////////
var	svg1 = d3.select("#plot")
		.append("svg")
		.attr("width", svgWidth + margin.left + margin.right)
		.attr("height", svgHeight + margin.top + margin.bottom)
		.attr("class", "chart")
		.append("g")
		.attr("transform","translate(" + margin.left + "," + margin.top + ")");
	
	// X axys
	svg1.append("g")
		.attr("id", "XWithLabel_heatmap")
		.attr("transform", "translate(0," + svgHeight + ")");

	svg1.append("text")
		.attr("id", "XVariable_heatmap")
		// .attr("text-anchor", "end")
		.attr("x", (svgWidth - margin.left - margin.right)/2)
		.attr("y", svgHeight+margin.top+10);

	// Y axys
	svg1.append("g")
		.attr("id", "YWithLabel_heatmap")

	svg1.append("text")
		.attr("id", "YVariable_heatmap")
		.attr("text-anchor", "middle")
		.attr("x",0)
		.attr("y", -10);

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
		x_label = data.data[i][0]/x_split;
		y_label = data.data[i][1]/y_split;
		var index = parseInt(x_label)*split_number + parseInt(y_label)
		count[index]["count"]+=1

	}

	var header = d3.select("#title").html("<h3>1000 random number between 0 and 100</h3><br/>To get new data set refresh the page (use ctrl+f5 to clear the cashe)");

	// X axis: scale and draw:
	var x = d3.scaleLinear()
		.domain([0, 1.1*data.max_x])     // d3.max(data, function(d) { return +d.price })
		.range([0, svgWidth]);
		
	// Y axis: scale and draw:
	var y = d3.scaleLinear()
		.range([svgHeight, 0])
		.domain([0, 1.1*data.max_y]);   // d3.max(bins, function(d) { return d.length; })
	
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

	// set color for heatmap

	var myColor = d3.scaleSequential(t => d3.hsl(t * 360, 1, 0.5).toString())
		.domain([0,Math.sqrt(max(count))])
	
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

	// append the dot to the svg element
	
	d3.selectAll(".dot").remove()

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

///////////////////////////////////////////////////////////////////////////////////////////////
	// Build X scales and axis:

	var domain = []
	for (var i = 0; i< split_number; i++){
		domain.push(i)
	}

	var x_scale = d3.scaleBand()
		.range([ 0, svgWidth])
		.domain(domain)
		.padding(0.05);

	// Build Y scales and axis:
	var y_scale = d3.scaleBand()
		.range([ svgHeight, 0 ])
		.domain(domain)
		.padding(0.05);

	d3.select("#XWithLabel_heatmap")
		.call(d3.axisBottom(x_scale))

	d3.select("#XVariable_heatmap")
		.text(label_unit[variables[0]]);

	// Add y axis with label        
	d3.select("#YWithLabel_heatmap")
		.call(d3.axisLeft(y_scale));

	d3.select("#YVariable_heatmap")
		.text(label_unit[variables[1]]);
	console.log(y_scale.bandwidth())
	svg1.append('g')
		.selectAll()
		.data(count, function(d) {return splitout(d)[0]+':'+splitout(d)[1];})
		.enter()
		.append("rect")
			.attr("x", function (d) { return x_scale( splitout(d)[0]); })
			.attr("y", function (d) { return y_scale( splitout(d)[1]); })
			.attr("class", function(d) {return "dot"})
			.attr("width", x_scale.bandwidth() )
			.attr("height", y_scale.bandwidth() )
			.style("fill", function(d) { return myColor(Math.sqrt(d.count)); } )

			
}
