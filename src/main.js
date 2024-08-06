import { html, css } from "./zyX-es6.js";

const BTTN_CLASS = ".button.standard";

function findButtons() {
	return Object.fromEntries(
		[...document.querySelectorAll(BTTN_CLASS)].map((button) => [button.innerText, button])
	);
}

function clickOneOf(buttons, ...buttonnames) {
	for (const buttonname of buttonnames) {
		const button = buttons[buttonname];
		if (button) {
			button.click();
			return true;
		}
	}
	return false;
}

document.body.addEventListener("keyup", (_) => {
	if (
		document.activeElement.tagName === "INPUT" ||
		document.activeElement.tagName === "TEXTAREA"
	)
		return;
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
});

const gallery = document.querySelector(".gallery-section");
function reflowGallery() {
	gallery.replaceWith(gallery);
}
let runningTimeout = null;
for (const img of document.querySelectorAll(".gallery-section img"))
	img.addEventListener(
		"load",
		() => {
			runningTimeout && clearTimeout(runningTimeout);
			runningTimeout = setTimeout(() => {
				console.log("reflow");
				reflowGallery();
			}, 100);
		},
		{ once: true }
	);

let reflows = 5;
setInterval(() => {
	if (reflows-- > 0) reflowGallery();
}, 500);

function getFigureMeta(figure) {
	const figcaption = figure.querySelector("figcaption");
	const user = figcaption.querySelector('[href^="/user/"]').innerText;
	const title = figcaption.querySelector('[href^="/view/"]').innerText;
	return {
		user,
		title,
	};
}

import { USER_NOTES } from "../mydata.js";

/*
rename mydata_template.js to mydata.js and fill it with your data, example:
export const USER_NOTES = {
	"user-name": {	
		excluded: true,
		note: "ban evasion?",
	}
}
*/

console.log("FaNav loaded", { USER_NOTES });

function scanFigures() {
	const figures = document.querySelectorAll(".gallery-section figure");
	for (const figure of figures) {
		const { user, title } = getFigureMeta(figure);
		const userLower = user.toLowerCase();
		if (USER_NOTES[userLower]?.excluded) {
			hidePost(figure, USER_NOTES[userLower]);
		}
	}
}

function hidePost(figure, { note }) {
	figure.classList.add("fa-nav-hidden");
}

scanFigures();

css`
	.fa-nav-hidden {
		& img {
			filter: blur(30px);
		}
	}
`;
