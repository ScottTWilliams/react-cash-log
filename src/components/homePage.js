"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Home = React.createClass({
  render: function() {
    return (
      <div className="jumbotron">
        <h1>Cash Log</h1>
        <p>Where did my money go?</p>
        <Link to="activities" className="btn btn-primary btn-lg">Learn more</Link>
      </div>
    );
  }
});

module.exports = Home;