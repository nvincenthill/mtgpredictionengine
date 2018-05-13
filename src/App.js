import React, { Component } from "react";
import "./App.css";
import mtg from "mtgsdk";

class App extends Component {
  state = {
    card: ""
  };

  componentDidMount() {
    mtg.card.find(3).then(result => {
      this.setState({card : result.card.name});
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
