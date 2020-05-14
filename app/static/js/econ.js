var clear = document.getElementById("yo").innerHTML;
var url = "/data/sector/"+clear.substring(1,clear.length);
console.log(url);
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
         `${"translate(" + margin.left + "," + margin.top + ")"}`);

var parseTime = d3.timeParse("%Y-%m-%d");
//Read the data
d3.json(url).then(d => {
      d = d['points']
      console.log(d)
      d.forEach(function(da) {
           da['date'] = parseTime(da['date']);
           da['price'] = +da['price'];
      });
      console.log(d3.extent(d, function(a) {return a['date']; }))
      // Add X axis --> it is a date format
      var x = d3.scaleTime()
        .domain(d3.extent(d, function(a) { console.log(a['date']);return a['date']; }))
        .range([ 0, width ]);
      svg.append("g")
        .attr("transform",`${ "translate(0," + height + ")"}`)
        .call(d3.axisBottom(x));
      // Add Y axis
      var y = d3.scaleLinear()
        .domain([0, d3.max(d, function(d) { return +d['price']; })])
        .range([ height, 0 ]);
      svg.append("g")
        .call(d3.axisLeft(y));

      // Add the line
      svg.append("path")
        .datum(d)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) { return x(d['date']) })
          .y(function(d) { return y(d['price']) })
          )
});

// // set the dimensions and margins of the graph
// var margin = {top: 20, right: 20, bottom: 50, left: 70},
//     width = 960 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;
//
// // parse the date / time
// var parseTime = d3.timeParse("%Y-%m-%d");
//
// // set the ranges
// var x = d3.scaleTime().range([0, width]);
// var y = d3.scaleLinear().range([height, 0]);
//
// // define the line
// var valueline = d3.line()
//     .x(function(d) { return x(d['date']); })
//     .y(function(d) { return y(d['price']); });
//
// // append the svg obgect to the body of the page
// // appends a 'group' element to 'svg'
// // moves the 'group' element to the top left margin
// var svg = d3.select("#my_dataviz").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform",
//           `${"translate(" + margin.left + "," + margin.top + ")"}`);
//
// // Get the data
// d3.json("/data/sector/Industrials").then(function(data) {
//
//   // format the data
//   data = data['points']
//   data.forEach(function(da) {
//        da['date'] = parseTime(da['date']);
//        da['price'] = +da['price'];
//   });
//   console.log(data)
//
//   // Scale the range of the data
//   x.domain(d3.extent(data, function(d) { return d['date']; }));
//   y.domain([0, d3.max(data, function(d) { return d['date']; })]);
//
//   // Add the valueline path.
//   svg.append("path")
//       .data([data])
//       .attr("class", "line")
//       .attr("d", valueline);
//
//   // Add the x Axis
//   svg.append("g")
//       .attr("transform",`${ "translate(0," + height + ")"}`)
//       .call(d3.axisBottom(x));
//
//   // Add the y Axis
//   svg.append("g")
//       .call(d3.axisLeft(y));
//
// });
