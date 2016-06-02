"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ActivityActions = require('../../actions/activityActions');
var toastr = require('toastr');

var ActivityList = React.createClass({
  propTypes: {
    activities: React.PropTypes.array.isRequired
  },

  deleteActivity: function(id, event) {
    event.preventDefault();
    ActivityActions.deleteActivity(id);
    toastr.success('Activity Deleted');
  },

  render: function() {
    var createActivityRow = function(activity) {
      var timestampToDate = function(){
        var date = new Date(parseInt(activity.timestamp));
        var month = 1 + date.getMonth();
        var day = date.getDate();
        var year = "0" + date.getFullYear();

        var hours = "0" + date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();

        var formattedTime = month + '/' + day + '/' + year.substr(-2) + ' - ' + hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime;
      };

      return (
        <tr key={activity.id}>
          <td>{timestampToDate()}</td>
          <td>{activity.comment}</td>
          <td>{activity.amount}</td>
          <td>subTotal</td>
          <td>{activity.account}</td>
          <td><Link to="manageActivity" params={{id: activity.id}}>Edit</Link></td>
          <td><a href="#" onClick={this.deleteActivity.bind(this, activity.id)}>Delete</a></td>
        </tr>
      );
    };

    return (
      <div>
        <table className="table">
          <thead>
            <th>Date</th>
            <th>Comment</th>
            <th>Amount</th>
            <th>Balance</th>
            <th>Account</th>
            <th>Edit</th>
            <th>Delete</th>
          </thead>
          <tbody>
            {this.props.activities.map(createActivityRow, this)}
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = ActivityList;