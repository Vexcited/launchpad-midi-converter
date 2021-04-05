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
  buildLayout (mode) {
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
  layouts = {
    programmer: this.buildLayout("programmer"),
    live: this.buildLayout("live")
  }

  /**
   * Returns the launchpad layout from `mode`
   * @param {String} mode - programmer || live => Layout to return
   * @returns {Array} - Layout from `mode`
   */
  layout (mode) {
    return this.layouts[mode]
  }

  /**
   * Convert a midi note
   * @param {Number} note - = note to convert (in from format)
   * @param {String} from - Layout from => "live" || "programmer"
   * @param {String} to - Convert to => "live" || "programmer"
   */
  convert (note, from, to) {
    let converted = null;

    // Search in the `from` layout the note
    this.layout(from).map((rows, indexRows) => {
        let index = rows.indexOf(note);
        if (index !== -1) {
            converted = this.layout(to)[indexRows][index];
        }
    })

    if (converted === null) {
      throw new Error("Note", note, "not found in layout", to);
    }
    else {
      return converted;
    }
  }

  /**
   * Return the hex color value from a given velocity.
   * Based on default Novation Launchpad Color Palette
   */
  color (velocity) {
    if (velocity >= 0 && velocity <= 127) {

      // I know this is not optimised.
      // But I don't know how to ATM !
      // RGB extracted (and converted to HEX) from https://www.kaskobi.com/s/Novation-RGB-Palette
      // Used code from mat1jaczyyy to convert to HEX: 
      // https://github.com/mat1jaczyyy/LP-Firmware-Utility/blob/4de85a0b97f31f1af1b99fbd842f01c47d45d254/web/src/utils/index.ts#L49
      let palette = [
        "#030303","#1f1f1f","#7f7f7f","#ffffff","#ff4b4b","#ff0303",
        "#570303","#1b0303","#ffbb6b","#ff5303","#571f03","#271b03",
        "#ffff4b","#ffff03","#575703","#1b1b03","#87ff4b","#53ff03",
        "#1f5703","#132b03","#4bff4b","#03ff03","#035703","#031b03",
        "#4bff5f","#03ff1b","#03570f","#031b03","#4bff87","#03ff57",
        "#03571f","#031f13","#4bffb7","#03ff97","#035737","#031b13",
        "#4bc3ff","#03a7ff","#034353","#030f1b","#4b87ff","#0357ff",
        "#031f57","#03071b","#4b4bff","#0303ff","#030357","#03031b",
        "#874bff","#5303ff","#1b0363","#0f032f","#ff4bff","#ff03ff",
        "#570357","#1b031b","#ff4b87","#ff0353","#57031f","#230313",
        "#ff1703","#973703","#775303","#436303","#033b03","#035737",
        "#03537f","#0303ff","#03474f","#2703cb","#7f7f7f","#1f1f1f",
        "#ff0303","#bbff2f","#afeb07","#63ff0b","#0f8b03","#03ff87",
        "#03a7ff","#032bff","#3f03ff","#7b03ff","#af1b7b","#3f2303",
        "#ff4b03","#87df07","#73ff17","#03ff03","#3bff27","#57ff6f",
        "#37ffcb","#5b8bff","#3353c3","#877fe7","#d31fff","#ff035b",
        "#ff7f03","#b7af03","#8fff03","#835b07","#3b2b03","#134b0f",
        "#0f4f37","#17172b","#171f5b","#673b1b","#a7030b","#db533f",
        "#d76b1b","#ffdf27","#9fdf2f","#67b30f","#1f1f2f","#dbff6b",
        "#7fffbb","#9b97ff","#8f67ff","#3f3f3f","#737373","#dfffff",
        "#9f0303","#370303","#1bcf03","#074303","#b7af03","#3f3303",
        "#b35f03","#4b1703"
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