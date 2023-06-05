# ios-todo
I've never found a good way to do to-do lists on my phone, so I made my own to fit the way I personally would want to manage simple tasks and be reminded

This program is meant to be used to quickly add a task you wish to do later with ease. It is not meant for important tasks and it is by no means a calendar or a scheduling program

I use this frequently for small tasks like: "Get back to __ about __", "Write a birthday note for __", "Clean my drawer", small tasks like that. For some people, a reminder program is not necessary to carry out tasks like these, however as someone with ADHD, this has been tremendously helpful and I hope that it can help others too

This program is meant to be used in ios shortcuts with help with the [Scriptable app](https://apps.apple.com/ca/app/scriptable/id1405459188)

**Contents:** This repository contains 2 programs, each consisting of 1 Shortcut and 1 Scriptable. The shortcuts are linked below and the code for the Scriptable files are in the two other files in the repository. The 2 programs are:

## 1. Main program
**[Shortcut 'TODO':](https://www.icloud.com/shortcuts/2dda3958972847179673efd2408a62bb)**  When run, this shortcut will give you 7 options:
### Add new task
- You are prompted to enter the name of a task you want to add to your todo list, when entered, the task will be added to your list of unfinished tasks with an age of 0
### Completed task
- You are presented with your list of unfinished tasks, you are able to tap on the task you have completed. The completed task will be removed from you list of unfinished tasks and will be added to your list of completed tasks
### Reset task
- It has the same function of the Completed task, but it will readd the task back to your list of unfinished tasks for tasks that you complete, but want to be reminded of to complete again in the future again. The task's age resets to 0
### View unfinished tasks
- Shows the list of your unfinished tasks
### View completed tasks
- Shows the list of your completed tasks
### Remove a completed task
- Shows you your list of completed tasks and removes the task you select from the list. It will ask you for confirmation first
### Cancel
- Does nothing, cancels the action

## 2. Reminder Program
**[Shortcut 'TODO Reminder':](https://www.icloud.com/shortcuts/7017eb93d3604b88a46f0f581dccdb24)**  When run, this shortcut will do 3 things:
### Update the age of all unfinished tasks:
- All tasks will age by 1
### Random task reminder
- Sends a notification, reminding you to do a randomly chosen task from your list of unfinished tasks
### Oldest task reminder
- It will remind you of the oldest task in your list of unfinished tasks, to let you know which tasks you have procrastinated on the most

The Reminder Program works best when running it from a personal automation in the shortcuts app. This way, every day at a specific time, this program will run automatically, notifying you of your tasks.

## Set up Main Program
- Download the Shortcuts and [Scriptable](https://apps.apple.com/ca/app/scriptable/id1405459188) apps on your iPhone. Give them both access to notifications and file management
- Add the 'TODO' Shortcut from [this link](https://www.icloud.com/shortcuts/2dda3958972847179673efd2408a62bb)
- Add the code from TODO.js in a Scriptable file and name it 'TODO'
- (Optional) You can add the 'TODO' shortcut to a widget and run it directly from your home screen or lock screen

## Set up Reminder Program
- Run the 'TODO' shortcut first, as it sets up the directories to be created
- Add the 'TODO Reminder' Shortcut from [this link](https://www.icloud.com/shortcuts/7017eb93d3604b88a46f0f581dccdb24)
- Add the code from notify_oldest_task.js in a Scriptable file and name it 'notify_oldest_task'
- To schedule this program to be run automatically (as of ios 16), you can go in your shortcuts app > Automation > + (Plus sign) > Create Personal Automation > Time of Day > (set your desired time) > Next > Add Action > (search) 'Run Shortcut' > Run Shortcut > (set shortcut to) 'TODO Reminder' > Next > (Unselect) 'Ask Before Running' > Don't Ask > Done.
