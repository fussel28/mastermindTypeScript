import {checkBlackPins} from "./GameScreen";
import {checkGrayPins} from "./GameScreen";
import {shuffle} from "./Home"

let vorgabeColors = ["#d56d89", "#f00", "#876543", "#345678"];

let spielfeldArray: string[][] =  [
    ["#d56d89", "#fff", "#fff", "#fff"],        // Check Black Pins 1
    ["#f00", "#d56d89", "#345678", "#876543"],  // Check Gray Pins 4
    ["#fff", "#fff", "#876543", "#345678"],     // Check Black Pins 2 + Check Gray Pins 2
    ["#fff", "#fff", "#fff", "#fff"],           // Check Black Pins 0 + Check Gray Pins 0
    ["#d56d89", "#f00", "#876543", "#345678"]   // Check Black Pins 4 + Check Gray Pins 4
];
let pins: string[][] =  [
    ["#fff", "#fff", "#fff", "#fff"],
    ["#fff", "#fff", "#fff", "#fff"],
    ["#fff", "#fff", "#fff", "#fff"],
    ["#fff", "#fff", "#fff", "#fff"],
    ["#fff", "#fff", "#fff", "#fff"],
    ["#fff", "#fff", "#fff", "#fff"],
    ["#fff", "#fff", "#fff", "#fff"],
    ["#fff", "#fff", "#fff", "#fff"]
];
let markierArray: string[] = [];

let shuffleArray: any = null;


// TEST EVALUATE
// CHECK BLACK PINS
describe('Check Black Pins 1', () => {
    it("Arrays an einer Stelle gleich", () => {
        expect(checkBlackPins(vorgabeColors, spielfeldArray, 0, 0, markierArray, pins)).toBe(1);
    })
});

describe('Check Black Pins 2', () => {
    it("Arrays an zwei Stellen gleich", () => {
        expect(checkBlackPins(vorgabeColors, spielfeldArray, 2, 0, markierArray, pins)).toBe(2);
    })
});

describe('Check Black Pins 0', () => {
    it("Arrays an keiner Stelle gleich", () => {
        expect(checkBlackPins(vorgabeColors, spielfeldArray, 3, 0, markierArray, pins)).toBe(0);
    })
});

describe('Check Black Pins 4', () => {
    it("Arrays an allen Stellen gleich", () => {
        expect(checkBlackPins(vorgabeColors, spielfeldArray, 4, 0, markierArray, pins)).toBe(4);
    })
});


// CHECK GRAY PINS
describe('Check Gray Pins 4 unsorted', () => {
    it("alle Farben im Array enthalten + nicht richtige Stelle ", () => {
        expect(checkGrayPins(vorgabeColors, spielfeldArray, 1, markierArray, pins)).toBe(4);
    })
});

describe('Check Gray Pins 2', () => {
    it("zwei Farben im Array enthalten", () => {
        expect(checkGrayPins(vorgabeColors, spielfeldArray, 2, markierArray, pins)).toBe(2);
    })
});

describe('Check Gray Pins 0', () => {
    it("keine Farbe im Array enthalten", () => {
        expect(checkGrayPins(vorgabeColors, spielfeldArray, 3, markierArray, pins)).toBe(0);
    })
});

describe('Check Gray Pins 4 sorted', () => {
    it("alle Farben im Array enthalten + an richtiger Stelle", () => {
        expect(checkGrayPins(vorgabeColors, spielfeldArray, 4, markierArray, pins)).toBe(4);
    })
});


// TEST FUNCTION SHUFFLE
describe('Shuffle Test Sortierung', () => {
    it('EingabeArray Sortierung anders als AusgabeArray', () => {
        expect(shuffle(vorgabeColors)).not.toBe(vorgabeColors);
    })
});

describe('Shuffle Test Länge', () => {
    it('EingabeArray genauso lang wie AusgabeArray', () => {
        expect(shuffle(vorgabeColors).length).toBe(vorgabeColors.length);
    })
});

describe('Shuffle Test Null', () => {
    it('EingabeArray = null', () => {
        expect(shuffle(shuffleArray)).toBe(undefined);
    })
});