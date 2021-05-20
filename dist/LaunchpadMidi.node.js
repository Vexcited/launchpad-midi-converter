'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function createLiveLayout() {
  const layout = [];

  for (let columns = 64; columns >= 36; columns -= 4) {
    let column = [];

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
    layout.push(column);
  }

  return layout;
}

function createProgrammerLayout() {
  const layout = [];

  for (let columns = 8; columns >= 1; columns--) {
    let column = [];

    for (let rows = 1; rows <= 8; rows++) {
      let id = `${columns}${rows}`;
      column.push(parseInt(id));
    }

    layout.push(column);
  }

  return layout;
}

// Export the functions
const buildLayout = {
  live: createLiveLayout,
  programmer: createProgrammerLayout
};

const palette = [
  "030303",
  "1f1f1f",
  "7f7f7f",
  "ffffff",
  "ff4b4b",
  "ff0303",
  "570303",
  "1b0303",
  "ffbb6b",
  "ff5303",
  "571f03",
  "271b03",
  "ffff4b",
  "ffff03",
  "575703",
  "1b1b03",
  "87ff4b",
  "53ff03",
  "1f5703",
  "132b03",
  "4bff4b",
  "03ff03",
  "035703",
  "031b03",
  "4bff5f",
  "03ff1b",
  "03570f",
  "031b03",
  "4bff87",
  "03ff57",
  "03571f",
  "031f13",
  "4bffb7",
  "03ff97",
  "035737",
  "031b13",
  "4bc3ff",
  "03a7ff",
  "034353",
  "030f1b",
  "4b87ff",
  "0357ff",
  "031f57",
  "03071b",
  "4b4bff",
  "0303ff",
  "030357",
  "03031b",
  "874bff",
  "5303ff",
  "1b0363",
  "0f032f",
  "ff4bff",
  "ff03ff",
  "570357",
  "1b031b",
  "ff4b87",
  "ff0353",
  "57031f",
  "230313",
  "ff1703",
  "973703",
  "775303",
  "436303",
  "033b03",
  "035737",
  "03537f",
  "0303ff",
  "03474f",
  "2703cb",
  "7f7f7f",
  "1f1f1f",
  "ff0303",
  "bbff2f",
  "afeb07",
  "63ff0b",
  "0f8b03",
  "03ff87",
  "03a7ff",
  "032bff",
  "3f03ff",
  "7b03ff",
  "af1b7b",
  "3f2303",
  "ff4b03",
  "87df07",
  "73ff17",
  "03ff03",
  "3bff27",
  "57ff6f",
  "37ffcb",
  "5b8bff",
  "3353c3",
  "877fe7",
  "d31fff",
  "ff035b",
  "ff7f03",
  "b7af03",
  "8fff03",
  "835b07",
  "3b2b03",
  "134b0f",
  "0f4f37",
  "17172b",
  "171f5b",
  "673b1b",
  "a7030b",
  "db533f",
  "d76b1b",
  "ffdf27",
  "9fdf2f",
  "67b30f",
  "1f1f2f",
  "dbff6b",
  "7fffbb",
  "9b97ff",
  "8f67ff",
  "3f3f3f",
  "737373",
  "dfffff",
  "9f0303",
  "370303",
  "1bcf03",
  "074303",
  "b7af03",
  "3f3303",
  "b35f03",
  "4b1703"
];

class LaunchpadMidi {
  // Building layouts from upper function
  static #layouts = {
    programmer: buildLayout["programmer"](),
    live: buildLayout["live"]()
  };

  /**
   * Returns the launchpad layout from `mode`
   * @param {String} mode - `programmer` | `live`
   * @returns {Array} - Layout from `mode`
   */
  static layout(mode) {
    if (this.#layouts[mode]) {
      return this.#layouts[mode];
    } else {
      throw new Error(`Layout "${mode}" doesn't exist !`);
    }
  }

  /**
   * Convert a midi note ex: MIDI note 88 from Live to Programmer mode.
   * @param {Number} note - = Note to convert
   * @param {String} from - Layout from => live | programmer
   * @param {String} to - Convert to => live | programmer
   */
  static convert(note, from, to) {
    let converted = null;

    // Search in the `from` layout the note
    this.layout(from).map((rows, indexRows) => {
      let index = rows.indexOf(note);
      if (index !== -1) {
        converted = this.layout(to)[indexRows][index];
      }
    });

    if (converted === null) {
      throw new Error("Note", note, "not found in layout", to);
    } else {
      return converted;
    }
  }

  /**
   * Return the hex color value from a given velocity.
   * Based on default Novation Launchpad Color Palette
   * @param {Number} velocity - Velocity that will be returned in HEX.
   */
  static color(velocity) {
    if (velocity >= 0 && velocity <= 127) {
      // RGB extracted (and converted to HEX) from https://www.kaskobi.com/s/Novation-RGB-Palette
      // Used code from mat1jaczyyy to convert to HEX, right here
      // https://github.com/mat1jaczyyy/LP-Firmware-Utility/blob/4de85a0b97f31f1af1b99fbd842f01c47d45d254/web/src/utils/index.ts#L49
      return "#" + palette[velocity];
    } else {
      throw new Error("Velocity is defined between 0 and 127 !");
    }
  }
}

exports.LaunchpadMidi = LaunchpadMidi;
