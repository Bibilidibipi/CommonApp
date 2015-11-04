class Api::ApplicationsController < ApiController
  before_action :require_logged_in!

  def index
    @application = current_user.application
  end

  def create
    @application = current_user.application.new(application_params)
  end

  def update
    @application = current_user.application
    @errors = []
    Application.transaction do
      if !@application.update(application_params)
        @errors += @application.errors
        raise 'application params not good'
      end
      params[:application][:previous_addresses].each do |address|
        address = address[1]
        adr = nil
        adr = PreviousAddress.find(address[:id]) if address[:id].to_i > 0
        if adr
          if !adr.update(address.permit(:city))
            @errors += adr.errors.full_messages
            raise 'address params not good'
          end
        else
          address[:application_id] = @application.id
          adr = PreviousAddress.new(address.permit(:application_id, :city))
          if !adr.save
            @errors += adr.errors.full_messages
            raise 'new address params not good'
          end
        end
      end
    end

    if !@errors.empty?
      render json: @errors, status: 422
    else
      render :index
    end
  end

  def destroy
    @application = current_user.application
    if @application.destroy
      render json: @application
    else
      render json: @application.errors.full_messages
    end
  end

  private

  def application_params
    params.require(:application).permit(
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
