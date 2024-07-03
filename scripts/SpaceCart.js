import { purchaseMineral, transientState } from './TransientState.js';
import { Colonies } from './Colonies.js';

const handleOrderClick = async (event) => {
  if (event.target.id === 'placeOrder') {
    await purchaseMineral();
    const coloniesContainer = document.querySelector('.colony_minerals');
    const colonies = await Colonies();
    coloniesContainer.innerHTML = colonies;

    const cart = document.getElementById('cart');
    cart.innerHTML = '';
  }
};

export const SpaceCart = async () => {
  const response = await fetch('http://localhost:8088/minerals');
  const minerals = await response.json();
  const selectedMineral = transientState.mineralObj;
  let html = `<h2>Space Cart</h2>
            
               <button id="placeOrder">Place Order</button>`;

  if (selectedMineral.checked) {
    for (const mineral of minerals) {
      if (mineral.id === selectedMineral.id) {
        html = `<h2>Space Cart</h2>
        <p id="cart">1 ton of ${mineral.mineral} from ${selectedMineral.facilityName}</p>
        <button id="placeOrder">Place Order</button>
        `;
      }
    }
  }
  return html;
};

document.addEventListener('click', handleOrderClick);
