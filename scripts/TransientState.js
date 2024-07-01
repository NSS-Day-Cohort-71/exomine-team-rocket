export const transientState = {
  governorId: 0,
  colonyId: 0,
  mineralObj: {},
  selectedFacility: 0,
};

export const setGovernor = (chosenGovernor) => {
  transientState.governorId = chosenGovernor;
  console.log(transientState);
};
export const setColony = (chosenColony) => {
  transientState.colonyId = chosenColony;
  console.log(transientState);
};
export const setMineral = (chosenMineral) => {
  transientState.mineralObj = chosenMineral;
  console.log(transientState);
};

export const setFacility = (facilityId) => {
  transientState.selectedFacility = facilityId;
  console.log(transientState);
};

// export const purchaseMineral = () => {
//     /*
//         Does the chosen governor's colony already own some of this mineral?
//             - If yes, what should happen?
//             - If no, what should happen?

//         Defining the algorithm for this method is traditionally the hardest
//         task for teams during this group project. It will determine when you
//         should use the method of POST, and when you should use PUT.

//         Only the foolhardy try to solve this problem with code.
//     */

//     document.dispatchEvent(new CustomEvent("stateChanged"))
// }
