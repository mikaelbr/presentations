let (>>) = (f, g, a) => g(f(a));

let double = ( * )(2);

let doubleDouble = double >> double;

4 |> doubleDouble;
/* - : int = 16 */