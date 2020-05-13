const expRowChart = new dc.RowChart("#row-chart");
const expPieChart = new dc.PieChart("#pie-chart");
const multichart = new dc.SeriesChart("#line-chart");
let rowColor = d3.scaleOrdinal(d3.quantize(d3.interpolateHcl("#2d5235", "#7bb788"), 9));
let jsonArr=[];
let genRan = false;

$(function(){

//Sidebar toggle on click
    $('.sidebarToggle').on('click', function (e) {
        e.preventDefault();
        $('.sidebar').toggleClass('toggled');
    });

//set date header for table
$('#table-form tr:first th:last-child').html(moment().format('MMM YY'));
$('#table-form tr:first th:nth-last-child(2)').html(moment().subtract(1, 'months').format('MMM YY'));
$('#table-form tr:first th:nth-last-child(3)').html(moment().subtract(2, 'months').format('MMM YY'));
$('#table-form tr:first th:nth-last-child(4)').html(moment().subtract(3, 'months').format('MMM YY'));
$('#table-form tr:first th:nth-last-child(5)').html(moment().subtract(4, 'months').format('MMM YY'));
$('#table-form tr:first th:nth-last-child(6)').html(moment().subtract(5, 'months').format('MMM YY'));

  //disallow e,+ and - in input
  $("input[type=number]").keypress(function(evt){
    if(evt.charCode == 45 || evt.charCode == 43 || evt.charCode == 101) {
      alert("Keys are not accepted");
      evt.preventDefault();
   }
});

//Editable form validation
$('.formData').keypress(function(e){
    let char=e.key;
    if ((isNaN(char)||(e.which==32)) && (char !== '.')){ 
    e.preventDefault();
    }
});


        //variables for table
    let tableData;
    let tableHeader=[];

    //variables for row/pie chart
    let expData;    

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

    if (storageAvailable('localStorage')) {
        // localStorage is availables
        let doFirst = getData('localStorage','tableData',settings1);
        let doSecond = getData('localStorage','expData',settings2);

        
        $.when(doFirst,doSecond).done(function ( data1, data2 ) {
            tableData=data1;    // "5 objs"
            expData=data2;      // "54 objs" 

            if (localStorage.getItem('trackData')) {
                console.log('Getting from storage')
                jsonArr = JSON.parse(localStorage.getItem('trackData'));
            } else{
                alert('Tracking data not available');
                genRan = true;                          // generate random data
                jsonArr=tabletoJSON('#table-form');
            }

            let ndx = crossfilter(expData),
                quintDim = ndx.dimension(function(d){return d.quintile;}),
                filteredQuint = quintDim.filter(quintile),
                byCat = filteredQuint.top(Infinity);

            let tempndx = crossfilter(byCat),
                catDim = tempndx.dimension(function(d){return d.category;}),
                sourceDim = tempndx.dimension(function(d){return d.source;}),
                spendPerCat = catDim.group().reduceSum(function(d){return +d.spending}),
                spendPerSource = sourceDim.group().reduceSum(function(d){return +d.spending});

            let parsedDate = d3.timeParse("%d-%m-%y");
            let strDate = d3.timeFormat("%b %y");
                jsonArr.forEach(function(d){
                d.parsed = parsedDate(d.date);
                d.nicedate = strDate(d.parsed);
                });
        
            let cfx = crossfilter(jsonArr),
                catdateDimension = cfx.dimension(function(d) {return [d.categories, d.parsed]; }),
                dateDimension = cfx.dimension(function(d){ return d.parsed}),
                catdateGroup = catdateDimension.group().reduceSum(function(d) { return +d.spending; }),
                minDate = dateDimension.bottom(1)[0].parsed,
                maxDate = dateDimension.top(1)[0].parsed,
                
                minStrDate = moment(minDate).subtract(1,'months')
                maxStrDate = moment(maxDate).add(1,'months')


            pushToTable(tableData);
            drawBar(tableData);
            renderPlots(expRowChart, expPieChart, catDim, sourceDim, spendPerCat, spendPerSource);

            let lineMargin = {top: 8, right: 30, bottom: 30, left: 50};
            let lineWidth = $("#line-chart").width()-rowMargin.right-rowMargin.left;
            let lineHeight = 500-rowMargin.top-rowMargin.bottom; 

            multichart
            .width(lineWidth)
            .height(lineHeight)
            .chart(function(c) { return new dc.LineChart(c).curve(d3.curveLinear); })
            .x(d3.scaleTime().domain([minStrDate,maxStrDate]))
            .brushOn(false)
            .yAxisLabel("Spending per month")
            .xAxisLabel("Date")
            .clipPadding(10)
            .elasticY(true)
            .dimension(catdateDimension)
            .group(catdateGroup)
            .mouseZoomable(false)
            .seriesAccessor(function(d) {return "Categories: " + d.key[0];})
            .keyAccessor(function(d) {return d.key[1];})
            .valueAccessor(function(d) {return +d.value;})
            .legend(dc.legend().x(450).y(320).itemHeight(13).gap(5).horizontal(1).legendWidth(240).itemWidth(170));
            multichart.yAxis().tickFormat(function(d) {return d3.format(',d')(d+200);});
            multichart.margins().left += 40;

            debugger
            dc.renderAll();

            $("#submit").click(function(e){
                quintile = $("select[name=userQuintile").val();
                filteredQuint = quintDim.filter(null);
                populateVar(expData);
                ndx.remove();
                ndx.add(expData);
                filteredQuint = quintDim.filter(quintile);
                byCat = filteredQuint.top(Infinity);
                setTimeout(function(){
                    
                    tempndx.remove();
                    tempndx.add(byCat);
                    rowColor = d3.scaleOrdinal(d3.quantize(d3.interpolateHcl("#2452d5", "#7bb788"), 9));
                    expRowChart.colors(rowColor);
                    dc.redrawAll();
                }, 1000);
                $('#formModal').modal('hide');
                }); 


             
                $("#edit").click(function(e){
                   let editable = $(".formData").attr("contenteditable");
                   if (editable == "false"){
                    $(".formData").attr("contenteditable","true");
                   } else {
                    $(".formData").attr("contenteditable","false");
                   }
                });
                
                
                $('#save').click(function(e){
                    e.preventDefault();
                    genRan=false;
                    jsonArr=tabletoJSON('#table-form');
                    localStorage.setItem('trackData',JSON.stringify(jsonArr));         //keep in local storage
                });



        }); //end ajax
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

                  
          
  

    
     
   
}); //end jQuery document ready