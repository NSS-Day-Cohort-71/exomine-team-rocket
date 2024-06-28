import { transientState } from './TransientState.js';

export const Colonies = async () => {
  const response = await fetch('http://localhost:8088/colonies');
  const colonies = await response.json();
  const currentState = transientState;
  let html = '<h2>Colony Minerals</h2>';
  for (const colony of colonies) {
    if (colony.id === currentState.colonyId) {
      html = `<h2>${colony.name} Minerals</h2>`;
    }
  }
  return html;
};
