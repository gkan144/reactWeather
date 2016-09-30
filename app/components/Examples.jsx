import React from 'react';
import {Link} from 'react-router';

var Examples = (props) => {
  return <div>
    <h1 className="text-center">Examples</h1>
    <p>Here are a few example locations to try out.</p>
    <ol>
      <li><Link to="/?location=Athens">Athens, GR</Link></li>
      <li><Link to="/?location=London">London, UK</Link></li>
    </ol>
  </div>;
};

export default Examples;