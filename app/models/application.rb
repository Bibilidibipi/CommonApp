class Application < ActiveRecord::Base
  has_many :previous_addresses, dependent: :destroy
  has_many :employers, dependent: :destroy
  has_many :banks, dependent: :destroy
  has_many :debts, dependent: :destroy
  has_many :emergencies, dependent: :destroy
  has_many :references, dependent: :destroy
  has_many :cars, dependent: :destroy
  has_many :other_incomes, dependent: :destroy
  belongs_to :user

  def update_all(options)
    Application.transaction do
      raise 'bad application' unless update(options[:application])
      (previous_addresses.map { |a| a.id } -
      options[:previous_addresses].map { |a| a['id'] }).each do |id|
        PreviousAddress.destroy(id)
      end      
      options[:previous_addresses].each do |params|
        params[:application_id] = id
        raise 'bad address' unless PreviousAddress.update_or_create(params)
      end
    end
    
    self
  rescue => e
    p e
    false
  end
end
