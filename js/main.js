const expRowChart = new dc.RowChart("#row-chart");
const expPieChart = new dc.PieChart("#pie-chart");
let rowColor = d3.scaleOrdinal(d3.quantize(d3.interpolateHcl("#2d5235", "#7bb788"), 9));
let jsonArr=[];

$(function(){

//Sidebar toggle on click
    $('.sidebarToggle').on('click', function (e) {
        e.preventDefault();
        $('.sidebar').toggleClass('toggled');
    });

  
$('#table-form tr:first th:last-child').html(moment().format('MMM YY'));
$('#table-form tr:first th:nth-last-child(2)').html(moment().subtract(1, 'months').format('MMM YY'));
$('#table-form tr:first th:nth-last-child(3)').html(moment().subtract(2, 'months').format('MMM YY'));
$('#table-form tr:first th:nth-last-child(4)').html(moment().subtract(3, 'months').format('MMM YY'));
$('#table-form tr:first th:nth-last-child(5)').html(moment().subtract(4, 'months').format('MMM YY'));
$('#table-form tr:first th:nth-last-child(6)').html(moment().subtract(5, 'months').format('MMM YY'));


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

    //Editable form validation
    $('.formData').keypress(function(e){
        let char=e.key;
        if ((isNaN(char)||(e.which==32)) && (char !== '.')){ 
        e.preventDefault();
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
                 tabletoJSON('#table-form',jsonArr);
                 console.log(jsonArr); 
                 'localStorage'.setItem(trackData,jsonArr);
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