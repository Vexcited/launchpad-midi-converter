const launchpad = require("../src/LPMidiConverter.js");
const { expect } = require("chai");

describe("#convert", () => {
    it("should convert from live mode to programmer mode", () => {
        let converted = launchpad.convert(41, "live", "programmer")

        expect(converted).to.equal(22)
    })

    it("should convert from programmer mode to live mode", () => {
        let converted = launchpad.convert(22, "programmer", "live")

        expect(converted).to.equal(41)
    })
})

describe("#color", () => {
    it("should return a hex value", () => {
        let hex = launchpad.color(3)

        expect(hex.indexOf("#")).to.equal(0)
    })
})

describe("#layout", () => {
    it("should return an array with 8 arrays in it", () => {
        let layout = launchpad.layout("live")
        
        expect(layout.length).to.equal(8)
    })
})