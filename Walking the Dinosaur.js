//These promises are very simple - they wait two seonds, then resolve or reject based on their internal logic. But you can think of them as a stand-in for any asynchronous action that
//returns a promise: 'axios' and 'bcrypt' are the examples you are most likely familiar with, but there are all kinds of ways to get promises as the results of API calls, hardware polling, and more.

function openTheDoor() {
  return new Promise((resolve, reject) => {
    foundDoor = true;
    setTimeout(() => {
      if (foundDoor) resolve("Opened the door!");
      else reject("Couldn't find the door...");
    }, 2000)
  });
}

function getOnTheFloor() {
  return new Promise((resolve, reject) => {
    shoelacesTied = false;
    setTimeout(() => {
      if (shoelacesTied) resolve("Got on the floor!");
      else reject("Tripped on your shoelaces...");
    }, 2000)
  });
}

function walkTheDinosaur() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Now we're walking the dinosaur!");
    }, 2000)
  });
}
/* * * * * * * * * * * * * * * * * * * */
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

/*BAD_walkingTheDinosaur is aptly named. It's a naive approach, and worse, it won't work right: The if statement on line 46 will check the two flag values before the promise has resolved, and they will both still be undefined. 
Even if you can find the door and tie your shoes eventually, you won't do so in time to Walk the Dinosaur.*/

/* * * * * * * * * * * * * * * * * * * */


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

/* Now we're getting somewhere. This is the proper way to get the functionality we need with .then, and we can start walking the dinosaur. It's sort of a clunky dino, though.
Notice that as we have more asynchronous actions that depend on other asynchronous actions, our code acquires additional scopes and requires additional error handling.*/

/* * * * * * * * * * * * * * * * * * * */

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

/*And finally, we have our awesome awaiting dinosaur. Look how much simpler the code is! The script actually pauses execution at each await, and doesn't continue
to the next line until the awaited promise is resolved. If any prpblem rejects, await will recognize the rejection as an error, and control - and the error message - will
fall through to the catch block.
Finally, a couple twists on the theme:*/

async function SHORT_walkingTheDinosaur() {
  try {
    console.log(await openTheDoor());
    console.log(await getOnTheFloor());
    console.log(await walkTheDinosaur());
  } catch(err) {
    console.log(err);
  }
}

//The first solution can be further simplified by omitting the variable assignments.
//You can use the results of an await statement immediately as a resolved promise, or even simply invoke await on a function whose return doesn't matter to pause execution until it concludes.

async function ALL_walkingTheDinosaur() {
  try {
    const doorPromise = openTheDoor();
    const floorPromise = getOnTheFloor();
    const dinosaurPromise = walkTheDinosaur();

    const results = await Promise.all([doorPromise, floorPromise, dinosaurPromise]);
    console.log(results);
  } catch(err) {
    console.log(err);
  }
}

//This is a slick one: because await works with any promise, you can declare all of your promises synchronously, then send them all off at once with await Promise.all().
//Remember, you are still inside your try...catch block, so if any of the promises fail, they will throw an error and all of the promises will fail.
//That means this function's behavior is actually slightly different. Try setting shoelacesTied to false: not only will you trip on your shoelaces,
//you won't even successfully open the door, because the entire 'await' statement will fail together.

//This isn't always the behavior you want, but it can be a powerful way to structure your code, especially when you need to operate on the results of many promises together.
//ALL_walkingTheDinosaur();
