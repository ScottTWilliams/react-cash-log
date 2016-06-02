"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _activity = [];

var ActivityStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getAllActivities: function() {
    return _activity;
  },

  getActivityById: function(id) {
    return _.find(_activity, {id: id});
  }
});

Dispatcher.register(function(action) {
  switch(action.actionType) {
    case ActionTypes.INITIALIZE:
      _activity = action.initialData.activities;
      ActivityStore.emitChange();
      break;
    case ActionTypes.CREATE_ACTIVITY:
      _activity.unshift(action.activity);
      ActivityStore.emitChange();
      break;
    case ActionTypes.UPDATE_ACTIVITY:
      var existingActivity = _.find(_activity, {id: action.activity.id});
      var existingActivityIndex = _.indexOf(_activity, existingActivity); 
      _activity.splice(existingActivityIndex, 1, action.activity);
      ActivityStore.emitChange();
      break;  
    case ActionTypes.DELETE_ACTIVITY:
      _.remove(_activity, function(activity) {
        return action.id === activity.id;
      });
      ActivityStore.emitChange();
      break;
    default:
      // no op
  }
});

module.exports = ActivityStore;