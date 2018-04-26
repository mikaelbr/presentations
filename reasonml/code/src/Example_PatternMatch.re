let double = ( * )(2);

let prefix = (number, text) => text ++ ": " ++ string_of_int(number);

2 |> double |> prefix(_, "My number");
/* - : list(int) = [2, 4, 6] */