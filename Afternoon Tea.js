function brewTea() {
  return new Promise((resolve, reject) => {
    haveTea = true;
    setTimeout(() => {
      if (haveTea) resolve('☕');
      else reject("We don't have any tea!");
    }, 3000)
  });
}

function bakeCake() {
  return new Promise((resolve, reject) => {
    droppedCake = false;
    setTimeout(() => {
      if (droppedCake) reject("I dropped the cake :(");
      else resolve('🍰');
    }, 3000)
  });
}

function badGo() {
  brewTea()
    .then(tea => console.log(`Here's your ${tea}`))
    .catch(err => console.log(err));
  bakeCake()
    .then(cake => console.log(`Here's your ${cake}`))
    .catch(err => console.log(err));
}

//badGo()

function thenGo() {
  brewTea()
    .then(tea => console.log(`Here's your ${tea}`))
    .then(() => {
      bakeCake()
        .then(cake => console.log(`Here's your ${cake}`))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

//thenGo();

async function awaitGo() {
  try {
    const resolutionOfTeaPromise = await brewTea();
    console.log(resolutionOfTeaPromise);
    console.log(await bakeCake());
  } catch(e) {
    console.log(e);
  }
}

awaitGo();