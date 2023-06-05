/*
This program gets ran from the ios shortcut 'TODO': https://www.icloud.com/shortcuts/2dda3958972847179673efd2408a62bb
This file has to be in the Scriptable app from ios and named 'TODO'
This file reads and writes to JSON files inside the directory 'iCloud Drive/Scriptable/TODO'
The JSON files inside this directory are called: 'completed.json' and 'unfinished.json'
Make sure that shortcuts and Scriptable have proper access to you files in your iPhone
*/

// GLOBAL CONSTANTS
const FM = FileManager.iCloud();

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

function createEmptyJsonFiles() {
  // Create TODO folder and empty JSON files if they don't exist
  let folderPath = FM.joinPath(FM.documentsDirectory(), "TODO");
  let unfinishedPath = FM.joinPath(folderPath, "unfinished.json");
  let completedPath = FM.joinPath(folderPath, "completed.json");

  if (!FM.fileExists(folderPath)) {
    FM.createDirectory(folderPath);
  }

  if (!FM.fileExists(unfinishedPath)) {
    FM.writeString(unfinishedPath, "{}");
  }

  if (!FM.fileExists(completedPath)) {
    FM.writeString(completedPath, "{}");
  }
}

function handleInput() {
  // * Check for table input and handle it

  // get initial inputs, type of action and selected task
  let inResult = args.shortcutParameter.toString();
  let selectedTask = args.plainTexts[0].toString();

  // Read JS Objects from files
  let tasksObject = jsonToObject("unfinished.json");
  let doneTasksObject = jsonToObject("completed.json");

  // Handle input
  if (inResult == "Add task") {
    // * Add a new task
    // Add new task to the task object and initialize age to 0
    tasksObject[selectedTask] = 0;
  } else if (inResult == "Completed a task") {
    // * Completed a task
    // Delete the completed task
    delete tasksObject[selectedTask];
    if (doneTasksObject.hasOwnProperty(selectedTask)) {
      doneTasksObject[selectedTask] += 1;
    } else {
      doneTasksObject[selectedTask] = 1;
    }
  } else if (inResult == "Remove completed") {
    // * Remove a completed task
    delete doneTasksObject[selectedTask];
  } else if (inResult == "Reset task") {
    // * Reset a task: Complete and readd same task
    tasksObject[selectedTask] = 0;
    if (doneTasksObject.hasOwnProperty(selectedTask)) {
      doneTasksObject[selectedTask] += 1;
    } else {
      doneTasksObject[selectedTask] = 1;
    }
  }

  // Update files with newly updated JS Objects
  objectToJson(tasksObject, "unfinished.json");
  objectToJson(doneTasksObject, "completed.json");
}

function main() {
  // Check and create directories if they don't exist
  createEmptyJsonFiles();

  // Handle input
  handleInput();

  // Complete script
  Script.complete();
}
main();
