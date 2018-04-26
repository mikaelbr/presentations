type movie = {
  .
  "title": string,
  "year": int,
  [@bs.set] "genre": string,
  [@bs.meth] "getPoster": unit => string,
};

[@bs.val] external infinityWar : movie = "infinityWar";

let year = infinityWar##year;

infinityWar##genre#="Action";

infinityWar##getPoster();