# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# Two users,
# first one is completely empty 
#second one add event and expenses
require 'date'

# DateTime.new(2001,2,3,4,5,6)

puts "Creating Users..."

elise = User.create(first_name: 'Elise', last_name: 'Nguyen', password: 'elise123', username: 'elisegs')
enya = User.create(first_name: 'Enya', last_name: "Sadsad", password: 'enya123', username: 'enyags')


puts "Creating my events..."

grad = MyEvent.create(name: "Graduation", datetime:DateTime.new(2022, 7, 15,  14,  0,  0), location: "Denver, CO", user_id: elise.id)
backpack = MyEvent.create(name: "Backpacking Trip", datetime:DateTime.new(2022, 7, 31,  10,  0,  0), location: "Bailey, CO", user_id: elise.id)
concert = MyEvent.create(name: "Imagine Dragons Concert", datetime:DateTime.new(2022, 9, 5, 19, 0, 0), location: "Commerce City, CO")
interview = MyEvent.create(name: "Job Interview", datetime:DateTime.new(2022, 8, 8, 10, 0, 0), location: "Denver,CO", user_id: elise.id)


puts "Creating my to do lists..."

paytuition = ToDoList.create(task: "Pay Tuition Fee", status: "not done", user_id: elise.id)
appointment = ToDoList.create(task: " Make Dental Appointment", status: "done", user_id: elise.id)
project = ToDoList.create(task: "Finish Final Project", status: "in progress", user_id: elise.id)
webiste = ToDoList.create(task: "Finish Webiste", status: "in progress", user_id: elise.id)

puts "Creating my expenses..."

bills = MyExpense.create(category: "Bills", amount: 300, date:Date.new(2022, 7, 15), user_id: elise.id)
food = MyExpense.create(category: "Food", amount: 250, date:Date.new(2022, 7, 31), user_id: elise.id)
entertainment = MyExpense.create(category: "Movies", amount: 30, date:Date.new(2022, 7, 3), user_id: elise.id)


puts "Creating userMyevents..."

UserMyEvent.create(user_id: elise.id, my_event_id: grad.id)

puts "Creating expense categories..."

ExpenseCategory.create(name: "Food")
ExpenseCategory.create(name: "Entertainment")
ExpenseCategory.create(name: "Utilities")
# ExpenseCategory.create(name: "Travel")
# ExpenseCategory.create(name: "School")


puts "seeding done! "