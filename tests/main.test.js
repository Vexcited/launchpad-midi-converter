const { LaunchpadMidi } = require("../dist/LaunchpadMidi.node.js");

test("check layouts => returns an array of 8 arrays", () => {
  const liveLayout = LaunchpadMidi.layout("live");
  const programmerLayout = LaunchpadMidi.layout("programmer");

  expect(Array.isArray(liveLayout) && Array.isArray(programmerLayout)).toBe(
    true
  );
  expect(liveLayout.length).toBe(8);
  expect(programmerLayout.length).toBe(8);

  liveLayout.forEach(column => expect(Array.isArray(column)));
  programmerLayout.forEach(column => expect(Array.isArray(column)));
});

test("returns hex value", () => {
  expect(LaunchpadMidi.color(1)[0]).toBe("#");
});

test("color below 0 and upper 127 should throw error", () => {
  expect(() => {
    LaunchpadMidi.color(-1);
  }).toThrow();
  expect(() => {
    LaunchpadMidi.color(128);
  }).toThrow();
});

test("programmer->88 => should return live->99 + reverse", () => {
  expect(LaunchpadMidi.convert(88, "programmer", "live")).toBe(99);
  expect(LaunchpadMidi.convert(99, "live", "programmer")).toBe(88);
});

test("programmer->11 => should return live->36 + reverse", () => {
  expect(LaunchpadMidi.convert(11, "programmer", "live")).toBe(36);
  expect(LaunchpadMidi.convert(36, "live", "programmer")).toBe(11);
});
