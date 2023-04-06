
document.addEventListener('DOMContentLoaded', () => {

    const dialogBox = document.getElementById('dialog-box');
    const query = { active: true, currentWindow: true };

    chrome.tabs.query(query, (tabs) => {
        dialogBox.innerHTML = getBarkedTitle(tabs[0].title);
    });
});

/**
 * Concatenates the tab title with Acho's barks.
 * @param {String} tabTitle Current tab title
 */
const getBarkedTitle = (tabTitle) => {
    const barkTitle = `We are at: ${tabTitle}`
    return barkTitle;
}
