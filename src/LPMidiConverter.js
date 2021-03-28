"use strict";

/**
 * launchpad-midi-converter source.
 * GitHub => https://github.com/Vexcited/launchpad-midi-converter
 * 
 * How to use it ?
 * First, install it: `npm i launchpad-midi-converter`
 * (or import LPMidiConverter.min.js file)
 * Then, define it in your
 * 
 * NodeJS App:
 * `const launchpad = require("launchpad-midi-converter")`
 * then use functions like this:
 * `let liveLayout = launchpad.layout("live")`
 * 
 * HTML:
 * <script src="/path/to/LPMidiConverter.min.js"></script>
 * <script>
 *  // Load the module
 *  const launchpad = new LPMidiConverter();
 * 
 *  // Same as Node
 *  console.log(launchpad.layout("programmer"))
 * </script>
 */

class LPMidiConverter {

  /**
   * Build the specified layout (private function)
   * mode =  "live" || "programmer"
   * Doesn't require to re-build the layout when
   * convert() is called so the code runs faster.
   */
  #buildLayout (mode) {
    let layout = []

    switch (mode) {
      // Build live layout
      case "live":
        for (let columns = 64; columns >= 36; columns -= 4) {
          let column = []

          for (let rows = 0; rows <= 7; rows++) {
            let id = columns + rows;
            
            // After 4 it goes to the next "side" (+32) and get back to 0 (-4)
            if (rows >= 4) {
              id += 32 - 4;
            }

            // Insert the column
            column.push(id);
          }

          // Push the column to layout
          layout.push(column)
        }

        break;

      // Build programmer layout
      case "programmer":
        for (let columns = 8; columns >= 1; columns--) {
          let column = []

          for (let rows = 1; rows <= 8; rows++) {
              let id = `${columns}${rows}`;
              column.push(parseInt(id));
          }

          layout.push(column)
        }

        break;
    }

    return layout;
  }

  // Building layouts from upper function
  #layouts = {
    programmer: this.#buildLayout("programmer"),
    live: this.#buildLayout("live")
  }

  /**
   * Returns the launchpad layout from `mode`
   * @param {String} mode - programmer || live => Layout to return
   * @returns {Array} - Layout from `mode`
   */
  layout (mode) {
    return this.#layouts[mode]
  }

  /**
   * Convert a midi note
   * @param {Number} note - = note to convert (in from format)
   * @param {String} from - Layout from => "live" || "programmer"
   * @param {String} to - Convert to => "live" || "programmer"
   */
  convert (note, from, to) {
    let converted;

    // Search in the `from` layout the note
    this.layout(from).map((rows, indexRows) => {
        let index = rows.indexOf(note);
        if (index !== -1) {
            converted = this.layout(to)[indexRows][index];
        }
    })

    return converted;
  }

  /**
   * Return the hex color value from a given velocity.
   * Based on default Novation Launchpad Color Palette
   */
  color (velocity) {
    if (velocity >= 0 && velocity <= 127) {

      // I know this is not optimised.
      // But I don't know how to ATM !
      let palette = [
        "#000000","#212121","#8b8b8b","#fbfbfb",
        "#ff6457","#ff0000","#6e0a00","#220100",
        "#ffc572","#ff6c00","#6e2400","#2f1a00",
        "#fbf725","#fbf700","#686600","#1a1900",
        "#8bf634","#3ff500","#136500","#103400",
        "#2ff534","#00ff00","#007c00","#001900",
        "#2ff657","#00f500","#006500","#003200",
        "#30f68f","#00f546","#006519","#002012",
        "#27f7bd","#00f7a2","#00663b","#001912",
        "#3fcaff","#00b6ff","#004d63","#00121a",
        "#5098ff","#006cff","#00266d","#000421",
        "#5864ff","#0433ff","#01106d","#000221",
        "#9665ff","#6435ff","#1b1277","#0a0641",
        "#ff6aff","#ff40ff","#6e166d","#220321",
        "#ff6694","#ff2b62","#6e0b21","#290212",
        "#ff3400","#ad4400","#8c6200","#4b7500",
        "#004500","#006141","#006490","#0000ff",
        "#00525d","#232adb","#8b8b8b","#282828",
        "#ff2900","#c4f600","#b7eb00","#60f600",
        "#009500","#00f68b","#00a0ff","#033dff",
        "#4333ff","#8836ff","#c33090","#532900",
        "#ff5e00","#91e200","#71f600","#00f500",
        "#00fa00","#46f672","#00f8d2","#6199ff",
        "#2d64d2","#9590ef","#dd3fff","#ff2c6d",
        "#ff9100","#c6ba00","#95f600","#956c00",
        "#473500","#005b02","#006147","#121435",
        "#122c6d","#7d4d19","#bb1800","#e96740",
        "#e57d00","#ffe400","#a4e200","#6fbd00",
        "#21223b","#e2f762","#81f8c1","#a7aaff",
        "#9a7bff","#4d4d4d","#868686","#e2fbfb",
        "#b21700","#420300","#00d100","#004b00",
        "#c6ba00","#4d3b00","#c36e00","#591c00"
      ]

      return palette[velocity];
    }
    else {
      throw new Error("Velocity is defined between 0 and 127 !");
    }
  }
}

// Check if RequireJS/AMD is used. If it is then, exports as module
if ( typeof define === "function" && typeof define.amd === "object") {
  define([], function () {
    return new LPMidiConverter();
  });
}
else if (typeof module !== "undefined" && module.exports) {
  module.exports = new LPMidiConverter();
}