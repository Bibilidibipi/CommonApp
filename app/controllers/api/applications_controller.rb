class Api::ApplicationsController < ApiController
  before_action :require_logged_in!

  def index
    @application = current_user.application ||
      Application.create!(user: current_user)
  end

  def update #move to command
    @application = current_user.application
    if @application.update(application_params)
      ['previous_addresses',
      'employers',
      'other_incomes',
      'banks',
      'debts',
      'emergencies',
      'references',
      'cars'].each do |app_element|
        ActiveRecord::Base.transaction do
          @application.send(app_element).delete_all
          JSON.parse(params[:application])[app_element].each do |elem|
            @application.send(app_element).create!(elem)
          end
        end
      end
      render :index
    else
      render json: @application.errors.full_messages, status: 422
    end
  end

  def destroy
    @application = current_user.application
    if @application.destroy
      render json: @application
    else
      render json: @application.errors.full_messages, status: 422
    end
  end

  private

  def application_params
    ActionController::Parameters.new(JSON.parse(params[:application])).permit(
      :last_name,
      :first_name,
      :middle_name,
      :ssn,
      :other_names,
      :dob,
      :email,
      :home_phone,
      :cell_phone,
      :id_type,
      :id_number,
      :id_issuer,
      :id_exp_date,
      :id_other,
      :current_rent,
      :other_occupants,
      :pet_status,
      :pet_describe,
      :waterbed_status,
      :waterbed_describe,
      :current_income,
      :current_income_per,
      :other_cars,
      :bankruptcy,
      :eviction,
      :drugs      
    )
  end
end
