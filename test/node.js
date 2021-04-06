const launchpad = require("../LPMidiConverter.min.js");
const { expect } = require("chai");

describe("#convert", () => {
    it("should convert 41 from live mode to programmer mode (expect 22)", () => {
        let converted = launchpad.convert(41, "live", "programmer")

        expect(converted).to.equal(22)
    })
})