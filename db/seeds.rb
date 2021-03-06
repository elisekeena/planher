# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Two users,
# first one is completely empty
# second one add event and expenses
require 'date'

# DateTime.new(2001,2,3,4,5,6)

puts 'Creating Users...'

elise = User.create(first_name: 'Elise', last_name: 'Nguyen', password: 'elise123', username: 'elisegs')
enya = User.create(first_name: 'Enya', last_name: 'Sadsad', password: 'enya123', username: 'enyags')

puts 'Creating my events...'

grad = MyEvent.create(title: 'Graduation', start:"2022-07-15T14:00:00", end:"2022-07-15T16:00:00", all_day: false, user_id: elise.id)
backpack = MyEvent.create(title: 'Backpacking Trip', start:"2022-07-30", all_day: true, user_id: elise.id)
concert = MyEvent.create(title: 'Imagine Dragons Concert', start:"2022-08-15", all_day: true, user_id: elise.id)
interview = MyEvent.create(title: 'Job Interview', start:"2022-08-09T10:00:00", end:"2022-08-15T12:00:00", all_day: false, user_id: elise.id)

puts 'Creating my to do lists...'

paytuition = ToDoList.create(task: 'Pay Tuition Fee', note: '', status: 'todo', user_id: elise.id)
appointment = ToDoList.create(task: ' Make Dental Appointment', note: 'at 303-456-7898 by 2pm', status: 'complete',
                              user_id: elise.id)
project = ToDoList.create(task: 'Finish Final Project', note: 'get it done by 6pm', status: 'todo',
                          user_id: elise.id)
webiste = ToDoList.create(task: 'Finish Website', note: 'get it done by 7pm today', status: 'todo',
                          user_id: elise.id)

puts 'Creating my expenses...'

bills = MyExpense.create(category: 'Bills', amount: 300, date: Date.new(2022, 7, 15), user_id: elise.id)
food = MyExpense.create(category: 'Food', amount: 250, date: Date.new(2022, 7, 31), user_id: elise.id)
entertainment = MyExpense.create(category: 'Movies', amount: 30, date: Date.new(2022, 7, 3), user_id: elise.id)

puts 'Creating userMyevents...'

UserMyEvent.create(user_id: elise.id, my_event_id: grad.id)

puts 'Creating expense categories...'

ExpenseCategory.create(name: 'Food')
ExpenseCategory.create(name: 'Entertainment')
ExpenseCategory.create(name: 'Utilities')
# ExpenseCategory.create(name: "Travel")
# ExpenseCategory.create(name: "School")

puts 'seeding done! '
