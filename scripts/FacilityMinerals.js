import { SpaceCart } from './SpaceCart.js';
import { setFacility, setMineral } from './TransientState.js';

// Fetch minerals associated with a specific facility ID
export const fetchFacilityMinerals = async (facilityId) => {
  let response = await fetch(
    `http://localhost:8088/facilityMinerals?facilityId=${facilityId}`
  );
  let facilityMinerals = await response.json();

  let mineralsResponse = await fetch('http://localhost:8088/minerals');
  let minerals = await mineralsResponse.json();

  // Create an array to store the combined mineral information
  let combinedMinerals = [];

  // Loop through each facility mineral
  for (let i = 0; i < facilityMinerals.length; i++) {
    let facilityMineral = facilityMinerals[i]; // Get the current facility mineral

    // Find the matching mineral in the minerals array
    for (let j = 0; j < minerals.length; j++) {
      let mineral = minerals[j]; // Get the current mineral

      // Check if the mineral IDs match
      if (facilityMineral.mineralId === mineral.id) {
        // Combine the information and add it to the combinedMinerals array
        combinedMinerals.push({
          id: facilityMineral.id,
          mineralId: facilityMineral.mineralId,
          facilityId: facilityMineral.facilityId,
          quantity: facilityMineral.quantity,
          name: mineral.mineral, // Add the mineral name
        });
      }
    }
  }

  return combinedMinerals;
};

const handleMineralChoice = async (event) => {
  if (event.target.name === 'facilityMineral') {
    setMineral({
      id: parseInt(event.target.value),
      checked: event.target.checked,
      facilityName: event.target.dataset.facility,
    });
  }
  const spaceCartEl = document.querySelector('.order');
  const spaceCart = await SpaceCart();
  spaceCartEl.innerHTML = spaceCart;
};

// Function to render facility minerals as HTML
export const renderFacilityMineralsHTML = (facilityName, minerals) => {
  // Create the heading
  document.addEventListener('change', handleMineralChoice);
  let mineralsHTML = `<h3>Facility Minerals for ${facilityName}</h3><div>`;

  // Loop through each mineral and add it to the HTML
  for (let i = 0; i < minerals.length; i++) {
    let mineral = minerals[i];
    mineralsHTML += `
            <input data-facility="${facilityName}" type="radio" id="mineral_${mineral.mineralId}" name="facilityMineral" value="${mineral.mineralId}">
            <label for="mineral_${mineral.mineralId}">${mineral.quantity} tons of ${mineral.name}</label><br>`;
  }

  // Close the div
  mineralsHTML += '</div>';

  // Return the completed HTML
  return mineralsHTML;
};

// Function to handle the facility dropdown change event
export const handleFacilityDropdownChange = (facilities) => {
  // Get the facilities dropdown element
  let facilitiesDropdown = document.getElementById('facilities');

  // Add an event listener for when the dropdown value changes
  facilitiesDropdown.addEventListener('change', async (event) => {
    // Get the selected facility ID
    let facilityId = parseInt(event.target.value);
    let facilityName = '';
    setFacility(facilityId);
    // Find the facility name that matches the selected ID
    for (let i = 0; i < facilities.length; i++) {
      if (facilities[i].id === facilityId) {
        facilityName = facilities[i].name;
      }
    }

    // If a facility is selected (ID is not 0)
    if (facilityId !== 0) {
      // Fetch the minerals for the selected facility
      let facilityMinerals = await fetchFacilityMinerals(facilityId);

      // Render the minerals as HTML
      let facilityMineralsHTML = renderFacilityMineralsHTML(
        facilityName,
        facilityMinerals
      );

      // Get the minerals section element
      let mineralsSection = document.getElementById('facility_minerals');

      // Insert the minerals HTML into the minerals section
      mineralsSection.innerHTML = facilityMineralsHTML;
    } else {
      // If no facility is selected, clear the minerals section
      let mineralsSection = document.getElementById('facility_minerals');
      mineralsSection.innerHTML = '';
    }
  });
};
