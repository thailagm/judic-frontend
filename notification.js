// Notification body.
const notification = document.createElement("div");
notification.className = 'acho-notification';

// Notification text.
const notificationText = document.createElement('p');
notification.appendChild(notificationText);

// Add to current page.
document.body.appendChild(notification);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    const notification = document.getElementsByClassName('acho-notification')[0];
    const notificationText = notification.getElementsByTagName('p')[0];

    notificationText.innerHTML = "significado";

    notification.style.display = 'flex';

    setTimeout(function () {

        notification.style.display = 'none';
    }, 5000);

    return true;
});