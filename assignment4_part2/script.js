import { ajax } from  'https://dev.jspm.io/rxjs@6/_esm2015/ajax';


var ws = new WebSocket("ws://localhost:8090/warnings" )
const warningsSinceUrl =   "http://localhost:8080/warnings/since/2020-11-29T17:00:16.333Z";

const warningsSinceTime = ajax.getJSON(warningsSinceUrl)




    //UNSUBSCRIBE to warnings
    window.unSubscribe = () => {
        if (ws.OPEN) {
          const message = JSON.stringify('unsubscribe')
          console.log("unsubscribed")
          ws.send(message)
        }
      }
  
      //SUBSCRIBE TO warnings
      window.subscribe = () => {
        if (ws.CLOSED) {
          ws = new WebSocket("ws://localhost:8090/warnings")
        }
        ws.onopen = () => {
          console.log("subscribed")
          ws.send("subscribe");
        }
         ws.onmessage = message => {
          const result = JSON.parse(message.data)
           showWarningData(result)
                
        } 
      
  
      }

function showWarningData(warningsData){
      if(getSeverity()!=0){
        const filteredwarnings = warningsData.warnings
        .filter((warning) => warning.severity >= getSeverity() && (warnings=>warnings.prediction!=null))
     
      const warningField = document.getElementById("warningDiv");
      warningField.textContent = JSON.stringify(filteredwarnings)
      }
      else {
        const filteredwarnings = warningsData.warnings.filter(warnings=>warnings.prediction!=null)
        const warningField = document.getElementById("warningDiv");
        warningField.textContent = JSON.stringify(filteredwarnings)
      }
    

}

warningsSinceTime.subscribe(
  (result)  => {
    const warningsSinceTime = result.warnings
    const warningField = document.getElementById("changesDiv");
    warningField.textContent = JSON.stringify(warningsSinceTime)

  }
  

)
  


function filterSeverity(){
 
    var filterButton = document.getElementById("filterButton")
    filterButton.onclick = function load() {
      
            subscribe()      
    
    }
    
}

 //Checkbox subscribe/unsubsribe
 function onCheckboxClick() {
    var checkbox = document.getElementById("subscribeChekbox")
    checkbox.addEventListener('change', e => {
  
        if(e.target.checked){
            subscribe()
        }
        else{
            unSubscribe();
        }
    
    });
  }

    
   //GET MINIMAL SEVERITY
  function getSeverity() {
    let input = document.getElementById('severity');
   
    return input.value
 
  }



  window.onload = subscribe;
  onCheckboxClick()
  filterSeverity()

    


