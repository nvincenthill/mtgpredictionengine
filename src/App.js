// import dependencies

import React, { Component } from "react";
import "./App.css";
import mtgtop8 from "mtgtop8";
import { Button, Well } from "react-bootstrap";
import Footer from "./Footer";
import scryfall from "scryfall";

// first we will make a new context
const MyContext = React.createContext();

// Then create a provider Component
class MyProvider extends Component {
  state = {
    event: {},
    load: false,
    card: {},
    value: ""
  };

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
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          handleChange: this.handleChange,
          getCard: this.getCard,
          updateData: this.updateData,
          getData: this.getData
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

// define app component

class App extends Component {
  render() {
    return (
      <MyProvider>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">MTG | Product and Pricing Engine</h1>
          </header>

          <MyContext.Consumer>
            {(context) => (
              <React.Fragment>
                <Button
                  className="button"
                  bsStyle="primary"
                  bsSize="large"
                  onClick={context.getCard}
                >
                  Get Card Data
                </Button>
                <Button
                  className="button"
                  bsStyle="primary"
                  bsSize="large"
                  onClick={context.getData}
                >
                  Get Event Data
                </Button>
                <br />
                <input type="text" name="username" onChange={() => console.log("Changed")} />
                <br />
              </React.Fragment>
            )}
          </MyContext.Consumer>
          


          <Well>
            <MyContext.Consumer>
              {context => (
                <React.Fragment>
                  <h3>
                    Name:{" "}
                    {context.state.card.name ? context.state.card.name : "n/a"}
                  </h3>
                  <h4>
                    Price:{" "}
                    {context.state.card.usd ? "$" + context.state.card.usd : "n/a"}
                  </h4>
                </React.Fragment>
              )}
            </MyContext.Consumer>
          </Well>
          <Footer />
        </div>
      </MyProvider>
    );
  }
}

export default App;
