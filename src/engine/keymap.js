
/**
 * Map to convert key event values to their respective block names.
 * Multiple are mapped to the same key so that shift versions work.
 */

module.exports = {
    //[Event key name] : [Block key value]
    
    //Use uppercase if possible,
    // if symbols then you need to provide both shift symbol and normal symbol.

    //Common:

    " ": "space-bar",
    ARROWLEFT: "left-arrow",
    ARROWRIGHT: "right-arrow",
    ARROWUP: "up-arrow",
    ARROWDOWN: "down-arrow",
    ENTER: "enter",
    SHIFT: "shift",
    CONTROL: "ctrl",
    COMMAND: "ctrl",

    //Symbols:

    "[": "[",
    "]": "]",
    "{": "{",
    "}": "}",
    "\\": "\\",
    "|": "\\",
    "=": "=",
    "+": "=",
    "-": "-",
    "_": "-",
    "`": "`",
    "~": "`",
    ";": ";",
    ":": ";",
    "'": "'",
    '"': "'",
    ".": ".",
    ">": ".",
    "/": "/",
    "?": "?",
    ",": ",",
    "<": ",",

    //Letters:

    A: "a",
    B: "b",
    C: "c",
    D: "d",
    E: "e",
    F: "f",
    G: "g",
    H: "h",
    I: "i",
    J: "j",
    K: "k",
    L: "l",
    M: "m",
    N: "n",
    O: "o",
    P: "p",
    Q: "q",
    R: "r",
    S: "s",
    T: "t",
    U: "u",
    V: "v",
    W: "w",
    X: "x",
    Y: "y",
    Z: "z",

    //Numbers:
    
    "1": "1",
    "!": "1",
    "2": "2",
    "@": "2",
    "3": "3",
    "#": "3",
    "4": "4",
    "$": "4",
    "5": "5",
    "%": "5",
    "6": "6",
    "^": "6",
    "7": "7",
    "&": "7",
    "8": "8",
    "*": "8",
    "9": "9",
    "(": "9",
    "0": "0",
    ")": "0"
};