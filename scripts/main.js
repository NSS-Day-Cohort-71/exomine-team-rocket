import { Colonies } from './Colonies.js';
import { GovernorOptions } from './Governors.js';
import { getFacilities } from './Facilities.js';

const render = async () => {
  const governors = await GovernorOptions();
  const colonies = await Colonies();

  const facilities = await getFacilities();

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
          ${facilities}
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
};
render();
