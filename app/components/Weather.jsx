import React from 'react';

import ErrorModal from './ErrorModal';

import openWeatherMap from '../api/openWeatherMap';

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
      <input type="search" placeholder="Search weather by city" ref="location"/>
      <button className="button expanded hollow">Get Weather</button>
    </form>;
  }
}

var WeatherMessage = (props) => {
  return <h3 className="text-center">Temperature is {props.temp} in {props.location}</h3>;
};

export default class Weather extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      errorMessage: undefined
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
        isLoading: false,
        errorMessage: error.message
      });
    });
  }

  render() {
    var {isLoading, temp, location, errorMessage} = this.state;

    function renderMessage() {
      if(isLoading) return <h3 className="text-center">Fetching weather...</h3>;
      else if (temp && location) return <WeatherMessage temp={temp} location={location}/>;
      else return <h3 className="text-center">Search for city</h3>
    }

    function renderError() {
      if(typeof errorMessage === 'string') {
        return <ErrorModal message={errorMessage}/>
      }
    }

    return <div>
      <h1 className="text-center page-title">Get Weather</h1>
      <WeatherForm onSearch={this.handleSearch.bind(this)}/>
      {renderMessage()}
      {renderError()}
    </div>;
  }
}