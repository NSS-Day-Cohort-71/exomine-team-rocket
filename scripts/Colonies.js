import { transientState } from './TransientState.js';

export const Colonies = async () => {
  const response = await fetch('http://localhost:8088/colonies');
  const colonies = await response.json();
  const currentState = transientState;
  let html = '<h2>Colony Minerals</h2>';

  const colonyMineralsResponse = await fetch('http://localhost:8088/colonyMinerals');
  const colonyMinerals = await colonyMineralsResponse.json();

  const mineralsResponse = await fetch('http://localhost:8088/minerals');
  const minerals = await mineralsResponse.json();

  for (const colony of colonies) {
    if (colony.id === currentState.colonyId) {
      html = `<h2>${colony.name} Minerals</h2>`;
      const colonyMineralsList = colonyMinerals.filter(cm => cm.colonyId === colony.id);
      
      // Combine the quantities of the same minerals
      const combinedColonyMinerals = colonyMineralsList.reduce((acc, colonyMineral) => {
        const existingMineral = acc.find(cm => cm.mineralId === colonyMineral.mineralId);
        if (existingMineral) {
          existingMineral.quantity += colonyMineral.quantity;
        } else {
          acc.push({ ...colonyMineral });
        }
        return acc;
      }, []);

      for (const colonyMineral of combinedColonyMinerals) {
        const mineral = minerals.find(m => m.id === colonyMineral.mineralId);
        if (mineral) {
          html += `<p>${colonyMineral.quantity} tons of ${mineral.mineral}</p>`;
        }
      }
    }
  }
  return html;
};
