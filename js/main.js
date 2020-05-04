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

        
});