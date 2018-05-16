// import dependencies

import React, { Component } from "react";
import "./App.css";
import mtgtop8 from "mtgtop8";
import { Button, Well } from "react-bootstrap";
import Footer from "./Footer";


// define app component

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      load: false,
      card: {},
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  getCard = async => {
    let query = this.state.value.split(" ").join("+");
    console.log(query);
    fetch("https://api.scryfall.com/cards/named?" + "fuzzy=" + query)
      .then(response => response.json())
      .then(data => this.setState({ card: data }));
  };

  getData = async () => {
    console.log("Getting Data!");
    let data;
    fetch(
      mtgtop8.event(19182, function(err, event) {
        if (err) {
          alert(err);
          return console.error(err);
        } else {
          // this.setState({ event: event });
          console.log(event);
          data = event;
        }
      })
    ).then(this.updateData(data));
  };

  updateData(data) {
    this.setState({ event: data });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    let image = (
      <img
        src={this.state.card.name ? this.state.card.image_uris.small : null}
      />
    );
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">MTG | Product and Pricing Engine</h1>
        </header>
        <Button
          className="button"
          bsStyle="primary"
          bsSize="large"
          onClick={() => this.getCard(this.state.query)}
        >
          Get Card Data
        </Button>
        <Button
          className="button"
          bsStyle="primary"
          bsSize="large"
          onClick={this.getData}
        >
          Get Event Data
        </Button>
        <br />
        <input type="text" name="username" onChange={this.handleChange} />
        <br />
        <Well>
          {image}
          <h3>Name: {this.state.card.name ? this.state.card.name : "n/a"}</h3>
          <h4>
            {" "}
            Price: {this.state.card.usd ? "$" + this.state.card.usd : "n/a"}
          </h4>
        </Well>
        <Footer />
      </div>
    );
  }
}

export default App;
