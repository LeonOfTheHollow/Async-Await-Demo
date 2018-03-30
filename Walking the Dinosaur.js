function openTheDoor() {
  return new Promise((resolve, reject) => {
    doorIsOpen = true;
    setTimeout(() => {
      if (doorIsOpen) resolve("Opened the door!");
      else reject('Couldn\'t open the door. . .');
    }, 2000)
  });
}

function getOnTheFloor() {
  return new Promise((resolve, reject) => {
    onTheFloor = false;
    setTimeout(() => {
      if (onTheFloor) resolve("Got on the floor!");
      else reject('Couldn\'t get on the floor. . .');
    }, 2000)
  });
}

function walkTheDinosaur() {
  return new Promise((resolve, reject) => {
    walking = true;
    setTimeout(() => {
      if (walking) resolve("Now we're walking the dinosaur!");
      else reject('Didn\'t walk the dinosaur. . .');
    }, 2000)
  });
}

function BAD_walkingTheDinosaur() {
  let openingTheDoorWorked;
  let gettingOnTheFloorWorked;
  openTheDoor()
    .then(door => {
      console.log(door);
      openingTheDoorWorked = door;
    })
    .catch(err => console.log(err));
  getOnTheFloor()
    .then(floor => {
      console.log(floor);
      gettingOnTheFloorWorked = floor;
    })
    .catch(err => console.log(err));
  if (openingTheDoorWorked && gettingOnTheFloorWorked) {
    walkTheDinosaur()
      .then(dinosaur => console.log(dinosaur))
      .catch(err => console.log(err));
  }
}

//BAD_walkingTheDinosaur();

function THEN_walkingTheDinosaur() {
  openTheDoor()
    .then(door => console.log(door))
    .then(() => {
      getOnTheFloor()
        .then(floor => console.log(floor))
        .then(() => {
          walkTheDinosaur()
            .then(dinosaur => console.log(dinosaur))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

//THEN_walkingTheDinosaur();

async function AWAIT_walkingTheDinosaur() {
  try {
    const door = await openTheDoor();
    console.log(door);
    const floor = await getOnTheFloor();
    console.log(floor);
    const dinosaur = await walkTheDinosaur();
    console.log(dinosaur);
  } catch(err) {
    console.log(err);
  }
}

//AWAIT_walkingTheDinosaur()