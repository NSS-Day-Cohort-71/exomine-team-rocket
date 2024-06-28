// fetch the facilities data from the database 
// use the async and await syntax
// create text on the website that says "Choose a facility"
// create facilitiesHTML variable that contains a dropdown that allows the user to select a facility. Use the <select> tag.

export const getFacilities = async () => {
    const response = await fetch('http://localhost:8088/facilities');
    const facilities = await response.json();

    let facilitiesHTML = `<select id="facilities">
        <option value="0">Select a facility</option>`;
    
    const stringArray = facilities.map((facility) => {
        return `<option value="${facility.id}">${facility.name}</option>`;
    });
    
    facilitiesHTML += stringArray.join('');
    facilitiesHTML += '</select>';
    
    return facilitiesHTML;
};


