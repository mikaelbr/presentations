type power = string;

type name = string;

type nemesis = person
and person =
  | Superhuman(name, power, nemesis)
  | NormalUnknown
  | Villain(name);

let drOctopus: nemesis = Villain("Doctor Octopus");

let spiderman: person = Superhuman("Spiderman", "Agile", drOctopus);