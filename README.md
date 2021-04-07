# Installation

**CDN** <br />
The easiest way is to link the launchpad-midi-converter library from the jsDelivr CDN. To retrieve the latest version, just add this to your HTML page:
```html
<script src="https://cdn.jsdelivr.net/npm/launchpad-midi-converter"></script>
```

If you want to target a specific version, you might prefer:
```html
<script src="https://cdn.jsdelivr.net/npm/launchpad-midi-converter@0.2.0"></script>
```

**Manual** <br />
You can download the latest release of launchpad-midi-converter, uncompress it, grab the **LPMidiConverter.min.js** file and copy it to your project. So you can link it to your HTML page.

**NPM** <br />
Might be the best way if you want to use it with Node <br />
`npm install launchpad-midi-converter` <br />
You can link it to your HTML page like this:
```html
<script src="node_modules/launchpad-midi-converter/LPMidiConverter.min.js"></script>
```

# Usage

## Node
```javascript
const launchpad = require("launchpad-midi-converter");
launchpad.layout("programmer");
```

## HTML
```html
<script>
    LPMidiConverter.layout("live");
</script>
```

# Documentation

## Modes or Layouts availables...
- *Live* Mode (Green) => **live**
- *Programmer* Mode (Orange) => **programmer**

## .layout(mode)
Where mode is the layout we want. (See *Mode or Layouts availables...*). Returns an array of every notes in the right order. Example:
```javascript
>>> LPMidiConverter.layout("programmer")
[
  [81, 82, 83, 84, 85, 86, 87, 88],
  [71, 72, 73, 74, 75, 76, 77, 78],
  [...]
]
```
**Take note that CC notes aren't included in the layouts.** Currently working on it...

## .convert(note, from, to)
Where note is the note we want to convert (eg.: 11), from is the layout where the note comes from (eg.: 11 comes from the *programmer* layout) and to is the final layout (eg.: *live* layout).
```javascript
>>> LPMidiConverter.convert(11, "programmer", "live")
36
```
Explanations: 
We take the *programmer* layout and we search where the note, so 11, is placed in the layout. Now we take the *live* layout and we read the note where 11 was placed in the *programmer* layout, so 36 here. (Needs to be explaned well, my english is so bad).

## .color(velocity)
Where velocity is between 0 and 127. It returns the HEX color value of the velocity given. Based on default Novation Launchpad color palette.
```javascript
>>> LPMidiConverter.color(1)
"1c1c1c"
```
*This function isn't optimised, it's just hardcoded... If theres a better way to do it, please contribute !*

# Want to help ?

Just clone this repo and everything is in **src/LPMidiConverter.js** ! Minified file is made with **minify** (*npm i -g minify*). Just go in your working directory and type *npm run minify* and it will overwrite *LPMidiConverter.min.js*. Hope I explained well !