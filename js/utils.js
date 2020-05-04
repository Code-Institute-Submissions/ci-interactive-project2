let anObject;
let testObj;

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

  function getJSON(type,settings,keyname) {
    var storage = window[type];
    
      if (storage.getItem(keyname)) {
        console.log('Getting from Storage instead');
        testObj=storage.getItem(keyname);   
        anObject = jQuery.parseJSON(storage.getItem(keyname));                             //get direct item
    
      } else {
        console.log('No results locally, making API request...');
        
      $.ajax(settings).done(function (response) {
        console.log(response);   
        var json = JSON.stringify(response);
        console.log('Setting to Storage with key:', keyname);
        storage.setItem(keyname, json);
        });
      }
    }

    function capitalizeFirstLetter(myString){
      myString = myString.replace(/\b(\w)/g ,function(w){return w.toUpperCase()});
      return myString;
  }