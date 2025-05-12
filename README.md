# Task Time Adder Chrome Extension

## Overview

Task Time Adder is a Chrome extension that helps you manage tasks with time tracking. Add tasks with durations, reorder them via drag-and-drop, and watch as the top task's time counts down automatically. The extension continues tracking time even when closed.

## Features

✅ **Task Management**  
- Add tasks with descriptions and time durations (in minutes)  
- Delete tasks individually  
- Drag-and-drop reordering of tasks  

⏱️ **Time Tracking**  
- Automatic countdown for the top task (decreases every minute)  
- Background tracking - works even when extension is closed  
- Completed tasks automatically removed  

⌨️ **User-Friendly Interface**  
- Clean, responsive popup design  
- Keyboard support (press Enter to add tasks)  
- Visual feedback for drag-and-drop operations  

## Installation

1. Download the extension files
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right corner)
4. Click "Load unpacked" and select the extension folder

## How to Use

1. Click the extension icon to open the popup
2. Add tasks:
   - Enter task description in "Task" field
   - Enter duration in minutes in "Time" field
   - Click "Add Task" or press Enter
3. Reorder tasks by dragging and dropping
4. Delete tasks by clicking the "×" button
5. The top task will automatically count down each minute

## Technical Details

- **Storage**: Uses Chrome's `chrome.storage.local` to persist tasks
- **Background Processing**: Uses Chrome Alarms API for time tracking
- **Drag-and-Drop**: Custom implementation with HTML5 Drag and Drop API
