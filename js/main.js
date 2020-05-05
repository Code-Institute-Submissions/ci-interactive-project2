$(function(){

    $('.sidebarToggle').on('click', function (e) {
        e.preventDefault();
        $('.sidebar').toggleClass('toggled');
    });

    var testsettings = {
        "async": true,
        "crossDomain": true,
        "url": "https://hargrimm-wikihow-v1.p.rapidapi.com/steps?count=8",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "hargrimm-wikihow-v1.p.rapidapi.com",
            "x-rapidapi-key": "08e25a2d22msh18e5c671301df4ep1cb04ejsn9e528417a0b4"
        }
    }

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

    //variables for table
    let tableData;
    let tableHeader=[];

    if (storageAvailable('localStorage')) {
        // localStorage is available
         getJSON('localStorage',settings1,'income-exp');
         tableData = anObject;
        }
        else {
        // Try to use session storage
        console.log("LocalStorage Unavailable");
        getJSON('sessionStorage',settings1,'income-exp');
        }

        tableHeader=Object.keys(tableData[0]).splice(1,3);
        tableHeader.forEach(function(d,i){
            d = capitalizeFirstLetter(d);
            tableHeader.splice(i,1,d);
        })

    //start pushing to table
    let table = d3.select('#table')
                  .append("table")
                  .attr('class','table-striped');

    //append header row <th>
    let thead = table.append('thead')
                     .selectAll('th')
                     .data(tableHeader)
                     .enter()
                     .append('th')
                     .text(function(d){
                        let pat = /^Average/
                        if(pat.test(d)){
                        d= `${d} S$`;
                        }
                        return d;
                    });

    let trow = table.append('tbody')
                    .selectAll('tr')
                    .data(tableData)
                    .enter()
                    .append('tr');
   
    let cells = trow.selectAll('td')
                    .data(function(d){
                     return (Object.values(d).splice(1,3));
                    })
                    .enter()
                    .append('td')
                    .text(function(d){
                        return d;
                    })   
   

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
          
          
    
   
}); //end jQuery document ready