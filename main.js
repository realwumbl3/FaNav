(async () => {
    document.addEventListener("DOMContentLoaded", async () => {
        await import(chrome.runtime.getURL('./src/main.js'))
    })
})()