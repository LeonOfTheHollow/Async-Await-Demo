function brewTea() {
  return new Promise((resolve, reject) => {
    teaIsReady = true;
    setTimeout(() => {
      if (teaIsReady) resolve('☕');
      else reject('Something went wrong with the tea. . .');
    }, 3000)
  });
}

function bakeCake() {
  return new Promise((resolve, reject) => {
    cakeIsReady = true;
    setTimeout(() => {
      if (cakeIsReady) resolve('🍰');
      else reject('Something went wrong with the cake. . .');
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

async function awaitGo() {
  try {
    console.log(await brewTea());
    console.log(await bakeCake());
  } catch(err) {
    console.log(err);
  }
}

thenGo();