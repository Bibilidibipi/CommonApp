var ReactAddons = require('react-addons');
var ApiUtil = require('../util/api_util');
var Input = require('./input.jsx');
var Address = require('./address.jsx');
var NewAddress = require('./new_address.jsx');
var Notifications = require('./notifications.jsx');

module.exports = React.createClass({
  mixins: [ReactAddons.LinkedStateMixin],

  getInitialState: function () {
    return ApplicationStore.application();
  },

  _sendSave: function () {
    this.setState({ 
      notifications: ["Saving..."], 
      notificationClass: "show" 
    });
    ApiUtil.saveApplication(this.state);
  },

  _onSync: function (notifications) {
    this.setState($.extend(
      {}, 
      ApplicationStore.application(), 
      { notifications: notifications, notificationClass: "show" }
    ));
    setTimeout(function () {
      this.setState({ notificationClass: "fade" });
    }.bind(this), 1000);
  },

  _onError: function () {
    this.setState({ 
      notifications: ["Fix errors and try again"],
      notificationClass: "show" 
    });
    setTimeout(function () {
      this.setState({ notificationClass: "fade" });
    }.bind(this), 1000);    
  },

  _onAddressChange: function () {
    this.setState({ previous_addresses: AddressStore.all() });
  },

  componentDidMount: function () {
    ApplicationStore.addChangeListener(this._onSync);
    ApplicationStore.addErrorListener(this._onError);
    AddressStore.addChangeListener(this._onAddressChange);
    ApiUtil.fetchApplication();
  },

  componentWillUnmount: function () {
    ApplicationStore.removeChangeListener(this._onSync);
    ApplicationStore.removeErrorListener(this._onError);
    AddressStore.removeChangeListener(this._onAddressChange);
  },

  render: function () {
    if(!this.state) { return <div></div>; }
    
    return(
      <div>
          <ul>{this.state.errors && this.state.errors.map(function (message, i) {
              return <li key={i}>{message}</li>;
          })}</ul>
          <Notifications 
            notifications={this.state.notifications} 
            className={this.state.notificationClass} 
          />
          <button onClick={this._sendSave}>Save Changes</button>
          <div className="row">
              <div className="col-md-12 text-center h2">Application To Rent</div>
          </div>
          <hr></hr>
          <div className="row">
              <div className="col-md-3">
                  <Input
                    displayName="Last Name" 
                    name="last_name" 
                    form={this}
                  />
              </div>
              <div className="col-md-3">
                  <Input
                    displayName="First Name" 
                    name="first_name" 
                    form={this}
                  />
              </div>
              <div className="col-md-3">
                  <Input
                    displayName="Middle Name" 
                    name="middle_name" 
                    form={this}
                  />
              </div>
              <div className="col-md-3">
                  <Input
                    displayName="Social Security Number" 
                    name="social_security_number" 
                    form={this}
                  />
              </div>
          </div>
          <div className="row">
              <div className="col-md-6">
                  <Input
                    displayName="Other Names" 
                    name="other_names" 
                    form={this}
                  />
              </div>
              <div className="col-md-3">
                  <Input
                    displayName="Work Phone" 
                    name="work_phone" 
                    form={this}
                  />
              </div>
              <div className="col-md-3">
                  <Input
                    displayName="Home Phone" 
                    name="home_phone" 
                    form={this}
                  />
              </div>
          </div>
          <div className="row">
              <div className="col-md-3">
                  <Input
                    displayName="Date of Birth" 
                    name="date_of_birth" 
                    form={this}
                  />
              </div>
              <div className="col-md-6">
                  <Input
                    displayName="Email" 
                    name="email" 
                    form={this}
                  />
              </div>
              <div className="col-md-3">
                  <Input
                    displayName="Mobile Phone" 
                    name="mobile_phone" 
                    form={this}
                  />
              </div>
          </div>
          <hr></hr>
          {this.state.previous_addresses && this.state.previous_addresses.map(function (adr, i) {
              return <Address key={i} form={this} adr={adr} />;
          }.bind(this))}
          <NewAddress form={this} />
          {this.state.other_occupants && this.state.other_occupants.map(function (occupant, i) {
              return <div key={i}>
                  <div className="row">
                      <div className = "col-md-6">
                          <span className="display-label">Name </span>
                          <span className="display-value">{occupant.name}</span>
                      </div>
                  </div>
              </div>
          })}
          <div className="row">
              <div className="col-md-1">
                  <span className="display-label">Pets? </span>
                  <span className="display-value">{this.state.pet_status ? "Yes" : "No"}</span>
              </div>
              <div className="col-md-5">
                  <span className="display-label">Describe </span>
                  <span className="display-value">{this.state.pet_describe}</span>
              </div>
              <div className="col-md-1">
                  <span className="display-label">Waterbed? </span>
                  <span className="display-value">{this.state.waterbed_status? "Yes" : "No"}</span>
              </div>
              <div className="col-md-5">
                  <span className="display-label">Describe </span>
                  <span className="display-value">{this.state.waterbed_describe}</span>
              </div>
          </div>
          <div className="row">
              <div className="col-md-3">
                  <span className="display-label">Gross Income </span>
                  <span className="display-value">{this.state.current_income}</span>
              </div>
              <div className="col-md-3">
                  <span className="display-label">Per </span>
                  <span className="display-value">{this.state.current_income_per}</span>
              </div>
          </div>
          <hr></hr>
          {this.state.employers && this.state.employers.map(function (employer, i) {
              return <div key={i}>
                  <div className="row">
                      <div className="col-md-4">
                          <span className="display-label">Employer Name </span>
                          <span className="display-value">{employer.company}</span>
                      </div>
                      <div className="col-md-4">
                          <span className="display-label">Job Title or Position </span>
                          <span className="display-value">{employer.title}</span>
                      </div>
                      <div className="col-md-4">
                          <span className="display-label">Dates of Employment </span>
                          <span className="display-value">{employer.start_date} "to" {employer.end_date}</span>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-4">
                          <span className="display-label">Employer Address </span>
                          <span className="display-value">{employer.address}</span>
                      </div>
                      <div className="col-md-4">
                          <span className="display-label">City </span>
                          <span className="display-value">{employer.city}</span>
                      </div>
                      <div className="col-md-2">
                          <span className="display-label">State </span>
                          <span className="display-value">{employer.state}</span>
                      </div>
                      <div className="col-md-2">
                          <span className="display-label">Zip </span>
                          <span className="display-value">{employer.zip}</span>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-6">
                          <span className="display-label">Name of Supervisor/HR Manager </span>
                          <span className="display-value">{employer.superviser || employer.hr_manager}</span>
                      </div>
                      <div className="col-md-6">
                          <span className="display-label">Employer/Human Resources Phone Number </span>
                          <span className="display-value">{employer.hr_phone}</span>
                      </div>
                  </div>
              </div>
          })}
          <hr></hr>
          {this.state.other_incomes && this.state.other_incomes && this.state.other_incomes.map(function (income, i) {
              return <div key={i} className="row">
                  <div className="col-md-6">
                      <span className="display-label">Other Income Source </span>
                      <span className="display-value">{income.source}</span>
                  </div>
                  <div className="col-md-4">
                      <span className="display-label">Amount </span>
                      <span className="display-value">{income.amount}</span>
                  </div>
                  <div className="col-md-2">
                      <span className="display-label">Per </span>
                      <span className="display-value">{income.frequency}</span>
                  </div>
              </div>
          })}        
          {this.state.banks && this.state.banks.map(function (bank, i) {
              return <div key={i} className="row">
                  <div className="col-md-3">
                      <span className="display-label">Bank Name </span>
                      <span className="display-value">{bank.name}</span>
                  </div>
                  <div className="col-md-6">
                      <span className="display-label">Branch or Address </span>
                      <span className="display-value">{bank.address}</span>
                  </div>
                  <div className="col-md-3">
                      <span className="display-label">Account Number </span>
                      <span className="display-value">{bank.account_number}</span>
                  </div>
              </div>
          })}
          <div className="row">
              <div className="col-md-12 text-center">
                  <span className="display-label">List of all financial obligations</span>
              </div>
          </div>
          {this.state.debts && this.state.debts.map(function (debt, i) {
              return <div key={i} className="row">
                  <div className="col-md-3">
                      <span className="display-label">Name of Creditor </span>
                      <span className="display-value">{debt.creditor_name}</span>
                  </div>
                  <div className="col-md-5">
                      <span className="display-label">Address </span>
                      <span className="display-value">{debt.creditor_address}</span>
                  </div>
                  <div className="col-md-2">
                      <span className="display-label">Phone Number </span>
                      <span className="display-value">{debt.creditor_phone}</span>
                  </div>
                  <div className="col-md-2">
                      <span className="display-label">Monthly Payment </span>
                      <span className="display-value">{debt.monthly_payment}</span>
                  </div>
              </div>
          })}
          {this.state.emergencies && this.state.emergencies.map(function (emergency, i) {        
              return <div key={i} className="row">
                  <div className="col-md-3">
                      <span className="display-label">Emergency Contact </span>
                      <span className="display-value">{emergency.name}</span>
                  </div>
                  <div className="col-md-5">
                      <span className="display-label">Address </span>
                      <span className="display-value">{emergency.address}</span>
                  </div>
                  <div className="col-md-2">
                      <span className="display-label">Relationship </span>
                      <span className="display-value">{emergency.relationship}</span>
                  </div>
                  <div className="col-md-2">
                      <span className="display-label">Phone </span>
                      <span className="display-value">{emergency.phone}</span>
                  </div>
              </div>
          })}
          {this.state.references && this.state.references.map(function (reference, i) {        
              return <div key={i} className="row">
                  <div className="col-md-2">
                      <span className="display-label">Personal Ref </span>
                      <span className="display-value">{reference.name}</span>
                  </div>
                  <div className="col-md-4">
                      <span className="display-label">Address </span>
                      <span className="display-value">{reference.address}</span>
                  </div>
                  <div className="col-md-2">
                      <span className="display-label">Known </span>
                      <span className="display-value">{reference.length}</span>
                  </div>
                  <div className="col-md-2">
                      <span className="display-label">Occupation </span>
                      <span className="display-value">{reference.occupation}</span>
                  </div>
                  <div className="col-md-2">
                      <span className="display-label">Phone </span>
                      <span className="display-value">{reference.phone}</span>
                  </div>
              </div>
          })}       
          {this.state.cars && this.state.cars.map(function (car, i) {        
              return <div key={i} className="row">
                  <div className="col-md-3">
                      <span className="display-label">Automobile Make </span>
                      <span className="display-value">{car.make}</span>
                  </div>
                  <div className="col-md-5">
                      <span className="display-label">Model </span>
                      <span className="display-value">{car.model}</span>
                  </div>
                  <div className="col-md-2">
                      <span className="display-label">Year </span>
                      <span className="display-value">{car.year}</span>
                  </div>
                  <div className="col-md-2">
                      <span className="display-label">License # </span>
                      <span className="display-value">{car.license}</span>
                  </div>
              </div>
          })}        
          <div className="row">
              <div className="col-md-6">
                  <span className="display-label">Have you ever filed for bankrupcy? </span>
                  <span className="display-value">{this.state.bankruptcy ? "Yes" : "No"}</span>
              </div>
              <div className="col-md-6">
                  <span className="display-label">Have you ever been evicted or asked to move? </span>
                  <span className="display-value">{this.state.eviction ? "Yes" : "No"}</span>
              </div>
          </div>
          <div className="row">
              <div className="col-md-12">
                  <span className="display-label">Have you ever been convicted of selling, distributing, or manufacturing illegal drugs? </span>
                  <span className="display-value">{this.state.drugs ? "Yes" : "No"}</span>
              </div>
          </div>
          <hr></hr>
          <div className="row">
              <div className="col-md-12">
                  <p>
                  <span className="display-text">Applicant represents that all the above statements are true and correct, authorizes verification of the above items and agrees to furnish additional credit references upon request.  Applicant authorizes the Owner/Agent to obtain reports that may include credit reports, unlauful detainer (eviction) reports, bad check searches, social security number verification, fraud warnings, previous tenant history and employment history.  Applicant consents to allow Owner/Agent to disclose tenancy information to previous or subsequent Owners/Agents.</span>
                  </p>
                  <span className="display-text">Owner/Agent will require a payment of </span>
                  <span className="display-value">$24.00</span>
                  <span className="display-text">, which is to be used to screen Applicant.</span>
                  <p></p>
                  <span className="display-text">The amount charged is itemized as follows:</span>
                  <ol>
                      <li>
                      <span className="display-text">Actual cost of credit report, unlawful detainer (eviction) search, and/or other screening reports </span>
                      <span className="display-value">$22.00</span></li>
                      <li>
                      <span className="display-text">Cost to obtain, process and verify screening information (may include staff time and other soft costs) </span>
                      <span className="display-value">$2.00</span></li>
                      <li>
                      <span className="display-text">Total fee charged </span>
                      <span className="display-value">$24.00</span></li>
                  </ol>
              </div>
          </div>
          <button onClick={this._sendSave}>Save Changes</button>
      </div>
    );
  }
});
