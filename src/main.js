import { html, css } from "./zyX-es6.js";

const BTTN_CLASS = ".button.standard";

function findButtons() {
	return [...document.querySelectorAll(BTTN_CLASS)].map((button) => [button.innerText, button]);
}

function clickOneOf(...buttonnames) {
	console.log("click one of", buttonnames);
	const buttons = findButtons();
	const regexes = buttonnames.map(name => new RegExp(name, "i"));
	console.log("clickOneOf", regexes, buttons);
	for (const [buttontext, button] of buttons) {
		if (regexes.some(regex => regex.test(buttontext))) {
			button.click();
			return true;
		}
	}
	return false;
}

document.body.addEventListener("keyup", (event) => {
	if (
		document.activeElement.tagName === "INPUT" ||
		document.activeElement.tagName === "TEXTAREA"
	)
		return;
	switch (event.code) {
		case "KeyJ":
			clickOneOf(`Back`, `Prev`);
			break;
		case "KeyK":
			clickOneOf(`Next`);
			break;
		case "KeyD":
		case "KeyN":
			clickOneOf(`-\\s*Fav`); // Example: for matching "- Fav"
			break;
		case "KeyF":
		case "KeyM":
			clickOneOf(`\\+\\s*Fav`); // Example: for matching "+ Fav"
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
