ASYNCHRONOUS IN GENERAL
> Asynchronous functions are functions that need to reach outside of your script to execute, or otherwise require the script to wait for a result before doing something with it. Two familiar examples are axios and bcrypt.

> Promises and callbacks are two different ways of handling asynchronous code. Nowadays, promises are *generally* preferred.

>`.then` and `async/await` are two different syntaxes for handling promises. Anywhere you use one, you could use the other.

PROMISES
> Promises are constructs for that let us manipulate values that we do not yet know at the time of manipulation. This lets us handle asynchronously retrieved values by just handling an associated promise instead: we may not have the value, but we have a *promise* to have it at some point in the future.

> Promises either *resolve* with the *value* they were meant to retrieve, or *reject* with a *reason* describing what happened to the promise internally.

ASYNC/AWAIT
> You can tell JS to wait for the resolved value of a promise using the keyword `await.`

> In order to use `await`, you must tag the function you are using it in with the keyword `async`. This does mean that async/await can't work on the top-level of your code, and it is normal to use `.then` there if you need to for some reason.

> JS will continue executing work in the background, so there is no performance hit, but your script will not proceed to the next line until the promise `resolve`s or `reject`s.

> Always make sure `await` statements are inside a `try ... catch` block: this way, if an `await`ed promise `reject`s, the catch block will handle the error.