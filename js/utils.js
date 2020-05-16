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

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  function roundToX(num,places) {    
    return +(Math.round(num + "e+" + places)  + "e-" + places);
}

  function tabletoJSON(tableid){
    let objArr=[];
    $(tableid).find('tbody tr').each(function(i,d){
      let obj1 = {};
      let obj2 = {};
      let obj3 = {};
      let obj4 = {};
      let obj5 = {};
      let obj6 = {};
      let cat = $(this).find('th').first().text();
      let val1,val2,val3,val4,val5,val6
      if(genRan){
      val1 = roundToX(getRandomArbitrary(200,1000),2);
      val2 = roundToX(getRandomArbitrary(200,1000),2);
      val3 = roundToX(getRandomArbitrary(200,1000),2);
      val4 = roundToX(getRandomArbitrary(200,1000),2);
      val5 = roundToX(getRandomArbitrary(200,1000),2);
      val6 = roundToX(getRandomArbitrary(200,1000),2);
      $(".formData").attr("contenteditable","true");
      $(this).find('td:nth-child(2)').append(val1);
      $(this).find('td:nth-child(3)').append(val2);
      $(this).find('td:nth-child(4)').append(val3);
      $(this).find('td:nth-child(5)').append(val4);
      $(this).find('td:nth-child(6)').append(val5);
      $(this).find('td:nth-child(7)').append(val6);
      }else{
      val1 = parseFloat($(this).find('td:nth-child(2)').text());
      val2 = parseFloat($(this).find('td:nth-child(3)').text());
      val3 = parseFloat($(this).find('td:nth-child(4)').text());
      val4 = parseFloat($(this).find('td:nth-child(5)').text());
      val5 = parseFloat($(this).find('td:nth-child(6)').text());
      val6 = parseFloat($(this).find('td:nth-child(7)').text());
      }
      obj1['categories'] = cat;
      obj1['date'] = moment().subtract(5,'months').format('DD-MM-YY');
      obj1['spending'] = val1;
      obj2['categories'] = cat;
      obj2['date'] = moment().subtract(4,'months').format('DD-MM-YY');
      obj2['spending'] = val2;
      obj3['categories'] = cat;
      obj3['date'] = moment().subtract(3,'months').format('DD-MM-YY');
      obj3['spending'] = val3;
      obj4['categories'] = cat;
      obj4['date'] = moment().subtract(2,'months').format('DD-MM-YY');
      obj4['spending'] = val4;
      obj5['categories'] = cat;
      obj5['date'] = moment().subtract(1,'months').format('DD-MM-YY');
      obj5['spending'] = val5;
      obj6['categories'] = cat;
      obj6['date'] = moment().format('DD-MM-YY');
      obj6['spending'] = val6;
      objArr.push(obj1,obj2,obj3,obj4,obj5,obj6);
      $(".formData").attr("contenteditable","false");
  });  
  return objArr;
  }



  function handleMouseOver(d, i) {  // Add interactivity

    d3.select(this)
      .transition()
      .style("fill","#fffccc")
      .duration(300);

      let x = d3.event.pageX - $("#bar-chart")[0].getBoundingClientRect().left;
      let y = d3.event.pageY - $("#bar-chart")[0].getBoundingClientRect().bottom;       

toolTip.style("opacity",1)
      .style("left",  x + "px")		
      .style("top",  (y+28) + "px")        
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

  function renderPieRow(RowChart, PieChart, catDim, sourceDim, spendPerCat, spendPerSource){

    let rowMargin = {top: 8, right: 30, bottom: 30, left: 50};
    let pieMargin = {top: 8, right: 45, bottom: 30, left: 45};
    let rowWidth = $("#horizontalChart").width()-rowMargin.right-rowMargin.left;
    let rowHeight = (spendPerCat.all().length)*30;
    let pieWidth = $("#ringChart").width()-pieMargin.left-pieMargin.right;

    
    RowChart
    .width(rowWidth).height(rowHeight)
    .dimension(catDim, "catDim")
    .group(spendPerCat, "Spend")
    .ordering(function(d){
     return -d.value;})
    .colors(rowColor)
    .elasticX(true)
    .title(function(d){
        d.value = parseFloat(d.value.toFixed(2));
        return d.key+ ": "+ d.value;
      });

    PieChart
   .width(pieWidth).height(150)
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
  let color = chart.selectAll('g.row').on('mouseover', function(){
    color = d3.select(this).select("rect").attr('fill');
    d3.select(this).select("rect")
                   .attr('fill', '#ffc');
    d3.select(this).select("text")
                   .style("fill","#000");
    return color;
  });

    chart.selectAll('g.row').on('mouseout', function() {    
      d3.select(this).select("rect")
                     .attr('fill', color);  
      d3.select(this).select("text")
                     .style('fill', '#fff');
    });
   });

   
   PieChart.on('pretransition', function(chart){
    
  chart.on('filtered', function() {
   let slice0Class = d3.select('g.pie-slice-group').selectAll("g").attr('class');

    if (chart.filters()[0]=="user" && chart._group.top(2)[1].value>0){
      rowColor = d3.scaleOrdinal(d3.quantize(d3.interpolateHcl("#7e1b28", "#e4818e"), 9));
      RowChart.colors(rowColor);
    }else if (chart.filters()[0]=="national" && chart._group.top(2)[1].value==0){   //not user
      rowColor = d3.scaleOrdinal(d3.quantize(d3.interpolateHcl("#2d5235", "#7bb788"), 9));
      RowChart.colors(rowColor);
    }else if(chart.filters()[0]=="national" && chart._group.top(2)[1].value>10){   //user is not 0
      rowColor = d3.scaleOrdinal(d3.quantize(d3.interpolateHcl("#2d5235", "#7bb788"), 9));
      RowChart.colors(rowColor);
    }else if(chart.filters()[0]==undefined && chart._group.top(2)[1].value==0){   //not user
      rowColor = d3.scaleOrdinal(d3.quantize(d3.interpolateHcl("#2d5235", "#7bb788"), 9));
      RowChart.colors(rowColor);
    }else if(chart.filters()[0]==undefined && chart._group.top(2)[1].value>0){
      rowColor = d3.scaleOrdinal(d3.quantize(d3.interpolateHcl("#2452d5", "#7bb788"), 9));
      RowChart.colors(rowColor);
    }
});

});
  

  }

  function renderSeries(chartSeries, dimension, group, earlierDate, currentDate){
    let lineMargin = {top: 8, right: 20, bottom: 30, left: 0};
    let lineWidth = $("#series-chart").width();
    let lineHeight = 400-lineMargin.top-lineMargin.bottom;
    let yPosition = 0.584*lineHeight;
    let xPosition = 0.663*lineWidth;

    chartSeries
    .width(lineWidth)
    .height(lineHeight)
    .chart(function(c) { return new dc.LineChart(c).curve(d3.curveLinear); })
    .x(d3.scaleTime().domain([earlierDate,currentDate]))
    .brushOn(false)
    .yAxisLabel("Spending per month")
    .xAxisLabel("Date")
    .clipPadding(10)
    .elasticY(true)
    .dimension(dimension)
    .group(group)
    .mouseZoomable(false)
    .seriesAccessor(function(d) {return d.key[0];})
    .keyAccessor(function(d) {return d.key[1];})
    .valueAccessor(function(d) {return +d.value;})
    .legend(dc.legend().x(xPosition).y(yPosition).itemHeight(13).gap(5).horizontal(1).legendWidth(150).itemWidth(100));
    chartSeries.yAxis().tickFormat(function(d) {return d3.format(',d')(d);});
    chartSeries.xAxis().tickFormat(function(d) {return moment(d).format('MMM YY');});
    chartSeries.margins().left += 0;
  }

  function chart_display(rowChart, pieChart, seriesChart){

    let rowMargin = {top: 8, right: 30, bottom: 30, left: 50};
    let lineMargin = {top: 8, right: 20, bottom: 30, left: 0};
    let pieMargin = {top: 8, right: 45, bottom: 30, left: 45};
    
    let pieWidth = $("#ringChart").width()-pieMargin.right-pieMargin.left,
        rowWidth = $("#horizontalChart").width()-rowMargin.right-rowMargin.left,
        lineWidth = $("#series-chart").width(),
        lineHeight = 400-lineMargin.top-lineMargin.bottom,
        yPosition = 0.584*lineHeight,
        xPosition = 0.653*lineWidth;

        rowChart.svg()
                .selectAll('svg')
                .remove();
        pieChart.svg()
                .selectAll('svg')
                .remove();
        seriesChart.svg()
                   .selectAll('svg')
                   .remove();

    rowChart.width(rowWidth);
    pieChart.width(pieWidth);
    seriesChart.width(lineWidth)
               .legend(dc.legend().x(xPosition).y(yPosition).itemHeight(13).gap(5).horizontal(1).legendWidth(240).itemWidth(170));

    dc.renderAll('group1');
    dc.renderAll('group2');

 }