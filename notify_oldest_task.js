/*
This program will be ran from the ios shortcut 'Show TODO Notifications': https://www.icloud.com/shortcuts/0585f3fbb8964ef3966ae4fb8b69fe5a
This file has to be in the Scriptable app from ios and named 'notify_oldest_task'
This file reads and writes to JSON files inside the directory 'iCloud Drive/Scriptable/TODO'
The JSON files inside this directory are called: 'completed.json' and 'unfinished.json'
Make sure to run the 'TODO' shortcut before running this because 'TODO' will create the files needed if they do not exist already
Make sure that shortcuts and Scriptable have proper access to you files in your iPhone
*/

// GLOBAL CONSTANTS
const FM = FileManager.iCloud();

// Notification function
function sendNotification(title, body) {
  let notification = new Notification();
  notification.title = title;
  notification.body = body;
  notification.schedule();
}

function jsonToObject(filename) {
  // Reads a JSON and returns a JS object
  let filepath = FM.joinPath(FM.documentsDirectory(), "TODO/" + filename);
  let jsonContent = FM.readString(filepath);
  return JSON.parse(jsonContent);
}

function objectToJson(data, filename) {
  // JS Object to JSON file
  let updatedJsonString = JSON.stringify(data, null, 2);
  let filepath = FM.joinPath(FM.documentsDirectory(), "TODO/" + filename);
  FM.writeString(filepath, updatedJsonString);
}

function findOldestTask(obj) {
  // Finds the oldest task in an object
  let maxKey = null;
  let maxValue = -Infinity;

  for (let key in obj) {
    if (
      obj.hasOwnProperty(key) &&
      typeof obj[key] === "number" &&
      obj[key] > maxValue
    ) {
      maxValue = obj[key];
      maxKey = key;
    }
  }
  return maxKey;
}

function main() {
  // Get shortcut arguement and read from JSON
  let randomTask = args.shortcutParameter.toString(); // The random task is chosen randomly from the shortcut 'Show TODO Notifications' and passed as an arguement when running this file
  let tasksObj = jsonToObject("unfinished.json");

  // Add age to all tasks
  for (var task of Object.keys(tasksObj)) {
    tasksObj[task]++;
  }

  // Get the oldest task
  let oldestTask = findOldestTask(tasksObj);

  // Sends Notifications
  sendNotification("Random task", randomTask);
  sendNotification("Oldest task", oldestTask);

  // Update JSON files and complete script
  objectToJson(tasksObj, "unfinished.json");
  Script.complete();
}

main();
