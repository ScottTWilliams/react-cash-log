"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var ActivityApi = require('../api/activityApi');

var InitializeActions = {
  initApp: function() {
    Dispatcher.dispatch({
      actionType: ActionTypes.INITIALIZE,
      initialData: {
        activities: ActivityApi.getAllActivities()
      }
    });
  }
};

module.exports = InitializeActions;