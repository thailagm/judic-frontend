chrome.commands.onCommand.addListener(async (command) => {
    switch (command) {
        case 'bark':
            await barkTitle();
            break;
        default:
            console.log(`Command ${command} not found`);
    }
});

function barkTitle() {
    const query = { active: true, currentWindow: true };
    chrome.tabs.query(query, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
            tabTitle: tabs[0].title
        });
    });
}