type myNumber = int;

type myFloat = float;

type customTuple = (myFloat, myNumber);

type customTuple2 = (myFloat, myNumber);

let foo: customTuple = (4.2, 4);

let bar: customTuple2 = foo;
/* let foo: customTuple = (4.2, 4.2); */