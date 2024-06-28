import { GovernorOptions } from './Governors.js';

const render = async () => {
  const governors = await GovernorOptions();
  const container = document.getElementById('container');
  container.innerHTML = `
  <h1>Solar System Mining Marketplace</h1>
    <article class="choices">
      <section class="choices__governor options">
      <span>Choose a governor</span> 
      ${governors}
    </section>
  </article>
  `;
};
render();
