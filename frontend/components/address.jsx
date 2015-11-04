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
                    type='address'
                    id={this.props.adr.id}
                />
            </div>
            <div className="col-md-2">
                <Input
                    displayName="State" 
                    name="state" 
                    type='address'
                    id={this.props.adr.id}
                />            
            </div>
            <div className="col-md-2">
                <Input
                    displayName="Zip" 
                    name="zip" 
                    type='address'
                    id={this.props.adr.id}
                />            
            </div>
        </div>
        <div className="row">
            <div className="col-md-2">
                <Input
                    displayName="Date In" 
                    name="date_in" 
                    type='address'
                    id={this.props.adr.id}
                />
            </div>
            <div className="col-md-2">
                <Input
                    displayName="Date Out" 
                    name="date_out" 
                    type='address'
                    id={this.props.adr.id}
                />
            </div>
            <div className="col-md-5">
                <Input
                    displayName="Owner/Agent Name" 
                    name="agent_name" 
                    type='address'
                    id={this.props.adr.id}
                />            
            </div>
            <div className="col-md-3">
                <Input
                    displayName="Owner/Agent Phone Number" 
                    name="agent_phone" 
                    type='address'
                    id={this.props.adr.id}
                />            
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <Input
                    displayName="Reason for moving out" 
                    name="move_out_reason" 
                    type='address'
                    id={this.props.adr.id}
                />            
            </div>
        </div>
        <button type='button' onClick={this.remove} >Remove this Address</button>
    </div>;
  }
});
