import React from 'react';
import {Link, IndexLink}  from 'react-router';

export default class Nav extends React.Component {
  render() {
    return <div>
        <h2>Nav</h2>
        <IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Get Weather</IndexLink>
        <Link to="/about" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>About</Link>
        <Link to="/examples" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Examples</Link>
      </div>
  }
}