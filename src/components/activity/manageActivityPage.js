"use strict";

var React = require('react');
var Router = require('react-router');
var ActivityForm = require('./activityForm');
var ActivityActions = require('../../actions/activityActions');
var ActivityStore = require('../../stores/activityStore');
var toastr = require('toastr');

var ManageActivityPage = React.createClass({
  mixins: [
    Router.Navigation
  ],

  statics: {
    willTransitionFrom: function(transition, component) {
      if (component.state.dirty && !confirm('Leave without saving?')) {
        transition.abort();
      }
    }
  },

  getInitialState: function() {
    return {
      activity: { id: '', amount: '', comment: '' },
      errors: {},
      dirty: false
    };
  },

  componentWillMount: function() {
    var activityId = this.props.params.id; //from the path '/activity:id'
    if (activityId) {
      this.setState({activity: ActivityStore.getActivityById(activityId) });
    }
  },

  setActivityState: function(event) {
    this.setState({dirty: true});
    var field = event.target.name;
    var value = event.target.value;
    this.state.activity[field] = value;
    return this.setState({activity: this.state.activity});
  },

  activityFormIsValid: function() {
    var formIsValid = true;
    this.state.errors = {}; //clear any previous errors.

    if (this.state.activity.amount.length < 3) {
      this.state.errors.amount = 'First name must be at least 3 characters.';
      formIsValid = false;
    }

    if (this.state.activity.comment.length < 3) {
      this.state.errors.comment = 'Last name must be at least 3 characters.';
      formIsValid = false;
    }

    this.setState({errors: this.state.errors});
    return formIsValid;
  },

  saveActivity: function(event) {
    event.preventDefault();

    if (!this.activityFormIsValid()) {
      return;
    }

    if (this.state.activity.id) {
      ActivityActions.updateActivity(this.state.activity);
    } else {
      ActivityActions.createActivity(this.state.activity);
    }
    
    this.setState({dirty: false});
    toastr.success('Activity saved.');
    this.transitionTo('activities');
  },

  cancelActivity: function(event) {
    event.preventDefault();
    
    this.setState({dirty: false});
    toastr.info('Not saved.');
    this.transitionTo('activities');
  },

  deleteActivity: function(event) {
    event.preventDefault();

    if (this.state.activity.id) {
      ActivityActions.deleteActivity(this.state.activity.id);
      this.transitionTo('activities');
      toastr.success('Activity Deleted');
    } else {
      toastr.success('Not Deleted, There was an error');
    }
  },

  render: function() {
    return (
      <ActivityForm
        activity={this.state.activity}
        onChange={this.setActivityState}
        onCancel={this.cancelActivity}
        onDelete={this.deleteActivity}
        onSave={this.saveActivity}
        errors={this.state.errors} />
    );
  }
});

module.exports = ManageActivityPage;