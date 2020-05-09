let quintile= 'Second'; 
let foodAndBeverage = 0;
let housingUtils = 0;
let health = 0;
let transport = 0;
let communication = 0;
let recreation = 0;
let education = 0;
let foodServices = 0;
let misc = 0;

const toolTip= d3.select("#bar-chart").append("div")	
                   .attr("id", "tooltip")				
                   .style("opacity", 0);
                 

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
  }

function getFromStorage(storage,keyname){
      if (storage.getItem(keyname)) {
        console.log('Getting from Storage instead');
        storage.getItem(keyname);   
        return jQuery.parseJSON(storage.getItem(keyname));  
  }
}

function makeAPIcall(storage,settings,keyname){
    return $.ajax(settings).then(function(response){
      console.log('Making API call ...');
      let json = JSON.stringify(response);
      storage.setItem(keyname,json);
      return response;
  });                       
}

function getData(type, keyname, settings){
    let storage = window[type];
    // Create a Deferred
    let defer = $.Deferred();
    var someData  = getFromStorage(storage,keyname);
    if (someData) {
      console.log("Found in Storage");
      return defer.resolve(someData).promise();
    } else {
      return makeAPIcall(storage,settings,keyname);    
  }
}



function capitalizeFirstLetter(myString){
    myString = myString.replace(/\b(\w)/g ,function(w){return w.toUpperCase()});
    return myString;
}

function pushToTable(tableData){
  tableHeader=Object.keys(tableData[0]).splice(1,3);

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
}//end push to table

  function populateVar(data){
    quintile = $("select[name=userQuintile").val();
    foodAndBeverage = $("input[name=foodBeverage]").val();
    housingUtils = $("input[name=housingUtils]").val();
    health = $("input[name=health]").val()
    transport = $("input[name=transport]").val();
    communication = $("input[name=communication").val();
    recreation = $("input[name=recreation").val();
    education = $("input[name=education").val();
    foodServices = $("input[name=foodServices").val();
    misc = $("input[name=misc").val();

    $.each(data,function(i,d){
      if (d.source=='user'){
          d.quintile=quintile;
          switch(d.category) {
              case "Food and Non-Alcoholic Beverages":
                  d.spending = foodAndBeverage;
                  break;
              case "Housing and Utilities":
                  d.spending = housingUtils;
                  break;
              case "Health":
                  d.spending = health;
                  break;
              case "Transport":
                  d.spending = transport;
                  break;
              case "Communication":
                  d.spending = communication;
                  break;
              case "Recreation":
                  d.spending = recreation;
                  break;
              case "Educational Services":
                  d.spending = education;
                  break;
              case "Food Serving Services":
                  d.spending = foodServices;
                  break;
              case "Misc. Goods and Services":
                  d.spending = misc;
                  break;
              default:
                  d.spending = 0;
          } //end switch
          }
      });

      return data;
  }//end populate variables

  function handleMouseOver(d, i) {  // Add interactivity

    d3.select(this)
      .transition()
      .style("fill","#fffccc")
      .duration(300);

      let x = d3.event.pageX - $("#bar-chart")[0].getBoundingClientRect().left;
      let y = d3.event.pageY - $("#bar-chart")[0].getBoundingClientRect().bottom;       

toolTip.style("opacity",1)
      .style("left",  x + "px")		
      .style("top",  (y-328) + "px")        
      .html(d.key + "<br>" + '$'+d.value)
      .attr("data-type",d.key);

  }//end handleMouseOver

  function handleMouseOut(d, i) {  
    d3.select(this)
      .transition()
      .style("fill",function(d) {
      return d.color;})
      .duration(300);
      toolTip.style("opacity",0);
  }//end handleMouseOut

  function drawBar(data){
    let barMargin = {top: 8, right: 30, bottom: 30, left: 50};
    let barWidth = $("#bar-chart").width()-barMargin.right-barMargin.left;
    let barHeight = 250-barMargin.top-barMargin.bottom;         /*$("#bar-chart").height();*/
 
    // List of subgroups = header of the table 
     let subgroups=Object.keys(data[0]).splice(2,3);
 
     //List of groups
     let groups = d3.map(data, function(d){
         return(d.quintile)}).keys()
 
     
     let listOfValues = data.map(d=>d['average total income']).concat(data.map(a=>a['average total expenditure']));
 
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
           .data(data)
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
  }//end draw bar chart

  function renderPlots(RowChart, PieChart, ndx, catDim, sourceDim, spendPerCat, spendPerSource){

    let rowMargin = {top: 8, right: 30, bottom: 30, left: 50};
    let rowWidth = $("#row-chart").width()-rowMargin.right-rowMargin.left;
    let rowHeight = 300-rowMargin.top-rowMargin.bottom; 
    let rowColor = d3.scaleOrdinal(d3.quantize(d3.interpolateHcl("#488455", "#68ab77"), 9));

    RowChart
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

    PieChart
   .width(300).height(150)
   .dimension(sourceDim)
   .group(spendPerSource)
   .radius(250)
   .innerRadius(25)
   .colors(d3.scaleOrdinal(d3.quantize(d3.interpolateHcl("#68ab77", "#d8485c"), 2)))
   .title(function(d){
      d.value = parseFloat(d.value.toFixed(2));
      return d.key+ ": "+ d.value;
    })
    .legend(new dc.HtmlLegend().container('#pie-legend').horizontal(false).highlightSelected(true))
   .turnOnControls(true);
    

   RowChart.on('pretransition', function(chart){
    chart.selectAll('g.row').on('mouseover', function() {
      d3.select(this).select("rect")
                     .attr('fill', '#ffc');
      d3.select(this).select("text")
                     .style("fill","#000");
    }).on('mouseout', function() {
      d3.select(this).select("rect")
                     .attr('fill','#68ab77');
      d3.select(this).select("text")
                     .style('fill', '#fff');
    })


   });
   
   PieChart.on('pretransition', function(chart){
    chart.selectAll('g.pie-slice').on('mouseover', function() {
      d3.select(this).select("path")
                    .attr('fill', '#ffc');
      d3.select("g.pie-label-group").select("text")
                     .style("fill","#000");
    }).on('mouseout', function() {
      d3.select(this).select("path")
                    .attr('fill', '#68ab77');
      d3.select("g.pie-label-group").select("text")
                     .style("fill","#fff");
    })
  });

   dc.renderAll();
  

  }