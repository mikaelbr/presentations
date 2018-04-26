type liste('a) =
  | []
  | ::('a, liste('a));

[1, 2, 3];
/* liste(int) = ::(1, ::(2, ::(3, []))) */