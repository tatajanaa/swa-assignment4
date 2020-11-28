
var ws = new WebSocket("ws://localhost:8090/warnings" )




    //UNSUBSCRIBE to warnings
    window.unSubscribe = () => {
        if (ws.OPEN) {
          const message = JSON.stringify("unsubscribe")
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
 
      const filteredwarnings = warningsData.warnings
      const warningField = document.getElementById("warningDiv");
      warningField.textContent = JSON.stringify(filteredwarnings)

    

}

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
  //filterSeverity()

    


