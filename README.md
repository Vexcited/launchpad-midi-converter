# Installation

**CDN** <br />
The easiest way is to link the launchpad-midi-converter library from the jsDelivr CDN. To retrieve the latest version, just add this to your HTML page:

```html
<script src="https://cdn.jsdelivr.net/npm/launchpad-midi-converter"></script>
```

If you want to target a specific version, you might prefer:

```html
<script src="https://cdn.jsdelivr.net/npm/launchpad-midi-converter@2.0.1"></script>
```

**Manual** <br />
You can download the latest release of launchpad-midi-converter, uncompress it, grab the **LaunchpadMidi.browser.js** file in **dist** folder and copy it into your project. So you can link it to your HTML page.

**NPM** or **Yarn** <br />
Might be the best way if you want to use it with Node <br />
`npm install launchpad-midi-converter`\
or `yarn add launchpad-midi-converter`\
You can link it to your HTML page like this:

```html
<script src="node_modules/launchpad-midi-converter/dist/LaunchpadMidi.browser.js"></script>
```

# Usage

## Node

```javascript
const { LaunchpadMidi } = require("launchpad-midi-converter");
LaunchpadMidi.layout("programmer");
```

## HTML

```html
<script>
  const { LaunchpadMidi } = launchpad_midi_converter;
  LaunchpadMidi.layout("live");
</script>
```

## React

```javascript
import { LaunchpadMidi } from "launchpad-midi-converter";
LaunchpadMidi.layout("live");
```

# Documentation

## Modes available...

- _Live_ Mode (Green) => **live**
- _Programmer_ Mode (Orange) => **programmer**

## .layout(mode)

Where mode is the layout we want.
(See _Modes available..._).
Returns an array of every notes in the right order.

```javascript
>>> LaunchpadMidi.layout("programmer")
[
  [81, 82, 83, 84, 85, 86, 87, 88],
  [71, 72, 73, 74, 75, 76, 77, 78],
  [...]
]
```

**Take note that CC notes aren't included in the layouts.** Currently working on it...

## .convert(note, from, to)

Where note is the note we want to convert (eg.: 11), from is the layout where the note comes from (eg.: 11 comes from the _programmer_ layout) and to is the final layout (eg.: _live_ layout).

```javascript
>>> LaunchpadMidi.convert(11, "programmer", "live")
36
```

Explanations:
We take the _programmer_ layout and we search where the note, so 11, is placed in the layout. Now we take the _live_ layout and we read the note where 11 was placed in the _programmer_ layout, so 36 here. (Needs to be explaned well, my english is so bad).

## .color(velocity)

Where velocity is between 0 and 127. It returns the HEX color value of the velocity given. Based on default Novation Launchpad color palette.\
HEX was made by extracting the RGB values in the [Novation Palette](https://www.kaskobi.com/s/Novation-RGB-Palette)
and convert them to HEX, by using [mat1jaczyyy's code](https://github.com/mat1jaczyyy/LP-Firmware-Utility/blob/4de85a0b97f31f1af1b99fbd842f01c47d45d254/web/src/utils/index.ts#L49)

```javascript
>>> LaunchpadMidi.color(1)
"#1f1f1f"
```
