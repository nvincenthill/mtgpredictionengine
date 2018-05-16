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
      eventData: [],
      card: {},
      value: "",
      eventList: [],
      eventListLoaded: false
    };

    this.updateData = this.updateData.bind(this);
    this.getData = this.getData.bind(this);
    this.getEventData = this.getEventData.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  // get data about a single card
  getCard = async => {
    let query = this.state.value;
    fetch("https://api.scryfall.com/cards/named?" + "fuzzy=" + query)
      .then(response => response.json())
      .then(data => this.setState({ card: data }));
  };

  // get data about standard events
  getData = async () => {
    console.log("Getting Data!");
    // mtgtop8.event(19182, this.updateData);
    mtgtop8.standardEvents(this.updateEvents);
  };

  // get data about a specific event
  getEventData = async eventID => {
    console.log("Getting Event Data for event # " + eventID);
    mtgtop8.event(eventID, this.updateData);
  };

  // callback to set events state
  updateEvents = (err, events) => {
    if (err) {
      alert(err);
      return console.error(err);
    } else if (events) {
      console.log(events);
      let joined = this.state.eventList.concat(events);
      this.setState({ eventList: joined });
      this.setState({ eventListLoaded: true });
    }
  };

  // callback to set a specific event state
  updateData = (err, event) => {
    if (err) {
      alert(err);
      return console.error(err);
    } else if (event) {
      console.log(event);
      let joined = this.state.eventData.concat(event);
      this.setState({ eventData: joined });
    }
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  loadData = () => {
    for (let i = 0; i < 10; i++) {
      this.getEventData(this.state.eventList[i].id);
    }
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          handleChange: this.handleChange,
          getCard: this.getCard,
          updateData: this.updateData,
          getData: this.getData,
          loadData: this.loadData
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
    let eventTitles = (
      <MyContext.Consumer>
      {context => (
        <React.Fragment>
          {context.state.eventList.map((item) => <h4 key={item.id}>{item.title}</h4>)}
        </React.Fragment>
      )}
      </MyContext.Consumer>
    );

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
                  onClick={context.loadData}
                >
                  Get Event Data
                </Button>
              </React.Fragment>
            )}
          </MyContext.Consumer>

          <Well>
            <MyContext.Consumer>
              {context => (
                <React.Fragment>
                  <h3>
                    Events
                  </h3>
                  <div>
                    {eventTitles}
                  </div>
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
