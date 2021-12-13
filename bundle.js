(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Write your JavaScript code here!
const helper = require('./scriptHelper');

window.addEventListener("load", function(event) {
    event.preventDefault();

    let listedPlanets = [];

    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = helper.myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       return result;
   }).then(function (listedPlanets) {
       const planetIndex = helper.pickPlanet(listedPlanets.length);
       const planetData = listedPlanets[planetIndex];
       helper.addDestinationInfo(
           document,
           planetData.name,
           planetData.diameter,
           planetData.star,
           planetData.distance,
           planetData.moons,
           planetData.image
       );
   });

   window.addEventListener("submit", function(event) {
       event.preventDefault();

       const pilot = event.target[0].value;
       const copilot = event.target[1].value;
       const fuelLevel = event.target[2].value;
       const cargoLevel = event.target[3].value;
       helper.formSubmission(document, listedPlanets, pilot, copilot, fuelLevel, cargoLevel);
   });
});

},{"./scriptHelper":2}],2:[function(require,module,exports){
// Write your helper functions here!
//require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    
    document.getElementById('missionTarget').innerHTML = `
             <h2>Mission Destination</h2>
             <ol>
                <li>Name: ${name}</li>
                <li>Diameter: ${diameter}</li>
                <li>Star: ${star}</li>
                <li>Distance from Earth: ${distance}</li>
                <li>Number of Moons: ${moons}</li>
            </ol>
            <img src = "${imageUrl}" height = "200" />
            `;
 }
 
 function validateInput(testInput) {
     if (testInput && testInput === " ") {
         alert('All fields are required!');
         return "Empty";
     } else if (isNaN(testInput)) {
         alert('Make sure to enter valid information for each field!');
         return "Not a Number";
     } else {
         alert('Make sure to enter valid information for each field!');
         return "Is a Number";
     }
 }
 
 function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let faultyItems = document.getElementById('faultyItems');
    let fuelStatus = document.getElementById('fuelStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    let launchStatus = document.getElementById('launchStatus');
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
 
    let readyToLaunch = true;
 
    if (validateInput(pilot) !== "Not a Number") {
        pilotStatus.innerHTML = `Pilot is not ready.`;
        readyToLaunch = false;
    }
 
    if (validateInput(copilot) !== "Not a Number") {
        copilotStatus.innerHTML = `Copilot is not ready.`;
        readyToLaunch = false;
    }
 
    if (validateInput(fuelLevel) !== "Is a Number") {
        fuelStatus.innerHTML = "Fuel level must be a number.";
        readyToLaunch = false;
    }
 
    if (validateInput(cargoLevel) !== "Is a Number") {
        cargoStatus.innerHTML = "Cargo mass must be a number.";
        readyToLaunch = false;
    }
     
     if (Number(fuelLevel) < 10000) {
         fuelStatus.innerHTML = 'Fuel level too low for launch!';
         readyToLaunch = false;
     }
     
     if (Number(cargoLevel) > 10000) {
         cargoStatus.innerHTML = 'Shuttle mass too heavy for launch!';
         readyToLaunch = false;
     }
 
     if (!readyToLaunch) {
         faultyItems.style.visibility = 'visible';
         launchStatus = "Shuttle not ready for launch!";
         launchStatus.style.color = "red";
         return;
     }
 
     launchStatus.innerHTML = 'Shuttle is ready for launch.';
     launchStatus.style.color = 'green';
     faultyItems.style.visibility = 'hidden';
     pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch.`;
     copilotStatus.innerHTML = `Co-Pilot ${copilot} is ready for launch.`;
     fuelStatus.innerHTML = 'Fuel level high enough for launch.';
     cargoStatus.innerHTML = 'Cargo mass low enough for launch.';
 }
 
 async function myFetch() {
     return await fetch('https://handlers.education.launchcode.org/static/planets.json').then(function(response) {
         return response.json();   
     });
 }
 
 function pickPlanet(planets) {
     return Math.ceil(Math.random() * planets);
 }
 
 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;
 
},{}]},{},[1,2]);
