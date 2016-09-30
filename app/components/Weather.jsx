import React from 'react';

import openWeatherMap from '../../api/openWeatherMap';

class WeatherForm extends React.Component {
  onFormSubmit(event) {
    event.preventDefault();
    var location = this.refs.location.value;
    if(location.trim().length>0) {
      this.refs.location.value = '';
      this.props.onSearch(location);
    }
  }

  render() {
    return <form onSubmit={this.onFormSubmit.bind(this)} method="POST">
      <input type="text" placeholder="Enter city name" ref="location"/>
      <button>Get Weather</button>
    </form>;
  }
}

var WeatherMessage = (props) => {
  return <h3>Temperature is {props.temp} in {props.location}</h3>;
};

export default class Weather extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      location: "Some city",
      temp: 88
    }
  }

  handleSearch(location) {
    this.setState({isLoading: true});
    openWeatherMap(location).then((result) => {
      this.setState({
        isLoading: false,
        location: location,
        temp: result
      });
    }).catch((error)=>{
      this.setState({
        isLoading: false
      });
      alert(error)
    });
  }

  render() {
    var {isLoading, temp, location} = this.state;

    function renderMessage() {
      if(isLoading) return <h3>Fetching weather...</h3>;
      else if (temp && location) return <WeatherMessage temp={temp} location={location}/>;
      else return <h3>Problem with form state</h3>
    }

    return <div>
      <h1>Get Weather</h1>
      <WeatherForm onSearch={this.handleSearch.bind(this)}/>
      {renderMessage()}
    </div>;
  }
}