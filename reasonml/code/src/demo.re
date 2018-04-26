/* type webData('a) =
     | NotAsked
     | Pending
     | Success('a)
     | Error(string);

   type action =
     | Loading
     | SetPodcasts(list(Podcast.t))
     | Failure;

   type state = {podcasts: webData(list(Podcast.t))};

   let component = ReasonReact.reducerComponent("Page");

   let str = ReasonReact.stringToElement;

   let make = (~podcasts=[], _children) => {
     ...component,
     initialState: () => {podcasts: NotAsked},
     reducer: (action, _state) =>
       switch (action) {
       | Loading => ReasonReact.Update({podcasts: Pending})
       | SetPodcasts(l) => ReasonReact.Update({podcasts: Success(l)})
       | Failure =>
         ReasonReact.Update({podcasts: Error("Error loading the planets")})
       },
     didMount: self =>
       ReasonReact.UpdateWithSideEffects(
         {podcasts: Pending},
         self =>
           PodcastData.fetchPodcastList()
           |> Js.Promise.then_(podcasts => {
                self.reduce(podcasts => SetPodcasts(podcasts |> Array.to_list));
                Js.Promise.resolve();
              }),
       ),
     render: self =>
       <div>
         <h1> (str("Podcasts")) </h1>
         (
           switch (self.state.podcasts) {
           | NotAsked => ReasonReact.stringToElement("")
           | Pending => ReasonReact.stringToElement("Loading")
           | Success(podcasts) =>
             <ul>
               (
                 podcasts
                 |> List.map((podcast: Podcast.t) =>
                      <li key=podcast.title> (str(podcast.title)) </li>
                    )
                 |> Array.of_list
                 |> ReasonReact.arrayToElement
               )
             </ul>
           | Error(e) => ReasonReact.stringToElement(e)
           }
         )
       </div>,
   }; */