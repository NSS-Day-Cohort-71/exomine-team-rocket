import { purchaseMineral, transientState } from './TransientState.js';
import { Colonies } from './Colonies.js';

// This function handles the click event on the "Place Order" button.
const handleOrderClick = async (event) => {
  // Check if the clicked element has the id "placeOrder"
  if (event.target.id === 'placeOrder') {
    // Call the purchaseMineral function to update the database with the new order
    await purchaseMineral();

    // Get the container element for the colonies and update it with the new colony minerals
    const coloniesContainer = document.querySelector('.colony_minerals');
    const colonies = await Colonies();
    coloniesContainer.innerHTML = colonies;

    // Clear the contents of the cart element
    const cart = document.getElementById('cart');
    cart.innerHTML = '';
  }
};


 // This function fetches the list of minerals from the server and displays the contents of the user's space cart.
export const SpaceCart = async () => {
  // Fetch the list of minerals from the server
  const response = await fetch('http://localhost:8088/minerals');
  const minerals = await response.json();

  // Retrieve the selected mineral from the transient state
  const selectedMineral = transientState.mineralObj;

  // Initialize the HTML string to be returned
  let html = `<h2>Space Cart</h2>
              <button id="placeOrder">Place Order</button>`;

  // If the user has selected a mineral to purchase
  if (selectedMineral.checked) {
    // Loop through each mineral
    for (const mineral of minerals) {
      // If the mineral ID matches the selected mineral ID
      if (mineral.id === selectedMineral.id) {
        // Construct the HTML string to display the selected mineral and the name of the facility it came from
        html = `<h2>Space Cart</h2>
                <p id="cart">1 ton of ${mineral.mineral} from ${selectedMineral.facilityName}</p>
                <button id="placeOrder">Place Order</button>
                `;
      }
    }
  }

  // Return the HTML string to be displayed in the space cart area of the UI
  return html;
};

document.addEventListener('click', handleOrderClick);
