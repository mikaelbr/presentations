module Awesome = {
  let component = ReasonReact.statelessComponent("AwesomeButton");
  let make = _children => {
    ...component,
    render: _self =>
      <div>
        <button> (ReasonReact.stringToElement("Awesome!")) </button>
      </div>,
  };
};

ReactDOMRe.renderToElementWithId(<Awesome />, "preview");