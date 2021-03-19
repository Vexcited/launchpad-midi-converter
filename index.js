"use strict";

class LaunchpadMidi {

  /**
   * Return the specified layout
   * mode =  "live" || "programmer"
   */
  layout (mode) {
    let layout = []

    switch (mode) {
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

  /**
   * Convert a midi note
   * note = note to convert (in from format)
   * from, to = "live" || "programmer"
   */
  static convert (note, from, to) {
    let converted;

    this.layout(from).map((rows, indexRows) => {
        let index = rows.indexOf(note);
        if (index !== -1) {
            converted = this.layout(to)[indexRows][index];
        }
    })

    return converted;
  }
}