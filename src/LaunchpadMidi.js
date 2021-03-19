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
  convert (note, from, to) {
    let converted;

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
      let palette = [
        '000000','1c1c1c','7c7c7c','fcfcfc','ff4e48',
        'fe0a00','5a0000','180002','ffbc63','ff5700',
        '241802','5a1d00','fdfd21','fdfd00','585800',
        '181800','81fd2b','40fd01','165800','132801',
        '35fd2b','00fe00','005801','001800','35fc47',
        '00fe00','005801','001800','32fd7f','00fd3a',
        '015814','001c0e','2ffcb1','00fb91','015732',
        '011810','39beff','00a7ff','014051','001018',
        '4186ff','0050ff','011a5a','010619','4747ff',
        '0000fe','00005a','000018','8347ff','5000ff',
        '160067','0a0032','ff48fe','ff00fe','5a005a',
        '180018','fb4e83','ff0753','5a021b','210110',
        'ff1901','9a3500','7a5101','3e6500','013800',
        '005432','00537f','0000fe','01444d','1a00d1',
        '7c7c7c','202020','ff0a00','bafd00','acec00',
        '56fd00','008800','01fc7b','00a7ff','021aff',
        '3500ff','7800ff','b4177e','412000','ff4a01',
        '82e100','66fd00','00fe00','00fe00','45fd61',
        '01fbcb','5086ff','274dc8','847aed','d30cff',
        'ff065a','ff7d01','b8b100','8afd00','815d00',
        '3a2802','0d4c05','005037','131429','101f5a',
        '6a3c18','ac0401','e15136','dc6900','fee100',
        '99e101','60b500','1b1c31','dcfd54','76fbb9',
        '9698ff','8b62ff','404040','747474','defcfc',
        'a20401','340100','00d201','004101','b8b100',
        '3c3000','b45d00','4c1300'
      ];

      return palette[velocity];
    }
    else {
      throw new Error("Velocity is defined between 0 and 127 !");
    }
  }
}