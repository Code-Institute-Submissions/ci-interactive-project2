$(function(){

    $('.sidebarToggle').on('click', function (e) {
        e.preventDefault();
        $('.sidebar').toggleClass('toggled');
    });

    //API settings
    var settings1 = {
        "async": true,
        "crossDomain": true,
        "url": "https://sghouseholdexp17-9d5c.restdb.io/rest/hes-table2-27",
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": "5ea6e1fa96bed7493503627c",
          "cache-control": "no-cache"
        }
      }

      var settings2 = {
        "async": true,
        "crossDomain": true,
        "url": "https://sghouseholdexp17-9d5c.restdb.io/rest/hes-table16a",
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": "5ea6e1fa96bed7493503627c",
          "cache-control": "no-cache"
        }
      }

    //variables for table
    let tableData;
    let tableHeader=[];

    //variables for row/pie chart
    let expData;



    if (storageAvailable('localStorage')) {
        // localStorage is availables
        let doFirst = getData('localStorage','tableData',settings1);
        let doSecond = getData('localStorage','expData',settings2);
        
        $.when(doFirst,doSecond).done(function ( data1, data2 ) {
            tableData=data1;    // "5 objs"
            expData=data2;      // "54 objs"
        });
        
        } else {
        // Try to use session storage
        console.log("LocalStorage Unavailable");
        let doFirst = getData('sessionStorage','tableData',settings1);
        let doSecond = getData('sessionStorage','expData',settings2);
        
        $.when(doFirst,doSecond).done(function ( data1, data2 ) {
            tableData=data1;    // "5 objs"
            expData=data2;      // "54 objs"
        });
 
        }

    
   pushToTable(tableData);

   let barMargin = {top: 8, right: 30, bottom: 30, left: 50};
   let barWidth = $("#bar-chart").width()-barMargin.right-barMargin.left;
   let barHeight = 250-barMargin.top-barMargin.bottom;         /*$("#bar-chart").height();*/

   // List of subgroups = header of the table 
    let subgroups=Object.keys(tableData[0]).splice(2,3);

    //List of groups
    let groups = d3.map(tableData, function(d){
        return(d.quintile)}).keys()

    
    let listOfValues = tableData.map(d=>d['average total income']).concat(tableData.map(a=>a['average total expenditure']));

    // append the svg object to the body of the page
    let barSvg = d3.select("#bar-chart")
                    .append("svg")
                    .attr("width", barWidth+barMargin.right+barMargin.left)
                    .attr("height", barHeight+barMargin.top+barMargin.bottom)
                    .append("g")
                    .attr("transform","translate(" + barMargin.left + "," + barMargin.top+ ")");
    
    let xScale = d3.scaleBand()
            .domain(groups)
            .range([0,barWidth])
            .padding([0.25]);
    barSvg.append("g")
            .attr("transform","translate(0," + barHeight + ")")
            .style("font-size", "0.75rem")
            .call(d3.axisBottom(xScale).tickSize(0));
    barSvg.append('text')        
          .text('Income Quintile')
          .attr("x", 250)
          .attr("y", 240);
        
    let yScale = d3.scaleLinear()
            .domain([0, d3.max(listOfValues)])
            .range([ barHeight, 0 ]).nice();

    let yAxis = d3.axisLeft(yScale)
                  .tickFormat(function(d,i){
                      return Math.round(d/1000).toFixed(0);
                  });

        barSvg.append("g")
            .call(yAxis);
            // text label for the y axis
        barSvg.append("text")
              .text("$('000)")
              .attr("x", -150)
              .attr("y", -30)
              .attr("transform", "rotate(270)");
      
    //subgroup axis
    let x1 = d3.scaleBand()
                .domain(subgroups)
                .range([0,xScale.bandwidth()])
                .padding([0.05]);

    let chartColor = d3.scaleOrdinal()
                        .domain(subgroups)
                        .range(['#68ab77','#d8485c']);

    
    //Plot the bars
    barSvg.append("g")
          .selectAll("g")
    // Enter in data = loop group per group
          .data(tableData)
          .enter()
          .append("g")
          .attr("transform", function(d) {return "translate(" + xScale(d.quintile) + ",0)"; })
          .selectAll("rect")
          .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
          .enter().append("rect")
          .attr("x", function(d) { return x1(d.key); })
          .attr("y", function(d) { return yScale(d.value); })
          .attr("width", x1.bandwidth())
          .attr("height", function(d) { return barHeight - yScale(d.value); })
          .attr("fill", function(d) { return chartColor(d.key); })
          .on("mouseover", handleMouseOver)
          .on("mouseout", handleMouseOut);

          $("#submit-1").click(function(){
          })
   
    const expRowChart = new dc.RowChart("#row-chart");
    const expPieChart = new dc.PieChart("#pie-chart");
    let rowMargin = {top: 8, right: 30, bottom: 30, left: 50};
    let rowWidth = $("#bar-chart").width()-rowMargin.right-rowMargin.left;
    let rowHeight = 600-rowMargin.top-rowMargin.bottom;           
          
    let ndx = crossfilter(expData), 
        catDim = ndx.dimension(function(d){return d.category;}),
        sourceDim = ndx.dimension(function(d){return d.source;}),
        spendPerCat = catDim.group().reduceSum(function(d){return +(d.spending.toFixed(2))}),
        spendPerSource = sourceDim.group().reduceSum(function(d){return parseFloat(+d.spending.toFixed(2))});

    let rowColor = d3.scaleOrdinal(d3.quantize(d3.interpolateHcl("#488455", "#68ab77"), 9));

    expRowChart
      .width(rowWidth).height(rowHeight)
      .dimension(catDim, "catDim")
      .group(spendPerCat, "Spend")
      .ordering(function(d){
       //console.log(d);
       return -d.value;})
      .colors(rowColor)
      .elasticX(true)
      .title(function(d){
          d.value = parseFloat(d.value.toFixed(2));
          return d.key+ ": "+ d.value;
        });

      expPieChart
     .width(300).height(300)
     .dimension(sourceDim)
     .group(spendPerSource)
     .radius(250)
     .innerRadius(50)
     .colors(d3.scaleOrdinal(d3.quantize(d3.interpolateHcl("#488455", "#68ab77"), 2)))
     .title(function(d){
        d.value = parseFloat(d.value.toFixed(2));
        return d.key+ ": "+ d.value;
      })
      .legend(new dc.HtmlLegend().container('#pie-legend').horizontal(false).highlightSelected(true))
     .turnOnControls(true);

     dc.renderAll();
     dc.redrawAll();
   
}); //end jQuery document ready