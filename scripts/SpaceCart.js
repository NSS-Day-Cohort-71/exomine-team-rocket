import { purchaseMineral, transientState } from './TransientState.js';
const handleOrderClick = (event) => {
  if (event.target.id === 'placeOrder') {
    purchaseMineral();
  }
};

export const SpaceCart = async () => {
  const response = await fetch('http://localhost:8088/minerals');
  const minerals = await response.json();
  const selectedMineral = transientState.mineralObj;
  let html = `<h2>Space Cart</h2>`;
  document.addEventListener('click', handleOrderClick);
  if (selectedMineral.checked) {
    for (const mineral of minerals) {
      if (mineral.id === selectedMineral.id) {
        html += `<p>1 ton of ${mineral.mineral} from ${selectedMineral.facilityName}</p>
        <button id="placeOrder">Place Order</button>`;
      }
    }
  }
  return html;
};
