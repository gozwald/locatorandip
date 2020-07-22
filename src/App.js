import React, { Component } from "react";
import "./styles.css";
import { Map, TileLayer } from "react-leaflet";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ipAddress: "",
      dontRerender: 0,
      lat: "",
      lng: "",
      country: "",
      flag: null
    };
  }

  componentDidMount() {
    if (this.state.dontRerender === 0) {
      fetch(
        "https://geo.ipify.org/api/v1?apiKey=at_jzBCCRylrih3Qxeqfu9L9noMb4GbZ"
      )
        .then(response => response.json())
        .then(response =>
          this.setState({
            lat: response.location.lat,
            lng: response.location.lng,
            country: response.location.country,
            ipAddress: response.ip
          })
        )
        .then(() =>
          fetch(`https://restcountries.eu/rest/v2/alpha/${this.state.country}`)
            .then(response => response.json())
            .then(result => this.setState({ flag: result.flag }))
        );

      this.setState({ dontRerender: 1 });
    }
  }

  getnewStates = () => {};

  render() {
    const { lat, lng } = this.state;
    return (
      <div className="App">
        <h1>Your IP Address is:</h1>

        <h2>{this.state.ipAddress}</h2>
        <div>
          <img src={this.state.flag} alt="flag" />
        </div>

        <div>
          {lat && lng && (
            <div>
              {" "}
              <Map center={[this.state.lat, this.state.lng]} zoom={12}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
              </Map>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
