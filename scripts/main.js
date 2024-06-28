import { Colonies } from './Colonies.js';
import { GovernorOptions } from './Governors.js';
import { fetchFacilities, renderFacilitiesDropdown } from './Facilities.js';
import { handleFacilityDropdownChange } from './FacilityMinerals.js';
import { SpaceCart } from './SpaceCart.js';

const render = async () => {
  const governors = await GovernorOptions();
  const colonies = await Colonies();
  const facilities = await fetchFacilities();
  const facilitiesDropdownHTML = renderFacilitiesDropdown(facilities);
  const spaceCart = SpaceCart();

  const container = document.getElementById('container');

  container.innerHTML = `
        <div class="left-container">
            <article class="choices">
                <section class="choices__governor options">
                    <span>Choose a governor</span> 
                    ${governors}
                </section>
                <section class="choices__facilities options">
                    <span>Facilities</span>
                    ${facilitiesDropdownHTML}
                </section>
            </article>
        </div>
        <div class="right-container">
            <article class="facility_minerals">
                <section id="facility_minerals">
                    <!-- Minerals will be dynamically inserted here -->
                </section>
            </article>
        </div>
        <div class="right-container">
            <article class="colonies">
                <section class="colony_minerals">
                    ${colonies}
                </section>
            </article>
             <article class="order">
      <h2>Space Cart</h2>
    ${spaceCart}
        </article>
        </div>`;

  handleFacilityDropdownChange(facilities); // Pass the facilities to handle the dropdown change
};

document.addEventListener('DOMContentLoaded', render); // Ensure DOM is loaded

render();
