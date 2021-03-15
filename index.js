let app = document.getElementById("app");
let launchpadRoot = document.createElement('div')
    launchpadRoot.setAttribute("id", "launchpad")

for (var x = 8; x >= 1; x--) {
    let newPadList = document.createElement('div');
    newPadList.setAttribute("class", "launchpadRow");

    
    launchpadRoot.appendChild(newPadList);

    // Creation des 8 colonnes
    for (var y = 1; y <= 8; y++) {
        let newPadColumn = document.createElement('div');
        newPadColumn.setAttribute("class", "pad");
        newPadColumn.setAttribute("id", x + '' + y);
    
        newPadList.appendChild(newPadColumn);
    }

}

app.appendChild(launchpadRoot)

/**
 * Programmer mode:
 * 81-84 85-88
 * .1-.4 .5-.8
 * Start from 11-14 15-18
 * 
 * Live mode:
 * 36+$row*4-39+$row*4
 * Start from 36-39
 */

let programmerMode = [];
let liveMode = [];

// Programmer mode
for (let columns = 8; columns >= 1; columns--) {
    let column = []

    for (let rows = 1; rows <= 8; rows++) {
        let id = `${columns}${rows}`;
        column.push(id);
    }

    programmerMode.push(column)
}

// Live mode
for (let columns = 64; columns >= 36; columns -= 4) {
    let column = []

    for (let rows = 0; rows <= 7; rows++) {
        let id = columns + rows;

        // After 4 it goes to the next "side" (+32) and get back to 0 (-4)
        if (rows >= 4) {
            id += 32 - 4;
        }

        column.push(id);
    }

    liveMode.push(column)
}

console.log("Programmer mode", programmerMode)
console.log("Live mode", liveMode)

Midi.fromUrl("demo.mid").then (midi => {
    midi.tracks.forEach(track => {
        const notes = track.notes

        playMidi (notes)
    })
})


const convertLiveToProg = liveNote => {
    let programmerNote;
    liveMode.map((rows, indexRows) => {
        let index = rows.indexOf(liveNote);
        if (index !== -1) {
            programmerNote = programmerMode[indexRows][index];
        }
    })

    return parseInt(programmerNote);
}

const playMidi = notes => {
    let lastTime = 0;

    setTimeout(5000)

    notes.forEach((note) => {
        let liveNote = note.midi;
        let programmerNote = convertLiveToProg(liveNote)
        //console.log(note, programmerNote);

        setTimeout(()=>{
            console.log(programmerNote + " dly: ", note.time)
        
            document.getElementById(programmerNote).style.backgroundColor = `rgb(${note.velocity * 127}, ${note.velocity * 127}, ${note.velocity * 127})`
            setTimeout(()=>{
                document.getElementById(programmerNote).style.backgroundColor = `#e6e6e6`
            }, note.duration * 10000)

        }, note.time * 10000)
        
    })
}

