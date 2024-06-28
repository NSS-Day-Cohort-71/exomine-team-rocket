import { setGovernor, setColony } from './TransientState.js';
import { Colonies } from './Colonies.js';

const handleGovernorChoice = async (event) => {
  if (event.target.id === 'governors') {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const colonyId = selectedOption.dataset.colony;
    setGovernor(parseInt(event.target.value));
    setColony(parseInt(colonyId));
    const colonies = await Colonies();
    const coloniesContainer = document.querySelector('.colony_minerals');
    coloniesContainer.innerHTML = colonies;
  }
};

export const GovernorOptions = async () => {
  document.addEventListener('change', handleGovernorChoice);
  const response = await fetch('http://localhost:8088/governors');
  const governors = await response.json();

  let html = `<select id="governors">
                  <option value="0">Select a governor</option>`;
  const stringArray = governors.map((governor) => {
    return `<option data-colony="${governor.colonyId}"value="${governor.id}">${governor.name}</option>`;
  });
  html += stringArray.join('');
  html += '</select>';
  return html;
};
