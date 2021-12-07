// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let destination = document.getElementById('missionTarget');
    if (destination) {
        let html = `<h2>Mission Destination</h2>
            <ol>
                <li>Name: ${json[index].name}</li>
                <li>Diameter: ${json[index].diameter}</li>
                <li>Star: ${json[index].star}</li>
                <li>Distance from Earth: ${json[index].distance}</li>
                <li>Number of Moons: ${json[index].moons}</li>
            </ol>
            <img src = "${json[index].image}">`;
        destination.innerHTML = html;
    }
}


// Checking for if form elements have value
function validateInput(pilotName, copilotName, fuelLevel, cargoMass) {
    //let form = document.getElementById("launchForm");
    let button = document.getElementById("formSubmit");
    let faultyItems = document.getElementById('faultyItems');
    let fuelStatus = document.getElementById('fuelStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    let launchStatus = document.getElementById('launchStatus');
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    button.addEventListener("click", function(event) {
        event.preventDefault();
        if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
            launchStatus.innerHTML = 'Shuttle not ready for launch!';
            launchStatus.style.color = 'red';
            alert('Please fill out all fields!')
        }

        if (typeof pilotName.value !== "string" || typeof copilotName.value !== "string") {
            launchStatus.innerHTML = 'Shuttle not ready for launch!';
            launchStatus.color.style = 'red';
            alert('Please enter a valid name!');
        }

        if (isNaN(Number(fuelLevel.value)) || isNaN(Number(cargoMass.value))) {
            launchStatus.innerHTML = 'Shuttle not ready for launch!';
            launchStatus.color.style = 'red';
            alert ('Please enter a valid number!')
        } else if (Number(fuelLevel.value) < 10000) {
                faultyItems.style.visibility = 'visible';
                launchStatus.innerHTML = 'Shuttle not ready for launch.';
                launchStatus.color.style = 'red';
                fuelStatus.innerHTML = 'Fuel level too low for launch!';
            } else if (Number(cargoMass.value) > 10000) {
                faultyItems.style.visibility = 'visible';
                launchStatus.innerHTML = 'Shuttle not ready for launch!';
                launchStatus.style.color = 'red';
                cargoStatus.innerHTML = 'Shuttle mass too heavy for launch!';
            }

        if (faultyItems && launchStatus && pilotStatus && copilotStatus && fuelStatus && cargoStatus) {
            launchStatus.innerHTML = 'Shuttle is ready for launch.';
            launchStatus.style.color = 'green';
            faultyItems.style.visibility = 'hidden';
            pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch.`;
            copilotStatus.innerHTML = `Co-Pilot ${copilotName.value} is ready for launch.`;
            fuelStatus.innerHTML = 'Fuel level high enough for launch.';
            cargoStatus.innerHTML = 'Cargo mass low enough for launch.';
        }
    });
}

function formSubmission() {
    let pilotName = document.querySelector("input[name=pilotName");
    let copilotName = document.querySelector("input[name=copilotName");
    let fuelLevel = document.querySelector("input[name=fuelLevel");
    let cargoMass = document.querySelector("input[name=cargoMass");
    validateInput(pilotName, copilotName, fuelLevel, cargoMass);

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then( function(response) {
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random() * 10);
    while (index >= JSON.length) {
        index = Math.floor(Math.random() * 10);
    }
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
