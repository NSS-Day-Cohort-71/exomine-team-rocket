
import { Colonies } from './Colonies.js';
import { GovernorOptions } from './Governors.js';
import { getFacilities } from './Facilities.js';

const render = async () => {
  const governors = await GovernorOptions();
  const colonies = await Colonies();



  const facilities = await getFacilities();

  const container = document.getElementById('container');

  container.innerHTML = `
    <article class="choices">
      <section class="choices__governor options">
      <span>Choose a governor</span> 
      ${governors}
    </section>

    <article class="colonies">
      <section class="colony_minerals">
      ${colonies}

     <section class="choices__facility options">
        <span>Choose a facility</span>
        ${facilities}
      </section>

  </article>

  `;
};
render();
