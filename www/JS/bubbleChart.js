/*
	Jaka Jenko
	Made with the help of: https://www.d3-graph-gallery.com/graph/bubble_template.html
*/

var header = d3.select("#title").html("<h3>Bubble chart of relationship of Vehicles per 1000 persons and Percent of paved roards to Deths per 100k people</h3>");


function PrepareData(vehiclesPer1000Persons, roadPavedPercentOfTotal, deathsPer100kPeople, countryByContinent, year)
{
	combinedData = []
	year = "2007"
	
	for (var i = 0; i < vehiclesPer1000Persons.length; i++) {
		var vehicles = vehiclesPer1000Persons[i];
		var roads = undefined;
		var deaths = undefined;
		
        for (var j = 0; j < roadPavedPercentOfTotal.length; j++) {
			if(roadPavedPercentOfTotal[j].country == vehicles.country){
				roads = roadPavedPercentOfTotal[j];
			}
		}
		
		for (var j = 0; j < deathsPer100kPeople.length; j++) {
			if(deathsPer100kPeople[j].country == vehicles.country){
				deaths = deathsPer100kPeople[j];
			}
		}
		
		if(roads != undefined && deaths != undefined){
			if(roads[year] != null && deaths[year] != null){
				var contintent = "";
				
				for (var c = 0; c < countryByContinent.length; c++){
					if (countryByContinent[c].country == vehicles.country){
						contintent = countryByContinent[c].continent;
					}
				}
				
				combinedData.push([vehicles.country, vehicles[year], parseFloat(roads[year])*100, deaths[year], contintent])
			}
		}
    }
	
	return combinedData;
}

function showData()
{
	var vehiclesPer1000Persons = JSON.parse(dataset["cars_trucks_and_buses_per_1000_persons"]);
	var roadPavedPercentOfTotal = JSON.parse(dataset["roads_paved_percent_of_total_roads"]);
	var deathsPer100kPeople = JSON.parse(dataset["traffic_deaths_per_100000_people"]);
	var countryByContinent = dataset["country_by_continent"];


	combinedData = PrepareData(vehiclesPer1000Persons, roadPavedPercentOfTotal, deathsPer100kPeople, countryByContinent, 2007);

	// set the dimensions and margins of the graph
	var margin = {top: 40, right: 200, bottom: 60, left: 50},
		width = 750 - margin.left - margin.right,
		height = 420 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	var svg = d3.select("#plot")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform",
				"translate(" + margin.left + "," + margin.top + ")");


	// ---------------------------//
	//       AXIS  AND SCALE      //
	// ---------------------------//

	// Add X axis
	var x = d3.scaleLinear()
	.domain([0, 100])
	.range([ 0, width ]);
	svg.append("g")
	.attr("transform", "translate(0," + height + ")")
	.call(d3.axisBottom(x).ticks(10));

	// Add X axis label:
	svg.append("text")
		.attr("text-anchor", "end")
		.attr("x", width)
		.attr("y", height+50 )
		.text("Percent of paved roads");

	// Add Y axis
	var y = d3.scaleLinear()
	.domain([0, 1000])
	.range([ height, 0]);
	svg.append("g")
	.call(d3.axisLeft(y).ticks(10));

	// Add Y axis label:
	svg.append("text")
		.attr("text-anchor", "end")
		.attr("x", 0)
		.attr("y", -20 )
		.text("Vehicles per 1000 persons")
		.attr("text-anchor", "start")

	// Add a scale for bubble size
	var z = d3.scaleSqrt()
		.domain([0, 50])
		.range([ 1, 30]);

	// Add a scale for bubble color
	var myColor = d3.scaleOrdinal()
		.domain(["Asia", "Europe", "North America", "Africa", "Oceania"])
		.range(d3.schemeSet1);

	// ---------------------------//
	//      TOOLTIP               //
	// ---------------------------//

	var tooltip = d3.select("#plot")
	.append("div")
		.style("position", "absolute")
		.style("display", "inline-block")
		.style("display", "none")
		.attr("class", "tooltip")
		.style("border-radius", "5px")
		.style("padding", "10px")
		.style("color", "white")

	var showTooltip = function(d) {
	tooltip
		.style("display", "block")
		.style("background-color", myColor(d.currentTarget.__data__[4]))
		.html(d.currentTarget.__data__[0])
		.style("left", (d.x+10) + "px")
		.style("top", (d.y+15) + "px")
	}
	var moveTooltip = function(d) {
	tooltip
		.style("left", (d.x+10) + "px")
		.style("top", (d.y+15) + "px")
	}
	var hideTooltip = function(d) {
	tooltip
		.style("display", "none")
	}


	// ---------------------------//
	//       HIGHLIGHT GROUP      //
	// ---------------------------//

	// What to do when one group is hovered
	var highlight = function(d){
		// reduce opacity of all groups
		d3.selectAll(".bubbles").style("opacity", .05)
		// expect the one that is hovered
		d3.selectAll("."+d.currentTarget.__data__.replace(" ", "")).style("opacity", 1)
	}

	// And when it is not hovered anymore
	var noHighlight = function(d){
		d3.selectAll(".bubbles").style("opacity", 0.75)
	}

	// ---------------------------//
	//       CIRCLES              //
	// ---------------------------//

	// Add dots
	svg.append('g')
	.selectAll("dot")
	.data(combinedData)
	.enter()
	.append("circle")
		.attr("class", function(d) { return "bubbles " + d[4].replace(" ", "") })
		.attr("cx", function (d) { return x(d[2]); } )
		.attr("cy", function (d) { return y(d[1]); } )
		.attr("r", function (d) { return z(d[3]); } )
		.style("fill", function (d) { return myColor(d[4]); } )
		.style("opacity", 0.75 )
			// -3- Trigger the functions for hover
		.on("mouseover", showTooltip )
		.on("mousemove", moveTooltip )
		.on("mouseleave", hideTooltip )


	// ---------------------------//
	//       LEGEND              //
	// ---------------------------//

	// Add legend: circles
	var valuesToShow = [1, 10, 50]
	var xCircle = 600
	var xLabel = 650
	svg.selectAll("legend")
		.data(valuesToShow)
		.enter()
		.append("circle")
		.attr("cx", xCircle)
		.attr("cy", function(d){ return height - 100 - z(d) } )
		.attr("r", function(d){ return z(d) })
		.style("fill", "none")
		.attr("stroke", "black")

	// Add legend: segments
	svg.selectAll("legend")
		.data(valuesToShow)
		.enter()
		.append("line")
		.attr('x1', function(d){ return xCircle + z(d) } )
		.attr('x2', xLabel)
		.attr('y1', function(d){ return height - 100 - z(d) } )
		.attr('y2', function(d){ return height - 100 - z(d) } )
		.attr('stroke', 'black')
		.style('stroke-dasharray', ('2,2'))

	// Add legend: labels
	svg.selectAll("legend")
		.data(valuesToShow)
		.enter()
		.append("text")
		.attr('x', xLabel)
		.attr('y', function(d){ return height - 100 - z(d) } )
		.text( function(d){ return d } )
		.style("font-size", 10)
		.attr('alignment-baseline', 'middle')

	// Legend title
	svg.append("text")
		.attr('x', xCircle)
		.attr("y", height - 100 +30)
		.text("Deaths per 100k people")
		.attr("text-anchor", "middle")

	// Add one dot in the legend for each name.
	var size = 20
	var allgroups = ["Asia", "Europe", "North America", "Africa", "Oceania"]
	svg.selectAll("myrect")
		.data(allgroups)
		.enter()
		.append("circle")
		.attr("cx", 550)
		.attr("cy", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
		.attr("r", 7)
		.style("fill", function(d){ return myColor(d)})
		.on("mouseover", highlight)
		.on("mouseleave", noHighlight)


	// Add labels beside legend dots
	svg.selectAll("mylabels")
		.data(allgroups)
		.enter()
		.append("text")
		.attr("x", 550 + size*.8)
		.attr("y", function(d,i){ return i * (size + 5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
		.style("fill", function(d){ return myColor(d)})
		.text(function(d){ return d})
		.attr("text-anchor", "left")
		.style("alignment-baseline", "middle")
		.on("mouseover", highlight)
		.on("mouseleave", noHighlight)
}