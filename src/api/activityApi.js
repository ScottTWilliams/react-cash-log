"use strict";

//This file is mocking a web API by hitting hard coded data.
var activities = require('./activityData').activities;
var _ = require('lodash');

var dbIndexCount = 0;

activities.sort(function(a, b){
  if(a.timestamp < b.timestamp){
    return 1;
  } else if(a.timestamp > b.timestamp) {
    return -1;
  } else {
    return 0;
  }
});


//This would be performed on the server in a real app. Just stubbing in.
var _generateId = function(activity) {
  //return activity.firstName.toLowerCase() + '-' + activity.lastName.toLowerCase();
  return ++dbIndexCount;
};

//This would be performed on the server in a real app. Just stubbing in.
var _generateTimestamp = function() {
  //return activity.firstName.toLowerCase() + '-' + activity.lastName.toLowerCase();
  return (new Date().getTime());
};

var _clone = function(item) {
  return JSON.parse(JSON.stringify(item)); //return cloned copy so that the item is passed by value instead of by reference
};

var ActivityApi = {
  getAllActivities: function() {
    return _clone(activities); 
  },

  getActivityById: function(id) {
    var activity = _.find(activities, {id: id});
    return _clone(activity);
  },
  
  saveActivity: function(activity) {
    //pretend an ajax call to web api is made here
    console.log('Pretend this just saved the activity to the DB via AJAX call...');
    
    if (activity.id) {
      var existingActivityIndex = _.indexOf(activities, _.find(activities, {id: activity.id})); 
      activities.splice(existingActivityIndex, 1, activity);
    } else {
      //Just simulating creation here.
      //The server would generate ids for new activities in a real app.
      //Cloning so copy returned is passed by value rather than by reference.
      activity.id = _generateId(activity);
      activity.timestamp = _generateTimestamp();
      activities.unshift(activity);
    }

    return _clone(activity);
  },

  deleteActivity: function(id) {
    console.log('Pretend this just deleted the activity from the DB via an AJAX call...');
    _.remove(activities, { id: id});
  }
};

module.exports = ActivityApi;