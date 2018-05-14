import React, { Component } from "react";
import "./App.css";
import mtg from "mtgsdk";
import mtgtop8 from "mtgtop8";
import { Scryfall } from "scryfall";

class App extends Component {
  state = {
    card: ""
  };

  componentDidMount() {
    // find a single card name
    // mtg.card.find(4).then(result => {
    //   this.setState({card : result.card.name});
    // });

    let test;

    mtgtop8.standardEvents(1, function(err, events) {
      if (err) return console.error(err);
      // console.log(events);
      // Get player results and decks about a specific event
      mtgtop8.event(events[0].id, function(err, event) {
        if (err) return console.error(err);
        test = event;
        console.log(test.decks[0].cards);
      });
    });


    // mtgtop8.eventInfo(19182, function(err, event) {
    //     console.log(event);
    // });

    Scryfall.getCard("bfz", 29, (err, card) => {
        if (err) {
            // If the call was successful, this will be null.
        } else {
            console.log(card.name); // "Gideon, Ally of Zendikar"
            console.log(card.usd); // 4
            // ...
        }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Magic The Gathering Prediction Engine</h1>
        </header>
        <p className="App-intro">{this.state.card}</p>
      </div>
    );
  }
}

export default App;
