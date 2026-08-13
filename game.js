const output = document.getElementById("output");
const commandLine = document.getElementById("command-line");
const commandInput = document.getElementById("command");
const screen = document.getElementById("screen");

const bootText = `
SYSTEM/12

48K MEMORY ........ OK
TERMINAL .......... OK
STORAGE ........... OK

DATE .............. ??/??/????
TIME .............. ??:??

RESTORING SESSION...

READY.
`;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeText(text, speed = 18) {
    for (const char of text) {
        output.textContent += char;

        screen.scrollTop = screen.scrollHeight;

        if (char === "\n") {
            await sleep(speed * 2);
        } else {
            await sleep(speed);
        }
    }
}

function print(text = "") {
    output.textContent += text + "\n";
    screen.scrollTop = screen.scrollHeight;
}

function showPrompt() {
    commandLine.classList.remove("hidden");
    commandInput.focus();
}

function hidePrompt() {
    commandLine.classList.add("hidden");
}

async function processCommand(rawCommand) {
    const command = rawCommand.trim();

    print(`> ${command}`);
    print();

    if (!command) {
        return;
    }

    switch (command.toUpperCase()) {

        case "LOOK":
            print("YOU ARE SITTING AT A DESK.");
            print();
            print("THE ROOM IS DARK EXCEPT FOR THE TERMINAL.");
            print();
            print("THERE IS A DRAWER IN THE DESK.");
            print();
            print("A CLOSED DOOR IS TO THE EAST.");
            break;

        case "HELLO":
        case "HI":
            print("HELLO.");
            break;

        case "WHO ARE YOU":
        case "WHO ARE YOU?":
            print("I DON'T KNOW.");
            break;

        default:
            print("I DON'T UNDERSTAND.");
    }

    print();
}

commandInput.addEventListener("keydown", async event => {
    if (event.key !== "Enter") {
        return;
    }

    const command = commandInput.value;
    commandInput.value = "";

    hidePrompt();

    await processCommand(command);

    showPrompt();
});

document.addEventListener("click", () => {
    commandInput.focus();
});

async function start() {
    await sleep(700);

    await typeText(bootText, 14);

    print();

    showPrompt();
}

start();
