// import dependencies

import React, { Component } from "react";
import "./App.css";
import mtgtop8 from "mtgtop8";
import { Button, Well } from "react-bootstrap";
import Footer from "./Footer";

// first we will make a new context
const MyContext = React.createContext();

// Then create a provider Component
class MyProvider extends Component {
  constructor(props) {
      super(props);

      this.state = {
        event: {},
        load: false,
        card: {},
        value: ""
      };

      this.updateData = this.updateData.bind(this);
      this.getData = this.getData.bind(this);
  }



  getCard = async => {
    let query = this.state.value;
    fetch("https://api.scryfall.com/cards/named?" + "fuzzy=" + query)
      .then(response => response.json())
      .then(data => this.setState({ card: data }));
  };

  getData = async () => {
    console.log("Getting Data!");
    let data;
    mtgtop8.event(19182, function(err, event) {
      if (err) {
        alert(err);
        return console.error(err);
      } else if (event) {
        data = event;
        console.log(data);
        if (data) {
          this.updateData(data);
        }
      }
    });

  };

  updateData = (data) => {
    console.log("Setting state!");
    this.setState({ event: data});
    console.log(this.state.event);
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  componentDidMount() {}

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
            {context => (
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
                <input
                  type="text"
                  name="username"
                  onChange={context.handleChange}
                />
                <br />
              </React.Fragment>
            )}
          </MyContext.Consumer>

          <Well>
            <MyContext.Consumer>
              {context => (
                <React.Fragment>
                  <img
                    src={
                      context.state.card.name
                        ? context.state.card.image_uris.small
                        : "did not load"
                    }
                    alt="did not load"
                  />
                  <h3>
                    Name:{" "}
                    {context.state.card.name ? context.state.card.name : "n/a"}
                  </h3>
                  <h4>
                    Price:{" "}
                    {context.state.card.usd
                      ? "$" + context.state.card.usd
                      : "n/a"}
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
