type power = string;

type name = string;

type nemesis = person
and person =
  | Superhuman(name, power, nemesis)
  | NormalUnknown
  | Villain(name);

let drOctopus: nemesis = Villain("Doctor Octopus");

let spiderman: person = Superhuman("Spiderman", "Agile", drOctopus);

let heroOrVillain =
  fun
  | Superhuman(name, _, _) => "Hero " ++ name
  | Villain(name) => "Villain " ++ name
  | NormalUnknown => "NA";

heroOrVillain(spiderman);
/* - : name = "Hero Spiderman" */