import React, { Component } from "react";
import "./App.css";
// import mtg from "mtgsdk";
import mtgtop8 from "mtgtop8";
import { Scryfall } from "scryfall";

class App extends Component {
  state = {
    event: {},
    load: false,
    query: "exact=Karn+Scion+of+Urza",
  };

  // componentDidMount() {
    // find a single card name
    // mtg.card.find(4).then(result => {
    //   this.setState({card : result.card.name});
    // });
    // mtgtop8.eventInfo(19182, function(err, event) {
    //     console.log(event);
    // });
    // Scryfall.getCard("Karn, Scion of Urza", "name", (err, card) => {
    //   if (err) {
    //     console.log("ERROR");
    //   } else {
    //     console.log(card.name); // "Gideon, Ally of Zendikar"
    //     console.log(card.usd); // 4
    //     // ...
    //   }
    // });
  // }

  getCard = async (query) => {
    fetch('https://api.scryfall.com/cards/named?' + query)
      .then(response => response.json())
      .then(data => this.setState({ card: data }));
  }

  getData = async () => {
    console.log("Getting Data!");
    let data = await mtgtop8.event(19182, function(err, event) {
      if (err) {
        return console.error(err);
      } else {
        // this.setState({ event: event });
        console.log(event);
      }
    });
  };

  updateData(data) {
    this.setState({ event: data });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Magic The Gathering Prediction Engine</h1>
        </header>
        <button onClick={() => this.getCard(this.state.query)}>Get Card Data</button>
        <button onClick={this.getData}>Get Event Data</button>
      </div>
    );
  }
}

export default App;
