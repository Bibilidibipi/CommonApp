class Application < ActiveRecord::Base
    has_many :previous_addresses, dependent: :destroy
    has_many :employers, dependent: :destroy
    has_many :banks, dependent: :destroy
    has_many :debts, dependent: :destroy
    has_many :emergencies, dependent: :destroy
    has_many :references, dependent: :destroy
    has_many :cars, dependent: :destroy
end
