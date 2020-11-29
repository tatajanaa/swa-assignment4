import { fromEvent } from "https://dev.jspm.io/rxjs@6/_esm2015";
import { map, filter } from "https://dev.jspm.io/rxjs@6/_esm2015/operators";
import { interval } from "http://dev.jspm.io/rxjs@6.5.3/_esm2015/internal/observable/interval.js";
import { concatMap } from "http://dev.jspm.io/rxjs@6.5.3/_esm2015/operators/index.js";
import { ajax } from "https://dev.jspm.io/rxjs@6/_esm2015/ajax";

const poll_url = (url) =>
  interval(100).pipe(concatMap(() => ajax.getJSON(url)));

const warningsUrl = "http://localhost:8080/warnings";
const warningsSinceUrl =   "http://localhost:8080/warnings/since/2020-11-29T15:40:31.060Z";


const warnings = ajax.getJSON(warningsUrl);
const warningsSinceTime = ajax.getJSON(warningsSinceUrl);


var polledWarnings = interval(100).pipe(concatMap((_) => warnings));
var polledWarningsSinceTime = interval(100).pipe(concatMap((_) => warningsSinceTime));


function getTime() {
  var time = new Date().toISOString();
  console.log(time);
  return time;
}

//GET MINIMAL SEVERITY
function getSeverity() {
  let input = document.getElementById("severity");
  return input.value;
}

function subscribeToWarnings() {
  const a = polledWarnings.subscribe((result) => {
    const filteredwarnings = result.warnings.filter(
      (warning) => warning.severity >= getSeverity()
    );
    const warningField = document.getElementById("warningDiv");
    warningField.textContent = JSON.stringify(filteredwarnings);
  });
  const b = polledWarningsSinceTime.subscribe((result) => {
    const warnimgsSince = result.warnings;
    const warningField = document.getElementById("changesDiv");
    warningField.textContent = JSON.stringify(warnimgsSince);
  });

  return { a, b };
}

function unSubscribeToWarnings(subscriber) {
  return subscriber.unsubscribe();
}

var polledSubscriber = subscribeToWarnings();

//OBSERVE CHECKBOX. IF UNCHECKED - UNSUBSRIBE
var checked = fromEvent(subscribeChekbox, "change").pipe(
  map((e) => e.target.checked)
);
checked.subscribe((checked) => {
  unSubscribeToWarnings(polledSubscriber);
  if (checked) {
    polledSubscriber = subscribeToWarnings();
  } else {
    unSubscribeToWarnings(polledSubscriber);
  }
});

//subscribeToPolledWarnings()
