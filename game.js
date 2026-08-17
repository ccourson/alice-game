const output = document.getElementById("output");
const commandLine = document.getElementById("command-line");
const commandInput = document.getElementById("command");
const screen = document.getElementById("screen");

let aliceTimer = null;
let aliceHasSpoken = false;

let gameState = {
    waitingForPresence: false
};

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

function resetAliceTimer() {
    clearTimeout(aliceTimer);

    if (aliceHasSpoken) {
        return;
    }

    aliceTimer = setTimeout(() => {
        aliceSpeaks();
    }, 10000);
}

async function aliceSpeaks() {
    if (aliceHasSpoken) {
        return;
    }

    aliceHasSpoken = true;
    gameState.waitingForPresence = true;

    clearTimeout(aliceTimer);

    // Discard anything the player was typing.
    commandInput.value = "";

    hidePrompt();

    print();
    await typeText("ARE YOU THERE?", 30);
    print();

    showPrompt();
}

async function processCommand(rawCommand) {
    const command = rawCommand.trim();

    print(`> ${command}`);
    print();

    // Blank Enter triggers Alice immediately.
    if (!command) {
        await aliceSpeaks();
        return;
    }

    // Alice is waiting for an answer.
    if (
        gameState.waitingForPresence &&
        command.toUpperCase() === "YES"
    ) {
        gameState.waitingForPresence = false;
    
        await typeText("GOOD.", 30);
        print();
        print();
    
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
    if (event.key === "Enter") {
        clearTimeout(aliceTimer);

        const command = commandInput.value;
        commandInput.value = "";

        hidePrompt();

        await processCommand(command);

        showPrompt();
        resetAliceTimer();

        return;
    }

    // Any typing postpones Alice.
    resetAliceTimer();
});

document.addEventListener("click", () => {
    commandInput.focus();
});

async function start() {
    await sleep(700);

    await typeText(bootText, 14);

    print();

    showPrompt();
    resetAliceTimer();
}

start();
