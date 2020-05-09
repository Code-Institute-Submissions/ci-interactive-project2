const expRowChart = new dc.RowChart("#row-chart");
const expPieChart = new dc.PieChart("#pie-chart");
let rowColor = d3.scaleOrdinal(d3.quantize(d3.interpolateHcl("#2d5235", "#7bb788"), 9));

$(function(){

    $('.sidebarToggle').on('click', function (e) {
        e.preventDefault();
        $('.sidebar').toggleClass('toggled');
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

      //disallow e,+ and - in input
      $("input[type=number]").keypress(function(evt){
        if(evt.charCode == 45 || evt.charCode == 43 || evt.charCode == 101) {
          alert("Keys are not accepted");
          evt.preventDefault();
       }
    });
    

    if (storageAvailable('localStorage')) {
        // localStorage is availables
        let doFirst = getData('localStorage','tableData',settings1);
        let doSecond = getData('localStorage','expData',settings2);

        
        $.when(doFirst,doSecond).done(function ( data1, data2 ) {
            tableData=data1;    // "5 objs"
            expData=data2;      // "54 objs" 


            let ndx = crossfilter(expData),
                quintDim = ndx.dimension(function(d){return d.quintile;}),
                filteredQuint = quintDim.filter(quintile),
                byCat = filteredQuint.top(Infinity);

                let tempndx = crossfilter(byCat),
                    catDim = tempndx.dimension(function(d){return d.category;}),
                    sourceDim = tempndx.dimension(function(d){return d.source;}),
                    spendPerCat = catDim.group().reduceSum(function(d){return +d.spending}),
                    spendPerSource = sourceDim.group().reduceSum(function(d){return +d.spending});

            pushToTable(tableData);
            drawBar(tableData);
            renderPlots(expRowChart, expPieChart, tempndx, catDim, sourceDim, spendPerCat, spendPerSource);

            $("#submit-1").click(function(e){
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