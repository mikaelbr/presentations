let maybeValue41 = Some(41);

let valuePlus1Or0 =
  switch (maybeValue41) {
  | Some(x) => x + 1
  | None => 0
  };
/* - : int = 42 */