type element;

let window: element = [%bs.raw "window"];

[@bs.send]
external addEventListener : (element, string, unit => unit) => unit =
  "addEventListener";

[@bs.val]
external requestAnimationFrame : (unit => unit) => unit =
  "requestAnimationFrame";