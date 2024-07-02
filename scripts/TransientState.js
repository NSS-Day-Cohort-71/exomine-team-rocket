export const transientState = {
  governorId: 0,
  colonyId: 0,
  mineralObj: {},
  selectedFacility: 0,
  combinedMinerals: [],
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

export const setCombinedMinerals = (minObj) => {
  transientState.combinedMinerals = minObj;
  console.log(transientState);
};

export const purchaseMineral = async () => {
  for (const combinedMineral of transientState.combinedMinerals) {
    if (combinedMineral.mineralId === transientState.mineralObj.id) {
      transientState.mineralInCart = combinedMineral;
    }
  }
  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transientState),
  };
  const response = await fetch(
    'http://localhost:8088/colonyMinerals',
    postOptions
  );

  const faciltyMinResponse = await fetch(
    'http://localhost:8088/facilityMinerals'
  );
  const facilityMinerals = await faciltyMinResponse.json();

  const colMinResponse = await fetch('http://localhost:8088/colonyMinerals');
  const cololnyMinerals = await colMinResponse.json();
  const lastOrder = cololnyMinerals[cololnyMinerals.length - 1];
  for (const facilityMineral of facilityMinerals) {
    if (lastOrder.mineralInCart.facilityMineralId === facilityMineral.id) {
      facilityMineral.quantity = facilityMineral.quantity - 1;
      const res = await fetch(
        `http://localhost:8088/facilityMinerals/${facilityMineral.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(facilityMineral),
        }
      );
      const combinedMineralIndex = transientState.combinedMinerals.findIndex(
        (mineral) => mineral.mineralId === facilityMineral.mineralId
      );
      if (combinedMineralIndex !== -1) {
        transientState.combinedMinerals[combinedMineralIndex].quantity =
          facilityMineral.quantity;
      }
    }
  }

  document.dispatchEvent(new CustomEvent('stateChanged'));
};
