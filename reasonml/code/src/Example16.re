open Js.Promise;

let myPromise = resolve(2);

myPromise
|> then_(value => resolve(value + 2))
|> catch(_err => resolve(-2))
|> then_(v => resolve(Js.log(v)))
|> ignore;