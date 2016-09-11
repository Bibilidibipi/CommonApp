class Api::CarsController < ApiController
  def create

  end

  def show
    @car = Car.find(params[:id])
  end

  def destroy

  end
end
