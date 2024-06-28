import { Colonies } from './Colonies.js';
import { GovernorOptions } from './Governors.js';
import { fetchFacilities, renderFacilitiesDropdown } from './Facilities.js';
import { handleFacilityDropdownChange } from './FacilityMinerals.js';

async function renderPage() {
    let governors = await GovernorOptions();
    let colonies = await Colonies();
    let facilities = await fetchFacilities();
    let facilitiesDropdownHTML = renderFacilitiesDropdown(facilities);

    let container = document.getElementById('container');

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
        </div>`;

    handleFacilityDropdownChange(facilities); // Pass the facilities to handle the dropdown change
}

document.addEventListener('DOMContentLoaded', renderPage); // Ensure DOM is loaded
