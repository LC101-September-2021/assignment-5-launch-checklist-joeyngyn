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
 