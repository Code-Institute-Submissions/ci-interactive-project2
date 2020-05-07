let testObj;

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
        testObj=storage.getItem(keyname);   
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
      .style("top",  y + "px")        
      .html(d.key + "<br>" + '$'+d.value)
      .attr("data-type",d.key);

  }

  function handleMouseOut(d, i) {  
    d3.select(this)
      .transition()
      .style("fill",function(d) {
      return d.color;})
      .duration(300);
      toolTip.style("opacity",0);
  }
