let favouriteNumbers = [1, 2, 3];

let mySecondFavouriteNumber = numbers =>
  switch (numbers) {
  | [_, x, _] => Some(x)
  | _ => None
  };

mySecondFavouriteNumber(favouriteNumbers);

/* - : option(int) = Some(2) */
mySecondFavouriteNumber([1, 2]);
/* - : option(int) = None */