# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160916054258) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "applications", force: :cascade do |t|
    t.string   "last_name"
    t.string   "first_name"
    t.string   "middle_name"
    t.string   "ssn"
    t.string   "other_names"
    t.date     "dob"
    t.string   "email"
    t.string   "home_phone"
    t.string   "cell_phone"
    t.string   "id_type"
    t.string   "id_number"
    t.string   "id_issuer"
    t.string   "id_exp_date"
    t.string   "id_other"
    t.integer  "current_rent"
    t.boolean  "pet_status"
    t.string   "pet_describe"
    t.boolean  "waterbed_status"
    t.string   "waterbed_describe"
    t.integer  "current_income"
    t.string   "current_income_per"
    t.string   "other_cars"
    t.boolean  "bankruptcy"
    t.boolean  "eviction"
    t.boolean  "drugs"
    t.string   "rental_address"
    t.integer  "rent_amount"
    t.string   "rent_per"
    t.integer  "deposit_amount"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.integer  "user_id"
    t.string   "other_occupants",                 array: true
  end

  add_index "applications", ["user_id"], name: "index_applications_on_user_id", unique: true, using: :btree

  create_table "banks", force: :cascade do |t|
    t.string   "name"
    t.string   "address"
    t.string   "account_number"
    t.integer  "application_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "cars", force: :cascade do |t|
    t.string   "make"
    t.string   "model"
    t.integer  "year"
    t.string   "license"
    t.integer  "application_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "debts", force: :cascade do |t|
    t.string   "creditor_name"
    t.string   "creditor_address"
    t.string   "creditor_phone"
    t.integer  "monthly_payment"
    t.integer  "application_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "emergencies", force: :cascade do |t|
    t.string   "name"
    t.string   "address"
    t.string   "relationship"
    t.string   "phone"
    t.integer  "application_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "employers", force: :cascade do |t|
    t.string   "company"
    t.string   "title"
    t.date     "start_date"
    t.date     "end_date"
    t.string   "address"
    t.string   "city"
    t.string   "state"
    t.string   "zip"
    t.string   "supervisor"
    t.string   "hr_manager"
    t.string   "hr_phone"
    t.integer  "application_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "links", force: :cascade do |t|
    t.string   "uuid",           null: false
    t.integer  "application_id", null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "links", ["application_id"], name: "index_links_on_application_id", using: :btree
  add_index "links", ["uuid"], name: "index_links_on_uuid", using: :btree

  create_table "other_incomes", force: :cascade do |t|
    t.string   "source",         null: false
    t.integer  "amount",         null: false
    t.string   "frequency",      null: false
    t.integer  "application_id", null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "previous_addresses", force: :cascade do |t|
    t.string   "street_address"
    t.string   "city"
    t.string   "state"
    t.string   "zip"
    t.date     "date_in"
    t.date     "date_out"
    t.string   "agent_name"
    t.string   "agent_phone"
    t.string   "move_out_reason"
    t.integer  "application_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "references", force: :cascade do |t|
    t.string   "name"
    t.string   "address"
    t.string   "length"
    t.string   "occupation"
    t.string   "phone"
    t.integer  "application_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

  add_foreign_key "links", "applications"
end
