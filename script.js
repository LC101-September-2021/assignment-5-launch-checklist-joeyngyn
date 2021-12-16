window.addEventListener("load", function(event) {
    event.preventDefault();
    let listedPlanets = [];
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       return result;
   }).then(function (listedPlanets) {
       const planet = pickPlanet(listedPlanets);
       addDestinationInfo(
           document,
           planet.name,
           planet.diameter,
           planet.star,
           planet.distance,
           planet.moons,
           planet.image
       );
   });
   
   let list = document.getElementById("faultyItems");
   list.style.visibility = "hidden";
   let form = document.querySelector("form");

   form.addEventListener("submit", function(event) {
       event.preventDefault();
       const pilot = document.querySelector("input[name=pilotName]").value;
       const copilot = document.querySelector("input[name=copilotName]").value;
       const fuelLevel = Number(document.querySelector("input[name=fuelLevel]").value);
       const cargoLevel = Number(document.querySelector("input[name=cargoMass]").value);
      
       formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);
       
   });
});
