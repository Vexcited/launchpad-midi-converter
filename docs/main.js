let firstExampleNote = 11;
let firstExampleLayoutFrom = "programmer";
let firstExampleLayoutTo = "live";
let firstExampleResult;

document.getElementById("firstExampleNote").addEventListener("input", (el) => {
    firstExampleNote = parseInt(el.target.value);
    firstExampleConvert()
})
document.getElementById("firstExampleLayoutFrom").addEventListener("change", (el) => {
    firstExampleLayoutFrom = el.target.value.toLowerCase();
    firstExampleConvert()
})
document.getElementById("firstExampleLayoutTo").addEventListener("change", (el) => {
    firstExampleLayoutTo = el.target.value.toLowerCase();
    firstExampleConvert()
})

const firstExampleConvert = () => {
    firstExampleResult = LPMidiConverter.convert(firstExampleNote, firstExampleLayoutFrom, firstExampleLayoutTo)
    if (firstExampleResult != undefined) {
        document.getElementById("firstExampleResult").innerHTML = firstExampleResult;
    }
    else {
        document.getElementById("firstExampleResult").innerHTML = "Can't convert !";
    }
}  

firstExampleConvert()

// Second example

let secondExampleVelocity = 3;
let secondExampleResult;

document.getElementById("secondExampleVelocity").addEventListener("input", (el) => {
    secondExampleVelocity = parseInt(el.target.value);

    secondExampleResult = LPMidiConverter.color(secondExampleVelocity)
    document.getElementById("secondExampleResult").style.backgroundColor = `${secondExampleResult}`
})

// Virtual Launchpad example
// Creating layout
let vLayout = LPMidiConverter.layout("programmer")
vLayout.map(rows => {
    let virtualRow =  document.createElement('div');
    virtualRow.setAttribute("class", "launchpadRow");

    rows.map(pad => {
        let virtualPad = document.createElement('div');
        virtualPad.setAttribute("class", "pad");
        virtualPad.setAttribute("id", pad);
    
        virtualRow.appendChild(virtualPad);
    })

    document.getElementById("vLaunchpad").appendChild(virtualRow);
});

//  https://css-tricks.com/converting-color-spaces-in-javascript/
const RGBToHex = (rgb) => {
    // Choose correct separator
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(")")[0].split(sep);
  
    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
}

document.getElementById("vLaunchpadPlay").addEventListener("click", () => {
    fetch ("demo.json")
    .then (res => res.json())
    .then (notes => {
        console.warn("Playing demo.json file, notes are in `live` layout.")

        // For every note, get the time where they're played
        // Timeout it to make it runs in background
        // Put timeout too on duration.
        notes.forEach((note) => {
            let liveNote = note.midi;

            // Convert Live note to Programmer note ID
            let programmerNote = LPMidiConverter.convert(liveNote, "live", "programmer");
            let noteVelocity = note.velocity * 127;

            // Play the note on `note.time` (x10 000) to make it slow.
            setTimeout(() => {
                /* Debug */ console.log(`Played ${programmerNote} on time ${note.time} for ${note.duration}, with velocity: ${noteVelocity}`)
                
                // The virtual pad we will light up
                let virtualPad = document.getElementById(programmerNote)

                // Color we will show.
                let playedColor = LPMidiConverter.color(noteVelocity)
                // Light up the virtual pad.
                virtualPad.style.backgroundColor = playedColor;

                // Duration on `note.duration` (x10 000) to make it slow (as note.time).
                setTimeout(() => {

                    // Check if another note isn't actually playing
                    // If it is not, then reset the virtual pad color to the default one
                    let currentColor = RGBToHex(virtualPad.style.backgroundColor);
                    if (currentColor === playedColor) {
                        virtualPad.style.backgroundColor = "#c5c5c5"
                    }
                }, note.duration * 10000)
            }, note.time * 10000)
        })
    })
})