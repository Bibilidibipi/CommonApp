var Input = require('./input.jsx');
var FrontendActions = require('../actions/frontend_actions');

module.exports = React.createClass({
  remove: function () {
    FrontendActions.removeAddress(this.props.adr);
  },

  render: function () {
    return <div>
        <div className="row">
            <div className="col-md-5">
            </div>
            <div className="col-md-3">
                <Input
                    displayName="City" 
                    name="city" 
                    form={this.props.form}
                />
            </div>
            <div className="col-md-2">
                <Input
                    displayName="State" 
                    name="state" 
                    form={this.props.form}
                />            
            </div>
            <div className="col-md-2">
                <Input
                    displayName="Zip" 
                    name="zip" 
                    form={this.props.form}
                />            
            </div>
        </div>
        <div className="row">
            <div className="col-md-2">
                <Input
                    displayName="Date In" 
                    name="date_in" 
                    form={this.props.form}
                />
            </div>
            <div className="col-md-2">
                <Input
                    displayName="Date Out" 
                    name="date_out" 
                    form={this.props.form}
                />
            </div>
            <div className="col-md-5">
                <Input
                    displayName="Owner/Agent Name" 
                    name="agent_name" 
                    form={this.props.form}
                />            
            </div>
            <div className="col-md-3">
                <Input
                    displayName="Owner/Agent Phone Number" 
                    name="agent_phone" 
                    form={this.props.form}
                />            
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <Input
                    displayName="Reason for moving out" 
                    name="move_out_reason" 
                    form={this.props.form}
                />            
            </div>
        </div>
        <button type='button' onClick={this.remove} >Remove this Address</button>
    </div>;
  }
});
