import { transientState } from './TransientState.js';

export const Colonies = async () => {
  const response = await fetch('http://localhost:8088/colonies');
  const colonies = await response.json();
  const currentState = transientState;
  let html = '<h2>Colony Minerals</h2>';

  const colonyMineralsResponse = await fetch(
    'http://localhost:8088/colonyMinerals'
  );
  const colonyMinerals = await colonyMineralsResponse.json();

  const mineralsResponse = await fetch('http://localhost:8088/minerals');
  const minerals = await mineralsResponse.json();

  for (const colony of colonies) {
    if (colony.id === currentState.colonyId) {
      html = `<h2>${colony.name} Minerals</h2>`;

      // Find all minerals for the current colony
      const colonyMineralsList = [];
      for (const cm of colonyMinerals) {
        if (cm.colonyId === colony.id) {
          colonyMineralsList.push(cm);
        }
      }

      // Combine the quantities of the same minerals
      const combinedColonyMinerals = [];
      for (const colonyMineral of colonyMineralsList) {
        let found = false;
        for (const existingMineral of combinedColonyMinerals) {
          if (existingMineral.mineralId === colonyMineral.mineralId) {
            existingMineral.quantity += colonyMineral.quantity;
            found = true;
          }
        }
        if (!found) {
          combinedColonyMinerals.push({ ...colonyMineral });
        }
      }

      for (const colonyMineral of combinedColonyMinerals) {
        let mineral = null;
        for (const m of minerals) {
          if (m.id === colonyMineral.mineralId) {
            mineral = m;
          }
        }
        if (mineral) {
          html += `<p>${colonyMineral.quantity} tons of ${mineral.mineral}</p>`;
        }
      }
    }
  }
  return html;
};
