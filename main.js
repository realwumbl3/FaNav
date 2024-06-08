const BTTN_CLASS = ".button.standard"

function findButtons() {
    return Object.fromEntries([...document.querySelectorAll(BTTN_CLASS)].map(button => [button.innerText, button]))
}

function clickOneOf(buttons, ...buttonnames) {
    for (const buttonname of buttonnames) {
        const button = buttons[buttonname]
        if (button) {
            button.click()
            return true
        }
    }
    return false
}

document.body.addEventListener("keyup", _ => {
    if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") return
    switch (_.code) {
        case "KeyJ":
            clickOneOf(findButtons(), "Back", "Prev", "Prev. 24", "Prev. 48", "Prev. 72");
            break;
        case "KeyK":
            clickOneOf(findButtons(), "Next", "Next 24", "Next 48", "Next 72");
            break;
        case "KeyD":
        case "KeyN":
            clickOneOf(findButtons(), "-Fav");
            break;
        case "KeyF":
        case "KeyM":
            clickOneOf(findButtons(), "+Fav");
            break;
    }
})

const gallery = document.querySelector(".gallery-section")
let runningTimeout = null
for (const img of document.querySelectorAll(".gallery-section img")) img.addEventListener("load", () => {
    runningTimeout && clearTimeout(runningTimeout)
    runningTimeout = setTimeout(() => {
        console.log("reflow")
        gallery.replaceWith(gallery)
    }, 100)
}, { once: true })

console.log("FaNav loaded")