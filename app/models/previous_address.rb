class PreviousAddress < ActiveRecord::Base
  belongs_to :application

  def self.update_or_create(params)
    if params['id'] < 0
      address = new(ActionController::Parameters.new(params).permit(
        :application_id,
        :street_address,
        :city,
        :state,
        :zip,
        :date_in,
        :date_out,
        :agent_name,
        :agent_phone,
        :move_out_reason
      ))
      address.save
    else
      address = find(params['id'])
      address.update(ActionController::Parameters.new(params).permit(
        :street_address,
        :city,
        :state,
        :zip,
        :date_in,
        :date_out,
        :agent_name,
        :agent_phone,
        :move_out_reason
      ))
    end
  end
end
