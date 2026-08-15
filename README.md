The release description could serve as a README, but I’d make the README more permanent. The README should explain **what this project is**, while GitHub Releases document what changed at each milestone.

I’d use something like this now:

# ALICE

> **Something is waiting at the terminal.**

ALICE is an experimental text adventure inspired by the early era of personal computing and interactive fiction.

The game runs entirely in the browser and presents itself as an old CRT computer terminal. There are no conventional menus, buttons, maps, or graphical controls. The terminal is the interface, and the player discovers both the world and how to interact with it by typing.

ALICE is being built incrementally, with each milestone preserved as a playable version.

## Play

The current stable version can be played at:

**[https://ccourson.github.io/alice-game/](https://ccourson.github.io/alice-game/)**

Click the terminal and begin typing.

There is intentionally very little instruction.

## Current Version

**v0.1 — Terminal**

The first milestone establishes the environment in which the game will exist:

* CRT-inspired full-screen terminal
* Green phosphor display
* Subtle scanlines and screen glow
* Animated system boot sequence
* Keyboard command input
* Command history
* Basic command processing
* Initial environmental description
* Unknown-command handling

At this stage, the world is intentionally very small.

Try:

```text
LOOK
```

```text
HELLO
```

and:

```text
WHO ARE YOU?
```

## Development Philosophy

ALICE is being developed one playable discovery at a time.

Rather than building a large game engine first and filling it with content later, each milestone introduces one small capability that changes what the player can experience.

The development sequence begins simply:

```text
terminal
    ↓
player input
    ↓
responses
    ↓
events
    ↓
world
    ↓
???
```

Each significant milestone will be preserved as a playable release.

The project intentionally favors simple, understandable technology over a large framework.

## Technology

The initial game uses only:

* HTML
* CSS
* JavaScript
* GitHub Pages

There is currently no application server, database, game framework, or build system.

The browser is the runtime.

## Repository Structure

```text
alice-game/
├── index.html
├── style.css
└── game.js
```

As the game grows, additional components will be introduced only when the game actually needs them.

## Branches

Development follows three primary branches:

```text
dev
 │
 │ active development
 ▼
staging
 │
 │ milestone testing
 ▼
main
 │
 │ stable playable version
 ▼
release tag
```

`main` represents the current stable playable version published through GitHub Pages.

Release tags preserve significant milestones in the game's development.

## Releases

The intention is for the release history itself to tell part of the story of ALICE's construction.

```text
v0.1  The terminal exists.
v0.2  The terminal notices you.
v0.3  ...
```

## v0.1

The terminal is running.

It accepts commands.

It knows almost nothing.

For now.

```text
SYSTEM/12

48K MEMORY ........ OK
TERMINAL .......... OK
STORAGE ........... OK

DATE .............. ??/??/????
TIME .............. ??:??

RESTORING SESSION...

READY.

> _
```
