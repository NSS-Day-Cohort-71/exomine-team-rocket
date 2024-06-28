// fetch the facilities data from the database
// use the async and await syntax
// create text on the website that says "Choose a facility"
// create facilitiesHTML variable that contains a dropdown that allows the user to select a facility. Use the <select> tag.

// Fetch the facilities data from the database
export const fetchFacilities = async () => {
  let response = await fetch('http://localhost:8088/facilities');
  let facilities = await response.json();
  return facilities;
};

// Render facilities as HTML dropdown options
export const renderFacilitiesDropdown = (facilities) => {
  let facilitiesHTML = '<select id="facilities">';
  facilitiesHTML += '<option value="0">Select a facility</option>';

  for (let i = 0; i < facilities.length; i++) {
    let facility = facilities[i];
    facilitiesHTML += `<option value="${facility.id}">${facility.name}</option>`;
  }

  facilitiesHTML += '</select>';
  return facilitiesHTML;
};
