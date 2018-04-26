type state = {
  active: option(string),
  items: list(string),
};

type actions =
  | Active(string)
  | UpdateList(list(string));

let component = ReasonReact.reducerComponent("List");

let str = ReasonReact.stringToElement;

let updateList = (send, _) => send(UpdateList(["Item 1", "Item 2"]));

let make = _children => {
  ...component,
  initialState: () => {active: None, items: []},
  reducer: (action, state) =>
    switch (action) {
    | Active(name) => ReasonReact.Update({...state, active: Some(name)})
    | UpdateList(l) => ReasonReact.Update({...state, items: l})
    },
  render: ({state, send}) => {
    let title =
      fun
      | None => "No active"
      | Some(name) => "Active: " ++ name;
    let items =
      state.items
      |> List.map(item =>
           <li key=item>
             <button onClick=(_event => send(Active(item)))>
               (str(item))
             </button>
           </li>
         )
      |> Array.of_list
      |> ReasonReact.arrayToElement;
    <div>
      <h1> (str(title(state.active))) </h1>
      <button onClick=(updateList(send))> (str("Fetch")) </button>
      <ul> items </ul>
    </div>;
  },
};