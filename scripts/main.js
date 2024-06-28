import { getFacilities } from './Facilities.js';
import { GovernorOptions } from './Governors.js';

const render = async () => {
  const governors = await GovernorOptions()
  const facilities = await getFacilities();
  const container = document.getElementById('container');
  container.innerHTML = `
  <h1>Solar System Mining Marketplace</h1>
    <article class="choices">
      <section class="choices__governor options">
      <span>Choose a governor</span> 
      ${governors}
    </section>
     <section class="choices__facility options">
        <span>Choose a facility</span>
        ${facilities}
      </section>
  </article>
  `;
};
render();
