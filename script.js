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
       console.log(pilot, copilot, fuelLevel, cargoLevel);
       helper.formSubmission(document, listedPlanets, pilot, copilot, fuelLevel, cargoLevel);
   });
});
