chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.create('decreaseTaskTime', { periodInMinutes: 1 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'decreaseTaskTime') {
        chrome.storage.local.get({ tasks: [] }, (data) => {
            let tasks = data.tasks;

            if (tasks.length > 0) {
                tasks[0].time -= 1;
                if (tasks[0].time <= 0) {
                    tasks.shift(); // remove completed task
                }

                chrome.storage.local.set({ tasks });
            }
        });
    }
});
