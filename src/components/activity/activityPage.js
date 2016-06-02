"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var ActivityStore = require('../../stores/activityStore');
var ActivityActions = require('../../actions/activityActions');
var ActivityList = require('./activityList');

var ActivityPage = React.createClass({
  getInitialState: function() {
    return {
      activities: ActivityStore.getAllActivities()
    };
  },

  componentWillMount: function() {
    ActivityStore.addChangeListener(this._onChange);
  },

  //Clean up when this component is unmounted
  componentWillUnmount: function() {
    ActivityStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ activities: ActivityStore.getAllActivities() });
  },

  render: function() {
    return (
      <div>
        <h1>Activities</h1>
        <Link to="addActivity" className="btn btn-default">Add Activity</Link>
        <ActivityList activities={this.state.activities} />
      </div>
    );
  }
});

module.exports = ActivityPage;