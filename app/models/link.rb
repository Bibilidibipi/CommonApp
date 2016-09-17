class Link < ActiveRecord::Base
  belongs_to :application
  default_scope -> { order('created_at DESC') }
  validates :uuid, length: { is: 36 }, uniqueness: true
  validates :application, presence: true

  before_validation :assign_default_uuid

  private

  def assign_default_uuid
    self.uuid ||= SecureRandom.uuid
  end
end
