import { fromEvent } from 'https://dev.jspm.io/rxjs@6/_esm2015';
import { map, filter } from 'https://dev.jspm.io/rxjs@6/_esm2015/operators';
import { interval } from "http://dev.jspm.io/rxjs@6.5.3/_esm2015/internal/observable/interval.js" 
import { concatMap } from "http://dev.jspm.io/rxjs@6.5.3/_esm2015/operators/index.js"  
import { ajax } from  'https://dev.jspm.io/rxjs@6/_esm2015/ajax';

 const poll_url = url => interval(100).pipe(concatMap(() => ajax.getJSON(url)))
console.log('part1')

const warningsUrl = 'http://localhost:8080/warnings'
//const warningsSinceTimeUrl = 'http://localhost:8080/warnings/since/2020-11-29T16:57:10.690Z'
const getTime  = () =>   new Date().toISOString()
console.log(getTime())

const warningsSinceTimeUrl =  `http://localhost:8080/warnings/since/${getTime()}`


console.log(warningsSinceTimeUrl)






const warnings = ajax.getJSON(warningsUrl)
const warningsSinceTime = ajax.getJSON(warningsSinceTimeUrl)

var polledWarnings = interval(100).pipe(concatMap( _ => warnings))





  //GET MINIMAL SEVERITY
  function getSeverity() {
    let input = document.getElementById('severity');
    return input.value
 
  }

function subscribeToWarnings(){
    return polledWarnings.subscribe(
     (result) => {
       
        const filteredwarnings = result.warnings.filter( warning => warning.severity >= getSeverity())
        const warningField = document.getElementById("warningDiv");
        warningField.textContent = JSON.stringify(filteredwarnings)
        sinceLastUpdate()
      });
      
  }

 function sinceLastUpdate(){
  warningsSinceTime.subscribe(
    (result)  => {
      const warningsSinceTime = result.warnings
      const warningField = document.getElementById("changesDiv");
      warningField.textContent = JSON.stringify(warningsSinceTime)

    })
  }
  
  function unSubscribeToWarnings(subscriber){

    return subscriber.unsubscribe()
  }

  var polledSubscriber = subscribeToWarnings()
 
//OBSERVE CHECKBOX. IF UNCHECKED - UNSUBSRIBE
  var checked = fromEvent(subscribeChekbox, 'change').pipe(map( e=> e.target.checked))
  checked.subscribe(checked => {
    unSubscribeToWarnings(polledSubscriber)
    if(checked){
      console.log('subscribe')
      polledSubscriber = subscribeToWarnings()
    }else{
      console.log('unsubcribe')
      unSubscribeToWarnings(polledSubscriber)
    }
  })




//subsribeToWarningsSinceTime()














  

               









