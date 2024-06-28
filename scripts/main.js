import { Colonies } from './Colonies.js';
import { GovernorOptions } from './Governors.js';

const render = async () => {
  const governors = await GovernorOptions();
  const colonies = await Colonies();
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
  </article>

  `;
};
render();
