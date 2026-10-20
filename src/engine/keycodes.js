
class KeyCode {

    static UP_ARROW = [38, "up arrow", "UP_ARROW"];
    static DOWN_ARROW = [40, "down arrow", "DOWN_ARROW"];
    static LEFT_ARROW = [37, "left arrow", "LEFT_ARROW"];
    static RIGHT_ARROW = [39, "right arrow", "RIGHT_ARROW"];

    static SPACE = [32, "space", "SPACE"];
    static CONTROL = [17, "control (CTRL)", "CONTROL"];
    static ALT = [18, "alt", "ALT"];
    static SHIFT = [16, "shift", "SHIFT"];
    //static META = [91, "meta", "META"]; //Should i use this? This will open the OS menu when pressed so there might be no point for this.
    static ENTER = [13, "enter", "ENTER"];
    static TAB = [9, "tab", "TAB"];
    static ESCAPE = [27, "ESC", "ESCAPE"];
    static BACKSPACE = [8, "backspace", "BACKSPACE"];

    static BACKQUOTE = [192, "`", "BACKQUOTE"];
    static NUM_1 = [49, "1", "NUM_1"];
    static NUM_2 = [50, "2", "NUM_2"];
    static NUM_3 = [51, "3", "NUM_3"];
    static NUM_4 = [52, "4", "NUM_4"];
    static NUM_5 = [53, "5", "NUM_5"];
    static NUM_6 = [54, "6", "NUM_6"];
    static NUM_7 = [55, "7", "NUM_7"];
    static NUM_8 = [56, "8", "NUM_8"];
    static NUM_9 = [57, "9", "NUM_9"];
    static NUM_0 = [48, "0", "NUM_0"];

    static MINUS = [189, "-", "MINUS"];
    static EQUALS = [187, "=", "EQUALS"];

    static BRACKETLEFT = [219, "[", "BRACKETLEFT"];
    static BRACKETRIGHT = [221, "]", "BRACKETRIGHT"];
    static BACKSLASH = [220, '\\', "BACKSLASH"];
    static SEMICOLON = [186, ";", "SEMICOLON"];
    static QUOTE = [222, "\"", "QUOTE"];
    static COMMA = [188, ",", "COMMA"];
    static PERIOD = [190, ".", "PERIOD"];
    static SLASH = [191, "/", "SLASH"];

    static LETTER_A = [65, "a", "LETTER_A"];
    static LETTER_B = [66, "b", "LETTER_B"];
    static LETTER_C = [67, "c", "LETTER_C"];
    static LETTER_D = [68, "d", "LETTER_D"];
    static LETTER_E = [69, "e", "LETTER_E"];
    static LETTER_F = [70, "f", "LETTER_F"];
    static LETTER_G = [71, "g", "LETTER_G"];
    static LETTER_H = [72, "h", "LETTER_H"];
    static LETTER_I = [73, "i", "LETTER_I"];
    static LETTER_J = [74, "j", "LETTER_J"];
    static LETTER_K = [75, "k", "LETTER_K"];
    static LETTER_L = [76, "l", "LETTER_L"];
    static LETTER_M = [77, "m", "LETTER_M"];
    static LETTER_N = [78, "n", "LETTER_N"];
    static LETTER_O = [79, "o", "LETTER_O"];
    static LETTER_P = [80, "p", "LETTER_P"];
    static LETTER_Q = [81, "q", "LETTER_Q"];
    static LETTER_R = [82, "r", "LETTER_R"];
    static LETTER_S = [83, "s", "LETTER_S"];
    static LETTER_T = [84, "t", "LETTER_T"];
    static LETTER_U = [85, "u", "LETTER_U"];
    static LETTER_V = [86, "v", "LETTER_V"];
    static LETTER_W = [87, "w", "LETTER_W"];
    static LETTER_X = [88, "x", "LETTER_X"];
    static LETTER_Y = [89, "y", "LETTER_Y"];
    static LETTER_Z = [90, "z", "LETTER_Z"];

    static ALL_KEYS = [
        KeyCode.UP_ARROW,
        KeyCode.DOWN_ARROW,
        KeyCode.LEFT_ARROW,
        KeyCode.RIGHT_ARROW,

        KeyCode.SPACE,
        KeyCode.CONTROL,
        KeyCode.ALT,
        KeyCode.SHIFT,
        KeyCode.ENTER,
        KeyCode.TAB,
        KeyCode.ESCAPE,
        KeyCode.BACKSPACE,

        KeyCode.BACKQUOTE,
        KeyCode.NUM_1,
        KeyCode.NUM_2,
        KeyCode.NUM_3,
        KeyCode.NUM_4,
        KeyCode.NUM_5,
        KeyCode.NUM_6,
        KeyCode.NUM_7,
        KeyCode.NUM_8,
        KeyCode.NUM_9,
        KeyCode.NUM_0,

        KeyCode.MINUS,
        KeyCode.EQUALS,
        KeyCode.BRACKETLEFT,
        KeyCode.BRACKETRIGHT,
        KeyCode.BACKSLASH,
        KeyCode.SEMICOLON,
        KeyCode.QUOTE,
        KeyCode.COMMA,
        KeyCode.PERIOD,
        KeyCode.SLASH,

        KeyCode.LETTER_A,
        KeyCode.LETTER_B,
        KeyCode.LETTER_C,
        KeyCode.LETTER_D,
        KeyCode.LETTER_E,
        KeyCode.LETTER_F,
        KeyCode.LETTER_G,
        KeyCode.LETTER_H,
        KeyCode.LETTER_I,
        KeyCode.LETTER_J,
        KeyCode.LETTER_K,
        KeyCode.LETTER_L,
        KeyCode.LETTER_M,
        KeyCode.LETTER_N,
        KeyCode.LETTER_O,
        KeyCode.LETTER_P,
        KeyCode.LETTER_Q,
        KeyCode.LETTER_R,
        KeyCode.LETTER_S,
        KeyCode.LETTER_T,
        KeyCode.LETTER_U,
        KeyCode.LETTER_V,
        KeyCode.LETTER_W,
        KeyCode.LETTER_X,
        KeyCode.LETTER_Y,
        KeyCode.LETTER_Z,
    ];

    static getKeyObject(key) {
        return {
            keyCode: key[0],
            friendlyName: key[1],
            codeName: key[2],
        };
    }

    static hasKey(codeName) {
        var allKeys = KeyCode.ALL_KEYS;
        for (var keyArray of allKeys) {
            var key = KeyCode.getKeyObject(keyArray);
            if (key.codeName == codeName) {
                return keyArray;
            }
        }

        return false;
    }

    static allCodeNumbers(codeName) {
        return KeyCode.ALL_KEYS.map((keyArray) => KeyCode.getKeyObject(keyArray).keyCode);
    }
}

module.exports = KeyCode;