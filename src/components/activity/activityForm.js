"use strict";

var React = require('react');
var NumberInput = require('../common/numberInput');
var TextInput = require('../common/textInput');

var ActivityForm = React.createClass({
  propTypes: {
    activity: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object
  },

  render: function() {
    var deleteButton;
    if (this.props.activity.id) {
      deleteButton = <input type="button" value="Delete" className="btn btn-danger" onClick={this.props.onDelete} />;
    }

    return (
      <form>
        <h1>Manage Activity</h1>
        <TextInput
          name="account"
          label="Account"
          value={this.props.activity.account}
          onChange={this.props.onChange}
          error={this.props.errors.account} />

        <NumberInput
          name="amount"
          label="Amount"
          value={this.props.activity.amount}
          onChange={this.props.onChange}
          error={this.props.errors.amount} />

        <TextInput
          name="comment"
          label="Comment"
          value={this.props.activity.comment}
          onChange={this.props.onChange}
          error={this.props.errors.comment} />
        
        <input type="button" value="Cancel" className="btn btn-default" onClick={this.props.onCancel} />
        <input type="submit" value="Save" className="btn btn-success" onClick={this.props.onSave} />
        <div>
          {deleteButton}
        </div>
      </form>
    );
  }
});

module.exports = ActivityForm;