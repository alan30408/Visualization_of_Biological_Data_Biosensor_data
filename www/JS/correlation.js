function correlation_plot(variables) {	

	raw_data = LoadCorrData(variables)
	raw_data = JSON.parse(raw_data);
	var r_value = raw_data.r_value
	Time = LoadBaseData(variables[0])["data"];

	data = Time
	for ( var i = 0; i < Time.length; i++) {
		data[i][variables[1]] = raw_data.y_values[i]
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
		.domain([0, 1.1*d3.max(data, function(d) { return + d[variables[0]] })])     // d3.max(data, function(d) { return +d.price })
		.range([0, svgWidth]);
		
	svg.append("g")
		.attr("transform", "translate(0," + svgHeight + ")")
		.call(d3.axisBottom(x));
		
	// Y axis: scale and draw:
	var y = d3.scaleLinear()
		.range([svgHeight, 0]);
		y.domain([0, 1.1*d3.max(data, function(d) { return + d[variables[1]] })]);   // d3.max(bins, function(d) { return d.length; })
		
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
			tooltip.html("Data: " + d.Time + `<br>${variables[0]}: ` + d[variables[0]] + `<br>${variables[1]}: ` + d[variables[1]]);
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
			.attr("cx", function (d) { return x(d[variables[0]]); } )
			.attr("cy", function (d) { return y(d[variables[1]]); } )
			.style("fill",  "#b36969" )
			.attr("r", 3)
			.attr("stroke", "black")
		.on("mouseover",mouseOver)
		.on("mouseout",mouseOut);
}
