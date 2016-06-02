"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActivityApi = require('../api/activityApi');
var ActionTypes = require('../constants/actionTypes');

var ActivityActions = {
  createActivity: function(activity) {
    var newActivity = ActivityApi.saveActivity(activity);

    //Hey dispatcher, go tell all the stores that an activity was just created.
    Dispatcher.dispatch({
      actionType: ActionTypes.CREATE_ACTIVITY,
      activity: newActivity
    });
  },

  updateActivity: function(activity) {
    var updatedActivity = ActivityApi.saveActivity(activity);

    Dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_ACTIVITY,
      activity: updatedActivity
    });
  },

  deleteActivity: function(id) {
    ActivityApi.deleteActivity(id);

    Dispatcher.dispatch({
      actionType: ActionTypes.DELETE_ACTIVITY,
      id: id
    });
  }
};

module.exports = ActivityActions;