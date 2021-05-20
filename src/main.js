import { buildLayout } from "./build_layouts";
import novation_palette from "./novation_palette";

export class LaunchpadMidi {
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
      return "#" + novation_palette[velocity];
    } else {
      throw new Error("Velocity is defined between 0 and 127 !");
    }
  }
}
