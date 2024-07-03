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
  const { mineralObj, combinedMinerals, colonyId } = transientState;

  const combinedMineral = combinedMinerals.find(
    (mineral) => mineral.mineralId === mineralObj.id
  );

  if (!combinedMineral) return;

  // Fetch the existing colony minerals
  const response = await fetch(`http://localhost:8088/colonyMinerals?colonyId=${colonyId}&mineralId=${mineralObj.id}`);
  const existingColonyMinerals = await response.json();

  if (existingColonyMinerals.length > 0) {
    // If the mineral already exists in the colony, update its quantity
    const existingColonyMineral = existingColonyMinerals[0];
    const updatedColonyMineral = {
      ...existingColonyMineral,
      quantity: existingColonyMineral.quantity + 1, // Increment the quantity by 1 ton
    };

    await fetch(
      `http://localhost:8088/colonyMinerals/${existingColonyMineral.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedColonyMineral),
      }
    );
  } else {
    // If the mineral does not exist, create a new entry
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        colonyId,
        mineralId: mineralObj.id,
        quantity: 1, // Assuming 1 ton of the mineral is purchased
      }),
    };

    await fetch('http://localhost:8088/colonyMinerals', postOptions);
  }

  // Update the facility mineral quantity
  const updatedFacilityMineral = {
    ...combinedMineral,
    quantity: combinedMineral.quantity - 1,
  };

  await fetch(
    `http://localhost:8088/facilityMinerals/${combinedMineral.facilityMineralId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFacilityMineral),
    }
  );

  const combinedMineralIndex = combinedMinerals.findIndex(
    (mineral) => mineral.mineralId === mineralObj.id
  );

  if (combinedMineralIndex !== -1) {
    transientState.combinedMinerals[combinedMineralIndex].quantity =
      updatedFacilityMineral.quantity;
  }

  document.dispatchEvent(new CustomEvent('stateChanged'));
};
