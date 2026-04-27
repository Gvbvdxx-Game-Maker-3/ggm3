/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 20:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var JavascriptTranslation = {};
var utilFunctions = __webpack_require__(9547);
var outputBlocks = __webpack_require__(7147);

outputBlocks.push("motion_xposition");
JavascriptTranslation["motion_xposition"] = function (
  jsonblock,
  utils,
  options,
) {
  return `sprite.x`;
};

outputBlocks.push("motion_yposition");
JavascriptTranslation["motion_yposition"] = function (
  jsonblock,
  utils,
  options,
) {
  return `sprite.y`;
};

outputBlocks.push("motion_direction");
JavascriptTranslation["motion_direction"] = function (
  jsonblock,
  utils,
  options,
) {
  return `sprite.direction`;
};

JavascriptTranslation["motion_gotoxy"] = function (jsonblock, utils, options) {
  var X = utils.getInput(jsonblock, "X", options, "undefined");
  var Y = utils.getInput(jsonblock, "Y", options, "undefined");

  return `sprite.x = +(${X}) || 0; sprite.y = +(${Y}) || 0;`;
};

JavascriptTranslation["motion_changexby"] = function (
  jsonblock,
  utils,
  options,
) {
  var DX = utils.getInput(jsonblock, "DX", options, "undefined");

  return `sprite.x += +(${DX}) || 0;`;
};

JavascriptTranslation["motion_setx"] = function (jsonblock, utils, options) {
  var X = utils.getInput(jsonblock, "X", options, "undefined");

  return `sprite.x = +(${X}) || 0;`;
};

JavascriptTranslation["motion_changeyby"] = function (
  jsonblock,
  utils,
  options,
) {
  var DY = utils.getInput(jsonblock, "DY", options, "undefined");

  return `sprite.y += +(${DY}) || 0;`;
};

JavascriptTranslation["motion_sety"] = function (jsonblock, utils, options) {
  var Y = utils.getInput(jsonblock, "Y", options, "undefined");

  return `sprite.y = +(${Y}) || 0;`;
};

JavascriptTranslation["motion_pointindirection"] = function (
  jsonblock,
  utils,
  options,
) {
  var DIRECTION = utils.getInput(jsonblock, "DIRECTION", options, "undefined");

  return `sprite.direction = +(${DIRECTION}) || 0;`;
};

JavascriptTranslation["motion_turnleft"] = function (
  jsonblock,
  utils,
  options,
) {
  var DEGREES = utils.getInput(jsonblock, "DEGREES", options, "undefined");

  return `sprite.direction -= +(${DEGREES}) || 0;`;
};

JavascriptTranslation["motion_turnright"] = function (
  jsonblock,
  utils,
  options,
) {
  var DEGREES = utils.getInput(jsonblock, "DEGREES", options, "undefined");

  return `sprite.direction += +(${DEGREES}) || 0;`;
};

JavascriptTranslation["motion_movesteps"] = function (
  jsonblock,
  utils,
  options,
) {
  var STEPS = utils.getInput(jsonblock, "STEPS", options, "undefined");

  return `sprite.moveSteps(+(${STEPS}) || 0);`;
};

outputBlocks.push("motion_goto_menu");
JavascriptTranslation["motion_goto_menu"] = function (
  jsonblock,
  utils,
  options,
) {
  var TO = utils.getField(jsonblock, "TO", options, "null");

  return JSON.stringify(TO);
};
JavascriptTranslation["motion_goto"] = function (
  jsonblock,
  utils,
  options,
) {
  var TO = utils.getInput(jsonblock, "TO", options, "null");

  return `sprite.goTo(${TO});`;
};

module.exports = JavascriptTranslation;


/***/ }),

/***/ 30:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var JavascriptTranslation = {};
var utilFunctions = __webpack_require__(9547);
var outputBlocks = __webpack_require__(7147);

//Basic math:

outputBlocks.push("operator_add");
JavascriptTranslation["operator_add"] = function (jsonblock, utils, options) {
  var NUM1 = utils.getInput(jsonblock, "NUM1", options, "undefined");
  var NUM2 = utils.getInput(jsonblock, "NUM2", options, "undefined");
  //Although this is GGM3, not Scratch, falling back to zero or converting to number automatically is more convient.
  return `((+(${NUM1}) || 0) + (+(${NUM2}) || 0))`;
};

outputBlocks.push("operator_subtract");
JavascriptTranslation["operator_subtract"] = function (
  jsonblock,
  utils,
  options,
) {
  var NUM1 = utils.getInput(jsonblock, "NUM1", options, "undefined");
  var NUM2 = utils.getInput(jsonblock, "NUM2", options, "undefined");
  return `((+(${NUM1}) || 0) - (+(${NUM2}) || 0))`;
};

outputBlocks.push("operator_multiply");
JavascriptTranslation["operator_multiply"] = function (
  jsonblock,
  utils,
  options,
) {
  var NUM1 = utils.getInput(jsonblock, "NUM1", options, "undefined");
  var NUM2 = utils.getInput(jsonblock, "NUM2", options, "undefined");
  return `((+(${NUM1}) || 0) * (+(${NUM2}) || 0))`;
};

outputBlocks.push("operator_divide");
JavascriptTranslation["operator_divide"] = function (
  jsonblock,
  utils,
  options,
) {
  var NUM1 = utils.getInput(jsonblock, "NUM1", options, "undefined");
  var NUM2 = utils.getInput(jsonblock, "NUM2", options, "undefined");
  return `((+(${NUM1}) || 0) / (+(${NUM2}) || 0))`;
};

outputBlocks.push("operator_scratch_mod");
JavascriptTranslation["operator_scratch_mod"] = function (
  jsonblock,
  utils,
  options,
) {
  var NUM1 = utils.getInput(jsonblock, "NUM1", options, "undefined");
  var NUM2 = utils.getInput(jsonblock, "NUM2", options, "undefined");
  return `engine.sMath.mod(+(${NUM1}) || 0, +(${NUM2}) || 0)`;
};

outputBlocks.push("operator_js_mod");
JavascriptTranslation["operator_js_mod"] = function (
  jsonblock,
  utils,
  options,
) {
  var NUM1 = utils.getInput(jsonblock, "NUM1", options, "undefined");
  var NUM2 = utils.getInput(jsonblock, "NUM2", options, "undefined");
  return `(+(${NUM1}) || 0) % (+(${NUM2}) || 0)`;
};

outputBlocks.push("operator_sign");
JavascriptTranslation["operator_sign"] = function (jsonblock, utils, options) {
  var NUM = utils.getInput(jsonblock, "NUM", options, "undefined");
  return `Math.sign(+(${NUM}) || 0)`;
};

outputBlocks.push("operator_fixed");
JavascriptTranslation["operator_fixed"] = function (jsonblock, utils, options) {
  var NUM = utils.getInput(jsonblock, "NUM", options, "undefined");
  var DECIMALS = utils.getInput(jsonblock, "DECIMALS", options, "undefined");
  return `(+(${NUM}) || 0).toFixed(+(${DECIMALS}) || 0)`;
};

outputBlocks.push("operator_mathop");
JavascriptTranslation["operator_mathop"] = function (
  jsonblock,
  utils,
  options,
) {
  var OPERATOR = utils.getField(jsonblock, "OPERATOR", options, "undefined");
  var NUM = utils.getInput(jsonblock, "NUM", options, "undefined");
  var numberCode = `(+(${NUM}) || 0)`;
  switch (OPERATOR) {
    case "abs":
      return `Math.abs(${numberCode})`;
    case "floor":
      return `Math.floor(${numberCode})`;
    case "ceiling":
      return `Math.ceil(${numberCode})`;
    case "sqrt":
      return `Math.sqrt(${numberCode})`;
    case "sin":
      return `Math.round(Math.sin((Math.PI * ${numberCode}) / 180) * 1e10) / 1e10`;
    case "cos":
      return `Math.round(Math.cos((Math.PI * ${numberCode}) / 180) * 1e10) / 1e10`;
    case "tan":
      return `MathUtil.tan(${numberCode})`;
    case "asin":
      return `(Math.asin(${numberCode}) * 180) / Math.PI`;
    case "acos":
      return `(Math.acos(${numberCode}) * 180) / Math.PI`;
    case "atan":
      return `(Math.atan(${numberCode}) * 180) / Math.PI`;
    case "ln":
      return `Math.log(${numberCode})`;
    case "log":
      return `Math.log(${numberCode}) / Math.LN10`;
    case "e ^":
      return `Math.exp(${numberCode})`;
    case "10 ^":
      return `Math.pow(10, ${numberCode})`;
    case "20 ^":
      return `Math.pow(20, ${numberCode})`;
  }
  return `0`;
};

//Randomizing:

outputBlocks.push("operator_random");
JavascriptTranslation["operator_random"] = function (
  jsonblock,
  utils,
  options,
) {
  var FROM = utils.getInput(jsonblock, "FROM", options, "undefined");
  var TO = utils.getInput(jsonblock, "TO", options, "undefined");
  return `thread.random(+(${FROM}) || 0, +(${TO}) || 0)`;
};

//Conditional:

outputBlocks.push("operator_equals");
JavascriptTranslation["operator_equals"] = function (
  jsonblock,
  utils,
  options,
) {
  var OPERAND1 = utils.getInput(jsonblock, "OPERAND1", options, "undefined");
  var OPERAND2 = utils.getInput(jsonblock, "OPERAND2", options, "undefined");
  return `((${OPERAND1}) == (${OPERAND2}))`;
};

outputBlocks.push("operator_gt");
JavascriptTranslation["operator_gt"] = function (jsonblock, utils, options) {
  var OPERAND1 = utils.getInput(jsonblock, "OPERAND1", options, "undefined");
  var OPERAND2 = utils.getInput(jsonblock, "OPERAND2", options, "undefined");
  return `((+(${OPERAND1}) || 0) > (+(${OPERAND2}) || 0))`;
};

outputBlocks.push("operator_lt");
JavascriptTranslation["operator_lt"] = function (jsonblock, utils, options) {
  var OPERAND1 = utils.getInput(jsonblock, "OPERAND1", options, "undefined");
  var OPERAND2 = utils.getInput(jsonblock, "OPERAND2", options, "undefined");
  return `((+(${OPERAND1}) || 0) < (+(${OPERAND2}) || 0))`;
};

outputBlocks.push("operator_and");
JavascriptTranslation["operator_and"] = function (jsonblock, utils, options) {
  var OPERAND1 = utils.getInput(jsonblock, "OPERAND1", options, "false");
  var OPERAND2 = utils.getInput(jsonblock, "OPERAND2", options, "false");
  return `((${OPERAND1}) && (${OPERAND2}))`;
};

outputBlocks.push("operator_or");
JavascriptTranslation["operator_or"] = function (jsonblock, utils, options) {
  var OPERAND1 = utils.getInput(jsonblock, "OPERAND1", options, "false");
  var OPERAND2 = utils.getInput(jsonblock, "OPERAND2", options, "false");
  return `((${OPERAND1}) || (${OPERAND2}))`;
};

outputBlocks.push("operator_not");
JavascriptTranslation["operator_not"] = function (jsonblock, utils, options) {
  var OPERAND = utils.getInput(jsonblock, "OPERAND", options, "false");
  return `(!(${OPERAND}))`;
};

outputBlocks.push("operator_outputif");
JavascriptTranslation["operator_outputif"] = function (
  jsonblock,
  utils,
  options,
) {
  var CONDITION = utils.getInput(jsonblock, "CONDITION", options, "false");

  var PASS_OUTPUT = utils.getInput(jsonblock, "PASS_OUTPUT", options, null);
  var FAIL_OUTPUT = utils.getInput(jsonblock, "FAIL_OUTPUT", options, null);
  return `(${CONDITION}) ? (${PASS_OUTPUT}) : (${FAIL_OUTPUT})`;
};

//Constants:

outputBlocks.push("operator_true");
JavascriptTranslation["operator_true"] = function (jsonblock, utils, options) {
  return "true";
};

outputBlocks.push("operator_false");
JavascriptTranslation["operator_false"] = function (jsonblock, utils, options) {
  return "false";
};

outputBlocks.push("operator_nan");
JavascriptTranslation["operator_nan"] = function (jsonblock, utils, options) {
  return "NaN";
};

outputBlocks.push("operator_null");
JavascriptTranslation["operator_null"] = function (jsonblock, utils, options) {
  return "null";
};

outputBlocks.push("operator_infinity");
JavascriptTranslation["operator_infinity"] = function (
  jsonblock,
  utils,
  options,
) {
  return "Infinity";
};

outputBlocks.push("operator_empty_string");
JavascriptTranslation["operator_empty_string"] = function (
  jsonblock,
  utils,
  options,
) {
  return JSON.stringify("");
};

outputBlocks.push("operator_newline");
JavascriptTranslation["operator_newline"] = function (
  jsonblock,
  utils,
  options,
) {
  return JSON.stringify("\n");
};

//Rounding:

outputBlocks.push("operator_round");
JavascriptTranslation["operator_round"] = function (jsonblock, utils, options) {
  var NUM = utils.getInput(jsonblock, "NUM", options, "undefined");
  return `(Math.round(+(${NUM}) || 0))`;
};

//Converters:

outputBlocks.push("operator_tostring");
JavascriptTranslation["operator_tostring"] = function (
  jsonblock,
  utils,
  options,
) {
  var VALUE = utils.getInput(jsonblock, "VALUE", options, "undefined");
  return `"" + (${VALUE})`;
};

outputBlocks.push("operator_tonumber");
JavascriptTranslation["operator_tonumber"] = function (
  jsonblock,
  utils,
  options,
) {
  var VALUE = utils.getInput(jsonblock, "VALUE", options, "undefined");
  return `+(${VALUE})`;
};

outputBlocks.push("operator_toboolean");
JavascriptTranslation["operator_toboolean"] = function (
  jsonblock,
  utils,
  options,
) {
  var VALUE = utils.getInput(jsonblock, "VALUE", options, "undefined");
  return `!!(${VALUE})`;
};

outputBlocks.push("operator_joinstring");
JavascriptTranslation["operator_joinstring"] = function (
  jsonblock,
  utils,
  options,
) {
  var VALUE1 = utils.getInput(jsonblock, "VALUE1", options, "''");
  var VALUE2 = utils.getInput(jsonblock, "VALUE2", options, "''");
  return `(("" + (${VALUE1})) + ("" +(${VALUE2})))`;
};

outputBlocks.push("operator_stringlength");
JavascriptTranslation["operator_stringlength"] = function (
  jsonblock,
  utils,
  options,
) {
  var VALUE = utils.getInput(jsonblock, "VALUE", options, "''");
  return `(("" + (${VALUE})).length)`;
};

outputBlocks.push("operator_stringtrim");
JavascriptTranslation["operator_stringtrim"] = function (
  jsonblock,
  utils,
  options,
) {
  var VALUE = utils.getInput(jsonblock, "VALUE", options, "''");
  return `(("" + (${VALUE})).trim())`;
};

outputBlocks.push("operator_stringlowercase");
JavascriptTranslation["operator_stringlowercase"] = function (
  jsonblock,
  utils,
  options,
) {
  var VALUE = utils.getInput(jsonblock, "VALUE", options, "''");
  return `(("" + (${VALUE})).toLowerCase())`;
};

outputBlocks.push("operator_stringuppercase");
JavascriptTranslation["operator_stringuppercase"] = function (
  jsonblock,
  utils,
  options,
) {
  var VALUE = utils.getInput(jsonblock, "VALUE", options, "''");
  return `(("" + (${VALUE})).toUpperCase())`;
};

module.exports = JavascriptTranslation;


/***/ }),

/***/ 73:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var SpriteMasterConsts = __webpack_require__(1065);

var JavascriptTranslation = {};
var utilFunctions = __webpack_require__(9547);
var outputBlocks = __webpack_require__(7147);
var MYSELF_INPUT = JSON.stringify("__myself__");

outputBlocks.push("spritemaster_sprite");
JavascriptTranslation["spritemaster_sprite"] = function (
  jsonblock,
  utils,
  options,
) {
  var SPRITE = utils.getField(jsonblock, "SPRITE", options);
  return JSON.stringify(SPRITE);
};

outputBlocks.push("spritemaster_spriteobjectof");
JavascriptTranslation["spritemaster_spriteobjectof"] = function (
  jsonblock,
  utils,
  options,
) {
  var SPRITE = utils.getInput(jsonblock, "SPRITE", options, "null");
  if (SPRITE == MYSELF_INPUT) {
    return `sprite`;
  }
  return `spriteMaster.findSpriteByName(${SPRITE})`;
};

outputBlocks.push("spritemaster_spriteproperty");
JavascriptTranslation["spritemaster_spriteproperty"] = function (
  jsonblock,
  utils,
  options,
) {
  var SPRITE = utils.getInput(jsonblock, "SPRITE", options, "null");
  var PROPERTY_OPTION = utils.getField(
    jsonblock,
    "PROPERTY_OPTION",
    options,
    "",
  );
  var propertyCode = SpriteMasterConsts.SPRITE_MASTER_CODE[PROPERTY_OPTION];
  if (propertyCode) {
    if (SPRITE == MYSELF_INPUT) {
      return `sprite.${propertyCode}`;
    }
    var output = `(spriteMaster.getSpriteSafe(${SPRITE})).${propertyCode}`;
    return output;
  } else {
    return `(0)`;
  }
};

outputBlocks.push("spritemaster_getclonesofsprite");
JavascriptTranslation["spritemaster_getclonesofsprite"] = function (
  jsonblock,
  utils,
  options,
) {
  var SPRITE = utils.getInput(jsonblock, "SPRITE", options, "null");
  if (SPRITE == MYSELF_INPUT) {
    return `Array.from(sprite.clones)`;
  }
  return `(spriteMaster.getClonesOf(${SPRITE}))`;
};

outputBlocks.push("spritemaster_getclonecountofsprite");
JavascriptTranslation["spritemaster_getclonecountofsprite"] = function (
  jsonblock,
  utils,
  options,
) {
  var SPRITE = utils.getInput(jsonblock, "SPRITE", options, "null");
  if (SPRITE == MYSELF_INPUT) {
    return `sprite.clones.length`;
  }
  return `spriteMaster.getCloneCountOf(${SPRITE})`;
};

outputBlocks.push("spritemaster_checktouchingsprite_equals_propertyvalue");
JavascriptTranslation["spritemaster_checktouchingsprite_equals_propertyvalue"] =
  function (jsonblock, utils, options) {
    var SPRITE = utils.getInput(jsonblock, "SPRITE", options, "null");
    var VARIABLE = utils.getField(jsonblock, "VARIABLE", options, "null");
    var VALUE = utils.getInput(jsonblock, "VALUE", options, "null");
    if (SPRITE == MYSELF_INPUT) {
      return `true`;
    }
    return `spriteMaster.isTouchingSpriteWithPropertySet(${SPRITE}, ${JSON.stringify(VARIABLE)}, ${VALUE})`;
  };

module.exports = JavascriptTranslation;


/***/ }),

/***/ 269:
/***/ ((module) => {

var dialog = {
  styles: {
    //Container (Holds both background and dialog box)
    containerClassName: "windowDialogContainer",
    //Background
    backgroundClassName: "windowDialogBackground",
    //Dialog
    dialogClassName: "windowDialogBox",
    //Button
    buttonClassName: "windowDialogButton",
    //Header
    headerClassName: "windowDialogHeader",
    //Input (Where you type text)
    inputClassName: "windowDialogInput",
  },
  texts: {
    ok: "OK",
    cancel: "Cancel",
  },
  _createDialogBase() {
    var background = document.createElement("div");
    background.style.position = "fixed";
    background.style.top = "0";
    background.style.left = "0";
    background.style.width = "100vw";
    background.style.height = "100vh";
    background.style.opacity = "0.5";
    background.className = this.styles.backgroundClassName;

    var dialogBox = document.createElement("div");
    dialogBox.style.position = "fixed";
    dialogBox.style.top = "50%";
    dialogBox.style.left = "50%";
    dialogBox.style.transform = "translate(-50%, -50%)";
    dialogBox.style.width = "fit-content";
    dialogBox.style.height = "fit-content";
    dialogBox.style.padding = "20px";
    dialogBox.style.maxWidth = "500px";
    dialogBox.style.maxHeight = "300px";
    dialogBox.style.minWidth = "100px";
    dialogBox.style.minHeight = "100px";
    dialogBox.style.overflow = "auto";
    dialogBox.className = this.styles.dialogClassName;

    var dialogContainer = document.createElement("div");
    dialogContainer.style.zIndex = "100";
    dialogContainer.className = this.styles.containerClassName;
    dialogContainer.append(background);
    dialogContainer.append(dialogBox);

    return { background, dialogBox, dialogContainer };
  },
  _createButtonBase() {
    var button = document.createElement("div");
    button.className = this.styles.buttonClassName;
    button.style.width = "fit-content";
    button.style.height = "fit-content";
    button.style.minWidth = "30px";
    button.style.minHeight = "20px";
    button.style.padding = "4px";
    button.style.cursor = "pointer";
    button.style.display = "inline-block";
    button.style.margin = "2px 2px";
    button.style.fontWeight = "bold";

    return button;
  },
  _createHeaderBase() {
    var span = document.createElement("span");
    span.className = this.styles.headerClassName;

    return span;
  },
  _createColorInputBase() {
    var input = document.createElement("input");
    input.type = "color";

    return input;
  },
  _createBreakBase() {
    var br = document.createElement("br");
    return br;
  },
  _createTextInputBase() {
    var input = document.createElement("input");
    input.type = "text";
    input.className = this.styles.inputClassName;

    return input;
  },
  _appendHeaders(message, dialogBox) {
    var m = message.toString();
    for (var m of m.split("\n")) {
      var header = this._createHeaderBase();
      header.textContent = m;
      dialogBox.append(header);
      dialogBox.append(this._createBreakBase());
    }
  },
  displayButtonChooser: function (message, buttonTexts) {
    var { dialogBox, background, dialogContainer } = this._createDialogBase();

    dialogBox.focus();

    this._appendHeaders(message, dialogBox);

    document.body.append(dialogContainer);

    return new Promise((accept) => {
      buttonTexts.forEach((buttonText, index) => {
        var button = this._createButtonBase();
        button.textContent = buttonText;
        button.onclick = function () {
          dialogContainer.remove();
          accept(index);
        };
        dialogBox.append(button);
      });
    });
  },
  alertWithElement: function (element) {
    var { dialogBox, background, dialogContainer } = this._createDialogBase();

    dialogBox.focus();

    document.body.append(dialogContainer);

    dialogBox.append(element);

    var acceptButton = this._createButtonBase();
    acceptButton.textContent = this.texts.ok;
    dialogBox.append(acceptButton);

    return new Promise((accept) => {
      acceptButton.onclick = function () {
        accept();
        dialogContainer.remove();
      };
    });
  },
  alert: function (message) {
    var { dialogBox, background, dialogContainer } = this._createDialogBase();

    dialogBox.focus();

    document.body.append(dialogContainer);

    this._appendHeaders(message, dialogBox);

    var acceptButton = this._createButtonBase();
    acceptButton.textContent = this.texts.ok;
    dialogBox.append(acceptButton);

    return new Promise((accept) => {
      acceptButton.onclick = function () {
        accept();
        dialogContainer.remove();
      };
    });
  },
  prompt: function (message, defaultValue = "") {
    var { dialogBox, background, dialogContainer } = this._createDialogBase();

    dialogBox.focus();

    document.body.append(dialogContainer);

    this._appendHeaders(message, dialogBox);

    var input = this._createTextInputBase();
    input.value = defaultValue;
    dialogBox.append(input);

    dialogBox.append(this._createBreakBase());

    var acceptButton = this._createButtonBase();
    acceptButton.textContent = this.texts.ok;
    dialogBox.append(acceptButton);

    var cancelButton = this._createButtonBase();
    cancelButton.textContent = this.texts.cancel;
    dialogBox.append(cancelButton);

    return new Promise((accept) => {
      input.onkeydown = function (e) {
        if (e.key == "Enter") {
          e.preventDefault();
          acceptButton.click();
        }
      };
      acceptButton.onclick = function () {
        if (input.value.length < 1) {
          accept(undefined);
        } else {
          accept(input.value);
        }
        dialogContainer.remove();
      };
      cancelButton.onclick = function () {
        accept();
        dialogContainer.remove();
      };
    });
  },
  confirm: function (message) {
    var { dialogBox, background, dialogContainer } = this._createDialogBase();

    dialogBox.focus();

    document.body.append(dialogContainer);

    this._appendHeaders(message, dialogBox);

    var acceptButton = this._createButtonBase();
    acceptButton.textContent = this.texts.ok;
    dialogBox.append(acceptButton);

    var cancelButton = this._createButtonBase();
    cancelButton.textContent = this.texts.cancel;
    dialogBox.append(cancelButton);

    return new Promise((accept) => {
      acceptButton.onclick = function () {
        accept(true);
        dialogContainer.remove();
      };
      cancelButton.onclick = function () {
        accept(false);
        dialogContainer.remove();
      };
    });
  },
  colorPrompt: function (message) {
    var { dialogBox, background, dialogContainer } = this._createDialogBase();

    dialogBox.focus();

    document.body.append(dialogContainer);

    this._appendHeaders(message, dialogBox);

    var colorInput = this._createColorInputBase();
    dialogBox.append(colorInput);

    dialogBox.append(this._createBreakBase());

    var acceptButton = this._createButtonBase();
    acceptButton.textContent = this.texts.ok;
    dialogBox.append(acceptButton);

    var cancelButton = this._createButtonBase();
    cancelButton.textContent = this.texts.cancel;
    dialogBox.append(cancelButton);

    return new Promise((accept) => {
      acceptButton.onclick = function () {
        accept(colorInput.value);
        dialogContainer.remove();
      };
      cancelButton.onclick = function () {
        accept();
        dialogContainer.remove();
      };
    });
  },
  passwordPrompt: function (message) {
    var { dialogBox, background, dialogContainer } = this._createDialogBase();

    dialogBox.focus();

    document.body.append(dialogContainer);

    this._appendHeaders(message, dialogBox);

    var input = this._createTextInputBase();
    input.type = "password";
    dialogBox.append(input);

    dialogBox.append(this._createBreakBase());

    var acceptButton = this._createButtonBase();
    acceptButton.textContent = this.texts.ok;
    dialogBox.append(acceptButton);

    var cancelButton = this._createButtonBase();
    cancelButton.textContent = this.texts.cancel;
    dialogBox.append(cancelButton);

    return new Promise((accept) => {
      input.onkeydown = function (e) {
        if (e.key == "Enter") {
          e.preventDefault();
          acceptButton.click();
        }
      };
      acceptButton.onclick = function () {
        if (input.value.length < 1) {
          accept(undefined);
        } else {
          accept(input.value);
        }
        dialogContainer.remove();
      };
      cancelButton.onclick = function () {
        accept();
        dialogContainer.remove();
      };
    });
  },
};

module.exports = dialog;


/***/ }),

/***/ 425:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var VERTEX_SHADER = (__webpack_require__(3202)/* ["default"] */ .A);
var FRAGMENT_SHADER_OG = (__webpack_require__(5411)/* ["default"] */ .A);

var FRAGMENT_SHADER = `
#define ENABLE_ghost
#define ENABLE_wavy
#define ENABLE_ribbon
#define ENABLE_brightness
${FRAGMENT_SHADER_OG}
`;

module.exports = {
  VERTEX_SHADER,
  FRAGMENT_SHADER,
};


/***/ }),

/***/ 640:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var { blockToJSON, workspaceToJSON } = __webpack_require__(1246);
var JavascriptTranslation = __webpack_require__(4943);
var StarterBlocks = __webpack_require__(8355);
var outputBlocks = __webpack_require__(7147);
var utilFunctions = __webpack_require__(9547);

function getInput(blockJson, name, options, fallback) {
  if (typeof fallback === "undefined") {
    fallback = "null";
  }

  for (var input of blockJson.inputs) {
    if (input.name == name) {
      var compiled = compileBlockFromJSON(input.block, options);
      return compiled && compiled.trim() !== "" ? compiled : fallback;
    }
  }

  return fallback;
}
function getInputBlock(blockJson, name, options) {
  for (var input of blockJson.inputs) {
    if (input.name == name) {
      return input.block;
    }
  }
  return null;
}
function getField(blockJson, name, options, fallback) {
  for (var field of blockJson.fields) {
    if (field.name == name) {
      return field.value;
    }
  }
  return fallback || null;
}
function getFieldText(blockJson, name, options) {
  for (var field of blockJson.fields) {
    if (field.name == name) {
      return field.text;
    }
  }
  return null;
}
function getFieldVariableID(blockJson, name, options) {
  for (var field of blockJson.fields) {
    if (field.name == name) {
      return field.variable.id;
    }
  }
  return null;
}

function compileBlockFromJSON(json, options = {}) {
  if (JavascriptTranslation[json.type]) {
    var output = JavascriptTranslation[json.type](
      json,
      {
        getInput,
        getField,
        getFieldVariableID,
        getInputBlock,
        getFieldText,
      },
      options,
    );
    if ("function" === typeof output) {
      if (json.next) {
        return output(compileBlockFromJSON(json.next, options));
      } else {
        return output("");
      }
    }
  } else {
    console.warn(
      "Unable to compile block " +
        json.type +
        " because it doesn't exist in the translator.",
    );
    var output = "";
  }
  if (json.next) {
    output += compileBlockFromJSON(json.next, options);
  }
  return output;
}

function compileBlock(block, options) {
  if (isStarterBlock(block)) {
    return compileBlockFromJSON(blockToJSON(block), options);
  } else {
    return "";
  }
}

function compileBlockWithThreadForced(block, options) {
  var blockjson = blockToJSON(block);
  if (isOutputBlock(block)) {
    return (
      utilFunctions.startThreadStack(blockjson) +
      "thread.isPreviewMode = true;" +
      `thread.output = ${compileBlockFromJSON(blockjson)};` +
      utilFunctions.endThreadStack(blockjson) +
      "return thread;"
    );
  }
  return (
    utilFunctions.startThreadStack(blockjson) +
    "thread.isPreviewMode = true;" +
    compileBlockFromJSON(blockToJSON(block), {
      ...options,
      EXECUTE_BLOCKS: true,
    }) +
    utilFunctions.endThreadStack(blockjson)
  );
}

function isStarterBlock(block) {
  var json = blockToJSON(block);
  return StarterBlocks.indexOf(json.type) !== -1;
}

function isOutputBlock(block) {
  var json = blockToJSON(block);
  return outputBlocks.indexOf(json.type) !== -1;
}

module.exports = {
  compileBlock,
  isStarterBlock,
  isOutputBlock,
  compileBlockWithThreadForced,
};


/***/ }),

/***/ 735:
/***/ ((module) => {

module.exports = ":root {\n  --game-viewport-width: 640px;\n  --game-viewport-height: 360px;\n  --game-viewport-scale: 1;\n\n  /*windowDialogContainer*/\n  --popup-dialog-font: \"arial\";\n  /*windowDialogBox*/\n  --popup-dialog-background: hsl(0deg, 0%, 100%);\n  --popup-dialog-border-radius: 10px;\n  --popup-dialog-text-color: hsl(0deg, 0%, 0%);\n  /*windowDialogButton*/\n  --popup-dialog-button-background: hsl(224, 100%, 67%);\n  --popup-dialog-button-hover-background: hsl(224, 100%, 63%);\n  --popup-dialog-button-text-color: hsl(0deg, 0%, 100%);\n  --popup-dialog-button-radius: 5px;\n  /*windowDialogInput*/\n  --popup-dialog-input-background: hsl(0deg, 0%, 100%);\n  --popup-dialog-input-border-width: 1.5px;\n  --popup-dialog-input-border-color: hsl(0deg, 0%, 73%);\n  --popup-dialog-input-text-color: hsl(0deg, 0%, 0%);\n  /*windowDialogHeader*/\n  --popup-dialog-message-size: 16px;\n\n  --loader2-time: 2.5s;\n}\n\n.windowDialogContainer {\n  font-family: var(--popup-dialog-font);\n}\n.windowDialogBackground {\n  background: hsl(0deg, 0%, 0%);\n  z-index: 999999999999;\n}\n.windowDialogBox {\n  background: var(--popup-dialog-background);\n  border-radius: var(--popup-dialog-border-radius);\n  color: var(--popup-dialog-text-color);\n  z-index: 999999999999;\n}\n.windowDialogButton {\n  background: var(--popup-dialog-button-background);\n  color: var(--popup-dialog-button-text-color);\n  border-radius: var(--popup-dialog-button-radius);\n}\n.windowDialogButton:hover {\n  background: var(--popup-dialog-button-hover-background);\n}\n.windowDialogInput {\n  background: var(--popup-dialog-input-background);\n  border-style: solid;\n  border-width: var(--popup-dialog-input-border-width);\n  border-color: var(--popup-dialog-input-border-color);\n  color: var(--popup-dialog-input-text-color);\n  outline: none;\n}\n.windowDialogHeader {\n  font-weight: bold;\n  font-size: var(--popup-dialog-message-size);\n}\n\nbody {\n  font-family: arial;\n}\n\n.appContainer {\n  background: #363636;\n  width: 100%;\n  height: 100svh;\n  position: fixed;\n  top: 0;\n  left: 0;\n  overflow: auto;\n}\n\n.blocklyDiv {\n  width: 100%;\n  height: 100%;\n}\n\n.menuBar {\n  display: flex;\n  width: 100%;\n  min-height: 50px;\n  background: #525252;\n  overflow: unset;\n  transition: 0.2s;\n  flex-direction: row;\n}\n\n.menuBarItemLogo {\n  all: unset;\n  width: fit-content;\n  height: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  user-select: none;\n  padding: 0 10px;\n}\n\n.menuBarItemLogoImg {\n  height: 30px;\n}\n\n.menuBarItem {\n  all: unset;\n  color: #ffffff;\n  height: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  user-select: none;\n  padding: 0 8px;\n  font-weight: bold;\n}\n\n.unclickableMenuBarItem {\n  all: unset;\n  color: #ffffff;\n  height: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  user-select: none;\n  padding: 0 8px;\n  font-weight: bold;\n}\n\n.menuBarItem:hover {\n  background: #363636;\n  cursor: pointer;\n}\n\n/* Dropdown menu styles */\n.menuBarMenus {\n  display: flex;\n  align-items: center;\n  flex-direction: row;\n}\n.menuParentMain {\n}\n.menuParent {\n  position: relative;\n  display: flex;\n  align-items: center;\n  padding: 0 8px;\n  z-index: 9999;\n  cursor: unset;\n  width: fit-content;\n}\n.menuBarItemLabel {\n  color: #ffffff;\n  font-weight: bold;\n  user-select: none;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 3px;\n}\n.menuParent.open > .menuBarItemLabel {\n  color: #ffffff;\n}\n.menuDropdown {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  background: #444444;\n  min-width: 160px;\n  border-radius: 6px;\n  box-shadow: 0 6px 14px rgba(0,0,0,0.3);\n  z-index: 9999;\n  display: block; /* hidden attribute controls visibility */\n  cursor: unset;\n}\n.menuDropdownItem {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 8px;\n  color: #ffffff;\n  border-radius: 4px;\n  user-select: none;\n}\n.menuDropdownItem:hover {\n  background: #5a5a5a;\n  cursor: pointer;\n  box-sizing: border-box;\n}\n.menuIcon {\n  width: 16px;\n  height: 16px;\n  object-fit: contain;\n}\n.menuDropdownItemLabel {\n  color: #ffffff;\n}\n\n.panelContainer {\n  display: flex;\n  flex-direction: row;\n  width: 100svw;\n  height: calc(100svh - 50px);\n  position: absolute;\n  top: 50px;\n  left: 0px;\n  min-height: 500px;\n}\n\n.leftPanel {\n  height: calc(100svh - 50px);\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  min-width: 0;\n}\n\n.rightPanel {\n  width: fit-content;\n  height: calc(100svh - 50px);\n  overflow: auto;\n  box-sizing: border-box;\n  flex-grow: 0;\n  flex-shrink: 0;\n}\n\n.rightPanelContent {\n  width: fit-content;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  min-height: 700px;\n  box-sizing: border-box;\n  position: relative;\n}\n\n.projectControls {\n  width: 100%;\n  height: 200px;\n}\n\n.projectCanvas {\n  background: #ffffff;\n  border-radius: 4px;\n  flex-shrink: 0;\n  flex-grow: 0;\n  width: calc(var(--game-viewport-width) * var(--game-viewport-scale));\n  height: calc(var(--game-viewport-height) * var(--game-viewport-scale));\n}\n\n.tabArea {\n  display: flex;\n  flex-grow: 0;\n  flex-shrink: 0;\n  height: fit-content;\n  width: 100%;\n  overflow-x: auto;\n  overflow-y: hidden;\n}\n\n.tabIcon {\n  height: 20px;\n  width: 20px;\n  object-fit: contain;\n  margin-right: 5px;\n}\n\n.tabButton {\n  all: unset;\n  color: #c7c7c7;\n  width: fit-content;\n  height: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  user-select: none;\n  padding: 0 8px;\n  font-weight: bold;\n  flex-grow: 0;\n  transform: translateY(5px);\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n}\n\n.tabButton:hover {\n  background: #8f8f8f;\n  cursor: pointer;\n  color: #ffffff;\n  transform: translateY(4px);\n}\n\n.tabButton[selected] {\n  background: #8f8f8f;\n  cursor: unset;\n  color: #ffffff;\n  transform: translateY(0px);\n}\n\n.tabWindow {\n  background: #8f8f8f;\n  flex-grow: 1;\n  width: 100%;\n  color: #000000;\n  display: flex;            /* <-- CHANGED */\n  flex-direction: column;   /* <-- ADDED */\n  min-height: 0;            /* <-- ADDED (crucial for containing flex) */\n}\n\n.selectedSpriteContainer {\n  min-width: 100%;\n  max-width: calc(var(--game-viewport-scale) * var(--game-viewport-width));\n  box-sizing: border-box;\n  border-width: 5px;\n  border-style: solid;\n  border-color: black;\n  border-radius: 4px;\n  min-height: 30px;\n  height: fit-content;\n  display: flex;\n  padding: 4px 4px;\n  flex-shrink: 0;\n  flex-grow: 0;\n  flex-wrap: wrap;\n  overflow: auto;\n}\n\n.spritesContainer {\n  width: 100%;\n  box-sizing: border-box;\n  border-width: 5px;\n  border-style: solid;\n  border-color: black;\n  border-radius: 4px;\n  display: flex;\n  flex-direction: column;\n  overflow: auto;\n  flex-grow: 1;\n}\n\n.spriteContainer {\n  width: 100%;\n  height: fit-content;\n  box-sizing: border-box;\n  border-radius: 5px;\n  display: flex;\n  padding: 7px 7px;\n  flex-direction: row;\n  flex-grow: 0;\n  flex-shrink: 0;\n  color: white;\n  font-weight: bold;\n  font-size: 20px;\n  user-select: none;\n  align-items: center;\n}\n\n.spriteTextContainer {\n  width: 200px;\n  text-wrap: wrap;\n  line-break: anywhere;\n}\n\n.spriteContainer[selected] {\n  background: #525252;\n}\n\n.selectedSpriteLabel {\n  color: white;\n  font-weight: bold;\n}\n.selectedSpriteInput {\n  all: unset;\n  padding: 3px 3px;\n  box-sizing: border-box;\n  width: fit-content;\n  color: white;\n  width: 100px;\n  border-radius: 2px;\n  background: #595959;\n}\n\n.costumesContainer {\n  width: 100%;\n  /* height: 100%; */  /* <-- REMOVE THIS */\n  flex-grow: 1;         /* <-- ADD THIS */\n  min-height: 0;        /* <-- ADD THIS */\n  display: flex;\n  flex-direction: column;\n  color: white;\n}\n\n.soundsContainer {\n  width: 100%;\n  /* height: 100%; */  /* <-- REMOVE THIS */\n  flex-grow: 1;         /* <-- ADD THIS */\n  min-height: 0;        /* <-- ADD THIS */\n  display: flex;\n  flex-direction: column;\n  color: white;\n}\n\n.costumePivotContainer {\n  width: 100%;\n  /* height: 100%; */  /* <-- REMOVE THIS */\n  flex-grow: 1;         /* <-- ADD THIS */\n  min-height: 0;        /* <-- ADD THIS */\n  display: flex;\n  flex-direction: row;\n  color: white;\n}\n\n.costumesInPivotContainer {\n  width: fit-content;\n  height: 100%; /* <-- This is OK now */\n  flex-grow: 0;\n  flex-shrink: 0;\n  overflow: auto; /* <-- This will now activate */\n  overflow-anchor: none;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.pivotCostumeButton {\n  min-width: 100px;\n  min-height: 100px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  box-sizing: border-box;\n  padding: 4px 4px;\n  border-radius: 10px;\n  border-width: 2px;\n  border-style: solid;\n  border-color: #000000;\n  margin: 2px;\n  user-select: none;\n  font-weight: bold;\n}\n\n.pivotCostumeButton:hover {\n  border-color: rgb(121, 121, 121);\n  cursor: pointer;\n}\n.pivotCostumeButton[selected] {\n  border-color: #ffffff;\n  cursor: unset;\n}\n\n.pivotEditor {\n  flex-grow: 1;\n  background: #212121;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 1;  /* <-- 1. ALLOWS this element to shrink */\n  min-width: 0;      /* <-- 2. THE KEY: Allows it to shrink smaller than its content */\n  overflow: hidden;    /* <-- 3. Prevents children from spilling out */\n  position: relative;\n}\n\n.pivotEditorMenuBar {\n  flex-grow: 0;\n  flex-shrink: 0;\n  height: 64px;\n  width: 100%;\n  display: flex;      /* <-- Puts all items in one horizontal row */\n  overflow-x: auto;   /* <-- Adds horizontal scroll */\n  overflow-y: hidden; /* <-- Prevents vertical scroll */\n  align-items: center;\n}\n\n.pivotEditorMenuBar > * {\n  flex-shrink: 0;\n}\n\n.pivotEditorContainer {\n  flex-grow: 1;\n  position: relative;\n  overflow: auto;\n}\n\n.pivotEditorImageContainer {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: fit-content;\n  height: fit-content;\n  display: block;\n  background-image: url(editor/transparent.png);\n  background-size: 32px;\n  image-rendering: pixelated;\n}\n\n.pivotEditorMenuInput {\n  all: unset;\n  color: #ffffff;\n  font-weight: bold;\n  height: 100%;\n  box-sizing: border-box;\n}\n\n.pivotEditorDot {\n  background: #000000;\n  border-style: solid;\n  border-color: #ffffff;\n  box-sizing: border-box;\n  border-width: 2px;\n  border-radius: 50%;\n  width: 10px;\n  height: 10px;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  transform: translate(-50%, -50%);\n  opacity: 0.5;\n}\n\n.costumesHeaderContainer {\n  width: 100%;\n  display: block;\n  flex-grow: 0;\n  flex-shrink: 0;\n  height: fit-content;\n  box-sizing: border-box;\n  padding: 5px 5px;\n}\n\n.soundsHeaderContainer {\n  width: 100%;\n  display: block;\n  flex-grow: 0;\n  flex-shrink: 0;\n  height: fit-content;\n  box-sizing: border-box;\n  padding: 5px 5px;\n}\n\n.costumesSelectorContainer {\n  display: flex;\n  flex-direction: column;\n  overflow: auto;\n  overflow-anchor: none;\n  flex-grow: 1;\n}\n\n.soundsSelectorContainer {\n  display: flex;\n  flex-direction: column;\n  overflow: auto;\n  flex-grow: 1;\n}\n\n.costumeContainer {\n  width: 100%;\n  height: fit-content;\n  box-sizing: border-box;\n  border-radius: 5px;\n  display: flex;\n  padding: 7px 7px;\n  flex-grow: 0;\n  flex-shrink: 0;\n  color: white;\n  font-weight: bold;\n  font-size: 20px;\n  user-select: none;\n  align-items: center;\n}\n\n.soundContainer {\n  width: 100%;\n  height: fit-content;\n  box-sizing: border-box;\n  border-radius: 5px;\n  display: flex;\n  padding: 7px 7px;\n  flex-grow: 0;\n  flex-shrink: 0;\n  color: white;\n  font-weight: bold;\n  font-size: 20px;\n  user-select: none;\n  align-items: center;\n  flex-direction: column;\n}\n\n.greyButtonStyle {\n  all: unset;\n  background: #6e6e6e;\n  color: white;\n  border-radius: 10px;\n  padding: 7px 7px;\n  box-sizing: border-box;\n  width: fit-content;\n  height: fit-content;\n  font-weight: bold;\n}\n\n.greyButtonStyle:hover {\n  background: #b8b8b8;\n  cursor: pointer;\n}\n\n.selectedCostumeInput {\n  all: unset;\n  padding: 3px 3px;\n  box-sizing: border-box;\n  width: 140px;\n  color: white;\n}\n\n.scratchCategoryMenuItemLabel {\n  color: white;\n}\n\n.projectControls {\n  background: #8f8f8f;\n  border-radius: 5px;\n  width: 100%;\n  flex-grow: 0;\n  flex-shrink: 0;\n  height: fit-content;\n  display: flex;\n}\n\n.projectButton {\n  padding: 5px;\n  font-size: 20px;\n  user-select: none;\n  margin-right: 2px;\n  border-radius: 5px;\n  min-width: 20px;\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.projectButtonImg {\n  height: 20px;\n  width: 20px;\n  object-fit: contain;\n}\n\n.projectButton:hover {\n  cursor: pointer;\n  color: white;\n  background-color: rgba(0,0,0,0.5);\n}\n\n.spriteInputContainer {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 4px;\n  box-sizing: border-box;\n  border-radius: 5px;\n  background: #8f8f8f;\n  margin: 3px;\n}\n\n.projectMouseCoordinates {\n  color: white;\n  font-size: 10px;\n  font-weight: bold;\n}\n\n.addSpriteButton {\n  position: absolute;\n  bottom: 10px;\n  right: 10px;\n}\n\n.spriteAddMenu {\n  position: absolute;\n  bottom: 65px;\n  right: 10px;\n  background: #8f8f8f;\n  border-radius: 5px;\n  display: flex;\n  flex-direction: column;\n  padding: 1px;\n  box-sizing: border-box;\n  gap: 2px;\n}\n\n.spriteAddMenuItem {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  padding: 5px;\n  border-radius: 5px;\n  color: white;\n  font-weight: bold;\n  user-select: none;\n  font-size: 17px;\n  cursor: default;\n}\n\n.spriteAddMenuItem:hover {\n  cursor: pointer;\n  background: rgba(0,0,0,0.5);\n}\n\n.spriteAddMenuItem > img {\n  width: 23px;\n  height: 23px;\n  object-fit: contain;\n}\n\n.customBlockDialogBG {\n  position: fixed;\n  width: 100svw;\n  height: 100svh;\n  top: 0;\n  left: 0;\n  background: rgba(0, 0, 0, 0.5);\n}\n.customBlockDialogBox {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  border-radius: 10px;\n  box-sizing: border-box;\n  background: #5c5c5c;\n  transform: translate(-50%, -50%);\n  padding: 10px 10px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  max-width: calc(100% - 100px);\n  max-height: calc(100% - 50px);\n  overflow: auto;\n  color: #ffffff;\n}\n.customBlockWorkspace {\n  flex-grow: 1;\n  display: block;\n  min-width: calc(100% - 1px);\n  min-height: 100%;\n  max-width: 100%;\n  max-height: 100%;\n}\n\n.customBlockButtons {\n  flex-grow: 0;\n  flex-shrink: 0;\n  display: flex;\n  width: 100%;\n  align-items: center;\n  justify-content: center;\n}\n\n.loadingDialogBG {\n  background: #363636;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100svw;\n  height: 100svh;\n  z-index: 99999999;\n}\n\n.loadingDialogBox {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  align-items: center;\n  z-index: 99999999;\n  font-weight: bold;\n  justify-content: center;\n  display: flex;\n  flex-direction: column;\n  color: #ffffff;\n}\n\n.loader2Container {\n  width: 120px;\n  height: 120px;\n  position: relative;\n}\n\n.loaderBlock1 {\n  animation-name: loaderBlock1Anim;\n  animation-duration: var(--loader2-time);\n    background-image: url(\"loading/blocks1.svg\");\n}\n\n.loaderBlock3 {\n  animation-name: loaderBlock3Anim;\n  animation-duration: var(--loader2-time);\n  background-image: url(\"loading/blocks3.svg\");\n}\n\n.loaderBlock2 {\n  animation-name: loaderBlock2Anim;\n  animation-duration: var(--loader2-time);\n  background-image: url(\"loading/blocks2.svg\");\n}\n\n.loaderBlockIcon {\n  animation-name: loaderBlockIconAnim;\n  animation-duration: var(--loader2-time);\n  background-image: url(\"loading/three.svg\");\n}\n\n.loaderBlock {\n  width: 120px;\n  height: 120px;\n  animation-iteration-count: infinite;\n\n  position: absolute;\n  top: 0;\n  left: 0;\n\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: 100% 100%;\n  transform-origin: bottom;\n\n  filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.25));\n}\n\n@keyframes loaderBlock1Anim {\n  0% {\n    transform: translate(0, -50%) scale(1, 1);\n    animation-timing-function: ease-out;\n    opacity: 0;\n  }\n  10% {\n    transform: translate(0, 0) scale(1, 1);\n    animation-timing-function: ease-out;\n    opacity: 1;\n  }\n  15% {\n    transform: translate(0, 0) scale(1, 1);\n    animation-timing-function: ease-out;\n    opacity: 1;\n  }\n  85% {\n    transform: translate(0, 0) scale(1, 1);\n    animation-timing-function: ease-out;\n    opacity: 1;\n  }\n  100% {\n    transform: translate(0, -50%) scale(1, 1);\n    animation-timing-function: ease-out;\n    opacity: 0;\n  }\n}\n\n@keyframes loaderBlock3Anim {\n  0% {\n    transform: translate(0, 50%) scale(1, 1);\n    animation-timing-function: ease-out;\n    opacity: 0;\n  }\n  20% {\n    transform: translate(0, 50%) scale(1, 1);\n    animation-timing-function: ease-out;\n    opacity: 0;\n  }\n  30% {\n    transform: translate(0, 0) scale(1, 1);\n    animation-timing-function: ease-out;\n    opacity: 1;\n  }\n  70% {\n    transform: translate(0, 0) scale(1, 1);\n    animation-timing-function: ease-out;\n    opacity: 1;\n  }\n  100% {\n    transform: translate(0, 50%) scale(1, 1);\n    animation-timing-function: ease-out;\n    opacity: 0;\n  }\n}\n\n@keyframes loaderBlock2Anim {\n  0% {\n    transform: translate(0, 0) scale(2, 2);\n    animation-timing-function: ease-out;\n    opacity: 0;\n    transform-origin: center;\n  }\n  40% {\n    transform: translate(0, 0) scale(2, 2);\n    animation-timing-function: ease-out;\n    opacity: 0;\n    transform-origin: center;\n  }\n  45% {\n    transform: translate(0, 0) scale(1, 1);\n    animation-timing-function: ease-out;\n    opacity: 1;\n    transform-origin: center;\n  }\n  85% {\n    transform: translate(0, 0) scale(1, 1);\n    animation-timing-function: ease-out;\n    opacity: 1;\n    transform-origin: center;\n  }\n  100% {\n    transform: translate(0, 0) scale(2, 2);\n    animation-timing-function: ease-out;\n    opacity: 0;\n    transform-origin: center;\n  }\n}\n\n@keyframes loaderBlockIconAnim {\n  0% {\n    transform: translate(0, 0) scale(1, 1);\n    animation-timing-function: ease-out;\n  }\n  45% {\n    transform: translate(0, 0) scale(1, 1);\n    animation-timing-function: ease-out;\n    transform-origin: center;\n  }\n  60% {\n    transform-origin: center;\n    transform: translate(0, 0) scale(1.2, 1.2) rotate(360deg);\n    animation-timing-function: ease-in;\n    filter: drop-shadow(4px 4px 8px rgba(0, 255, 13, 1));\n  }\n  75% {\n    transform-origin: center;\n    transform: translate(0, 0) scale(1, 1) rotate(360deg);\n    animation-timing-function: ease-out;\n  }\n  100% {\n    transform: translate(0, 0) scale(1, 1) rotate(360deg);\n    animation-timing-function: ease-out;\n  }\n}\n\n.errorLogsContainer {\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n  padding: 10px 10px;\n  display: flex;\n  flex-direction: column;\n  color: #ffffff;\n  background-color: #000000;\n  overflow: auto;\n}\n\n.errorLogError {\n  color: #ff4c4c;\n  font-weight: bold;\n  margin-bottom: 2px;\n}\n\n/* Error glow is provided via the workspace SVG filter; keep a minimal\n   class so we can target blocks in case the filter can't be applied. */\n.blocklyBlockSvg.error-glow {\n  /* Prefer the workspace SVG filter for the glow; keep a harmless\n     property so linters don't complain about an empty ruleset. */\n  outline: none;\n}\n\n.fullscreenModeContainerMain {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100svw;\n  height: 100svh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  background: #363636;\n  z-index: 99999999;\n}\n\n.fullscreenModeContainer {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.blocklyFlyoutLabelText {\n  fill: #ffffff;\n}\n\n.blocklyFlyoutButton .blocklyText {\n  fill: #ffffff;\n}\n\n.blocklyFlyoutButton:hover {\n  cursor: pointer;\n  fill: rgba(0,0,0,0.5);\n}\n\n.blocklyFlyoutButton:hover > .blocklyText {\n  font-weight: bold;\n}\n\n.loadingProgressMain {\n  width: 200px;\n  height: 30px;\n  box-sizing: border-box;\n  background: rgba(255, 255, 255, 0.3);\n  border-style: solid;\n  border-radius: 3px;\n  border-width: 3px;\n  border-color: rgba(0, 0, 0, 0.7);\n}\n.loadingProgressInner {\n  height: 100%;\n  background: rgba(255, 255, 255, 0.5);\n}\n\n.dialogBackground {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100svw;\n  height: 100svh;\n  background-color: rgba(0, 0, 0, 0.5); /* Optional: semi-transparent background */\n  backdrop-filter: blur(2px); /* The blur effect */\n  -webkit-backdrop-filter: blur(2px); /* For Safari */\n}\n\n.gameSettingsBox {\n  background: rgb(49, 49, 49);\n  color: rgb(255, 255, 255);\n  padding: 3px 3px;\n  box-shadow: 0 0px 30px rgb(0, 0, 0);\n  border-radius: 5px;\n  box-sizing: border-box;\n\n  overflow-y: auto;\n  width: calc(100svw - 100px);\n  height: calc(100svh - 100px);\n\n  display: flex;\n  flex-direction: column;\n}\n\n.gameSettingSelection {\n  display: flex;\n  flex-direction: row;\n  flex-grow: 0;\n  flex-shrink: 0;\n  height: fit-content;\n  width: 100%;\n  overflow: auto;\n  gap: 2px;\n}\n\n.gameSelectionCategory {\n  display: block;\n  flex-direction: row;\n  flex-grow: 1;\n  width: 100%;\n  overflow: auto;\n}\n\n.centerMiddle {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.infoDiv {\n\twidth: 100%;\n\theight: fit-content;\n\tmin-height: 70px;\n\tbackground: rgba(0,0,0,0.5);\n\tmargin-bottom:2px;\n\tmargin-top:2px;\n\tborder-radius: 10px;\n  padding: 5px 10px;\n  box-sizing: border-box;\n  display: block;\n}\n\n.gameBackupBox {\n  background: rgb(49, 49, 49);\n  color: rgb(255, 255, 255);\n  padding: 3px 3px;\n  box-shadow: 0 0px 30px rgb(0, 0, 0);\n  border-radius: 5px;\n  box-sizing: border-box;\n\n  overflow-y: auto;\n  width: calc(100svw - 100px);\n  height: calc(100svh - 100px);\n\n  display: flex;\n  flex-direction: column;\n}\n\n.gameBackupSelection {\n  display: flex;\n  flex-direction: row;\n  flex-grow: 0;\n  flex-shrink: 0;\n  height: fit-content;\n  width: 100%;\n  overflow: auto;\n  gap: 2px;\n}\n\n.gameBackupCategory {\n  display: block;\n  flex-direction: row;\n  flex-grow: 1;\n  width: 100%;\n  overflow: auto;\n}\n\n.backupThumbnail {\n  height: 150px;\n  object-fit: contain;\n  border-radius: 10px;\n  user-select: none;\n  pointer-events: none;\n}\n\n.backupEntry {\n  display: flex;\n  padding: 5px;\n  box-sizing: border-box;\n  border-radius: 5px;\n  background: #8f8f8f;\n  margin: 3px;\n  color: white;\n  font-weight: bold;\n  flex-direction: row;\n  align-items: center;\n  gap: 8px;\n}\n\n.backupTimestamp {\n  font-size: 20px;\n  color: #c7c7c7;\n}\n\n.backupNoticeMenuBarItem {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: row;\n  gap: 3px;\n  flex-wrap: none;\n  font-size: 9px;\n}";

/***/ }),

/***/ 758:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var JavascriptTranslation = {};
var utilFunctions = __webpack_require__(9547);
var starterBlocks = __webpack_require__(8355);
starterBlocks.push("event_whengamestarts"); //When game starts is a on-event block.
JavascriptTranslation["event_whengamestarts"] = function (
  jsonblock,
  utils,
  options,
) {
  return function (insideCode) {
    if (options.EXECUTE_BLOCKS) {
      //Means ONLY execute blocks, don't add listeners to the sprite.
      return `${insideCode}`;
    } else {
      return `sprite.addStackListener(
        "started",
        ${JSON.stringify(jsonblock.id)},
        async function () {
        ${utilFunctions.startThreadStack(jsonblock)}
        ${insideCode}
        ${utilFunctions.endThreadStack(jsonblock)}
      });`;
    }
  };
};
starterBlocks.push("event_beforegamestarts"); //When game starts is a on-event block.
JavascriptTranslation["event_beforegamestarts"] = function (
  jsonblock,
  utils,
  options,
) {
  return function (insideCode) {
    if (options.EXECUTE_BLOCKS) {
      //Means ONLY execute blocks, don't add listeners to the sprite.
      return `${insideCode}`;
    } else {
      return `sprite.addStackListener(
        "beforestart",
        ${JSON.stringify(jsonblock.id)},
        async function () {
        ${utilFunctions.startThreadStack(jsonblock)}
        ${insideCode}
        ${utilFunctions.endThreadStack(jsonblock)}
      });`;
    }
  };
};

starterBlocks.push("event_ggm3_whenbroadcasted");
JavascriptTranslation["event_ggm3_whenbroadcasted"] = function (
  jsonblock,
  utils,
  options,
) {
  var BROADCAST_NAME = utils.getField(jsonblock, "BROADCAST_NAME", options);
  return function (insideCode) {
    if (options.EXECUTE_BLOCKS) {
      //Means ONLY execute blocks, don't add listeners to the sprite.
      return `${insideCode}`;
    } else {
      return `sprite.addBroadcastListener(
        ${JSON.stringify(BROADCAST_NAME)},
        ${JSON.stringify(jsonblock.id)},
        async function () {
        ${utilFunctions.startThreadStack(jsonblock)}
        ${insideCode}
        ${utilFunctions.endThreadStack(jsonblock)}
      });`;
    }
  };
};

JavascriptTranslation["event_ggm3_broadcast"] = function (
  jsonblock,
  utils,
  options,
) {
  var BROADCAST_NAME = utils.getInput(
    jsonblock,
    "BROADCAST_NAME",
    options,
    "undefined",
  );
  return `engine.broadcast("" + (${BROADCAST_NAME}));`;
};

JavascriptTranslation["event_ggm3_broadcast_and_wait"] = function (
  jsonblock,
  utils,
  options,
) {
  var BROADCAST_NAME = utils.getInput(
    jsonblock,
    "BROADCAST_NAME",
    options,
    "undefined",
  );
  return `${utilFunctions.aliveCheck()}await engine.broadcastAndWait("" + (${BROADCAST_NAME}));${utilFunctions.aliveCheck()}`;
};

JavascriptTranslation["event_ggm3_frame_broadcast"] = function (
  jsonblock,
  utils,
  options,
) {
  var BROADCAST_NAME = utils.getInput(
    jsonblock,
    "BROADCAST_NAME",
    options,
    "undefined",
  );
  return `engine.broadcastOnNextFrame("" + (${BROADCAST_NAME}));`;
};

JavascriptTranslation["event_ggm3_broadcast_menu"] = function (
  jsonblock,
  utils,
  options,
) {
  var BROADCAST_NAME = utils.getField(jsonblock, "BROADCAST_NAME", options);
  return JSON.stringify(BROADCAST_NAME);
};

module.exports = JavascriptTranslation;


/***/ }),

/***/ 905:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var engine = __webpack_require__(9940);
var tabs = __webpack_require__(3618);
var helpers = {
  //overriden by selectedsprite.js
  loadWorkspaceFromSprite: function (func) {},
};

function loadGlobalVariableBlocks(spr) {
  function contextMenuFunction(options) {
    var variableField = this.getField("VARIABLE");
    if (variableField) {
      var variableName = variableField.getValue();
      // Try to get main workspace from flyout/toolbox
      var mainWorkspace = null;
      if (this.workspace && this.workspace.targetWorkspace) {
        mainWorkspace = this.workspace.targetWorkspace;
      } else if (
        this.workspace &&
        this.workspace.options &&
        this.workspace.options.parentWorkspace
      ) {
        mainWorkspace = this.workspace.options.parentWorkspace;
      } else if (window.Blockly && Blockly.getMainWorkspace) {
        mainWorkspace = Blockly.getMainWorkspace();
      }

      options.push({
        text: "Delete variable",
        enabled: true,
        callback: function () {
          Blockly.confirm(
            `Delete global variable "${variableName}"? This will also delete all blocks using this variable.`,
            function (accepted) {
              if (accepted) {
                engine.removeGlobalVariable(variableName);

                // Refresh toolbox in main workspace
                mainWorkspace.getToolbox().refreshSelection();

                // Helper to delete blocks in a workspace
                function deleteBlocksInWorkspace(workspace) {
                  if (workspace && workspace.getAllBlocks) {
                    var blocks = workspace.getAllBlocks(false);
                    for (var i = blocks.length - 1; i >= 0; i--) {
                      var block = blocks[i];
                      if (
                        block.type === "globaldata_get" ||
                        block.type === "globaldata_set" ||
                        block.type === "globaldata_changeby"
                      ) {
                        var field = block.getField("VARIABLE");
                        if (field && field.getText() === variableName) {
                          block.dispose(true);
                        }
                      }
                    }
                  }
                }

                // Delete in main workspace
                deleteBlocksInWorkspace(mainWorkspace);

                var div = document.createElement("div");
                document.body.append(div);
                var tempWorkspace = Blockly.inject(div, {
                  comments: true,
                  disable: false,
                  collapse: false,
                  media: "../media/",
                  readOnly: false,
                  rtl: false,
                  scrollbars: false,
                  trashcan: false,
                  sounds: false,
                });
                // Delete in all sprite workspaces
                if (engine.sprites && Array.isArray(engine.sprites)) {
                  for (var s = 0; s < engine.sprites.length; s++) {
                    var sprite = engine.sprites[s];
                    if (sprite.id !== spr.id) {
                      if (sprite) {
                        tempWorkspace.clear();
                        if (sprite.blocklyXML) {
                          Blockly.Xml.domToWorkspace(
                            sprite.blocklyXML,
                            tempWorkspace,
                          );
                        }
                        deleteBlocksInWorkspace(tempWorkspace);
                        sprite.blocklyXML =
                          Blockly.Xml.workspaceToDom(tempWorkspace);
                      }
                    }
                  }
                }
                tempWorkspace.dispose();
                div.remove();

                // Refresh toolbox in main workspace
                mainWorkspace.getToolbox().refreshSelection();

                Blockly.svgResize(mainWorkspace);
              }
            },
          );
        },
      });

      var _this = this;
      Object.keys(engine.globalVariables).forEach(function (name) {
        if (name !== variableName) {
          options.push({
            text: name,
            enabled: !this.isInFlyout,
            callback: function () {
              _this.setFieldValue(name, "VARIABLE");
            },
          });
        }
      });
    }
  }
  Blockly.Blocks["globaldata_get"] = {
    init: function () {
      this.jsonInit({
        message0: "%1",
        args0: [
          {
            type: "field_label_serializable",
            name: "VARIABLE",
            //options: menu,
          },
        ],
        colour: "#00c756",
        extensions: ["output_string"],
      });
    },
    customContextMenu: contextMenuFunction,
  };

  Blockly.Blocks["globaldata_set"] = {
    init: function () {
      this.jsonInit({
        message0: "set %1 to %2",
        args0: [
          {
            type: "field_dropdown",
            name: "VARIABLE",
            options: function () {
              var currentMenu = Object.keys(engine.globalVariables).map(
                (name, i) => {
                  return [name, name];
                },
              );
              if (currentMenu.length < 1) {
                currentMenu = [["(No Global Variables)", "none"]];
              }
              return currentMenu;
            },
          },
          {
            type: "input_value",
            name: "VALUE",
          },
        ],
        colour: "#00c756",
        extensions: ["shape_statement"],
      });
    },
    customContextMenu: contextMenuFunction,
  };

  Blockly.Blocks["globaldata_changeby"] = {
    init: function () {
      this.jsonInit({
        message0: "change %1 by %2",
        args0: [
          {
            type: "field_dropdown",
            name: "VARIABLE",
            options: function () {
              var currentMenu = Object.keys(engine.globalVariables).map(
                (name, i) => {
                  return [name, name];
                },
              );
              if (currentMenu.length < 1) {
                currentMenu = [["(No Global Variables)", "none"]];
              }
              return currentMenu;
            },
          },
          {
            type: "input_value",
            name: "VALUE",
          },
        ],
        colour: "#00c756",
        extensions: ["shape_statement"],
      });
    },
    customContextMenu: contextMenuFunction,
  };
}

function loadPropertyVariableBlocks(spr) {
  function contextMenuFunction(options) {
    var variableField = this.getField("VARIABLE");
    if (variableField) {
      var variableName = variableField.getValue();
      // Try to get main workspace from flyout/toolbox
      var mainWorkspace = null;
      if (this.workspace && this.workspace.targetWorkspace) {
        mainWorkspace = this.workspace.targetWorkspace;
      } else if (
        this.workspace &&
        this.workspace.options &&
        this.workspace.options.parentWorkspace
      ) {
        mainWorkspace = this.workspace.options.parentWorkspace;
      } else if (window.Blockly && Blockly.getMainWorkspace) {
        mainWorkspace = Blockly.getMainWorkspace();
      }

      options.push({
        text: "Delete property",
        enabled: true,
        callback: function () {
          Blockly.confirm(
            `Delete sprite property "${variableName}"? This will also delete all blocks using this property.`,
            function (accepted) {
              if (accepted) {
                engine.removeSpriteProperty(variableName);

                // Helper to delete blocks in a workspace
                function deleteBlocksInWorkspace(workspace) {
                  if (workspace && workspace.getAllBlocks) {
                    var blocks = workspace.getAllBlocks(false);
                    for (var i = blocks.length - 1; i >= 0; i--) {
                      var block = blocks[i];
                      if (
                        block.type === "propertydata_get" ||
                        block.type === "propertydata_set" ||
                        block.type === "propertydata_changeby"
                      ) {
                        var field = block.getField("VARIABLE");
                        if (field && field.getText() === variableName) {
                          block.dispose(true);
                        }
                      }
                    }
                  }
                }

                // Delete in main workspace
                deleteBlocksInWorkspace(mainWorkspace);

                var div = document.createElement("div");
                document.body.append(div);
                var tempWorkspace = Blockly.inject(div, {
                  comments: true,
                  disable: false,
                  collapse: false,
                  media: "../media/",
                  readOnly: false,
                  rtl: false,
                  scrollbars: false,
                  trashcan: false,
                  sounds: false,
                });
                // Delete in all sprite workspaces
                if (engine.sprites && Array.isArray(engine.sprites)) {
                  for (var s = 0; s < engine.sprites.length; s++) {
                    var sprite = engine.sprites[s];
                    if (sprite.id !== spr.id) {
                      if (sprite) {
                        tempWorkspace.clear();
                        if (sprite.blocklyXML) {
                          Blockly.Xml.domToWorkspace(
                            sprite.blocklyXML,
                            tempWorkspace,
                          );
                        }
                        deleteBlocksInWorkspace(tempWorkspace);
                        sprite.blocklyXML =
                          Blockly.Xml.workspaceToDom(tempWorkspace);
                      }
                    }
                  }
                }
                tempWorkspace.dispose();
                div.remove();

                // Refresh toolbox in main workspace
                if (
                  mainWorkspace &&
                  mainWorkspace.getToolbox &&
                  mainWorkspace.getToolbox()
                ) {
                  mainWorkspace.getToolbox().refreshSelection();
                }
              }
            },
          );
        },
      });

      var _this = this;
      Object.keys(engine.propertyVariables).forEach(function (name) {
        if (name !== variableName) {
          options.push({
            text: name,
            enabled: !this.isInFlyout,
            callback: function () {
              _this.setFieldValue(name, "VARIABLE");
            },
          });
        }
      });
    }
  }
  Blockly.Blocks["propertydata_get"] = {
    init: function () {
      this.jsonInit({
        message0: "%1 %2",
        args0: [
          {
            type: "input_value",
            name: "TARGET_SPRITE",
            //options: menu,
          },
          {
            type: "field_label_serializable",
            name: "VARIABLE",
            //options: menu,
          },
        ],
        colour: "#d1cd77",
        extensions: ["output_string"],
      });
    },
    customContextMenu: contextMenuFunction,
  };

  function _listProperties() {
    var currentMenu = Object.keys(engine.propertyVariables).map((name, i) => {
      return [name, name];
    });
    if (currentMenu.length < 1) {
      currentMenu = [["(No Sprite Properties)", "none"]];
    }
    return currentMenu;
  }

  Blockly.Blocks[
    "spritemaster_checktouchingsprite_equals_propertyvalue"
  ]._listProperties = _listProperties;
  Blockly.Blocks[
    "tween_to_property"
  ]._listProperties = _listProperties;
  Blockly.Blocks["tween_to_global_variable"]._listGlobalVariables = function () {
    var currentMenu = Object.keys(engine.globalVariables).map(
      (name, i) => {
        return [name, name];
      },
    );
    if (currentMenu.length < 1) {
      currentMenu = [["(No Global Variables)", "none"]];
    }
    return currentMenu;
  };

  Blockly.Blocks["propertydata_set"] = {
    init: function () {
      this.jsonInit({
        message0: "on %1 set %2 to %3",
        args0: [
          {
            type: "input_value",
            name: "TARGET_SPRITE",
            //options: menu,
          },
          {
            type: "field_dropdown",
            name: "VARIABLE",
            options: function () {
              var currentMenu = Object.keys(engine.propertyVariables).map(
                (name, i) => {
                  return [name, name];
                },
              );
              if (currentMenu.length < 1) {
                currentMenu = [["(No Sprite Properties)", "none"]];
              }
              return currentMenu;
            },
          },
          {
            type: "input_value",
            name: "VALUE",
          },
        ],
        colour: "#d1cd77",
        extensions: ["shape_statement"],
      });
    },
    customContextMenu: contextMenuFunction,
  };

  Blockly.Blocks["propertydata_changeby"] = {
    init: function () {
      this.jsonInit({
        message0: "on %1 change %2 by %3",
        args0: [
          {
            type: "input_value",
            name: "TARGET_SPRITE",
            //options: menu,
          },
          {
            type: "field_dropdown",
            name: "VARIABLE",
            options: function () {
              var currentMenu = Object.keys(engine.propertyVariables).map(
                (name, i) => {
                  return [name, name];
                },
              );
              if (currentMenu.length < 1) {
                currentMenu = [["(No Sprite Properties)", "none"]];
              }
              return currentMenu;
            },
          },
          {
            type: "input_value",
            name: "VALUE",
          },
        ],
        colour: "#d1cd77",
        extensions: ["shape_statement"],
      });
    },
    customContextMenu: contextMenuFunction,
  };
}

function getSpriteMenuFunction(spr, defaultOptions) {
  var sprites = engine.sprites;
  return function () {
    var allSpritesExceptSelf = sprites.filter((spr2) => spr.id !== spr2.id);
    var spriteOptions = allSpritesExceptSelf.map((s) => [s.name, s.name]);

    return defaultOptions.concat(spriteOptions);
  };
}

function getCostumeMenuFunction(spr) {
  return function () {
    var costumeMenu = spr.costumes.map((costume, i) => {
      return [costume.name, costume.name];
    });
    if (costumeMenu.length < 1) {
      costumeMenu = [["(No costumes)", ""]];
    }
    return costumeMenu;
  };
}

function getSoundMenuFunction(spr) {
  return function () {
    var soundMenu = spr.sounds.map((sound, i) => {
      return [sound.name, sound.name];
    });
    if (soundMenu.length < 1) {
      soundMenu = [["(No sounds)", ""]];
    }
    return soundMenu;
  };
}

function loadBlockMenus(spr) {
  Blockly.Blocks["spritemaster_sprite"] = {
    init: function () {
      this.jsonInit({
        message0: "%1",
        args0: [
          {
            type: "field_dropdown",
            name: "SPRITE",
            options: getSpriteMenuFunction(spr, [["myself", "__myself__"]]),
          },
        ],
        extensions: ["output_string"],
        colour: "#c70000",
      });
    },
  };
  Blockly.Blocks["propertydata_sprite"] = {
    init: function () {
      this.jsonInit({
        message0: "%1",
        args0: [
          {
            type: "field_dropdown",
            name: "TARGET_SPRITE",
            options: getSpriteMenuFunction(spr, [["myself", "__myself__"]]),
          },
        ],
        extensions: ["output_string"],
        colour: "#d1cd77",
      });
    },
  };
  Blockly.Blocks["sensing_touchingobjectmenu"] = {
    init: function () {
      this.jsonInit({
        message0: "%1",
        args0: [
          {
            type: "field_dropdown",
            name: "TOUCHINGOBJECTMENU",
            options: getSpriteMenuFunction(spr, [
              ["mouse pointer", "__mouse_pointer__"],
            ]),
          },
        ],
        extensions: ["colours_sensing", "output_string"],
      });
    },
  };
  Blockly.Blocks['motion_goto_menu'] = {
    init: function() {
      this.jsonInit({
        "message0": "%1",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "TO",
            "options": getSpriteMenuFunction(spr, [["mouse pointer", "__mouse_pointer__"]])
          }
        ],
        "colour": Blockly.Colours.motion.secondary,
        "colourSecondary": Blockly.Colours.motion.secondary,
        "colourTertiary": Blockly.Colours.motion.tertiary,
        "colourQuaternary": Blockly.Colours.motion.quaternary,
        "extensions": ["output_string"]
      });
    }
  };
  Blockly.Blocks["control_create_clone_of_menu"] = {
    init: function () {
      this.jsonInit({
        message0: "%1",
        args0: [
          {
            type: "field_dropdown",
            name: "CLONE_OPTION",
            options: getSpriteMenuFunction(spr, [["myself", "_myself_"]]),
          },
        ],
        extensions: ["colours_control", "output_string"],
      });
    },
  };
  Blockly.Blocks["looks_costume"] = {
    init: function () {
      this.jsonInit({
        message0: "%1",
        args0: [
          {
            type: "field_dropdown",
            name: "COSTUME",
            options: getCostumeMenuFunction(spr),
          },
        ],
        colour: Blockly.Colours.looks.secondary,
        colourSecondary: Blockly.Colours.looks.secondary,
        colourTertiary: Blockly.Colours.looks.tertiary,
        colourQuaternary: Blockly.Colours.looks.quaternary,
        extensions: ["output_string"],
      });
    },
  };
  Blockly.Blocks["loader_costume"] = {
    init: function () {
      this.jsonInit({
        message0: "%1",
        args0: [
          {
            type: "field_dropdown",
            name: "COSTUME",
            options: getCostumeMenuFunction(spr),
          },
        ],
        colour: "#0066a1",
        extensions: ["output_string"],
      });
    },
  };
  Blockly.Blocks["loader_sound_option"] = {
    init: function () {
      this.jsonInit({
        message0: "%1",
        args0: [
          {
            type: "field_dropdown",
            name: "SOUND",
            options: getSoundMenuFunction(spr),
          },
        ],
        colour: "#0066a1",
        extensions: ["output_string"],
      });
    },
  };
  Blockly.Blocks["sound_sounds_menu"] = {
    init: function () {
      this.jsonInit({
        message0: "%1",
        args0: [
          {
            type: "field_dropdown",
            name: "SOUND_MENU",
            options: getSoundMenuFunction(spr),
          },
        ],
        colour: Blockly.Colours.sounds.secondary,
        colourSecondary: Blockly.Colours.sounds.secondary,
        colourTertiary: Blockly.Colours.sounds.tertiary,
        colourQuaternary: Blockly.Colours.sounds.quaternary,
        extensions: ["output_string"],
      });
    },
  };
  loadGlobalVariableBlocks(spr);
  loadPropertyVariableBlocks(spr);
}

module.exports = { loadBlockMenus, helpers };


/***/ }),

/***/ 1051:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  getOrderedTopBlockColumns,
  autoPositionComment,
} = __webpack_require__(3525);

const doCleanUp = (workspace) => {
  const result = getOrderedTopBlockColumns(true, workspace);
  const columns = result.cols;

  const gridSize = workspace.getGrid().spacing || workspace.getGrid().spacing_; // new blockly || old blockly

  // coordinates start between the workspace dots but script-snap snaps to them
  let cursorX = gridSize / 2;

  const maxWidths = result.maxWidths;

  for (const column of columns) {
    let cursorY = gridSize / 2;
    let maxWidth = 0;

    for (const block of column.blocks) {
      const xy = block.getRelativeToSurfaceXY();
      if (cursorX - xy.x !== 0 || cursorY - xy.y !== 0) {
        block.moveBy(cursorX - xy.x, cursorY - xy.y);
      }
      const heightWidth = block.getHeightWidth();
      cursorY += heightWidth.height + gridSize;
      cursorY += gridSize - ((cursorY + gridSize / 2) % gridSize);

      const maxWidthWithComments = maxWidths[block.id] || 0;
      maxWidth = Math.max(
        maxWidth,
        Math.max(heightWidth.width, maxWidthWithComments),
      );
    }

    cursorX += maxWidth + gridSize;
    cursorX += gridSize - ((cursorX + gridSize / 2) % gridSize);
  }

  const topComments = workspace.getTopComments();
  for (const comment of topComments) {
    autoPositionComment(comment);
  }
};

module.exports = { doCleanUp };


/***/ }),

/***/ 1065:
/***/ ((module) => {

//Constant generator for Sprite Master category.
//Need this because many properties and may add more later.

var SPRITE_MASTER_VALUES = {
  "x position": "x",
  "y position": "y",
  direction: "direction",
  "costume name": "costumeName",
  "costume index/number": "costumeIndex",
  alpha: "alpha",
  "x stretch": "scaleX",
  "y stretch": "scaleY",
  "skew x": "skewX",
  "skew y": "skewY",
};
var SPRITE_MASTER_DROPDOWN = Object.keys(SPRITE_MASTER_VALUES).map((name) => [
  name,
  name,
]);

var SPRITE_MASTER_CODE = {};
Object.keys(SPRITE_MASTER_VALUES).forEach((name) => {
  SPRITE_MASTER_CODE[name] = `${SPRITE_MASTER_VALUES[name]}`;
});

module.exports = {
  SPRITE_MASTER_VALUES,
  SPRITE_MASTER_DROPDOWN,
  SPRITE_MASTER_CODE,
};


/***/ }),

/***/ 1077:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var elements = __webpack_require__(7255);
var AElement = __webpack_require__(3759);

var costumesInPivotContainer = elements.getGPId("costumesInPivotContainer");
var pivotEditorMenuBar = elements.getGPId("pivotEditorMenuBar");
var pivotEditorXInput = elements.getGPId("pivotEditorXInput");
var pivotEditorYInput = elements.getGPId("pivotEditorYInput");
var pivotEditorZoomInput = elements.getGPId("pivotEditorZoomInput");

var pivotEditorContainer = elements.getGPId("pivotEditorContainer");
var pivotEditorImageContainer = elements.getGPId("pivotEditorImageContainer");
var pivotEditorImage = elements.getGPId("pivotEditorImage");
var pivotEditorDot = elements.getGPId("pivotEditorDot");

var centerImagePivotEditor = elements.getGPId("centerImagePivotEditor");

var deps = {
  markAsDirty: () => {},
};

var tempImg = null;

function getMousePosition(event, onElement, size) {
  var client = onElement.getBoundingClientRect();

  var relativeX = event.x - client.x;
  var relativeY = event.y - client.y;

  if (size) {
    var scaleX = client.width / size[0];
    var realX = relativeX * scaleX;

    var scaleY = client.height / size[1];
    var realY = relativeY * scaleY;
  } else {
    var realX = relativeX;
    var realY = relativeY;
  }
  if (size) {
    if (realX < 0) {
      realX = 0;
    }
    if (realY < 0) {
      realY = 0;
    }
    if (realX > size[0]) {
      realX = size[0];
    }
    if (realY > size[1]) {
      realY = size[1];
    }
  }

  var pos = {
    x: realX,
    y: realY,
  };
  return pos;
}

function reloadCostumes(spr, reloadTabCallback = function () {}) {
  if (spr.costumes.length < 1) {
    pivotEditorMenuBar.hidden = true;
    pivotEditorContainer.hidden = true;
    elements.setInnerJSON(costumesInPivotContainer, [
      {
        element: "span",
        textContent: "This sprite has no costumes.",
        style: {
          fontWeight: "bold",
          textDecoration: "underline",
        },
      },
    ]);
  } else {
    pivotEditorMenuBar.hidden = false;
    pivotEditorContainer.hidden = false;
    var selectedCostume = 0;
    function updateList() {
      var previousScrollTop = costumesInPivotContainer.scrollTop;
      var previousScrollLeft = costumesInPivotContainer.scrollLeft;
      elements.setInnerJSON(
        costumesInPivotContainer,
        spr.costumes.map((costume, i) => {
          return {
            element: "div",
            className: "pivotCostumeButton",
            GPWhenCreated: function (elm) {
              if (i == selectedCostume) {
                elm.setAttribute("selected", "");
              }
            },
            eventListeners: [
              {
                event: "click",
                func: function () {
                  selectedCostume = i;
                  updateList();
                  updateEditor();
                },
              },
            ],
            children: [
              {
                element: "img",
                src: costume.dataURL,
                style: {
                  width: "70px",
                  height: "70px",
                  objectFit: "contain",
                },
              },
              {
                element: "span",
                textContent: costume.name,
              },
            ],
          };
        }),
      );
      costumesInPivotContainer.scrollTop = previousScrollTop;
      costumesInPivotContainer.scrollLeft = previousScrollLeft;
    }

    updateList();

    function updateEditor() {
      var costume = spr.costumes[selectedCostume];
      if (!costume) {
        pivotEditorImage.src = "";
        return;
      }
      if (tempImg) {
        tempImg.src = "";
        tempImg.remove();
      }
      tempImg = document.createElement("img");
      tempImg.src = costume.dataURL;
      pivotEditorImage.src = costume.dataURL;
      var zoomScale = 1;
      function updateSize() {
        zoomScale = pivotEditorZoomInput.value / 100;
        pivotEditorImageContainer.style.left = `calc(50% - ${costume.rotationCenterX * zoomScale}px)`;
        pivotEditorImageContainer.style.top = `calc(50% - ${costume.rotationCenterY * zoomScale}px)`;
        pivotEditorDot.style.left = `${costume.rotationCenterX * zoomScale}px`;
        pivotEditorDot.style.top = `${costume.rotationCenterY * zoomScale}px`;
        //pivotEditorImageContainer.style.scale = pivotEditorZoomInput.value / 100;
        pivotEditorImage.style.width = `${zoomScale * tempImg.width}px`;
        pivotEditorImage.style.height = `${zoomScale * tempImg.height}px`;

        pivotEditorXInput.value = costume.rotationCenterX;
        pivotEditorYInput.value = costume.rotationCenterY;
      }
      updateSize();
      pivotEditorZoomInput.oninput = function () {
        updateSize();
      };
      pivotEditorXInput.oninput = function () {
        costume.rotationCenterX = +pivotEditorXInput.value || 0;
        updateSize();
        deps.markAsDirty();
      };
      pivotEditorYInput.oninput = function () {
        costume.rotationCenterY = +pivotEditorYInput.value || 0;
        updateSize();
        deps.markAsDirty();
      };

      pivotEditorContainer.onclick = function (event) {
        var pos = getMousePosition(event, pivotEditorImage);
        costume.rotationCenterX = pos.x / zoomScale;
        costume.rotationCenterY = pos.y / zoomScale;
        updateSize();
        deps.markAsDirty();
      };
      var m = false;
      pivotEditorContainer.onmousedown = function (event) {
        m = true;
        event.preventDefault();
      };
      pivotEditorContainer.onmouseup = function (event) {
        m = false;
        event.preventDefault();
      };
      pivotEditorContainer.onmousemove = function (event) {
        if (!m) {
          return;
        }
        var pos = getMousePosition(event, pivotEditorImage);
        costume.rotationCenterX = pos.x / zoomScale;
        costume.rotationCenterY = pos.y / zoomScale;
        pivotEditorDot.style.left = `${costume.rotationCenterX * zoomScale}px`;
        pivotEditorDot.style.top = `${costume.rotationCenterY * zoomScale}px`;
        deps.markAsDirty();
      };

      centerImagePivotEditor.onclick = function (e) {
        costume.rotationCenterX = tempImg.width / 2;
        costume.rotationCenterY = tempImg.height / 2;
        updateSize();
        deps.markAsDirty();
      };
    }

    updateEditor();
  }
}

module.exports = {
  reloadCostumes,
  deps
};



/***/ }),

/***/ 1097:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(7780);
__webpack_require__(4797);
__webpack_require__(7816);
__webpack_require__(9769);
__webpack_require__(9884);
__webpack_require__(7056);
__webpack_require__(9766);
__webpack_require__(7067);
__webpack_require__(7135);
__webpack_require__(1537);
__webpack_require__(7367);
__webpack_require__(2013);
__webpack_require__(1396);
__webpack_require__(6938);
__webpack_require__(6936);
__webpack_require__(5334);

/***/ }),

/***/ 1246:
/***/ ((module) => {

function blockToJSON(block) {
  var myjson = {};
  //myjson.blockObject = block;
  myjson.type = block.type;
  myjson.id = block.id;

  if (typeof block.warp_ !== "undefined") {
    myjson.warp = block.warp_;
  }
  if (typeof block.procCode_ !== "undefined") {
    myjson.procCode = block.procCode_;
  }
  if (typeof block.argumentIds_ !== "undefined") {
    myjson.argumentIds = block.argumentIds_;
  }
  if (typeof block.displayNames_ !== "undefined") {
    myjson.displayNames = block.displayNames_;
  }
  if (typeof block.argumentDefaults_ !== "undefined") {
    myjson.argumentDefaults = block.argumentDefaults_;
  }

  var jsonFields = [];
  var jsonInputs = [];
  if (block.inputList) {
    for (var input of block.inputList) {
      if (input.type == Blockly.DUMMY_INPUT) {
        //Nothing!
      } else {
        var inputjson = {};
        var childBlock = input.connection.targetBlock();
        if (input.type == Blockly.INPUT_VALUE) {
          inputjson.type = "value";
        } else if (input.type == Blockly.NEXT_STATEMENT) {
          inputjson.type = "statement";
        }
        //var shadow = input.connection.getShadowDom();
        //if (shadow && (!childBlock || !childBlock.isShadow())) {
        //
        //}
        if (childBlock) {
          inputjson.name = input.name;

          inputjson.block = blockToJSON(childBlock);
          jsonInputs.push(inputjson);
        }
      }

      for (var field of input.fieldRow) {
        if (field.name && field.SERIALIZABLE) {
          if (field.referencesVariables()) {
            var id = field.getValue();
            if (!id) {
              field.initModel();
              id = field.getValue();
            }

            var variable = field.getVariable();
            if (variable) {
              jsonFields.push({
                variable: {
                  name: variable.name,
                  id: variable.getId(),
                },
                name: field.name,
                text: field.getText(),
              });
            }
          } else {
            jsonFields.push({
              value: field.getValue(),
              name: field.name,
              text: field.getText(),
            });
          }
        }
      }
    }
  }

  myjson.fields = jsonFields;
  myjson.inputs = jsonInputs;

  if (block.getNextBlock) {
    var nextBlock = block.getNextBlock();
    if (nextBlock) {
      myjson.next = blockToJSON(nextBlock);
    }
  }
  return myjson;
}

function workspaceToJSON(workspace) {
  var blocks = workspace.getTopBlocks(true);
  var generated = [];
  for (var block of blocks) {
    generated.push(blockToJSON(block));
  }
  return generated;
}

module.exports = {
  blockToJSON,
  workspaceToJSON,
};


/***/ }),

/***/ 1352:
/***/ ((module) => {

class SoundEffects {
  constructor(sound) {
    this.sound = sound;
    this.playbackRate = 1;
    this.volume = 100;
  }

  set duration(v) {
    //empty so there is no errors thrown when trying to set duration, even though it's not writable.
  }
  get duration() {
    return this.sound.data ? this.sound.getDuration() : 0;
  }

  set playbackRate(v) {
    this._playbackRate = +v || 0;
    if (this._playbackRate > 9999) {
      //To prevent crashing the audio engine with excessively high playback rates. This is an arbitrary limit.
      this._playbackRate = 9999;
    }
    if (this._playbackRate < 0) {
      //Same as above, to prevent crashing the audio engine with negative playback rates.
      this._playbackRate = 0;
    }
  }

  get playbackRate() {
    return this._playbackRate;
  }

  set volume(v) {
    this._volume = +v || 0;
    if (this._volume > 500) {
      // Maximum of 500% volume, which is 5 times the original volume. This is an arbitrary limit to prevent excessively loud sounds.
      this._volume = 500;
    }
    if (this._volume < 0) {
      // Minimum of 0% volume, which is silence. To stop audio engine from crashing with negative volume values.
      this._volume = 0;
    }
  }

  get volume() {
    return this._volume;
  }

  dispose() {
    this._volume = null;
    this._playbackRate = null;
  }
}

module.exports = SoundEffects;


/***/ }),

/***/ 1396:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var engine = __webpack_require__(9940);

function createElement(type, args = {}, children = []) {
  var element = document.createElement(type);
  for (var name of Object.keys(args)) {
    element.setAttribute(name, args[name]);
  }
  for (var child of children) {
    element.append(child);
  }
  return element;
}

function getSafeHTML(text) {
  var span = document.createElement("span");
  span.textContent = text;
  var html = span.innerHTML;
  span.textContent = "";
  span.remove();
  return html;
}

function createElementXML(text) {
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(text, "text/xml");
  return xmlDoc.children[0];
}

Blockly.WorkspaceSvg.prototype.registerToolboxCategoryCallback(
  "GGM3_PROPERTY_VARIABLES",
  function (workspace) {
    var xmlList = [];

    xmlList.push(
      createElement("button", {
        text: "Create variable",
        callbackKey: "GGM3_CREATE_VARIABLE_PROPERTY",
      }),
    );

    workspace._ggm3_createVariableProperty = (button) => {
      Blockly.prompt("New variable property name: ", "", function (output) {
        if (!output) {
          return;
        }
        var name = output.trim();
        if (!engine.hasSpriteProperty(name)) {
          engine.addSpriteProperty(name);
        }
        workspace.getToolbox().refreshSelection();
      });
    };

    workspace.registerButtonCallback(
      "GGM3_CREATE_VARIABLE_PROPERTY",
      (button) => {
        workspace._ggm3_createVariableProperty(button);
      },
    );

    var variables = Object.keys(engine.propertyVariables);

    for (var variable of variables) {
      var blockElement = createElementXML(`
          <block type="propertydata_get">
            <value name="TARGET_SPRITE">
                  <shadow type="propertydata_sprite"></shadow>
            </value>
            <field name="VARIABLE">${getSafeHTML(variable)}</field>
          </block>`);
      blockElement.setAttribute("id", "property_var_getter_" + variable);

      // Add context menu to delete the variable
      blockElement.setAttribute("propertydata-variable-name", variable);

      xmlList.push(blockElement);
    }

    if (variables.length > 0) {
      var firstVariable = variables[0];

      xmlList.push(
        createElementXML(`
          <block type="propertydata_changeby">
            <value name="TARGET_SPRITE">
                  <shadow type="propertydata_sprite"></shadow>
            </value>
            <field name="VARIABLE">${getSafeHTML(variable)}</field>
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
          </block>`),
      );

      xmlList.push(
        createElementXML(`
          <block type="propertydata_set">
            <value name="TARGET_SPRITE">
                  <shadow type="propertydata_sprite"></shadow>
            </value>
            <field name="VARIABLE">${getSafeHTML(variable)}</field>
            <value name="VALUE">
                <shadow type="text">
                    <field name="TEXT">0</field>
                </shadow>
            </value>
          </block>`),
      );
    }

    return xmlList;
  },
);


/***/ }),

/***/ 1498:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var JSZip = __webpack_require__(1710);
var engine = __webpack_require__(9940);

const RESOURCE_FOLDER = "resources";
const RESOURCE_SOUNDS_FOLDER = "sounds";
const RESOURCE_COSTUMES_FOLDER = "costumes";
const SPRITE_FILE = "game.json";

var { ProgressMonitor } = __webpack_require__(6544);
var { arrayBufferToDataURL, dataURLToArrayBuffer } = __webpack_require__(8570);

var {
  getCostumeData,
  getSoundData,
  loadCostume,
  loadSound,
} = __webpack_require__(2695);

const {
  toEngineJSON,
  toSpriteJSON,
  toCostumeJSON,
  toSoundJSON,

  fromEngineJSON,
  fromSpriteJSON,
  fromCostumeJSON,
  fromSoundJSON,
} = __webpack_require__(7405);

var {
  compileSprite,
  saveCurrentSpriteCode,
  compileAllSprites,
} = __webpack_require__(7802);

function calculateSpriteSaveMax(sprite) {
  var max = 0;
  max += sprite.costumes.length;
  max += sprite.sounds.length;
  return max;
}

function calculateSpriteLoadMax(spriteJson) {
  var max = 0;
  max += spriteJson.costumes ? spriteJson.costumes.length : 0;
  max += spriteJson.sounds ? spriteJson.sounds.length : 0;
  return max;
}

async function saveSpriteZip(sprite, zip, progress = new ProgressMonitor()) {
  saveCurrentSpriteCode(); //Save current code to be sure that its saved.

  var zip = new JSZip();
  zip.folder(RESOURCE_FOLDER);
  zip.folder(`${RESOURCE_FOLDER}/${RESOURCE_COSTUMES_FOLDER}`);
  zip.folder(`${RESOURCE_FOLDER}/${RESOURCE_SOUNDS_FOLDER}`);

  var max = calculateSpriteSaveMax(sprite);
  progress.calculatedMax(max);
  progress.current = 0;

  var spriteJson = toSpriteJSON(sprite); //add the sprite properties, without the sound and costume properties.

  //Manually create the costumes array.
  var costumeData = getCostumeData(sprite);
  spriteJson.costumes = [];

  for (var file of costumeData) {
    var arrayBuffer = await dataURLToArrayBuffer(file.dataURL);
    var filePath = `${RESOURCE_FOLDER}/${RESOURCE_COSTUMES_FOLDER}/${file.fileName}`;
    zip.file(filePath, arrayBuffer);
    progress.current += 1;

    var costumeJson = file.costumeJson; //get costume property data.
    costumeJson.file = filePath; //add file path to read later.
    spriteJson.costumes.push(costumeJson);
  }

  //Manually create the sounds array.
  var soundData = getSoundData(sprite);
  spriteJson.sounds = [];
  for (var file of soundData) {
    var arrayBuffer = await dataURLToArrayBuffer(file.dataURL);
    var filePath = `${RESOURCE_FOLDER}/${RESOURCE_SOUNDS_FOLDER}/${file.fileName}`;
    zip.file(filePath, arrayBuffer);
    progress.current += 1;

    var soundJson = file.soundJson; //get sound property data.
    soundJson.file = filePath; //add file path to read later.
    spriteJson.sounds.push(soundJson);
  }

  zip.file(SPRITE_FILE, JSON.stringify(spriteJson));
  return zip;
}

async function saveSpriteZipAsBlob(sprite, progress = new ProgressMonitor()) {
  var zip = await saveSpriteZip(sprite, new JSZip(), progress);
  var blob = await zip.generateAsync({ type: "blob" });
  progress.finish();
  return blob;
}

async function loadSpriteFromZip(zipSource, progress = new ProgressMonitor()) {
  var zip = await JSZip.loadAsync(zipSource);
  var spriteJsonText = await zip.file(SPRITE_FILE).async("text");
  var spriteJson = JSON.parse(spriteJsonText);
  var sprite = engine.createEmptySprite();

  var max = calculateSpriteLoadMax(spriteJson);
  progress.calculatedMax(max);
  progress.current = 0;

  //Load costumes
  for (var costumeJson of spriteJson.costumes) {
    var mimeType = costumeJson.mimeType ? costumeJson.mimeType : "image/png"; //Fallback to PNG file type if it doesn't have a mime type.
    var filePath = costumeJson.file;

    var file = zip.file(filePath); //Find the file
    if (!file) {
      throw new Error(
        `Unable to locate file path "${filePath}" in the ggm3sprite file.`,
      );
      // removed by dead control flow

    }
    var arrayBuffer = await file.async("arraybuffer");
    var dataURL = await arrayBufferToDataURL(arrayBuffer, mimeType);

    await loadCostume(sprite, costumeJson, dataURL);
    progress.current += 1;
  }

  //Load sounds
  for (var soundJson of spriteJson.sounds) {
    var mimeType = soundJson.mimeType ? soundJson.mimeType : "audio/mp3"; //Fallback to MP3 file type if it doesn't have a mime type.
    var filePath = soundJson.file;

    var file = zip.file(filePath); //Find the file
    if (!file) {
      throw new Error(
        `Unable to locate file path "${filePath}" in the ggm3sprite file.`,
      );
      // removed by dead control flow

    }
    var arrayBuffer = await file.async("arraybuffer");
    var dataURL = await arrayBufferToDataURL(arrayBuffer, mimeType);

    await loadSound(sprite, soundJson, dataURL);
    progress.current += 1;
  }

  //Add sprite properties.
  fromSpriteJSON(sprite, spriteJson);
}

module.exports = {
  saveSpriteZip,
  saveSpriteZipAsBlob,
  loadSpriteFromZip,
};


/***/ }),

/***/ 1537:
/***/ (() => {

Blockly.Blocks["sound_stopallsounds"] = {
  init: function () {
    this.jsonInit({
      message0: "stop all sounds",
      category: Blockly.Categories.sound,
      extensions: ["colours_sounds", "shape_statement"],
    });
  },
};

Blockly.Blocks["sound_stopallsoundsinsprite"] = {
  init: function () {
    this.jsonInit({
      message0: "stop all sounds in sprite",
      category: Blockly.Categories.sound,
      extensions: ["colours_sounds", "shape_statement"],
    });
  },
};

Blockly.Blocks["sound_stopsound"] = {
  init: function () {
    this.jsonInit({
      message0: "stop sound %1",
      args0: [
        {
          type: "input_value",
          name: "SOUND_MENU",
        },
      ],
      category: Blockly.Categories.sound,
      extensions: ["colours_sounds", "shape_statement"],
    });
  },
};

var soundEffectOptions = [
  ["volume", "volume"],
  ["playback rate", "playbackRate"],
];

var unwritableEffectOptions = [
  ["duration", "duration"]
];

Blockly.Blocks["sound_ggm3effect_set"] = {
  init: function () {
    this.jsonInit({
      message0: "set sound %1 %2 to %3",
      args0: [
        {
          type: "input_value",
          name: "SOUND_MENU",
        },
        {
          type: "field_dropdown",
          name: "EFFECT",
          options: soundEffectOptions,
        },
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      category: Blockly.Categories.sound,
      extensions: ["colours_sounds", "shape_statement"],
    });
  },
};

Blockly.Blocks["sound_ggm3effect_change"] = {
  init: function () {
    this.jsonInit({
      message0: "change sound %1 %2 by %3",
      args0: [
        {
          type: "input_value",
          name: "SOUND_MENU",
        },
        {
          type: "field_dropdown",
          name: "EFFECT",
          options: soundEffectOptions,
        },
        {
          type: "input_value",
          name: "BY",
        },
      ],
      category: Blockly.Categories.sound,
      extensions: ["colours_sounds", "shape_statement"],
    });
  },
};

Blockly.Blocks["sound_ggm3effect_get"] = {
  init: function () {
    this.jsonInit({
      message0: "get sound %1 %2",
      args0: [
        {
          type: "input_value",
          name: "SOUND_MENU",
        },
        {
          type: "field_dropdown",
          name: "EFFECT",
          options: soundEffectOptions.concat(unwritableEffectOptions),
        },
      ],
      category: Blockly.Categories.sound,
      extensions: ["colours_sounds", "output_number"],
    });
  },
};

//Deprecated blocks with advanced options. These blocks are replaced with sound effect blocks.
//Kept for compatibility for older project loading.
Blockly.Blocks["sound_play_advanced"] = {
  /**
   * Block to play sound.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: "start sound %1 at %4 playback rate: %2 volume multiplier: %3",
      args0: [
        {
          type: "input_value",
          name: "SOUND_MENU",
        },
        {
          type: "input_value",
          name: "PLAYBACK_RATE",
        },
        {
          type: "input_value",
          name: "VOLUME",
        },
        {
          type: "input_value",
          name: "TIME",
        },
      ],
      category: Blockly.Categories.sound,
      extensions: ["colours_sounds", "shape_statement"],
    });
    /*
    if (this.isInFlyout) {
      var soundMenu = this.getField("SOUND_MENU");
      if (soundMenu) {
        this.setFieldValue(soundMenu.getOptions()[1], "SOUND_MENU");
      }
    }*/
  },
};

Blockly.Blocks["sound_playuntildone_advanced"] = {
  init: function () {
    this.jsonInit({
      message0:
        "play sound %1 sound at %4 until done with playback rate: %2 volume multiplier: %3",
      args0: [
        {
          type: "input_value",
          name: "SOUND_MENU",
        },
        {
          type: "input_value",
          name: "PLAYBACK_RATE",
        },
        {
          type: "input_value",
          name: "VOLUME",
        },
        {
          type: "input_value",
          name: "TIME",
        },
      ],
      category: Blockly.Categories.sound,
      extensions: ["colours_sounds", "shape_statement"],
    });
  },
};


/***/ }),

/***/ 1652:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

if (window.Blockly) {
  window.ScratchBlocks = window.Blockly;
} else {
  throw new Error("Blockly global definition is missing.");
}

__webpack_require__(9483);


/***/ }),

/***/ 1718:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var JavascriptTranslation = {};
var utilFunctions = __webpack_require__(9547);
var outputBlocks = __webpack_require__(7147);

outputBlocks.push("sensing_mousex");
JavascriptTranslation["sensing_mousex"] = function (jsonblock, utils, options) {
  return `engine.mouseX`;
};

outputBlocks.push("sensing_mousey");
JavascriptTranslation["sensing_mousey"] = function (jsonblock, utils, options) {
  return `engine.mouseY`;
};

outputBlocks.push("sensing_mousedown");
JavascriptTranslation["sensing_mousedown"] = function (
  jsonblock,
  utils,
  options,
) {
  return `engine.mouseIsDown`;
};

outputBlocks.push("sensing_keyoptions");
JavascriptTranslation["sensing_keyoptions"] = function (
  jsonblock,
  utils,
  options,
) {
  var KEY_OPTION = utils.getField(
    jsonblock,
    "KEY_OPTION",
    options,
    "undefined",
  );
  return JSON.stringify(KEY_OPTION);
};

outputBlocks.push("sensing_keypressed");
JavascriptTranslation["sensing_keypressed"] = function (
  jsonblock,
  utils,
  options,
) {
  var KEY_OPTION = utils.getInput(
    jsonblock,
    "KEY_OPTION",
    options,
    "undefined",
  );
  return `!!engine.keysPressed[${KEY_OPTION}]`;
};

outputBlocks.push("sensing_touchingobjectmenu");
JavascriptTranslation["sensing_touchingobjectmenu"] = function (
  jsonblock,
  utils,
  options,
) {
  var TOUCHINGOBJECTMENU = utils.getField(
    jsonblock,
    "TOUCHINGOBJECTMENU",
    options,
    "undefined",
  );
  return JSON.stringify(TOUCHINGOBJECTMENU);
};

outputBlocks.push("sensing_touchingobject");
JavascriptTranslation["sensing_touchingobject"] = function (
  jsonblock,
  utils,
  options,
) {
  var TOUCHINGOBJECTMENU = utils.getInput(
    jsonblock,
    "TOUCHINGOBJECTMENU",
    options,
    "undefined",
  );
  return `sprite.isTouchingSprite(${TOUCHINGOBJECTMENU})`;
};

module.exports = JavascriptTranslation;


/***/ }),

/***/ 1764:
/***/ ((module) => {

function valueReport(v) {
  if (Array.isArray(v)) {
    var max = 12;
    var values = Array.from(v).slice(0, max);
    if (values.length == max) {
      var more = ` (${v.length - max} more)`;
      return `[Array object]: ${values.join(", ")}...${v.length - max !== 0 ? more : ""}`;
    }
    return `[Array object]: ${values.join(", ")}`;
  }
  if (typeof v == undefined) {
    return "undefined";
  }
  return "" + v;
}

module.exports = { valueReport };


/***/ }),

/***/ 1868:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var JavascriptTranslation = {};
var utilFunctions = __webpack_require__(9547);
var outputBlocks = __webpack_require__(7147);

outputBlocks.push("loader_costume");
JavascriptTranslation["loader_costume"] = function (jsonblock, utils, options) {
  var COSTUME = utils.getField(jsonblock, "COSTUME", options);
  return JSON.stringify(COSTUME);
};

outputBlocks.push("loader_costume_scale");
JavascriptTranslation["loader_costume_scale"] = function (
  jsonblock,
  utils,
  options,
) {
  var COSTUME = utils.getInput(jsonblock, "COSTUME", options, "undefined");
  return `(await sprite.blockGetCostumeScale(${COSTUME}))`;
};

outputBlocks.push("loader_costumeisloaded");
JavascriptTranslation["loader_costumeisloaded"] = function (
  jsonblock,
  utils,
  options,
) {
  var COSTUME = utils.getInput(jsonblock, "COSTUME", options, "undefined");
  return `sprite.isCostumeLoaded(${COSTUME})`;
};

JavascriptTranslation["loader_loadcostume"] = function (
  jsonblock,
  utils,
  options,
) {
  var COSTUME = utils.getInput(jsonblock, "COSTUME", options, "undefined");
  return `await sprite.blockLoadCostume(${COSTUME});${utilFunctions.aliveCheck()}`;
};

JavascriptTranslation["loader_deloadcostume"] = function (
  jsonblock,
  utils,
  options,
) {
  var COSTUME = utils.getInput(jsonblock, "COSTUME", options, "undefined");
  return `await sprite.blockDeloadCostume(${COSTUME});${utilFunctions.aliveCheck()}`;
};

JavascriptTranslation["loader_rendercostumescale"] = function (
  jsonblock,
  utils,
  options,
) {
  var COSTUME = utils.getInput(jsonblock, "COSTUME", options, "undefined");
  var SCALE = utils.getInput(jsonblock, "SCALE", options, "undefined");
  return `sprite.setCostumeRenderScale(${COSTUME},${SCALE});`;
};

JavascriptTranslation["loader_setrenderscale"] = function (
  jsonblock,
  utils,
  options,
) {
  var COSTUME = utils.getInput(jsonblock, "COSTUME", options, "undefined");
  return `sprite.blockRerenderCostume(${COSTUME});`;
};

outputBlocks.push("loader_sound_option");
JavascriptTranslation["loader_sound_option"] = function (
  jsonblock,
  utils,
  options,
) {
  var SOUND = utils.getField(jsonblock, "SOUND", options);
  return JSON.stringify(SOUND);
};

outputBlocks.push("loader_soundisloaded");
JavascriptTranslation["loader_soundisloaded"] = function (
  jsonblock,
  utils,
  options,
) {
  var SOUND = utils.getInput(jsonblock, "SOUND", options, "null");
  return `sprite.soundIsLoaded(${SOUND})`;
};

JavascriptTranslation["loader_loadsound"] = function (
  jsonblock,
  utils,
  options,
) {
  var SOUND = utils.getInput(jsonblock, "SOUND", options, "null");
  return `await sprite.blockLoadSound(${SOUND});`;
};

JavascriptTranslation["loader_deloadsound"] = function (
  jsonblock,
  utils,
  options,
) {
  var SOUND = utils.getInput(jsonblock, "SOUND", options, "null");
  return `await sprite.blockDeloadSound(${SOUND});`;
};

module.exports = JavascriptTranslation;


/***/ }),

/***/ 2001:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var CollisionSprite = __webpack_require__(4447);

class Costume {
  constructor(engine, dataURL, name, resolveFunction) {
    this.engine = engine;
    this.dataURL = dataURL;
    this.drawable = null;
    this.rotationCenterX = 0;
    this.rotationCenterY = 0;
    this.preferedScale = 1;
    this.currentScale = 1;
    this.mimeType = null;
    this.canvas = document.createElement("canvas");
    this.id = Date.now() + "_" + Math.round(Math.random() * 9999999);

    this.name = name || "Costume";
    this.resolveFunction = resolveFunction;
    this.mask = null;
    this.loaded = false;
    this.willPreload = true;
  }

  renderImageAtScale() {
    if (this.disposed) {
      return;
    }
    if (this.drawable) {
      this.engine.disposeDrawable(this.drawable); //Make sure we aren't leaking memory when resetting the drawable.
    }
    var img = this.img;
    var canvas = this.canvas;
    var ctx = canvas.getContext("2d");

    // Keep pixel-art edges crisp and avoid interpolation fringes on transparent pixels.
    if (ctx) {
      ctx.imageSmoothingEnabled = false;
      if (typeof ctx.webkitImageSmoothingEnabled !== "undefined") {
        ctx.webkitImageSmoothingEnabled = false;
      }
      if (typeof ctx.mozImageSmoothingEnabled !== "undefined") {
        ctx.mozImageSmoothingEnabled = false;
      }
      if (typeof ctx.msImageSmoothingEnabled !== "undefined") {
        ctx.msImageSmoothingEnabled = false;
      }
    }

    canvas.width = img.width * this.preferedScale;
    canvas.height = img.height * this.preferedScale;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    this.mask = new CollisionSprite(
      ctx.getImageData(0, 0, canvas.width, canvas.height),
    );

    this.drawable = this.engine.newDrawable(canvas);
    this.loading = false;
    this.loaded = true;
    this.currentScale = this.preferedScale;

    canvas.style.imageRendering = "pixelated";
    canvas.style.zIndex = "999999999999999";
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    //document.body.appendChild(canvas); // For debugging purposes
  }

  getFinalRotationCenter() {
    return [
      this.currentScale * this.rotationCenterX,
      this.currentScale * this.rotationCenterY,
    ];
  }

  loadImage(whenfinished) {
    if (this.disposed) {
      return;
    }
    this.loading = true;
    if (this.img) {
      this.img.src = "";
    }
    var _this = this;
    var engine = this.engine;
    var img = document.createElement("img");
    this.img = img;
    img.onload = function () {
      _this.renderImageAtScale(_this.preferedScale);
      if (_this.resolveFunction) {
        _this.resolveFunction(true);
        _this.resolveFunction = null;
        //This should patch the issue where deloading and then loading in costumes in game resets rotation center.
        _this.rotationCenterX = img.width / 2;
        _this.rotationCenterY = img.height / 2;
      }
      if (whenfinished) {
        whenfinished();
      }
    };
    img.onerror = function () {
      if (_this.resolveFunction) {
        _this.resolveFunction(false);
        _this.resolveFunction = null;
      }
      if (whenfinished) {
        whenfinished();
      }
    };
    img.src = this.dataURL;
  }

  deloadCostume() {
    if (this.disposed) {
      return;
    }
    if (this.img) {
      this.img.onload = function () {};
      this.img.onerror = function () {};
      this.img.src = "";
      this.img = null;
    }
    if (this.drawable) {
      this.engine.disposeDrawable(this.drawable);
      this.drawable = null;
    }
    this.mask = null;
    this.loading = false;
    this.loaded = false;
    this.canvas.width = 1;
    this.canvas.height = 1;
  }

  rerenderAtResolution(res) {
    if (this.disposed) {
      return;
    }
    if (this.loading) {
      return;
    }
    if (this.loaded) {
      return;
    }
  }

  loadCostume() {
    if (this.disposed) {
      return;
    }
    if (this.loading) {
      return;
    }
    if (this.loaded) {
      return;
    }
    return new Promise((resolve) => {
      this.loadImage(resolve);
    });
  }

  dispose() {
    this.disposed = true;
    if (this.drawable) {
      this.engine.disposeDrawable(this.drawable);
    }
    if (this.img) {
      this.img.onload = function () {};
      this.img.onerror = function () {};
      this.img.src = "";
      this.img = null;
    }
    this.canvas.width = 1;
    this.canvas.height = 1;
    this.canvas.remove();
    this.resolveFunction = null;
    this.drawable = null;
    this.mask = null;
  }
}

module.exports = Costume;


/***/ }),

/***/ 2013:
/***/ (() => {

Blockly.Xml.domToWorkspace = function (xml, workspace) {
  if (xml instanceof Blockly.Workspace) {
    var swap = xml;
    xml = workspace;
    workspace = swap;
    console.warn(
      "Deprecated call to Blockly.Xml.domToWorkspace, swap the arguments.",
    );
  }

  var width;
  if (workspace.RTL) width = workspace.getWidth();
  // Clone xml so we can safely rewrite ids without mutating caller state
  var xmlIn = xml.cloneNode(true);

  // Remap block/comment ids that would collide with existing workspace ids.
  // This prevents duplicate ids when copying blocks between sprites/workspaces
  // and avoids compile/runtime issues caused by id collisions.
  try {
    var idMap = {};
    var genId = function () {
      if (Blockly.utils && Blockly.utils.genUid) return Blockly.utils.genUid();
      if (Blockly.utils && Blockly.utils.createUuid)
        return Blockly.utils.createUuid();
      return "b" + Math.random().toString(36).substring(2, 10);
    };

    var nodeList = xmlIn.getElementsByTagName("*");
    for (var ni = 0; ni < nodeList.length; ni++) {
      var node = nodeList[ni];
      if (!node.nodeName) continue;
      var name = node.nodeName.toLowerCase();
      if (name === "block" || name === "shadow" || name === "comment") {
        if (node.hasAttribute && node.hasAttribute("id")) {
          var oldId = node.getAttribute("id");
          if (!oldId) continue;
          var collides = false;
          try {
            if (workspace.getBlockById && workspace.getBlockById(oldId))
              collides = true;
            if (
              !collides &&
              workspace.getCommentById &&
              workspace.getCommentById(oldId)
            )
              collides = true;
          } catch (e) {
            collides = false;
          }

          // Also remap if we've already assigned a mapping for this oldId
          if (collides || idMap[oldId]) {
            var newId = idMap[oldId] || genId();
            // Ensure newId doesn't collide either
            while (
              (workspace.getBlockById && workspace.getBlockById(newId)) ||
              (workspace.getCommentById && workspace.getCommentById(newId)) ||
              Object.values(idMap).indexOf(newId) !== -1
            ) {
              newId = genId();
            }
            idMap[oldId] = newId;
            node.setAttribute("id", newId);
          }
        }
      }
    }
  } catch (e) {
    // If remapping fails for any reason, fall back to original xml
    xmlIn = xml;
  }

  var newBlockIds = [];
  Blockly.Field.startCache();
  var childCount = xmlIn.childNodes.length;
  var existingGroup = Blockly.Events.getGroup();
  if (!existingGroup) Blockly.Events.setGroup(true);

  if (workspace.setResizesEnabled) workspace.setResizesEnabled(false);

  try {
    // --- PASS 1: Create all variables first ---
    for (var i = 0; i < childCount; i++) {
      var xmlChild = xmlIn.childNodes[i];
      if (xmlChild.nodeName && xmlChild.nodeName.toLowerCase() == "variables") {
        Blockly.Xml.domToVariables(xmlChild, workspace);
      }
    }

    // --- PASS 2: Create blocks and comments ---
    for (var i = 0; i < childCount; i++) {
      var xmlChild = xmlIn.childNodes[i];
      var name = xmlChild.nodeName ? xmlChild.nodeName.toLowerCase() : "";

      if (name == "block" || (name == "shadow" && !Blockly.Events.recordUndo)) {
        var block = Blockly.Xml.domToBlock(xmlChild, workspace);
        newBlockIds.push(block.id);
        var blockX = xmlChild.hasAttribute("x")
          ? parseInt(xmlChild.getAttribute("x"), 10)
          : 10;
        var blockY = xmlChild.hasAttribute("y")
          ? parseInt(xmlChild.getAttribute("y"), 10)
          : 10;
        if (!isNaN(blockX) && !isNaN(blockY)) {
          block.moveBy(workspace.RTL ? width - blockX : blockX, blockY);
        }
      } else if (name == "comment") {
        if (workspace.rendered) {
          Blockly.WorkspaceCommentSvg.fromXml(xmlChild, workspace, width);
        } else {
          Blockly.WorkspaceComment.fromXml(xmlChild, workspace);
        }
      }
      // Note: we ignore 'variables' here because we did it in Pass 1
    }
  } finally {
    if (!existingGroup) Blockly.Events.setGroup(false);
    Blockly.Field.stopCache();
  }

  if (workspace.setResizesEnabled) workspace.setResizesEnabled(true);
  return newBlockIds;
};

Blockly.Variables.generateUniqueName = function (workspace) {
  // Instead of i, j, k... let's use something that tells us WHERE the bug is
  var variableList = workspace.getAllVariables();
  return "unnamed_variable_" + (variableList.length + 1);
};

Blockly.Variables.createVariable_ = function (
  workspace,
  id,
  opt_name,
  opt_type,
) {
  //Stops creation bug with variable names.
  var potentialVariableMap = workspace.getPotentialVariableMap();
  var realWorkspace = workspace.isFlyout
    ? workspace.targetWorkspace
    : workspace;

  if (opt_name) {
    if (potentialVariableMap) {
      return potentialVariableMap.createVariable(opt_name, opt_type, id);
    } else {
      return workspace.createVariable(opt_name, opt_type, id);
    }
  }

  var existingVars = realWorkspace.getVariablesOfType(opt_type || "");
  if (existingVars.length > 0) {
    return existingVars[0];
  }

  var defaultName = opt_type === "list" ? "my list" : "variable1";
  return realWorkspace.createVariable(defaultName, opt_type, id);
};

// Wrap domToBlock so single-block imports (like duplication) also avoid id collisions.
if (Blockly.Xml && Blockly.Xml.domToBlock) {
  (function () {
    var _origDomToBlock = Blockly.Xml.domToBlock;
    Blockly.Xml.domToBlock = function (xmlBlock, workspace) {
      try {
        var xmlClone = xmlBlock.cloneNode(true);
        if (xmlClone.hasAttribute && xmlClone.hasAttribute("id")) {
          var oldId = xmlClone.getAttribute("id");
          var collides = false;
          try {
            if (workspace.getBlockById && workspace.getBlockById(oldId))
              collides = true;
            if (
              !collides &&
              workspace.getCommentById &&
              workspace.getCommentById(oldId)
            )
              collides = true;
          } catch (e) {
            collides = false;
          }
          if (collides) {
            var genId = function () {
              if (Blockly.utils && Blockly.utils.genUid)
                return Blockly.utils.genUid();
              if (Blockly.utils && Blockly.utils.createUuid)
                return Blockly.utils.createUuid();
              return "b" + Math.random().toString(36).substring(2, 10);
            };
            var newId = genId();
            while (
              (workspace.getBlockById && workspace.getBlockById(newId)) ||
              (workspace.getCommentById && workspace.getCommentById(newId))
            ) {
              newId = genId();
            }
            xmlClone.setAttribute("id", newId);
          }
        }
        return _origDomToBlock.call(this, xmlClone, workspace);
      } catch (e) {
        return _origDomToBlock.call(this, xmlBlock, workspace);
      }
    };
  })();
}


/***/ }),

/***/ 2075:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  element: "div",
  gid: "loadingScreenContainer",
  children: [
    {
      element: "div",
      className: "loadingDialogBG",
    },
    {
      element: "div",
      className: "loadingDialogBox",
      children: [
        __webpack_require__(7590),
        {
          element: "span",
          style: {
            fontSize: "30px",
          },
          textContent: "Loading...",
        },
        {
          element: "div",
          gid: "loadingScreenContent",
          style: {
            textAlign: "center",
          },
        },
      ],
    },
  ],
};


/***/ }),

/***/ 2088:
/***/ ((module) => {

const indexForPositionOnList = ({ x, y }, boxes, isRtl) => {
  if (boxes.length === 0) return null;
  let index = null;
  const leftEdge = Math.min.apply(
    null,
    boxes.map((b) => b.left),
  );
  const rightEdge = Math.max.apply(
    null,
    boxes.map((b) => b.right),
  );
  const topEdge = Math.min.apply(
    null,
    boxes.map((b) => b.top),
  );
  const bottomEdge = Math.max.apply(
    null,
    boxes.map((b) => b.bottom),
  );
  for (let n = 0; n < boxes.length; n++) {
    const box = boxes[n];
    // Construct an "extended" box for each, extending out to infinity if
    // the box is along a boundary.
    let minX = box.left === leftEdge ? -Infinity : box.left;
    let maxX = box.right === rightEdge ? Infinity : box.right;
    const minY = box.top === topEdge ? -Infinity : box.top;
    const maxY = box.bottom === bottomEdge ? Infinity : box.bottom;
    // The last item in the wrapped list gets a right edge at infinity, even
    // if it isn't the farthest right, in RTL mode. In LTR mode, it gets a
    // left edge at infinity.
    if (n === boxes.length - 1) {
      if (isRtl) {
        minX = -Infinity;
      } else {
        maxX = Infinity;
      }
    }

    // Check if the point is in the bounds.
    if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
      index = n;
      break; // No need to keep looking.
    }
  }
  return index;
};

function makeSortable(container, selector, onChange) {
  var isDragging = false;
  var draggedItem = null; // The actual DOM element
  var ghostItem = null; // The visual clone following the mouse
  var placeholder = null; // The invisible spacer in the list

  var initialIndex = null;
  var cachedBoxes = []; // Snapshot of positions at start of drag
  var startX = 0;
  var startY = 0;
  var offsetX = 0;
  var offsetY = 0;

  // 1. Mouse Down Handler
  container.onmousedown = function (e) {
    // Find the closest draggable item
    var target = e.target.closest(selector);

    // Ignore if clicking buttons/inputs inside the item
    if (
      !target ||
      e.target.tagName === "BUTTON" ||
      e.target.tagName === "INPUT"
    ) {
      return;
    }

    e.preventDefault(); // Prevent text selection
    startDrag(target, e.clientX, e.clientY);
  };

  function startDrag(target, clientX, clientY) {
    isDragging = true;
    draggedItem = target;

    // Calculate initial index
    var children = Array.from(container.children);
    initialIndex = children.indexOf(target);

    // 1. Snapshot layout (Exclude the dragged item from logic to keep grid stable)
    // We want the boxes of where items *are*, to calculate where to slot in.
    cachedBoxes = children.map((c) => {
      var rect = c.getBoundingClientRect();
      return {
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
      };
    });

    // 2. Calculate offset so the item doesn't snap to top-left of mouse
    var rect = target.getBoundingClientRect();
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;

    // 3. Create Ghost (Visual representation)
    ghostItem = document.createElement("div");
    ghostItem.style.position = "fixed";
    ghostItem.style.zIndex = "10000";
    ghostItem.style.pointerEvents = "none"; // Important: lets events pass through to calculation
    ghostItem.style.width = rect.width + "px";
    ghostItem.style.height = rect.height + "px";
    ghostItem.style.boxShadow = "0 8px 15px rgba(0,0,0,1)";
    ghostItem.style.left = clientX - offsetX + "px";
    ghostItem.style.top = clientY - offsetY + "px";
    ghostItem.style.background = "#000000";
    ghostItem.style.opacity = "0.5";
    document.body.appendChild(ghostItem);

    // 4. Style the original item to act as the "Placeholder"
    // We keep it in the DOM but make it invisible, it will move around as we sort.
    //draggedItem.style.opacity = "0.0";
    draggedItem.style.backgroundColor = "#000000";
    //draggedItem.style.visibility = "hidden"; // Keep layout space, hide content

    // 5. Add Global Listeners
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  function onMouseMove(e) {
    if (!isDragging) return;

    // 1. Move Ghost
    ghostItem.style.left = e.clientX - offsetX + "px";
    ghostItem.style.top = e.clientY - offsetY + "px";

    // 2. Calculate Index
    // Note: We check against cachedBoxes (static layout) to prevent jitter
    var newIndex = indexForPositionOnList(
      { x: e.clientX, y: e.clientY },
      cachedBoxes,
      false, // Assuming LTR for now, pass true if RTL needed
    );

    if (newIndex !== null) {
      var children = Array.from(container.children);
      var currentIndex = children.indexOf(draggedItem);

      // If the geometric index is different from where the item currently sits:
      if (newIndex !== currentIndex) {
        // Move the actual DOM element (the invisible placeholder)
        // This causes the other items to shift visually
        if (newIndex >= children.length) {
          container.appendChild(draggedItem);
        } else {
          // Logic to determine insert direction
          var refNode = children[newIndex];
          if (currentIndex < newIndex) {
            // Dragging down/right, insert after
            container.insertBefore(draggedItem, refNode.nextSibling);
          } else {
            // Dragging up/left, insert before
            container.insertBefore(draggedItem, refNode);
          }
        }
      }
    }
  }

  function onMouseUp(e) {
    if (!isDragging) return;

    // 1. Cleanup Visuals
    document.body.removeChild(ghostItem);
    draggedItem.style.backgroundColor = "";

    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);

    // 2. Calculate final change
    var children = Array.from(container.children);
    var finalIndex = children.indexOf(draggedItem);

    isDragging = false;
    ghostItem = null;
    draggedItem = null;
    cachedBoxes = [];

    // 3. Trigger Callback if changed
    if (initialIndex !== finalIndex) {
      onChange(initialIndex, finalIndex);
    }
  }
}

module.exports = { makeSortable };


/***/ }),

/***/ 2126:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var idb = __webpack_require__(602);

var dbPromise = idb.openDB("ggm3-autobackup", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('metadata')) {
      db.createObjectStore('metadata', { keyPath: 'id' });
    }
    if (!db.objectStoreNames.contains('files')) {
      db.createObjectStore('files', { keyPath: 'id' });
    }
  },
});

async function saveBackup(gameBlob, thumbBlob) {
  var db = await dbPromise;
  var id = "backup-" + Date.now();
  var MAX_VERSIONS = 10;

  var keys = await db.getAllKeys('metadata');

  var tx = db.transaction(['metadata', 'files'], 'readwrite');

  if (keys.length >= MAX_VERSIONS) {
    var numberToRemove = (keys.length - MAX_VERSIONS) + 1;
    var keysToRemove = keys.slice(0, numberToRemove);

    for (var oldId of keysToRemove) {
      tx.objectStore('metadata').delete(oldId);
      tx.objectStore('files').delete(oldId);
    }
  }

  tx.objectStore('metadata').put({
    id: id,
    thumbnail: thumbBlob,
    timestamp: Date.now()
  });

  tx.objectStore('files').put({
    id: id,
    data: gameBlob
  });

  await tx.done;
}

async function getBackups() {
    var db = await dbPromise;
    // getAll is fine for metadata since it's small (thumbnails + IDs)
    var metadata = await db.getAll('metadata');
    // Sort descending: Newest first
    return metadata.sort((a, b) => b.timestamp - a.timestamp);
}

async function getBackupData(id) {
    var db = await dbPromise;
    var fileEntry = await db.get('files', id);
    return fileEntry ? fileEntry.data : null;
}

async function deleteBackup(id) {
    var db = await dbPromise;
    var tx = db.transaction(['metadata', 'files'], 'readwrite');
    tx.objectStore('metadata').delete(id);
    tx.objectStore('files').delete(id);
    await tx.done;
}

module.exports = {
  saveBackup,
  getBackups,
  getBackupData,
  deleteBackup
};

/***/ }),

/***/ 2166:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var JSZip = __webpack_require__(1710);
var engine = __webpack_require__(9940);

const RESOURCE_FOLDER = "resources";
const RESOURCE_SOUNDS_FOLDER = "sounds";
const RESOURCE_COSTUMES_FOLDER = "costumes";
const GAME_FILE = "game.json";

var { ProgressMonitor } = __webpack_require__(6544);
var { arrayBufferToDataURL, dataURLToArrayBuffer } = __webpack_require__(8570);

var {
  getCostumeData,
  getSoundData,
  loadCostume,
  loadSound,
} = __webpack_require__(2695);

const {
  toEngineJSON,
  toSpriteJSON,
  toCostumeJSON,
  toSoundJSON,

  fromEngineJSON,
  fromSpriteJSON,
  fromCostumeJSON,
  fromSoundJSON,
} = __webpack_require__(7405);

var {
  compileSprite,
  saveCurrentSpriteCode,
  compileAllSprites,
} = __webpack_require__(7802);

function calculateProjectSaveMax() {
  var max = 0;
  for (var sprite of engine.sprites) {
    max += sprite.costumes.length;
    max += sprite.sounds.length;
  }
  return max;
}

//Writing a entire game file.

async function saveProjectZip(progress = new ProgressMonitor()) {
  saveCurrentSpriteCode(); //Save current code to be safe that its saved.

  var zip = new JSZip();
  zip.folder(RESOURCE_FOLDER);

  var max = calculateProjectSaveMax();
  progress.calculatedMax(max);
  progress.current = 0;

  var spriteArray = [];
  var spriteIndex = 0;
  for (var sprite of engine.sprites) {
    var spriteJson = toSpriteJSON(sprite); //add the sprite properties, without the sound and costume properties.

    //Some bit of organizing the folders.
    zip.folder(`${RESOURCE_FOLDER}/${spriteIndex}`);
    zip.folder(`${RESOURCE_FOLDER}/${spriteIndex}/${RESOURCE_COSTUMES_FOLDER}`);
    zip.folder(`${RESOURCE_FOLDER}/${spriteIndex}/${RESOURCE_SOUNDS_FOLDER}`);

    //Manually create the costumes array.
    var costumeData = getCostumeData(sprite, spriteIndex);
    spriteJson.costumes = [];
    for (var file of costumeData) {
      var arrayBuffer = await dataURLToArrayBuffer(file.dataURL);
      var filePath = `${RESOURCE_FOLDER}/${spriteIndex}/${RESOURCE_COSTUMES_FOLDER}/${file.fileName}`;
      zip.file(filePath, arrayBuffer);
      progress.current += 1;

      var costumeJson = file.costumeJson; //get costume property data.
      costumeJson.file = filePath; //add file path to read later.
      spriteJson.costumes.push(costumeJson);
    }

    //Manually create the sounds array.
    var soundData = getSoundData(sprite, spriteIndex);
    spriteJson.sounds = [];
    for (var file of soundData) {
      var arrayBuffer = await dataURLToArrayBuffer(file.dataURL);
      var filePath = `${RESOURCE_FOLDER}/${spriteIndex}/${RESOURCE_SOUNDS_FOLDER}/${file.fileName}`;
      zip.file(filePath, arrayBuffer);
      progress.current += 1;

      var soundJson = file.soundJson; //get sound property data.
      soundJson.file = filePath; //add file path to read later.
      spriteJson.sounds.push(soundJson);
    }

    spriteArray.push(spriteJson);

    spriteIndex += 1;
  }

  var engineJson = toEngineJSON();
  engineJson.sprites = spriteArray;

  zip.file(GAME_FILE, JSON.stringify(engineJson));

  progress.finish();
  return zip;
}

async function saveProjectZipBlob(progress = new ProgressMonitor()) {
  var zip = await saveProjectZip(progress);
  var blob = await zip.generateAsync({ type: "blob" });
  progress.finish();
  return blob;
}

//Loading an entire game file.

async function loadProjectZip(zipSource, progress = new ProgressMonitor()) {
  var zip = await JSZip.loadAsync(zipSource);

  var gameFile = zip.file(GAME_FILE);
  if (!gameFile) {
    throw new Error("Game JSON file doesn't exist in zip file.");
    // removed by dead control flow

  }
  try {
    var engineJson = JSON.parse(await gameFile.async("string"));
  } catch (e) {
    console.error("Corrupt game JSON: ", e);
    throw new Error(
      "The project game JSON data is corrupt. Check the console for errors.",
    );
    // removed by dead control flow

  }

  //Calculate the amount of assets to be loaded.
  var max = 0;
  for (var sprite of engineJson.sprites) {
    max += sprite.costumes.length;
    max += sprite.sounds.length;
  }
  progress.calculatedMax(max);

  //Load everything

  engine.emptyProject(); //Start from empty project

  fromEngineJSON(engineJson);

  for (var spriteJson of engineJson.sprites) {
    var sprite = engine.createEmptySprite();

    //Load costumes

    for (var costumeJson of spriteJson.costumes) {
      var mimeType = costumeJson.mimeType ? costumeJson.mimeType : "image/png"; //Fallback to PNG file type if it doesn't have a mime type.
      var filePath = costumeJson.file;

      var file = zip.file(filePath); //Find the file
      if (!file) {
        throw new Error(
          `Unable to locate file path "${filePath}" in the ggm3 file.`,
        );
        // removed by dead control flow

      }
      var arrayBuffer = await file.async("arraybuffer");
      var dataURL = await arrayBufferToDataURL(arrayBuffer, mimeType);

      await loadCostume(sprite, costumeJson, dataURL);
      progress.current += 1;
    }

    //Load sounds

    for (var soundJson of spriteJson.sounds) {
      var mimeType = soundJson.mimeType ? soundJson.mimeType : "audio/mp3"; //Fallback to MP3 file type if it doesn't have a mime type.
      var filePath = soundJson.file;

      var file = zip.file(filePath); //Find the file
      if (!file) {
        throw new Error(
          `Unable to locate file path "${filePath}" in the ggm3 file.`,
        );
        // removed by dead control flow

      }
      var arrayBuffer = await file.async("arraybuffer");
      var dataURL = await arrayBufferToDataURL(arrayBuffer, mimeType);

      await loadSound(sprite, soundJson, dataURL);
      progress.current += 1;
    }

    //Add sprite properties.
    fromSpriteJSON(sprite, spriteJson);
  }

  await compileAllSprites();

  progress.finish();
}

module.exports = {
  saveProjectZip,
  saveProjectZipBlob,

  loadProjectZip,
};


/***/ }),

/***/ 2194:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var gameSettingOptions = {};
var elements = __webpack_require__(7255);
var engine = __webpack_require__(9940);

function numberInputEventListeners() {
  return {
    eventListeners: [
      {
        event: "change",
        func: function () {
          this.value = +this.value;
          if (+this.value > +this.max) {
            this.value = +this.max;
          }
          if (+this.value < +this.min) {
            this.value = +this.min;
          }
        },
      },
    ],
  };
}

gameSettingOptions.elements = [
  //Game resolution
  {
    element: "div",
    className: "infoDiv",
    children: [
      {
        element: "b",
        textContent: "Game resolution: ",
      },

      {
        element: "br",
      },
      {
        element: "span",
        textContent: "Width: ",
      },
      {
        element: "input",
        ...numberInputEventListeners(),
        type: "number",
        min: 1,
        max: 99999,
        value: 5,
        gid: "game-settings-gameWidth",
      },

      {
        element: "br",
      },
      {
        element: "span",
        textContent: "Height: ",
      },
      {
        element: "input",
        ...numberInputEventListeners(),
        type: "number",
        min: 1,
        max: 99999,
        value: 5,
        gid: "game-settings-gameHeight",
      },
    ],
  },
  //Game runtime
  {
    element: "div",
    className: "infoDiv",
    children: [
      {
        element: "b",
        textContent: "Game runtime: ",
      },

      {
        element: "br",
      },
      {
        element: "span",
        textContent: "Framerate: ",
      },
      {
        element: "input",
        ...numberInputEventListeners(),
        type: "number",
        min: 1,
        max: 500,
        value: 5,
        gid: "game-settings-frameRate",
      },

      {
        element: "br",
      },
    ],
  },
];

gameSettingOptions.start = function () {
  var widthInput = elements.getGPId("game-settings-gameWidth");
  var heightInput = elements.getGPId("game-settings-gameHeight");
  var frameRateInput = elements.getGPId("game-settings-frameRate");

  widthInput.addEventListener("change", () => {
    engine.gameWidth = +widthInput.value || 1;
    engine.updateCanvasSize();
  });

  frameRateInput.addEventListener("change", () => {
    engine.setFramerate(frameRateInput.value);
  });

  heightInput.addEventListener("change", () => {
    engine.gameHeight = +heightInput.value || 1;
    engine.updateCanvasSize();
  });

  function updateGameInfo() {
    widthInput.value = engine.gameWidth;
    heightInput.value = engine.gameHeight;
    frameRateInput.value = engine.frameRate;
  }

  engine.on(engine.RESOLUTION_UPDATED, updateGameInfo);
  engine.on(engine.FRAMERATE_CHANGED, updateGameInfo);
  updateGameInfo();
};

module.exports = gameSettingOptions;


/***/ }),

/***/ 2199:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var elements = __webpack_require__(7255);

// Menubar JSON descriptor with builtin API to add dropdown menus at runtime.
module.exports = {
  element: "div",
  className: "menuBar",
  gid: "menuBar",
  children: [
    {
      element: "div",
      className: "menuBarItemLogo",
      children: [
        {
          element: "img",
          src: "logo/logo.png",
          className: "menuBarItemLogoImg",
        },
      ],
    },
    {
      element: "div",
      className: "menuBarMenus",
      gid: "menuBarMenus",
    },
  ],
};


/***/ }),

/***/ 2242:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Costume = __webpack_require__(2001);
var Sound = __webpack_require__(5460);
var Thread = __webpack_require__(3591);
var SpriteEffects = __webpack_require__(9009);
var SoundManager = __webpack_require__(5873);
var SpriteMaster = __webpack_require__(3044);
var TWEEN = __webpack_require__(484);

class Sprite {
  constructor(engine, name) {
    var id = "";
    id += Date.now();
    id += "_";
    id += Math.round(Math.random() * 999999);
    this.id = id;

    this.costumes = [];
    this.sounds = [];
    this.costumeIndex = 0;
    this.engine = engine;
    this.errorLogs = [];

    this.name = name || "Sprite";
    this.blocklyXML = null; //Used to hold code for the editor.

    this.scaleX = 1;
    this.scaleY = 1;
    this.size = 100;
    this.skewX = 0;
    this.skewY = 0;
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.tween = engine.tween;

    this.hatFunctions = {};
    this.listeners = {
      beforestart: [],
      started: [],
      clonestart: [],
    };
    this.runningStacks = {};
    this.frameListeners = [];

    this.threadEndListener = null;
    this.threadErrorListener = null;
    this.threadStartListener = null;

    this.direction = 90; //Wrapper around this.angle

    this.alpha = 100;

    this._variable_ids_ = [];
    this.variables = {};

    this.zIndex = 0;
    this.hidden = false;

    this.costumeMap = {}; //Used to switch costumes by name quickly.
    this.soundMap = {};

    this.customBlockListeners = {};
    this.customBlockRef = {};

    this.spriteFunctions = {};
    this.isClone = false;
    this.parent = null; //This is used by clones.
    this.clones = [];
    this.effects = new SpriteEffects(this);

    this.errorLogs = [];

    this.broadcastListeners = [];

    this.playingSounds = {};
    this.soundManager = new SoundManager(engine, this);

    this.spriteProperties = {};

    this.spriteMaster = new SpriteMaster(this);
  }

  goTo (target) {
    if (target == "__mouse_pointer__") {
      this.x = this.engine.mouseX;
      this.y = this.engine.mouseY;
      return;
    }
    var targetSprite = this.findSpriteByName(target);
    if (!targetSprite) {
      return;
    }
    this.x = targetSprite.x;
    this.y = targetSprite.y;
  }

  get costumeName() {
    if (!this.costume) {
      return;
    }
    return this.costume.name;
  }

  removeProperty(name) {
    delete this.spriteProperties[name];
  }

  setSProperty(spriteName, name, value) {
    var targetSprite = this.findSpriteByName(spriteName);
    if (!targetSprite) {
      return;
    }
    targetSprite.spriteProperties[name] = value;
  }

  changeSProperty(spriteName, name, value) {
    var targetSprite = this.findSpriteByName(spriteName);
    if (!targetSprite) {
      return;
    }
    targetSprite.spriteProperties[name] =
      (+targetSprite.spriteProperties[name] || 0) + (+value || 0);
  }

  getSProperty(spriteName, name) {
    var targetSprite = this.findSpriteByName(spriteName);
    if (!targetSprite) {
      return;
    }
    return targetSprite.spriteProperties[name];
  }

  set skewX(v) {
    this._skewX = this.wrapClamp(v + 90, -179, 180) - 90;
  }
  get skewX() {
    return this._skewX;
  }

  set skewY(v) {
    this._skewY = this.wrapClamp(v + 90, -179, 180) - 90;
  }
  get skewY() {
    return this._skewY;
  }

  stopAllSounds() {
    this.soundManager.stopAllSounds();
  }

  stopAllWaitingSounds() {
    this.soundManager.stopAllWaitingSounds();
  }

  getSound(identifier) {
    var index = this.soundMap[identifier];
    if (this.soundMap[index]) {
      return this.sounds[index];
    }

    if (!isNaN(+identifier)) {
      return this.sounds[+identifier];
    }

    return null;
  }

  stopSound(identifier) {
    var sound = this.getSound(identifier);
    if (!sound) {
      return;
    }
    this.soundManager.stopSound(sound);
  }

  playSound(identifier) {
    var sound = this.getSound(identifier);
    if (!sound) {
      return;
    }
    this.soundManager.startSound(sound);
  }

  setSoundEffect(identifier, name, value) {
    var sound = this.getSound(identifier);
    if (!sound) {
      return;
    }
    this.soundManager.setEffect(sound, name, value);
  }

  getSoundEffect(identifier, name, value) {
    var sound = this.getSound(identifier);
    if (!sound) {
      return 0;
    }
    return this.soundManager.getEffect(sound, name, value);
  }

  changeSoundEffect(identifier, name, value) {
    var sound = this.getSound(identifier);
    if (!sound) {
      return 0;
    }
    return this.soundManager.changeEffect(sound, name, value);
  }

  async playSoundUntilDone(identifier = "") {
    var sound = this.getSound(identifier);
    if (!sound) {
      return;
    }
    await this.soundManager.playSoundUntilDone(sound);
  }

  toString() {
    if (this.isClone) {
      return `[Sprite - clone of "${this.parent.name}"]`;
    }
    return `[Sprite - "${this.name}"]`;
  }

  isTouchingMouse() {
    if (!this.mask) {
      return false;
    }
    this.alignMask();
    if (this.engine.mouseMask.collisionTest(this.mask)) {
      return true;
    }
    return false;
  }

  isTouchingSprite(otherSpriteName) {
    if (otherSpriteName == "__mouse_pointer__") {
      return this.isTouchingMouse();
    }
    if (this.hidden) {
      return false;
    }
    var otherSprite = this.findSpriteByName(otherSpriteName);
    if (!otherSprite) {
      return false;
    }
    for (var clone of otherSprite.clones) {
      if (this.isTouchingSprite(clone)) {
        return clone;
      }
    }
    if (otherSprite.hidden) {
      return false;
    }
    this.alignMask();
    otherSprite.alignMask();
    var mask1 = this.mask;
    var mask2 = otherSprite.mask;
    if (!mask1) {
      return false;
    }
    if (!mask2) {
      return false;
    }
    if (mask1.collisionTest(mask2)) {
      return otherSprite;
    }
    return false;
  }

  isTouchingSpriteWithPropertySet(otherSpriteName, propName, propValue) {
    if (otherSpriteName == "__mouse_pointer__") {
      return this.isTouchingMouse();
    }
    if (this.hidden) {
      return false;
    }
    var otherSprite = this.findSpriteByName(otherSpriteName);
    if (!otherSprite) {
      return false;
    }
    for (var clone of otherSprite.clones) {
      if (this.isTouchingSpriteWithPropertySet(clone, propName, propValue)) {
        return clone;
      }
    }
    if (otherSprite.hidden) {
      return false;
    }
    this.alignMask();
    otherSprite.alignMask();
    var mask1 = this.mask;
    var mask2 = otherSprite.mask;
    if (!mask1) {
      return false;
    }
    if (!mask2) {
      return false;
    }
    if (otherSprite.spriteProperties[propName] == propValue) {
      if (mask1.collisionTest(mask2)) {
        return otherSprite;
      }
    }
    return false;
  }

  onErrorLog(error) {
    //Expected to be overridden by the editor.

    console.error("Sprite code error: ", error); //Used for exported games.
  }

  removeCloneFromList(clone) {
    this.clones = this.clones.filter(
      (otherClone) => clone.id !== otherClone.id,
    );
  }

  destroyClone() {
    if (!this.isClone) {
      return;
    }
    this.stopAllScripts();
    this.parent.removeCloneFromList(this);
    this.dispose();
  }

  deleteClones() {
    if (this.isClone) {
      return this.parent.deleteClones();
    }
    for (var sprite of this.clones) {
      sprite.destroyClone();
    }
  }

  createClone(inheritSprite) {
    var spriteOrigin = inheritSprite;
    if (!inheritSprite) {
      spriteOrigin = this;
    }
    if (this.isClone) {
      return this.parent.createClone(this);
    }
    var sprite = new Sprite(this.engine, "Clone of " + this.name);
    sprite.isClone = true;
    sprite.parent = this;
    sprite.x = spriteOrigin.x;
    sprite.y = spriteOrigin.y;
    sprite.costumeIndex = spriteOrigin.costumeIndex;
    sprite.hidden = spriteOrigin.hidden;
    sprite.alpha = spriteOrigin.alpha;
    sprite.angle = spriteOrigin.angle;
    sprite.scaleX = spriteOrigin.scaleX;
    sprite.scaleY = spriteOrigin.scaleY;
    sprite.size = spriteOrigin.size;
    sprite.zIndex = spriteOrigin.zIndex;
    sprite.skewX = spriteOrigin.skewX;
    sprite.skewY = spriteOrigin.skewY;

    sprite.spriteFunctions = this.spriteFunctions;
    sprite.sounds = this.sounds;
    sprite.soundMap = this.soundMap;
    sprite.costumes = this.costumes;
    sprite.costumeMap = this.costumeMap;

    for (var variable of Object.keys(spriteOrigin.variables)) {
      try {
        sprite.variables[variable] = JSON.parse(
          JSON.stringify(spriteOrigin.variables[variable]),
        ); //This clones the variable value, including json values.
      } catch (e) {
        sprite.variables[variable] = spriteOrigin.variables[variable]; //If it fails, just assign directly.
      }
    }

    for (var variable of Object.keys(spriteOrigin.spriteProperties)) {
      try {
        sprite.spriteProperties[variable] = JSON.parse(
          JSON.stringify(spriteOrigin.spriteProperties[variable]),
        ); //This clones the variable value, including json values.
      } catch (e) {
        sprite.spriteProperties[variable] =
          spriteOrigin.spriteProperties[variable]; //If it fails, just assign directly.
      }
    }

    this.clones.push(sprite);

    for (var key of Object.keys(this.spriteFunctions)) {
      sprite.runFunctionID(key);
    }
    sprite.emitStackListener("clonestart");
  }

  findSpriteByName(name) {
    if (name instanceof Sprite) {
      return name;
    }
    if (name == "_myself_") {
      return this;
    }
    return this.engine.findSpriteByName(name);
  }

  addCustom(id, ref, func) {
    this.customBlockRef[ref] = id;
    this.customBlockListeners[id] = func;
  }
  /* @todo find a faster way to call and manage custom blocks. */
  async callCustom(id, values = {}, thisThread) {
    if (this.customBlockRef[id]) {
      await this.customBlockListeners[this.customBlockRef[id]](
        values,
        thisThread,
      );
    }
  }

  getCostumeIndex(v) {
    if (isNaN(+v)) {
      return this.costumeMap[v];
    } else {
      return Math.round(+v);
    }
  }

  getCostume(v) {
    var costumeIndex = this.getCostumeIndex(v);
    if (typeof costumeIndex == "number") {
      return this.costumes[costumeIndex];
    } else {
      return null;
    }
  }

  setCostumeRenderScale(costumeRef, scale) {
    var costume = this.getCostume(costumeRef);
    var scaleNumber = +scale || 0;
    if (scaleNumber < 0.001) {
      scaleNumber = 0.001;
    }
    if (costume) {
      costume.preferedScale = scaleNumber;
    }
  }

  blockRerenderCostume(costumeRef, scale) {
    var costume = this.getCostume(costumeRef);
    if (costume) {
      costume.renderImageAtScale();
    }
  }

  isCostumeLoaded(costumeRef) {
    var costume = this.getCostume(costumeRef);
    if (costume) {
      return !!costume.loaded;
    } else {
      return false;
    }
  }

  async blockLoadCostume(number) {
    var costume = this.getCostume(number);
    if (!costume) {
      return;
    }
    await costume.loadCostume();
  }

  async blockDeloadCostume(number) {
    var costume = this.getCostume(number);
    if (!costume) {
      return;
    }
    await costume.deloadCostume();
  }

  async blockLoadSound(number) {
    var sound = this.getSound(number);
    if (!sound) {
      return;
    }
    await sound.loadSound();
  }

  soundIsLoaded(number) {
    var sound = this.getSound(number);
    if (!sound) {
      return false;
    }
    return sound.data ? true : false;
  }

  async blockDeloadSound(number) {
    var sound = this.getSound(number);
    if (!sound) {
      return;
    }
    await sound.deloadSound();
  }

  blockGetCostumeScale(number) {
    var costume = this.getCostume(number);
    if (!costume) {
      return;
    }
    return costume.preferedScale;
  }

  switchCostume(number) {
    var costumeIndex = this.getCostumeIndex(v);
    if (typeof costumeIndex == "number") {
      this.costumeIndex = costumeIndex;
    }
  }

  get costume() {
    if (this.costumes[this.costumeIndex]) {
      return this.costumes[this.costumeIndex];
    }
  }

  get mask() {
    if (this.costumes[this.costumeIndex]) {
      return this.costumes[this.costumeIndex].mask;
    }
  }

  alignMask() {
    var costume = this.costume;
    var mask = this.mask;
    if (!mask) {
      return;
    }
    mask.scaleX = ((this.size / 100) * this.scaleX) / costume.currentScale;
    mask.scaleY = ((this.size / 100) * this.scaleY) / costume.currentScale;
    mask.x = this.x;
    mask.y = -this.y; //Negative because Y is inverted in GGM3 coordinates.
    mask.centerX = costume.rotationCenterX * costume.currentScale;
    mask.centerY = costume.rotationCenterY * costume.currentScale;
    mask.angle = this.angle;
  }

  ensureUniqueName() {
    this.engine.makeUniqueSpriteNames();
  }

  ensureUniqueCostumeNames() {
    //This is called alot by the editor and engine, so we can use this to map out costume names.
    var existingNames = [];
    var nameCounts = {};
    var _this = this;
    this.costumeMap = {};
    this.costumes.forEach((costume, i) => {
      _this.costumeMap[costume.name] = i;
      if (existingNames.indexOf(costume.name) !== -1) {
        if (nameCounts[costume.name]) {
          nameCounts[costume.name] += 1;
        } else {
          nameCounts[costume.name] = 1;
        }
        costume.name = costume.name + ` (${nameCounts[costume.name]})`;
      } else {
        existingNames.push(costume.name);
      }
    });
  }

  ensureUniqueSoundNames() {
    //This is called alot by the editor and engine, so we can use this to map out sound names.
    var existingNames = [];
    var nameCounts = {};
    var _this = this;
    this.soundMap = {};
    this.sounds.forEach((sound, i) => {
      _this.soundMap[sound.name] = i;
      if (existingNames.indexOf(sound.name) !== -1) {
        if (nameCounts[sound.name]) {
          nameCounts[sound.name] += 1;
        } else {
          nameCounts[sound.name] = 1;
        }
        sound.name = sound.name + ` (${nameCounts[sound.name]})`;
      } else {
        existingNames.push(sound.name);
      }
    });
  }

  getSound(v) {
    if (isNaN(+v)) {
      return this.sounds[this.soundMap[v]];
    } else {
      return this.sounds[v];
    }
  }

  getAllVariableIDS() {
    return Object.keys(this.variables);
  }

  //Function used by editor that tracks new and old variables.
  editorScanVariables(workspace) {
    var ids = this.getAllVariableIDS();
    var variables = workspace.getVariablesOfType("");
    variables.sort(Blockly.VariableModel.compareByName);

    var unusedOnes = ids.map((id) => id);
    for (var blocklyVariable of variables) {
      var id = blocklyVariable.getId();
      var exists = ids.indexOf(blocklyVariable.getId()) !== -1;

      if (exists) {
        unusedOnes = unusedOnes.filter((id2) => id2 !== id);
      } else {
        this.variables[id] = 0; //The default value is zero.
      }
    }

    for (var unusedId of unusedOnes) {
      delete this.variables[unusedId];
    }
  }

  set alpha(v = 0) {
    this._alpha = v;
    if (v > 100) {
      this._alpha = 100;
    }
    if (v < 0) {
      this._alpha = 0;
    }
  }

  get alpha() {
    return this._alpha;
  }

  moveSteps(steps) {
    var rad = this.angle * (Math.PI / 180);
    this.x += Math.cos(rad) * steps;
    this.y -= Math.sin(rad) * steps;
  }

  wrapClamp(n, min, max) {
    const range = max - min + 1;
    return n - Math.floor((n - min) / range) * range;
  }

  set direction(v) {
    this.angle = this.wrapClamp(v, -179, 180) - 90;
  }
  get direction() {
    return this.angle + 90;
  }

  _addFrameListener(resolve) {
    this.frameListeners.push(resolve);
  }

  emitFrameListeners() {
    this.frameListeners.forEach((f) => f());
    this.frameListeners = [];
  }

  stopScript(firstBlockID) {
    if (!this.runningStacks[firstBlockID]) {
      return;
    }
    this.runningStacks[firstBlockID].stop();
    delete this.runningStacks[firstBlockID];
  }

  removeBroadcastListener(blockID) {
    var listeners = this.broadcastListeners;
    for (var listener of Object.keys(listeners)) {
      if (listeners[listener].indexOf(blockID) !== -1) {
        listeners[listener] = listeners[listener].filter(
          (id) => id !== blockID,
        );
        if (listeners[listener].length == 0) {
          delete listeners[listener];
        }
      }
    }
  }

  removeStackListener(blockID) {
    this.removeBroadcastListener(blockID);
    for (var listener of Object.keys(this.listeners)) {
      if (this.listeners[listener].indexOf(blockID) !== -1) {
        this.listeners[listener] = this.listeners[listener].filter(
          (id) => id !== blockID,
        );
      }
    }

    for (var key of Object.keys(this.customBlockRef)) {
      if (this.customBlockRef[key] == blockID) {
        delete this.customBlockRef[key];
      }
    }
    delete this.hatFunctions[blockID];
    delete this.customBlockListeners[blockID];
  }

  removeSpriteFunction(blockID) {
    this.spriteFunctions[blockID] = null;
    delete this.spriteFunctions[blockID];
  }

  addStackListener(name, blockID, func) {
    this.removeStackListener(blockID);
    if (this.listeners[name]) {
      this.listeners[name].push(blockID);
      this.hatFunctions[blockID] = func;
    }
  }

  addBroadcastListener(name, blockID, func) {
    this.removeStackListener(blockID);
    if (this.broadcastListeners[name]) {
      this.broadcastListeners[name].push(blockID);
      this.hatFunctions[blockID] = func;
    } else {
      this.broadcastListeners[name] = [blockID];
      this.hatFunctions[blockID] = func;
    }
  }

  emitStackListener(name, ...args) {
    if (this.listeners[name]) {
      for (var blockID of this.listeners[name]) {
        if (this.hatFunctions[blockID]) {
          this.hatFunctions[blockID](...args);
        }
      }
    }
  }

  emitBroadcastListener(name, ...args) {
    var promises = [];
    if (this.broadcastListeners[name]) {
      for (var blockID of this.broadcastListeners[name]) {
        if (this.hatFunctions[blockID]) {
          promises.push(this.hatFunctions[blockID](...args));
        }
      }
    }
    return Promise.all(promises);
  }

  stopAllScripts() {
    for (var thread of Object.keys(this.runningStacks)) {
      this.stopScript(thread);
    }
    this.stopAllWaitingSounds();
  }

  stopAllScriptsExceptThread(thread) {
    for (var thread2 of Object.keys(this.runningStacks)) {
      if (thread2 !== thread.id) {
        this.stopScript(thread2);
      }
    }
    this.stopAllWaitingSounds();
  }

  stopAllScriptsExceptThreads(threadIds = []) {
    for (var thread2 of Object.keys(this.runningStacks)) {
      if (!threadIds.includes(thread2)) {
        this.stopScript(thread2);
      }
    }
    this.stopAllWaitingSounds();
  }

  createThread(firstBlockID) {
    this.stopScript(firstBlockID);
    var thread = new Thread(firstBlockID, this);
    this.runningStacks[firstBlockID] = thread;
    if (this.threadStartListener) {
      this.threadStartListener(firstBlockID);
    }
    return thread;
  }
  removeThread(firstBlockID) {
    var thread = this.runningStacks[firstBlockID];
    try {
      if (thread && this.threadErrorListener && thread.hadError) {
        if (thread.isPreviewMode) {
          //Means that the block was clicked, so skip error handling (this stops it from glowing it).
          if (this.threadEndListener) {
            this.threadEndListener(firstBlockID);
          }
          return;
        }
        this.threadErrorListener(firstBlockID, thread.output);
      } else if (this.threadEndListener) {
        this.threadEndListener(firstBlockID);
      }
    } finally {
      delete this.runningStacks[firstBlockID];
    }
  }

  getFunction(code) {
    const func = new Function(
      'sprite', 
      'engine', 
      'spriteMaster', 
      `
       return (async function() { 
         ${code} 
       })();`
    );
    
    return func;
  }

  addFunction(code, blockID) {
    var func = this.getFunction(code);
    this.spriteFunctions[blockID] = func;
  }

  async callCompiledFunction(func) {
    return await func(this, this.engine, this.spriteMaster);
  }

  async runFunction(code) {
    var func = this.getFunction(code);
    return await this.callCompiledFunction(func);
  }

  async runFunctionID(blockID) {
    var func = this.spriteFunctions[blockID];
    return await this.callCompiledFunction(func);
  }

  addCostume(dataURL, name) {
    if (this.isClone) {
      throw new Error("Clones can't create their own costumes.");
    }
    var _this = this;
    return new Promise(function (resolve, reject) {
      var costume = new Costume(
        _this.engine,
        dataURL,
        name ? name : "Costume " + (_this.costumes.length + 1),
        function (success) {
          if (success) {
            resolve(costume);
          } else {
            reject("");
          }
        },
      );
      costume.loadCostume();
      _this.costumes.push(costume);
      _this.ensureUniqueCostumeNames();
    });
  }

  addCostumeWithoutLoading(url, name) {
    if (this.isClone) {
      throw new Error("Clones can't create their own costumes.");
    }
    var costume = new Costume(
      this.engine,
      url,
      name ? name : "Costume " + (this.costumes.length + 1),
    );
    this.costumes.push(costume);
    this.ensureUniqueCostumeNames();
    return costume;
  }

  addSound(dataURL, name) {
    if (this.isClone) {
      throw new Error("Clones can't create their own sounds.");
    }
    var _this = this;
    return new Promise(function (resolve, reject) {
      var s = new Sound(_this.engine, _this, dataURL, function (success) {
        if (success) {
          resolve(s);
        } else {
          reject("");
        }
      });
      s.loadSound();
      s.name = name ? name : "Sound " + (_this.sounds.length + 1);
      _this.sounds.push(s);
      _this.ensureUniqueSoundNames();
    });
  }

  addSoundWithoutLoading(url, name) {
    if (this.isClone) {
      throw new Error("Clones can't create their own sounds.");
    }
    var s = new Sound(this.engine, this, url);
    s.name = name ? name : "Sound " + (this.sounds.length + 1);
    this.sounds.push(s);
    this.ensureUniqueSoundNames();
    return s;
  }

  deleteCostume(costume) {
    if (this.isClone) {
      throw new Error("Clones can't delete their own costumes.");
    }
    costume.dispose();
    this.costumes = this.costumes.filter((c) => c.id !== costume.id);
    this.ensureUniqueCostumeNames(); //This also causes the costume mapping to happen.
  }

  deleteSound(sound) {
    if (this.isClone) {
      throw new Error("Clones can't delete their own sounds.");
    }
    sound.dispose();
    this.sounds = this.sounds.filter((s) => s.id !== sound.id);
    this.ensureUniqueCostumeNames(); //This also causes the costume mapping to happen.
  }

  dispose() {
    if (!this.isClone) {
      for (var costume of this.costumes) {
        this.deleteCostume(costume);
      }
      for (var sound of this.sounds) {
        this.deleteSound(sound);
      }
    }
    this.stopAllScripts();
    this.costumes = [];
    this.id = null;
    this.engine = null;
    this.spriteMaster.dispose();
  }

  delete() {
    if (this.isClone) {
      throw new Error("This sprite is a clone, use destroyClone instead.");
    }
    this.engine.deleteSprite(this);
  }
}

module.exports = Sprite;


/***/ }),

/***/ 2290:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  element: "div",
  className: "leftPanel",
  children: [
    {
      element: "div",
      className: "tabArea",
      gid: "tabArea",
    },
    {
      element: "div",
      className: "tabWindow",
      gid: "tabWindow",
      children: [
        {
          element: "div",
          className: "blocklyDiv",
          gid: "blocklyDiv",
        },
        {
          element: "div",
          className: "costumesContainer",
          gid: "costumesContainer",
          children: [
            {
              element: "div",
              className: "costumesHeaderContainer",
              gid: "costumesHeaderContainer",
            },
            {
              element: "div",
              className: "costumesSelectorContainer",
              gid: "costumesSelectorContainer",
            },
          ],
        },
        {
          element: "div",
          className: "soundsContainer",
          gid: "soundsContainer",
          children: [
            {
              element: "div",
              className: "soundsHeaderContainer",
              gid: "soundsHeaderContainer",
            },
            {
              element: "div",
              className: "soundsSelectorContainer",
              gid: "soundsSelectorContainer",
            },
          ],
        },
        __webpack_require__(8289),
        {
          element: "div",
          className: "errorLogsContainer",
          gid: "errorLogsContainer",
        },
      ],
    },
  ],
};


/***/ }),

/***/ 2456:
/***/ ((module) => {

function init(state, deps) {
  function compileSpriteXML(spr) {
    async function compileRoot(rootBlock) {
      if (!rootBlock) return;
      if (deps.compiler.isStarterBlock(rootBlock)) {
        try {
          var code = deps.compiler.compileBlock(rootBlock);
          var allSprs = [spr].concat(spr.clones);
          for (var cspr of allSprs) {
            cspr.removeSpriteFunction(rootBlock.id);
            cspr.addFunction(code, rootBlock.id);
            cspr.runFunctionID(rootBlock.id);
          }
        } catch (e) {
          return;
        }
      }
    }
    var div = document.createElement("div");
    document.body.append(div);
    var tempWorkspace = Blockly.inject(div, {
      comments: true,
      disable: false,
      collapse: false,
      media: "../media/",
      readOnly: false,
      rtl: false,
      scrollbars: false,
      trashcan: false,
      sounds: false,
    });

    if (spr.blocklyXML) {
      Blockly.Xml.domToWorkspace(spr.blocklyXML, tempWorkspace);
    }

    var blocks = tempWorkspace.getTopBlocks(true);
    for (var block of blocks) {
      compileRoot(block.getRootBlock());
    }

    tempWorkspace.dispose();
    div.remove();
  }

  async function compileAllSprites() {
    async function compileRoot(rootBlock, spr) {
      if (!rootBlock) return;
      if (deps.compiler.isStarterBlock(rootBlock)) {
        try {
          var code = deps.compiler.compileBlock(rootBlock);
          var allSprs = [spr].concat(spr.clones);
          for (var cspr of allSprs) {
            cspr.removeSpriteFunction(rootBlock.id);
            cspr.addFunction(code, rootBlock.id);
            cspr.runFunctionID(rootBlock.id);
          }
        } catch (e) {
          return;
        }
      }
    }
    var div = document.createElement("div");
    document.body.append(div);
    var tempWorkspace = Blockly.inject(div, {
      comments: true,
      disable: false,
      collapse: false,
      media: "../media/",
      readOnly: false,
      rtl: false,
      scrollbars: false,
      trashcan: false,
      sounds: false,
    });
    tempWorkspace.setVisible(false);
    div.style.display = "none";

    for (var spr of deps.engine.sprites) {
      tempWorkspace.clear();

      if (spr.blocklyXML) {
        Blockly.Xml.domToWorkspace(spr.blocklyXML, tempWorkspace);
      }

      var blocks = tempWorkspace.getTopBlocks(true);
      for (var block of blocks) {
        compileRoot(block.getRootBlock(), spr);
        await new Promise((r) => setTimeout(r, 2));
      }
      await new Promise((r) => setTimeout(r, 2));
    }

    tempWorkspace.dispose();
    div.remove();
  }

  // helper used by other UI code to show a sprite's workspace in a temp area
  function loadWorkspaceFromSprite(spr) {
    var div = document.createElement("div");
    document.body.append(div);
    var tempWorkspace = Blockly.inject(div, {
      comments: true,
      disable: false,
      collapse: false,
      media: "../media/",
      readOnly: false,
      rtl: false,
      scrollbars: false,
      trashcan: false,
      sounds: false,
    });

    if (spr.blocklyXML) {
      Blockly.Xml.domToWorkspace(spr.blocklyXML, tempWorkspace);
    }

    return tempWorkspace;
  }

  return { compileSpriteXML, compileAllSprites, loadWorkspaceFromSprite };
}

module.exports = { init };


/***/ }),

/***/ 2498:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var elements = __webpack_require__(7255);
var engine = __webpack_require__(9940);
var dialogs = __webpack_require__(269);

//This stuff is used from GM2 (Gvbvdxx Mod 2 - Modified TurboWarp), edited to fit GGM3.

var GGM3Type = {
  description: "GGM3 game",
  accept: {
    "application/x.ggm3.ggm3": ".ggm3",
  },
};

const showSaveFilePicker = (fileName) =>
  window.showSaveFilePicker({
    suggestedName: fileName,
    types: [GGM3Type],
    excludeAcceptAllOption: true,
  });

const showOpenFilePicker = async () => {
  const [handle] = await window.showOpenFilePicker({
    multiple: false,
    types: [GGM3Type],
  });
  return handle;
};

const available = () => !!window.showSaveFilePicker;

const createWritable = (handle) => handle.createWritable();

const closeWritable = async (writable) => {
  await writable.close();
};

const writeToWritable = async (writable, content) => {
  await writable.write(content);
};

//GGM3 Stuff:

var { addAppMenu } = __webpack_require__(9366);
var loadingScreenContainer = elements.getGPId("loadingScreenContainer");
var loadingScreenContent = elements.getGPId("loadingScreenContent");
var selectedSprite = __webpack_require__(3010);
var defaultProject = __webpack_require__(5808);

var newFileMenus = [];

var projectSaver = __webpack_require__(3539);
const dialog = __webpack_require__(269);

var fileHandle = null;

async function newProject() {
  if (fileHandle) {
    try{
      fileHandle.close();
    }catch(e){}
    fileHandle = null;
  }
  loadingScreenContainer.hidden = false;
  await defaultProject.loadDefaultProject();
  selectedSprite.setCurrentSprite(0, true, true);
  loadingScreenContainer.hidden = true;
}

function loadProjectFile(file) {
  if (!file) {
    return;
  }
  fileHandle = null; //Reset the file handle to prevent accidental overwriting of the loaded file. It will be set again to the new location the user picks when they try to save.
  loadingScreenContainer.hidden = false;
  elements.setInnerJSON(loadingScreenContent, []);
  var reader = new FileReader();
  reader.onload = async function () {
    try {
      var monitor = new projectSaver.ProgressMonitor();

      monitor.on("progress", (event) => {
        elements.setInnerJSON(loadingScreenContent, [
          createProgessBarJSON(event.current / event.max, true),
        ]);
      });

      await projectSaver.loadProjectZip(reader.result, monitor);
      selectedSprite.unmarkProjectDirty();
    } catch (e) {
      await defaultProject.loadDefaultProject();
      console.error("Project load error: ", e);
      dialogs.alert("Project load error: " + e.message + "\nA default project has been loaded instead.");
    }
    selectedSprite.setCurrentSprite(0, true, true);
    loadingScreenContainer.hidden = true;
  };
  reader.readAsArrayBuffer(file);
}

var {saveBackupNow, getFileMenuOption, backupDeps, getBackupNotice} = __webpack_require__(3475);

backupDeps.loadProjectFile = loadProjectFile;

if (available()) {
  var menuBar = elements.getGPId("menuBar");
  elements.appendElementsFromJSON(menuBar, [
    {
      element: "div",
      style: {
        marginRight: "auto",
      },
    },
    ...getBackupNotice ? getBackupNotice() : [],
    {
      element: "div",
      className: "menuBarItem",
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        flexWarp: "none",
      },
      gid: "editFileQuick",
    },
  ]);

  var editFileQuick = elements.getGPId("editFileQuick");
  var isSaving = false;

  const TEXT_SAVENOW = "Save now";
  const TEXT_SAVING = "Saving...";

  function changeSaveNowContent(text) {
    elements.setInnerJSON(editFileQuick, [
      {
        element: "div",
        style: {
          width: "fit-content",
          height: "fit-content",
        },
        textContent: text,
      },
    ]);
  }

  changeSaveNowContent(TEXT_SAVENOW);

  function createProgessBarJSON(decimal = 0, large = false) {
    return {
      element: "div",
      className: "loadingProgressMain",
      style: large
        ? {}
        : {
            height: "15px",
            width: "70px",
          },
      children: [
        {
          element: "div",
          className: "loadingProgressInner",
          style: {
            width: Math.round(decimal * 100) + "%",
          },
        },
      ],
    };
  }

  newFileMenus.push({
    label: "Load and edit",
    icon: "icons/import.svg",
    action: async function () {
      try {
        fileHandle = await showOpenFilePicker();
      } catch (e) {
        fileHandle = null;
      }
      if (fileHandle) {
        loadingScreenContainer.hidden = false;
        elements.setInnerJSON(loadingScreenContent, [
          {
            element: "span",
            textContent: "Reading file...",
          },
        ]);
        var file = await fileHandle.getFile();
        loadProjectFile(file);
      }
    },
  });

  editFileQuick.onclick = async function () {
    if (isSaving) {
      return;
    }
    if (!fileHandle) {
      try {
        fileHandle = await showSaveFilePicker("game.ggm3");
      } catch (e) {
        fileHandle = null;
        dialogs.alert("Unable to save: " + e);
        return;
      }
    }
    changeSaveNowContent(TEXT_SAVING);
    isSaving = true;
    if (saveBackupNow) {
      saveBackupNow();
    }
    try {
      var writable = await createWritable(fileHandle);
      var monitor = new projectSaver.ProgressMonitor();
      monitor.on("progress", (event) => {
        editFileQuick.textContent = "";
        elements.setInnerJSON(editFileQuick, [
          {
            element: "div",
            textContent: TEXT_SAVING,
            style: {
              width: "fit-content",
              height: "5px",
            },
          },
          {
            element: "br",
          },
          createProgessBarJSON(event.current / event.max),
        ]);
      });
      monitor.on("finish", () => {
        editFileQuick.textContent = "";
        changeSaveNowContent(TEXT_SAVING);
      });
      var zipBlob = await projectSaver.saveProjectZipBlob(monitor);
      await writeToWritable(writable, zipBlob);
      closeWritable(writable);
      selectedSprite.unmarkProjectDirty();
    } catch (e) {
      console.error(e);
      dialogs.alert("Project save error " + e);
    }
    changeSaveNowContent(TEXT_SAVENOW);
    isSaving = false;
  };
}

addAppMenu(
  "file",
  [
    {
      element: "img",
      src: "icons/file.svg",
    },
    {
      element: "span",
      textContent: "File",
    },
  ],
  newFileMenus.concat([
    {
      label: "New",
      icon: "icons/add.svg",
      action: async function () {
        if (!(await dialogs.confirm("Start a new project?"))) {
          return;
        }
        newProject();
      },
    },
    {
      label: "Save as",
      icon: "icons/export.svg",
      action: async function () {
        var zipBlob = await projectSaver.saveProjectZipBlob();
        var objectURL = URL.createObjectURL(zipBlob);
        var a = document.createElement("a");
        a.href = objectURL;
        a.download = "project.ggm3";
        a.click();
      },
    },
    {
      label: "Load",
      icon: "icons/import.svg",
      action: async function () {
        if (selectedSprite.isProjectDirty()) {
          if (!(await dialogs.confirm("You might have unsaved changes. Load anyway?"))) {
            return;
          }
        }

        var input = document.createElement("input");
        input.type = "file";
        input.accept = ".ggm3";
        input.click();

        input.addEventListener("change", function () {
          if (!input.files[0]) {
            return;
          }
          loadProjectFile(input.files[0]);
        });
      },
    },
    ...getFileMenuOption ? getFileMenuOption() : [],
  ]),
);

newProject();

selectedSprite.deps.exportSprite = async function (sprite) {
  var blob = await projectSaver.saveSpriteZipAsBlob(sprite);
  var objectURL = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = objectURL;
  a.download = sprite.name + ".ggm3sprite";
  a.click();
};


module.exports = {
  loadProjectFile
};

/***/ }),

/***/ 2695:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var engine = __webpack_require__(9940);
var { toSoundJSON, toCostumeJSON } = __webpack_require__(7405);

//file names

function getCostumeFileName(spriteIndex, costumeIndex) {
  var fileName =
    "sprite_" + spriteIndex + "_costume_" + costumeIndex + ".image";
  return fileName;
}

function getSoundFileName(spriteIndex, soundIndex) {
  var fileName = "sprite_" + spriteIndex + "_sound_" + soundIndex + ".mp3";
  return fileName;
}

//sprite files

function getCostumeData(sprite, spriteIndex) {
  var data = [];
  var costumeIndex = 0;
  for (var costume of sprite.costumes) {
    data.push({
      fileName: getCostumeFileName(spriteIndex || 0, costumeIndex),
      dataURL: costume.dataURL,
      costumeJson: toCostumeJSON(costume),
    });
    costumeIndex += 1;
  }

  return data;
}

function getSoundData(sprite, spriteIndex) {
  var data = [];
  var soundIndex = 0;
  for (var sound of sprite.sounds) {
    data.push({
      fileName: getSoundFileName(spriteIndex || 0, soundIndex),
      dataURL: sound.dataURL,
      soundJson: toSoundJSON(sound),
    });
    soundIndex += 1;
  }

  return data;
}

//array buffer loading for costumes and sounds.

var { fromCostumeJSON, fromSoundJSON } = __webpack_require__(7405);

async function loadCostume(sprite, costumeJson, fileDataURL) {
  if (costumeJson.willPreload) {
    var costume = await sprite.addCostume(fileDataURL, costumeJson.name);
  } else {
    var costume = sprite.addCostumeWithoutLoading(
      fileDataURL,
      costumeJson.name,
    );
  }
  fromCostumeJSON(costume, costumeJson);
  return costume;
}

async function loadSound(sprite, soundJson, fileDataURL) {
  if (soundJson.willPreload) {
    var sound = await sprite.addSound(fileDataURL, soundJson.name);
  } else {
    var sound = sprite.addSoundWithoutLoading(fileDataURL, soundJson.name);
  }
  fromSoundJSON(sound, soundJson);
  return sound;
}

module.exports = {
  getCostumeFileName,
  getSoundFileName,

  getCostumeData,
  getSoundData,

  loadCostume,
  loadSound,
};


/***/ }),

/***/ 3010:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uiModule = __webpack_require__(5651);
var compileModule = __webpack_require__(2456);
var workspaceModule = __webpack_require__(6280);

var engine = __webpack_require__(9940);
var blocks = __webpack_require__(9436);
var costumeViewer = __webpack_require__(5604);
var soundViewer = __webpack_require__(9421);
var compiler = __webpack_require__(640);
var blockMenu = __webpack_require__(905);
var isProjectDirty = false;
var { valueReport } = __webpack_require__(1764);
var { makeSortable } = __webpack_require__(2088);
var { loadBlockMenus } = blockMenu;

// shared mutable state object passed to submodules
var state = {
  currentSelectedSprite: null,
  currentSelectedSpriteIndex: null,
};

var deps = {
  engine,
  blocks,
  costumeViewer,
  soundViewer,
  compiler,
  blockMenu,
  valueReport,
  makeSortable,
  loadBlockMenus,
  // these will be filled after init
  ui: null,
  compile: null,
  workspace: null,
  onSetCurrentSprite: null,
};

var ui = uiModule.init(state, deps);
var compile = compileModule.init(state, deps);
// provide compile and ui references into deps for cross-use
deps.compile = compile;
deps.ui = ui;
var workspace = workspaceModule.init(state, deps);
deps.workspace = workspace;

// expose a setCurrentSprite function that coordinates state + ui + workspace
function setCurrentSprite(index, forced, dontSave) {
  if (!forced) {
    if (state.currentSelectedSpriteIndex == index) return;
  }
  if (state.currentSelectedSprite) {
    state.currentSelectedSprite.onErrorLog = function () {};
    state.currentSelectedSprite.threadStartListener = null;
    state.currentSelectedSprite.threadEndListener = null;
    if (workspace) {
      workspace.saveScroll();
      if (!dontSave) {
        try {
          state.currentSelectedSprite.blocklyXML = Blockly.Xml.workspaceToDom(
            blocks.getCurrentWorkspace(),
          );
        } catch (e) {}
      }
    }
  }
  state.currentSelectedSpriteIndex = index;
  state.currentSelectedSprite = engine.sprites[index];

  // update inputs/UI
  deps.ui.updateSpritesContainer();
  workspace.loadCode(state.currentSelectedSprite);
  workspace.handleSpriteErrorLog(state.currentSelectedSprite);
  // reload assets
  costumeViewer.reloadCostumes(state.currentSelectedSprite, loadCostumes);
  soundViewer.reloadSounds(state.currentSelectedSprite, loadSounds);
}

function loadCostumes() {
  costumeViewer.reloadCostumes(state.currentSelectedSprite, loadCostumes);
}
function loadSounds() {
  soundViewer.reloadSounds(state.currentSelectedSprite, loadSounds);
}

function getCurSprite() {
  return state.currentSelectedSprite;
}
function getCurSpriteIndex() {
  return state.currentSelectedSpriteIndex;
}

function saveCurrentSpriteCode() {
  if (state.currentSelectedSprite) {
    workspace.saveCurrentSpriteCode();
  }
}

// wire callback for UI actions (add/select/delete/duplicate)
deps.onSetCurrentSprite = function (idx, forced, dontSave) {
  return setCurrentSprite(idx, forced, dontSave);
};

// expose compile helpers onto blockMenu as before
if (blockMenu && blockMenu.helpers) {
  blockMenu.helpers.loadWorkspaceFromSprite = compile.loadWorkspaceFromSprite;
}

deps.markProjectDirty = function () {
  if (isProjectDirty) {
    return;
  }
  isProjectDirty = true;
};
deps.unmarkProjectDirty = function () {
  if (!isProjectDirty) {
    return;
  }
  isProjectDirty = false;
};
deps.isProjectDirty = function () {
  return isProjectDirty;
};

costumeViewer.deps.markAsDirty = deps.markProjectDirty;
soundViewer.deps.markAsDirty = deps.markProjectDirty;
costumeViewer.deps.forwardMarkAsDirty(); //So that the costume pivot editor could also mark the project as dirty when a pivot is changed.

module.exports = {
  setCurrentSprite,
  updateSpritesContainer: ui.updateSpritesContainer,
  getCurSprite,
  getCurSpriteIndex,
  loadCode: workspace.loadCode,
  compileSpriteXML: compile.compileSpriteXML,
  compileAllSprites: compile.compileAllSprites,
  saveCurrentSpriteCode,
  saveScroll: workspace.saveScroll,
  scrollToPrevious: workspace.scrollToPrevious,
  markProjectDirty: deps.markProjectDirty,
  unmarkProjectDirty: deps.unmarkProjectDirty,
  isProjectDirty: deps.isProjectDirty,
  deps: deps,
};


/***/ }),

/***/ 3043:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,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");

/***/ }),

/***/ 3044:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var SpriteMasterConsts = __webpack_require__(1065);

class SpriteMaster {
  //Blocks for sprite master

  constructor(originSprite) {
    this.sprite = originSprite;
  }

  findSpriteByName(spriteName) {
    //I was dumb: forgot to add return
    return this.sprite.findSpriteByName(spriteName);
  }

  getSpriteSafe(spriteName) {
    var targetSprite = this.findSpriteByName(spriteName);
    if (!targetSprite) {
      return {};
    }

    return targetSprite;
  }

  getClonesOf(spriteName, option) {
    var targetSprite = this.findSpriteByName(spriteName);
    if (!targetSprite) {
      return [];
    }

    if (targetSprite.isClone) {
      //Get the parent sprite since this is running in a clone.
      return Array.from(targetSprite.parent.clones);
    }
    //Clone the clones array so that editing it
    // won't rearrange clones and stuff.
    return Array.from(targetSprite.clones);
  }

  getCloneCountOf(spriteName, option) {
    var targetSprite = this.findSpriteByName(spriteName);
    if (!targetSprite) {
      return 0;
    }

    if (targetSprite.isClone) {
      //Get the parent sprite since this is running in a clone.
      return targetSprite.parent.clones.length;
    }

    return targetSprite.clones.length;
  }

  isTouchingSpriteWithPropertySet(...args) {
    return this.sprite.isTouchingSpriteWithPropertySet(...args);
  }

  dispose() {}
}

module.exports = SpriteMaster;


/***/ }),

/***/ 3131:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var JavascriptTranslation = {};
var utilFunctions = __webpack_require__(9547);
var outputBlocks = __webpack_require__(7147);

outputBlocks.push("globaldata_get");
JavascriptTranslation["globaldata_get"] = function (jsonblock, utils, options) {
  var VARIABLE = utils.getField(jsonblock, "VARIABLE");
  return `engine.globalVariables[${JSON.stringify(VARIABLE)}]`;
};

JavascriptTranslation["globaldata_set"] = function (jsonblock, utils, options) {
  var VARIABLE = utils.getField(jsonblock, "VARIABLE");
  var VALUE = utils.getInput(jsonblock, "VALUE", "undefined");
  return `engine.globalVariables[${JSON.stringify(VARIABLE)}] = ${VALUE};`;
};

JavascriptTranslation["globaldata_changeby"] = function (
  jsonblock,
  utils,
  options,
) {
  var VARIABLE = utils.getField(jsonblock, "VARIABLE");
  var VALUE = utils.getInput(jsonblock, "VALUE", "undefined");
  return `engine.globalVariables[${JSON.stringify(VARIABLE)}] = (+(engine.globalVariables[${JSON.stringify(VARIABLE)}]) || 0) + (+(${VALUE}) || 0);`;
};

module.exports = JavascriptTranslation;


/***/ }),

/***/ 3202:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("precision mediump float;\n\n#ifdef DRAW_MODE_line\nuniform vec2 u_stageSize;\nattribute vec2 a_lineThicknessAndLength;\nattribute vec4 a_penPoints;\nattribute vec4 a_lineColor;\n\nvarying vec4 v_lineColor;\nvarying float v_lineThickness;\nvarying float v_lineLength;\nvarying vec4 v_penPoints;\n\n// Add this to divisors to prevent division by 0, which results in NaNs propagating through calculations.\n// Smaller values can cause problems on some mobile devices.\nconst float epsilon = 1e-3;\n#endif\n\n#if !(defined(DRAW_MODE_line) || defined(DRAW_MODE_background))\nuniform mat4 u_projectionMatrix;\nuniform mat4 u_modelMatrix;\nattribute vec2 a_texCoord;\n#endif\n\nattribute vec2 a_position;\n\nvarying vec2 v_texCoord;\n\nvoid main() {\n\t#ifdef DRAW_MODE_line\n\t// Calculate a rotated (\"tight\") bounding box around the two pen points.\n\t// Yes, we're doing this 6 times (once per vertex), but on actual GPU hardware,\n\t// it's still faster than doing it in JS combined with the cost of uniformMatrix4fv.\n\n\t// Expand line bounds by sqrt(2) / 2 each side-- this ensures that all antialiased pixels\n\t// fall within the quad, even at a 45-degree diagonal\n\tvec2 position = a_position;\n\tfloat expandedRadius = (a_lineThicknessAndLength.x * 0.5) + 1.4142135623730951;\n\n\t// The X coordinate increases along the length of the line. It's 0 at the center of the origin point\n\t// and is in pixel-space (so at n pixels along the line, its value is n).\n\tv_texCoord.x = mix(0.0, a_lineThicknessAndLength.y + (expandedRadius * 2.0), a_position.x) - expandedRadius;\n\t// The Y coordinate is perpendicular to the line. It's also in pixel-space.\n\tv_texCoord.y = ((a_position.y - 0.5) * expandedRadius) + 0.5;\n\n\tposition.x *= a_lineThicknessAndLength.y + (2.0 * expandedRadius);\n\tposition.y *= 2.0 * expandedRadius;\n\n\t// 1. Center around first pen point\n\tposition -= expandedRadius;\n\n\t// 2. Rotate quad to line angle\n\tvec2 pointDiff = a_penPoints.zw;\n\t// Ensure line has a nonzero length so it's rendered properly\n\t// As long as either component is nonzero, the line length will be nonzero\n\t// If the line is zero-length, give it a bit of horizontal length\n\tpointDiff.x = (abs(pointDiff.x) < epsilon && abs(pointDiff.y) < epsilon) ? epsilon : pointDiff.x;\n\t// The `normalized` vector holds rotational values equivalent to sine/cosine\n\t// We're applying the standard rotation matrix formula to the position to rotate the quad to the line angle\n\t// pointDiff can hold large values so we must divide by u_lineLength instead of calling GLSL's normalize function:\n\t// https://asawicki.info/news_1596_watch_out_for_reduced_precision_normalizelength_in_opengl_es\n\tvec2 normalized = pointDiff / max(a_lineThicknessAndLength.y, epsilon);\n\tposition = mat2(normalized.x, normalized.y, -normalized.y, normalized.x) * position;\n\n\t// 3. Translate quad\n\tposition += a_penPoints.xy;\n\n\t// 4. Apply view transform\n\tposition *= 2.0 / u_stageSize;\n\tgl_Position = vec4(position, 0, 1);\n\n\tv_lineColor = a_lineColor;\n\tv_lineThickness = a_lineThicknessAndLength.x;\n\tv_lineLength = a_lineThicknessAndLength.y;\n\tv_penPoints = a_penPoints;\n\t#elif defined(DRAW_MODE_background)\n\tgl_Position = vec4(a_position * 2.0, 0, 1);\n\t#else\n\tgl_Position = u_projectionMatrix * u_modelMatrix * vec4(a_position, 0, 1);\n\tv_texCoord = a_texCoord;\n\t#endif\n}");

/***/ }),

/***/ 3235:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var blocks = __webpack_require__(9436);
var { createBlockContextMenu, scrollBlockIntoView } = __webpack_require__(9870);

function jumpToBlockDefinition(block) {
  let findProcCode = block.getProcCode();

  let topBlocks = blocks.getCurrentWorkspace().getTopBlocks();
  for (const root of topBlocks) {
    if (root.type === "procedures_definition") {
      let label = root.getChildren()[0];
      let procCode = label.getProcCode();
      if (procCode && procCode === findProcCode) {
        // Found... navigate to it!
        scrollBlockIntoView(root);
      }
    }
  }
}

Object.defineProperty(Blockly.Gesture.prototype, "jumpToDef", {
  get() {
    return false;
  },
});

const doBlockClickMethodName = Blockly.registry
  ? "doBlockClick"
  : "doBlockClick_";
const _doBlockClick_ = Blockly.Gesture.prototype[doBlockClickMethodName];
Blockly.Gesture.prototype[doBlockClickMethodName] = function () {
  const event = Blockly.registry ? this.mostRecentEvent : this.mostRecentEvent_;
  if ( true && (event.button === 1 || event.shiftKey)) {
    // Wheel button...
    // Intercept clicks to allow jump to...?
    let block = Blockly.registry ? this.startBlock : this.startBlock_;
    for (; block; block = block.getSurroundParent()) {
      if (block.type === "procedures_call") {
        jumpToBlockDefinition(block);
        return;
      }
    }
  }

  _doBlockClick_.call(this);
};

createBlockContextMenu(
  (items, block) => {
    if ( true && block.type === "procedures_call") {
      items.push({
        enabled: true,
        text: "Jump to definition",
        callback: () => jumpToBlockDefinition(block),
      });
    }
    return items;
  },
  { blocks: true, flyout: true },
);


/***/ }),

/***/ 3475:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var elements = __webpack_require__(7255);
var AElement = __webpack_require__(3759);
var engine = __webpack_require__(9940);
var { saveBackup, getBackups, getBackupData, deleteBackup } = __webpack_require__(2126);
var isSupported = !!(window.indexedDB && window.showSaveFilePicker && window.showOpenFilePicker);
var BACKUP_INTERVAL = 5 * 60 * 1000; // 5 minutes
var projectSaver = __webpack_require__(3539);
var selectedSprite = __webpack_require__(3010);
var dialogs = __webpack_require__(269);

var backupDeps = {
    loadProjectFile: () => {},
};

function getThumbnail() {
    var canvas = engine.canvas;
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob);
        }, "image/png");
    });
}

//for testing
//BACKUP_INTERVAL = 30 * 1000; // 30 seconds

var loadingScreenContainer = elements.getGPId("loadingScreenContainer");
var loadingScreenContent = elements.getGPId("loadingScreenContent");
var isBackingUp = false;
async function saveBackupNow() {
    if (!isSupported) {
        return;
    }
    if (isBackingUp) {
        return;
    }
    if (!selectedSprite.isProjectDirty()) {
        return;
    }
    if (!loadingScreenContainer.hidden) {
        return; // Loading so don't accidentally store a backup of a half-loaded project.
    }

    var backupNotice = elements.getGPId("backingUpNotice");
    if (backupNotice) {
        backupNotice.hidden = false;
    }

    isBackingUp = true;
    var thumbBlob = await getThumbnail();
    var zipBlob = await projectSaver.saveProjectZipBlob();
    await saveBackup(zipBlob, thumbBlob)
    isBackingUp = false;

    if (backupNotice) {
        backupNotice.hidden = true;
    }
}

var backupInterval = setInterval(saveBackupNow, BACKUP_INTERVAL);

var backupDialog = elements.createElementsFromJSON([
  {
    element: "div",
    hidden: true,
    children: [
      {
        element: "div",
        className: "dialogBackground",
      },

      {
        element: "div",
        className: "gameBackupBox centerMiddle",
        children: [
          {
            element: "h2",
            textContent: "Backup history",
            style: {
              textAlign: "center",
              flexShrink: "0px",
            },
          },
          {
            element: "span",
            children: [
                {element:"b",textContent:"Don't rely on these backups to save your work! "},
                { element: "br" },
                "They can be deleted at any time or by your browser without warning. ",
                "This is meant as a last resort to recover from crashes or other unexpected issues. ",
                "Always make sure to save your project regularly. ",
                { element: "br" },
                "This can only hold a few backups, so older ones will be deleted as new ones are made. ",
                "If you want to keep a backup, make sure to download it before making more changes or it might be deleted."
            ]
          },
          {
            element: "div",
            className: "gameBackupSelection",
            children: [
              {
                element: "button",
                className: "greyButtonStyle",
                textContent: "Close",
                style: {
                  width: "100%",
                  boxSizing: "border-box",
                  textAlign: "center",
                },
                onclick: () => {
                  backupDialog.hidden = true;
                },
              },
            ],
          },
          {
            element: "div",
            className: "gameBackupCategory",
            children: [
                {
                    element: "div",
                    gid: "backupListContainer"
                }
            ],
          },
        ],
      },
    ],
  },
])[0];

backupDialog.hidden = true;
document.body.append(backupDialog);

var backupListContainer = elements.getGPId("backupListContainer");
var blobImages = [];

async function refreshBackupList() {
    backupListContainer.textContent = "Loading...";

    var backups = await getBackups();
    backupListContainer.textContent = "";
    elements.removeAllChildren(backupListContainer);

    blobImages.forEach(URL.revokeObjectURL);
    blobImages = [];

    backups.forEach((backup) => {

        function loadBackupButtonClicked() {
            var promise = Promise.resolve(true);
            if (selectedSprite.isProjectDirty()) {
                promise = dialogs.confirm("You have unsaved changes. Are you sure you want to load this backup and lose those changes?");
            }
            promise.then((confirmed) => {
                if (confirmed) {
                    loadingScreenContainer.hidden = false;
                    backupDialog.hidden = true;
                    loadingScreenContent.textContent = "Reading backup content...";
                    getBackupData(backup.id).then((zipBlob) => {
                        loadingScreenContent.textContent = "";
                        backupDeps.loadProjectFile(zipBlob);
                    });
                }
            });
        }

        function downloadBackupButtonClicked() {
            getBackupData(backup.id).then((zipBlob) => {
                var url = URL.createObjectURL(zipBlob);
                var a = document.createElement("a");
                a.href = url;
                a.download = `Gvbvdxx Game Maker 3 backup from ${new Date(backup.timestamp).toISOString()}.ggm3`;
                document.body.append(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
            });
        }

        function deleteBackupButtonClicked() {
            var promise = dialogs.confirm("Are you sure you want to delete this backup?");
            promise.then((confirmed) => {
                if (confirmed) {
                    deleteBackup(backup.id);
                    refreshBackupList();
                }
            });
        }

        var blobUrl = URL.createObjectURL(backup.thumbnail);
        blobImages.push(blobUrl);
        var backupElement = elements.createElementsFromJSON([
            {
                element: "div",
                className: "backupEntry",
                children: [
                    {
                        element: "img",
                        className: "backupThumbnail",
                        src: blobUrl
                    },
                    {
                        element: "span",
                        textContent: new Date(backup.timestamp).toLocaleString(),
                        className: "backupTimestamp"
                    },
                    {
                        element: "div",
                        style: {
                            marginLeft: "auto",
                        }
                    },
                    {
                        element: "button",
                        className: "greyButtonStyle",
                        children: [
                            "Load"
                        ],
                        eventListeners: [
                            {
                                event: "click",
                                func: loadBackupButtonClicked
                            }
                        ]
                    },
                    {
                        element: "button",
                        className: "greyButtonStyle",
                        children: [
                            "Download"
                        ],
                        eventListeners: [
                            {
                                event: "click",
                                func: downloadBackupButtonClicked
                            }
                        ]
                    },
                    {
                        element: "button",
                        className: "greyButtonStyle",
                        textContent: "Delete",
                        eventListeners: [
                            {
                                event: "click",
                                func: deleteBackupButtonClicked
                            }
                        ]
                    }
                ]
            },
        ])[0];
        backupListContainer.append(backupElement);
    });
}

function getFileMenuOption () {
    if (!isSupported) {
        return [];
    }
    return [
        {
            label: "Backup history",
            icon: "icons/history.svg",
            action: function () {
                backupDialog.hidden = false;
                refreshBackupList();
            }
        }
    ];
}

function getBackupNotice() {
    if (!isSupported) {
        return [];
    }
    return [
        {
            element: "div",
            className: "unclickableMenuBarItem backupNoticeMenuBarItem",
            gid: "backingUpNotice",
            hidden: true,
            children: [
                {
                    element: "img",
                    src: "icons/history.svg",
                    style: {
                        width: "16px",
                        height: "16px",
                        objectFit: "contain"
                    }
                },
                {
                    element: "span",
                    textContent: "Saving to backup point..."
                }
            ]
        }
    ];
}

module.exports = {
  saveBackupNow,
  getFileMenuOption,
  backupDeps,
  getBackupNotice
};

/***/ }),

/***/ 3505:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var JavascriptTranslation = {};
var utilFunctions = __webpack_require__(9547);
var outputBlocks = __webpack_require__(7147);

outputBlocks.push("json_new");
JavascriptTranslation["json_new"] = function (jsonblock, utils, options) {
  var TYPE = utils.getField(jsonblock, "TYPE", options);
  if (TYPE == "object") {
    return "({})";
  }
  if (TYPE == "array") {
    return "([])";
  }
};

JavascriptTranslation["json_setto"] = function (jsonblock, utils, options) {
  var NAME = utils.getInput(jsonblock, "NAME", options, "undefined");
  var VALUE = utils.getInput(jsonblock, "VALUE", options, "undefined");
  var OBJECT = utils.getInput(jsonblock, "OBJECT", options, "{}");

  return `(${OBJECT})[${NAME}] = ${VALUE};`;
};

outputBlocks.push("json_geton");
JavascriptTranslation["json_geton"] = function (jsonblock, utils, options) {
  var NAME = utils.getInput(jsonblock, "NAME", options, "undefined");
  var OBJECT = utils.getInput(jsonblock, "OBJECT", options, "{}");

  return `(${OBJECT})[${NAME}]`;
};

outputBlocks.push("json_keys");
JavascriptTranslation["json_keys"] = function (jsonblock, utils, options) {
  var OBJECT = utils.getInput(jsonblock, "OBJECT", options, "{}");

  return `(Object.keys(${OBJECT}))`;
};

outputBlocks.push("json_tostring");
JavascriptTranslation["json_tostring"] = function (jsonblock, utils, options) {
  var OBJECT = utils.getInput(jsonblock, "OBJECT", options, "{}");

  return `(JSON.stringify(${OBJECT}))`;
};

outputBlocks.push("json_fromstring");
JavascriptTranslation["json_fromstring"] = function (
  jsonblock,
  utils,
  options,
) {
  var OBJECT = utils.getInput(jsonblock, "OBJECT", options, '"{}"');

  return `(JSON.parse(${OBJECT}))`;
};

JavascriptTranslation["json_deleteon"] = function (jsonblock, utils, options) {
  var NAME = utils.getInput(jsonblock, "NAME", options, "undefined");
  var OBJECT = utils.getInput(jsonblock, "OBJECT", options, "{}");

  return `delete (${OBJECT})[${NAME}];`;
};

JavascriptTranslation["json_array_push"] = function (
  jsonblock,
  utils,
  options,
) {
  var VALUE = utils.getInput(jsonblock, "VALUE", options, "undefined");
  var OBJECT = utils.getInput(jsonblock, "OBJECT", options, "[]");

  return `(${OBJECT}).push(${VALUE});`;
};

JavascriptTranslation["json_array_unshift"] = function (
  jsonblock,
  utils,
  options,
) {
  var VALUE = utils.getInput(jsonblock, "VALUE", options, "undefined");
  var OBJECT = utils.getInput(jsonblock, "OBJECT", options, "[]");

  return `(${OBJECT}).unshift(${VALUE});`;
};

outputBlocks.push("json_array_lengthof");
JavascriptTranslation["json_array_lengthof"] = function (
  jsonblock,
  utils,
  options,
) {
  var OBJECT = utils.getInput(jsonblock, "OBJECT", options, "[]");

  return `(${OBJECT}).length`;
};

outputBlocks.push("json_array_indexof");
JavascriptTranslation["json_array_indexof"] = function (
  jsonblock,
  utils,
  options,
) {
  var OBJECT = utils.getInput(jsonblock, "OBJECT", options, "[]");
  var VALUE = utils.getInput(jsonblock, "VALUE", options, "undefined");

  return `(${OBJECT}).indexOf(${VALUE})`;
};

outputBlocks.push("json_has_key");
JavascriptTranslation["json_has_key"] = function (jsonblock, utils, options) {
  var NAME = utils.getInput(jsonblock, "NAME", options, "undefined");
  var OBJECT = utils.getInput(jsonblock, "OBJECT", options, "{}");

  return `Object.prototype.hasOwnProperty.call(${OBJECT}, ${NAME})`;
};

outputBlocks.push("json_get_path");
JavascriptTranslation["json_get_path"] = function (jsonblock, utils, options) {
  var PATH = utils.getInput(jsonblock, "PATH", options, "undefined");
  var OBJECT = utils.getInput(jsonblock, "OBJECT", options, "[]");
  var DEFAULT = utils.getInput(jsonblock, "DEFAULT", options, "undefined");

  return `(function(o,p,d){var cur=o; if(cur==null) return d; if(Array.isArray(p)){ for(var i=0;i<p.length;i++){ cur=cur[p[i]]; if(cur==null) return d; } return cur; } p=(""+p).split('.'); for(var i=0;i<p.length;i++){ cur=cur[p[i]]; if(cur==null) return d; } return cur;})(${OBJECT},${PATH},${DEFAULT})`;
};

JavascriptTranslation["json_set_path"] = function (jsonblock, utils, options) {
  var PATH = utils.getInput(jsonblock, "PATH", options, "undefined");
  var VALUE = utils.getInput(jsonblock, "VALUE", options, "undefined");
  var OBJECT = utils.getInput(jsonblock, "OBJECT", options, "[]");

  return `(function(o,p,v){var cur=o; if(cur==null) return; if(!Array.isArray(p)) p=(""+p).split('.'); for(var i=0;i<p.length-1;i++){ var k=p[i]; if(cur[k]==null || typeof cur[k] !== 'object') cur[k]={}; cur=cur[k]; } cur[p[p.length-1]]=v;})(${OBJECT},${PATH},${VALUE});`;
};

JavascriptTranslation["json_delete_path"] = function (
  jsonblock,
  utils,
  options,
) {
  var PATH = utils.getInput(jsonblock, "PATH", options, "undefined");
  var OBJECT = utils.getInput(jsonblock, "OBJECT", options, "{}");

  return `(function(o,p){var cur=o; if(cur==null) return; if(!Array.isArray(p)) p=(""+p).split('.'); for(var i=0;i<p.length-1;i++){ cur=cur[p[i]]; if(cur==null) return; } delete cur[p[p.length-1]];})(${OBJECT},${PATH});`;
};

outputBlocks.push("json_array_pop");
JavascriptTranslation["json_array_pop"] = function (jsonblock, utils, options) {
  var OBJECT = utils.getInput(jsonblock, "OBJECT", options, "[]");

  return `(${OBJECT}).pop()`;
};

outputBlocks.push("json_array_contains");
JavascriptTranslation["json_array_contains"] = function (
  jsonblock,
  utils,
  options,
) {
  var VALUE = utils.getInput(jsonblock, "VALUE", options, "undefined");
  var OBJECT = utils.getInput(jsonblock, "OBJECT", options, "[]");

  return `(${OBJECT}).includes(${VALUE})`;
};

outputBlocks.push("json_clone");
JavascriptTranslation["json_clone"] = function (jsonblock, utils, options) {
  var OBJECT = utils.getInput(jsonblock, "OBJECT", options, "{}");

  return `(JSON.parse(JSON.stringify(${OBJECT})))`;
};

outputBlocks.push("json_parse_safe");
JavascriptTranslation["json_parse_safe"] = function (
  jsonblock,
  utils,
  options,
) {
  var STRING = utils.getInput(jsonblock, "STRING", options, "undefined");
  var DEFAULT = utils.getInput(jsonblock, "DEFAULT", options, "undefined");

  return `(function(s,d){try{return JSON.parse(s);}catch(e){return d;}})(${STRING},${DEFAULT})`;
};

outputBlocks.push("json_pretty_print");
JavascriptTranslation["json_pretty_print"] = function (
  jsonblock,
  utils,
  options,
) {
  var OBJECT = utils.getInput(jsonblock, "OBJECT", options, "{}");
  var INDENT = utils.getInput(jsonblock, "INDENT", options, '""');

  return `(JSON.stringify(${OBJECT}, null, (${INDENT}) || 2))`;
};

outputBlocks.push("json_typeof");
JavascriptTranslation["json_typeof"] = function (jsonblock, utils, options) {
  var OBJECT = utils.getInput(jsonblock, "OBJECT", options, "undefined");
  return `(typeof ${OBJECT})`;
};

outputBlocks.push("json_array_split");
JavascriptTranslation["json_array_split"] = function (
  jsonblock,
  utils,
  options,
) {
  var STRING = utils.getInput(jsonblock, "STRING", options, "undefined");
  var USING = utils.getInput(jsonblock, "USING", options, "undefined");
  return `(""+${STRING}).split(${USING})`;
};

outputBlocks.push("json_array_join");
JavascriptTranslation["json_array_join"] = function (
  jsonblock,
  utils,
  options,
) {
  var ARRAY = utils.getInput(jsonblock, "ARRAY", options, "undefined");
  var USING = utils.getInput(jsonblock, "USING", options, "undefined");
  return `(${ARRAY}).join(${USING})`;
};

module.exports = JavascriptTranslation;


/***/ }),

/***/ 3514:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var TWEEN = __webpack_require__(484);

/*
Linear -> None,In,Out,InOut
Quadratic -> In,Out,InOut
Cubic -> In,Out,InOut
Quartic -> In,Out,InOut
Quintic -> In,Out,InOut
Sinusoidal -> In,Out,InOut
Exponential -> In,Out,InOut
Circular -> In,Out,InOut
Elastic -> In,Out,InOut
Back -> In,Out,InOut
Bounce -> In,Out,InOut
*/

var EasingMap = {};

//Linear
EasingMap["linear"] = TWEEN.Easing.Linear.None;

//Quadratic
EasingMap["quadratic-in"] = TWEEN.Easing.Quadratic.In;
EasingMap["quadratic-out"] = TWEEN.Easing.Quadratic.Out;
EasingMap["quadratic-inout"] = TWEEN.Easing.Quadratic.InOut;

//Cubic
EasingMap["cubic-in"] = TWEEN.Easing.Cubic.In;
EasingMap["cubic-out"] = TWEEN.Easing.Cubic.Out;
EasingMap["cubic-inout"] = TWEEN.Easing.Cubic.InOut;

//Quartic
EasingMap["quartic-in"] = TWEEN.Easing.Quartic.In;
EasingMap["quartic-out"] = TWEEN.Easing.Quartic.Out;
EasingMap["quartic-inout"] = TWEEN.Easing.Quartic.InOut;

//Quintic
EasingMap["quintic-in"] = TWEEN.Easing.Quintic.In;
EasingMap["quintic-out"] = TWEEN.Easing.Quintic.Out;
EasingMap["quintic-inout"] = TWEEN.Easing.Quintic.InOut;

//Sinusoidal
EasingMap["sinusoidal-in"] = TWEEN.Easing.Sinusoidal.In;
EasingMap["sinusoidal-out"] = TWEEN.Easing.Sinusoidal.Out;
EasingMap["sinusoidal-inout"] = TWEEN.Easing.Sinusoidal.InOut;

//Exponential
EasingMap["exponential-in"] = TWEEN.Easing.Exponential.In;
EasingMap["exponential-out"] = TWEEN.Easing.Exponential.Out;
EasingMap["exponential-inout"] = TWEEN.Easing.Exponential.InOut;

//Circular
EasingMap["circular-in"] = TWEEN.Easing.Circular.In;
EasingMap["circular-out"] = TWEEN.Easing.Circular.Out;
EasingMap["circular-inout"] = TWEEN.Easing.Circular.InOut;

//Elastic
EasingMap["elastic-in"] = TWEEN.Easing.Elastic.In;
EasingMap["elastic-out"] = TWEEN.Easing.Elastic.Out;
EasingMap["elastic-inout"] = TWEEN.Easing.Elastic.InOut;

//Back
EasingMap["back-in"] = TWEEN.Easing.Back.In;
EasingMap["back-out"] = TWEEN.Easing.Back.Out;
EasingMap["back-inout"] = TWEEN.Easing.Back.InOut;

//Bounce
EasingMap["bounce-in"] = TWEEN.Easing.Bounce.In;
EasingMap["bounce-out"] = TWEEN.Easing.Bounce.Out;
EasingMap["bounce-inout"] = TWEEN.Easing.Bounce.InOut;

module.exports = EasingMap;

/***/ }),

/***/ 3525:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   autoPositionComment: () => (/* binding */ autoPositionComment),
/* harmony export */   getOrderedTopBlockColumns: () => (/* binding */ getOrderedTopBlockColumns),
/* harmony export */   getTopBlocks: () => (/* binding */ getTopBlocks),
/* harmony export */   getVariableUsesById: () => (/* binding */ getVariableUsesById)
/* harmony export */ });
//Used from scratch addons.

/**
 * Find all the uses of a named variable.
 * @param {string} id ID of the variable to find.
 * @return {!Array.<!Blockly.Block>} Array of block usages.
 */
const getVariableUsesById = (id, workspace) => {
  let uses = [];

  let topBlocks = getTopBlocks(workspace);
  for (const topBlock of topBlocks) {
    let kids = topBlock.getDescendants();
    for (const block of kids) {
      let blockVariables = block.getVarModels();
      if (blockVariables) {
        for (const blockVar of blockVariables) {
          if (blockVar.getId() === id) {
            uses.push(block);
          }
        }
      }
    }
  }

  return uses;
};

/**
 * A nicely ordered version of the top blocks
 * @returns {[Blockly.Block]}
 */
const getTopBlocks = (workspace) => {
  let result = getOrderedTopBlockColumns(false, workspace);
  let columns = result.cols;
  /**
   * @type {[[Blockly.Block]]}
   */
  let topBlocks = [];
  for (const col of columns) {
    topBlocks = topBlocks.concat(col.blocks);
  }
  return topBlocks;
};

const autoPositionComment = (comment) => {
  if (typeof comment.autoPosition_ === "function") {
    comment.needsAutoPositioning_ = true;
    comment.autoPosition_();
    comment.needsAutoPositioning_ = false;
  }
};

/**
 * Split the top blocks into ordered columns
 * @param separateOrphans true to keep all orphans separate
 * @returns {{orphans: {blocks: [Block], x: number, count: number}, cols: [Col]}}
 */
const getOrderedTopBlockColumns = (separateOrphans, workspace) => {
  let w = workspace;
  let topBlocks = w.getTopBlocks();
  let maxWidths = {};

  if (separateOrphans) {
    if (w.getTheme) {
      // new Blockly
      const blocks = w.getAllBlocks();
      for (const block of blocks) {
        for (const icon of block.getIcons()) {
          if (icon.commentBubble) {
            const comment = icon.commentBubble;
            const right =
              comment.getRelativeToSurfaceXY().x + comment.getSize().width;

            const root = comment.getSourceBlock().getRootBlock();
            const left = root.getRelativeToSurfaceXY().x;
            maxWidths[root.id] = Math.max(
              right - left,
              maxWidths[root.id] || 0,
            );
          }
        }
      }
    } else {
      let topComments = w.getTopComments();

      for (const comment of topComments) {
        if (comment.block_) {
          autoPositionComment(comment);
          let right = comment.getBoundingRectangle().bottomRight.x;

          let root = comment.block_.getRootBlock();
          let left = root.getBoundingRectangle().topLeft.x;
          maxWidths[root.id] = Math.max(right - left, maxWidths[root.id] || 0);
        }
      }
    }
  }

  let cols = [];
  const TOLERANCE = 256;
  let orphans = { x: -999999, count: 0, blocks: [] };

  for (const topBlock of topBlocks) {
    let position = topBlock.getRelativeToSurfaceXY();
    let bestCol = null;
    let bestError = TOLERANCE;

    if (separateOrphans && isBlockAnOrphan(topBlock)) {
      orphans.blocks.push(topBlock);
      continue;
    }

    for (const col of cols) {
      let err = Math.abs(position.x - col.x);
      if (err < bestError) {
        bestError = err;
        bestCol = col;
      }
    }

    if (bestCol) {
      bestCol.x = (bestCol.x * bestCol.count + position.x) / ++bestCol.count;
      bestCol.blocks.push(topBlock);
    } else {
      cols.push(new Col(position.x, 1, [topBlock]));
    }
  }

  cols.sort((a, b) => a.x - b.x);
  for (const col of cols) {
    col.blocks.sort(
      (a, b) => a.getRelativeToSurfaceXY().y - b.getRelativeToSurfaceXY().y,
    );
  }

  return { cols: cols, orphans: orphans, maxWidths: maxWidths };
};

/**
 * Badly Orphaned - might want to delete these!
 * @param topBlock
 * @returns {boolean}
 */
const isBlockAnOrphan = (topBlock) => {
  return !!topBlock.outputConnection;
};

class Col {
  /**
   * @param x {Number} x position (for ordering)
   * @param count {Number}
   * @param blocks {[Block]}
   */
  constructor(x, count, blocks) {
    this.x = x;
    this.count = count;
    this.blocks = blocks;
  }
}


/***/ }),

/***/ 3539:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  ...__webpack_require__(6544),
  ...__webpack_require__(2166),
  ...__webpack_require__(1498),
};


/***/ }),

/***/ 3591:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var TWEEN = __webpack_require__(484);
var EasingMap = __webpack_require__(3514);

class Thread {
  constructor(firstBlockID, sprite) {
    this.id = firstBlockID;
    this.sprite = sprite;
    this.running = true;
    this.screenRefresh = true;
    this._hasStopped = false;
    this.hadError = false;
    this.customBlockValues = {};
    this.subThreads = {};
    this.inherited = false;
    this.isPreviewMode = false;
  }

  stopEverythingButMe() {
    if (this.inherited) {
      var allThreads = Object.keys(this.parent.subThreads); //Stop the subthreads.
      allThreads.push(this.parent.id); //Including the main thread.
      this.sprite.stopAllScriptsExceptThreads(allThreads);
      return;
    }
    this.sprite.stopAllScriptsExceptThread(this);
  }

  stopAllScripts() {
    this.sprite.stopAllScripts();
  }

  customBlockInherit(thread) {
    if (this.inherited) {
      return;
    }
    thread.subThreads[this.id] = this;
    this.inherited = true;
    if (!thread.screenRefresh) {
      this.screenRefresh = false;
    }
    this.parent = thread;
  }

  turnOnWithoutRefresh() {
    this.screenRefresh = false;
  }

  stop() {
    this.running = false;
    if (!this._hasStopped) {
      this._hasStopped = true;
      this.sprite.removeThread(this.id);
    }
    if (this.inherited) {
      delete this.parent.subThreads[this.id];
    } else {
      for (var key of Object.keys(this.subThreads)) {
        this.subThreads[key].stop();
      }
    }

    if (this.isPreviewMode) {
      return; //Skip logging errors when the block is clicked.
    }
    if (this.hadError) {
      var spr = this.sprite.parent || this.sprite; //Use main sprite for errorLogs.
      spr.errorLogs.push(this.output || "");
      spr.errorLogs = spr.errorLogs.slice(-100); //Keep last 100 logs.

      if (spr.onErrorLog) {
        spr.onErrorLog(this.output || "");
      }
    }
  }

  waitForNextFrame() {
    if (!this.running) {
      return new Promise((a) => a());
    }
    if (this.screenRefresh) {
      var _this = this;
      return new Promise((resolve) => {
        _this.sprite._addFrameListener(resolve);
      });
    } else {
      return new Promise((a) => a());
    }
  }

  waitSeconds(seconds) {
    var _this = this;
    return new Promise((resolve) => {
      if (!_this.running) {
        resolve();
      }
      var milliseconds = seconds * 1000;
      var start = performance.now();
      var interval = setInterval(() => {
        var now = performance.now();
        if (!_this.running) {
          clearInterval(interval);
          resolve();
        }
        if (now - start > milliseconds) {
          clearInterval(interval);
          resolve();
        }
      });
    });
  }

  tweenToXY(targetX, targetY, duration, easing) {
    return this.tweenTo({
      x: +targetX || 0,
      y: +targetY || 0,
    },
    +duration || 0, 
    easing);
  }

  tweenToSize(targetSize, duration, easing) {
    return this.tweenTo({
      size: +targetSize || 0
    },
    +duration || 0,
    easing);
  }

  tweenToStretchXY(targetScaleX, targetScaleY, duration, easing) {
    return this.tweenTo({
      scaleX: (+targetScaleX || 0) / 100,
      scaleY: (+targetScaleY || 0) / 100
    },
    +duration || 0,
    easing);
  }

  tweenToSkewXY(targetSkewX, targetSkewY, duration, easing) {
    return this.tweenTo({
      skewX: +targetSkewX || 0,
      skewY: +targetSkewY || 0
    },
    +duration || 0,
    easing);
  }

  tweenTo(target, duration, easing) {
    var _this = this;
    return this.tweenToSource(_this.sprite, target, duration, easing);
  }

  tweenToSource(source, target, duration, easing) {
    var _this = this;
    return new Promise((resolve) => {
      if (!_this.running) {
        resolve();
      }
      var movement = new TWEEN.Tween(source).to(target, duration*1000);
      _this.sprite.tween.add(movement);
      if (easing) {
        movement.easing(EasingMap[easing]);
      }
      movement.onComplete(() => {
        resolve();
      });
      movement.onUpdate(() => {
        if (!_this.running) {
          movement.stop();
          resolve();
        }
      });
      movement.start(_this.sprite.engine._iTime * 1000);
    });
  }

  tweenToProperty(variableName, targetValue, duration, easing) {
    var _this = this;
    return new Promise((resolve) => {
      if (!_this.sprite.engine.hasSpriteProperty(variableName)) { //Stops unused variables from being created accidentally.
        resolve();
        return;
      }
      if (!_this.running) {
        resolve();
      }
      var source = {
        value: +_this.sprite.spriteProperties[variableName] || 0
      };
      var movement = new TWEEN.Tween(source).to({
        value: +targetValue || 0
      }, duration*1000);
      _this.sprite.tween.add(movement);
      if (easing) {
        movement.easing(EasingMap[easing]);
      }
      movement.onComplete(() => {
        resolve();
      });
      movement.onUpdate(() => {
        this.sprite.spriteProperties[variableName] = source.value;
        if (!_this.running) {
          movement.stop();
          resolve();
        }
      });
      movement.start(_this.sprite.engine._iTime * 1000);
    });
  }

  tweenToGlobalVariable(variableName, targetValue, duration, easing) {
    var _this = this;
    return new Promise((resolve) => {
      if (typeof _this.sprite.engine.globalVariables[variableName] == "undefined") { //Stops unused variables from being created accidentally.
        resolve();
        return;
      }
      if (!_this.running) {
        resolve();
      }
      var source = {
        value: +_this.sprite.engine.globalVariables[variableName] || 0
      };
      var movement = new TWEEN.Tween(source).to({
        value: +targetValue || 0
      }, duration*1000);
      _this.sprite.tween.add(movement);
      if (easing) {
        movement.easing(EasingMap[easing]);
      }
      movement.onComplete(() => {
        resolve();
      });
      movement.onUpdate(() => {
        this.sprite.engine.globalVariables[variableName] = source.value;
        if (!_this.running) {
          movement.stop();
          resolve();
        }
      });
      movement.start(_this.sprite.engine._iTime * 1000);
    });
  }

  isInt(val) {
    //Copied and pasted from scratch-vm, but just with some edits.
    // Values that are already numbers.
    if (typeof val === "number") {
      if (isNaN(val)) {
        // NaN is considered an integer.
        return true;
      }
      // True if it's "round" (e.g., 2.0 and 2).
      return val === Math.floor(val);
    } else if (typeof val === "boolean") {
      return true;
    } else if (typeof val === "string") {
      return val.indexOf(".") < 0;
    }
    return false;
  }

  deleteClone() {
    this.stop();
    this.sprite.destroyClone();
  }

  random(from, to) {
    //Copied and pasted from scratch-vm, but just with some edits.
    var { isInt } = this;

    var low = from <= to ? from : to;
    var high = from <= to ? to : from;
    if (low === high) return low;
    // If both arguments are ints, truncate the result to an int.
    if (isInt(from) && isInt(to)) {
      return low + Math.floor(Math.random() * (high + 1 - low));
    }
    return Math.random() * (high - low) + low;
  }

  async repeatTimes(times, func) {
    //No need for error handling since that is done by the thread.
    if (!this.running) {
      return;
    }
    var i = 0;
    while (i < times) {
      i += 1;
      if (!this.running) {
        return;
      }
      await func();
      if (this.screenRefresh) {
        await this.waitForNextFrame();
      }
      if (!this.running) {
        return;
      }
    }
    if (!this.running) {
      return;
    }
  }
}

module.exports = Thread;


/***/ }),

/***/ 3618:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var elements = __webpack_require__(7255);
var AElement = __webpack_require__(3759);
var blocks = __webpack_require__(9436);
var selectedSprite = __webpack_require__(3010);
var costumeViewer = __webpack_require__(5604);
var costumePivot = __webpack_require__(1077);

var tabArea = elements.getGPId("tabArea");
function createTabElementJSON(label, src, whenClick, isSelected) {
  return {
    element: "div",
    className: "tabButton",
    eventListeners: [
      {
        event: "click",
        func: whenClick,
      },
    ],
    GPWhenCreated: function (elm) {
      if (isSelected) {
        elm.setAttribute("selected", "");
      }
    },
    children: [
      {
        element: "img",
        className: "tabIcon",
        src,
      },
      {
        element: "span",
        textContent: label,
      },
    ],
  };
}

const tabs = [
  {
    label: "Code",
    src: "icons/code.svg",
    default: true,
    id: "SCRIPT",
  },
  {
    label: "Costumes",
    src: "icons/brush.svg",
    default: true,
    id: "COSTUMES",
  },
  {
    label: "Sounds",
    src: "icons/speaker.svg",
    default: true,
    id: "SOUNDS",
  },
  {
    label: "Costume pivots",
    src: "icons/pivot.svg",
    default: true,
    id: "COSTUME_PIVOT",
  },
  {
    label: "Error Logs",
    src: "icons/logs.svg",
    default: true,
    id: "ERROR_LOGS",
  },
];

var currentTab = tabs[0].id;

function updateTabs() {
  elements.setInnerJSON(
    tabArea,
    tabs.map((tab) =>
      createTabElementJSON(
        tab.label,
        tab.src,
        () => switchTab(tab.id),
        currentTab == tab.id,
      ),
    ),
  );
  updateVisibility();
}

var blocklyDiv = elements.getGPId("blocklyDiv");

function setWorkspaceVisibility(visible) {
  blocklyDiv.hidden = !visible;

  var workspace = blocks.getCurrentWorkspace();
  if (!workspace) {
    return;
  }
  if (visible) {
    workspace.setVisible(true);
    workspace.getToolbox().refreshSelection();
    setTimeout(function () {
      Blockly.svgResize(workspace);
    }, 0);
  } else {
    workspace.setVisible(false);
  }
}

var costumesContainer = elements.getGPId("costumesContainer");
var soundsContainer = elements.getGPId("soundsContainer");
var costumePivotContainer = elements.getGPId("costumePivotContainer");
var errorLogsContainer = elements.getGPId("errorLogsContainer");

function hideEverything() {
  setWorkspaceVisibility(false);
  costumesContainer.hidden = true;
  costumePivotContainer.hidden = true;
  errorLogsContainer.hidden = true;
  soundsContainer.hidden = true;
}

function updateVisibility() {
  hideEverything();

  if (currentTab == "SCRIPT") {
    setWorkspaceVisibility(true);
  }
  if (currentTab == "COSTUMES") {
    costumesContainer.hidden = false;
  }
  if (currentTab == "COSTUME_PIVOT") {
    costumePivotContainer.hidden = false;
    costumePivot.reloadCostumes(selectedSprite.getCurSprite());
  }
  if (currentTab == "ERROR_LOGS") {
    errorLogsContainer.hidden = false;
  }
  if (currentTab == "SOUNDS") {
    soundsContainer.hidden = false;
  }
}

function switchTab(id) {
  if (currentTab == id) {
    return;
  }
  currentTab = id;
  updateTabs();
}

updateTabs();

module.exports = { updateTabs, updateVisibility, hideEverything, switchTab };


/***/ }),

/***/ 3759:
/***/ ((module) => {

function openInNewTab(href) {
  var a = document.createElement("a");
  a.href = href;
  a.target = "_blank";
  a.click();
}
function openLink(href) {
  var a = document.createElement("a");
  a.href = href;
  a.click();
}
var AElement = {
  openInNewTab,
  openLink,
};
module.exports = AElement;


/***/ }),

/***/ 3989:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = {
  element: "div",
  className: "rightPanel",
  children: [
    {
      element: "div",
      className: "rightPanelContent",
      children: [
        {
          element: "div",
          className: "projectContainer",
          gid: "projectContainer",
          children: [
            {
              element: "div",
              className: "projectControls",
              gid: "projectControls",
            },
            {
              element: "canvas",
              gid: "projectCanvas",
              className: "projectCanvas",
            },
          ],
        },
        {
          element: "span",
          className: "projectMouseCoordinates",
          gid: "projectMouseCoordinates",
        },
        {
          element: "div",
          className: "selectedSpriteContainer",
          children: __webpack_require__(7714),
        },
        {
          element: "div",
          className: "spritesContainer",
          gid: "spritesContainer",
          children: [],
        },
        ...__webpack_require__(5392),
      ],
    },
  ],
};


/***/ }),

/***/ 4043:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var elements = __webpack_require__(7255);
var AElement = __webpack_require__(3759);
var dialogs = __webpack_require__(269);

var engine = __webpack_require__(9940);
var workspaceConfig = {
  comments: true,
  disable: false,
  collapse: false,
  media: "../media/",
  readOnly: false,
  rtl: false,
  scrollbars: true,
  //toolboxPosition: "side",
  //horizontalLayout: "start",
  trashcan: false,
  sounds: false,
  zoom: {
    controls: false,
    wheel: false,
    startScale: 1,
    maxScale: 4,
    minScale: 0.25,
    scaleSpeed: 1.1,
  },
  colours: {
    workspace: "#7d7d7d",
    flyout: "#787878",
    toolbox: "#7d7d7d",
    toolboxSelected: "#3d3d3d",
    scrollbar: "#CECDCE",
    scrollbarHover: "#CECDCE",
    insertionMarker: "#000000",
    insertionMarkerOpacity: 0.2,
    fieldShadow: "rgba(255, 255, 255, 0.3)",
    dragShadowOpacity: 0.6,
    text: "#ffffff",
  },
};

function showCustomBlockDialog(mutator, callback, mainWorkspace) {
  var workspaceArea = null;
  var customBlockButtons = null;
  var customBlockButtons2 = null;
  var customBlockButtons3 = null;
  var dialogDiv = elements.createElementsFromJSON([
    {
      element: "div",
      children: [
        {
          element: "div",
          className: "customBlockDialogBG",
        },
        {
          element: "div",
          className: "customBlockDialogBox",
          children: [
            {
              element: "span",
              style: {
                fontWeight: "bold",
                fontSize: "30px",
              },
              textContent: "Create a block",
            },
            {
              element: "div",
              className: "customBlockWorkspace",
              GPWhenCreated: function (elm) {
                workspaceArea = elm;
              },
            },
            {
              element: "div",
              className: "customBlockButtons",
              GPWhenCreated: function (elm) {
                customBlockButtons = elm;
              },
            },
            {
              element: "div",
              className: "customBlockButtons",
              GPWhenCreated: function (elm) {
                customBlockButtons2 = elm;
              },
            },
            {
              element: "div",
              className: "customBlockButtons",
              GPWhenCreated: function (elm) {
                customBlockButtons3 = elm;
              },
            },
          ],
        },
      ],
    },
  ])[0];
  document.body.append(dialogDiv);

  var oldDefaultToolbox = Blockly.Blocks.defaultToolbox;
  Blockly.Blocks.defaultToolbox = null;
  var workspace = Blockly.inject(workspaceArea, workspaceConfig);
  Blockly.Blocks.defaultToolbox = oldDefaultToolbox;

  var mutationRoot = workspace.newBlock("procedures_declaration");
  mutationRoot.setMovable(false);
  mutationRoot.setDeletable(false);
  mutationRoot.contextMenu = false;
  var Msg = Blockly.Msg;
  workspace.addChangeListener(() => {
    workspaceArea.style.width = mutationRoot.width + 40 + "px";
    workspaceArea.style.height = mutationRoot.height + 40 + "px";

    mutationRoot.onChangeFn();
    Blockly.svgResize(workspace);
    // Keep the block centered on the workspace
    var metrics = workspace.getMetrics();
    var { x, y } = mutationRoot.getRelativeToSurfaceXY();
    var dy = metrics.viewHeight / 2 - mutationRoot.height / 2 - y;
    var dx;
    dx = metrics.viewWidth / 2 - mutationRoot.width / 2 - x;
    if (mutationRoot.width > metrics.viewWidth) {
      dx = metrics.viewWidth - mutationRoot.width - x;
    }
    mutationRoot.moveBy(dx, dy);
  });
  mutationRoot.domToMutation(mutator);
  mutationRoot.initSvg();
  mutationRoot.render();
  //setState({warp: this.mutationRoot.getWarp()});
  // Allow the initial events to run to position this block, then focus.
  setTimeout(() => {
    mutationRoot.focusLastEditor_();
    if (!workspace) {
      return;
    }
    Blockly.svgResize(workspace);
  });

  elements.setInnerJSON(customBlockButtons, [
    {
      element: "div",
      style: {
        display: "flex",
      },
      children: [
        {
          element: "span",
          textContent: "Run without screen refresh: ",
        },
        {
          element: "input",
          type: "checkbox",
          checked: mutationRoot.getWarp(),
          GPWhenCreated: function (elm) {
            elm.oninput = function () {
              mutationRoot.setWarp(elm.checked);
            };
          },
        },
      ],
    },
  ]);
  elements.setInnerJSON(customBlockButtons2, [
    {
      element: "button",
      className: "greyButtonStyle",
      textContent: "Add label",
      eventListeners: [
        {
          event: "click",
          func: function () {
            mutationRoot.addLabelExternal();
          },
        },
      ],
    },
    {
      element: "button",
      className: "greyButtonStyle",
      textContent: "Add boolean",
      eventListeners: [
        {
          event: "click",
          func: function () {
            mutationRoot.addBooleanExternal();
          },
        },
      ],
    },
    {
      element: "button",
      className: "greyButtonStyle",
      textContent: "Add text/number",
      eventListeners: [
        {
          event: "click",
          func: function () {
            mutationRoot.addStringNumberExternal();
          },
        },
      ],
    },
  ]);
  elements.setInnerJSON(customBlockButtons3, [
    {
      element: "button",
      className: "greyButtonStyle",
      textContent: "Done",
      eventListeners: [
        {
          event: "click",
          func: function () {
            callback(mutationRoot.mutationToDom(true));
            workspace.dispose();
            dialogDiv.remove();
            mainWorkspace.getToolbox().refreshSelection();
          },
        },
      ],
    },
    {
      element: "button",
      className: "greyButtonStyle",
      textContent: "Cancel",
      eventListeners: [
        {
          event: "click",
          func: function () {
            callback();
            workspace.dispose();
            dialogDiv.remove();
            mainWorkspace.getToolbox().refreshSelection();
          },
        },
      ],
    },
  ]);
}

module.exports = {
  showCustomBlockDialog,
};


/***/ }),

/***/ 4170:
/***/ ((module) => {

module.exports = {
  element: "div",
  className: "fullscreenModeContainerMain",
  gid: "fullscreenModeContainerMain",
  children: [
    {
      element: "div",
      className: "fullscreenModeContainer",
      gid: "fullscreenModeContainer",
      children: [],
    },
  ],
};


/***/ }),

/***/ 4234:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var { doCleanUp } = __webpack_require__(1051);
var blocks = __webpack_require__(9436);

Blockly.WorkspaceSvg.prototype.cleanUp = function () {
  doCleanUp(blocks.getCurrentWorkspace());
};

__webpack_require__(4619);
__webpack_require__(4926);
__webpack_require__(3235);


/***/ }),

/***/ 4447:
/***/ ((module) => {

class CollisionSprite {
  constructor(
    imageData,
    x = 0,
    y = 0,
    scaleX = 1,
    scaleY = 1,
    angle = 0,
    centerX = 0,
    centerY = 0,
    flipX = false,
    flipY = false,
    collisionTolerance = 0,
  ) {
    this.imageData = imageData;
    this._x = x;
    this._y = y;
    this._scaleX = scaleX;
    this._scaleY = scaleY;
    this._angle = angle;
    this._centerX = centerX;
    this._centerY = centerY;
    this._flipX = flipX;
    this._flipY = flipY;
    this.collisionTolerance = collisionTolerance;

    this.transformMatrix = new Float32Array(6);
    this._invRotationCos = 1;
    this._invRotationSin = 0;
    // --- NEW CACHE FOR INCREMENTAL CALCULATION ---
    this._dx_lx = 1;
    this._dx_ly = 0;
    this.isTransformDirty = true;

    this.generateAlphaList();
  }

  // Getters and Setters remain the same
  get x() {
    return this._x;
  }
  set x(value) {
    if (this._x !== value) {
      this._x = value;
      this.isTransformDirty = true;
    }
  }
  get y() {
    return this._y;
  }
  set y(value) {
    if (this._y !== value) {
      this._y = value;
      this.isTransformDirty = true;
    }
  }
  get scaleX() {
    return this._scaleX;
  }
  set scaleX(value) {
    if (this._scaleX !== value) {
      this._scaleX = value;
      this.isTransformDirty = true;
    }
  }
  get scaleY() {
    return this._scaleY;
  }
  set scaleY(value) {
    if (this._scaleY !== value) {
      this._scaleY = value;
      this.isTransformDirty = true;
    }
  }
  get angle() {
    return this._angle;
  }
  set angle(value) {
    if (this._angle !== value) {
      this._angle = value;
      this.isTransformDirty = true;
    }
  }
  get centerX() {
    return this._centerX;
  }
  set centerX(value) {
    if (this._centerX !== value) {
      this._centerX = value;
      this.isTransformDirty = true;
    }
  }
  get centerY() {
    return this._centerY;
  }
  set centerY(value) {
    if (this._centerY !== value) {
      this._centerY = value;
      this.isTransformDirty = true;
    }
  }
  get flipX() {
    return this._flipX;
  }
  set flipX(value) {
    if (this._flipX !== value) {
      this._flipX = value;
      this.isTransformDirty = true;
    }
  }
  get flipY() {
    return this._flipY;
  }
  set flipY(value) {
    if (this._flipY !== value) {
      this._flipY = value;
      this.isTransformDirty = true;
    }
  }

  ensureTransformIsUpdated() {
    if (this.isTransformDirty) this._updateTransformCache();
  }

  _updateTransformCache() {
    const { _scaleX: sX, _scaleY: sY, _angle: ang } = this;
    const rad = (ang * Math.PI) / 180,
      cos = Math.cos(rad),
      sin = Math.sin(rad);

    const a = cos * sX,
      b = sin * sX,
      c = -sin * sY,
      d = cos * sY;
    this.transformMatrix.set([a, b, c, d]);

    const invRad = (-ang * Math.PI) / 180;
    this._invRotationCos = Math.cos(invRad);
    this._invRotationSin = Math.sin(invRad);

    // --- NEW: Cache the incremental step values ---
    // This pre-calculates how much local coordinates change for each
    // single-pixel step in the world coordinates.
    if (Math.abs(sX) > 1e-6) {
      this._dx_lx = this._invRotationCos / sX;
    }
    if (Math.abs(sY) > 1e-6) {
      this._dx_ly = this._invRotationSin / sY;
    }

    this.isTransformDirty = false;
  }

  generateAlphaList() {
    const data = this.imageData.data;
    this.alphaList = new Uint32Array(data.length / 4);
    for (let i = 0, i2 = 0; i < data.length; i += 4, i2++) {
      if (data[i + 3] > 0) this.alphaList[i2] = 1;
    }
  }

  getAdjustedCenter() {
    const {
      _centerX: cX,
      _centerY: cY,
      _flipX: fX,
      _flipY: fY,
      imageData: { width, height },
    } = this;
    return {
      adjustedCenterX: fX ? width - cX : cX,
      adjustedCenterY: fY ? height - cY : cY,
    };
  }

  transformPoint(lX, lY) {
    this.ensureTransformIsUpdated();
    const [a, b, c, d] = this.transformMatrix;
    const { _x: x, _y: y } = this;
    const { adjustedCenterX: acX, adjustedCenterY: acY } =
      this.getAdjustedCenter();
    const tX = lX - acX,
      tY = lY - acY;
    return { x: tX * a + tY * c + x, y: tX * b + tY * d + y };
  }

  worldToLocal(worldX, worldY) {
    this.ensureTransformIsUpdated();
    const { _x: x, _y: y, _scaleX: scaleX, _scaleY: scaleY } = this;
    const { adjustedCenterX, adjustedCenterY } = this.getAdjustedCenter();
    const translatedX = worldX - x,
      translatedY = worldY - y;
    const cos = this._invRotationCos,
      sin = this._invRotationSin;
    const rotatedX = translatedX * cos - translatedY * sin;
    const rotatedY = translatedX * sin + translatedY * cos;
    const localX = rotatedX / scaleX + adjustedCenterX;
    const localY = rotatedY / scaleY + adjustedCenterY;
    return { x: localX, y: localY };
  }

  getFlippedCoordinates(lX, lY) {
    const {
      _flipX: fX,
      _flipY: fY,
      imageData: { width, height },
    } = this;
    return { x: fX ? width - 1 - lX : lX, y: fY ? height - 1 - lY : lY };
  }

  isPixelOpaque(lX, lY) {
    const { width, height } = this.imageData;
    const { x: fX, y: fY } = this.getFlippedCoordinates(
      Math.round(lX),
      Math.round(lY),
    );
    if (fX < 0 || fY < 0 || fX >= width || fY >= height) return false;
    return this.alphaList[fY * width + fX] === 1;
  }

  getBoundingBox() {
    this.ensureTransformIsUpdated();
    const { width, height } = this.imageData;
    const cs = [
      { x: 0, y: 0 },
      { x: width, y: 0 },
      { x: 0, y: height },
      { x: width, y: height },
    ];
    const tCs = cs.map(({ x, y }) => this.transformPoint(x, y));
    return {
      minX: Math.min(...tCs.map((p) => p.x)),
      maxX: Math.max(...tCs.map((p) => p.x)),
      minY: Math.min(...tCs.map((p) => p.y)),
      maxY: Math.max(...tCs.map((p) => p.y)),
    };
  }

  // --- NEW: ULTRA-OPTIMIZED collisionTest ---
  collisionTest(sprite) {
    this.ensureTransformIsUpdated();
    sprite.ensureTransformIsUpdated();
    const b1 = this.getBoundingBox(),
      b2 = sprite.getBoundingBox();
    const oX1 = Math.max(b1.minX, b2.minX),
      oX2 = Math.min(b1.maxX, b2.maxX);
    const oY1 = Math.max(b1.minY, b2.minY),
      oY2 = Math.min(b1.maxY, b2.maxY);
    if (oX2 < oX1 || oY2 < oY1) return false;

    const tolerance = this.collisionTolerance;
    const startX = oX1 - tolerance;
    const endX = oX2 + tolerance;
    const startY = oY1 - tolerance;
    const endY = oY2 + tolerance;

    // Cache the incremental step values for both sprites
    const this_dx_lx = this._dx_lx;
    const this_dx_ly = this._dx_ly;
    const sprite_dx_lx = sprite._dx_lx;
    const sprite_dx_ly = sprite._dx_ly;

    for (let y = startY; y <= endY; y++) {
      // Calculate the starting local coordinates for this row ONCE
      let localThis = this.worldToLocal(startX, y);
      let localOther = sprite.worldToLocal(startX, y);

      for (let x = startX; x <= endX; x++) {
        if (
          this.isPixelOpaque(localThis.x, localThis.y) &&
          sprite.isPixelOpaque(localOther.x, localOther.y)
        ) {
          return true;
        }
        // --- INCREMENTAL UPDATE ---
        // Instead of a full recalculation, just add the pre-calculated step.
        // This is much, much faster.
        localThis.x += this_dx_lx;
        localThis.y += this_dx_ly;
        localOther.x += sprite_dx_lx;
        localOther.y += sprite_dx_ly;
      }
    }
    return false;
  }
}
module.exports = CollisionSprite;


/***/ }),

/***/ 4619:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var blocks = __webpack_require__(9436);

var { createBlockContextMenu } = __webpack_require__(9870);

function getBlockPosAndXMax(block) {
  const { x, y } = block.getRelativeToSurfaceXY();
  const width = block.getRootBlock().getHeightWidth().width;
  return block.RTL
    ? { pos: { x: x + width, y }, xMax: x }
    : { pos: { x, y }, xMax: x + width };
}

function makeSpaceInWorkspace(targetBlock) {
  const wksp = blocks.getCurrentWorkspace();

  const topBlocks = wksp.getTopBlocks();
  const { pos: tPos, xMax: tXMax } = getBlockPosAndXMax(targetBlock);
  const targetRoot = targetBlock.getRootBlock();
  const isRTL = targetBlock.RTL;

  // TODO: move shift distances to a setting option defined in multiples of grid spacing
  const maxXShift = 380,
    maxYShift = 410;
  let minXShift = maxXShift,
    minYShift = maxYShift;

  // first pass we determine if a block stack should be shifted
  // and if it should be shifted and is closer than maxShift we update the min shift distance
  const shouldShift = [];
  for (const topBlock of topBlocks) {
    if (topBlock === targetRoot) continue;
    const { pos, xMax } = getBlockPosAndXMax(topBlock);

    const withinColumn = isRTL
      ? tPos.x >= xMax && pos.x >= tXMax
      : tPos.x <= xMax && pos.x <= tXMax;

    const shouldShiftX = pos.x < tXMax === isRTL;
    const shouldShiftY = pos.y > tPos.y && withinColumn;
    shouldShift.push([topBlock, shouldShiftX, shouldShiftY]);

    if (shouldShiftX && Math.abs(pos.x - tXMax) < minXShift)
      minXShift = Math.abs(pos.x - tXMax);
    if (shouldShiftY && pos.y - tPos.y < minYShift) minYShift = pos.y - tPos.y;
  }

  // in the second pass we apply a shift based on the min shift to all the blocks we found should be shifted in the first pass
  const shiftX = (isRTL ? -1 : 1) * (maxXShift - minXShift);
  const shiftY = maxYShift - minYShift;
  for (const [block, shldShiftX, shldShiftY] of shouldShift)
    block.moveBy(shiftX * shldShiftX, shiftY * shldShiftY);
}

createBlockContextMenu(
  (items, block) => {
    items.push(
      {
        separator: true,
        _isDevtoolsFirstItem: true,
      },
      {
        enabled: true,
        text: "Make space",
        callback: () => {
          makeSpaceInWorkspace(block, blocks.getCurrentWorkspace());
        },
      },
    );

    return items;
  },
  { blocks: true },
);


/***/ }),

/***/ 4782:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var JavascriptTranslation = {};
var utilFunctions = __webpack_require__(9547);
var outputBlocks = __webpack_require__(7147);
var MYSELF_OUTPUT = JSON.stringify("__myself__");

outputBlocks.push("propertydata_sprite");
JavascriptTranslation["propertydata_sprite"] = function (
  jsonblock,
  utils,
  options,
) {
  var TARGET_SPRITE = utils.getField(
    jsonblock,
    "TARGET_SPRITE",
    options,
    "null",
  );
  return JSON.stringify(TARGET_SPRITE);
};

outputBlocks.push("propertydata_get");
JavascriptTranslation["propertydata_get"] = function (
  jsonblock,
  utils,
  options,
) {
  var TARGET_SPRITE = utils.getInput(
    jsonblock,
    "TARGET_SPRITE",
    options,
    "null",
  );
  var VARIABLE = utils.getField(jsonblock, "VARIABLE", options, "null");
  if (TARGET_SPRITE == MYSELF_OUTPUT) {
    return `sprite.spriteProperties[${JSON.stringify(VARIABLE)}]`;
  } else {
    return `sprite.getSProperty(${TARGET_SPRITE}, ${JSON.stringify(VARIABLE)})`;
  }
};

JavascriptTranslation["propertydata_set"] = function (
  jsonblock,
  utils,
  options,
) {
  var TARGET_SPRITE = utils.getInput(
    jsonblock,
    "TARGET_SPRITE",
    options,
    "null",
  );
  var VARIABLE = utils.getField(jsonblock, "VARIABLE", options, "null");
  var VALUE = utils.getInput(jsonblock, "VALUE", options, "null");
  if (TARGET_SPRITE == MYSELF_OUTPUT) {
    return `sprite.spriteProperties[${JSON.stringify(VARIABLE)}] = ${VALUE};`;
  } else {
    return `sprite.setSProperty(${TARGET_SPRITE}, ${JSON.stringify(VARIABLE)}, ${VALUE});`;
  }
};

JavascriptTranslation["propertydata_changeby"] = function (
  jsonblock,
  utils,
  options,
) {
  var TARGET_SPRITE = utils.getInput(
    jsonblock,
    "TARGET_SPRITE",
    options,
    "null",
  );
  var VARIABLE = utils.getField(jsonblock, "VARIABLE", options, "null");
  var VALUE = utils.getInput(jsonblock, "VALUE", options, "null");
  if (TARGET_SPRITE == MYSELF_OUTPUT) {
    return `sprite.spriteProperties[${JSON.stringify(VARIABLE)}] = (+(sprite.spriteProperties[${JSON.stringify(VARIABLE)}]) || 0) + (+(${VALUE}) || 0);`;
  } else {
    return `sprite.changeSProperty(${TARGET_SPRITE}, ${JSON.stringify(VARIABLE)}, ${VALUE});`;
  }
};

module.exports = JavascriptTranslation;


/***/ }),

/***/ 4797:
/***/ (() => {

var previous_DataCategory = Blockly.DataCategory;
Blockly.DataCategory = function (workspace) {
  var variableModelList = workspace.getVariablesOfType("");
  variableModelList.sort(Blockly.VariableModel.compareByName);
  var xmlList = [];

  Blockly.DataCategory.addCreateButton(xmlList, workspace, "VARIABLE");

  for (var i = 0; i < variableModelList.length; i++) {
    Blockly.DataCategory.addDataVariable(xmlList, variableModelList[i]);
  }

  if (variableModelList.length > 0) {
    xmlList[xmlList.length - 1].setAttribute("gap", 24);
    var firstVariable = variableModelList[0];

    Blockly.DataCategory.addSetVariableTo(xmlList, firstVariable);
    Blockly.DataCategory.addChangeVariableBy(xmlList, firstVariable);
    //Blockly.DataCategory.addShowVariable(xmlList, firstVariable);
    //Blockly.DataCategory.addHideVariable(xmlList, firstVariable);
  }

  return xmlList;
};

Blockly.DataCategory.addCreateButton = previous_DataCategory.addCreateButton;
Blockly.DataCategory.addDataVariable = previous_DataCategory.addDataVariable;
Blockly.DataCategory.addSetVariableTo = previous_DataCategory.addSetVariableTo;
Blockly.DataCategory.addChangeVariableBy =
  previous_DataCategory.addChangeVariableBy;
Blockly.DataCategory.addBlock = previous_DataCategory.addBlock;
Blockly.DataCategory.createValue = previous_DataCategory.createValue;

function createElement(type, args = {}, children = []) {
  var element = document.createElement(type);
  for (var name of Object.keys(args)) {
    element.setAttribute(name, args[name]);
  }
  for (var child of children) {
    element.append(child);
  }
  return element;
}

function createElementXML(text) {
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(text, "text/xml");
  return xmlDoc.children[0];
}

Blockly.WorkspaceSvg.prototype.registerToolboxCategoryCallback(
  "GGM3_VARIABLE",
  function (workspace) {
    var xmlList = [];

    xmlList.push(
      createElement("button", {
        text: "Create variable",
        callbackKey: "GGM3_CREATE_VARIABLE",
      }),
    );

    workspace.registerButtonCallback("GGM3_CREATE_VARIABLE", (button) => {
      Blockly.Variables.createVariable(button.getTargetWorkspace(), null, "");
    });

    var variables = workspace.getVariablesOfType("");
    variables.sort(Blockly.VariableModel.compareByName);

    for (var variable of variables) {
      xmlList.push(
        createElementXML(`
          <block type="data_variable">
            <field name="VARIABLE" id="${variable.getId()}"></field>
          </block>`),
      );
    }

    if (variables.length > 0) {
      var firstVariable = variables[0];
      xmlList.push(
        createElementXML(`
          <block type="data_changevariableby">
            <field name="VARIABLE" id="${firstVariable.getId()}"></field>
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
          </block>`),
      );

      xmlList.push(
        createElementXML(`
          <block type="data_setvariableto">
            <field name="VARIABLE" id="${firstVariable.getId()}"></field>
            <value name="VALUE">
                <shadow type="text">
                    <field name="TEXT">0</field>
                </shadow>
            </value>
          </block>`),
      );
    }

    return xmlList;
  },
);


/***/ }),

/***/ 4912:
/***/ ((module) => {

class ScratchMath {
  static mod(v1, v2) {
    const n = +v1 || 0;
    const modulus = +v2 || 0;
    let result = n % modulus;
    // Scratch mod uses floored division instead of truncated division.
    if (result / modulus < 0) result += modulus;
    return result;
  }
}

module.exports = ScratchMath;


/***/ }),

/***/ 4926:
/***/ (() => {

let enableCherryPicking = true;
let invertCherryPicking = false;
let enableDuplication = false;

let ctrlOrMetaPressed = false;
let altPressed = false;
document.addEventListener(
  "mousedown",
  function (e) {
    ctrlOrMetaPressed = e.ctrlKey || e.metaKey;
    altPressed = e.altKey;
  },
  {
    capture: true,
  },
);

const ScratchBlocks = window.Blockly;

function setGlobalBlockDragState(block, inProgress) {
  try {
    window.__ggm3_currentDragBlock = block || null;
    window.__ggm3_blockDragInProgress = !!inProgress;
  } catch (e) {}
}

setGlobalBlockDragState(null, false);

if (ScratchBlocks.registry) {
  // new Blockly: only implement duplication (cherry picking is a vanilla feature)

  const oldUpdateIsDragging = ScratchBlocks.Gesture.prototype.updateIsDragging;
  ScratchBlocks.Gesture.prototype.updateIsDragging = function (e) {
    if (!this.targetBlock) {
      oldUpdateIsDragging.call(this, e);
      return;
    }

    const isDuplicating =
      enableDuplication &&
      e.altKey &&
      !this.flyout &&
      this.targetBlock.type !== "procedures_definition";

    if (isDuplicating) {
      this.startWorkspace_.setResizesEnabled(false);
      ScratchBlocks.Events.disable();
      let newBlock;
      try {
        const xmlBlock = ScratchBlocks.Xml.blockToDom(this.targetBlock);
        newBlock = ScratchBlocks.Xml.domToBlock(xmlBlock, this.startWorkspace_);
        const xy = this.targetBlock.getRelativeToSurfaceXY();
        newBlock.moveBy(xy.x, xy.y);
      } catch (e) {
        console.error(e);
      }
      ScratchBlocks.Events.enable();
      this.startWorkspace_.setResizesEnabled(true);

      if (newBlock) {
        if (ScratchBlocks.Events.isEnabled()) {
          ScratchBlocks.Events.setGroup(true);
          // setGroup(false) will be called in endDrag() (overridden below)
          ScratchBlocks.Events.fire(
            new (ScratchBlocks.Events.get(ScratchBlocks.Events.BLOCK_CREATE))(
              newBlock,
            ),
          );
        }
        const isCherryPickingInverted =
          invertCherryPicking && this.targetBlock.getParent();
        if ((e.ctrlKey || e.metaKey) === !isCherryPickingInverted) {
          // Holding both Ctrl/Cmd and Alt -> duplicate a single block
          const nextBlock = newBlock.getNextBlock();
          if (nextBlock) {
            nextBlock.dispose();
          }
        }
        this.targetBlock = newBlock;
        ScratchBlocks.common.setSelected(newBlock);
        newBlock.dragStrategy.saIsDuplicating = true;
      }
    }

    oldUpdateIsDragging.call(this, e);
  };

  const oldStartDrag =
    ScratchBlocks.dragging.BlockDragStrategy.prototype.startDrag;
  ScratchBlocks.dragging.BlockDragStrategy.prototype.startDrag = function (e) {
    if (this.block.isShadow()) {
      oldStartDrag.call(this, e);
      return;
    }

    setGlobalBlockDragState(this.block, true);

    if (enableDuplication) {
      // By default, both Ctrl/Cmd and Alt can be used for cherry picking.
      // Exclude Alt if duplication is enabled.
      Object.defineProperty(e, "altKey", { value: false });
    }

    const isDuplicating = this.saIsDuplicating;
    delete this.saIsDuplicating;
    const isCherryPickingInverted =
      invertCherryPicking && (isDuplicating || this.block.getParent());
    if (isCherryPickingInverted) {
      const modifierKeyPressed = e.ctrlKey || e.metaKey || e.altKey;
      Object.defineProperty(e, "ctrlKey", { value: !modifierKeyPressed });
      Object.defineProperty(e, "metaKey", { value: !modifierKeyPressed });
      if (!enableDuplication)
        Object.defineProperty(e, "altKey", { value: !modifierKeyPressed });
    }

    oldStartDrag.call(this, e);
  };

  const oldEndDrag = ScratchBlocks.dragging.BlockDragStrategy.prototype.endDrag;
  ScratchBlocks.dragging.BlockDragStrategy.prototype.endDrag = function (e) {
    oldEndDrag.call(this, e);
    ScratchBlocks.Events.setGroup(false);
    setTimeout(function () {
      setGlobalBlockDragState(null, false);
    }, 0);
  };

  return;
}

// https://github.com/scratchfoundation/scratch-blocks/blob/912b8cc728bea8fd91af85078c64fcdbfe21c87a/core/gesture.js#L454
const originalStartDraggingBlock =
  ScratchBlocks.Gesture.prototype.startDraggingBlock_;
ScratchBlocks.Gesture.prototype.startDraggingBlock_ = function (...args) {
  let block = this.targetBlock_;

  // Track the currently dragged block globally so other UI (sprite list)
  // can detect drops and copy blocks across sprites.
  try {
    setGlobalBlockDragState(block, true);
  } catch (e) {}

  // Scratch uses fake mouse events to implement right click > duplicate
  const isRightClickDuplicate = !(this.mostRecentEvent_ instanceof MouseEvent);

  const isDuplicating =
    enableDuplication &&
    altPressed &&
    !isRightClickDuplicate &&
    !this.flyout_ &&
    !this.shouldDuplicateOnDrag_ &&
    this.targetBlock_.type !== "procedures_definition";

  const isCherryPickingInverted =
    invertCherryPicking && !isRightClickDuplicate && block.getParent();
  const canCherryPick = enableCherryPicking || isDuplicating;
  const isCherryPicking =
    canCherryPick &&
    ctrlOrMetaPressed === !isCherryPickingInverted &&
    !block.isShadow();

  if (isDuplicating || isCherryPicking) {
    if (!ScratchBlocks.Events.getGroup()) {
      // Scratch will disable grouping on its own later.
      ScratchBlocks.Events.setGroup(true);
    }
  }

  if (isDuplicating) {
    // Based on https://github.com/scratchfoundation/scratch-blocks/blob/feda366947432b9d82a4f212f43ff6d4ab6f252f/core/scratch_blocks_utils.js#L171
    // Setting this.shouldDuplicateOnDrag_ = true does NOT work because it doesn't call changeObscuredShadowIds
    this.startWorkspace_.setResizesEnabled(false);
    ScratchBlocks.Events.disable();
    let newBlock;
    try {
      const xmlBlock = ScratchBlocks.Xml.blockToDom(block);
      newBlock = ScratchBlocks.Xml.domToBlock(xmlBlock, this.startWorkspace_);
      ScratchBlocks.scratchBlocksUtils.changeObscuredShadowIds(newBlock);
      const xy = block.getRelativeToSurfaceXY();
      newBlock.moveBy(xy.x, xy.y);
    } catch (e) {
      console.error(e);
    }
    ScratchBlocks.Events.enable();

    if (newBlock) {
      block = newBlock;
      this.targetBlock_ = newBlock;
      try {
        setGlobalBlockDragState(newBlock, true);
      } catch (e) {}
      if (ScratchBlocks.Events.isEnabled()) {
        ScratchBlocks.Events.fire(
          new ScratchBlocks.Events.BlockCreate(newBlock),
        );
      }
    }
  }

  if (isCherryPicking) {
    if (isRightClickDuplicate || isDuplicating) {
      const nextBlock = block.getNextBlock();
      if (nextBlock) {
        nextBlock.dispose();
      }
    }
    block.unplug(true);
  }

  return originalStartDraggingBlock.call(this, ...args);
};

// Clear the global drag tracker on mouseup to avoid stale references
document.addEventListener(
  "mouseup",
  function () {
    setTimeout(function () {
      setGlobalBlockDragState(null, false);
    }, 0);
  },
  { capture: true },
);


/***/ }),

/***/ 4943:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var JavascriptTranslation = {
  ...__webpack_require__(8366),
  ...__webpack_require__(758),
  ...__webpack_require__(20),
  ...__webpack_require__(5890),
  ...__webpack_require__(1718),
  ...__webpack_require__(8195),
  ...__webpack_require__(30),
  ...__webpack_require__(5067),
  ...__webpack_require__(1868),
  ...__webpack_require__(6156),
  ...__webpack_require__(3505),
  ...__webpack_require__(3131),
  ...__webpack_require__(5975),
  ...__webpack_require__(8337),
  ...__webpack_require__(4782),
  ...__webpack_require__(73),
  ...__webpack_require__(5486)
};

module.exports = JavascriptTranslation;


/***/ }),

/***/ 5067:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var JavascriptTranslation = {};
var utilFunctions = __webpack_require__(9547);
var outputBlocks = __webpack_require__(7147);

outputBlocks.push("looks_costume");
JavascriptTranslation["looks_costume"] = function (jsonblock, utils, options) {
  var COSTUME = utils.getField(jsonblock, "COSTUME", options);
  return JSON.stringify(COSTUME);
};

JavascriptTranslation["looks_switchcostumeto"] = function (
  jsonblock,
  utils,
  options,
) {
  var COSTUME = utils.getInput(jsonblock, "COSTUME", options);
  return `sprite.costumeIndex = +(sprite.getCostumeIndex(${COSTUME})) || 0;`;
};

JavascriptTranslation["looks_nextcostume"] = function (
  jsonblock,
  utils,
  options,
) {
  return `sprite.costumeIndex += 1;if (sprite.costumeIndex+1 > sprite.costumes.length) {sprite.costumeIndex = 0;}`;
};

outputBlocks.push("looks_costumenumbername");
JavascriptTranslation["looks_costumenumbername"] = function (
  jsonblock,
  utils,
  options,
) {
  var NUMBER_NAME = utils.getField(jsonblock, "NUMBER_NAME", options);
  return NUMBER_NAME == "number"
    ? "sprite.costumeIndex"
    : "sprite.costume.name";
};

outputBlocks.push("looks_hidden");
JavascriptTranslation["looks_hidden"] = function (jsonblock, utils, options) {
  return `(!!sprite.hidden)`;
};

outputBlocks.push("looks_visible");
JavascriptTranslation["looks_visible"] = function (jsonblock, utils, options) {
  return `(!sprite.hidden)`;
};

JavascriptTranslation["looks_show"] = function (jsonblock, utils, options) {
  return `sprite.hidden = false;`;
};

JavascriptTranslation["looks_hide"] = function (jsonblock, utils, options) {
  return `sprite.hidden = true;`;
};

JavascriptTranslation["looks_changesizeby"] = function (
  jsonblock,
  utils,
  options,
) {
  var CHANGE = utils.getInput(jsonblock, "CHANGE", options);
  return `sprite.size += +${CHANGE} || 0;`;
};

JavascriptTranslation["looks_setsizeto"] = function (
  jsonblock,
  utils,
  options,
) {
  var SIZE = utils.getInput(jsonblock, "SIZE", options);
  return `sprite.size = +${SIZE} || 0;`;
};

outputBlocks.push("looks_size");
JavascriptTranslation["looks_size"] = function (jsonblock, utils, options) {
  return `sprite.size`;
};

outputBlocks.push("looks_xstretch");
JavascriptTranslation["looks_xstretch"] = function (jsonblock, utils, options) {
  return `(sprite.scaleX * 100)`;
};

outputBlocks.push("looks_ystretch");
JavascriptTranslation["looks_ystretch"] = function (jsonblock, utils, options) {
  return `(sprite.scaleY * 100)`; //Lol this was stretch x value instead of y, so fixed here.
};

JavascriptTranslation["looks_stretch_to"] = function (
  jsonblock,
  utils,
  options,
) {
  var XVALUE = utils.getInput(jsonblock, "XVALUE", options);
  var YVALUE = utils.getInput(jsonblock, "YVALUE", options);
  return `sprite.scaleX = (+(${XVALUE}) || 0) / 100;sprite.scaleY = (+(${YVALUE}) || 0) / 100;`;
};

JavascriptTranslation["looks_xstretch_to"] = function (
  jsonblock,
  utils,
  options,
) {
  var VALUE = utils.getInput(jsonblock, "VALUE", options);
  return `sprite.scaleX = (+(${VALUE}) || 0) / 100;`;
};

JavascriptTranslation["looks_ystretch_to"] = function (
  jsonblock,
  utils,
  options,
) {
  var VALUE = utils.getInput(jsonblock, "VALUE", options);
  return `sprite.scaleY = (+(${VALUE}) || 0) / 100;`;
};

JavascriptTranslation["looks_xstretch_by"] = function (
  jsonblock,
  utils,
  options,
) {
  var VALUE = utils.getInput(jsonblock, "VALUE", options);
  return `sprite.scaleX += (+(${VALUE}) || 0) / 100;`;
};

JavascriptTranslation["looks_ystretch_by"] = function (
  jsonblock,
  utils,
  options,
) {
  var VALUE = utils.getInput(jsonblock, "VALUE", options);
  return `sprite.scaleY += (+(${VALUE}) || 0) / 100;`;
};

JavascriptTranslation["looks_seteffectto"] = function (
  jsonblock,
  utils,
  options,
) {
  var EFFECT = utils.getField(jsonblock, "EFFECT", options);
  var VALUE = utils.getInput(jsonblock, "VALUE", options);
  return `sprite.effects.${EFFECT} = +(${VALUE}) || 0;`;
};

JavascriptTranslation["looks_change_effect_by"] = function (
  jsonblock,
  utils,
  options,
) {
  var EFFECT = utils.getField(jsonblock, "EFFECT", options);
  var BY = utils.getInput(jsonblock, "BY", options);
  return `sprite.effects.${EFFECT} += +(${BY}) || 0;`;
};

outputBlocks.push("looks_geteffect");
JavascriptTranslation["looks_geteffect"] = function (
  jsonblock,
  utils,
  options,
) {
  var EFFECT = utils.getField(jsonblock, "EFFECT", options);
  var VALUE = utils.getInput(jsonblock, "VALUE", options);
  return `sprite.effects.${EFFECT}`;
};

JavascriptTranslation["looks_zindex_to"] = function (
  jsonblock,
  utils,
  options,
) {
  var VALUE = utils.getInput(jsonblock, "VALUE", options);
  return `sprite.zIndex = (+(${VALUE}) || 0);`;
};
JavascriptTranslation["looks_zindex_by"] = function (
  jsonblock,
  utils,
  options,
) {
  var VALUE = utils.getInput(jsonblock, "VALUE", options);
  return `sprite.zIndex += (+(${VALUE}) || 0);`;
};
outputBlocks.push("looks_zindex");
JavascriptTranslation["looks_zindex"] = function (jsonblock, utils, options) {
  return `(sprite.zIndex)`;
};

JavascriptTranslation["looks_alpha_to"] = function (jsonblock, utils, options) {
  var VALUE = utils.getInput(jsonblock, "VALUE", options);
  return `sprite.alpha = (+(${VALUE}) || 0);`;
};
JavascriptTranslation["looks_alpha_by"] = function (jsonblock, utils, options) {
  var VALUE = utils.getInput(jsonblock, "VALUE", options);
  return `sprite.alpha += (+(${VALUE}) || 0);`;
};
outputBlocks.push("looks_alpha");
JavascriptTranslation["looks_alpha"] = function (jsonblock, utils, options) {
  return `(sprite.alpha)`;
};

JavascriptTranslation["looks_skew_to"] = function (jsonblock, utils, options) {
  var XVALUE = utils.getInput(jsonblock, "XVALUE", options);
  var YVALUE = utils.getInput(jsonblock, "YVALUE", options);
  return `sprite.skewX = +(${XVALUE}) || 0;sprite.skewY = +(${YVALUE}) || 0;`;
};

JavascriptTranslation["looks_xskew_to"] = function (jsonblock, utils, options) {
  var VALUE = utils.getInput(jsonblock, "VALUE", options);
  return `sprite.skewX = +(${VALUE}) || 0;`;
};

JavascriptTranslation["looks_yskew_to"] = function (jsonblock, utils, options) {
  var VALUE = utils.getInput(jsonblock, "VALUE", options);
  return `sprite.skewY = +(${VALUE}) || 0;`;
};

JavascriptTranslation["looks_xskew_by"] = function (jsonblock, utils, options) {
  var VALUE = utils.getInput(jsonblock, "VALUE", options);
  return `sprite.skewX += +(${VALUE}) || 0;`;
};

JavascriptTranslation["looks_yskew_by"] = function (jsonblock, utils, options) {
  var VALUE = utils.getInput(jsonblock, "VALUE", options);
  return `sprite.skewY += +(${VALUE}) || 0;`;
};

outputBlocks.push("looks_xskew");
JavascriptTranslation["looks_xskew"] = function (jsonblock, utils, options) {
  return `sprite.skewX`;
};

outputBlocks.push("looks_yskew");
JavascriptTranslation["looks_yskew"] = function (jsonblock, utils, options) {
  return `sprite.skewY`;
};

outputBlocks.push("looks_costumenames");
JavascriptTranslation["looks_costumenames"] = function (
  jsonblock,
  utils,
  options,
) {
  return `sprite.costumes.map((c) => c.name)`;
};

outputBlocks.push("looks_costumes");
JavascriptTranslation["looks_costumes"] = function (jsonblock, utils, options) {
  return `sprite.costumes.length`;
};

/* Throw error test thats used to check if error handling works, so that when something fails unexpectedly then the threads won't leak memory */
/*JavascriptTranslation["error_test"] = function (jsonblock, utils, options) {
  return `throw new Error("This is an error reported by the block");`;
};*/

module.exports = JavascriptTranslation;


/***/ }),

/***/ 5334:
/***/ (() => {



/***/ }),

/***/ 5371:
/***/ ((module) => {

function generateToolbox(defaultX, defaultY) {
  var xml = "";

  xml += `
    <category name="Motion" id="motion" colour="${Blockly.Colours.motion.primary}" secondaryColour="${Blockly.Colours.motion.secondary}">
        <block type="motion_gotoxy">
            <value name="X">
                <shadow type="math_number">
                    <field name="NUM">${+defaultX}</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_number">
                    <field name="NUM">${+defaultY}</field>
                </shadow>
            </value>
        </block>
        <block type="motion_goto">
            <value name="TO">
                <shadow type="motion_goto_menu"></shadow>
            </value>
        </block>
        <block type="motion_changexby">
            <value name="DX">
            <shadow type="math_number">
                <field name="NUM">10</field>
            </shadow>
        </value>
        </block>
        <block type="motion_changeyby">
            <value name="DY">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="motion_setx">
            <value name="X">
                <shadow type="math_number">
                    <field name="NUM">${defaultX}</field>
                </shadow>
            </value>
        </block>
        <block type="motion_sety">
            <value name="Y">
                <shadow type="math_number">
                    <field name="NUM">${defaultY}</field>
                </shadow>
            </value>
        </block>
        <block type="motion_pointindirection">
            <value name="DIRECTION">
                <shadow type="math_angle">
                    <field name="NUM">90</field>
                </shadow>
            </value>
            </block>
        <block type="motion_turnright">
            <value name="DEGREES">
                <shadow type="math_number">
                    <field name="NUM">15</field>
                </shadow>
            </value>
        </block>
        <block type="motion_turnleft">
            <value name="DEGREES">
                <shadow type="math_number">
                    <field name="NUM">15</field>
                </shadow>
            </value>
        </block>
        <block type="motion_movesteps">
            <value name="STEPS">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="motion_xposition"></block>
        <block type="motion_yposition"></block>
        <block type="motion_direction"></block>
    </category>
    <category name="Events" id="events" colour="${Blockly.Colours.event.primary}" secondaryColour="${Blockly.Colours.event.secondary}">
        <block type="event_beforegamestarts"></block>
        <block type="event_whengamestarts"></block>
    </category>
    <category name="Broadcasting" id="broadcasting" colour="#bf9c00" secondaryColour="#bf9c00" custom="GGM3_BROADCASTING">
    </category>
    <category name="Sensing" id="sensing" colour="${Blockly.Colours.sensing.primary}" secondaryColour="${Blockly.Colours.sensing.secondary}">
        <block type="sensing_touchingobject" id="sensing_touchingobject">
            <value name="TOUCHINGOBJECTMENU">
                <shadow type="sensing_touchingobjectmenu">
                </shadow>
            </value>
        </block>
        <block type="sensing_mousex"></block>
        <block type="sensing_mousey"></block>
        <block type="sensing_mousedown" gap="30"></block>
		<block type="sensing_keypressed">
			<value name="KEY_OPTION">
				<shadow type="sensing_keyoptions"></shadow>
			</value>
		</block>
    </category>
	<category name="Loader" id="loader" colour="#0066a1" secondaryColour="#0066a1">
		<block type="loader_loadcostume">
			<value name="COSTUME">
				<shadow type="loader_costume"></shadow>
			</value>
		</block>
		<block type="loader_deloadcostume">
			<value name="COSTUME">
				<shadow type="loader_costume"></shadow>
			</value>
		</block>
        <block type="loader_costumeisloaded">
			<value name="COSTUME">
				<shadow type="loader_costume"></shadow>
			</value>
		</block>
        <block type="loader_rendercostumescale">
            <value name="COSTUME">
				<shadow type="loader_costume"></shadow>
			</value>
			<value name="SCALE">
				<shadow type="math_number">
                    <field name="NUM">3</field>
                </shadow>
			</value>
		</block>
        <block type="loader_setrenderscale">
            <value name="COSTUME">
				<shadow type="loader_costume"></shadow>
			</value>
		</block>
        <block type="loader_costume_scale" gap="30">
            <value name="COSTUME">
				<shadow type="loader_costume"></shadow>
			</value>
		</block>
		<block type="loader_soundisloaded">
			<value name="SOUND">
				<shadow type="loader_sound_option"></shadow>
			</value>
		</block>
		<block type="loader_loadsound">
			<value name="SOUND">
				<shadow type="loader_sound_option"></shadow>
			</value>
		</block>
		<block type="loader_deloadsound" gap="30">
			<value name="SOUND">
				<shadow type="loader_sound_option"></shadow>
			</value>
		</block>
    </category>
    <category name="Sprite master" id="spritemaster" colour="#c70000" secondaryColour="#c70000">
        <block type="spritemaster_spriteobjectof">
			<value name="SPRITE">
				<shadow type="spritemaster_sprite"></shadow>
			</value>
		</block>
        <block type="spritemaster_spriteproperty" gap="30">
			<value name="SPRITE">
				<shadow type="spritemaster_sprite"></shadow>
			</value>
		</block>
        <block type="spritemaster_getclonesofsprite">
			<value name="SPRITE">
				<shadow type="spritemaster_sprite"></shadow>
			</value>
		</block>
        <block type="spritemaster_getclonecountofsprite">
			<value name="SPRITE">
				<shadow type="spritemaster_sprite"></shadow>
			</value>
		</block>
        <block type="spritemaster_checktouchingsprite_equals_propertyvalue" >
            <value name="SPRITE">
				<shadow type="spritemaster_sprite"></shadow>
			</value>

            <value name="VALUE">
				<shadow type="text">
                    <field name="TEXT">value</field>
                </shadow>
			</value>
        </block>
    </category>
    <category name="Control" id="Control" colour="${Blockly.Colours.control.primary}" secondaryColour="${Blockly.Colours.control.secondary}">
        <block type="control_wait">
            <value name="DURATION">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="control_repeat">
            <value name="TIMES">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="control_forever">
        </block>
        <block type="control_if">
        </block>
        <block type="control_if_else">
        </block>
        <block type="control_wait_until">
        </block>
        <block type="control_repeat_until">
        </block>
        <block type="control_while" gap="30">
        </block>
        <block type="control_stop" gap="30"></block>
        <block type="control_elapsed" gap="30"></block>
        <block type="control_isclone"></block>
        <block type="control_start_as_clone">
        </block>
        <block type="control_create_clone_of">
            <value name="CLONE_OPTION">
                <shadow type="control_create_clone_of_menu"></shadow>
            </value>
        </block>
        <block type="control_delete_this_clone">
        </block>
    </category>
    <category name="Operators" id="operators" colour="${Blockly.Colours.operators.primary}" secondaryColour="${Blockly.Colours.operators.secondary}">
        <block type="operator_add">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="operator_subtract">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="operator_multiply">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="operator_divide">
            <value name="NUM1">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="operator_random">
            <value name="FROM">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="TO">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="operator_sign">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="operator_fixed">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="DECIMALS">
                <shadow type="math_number">
                    <field name="NUM">2</field>
                </shadow>
            </value>
        </block>
        <block type="operator_round">
            <value name="NUM">
                <shadow type="math_number"></shadow>
            </value>
		</block>
        <block type="operator_mathop">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="operator_js_mod">
            <value name="NUM1">
                <shadow type="math_number"></shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number"></shadow>
            </value>
		</block>
        <block type="operator_scratch_mod">
            <value name="NUM1">
                <shadow type="math_number"></shadow>
            </value>
            <value name="NUM2">
                <shadow type="math_number"></shadow>
            </value>
		</block>
		<block type="operator_joinstring">
			<value name="VALUE1">
                <shadow type="text">
					<field name="TEXT">apple</field>
				</shadow>
            </value>
            <value name="VALUE2">
                <shadow type="text">
					<field name="TEXT">banana</field>
				</shadow>
            </value>
		</block>
		<block type="operator_stringlength">
			<value name="VALUE">
                <shadow type="text">
					<field name="TEXT">apple</field>
				</shadow>
            </value>
		</block>
		<block type="operator_stringtrim">
			<value name="VALUE">
                <shadow type="text">
					<field name="TEXT">apple</field>
				</shadow>
            </value>
		</block>
		<block type="operator_stringlowercase">
			<value name="VALUE">
                <shadow type="text">
					<field name="TEXT">apple</field>
				</shadow>
            </value>
		</block>
		<block type="operator_stringuppercase" gap="30">
			<value name="VALUE">
                <shadow type="text">
					<field name="TEXT">apple</field>
				</shadow>
            </value>
		</block>
        <block type="operator_equals">
            <value name="OPERAND1">
                <shadow type="text"></shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="text"></shadow>
            </value>
        </block>
        <block type="operator_gt">
            <value name="OPERAND1">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="operator_lt">
            <value name="OPERAND1">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="OPERAND2">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="operator_and"></block>
        <block type="operator_or"></block>
        <block type="operator_not" gap="30"></block>
		<block type="operator_outputif">
            <value name="CONDITION"></value>
            <value name="PASS_OUTPUT">
                <shadow type="text">
                    <field name="TEXT">apple</field>
                </shadow>
            </value>
			<value name="FAIL_OUTPUT">
                <shadow type="text">
                    <field name="TEXT">orange</field>
                </shadow>
            </value>
        </block>
        <block type="operator_true"></block>
        <block type="operator_false"></block>
        <block type="operator_nan"></block>
        <block type="operator_null"></block>
        <block type="operator_infinity"></block>
        <block type="operator_empty_string"></block>
        <block type="operator_newline" gap="30"></block>
		<block type="operator_tostring">
            <value name="VALUE">
                <shadow type="text"></shadow>
            </value>
		</block>
		<block type="operator_tonumber">
            <value name="VALUE">
                <shadow type="text"></shadow>
            </value>
		</block>
		<block type="operator_toboolean">
            <value name="VALUE">
                <shadow type="text"></shadow>
            </value>
		</block>
    </category>
    <category name="Looks" id="looks" colour="${Blockly.Colours.looks.primary}" secondaryColour="${Blockly.Colours.looks.secondary}">
        <block type="looks_show"></block>
        <block type="looks_hide"></block>
        <block type="looks_hidden"></block>
        <block type="looks_visible" gap="30"></block>
        <block type="looks_changesizeby">
            <value name="CHANGE">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="looks_setsizeto">
            <value name="SIZE">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="looks_size" gap="30"></block>
		<block type="looks_stretch_to">
            <value name="XVALUE">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
			<value name="YVALUE">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
		<block type="looks_xstretch_to">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
		<block type="looks_ystretch_to">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="looks_xstretch_by">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">5</field>
                </shadow>
            </value>
        </block>
		<block type="looks_ystretch_by">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">5</field>
                </shadow>
            </value>
        </block>
		<block type="looks_xstretch"></block>
		<block type="looks_ystretch" gap="30"></block>
	
        <block type="looks_switchcostumeto">
            <value name="COSTUME">
                <shadow type="looks_costume"></shadow>
            </value>
        </block>
        <block type="looks_nextcostume"></block>
        <block type="looks_costumenumbername"></block>
		<block type="looks_costumenames"></block>
		<block type="looks_costumes" gap="30"></block>

        <block type="looks_alpha"></block>
        <block type="looks_alpha_to">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="looks_alpha_by" gap="30">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">5</field>
                </shadow>
            </value>
        </block>

        <block type="looks_zindex"></block>
        <block type="looks_zindex_to">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="looks_zindex_by" gap="30">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>

		<label text="These do NOT affect collison:"></label>

        <block type="looks_seteffectto">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="looks_change_effect_by">
            <value name="BY">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="looks_geteffect"></block>
        
		<block type="looks_skew_to">
            <value name="XVALUE">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
			<value name="YVALUE">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
		<block type="looks_xskew_to">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
		<block type="looks_yskew_to">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="looks_xskew_by">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">15</field>
                </shadow>
            </value>
        </block>
		<block type="looks_yskew_by">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">15</field>
                </shadow>
            </value>
        </block>
		<block type="looks_xskew"></block>
		<block type="looks_yskew" gap="30"></block>
		
		<!--<block type="error_test"></block>--> <!--This is just a block used to check if error handling works-->
    </category>
    <category name="Sounds" id="sounds" colour="${Blockly.Colours.sounds.primary}" secondaryColour="${Blockly.Colours.sounds.secondary}">
        <block type="sound_play">
            <value name="SOUND_MENU">
                <shadow type="sound_sounds_menu"></shadow>
            </value>
        </block>
        <block type="sound_playuntildone">
            <value name="SOUND_MENU">
                <shadow type="sound_sounds_menu"></shadow>
            </value>
        </block>
        <!--Deprecated blocks with advanced options. These blocks are replaced with sound effect blocks.
        <block type="sound_play_advanced">
            <value name="SOUND_MENU">
                <shadow type="sound_sounds_menu"></shadow>
            </value>
            <value name="PLAYBACK_RATE">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="VOLUME">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="TIME">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="sound_playuntildone_advanced" gap="30">
            <value name="SOUND_MENU">
                <shadow type="sound_sounds_menu"></shadow>
            </value>
            <value name="PLAYBACK_RATE">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="VOLUME">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="TIME">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>-->
        <block type="sound_ggm3effect_set">
            <value name="SOUND_MENU">
                <shadow type="sound_sounds_menu"></shadow>
            </value>
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="sound_ggm3effect_change">
            <value name="SOUND_MENU">
                <shadow type="sound_sounds_menu"></shadow>
            </value>
            <value name="BY">
                <shadow type="math_number">
                    <field name="NUM">5</field>
                </shadow>
            </value>
        </block>
        <block type="sound_ggm3effect_get">
            <value name="SOUND_MENU">
                <shadow type="sound_sounds_menu"></shadow>
            </value>
        </block>
        <block type="sound_stopallsounds"></block>
        <block type="sound_stopallsoundsinsprite"></block>
        <block type="sound_stopsound">
            <value name="SOUND_MENU">
                <shadow type="sound_sounds_menu"></shadow>
            </value>
        </block>
    </category>
    <category name="Game" id="engine" colour="#77a1b5" secondaryColour="#77a1b5">
        <block type="engine_framerate_to">
            <value name="FPS">
                <shadow type="math_number">
                    <field name="NUM">60</field>
                </shadow>
            </value>
        </block>
        <block type="engine_framerate"></block>
    </category>
    <category name="Variables" id="data" colour="#FF8C1A" secondaryColour="#DB6E00" custom="GGM3_VARIABLE">
    </category>
    <category name="Global Variables" id="data_global" colour="#00c756" secondaryColour="#00c756" custom="GGM3_GLOBAL_VARIABLE">
    </category>
    <category name="Sprite properties" id="data_properties" colour="#d1cd77" secondaryColour="#d1cd77" custom="GGM3_PROPERTY_VARIABLES">
    </category>
    <category
        name="My blocks"
        id="myBlocks"
        colour="#FF6680"
        secondaryColour="#FF4D6A"
        custom="PROCEDURE">
    </category>
    <category name="JSON" id="json" colour="#058fff" secondaryColour="#058fff">
        <block type="json_new"></block>
        <label text="Object operations:"></label>
        <block type="json_setto">
            <value name="NAME">
                <shadow type="text">
                    <field name="TEXT">variable</field>
                </shadow>
            </value>
            <value name="VALUE">
                <shadow type="text">
                    <field name="TEXT">value</field>
                </shadow>
            </value>
        </block>
        <block type="json_deleteon">
            <value name="NAME">
                <shadow type="text">
                    <field name="TEXT">variable</field>
                </shadow>
            </value>
        </block>
        <block type="json_geton">
            <value name="NAME">
                <shadow type="text">
                    <field name="TEXT">variable</field>
                </shadow>
            </value>
        </block>
        <block type="json_keys" gap="30"></block>
        <label text="From and to string operations:"></label>
        <block type="json_tostring"></block>
        <block type="json_fromstring" gap="30"></block>
        <label text="Array operations:"></label>
        <block type="json_array_push">
            <value name="VALUE">
                <shadow type="text">
                    <field name="TEXT">value</field>
                </shadow>
            </value>
        </block>
        <block type="json_array_unshift">
            <value name="VALUE">
                <shadow type="text">
                    <field name="TEXT">value</field>
                </shadow>
            </value>
        </block>
        <block type="json_array_lengthof"></block>
        <block type="json_array_indexof">
            <value name="VALUE">
                <shadow type="text">
                    <field name="TEXT">value</field>
                </shadow>
            </value>
        </block>
        <block type="json_array_pop"></block>
        <block type="json_array_contains">
            <value name="VALUE">
                <shadow type="text">
                    <field name="TEXT">value</field>
                </shadow>
            </value>
        </block>
		<block type="json_array_split">
            <value name="STRING">
                <shadow type="text">
                    <field name="TEXT">apple,banana</field>
                </shadow>
            </value>
			<value name="USING">
                <shadow type="text">
                    <field name="TEXT">,</field>
                </shadow>
            </value>
        </block>
		<block type="json_array_join">
            <value name="ARRAY"></value>
			<value name="USING">
                <shadow type="text">
                    <field name="TEXT">,</field>
                </shadow>
            </value>
        </block>
        <label text="Path / deep ops:"></label>
        <block type="json_get_path">
            <value name="PATH">
                <shadow type="text">
                    <field name="TEXT">a.b.c</field>
                </shadow>
            </value>
        </block>
        <block type="json_set_path">
            <value name="PATH">
                <shadow type="text">
                    <field name="TEXT">a.b.c</field>
                </shadow>
            </value>
            <value name="VALUE">
                <shadow type="text">
                    <field name="TEXT">value</field>
                </shadow>
            </value>
        </block>
        <block type="json_delete_path">
            <value name="PATH">
                <shadow type="text">
                    <field name="TEXT">a.b.c</field>
                </shadow>
            </value>
        </block>
        <label text="Utilities:"></label>
        <block type="json_clone"></block>
        <block type="json_parse_safe">
            <value name="STRING">
                <shadow type="text">
                    <field name="TEXT">{"a":1}</field>
                </shadow>
            </value>
        </block>
        <block type="json_pretty_print"></block>
		<block type="json_typeof"></block>
    </category>
    <category name="Tweening" id="tweening" colour="#74b62e" secondaryColour="#74b62e">
        <block type="tween_to_xy">
            <value name="X">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
            <value name="SECONDS">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>

        <block type="tween_to_stretch">
            <value name="X">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
            <value name="SECONDS">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>

        <block type="tween_to_size">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
            <value name="SECONDS">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>

        <block type="tween_to_skew">
            <value name="X">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="Y">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
            <value name="SECONDS">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>

        <block type="tween_to_object">
            <value name="SOURCE"></value>
            <value name="TARGET"></value>
            <value name="SECONDS">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>

        <block type="tween_to_property">
            <value name="TARGET">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
            <value name="SECONDS">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>

        <block type="tween_to_global_variable">
            <value name="TARGET">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
            <value name="SECONDS">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
    </category>
    `;

  return xml;
}

module.exports = generateToolbox;


/***/ }),

/***/ 5392:
/***/ ((module) => {

module.exports = [
  {
    element: "div",
    className: "addSpriteButton greyButtonStyle",
    gid: "addSpriteButton",
    children: [
      {
        element: "img",
        src: "/icons/add.svg",
        style: {
          width: "32px",
          height: "32px",
        },
      },
    ],
  },
  {
    element: "div",
    gid: "spriteAddMenu",
    className: "spriteAddMenu",
    hidden: true,
    children: [],
  },
];


/***/ }),

/***/ 5411:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("precision highp float;\n\n#ifdef DRAW_MODE_silhouette\nuniform vec4 u_silhouetteColor;\n#else // DRAW_MODE_silhouette\n# ifdef ENABLE_color\nuniform float u_color;\n# endif // ENABLE_color\n# ifdef ENABLE_brightness\nuniform float u_brightness;\n# endif // ENABLE_brightness\n#endif // DRAW_MODE_silhouette\n\n#ifdef DRAW_MODE_colorMask\nuniform vec3 u_colorMask;\nuniform float u_colorMaskTolerance;\n#endif // DRAW_MODE_colorMask\n\n#ifdef ENABLE_fisheye\nuniform float u_fisheye;\n#endif // ENABLE_fisheye\n#ifdef ENABLE_whirl\nuniform float u_whirl;\n#endif // ENABLE_whirl\n#ifdef ENABLE_pixelate\nuniform float u_pixelate;\nuniform vec2 u_skinSize;\n#endif // ENABLE_pixelate\n#ifdef ENABLE_mosaic\nuniform float u_mosaic;\n#endif // ENABLE_mosaic\n#ifdef ENABLE_ghost\nuniform float u_ghost;\n#endif // ENABLE_ghost\n\n// --- ADDED FOR WAVY EFFECT ---\n#ifdef ENABLE_wavy\nuniform float iTime;\nuniform float u_wave_xwave; // Renamed from xwave\nuniform float u_wave_ywave; // Renamed from ywave\nuniform float u_wave_xtime; // Renamed from xtime\nuniform float u_wave_ytime; // Renamed from ytime\n#endif // ENABLE_wavy\n// -----------------------------\n\n// --- ADDED FOR RIBBON EFFECT ---\n#ifdef ENABLE_ribbon\nuniform float u_ribbonShiftX;\nuniform float u_ribbonShiftY;\n#endif // ENABLE_ribbon\n// ---------------------------------\n\n#ifdef DRAW_MODE_line\nvarying vec4 v_lineColor;\nvarying float v_lineThickness;\nvarying float v_lineLength;\n#endif // DRAW_MODE_line\n\n#ifdef DRAW_MODE_background\nuniform vec4 u_backgroundColor;\n#endif // DRAW_MODE_background\n\nuniform sampler2D u_skin;\n\n#ifndef DRAW_MODE_background\nvarying vec2 v_texCoord;\n#endif\n\n// Add this to divisors to prevent division by 0, which results in NaNs propagating through calculations.\n// Smaller values can cause problems on some mobile devices.\nconst float epsilon = 1e-3;\n\n#if !defined(DRAW_MODE_silhouette) && (defined(ENABLE_color))\n// Branchless color conversions based on code from:\n// http://www.chilliant.com/rgb2hsv.html by Ian Taylor\n// Based in part on work by Sam Hocevar and Emil Persson\n// See also: https://en.wikipedia.org/wiki/HSL_and_HSV#Formal_derivation\n\n\n// Convert an RGB color to Hue, Saturation, and Value.\n// All components of input and output are expected to be in the [0,1] range.\nvec3 convertRGB2HSV(vec3 rgb)\n{\n\t// Hue calculation has 3 cases, depending on which RGB component is largest, and one of those cases involves a \"mod\"\n\t// operation. In order to avoid that \"mod\" we split the M==R case in two: one for G<B and one for B>G. The B>G case\n\t// will be calculated in the negative and fed through abs() in the hue calculation at the end.\n\t// See also: https://en.wikipedia.org/wiki/HSL_and_HSV#Hue_and_chroma\n\tconst vec4 hueOffsets = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);\n\n\t// temp1.xy = sort B & G (largest first)\n\t// temp1.z = the hue offset we'll use if it turns out that R is the largest component (M==R)\n\t// temp1.w = the hue offset we'll use if it turns out that R is not the largest component (M==G or M==B)\n\tvec4 temp1 = rgb.b > rgb.g ? vec4(rgb.bg, hueOffsets.wz) : vec4(rgb.gb, hueOffsets.xy);\n\n\t// temp2.x = the largest component of RGB (\"M\" / \"Max\")\n\t// temp2.yw = the smaller components of RGB, ordered for the hue calculation (not necessarily sorted by magnitude!)\n\t// temp2.z = the hue offset we'll use in the hue calculation\n\tvec4 temp2 = rgb.r > temp1.x ? vec4(rgb.r, temp1.yzx) : vec4(temp1.xyw, rgb.r);\n\n\t// m = the smallest component of RGB (\"min\")\n\tfloat m = min(temp2.y, temp2.w);\n\n\t// Chroma = M - m\n\tfloat C = temp2.x - m;\n\n\t// Value = M\n\tfloat V = temp2.x;\n\n\treturn vec3(\n\t\tabs(temp2.z + (temp2.w - temp2.y) / (6.0 * C + epsilon)), // Hue\n\t\tC / (temp2.x + epsilon), // Saturation\n\t\tV); // Value\n}\n\nvec3 convertHue2RGB(float hue)\n{\n\tfloat r = abs(hue * 6.0 - 3.0) - 1.0;\n\tfloat g = 2.0 - abs(hue * 6.0 - 2.0);\n\tfloat b = 2.0 - abs(hue * 6.0 - 4.0);\n\treturn clamp(vec3(r, g, b), 0.0, 1.0);\n}\n\nvec3 convertHSV2RGB(vec3 hsv)\n{\n\tvec3 rgb = convertHue2RGB(hsv.x);\n\tfloat c = hsv.z * hsv.y;\n\treturn rgb * c + hsv.z - c;\n}\n#endif // !defined(DRAW_MODE_silhouette) && (defined(ENABLE_color))\n\nconst vec2 kCenter = vec2(0.5, 0.5);\n\nvoid main()\n{\n\t#if !(defined(DRAW_MODE_line) || defined(DRAW_MODE_background))\n\tvec2 texcoord0 = v_texCoord;\n\n\t#ifdef ENABLE_mosaic\n\ttexcoord0 = fract(u_mosaic * texcoord0);\n\t#endif // ENABLE_mosaic\n\n\t// --- APPLIED RIBBON EFFECT EARLY ---\n\t// Apply ribbon effect before pixelate to avoid pixelation artifacts\n\t#ifdef ENABLE_ribbon\n\t{\n\t\ttexcoord0.x = fract(texcoord0.x + u_ribbonShiftX);\n\t\ttexcoord0.y = fract(texcoord0.y + u_ribbonShiftY);\n\t}\n\t#endif // ENABLE_ribbon\n\t// --------------------------------\n\n\t#ifdef ENABLE_pixelate\n\t{\n\t\t// TODO: clean up \"pixel\" edges\n\t\tvec2 pixelTexelSize = u_skinSize / u_pixelate;\n\t\ttexcoord0 = (floor(texcoord0 * pixelTexelSize) + kCenter) / pixelTexelSize;\n\t}\n\t#endif // ENABLE_pixelate\n\n\t#ifdef ENABLE_whirl\n\t{\n\t\tconst float kRadius = 0.5;\n\t\tvec2 offset = texcoord0 - kCenter;\n\t\tfloat offsetMagnitude = length(offset);\n\t\tfloat whirlFactor = max(1.0 - (offsetMagnitude / kRadius), 0.0);\n\t\tfloat whirlActual = u_whirl * whirlFactor * whirlFactor;\n\t\tfloat sinWhirl = sin(whirlActual);\n\t\tfloat cosWhirl = cos(whirlActual);\n\t\tmat2 rotationMatrix = mat2(\n\t\t\tcosWhirl, -sinWhirl,\n\t\t\tsinWhirl, cosWhirl\n\t\t);\n\n\t\ttexcoord0 = rotationMatrix * offset + kCenter;\n\t}\n\t#endif // ENABLE_whirl\n\n\t#ifdef ENABLE_fisheye\n\t{\n\t\tvec2 vec = (texcoord0 - kCenter) / kCenter;\n\t\tfloat vecLength = length(vec);\n\t\tfloat r = pow(min(vecLength, 1.0), u_fisheye) * max(1.0, vecLength);\n\t\tvec2 unit = vec / vecLength;\n\n\t\ttexcoord0 = kCenter + r * unit * kCenter;\n\t}\n\t#endif // ENABLE_fisheye\n\n\t// --- ADDED FOR WAVY EFFECT ---\n\t// This modifies the texture coordinates just before sampling.\n\t#ifdef ENABLE_wavy\n\t{\n\t\t// Use epsilon to prevent division by zero if time uniforms are 0\n\t\ttexcoord0.x += sin(texcoord0.y * u_wave_xwave + iTime) / (u_wave_xtime + epsilon);\n\t\ttexcoord0.y += sin(texcoord0.x * u_wave_ywave + iTime) / (u_wave_ytime + epsilon);\n\t}\n\t#endif // ENABLE_wavy\n\t// -----------------------------\n\n\tgl_FragColor = texture2D(u_skin, texcoord0);\n\n\t#if defined(ENABLE_color) || defined(ENABLE_brightness)\n\t// Divide premultiplied alpha values for proper color processing\n\t// Add epsilon to avoid dividing by 0 for fully transparent pixels\n\tgl_FragColor.rgb = clamp(gl_FragColor.rgb / (gl_FragColor.a + epsilon), 0.0, 1.0);\n\n\t#ifdef ENABLE_color\n\t{\n\t\tvec3 hsv = convertRGB2HSV(gl_FragColor.xyz);\n\n\t\t// this code forces grayscale values to be slightly saturated\n\t\t// so that some slight change of hue will be visible\n\t\tconst float minLightness = 0.11 / 2.0;\n\t\tconst float minSaturation = 0.09;\n\t\tif (hsv.z < minLightness) hsv = vec3(0.0, 1.0, minLightness);\n\t\telse if (hsv.y < minSaturation) hsv = vec3(0.0, minSaturation, hsv.z);\n\n\t\thsv.x = mod(hsv.x + u_color, 1.0);\n\t\tif (hsv.x < 0.0) hsv.x += 1.0;\n\n\t\tgl_FragColor.rgb = convertHSV2RGB(hsv);\n\t}\n\t#endif // ENABLE_color\n\n\t#ifdef ENABLE_brightness\n\tgl_FragColor.rgb = clamp(gl_FragColor.rgb + vec3(u_brightness), vec3(0), vec3(1));\n\t#endif // ENABLE_brightness\n\n\t// Re-multiply color values\n\tgl_FragColor.rgb *= gl_FragColor.a + epsilon;\n\n\t#endif // defined(ENABLE_color) || defined(ENABLE_brightness)\n\n\t#ifdef ENABLE_ghost\n\tgl_FragColor *= u_ghost;\n\t#endif // ENABLE_ghost\n\n\t#ifdef DRAW_MODE_silhouette\n\t// Discard fully transparent pixels for stencil test\n\tif (gl_FragColor.a == 0.0) {\n\t\tdiscard;\n\t}\n\t// switch to u_silhouetteColor only AFTER the alpha test\n\tgl_FragColor = u_silhouetteColor;\n\t#else // DRAW_MODE_silhouette\n\n\t#ifdef DRAW_MODE_colorMask\n\tvec3 maskDistance = abs(gl_FragColor.rgb - u_colorMask);\n\tvec3 colorMaskTolerance = vec3(u_colorMaskTolerance, u_colorMaskTolerance, u_colorMaskTolerance);\n\tif (any(greaterThan(maskDistance, colorMaskTolerance)))\n\t{\n\t\tdiscard;\n\t}\n\t#endif // DRAW_MODE_colorMask\n\t#endif // DRAW_MODE_silhouette\n\n\t#ifdef DRAW_MODE_straightAlpha\n\t// Un-premultiply alpha.\n\tgl_FragColor.rgb /= gl_FragColor.a + epsilon;\n\t#endif\n\n\t#endif // !(defined(DRAW_MODE_line) || defined(DRAW_MODE_background))\n\n\t#ifdef DRAW_MODE_line\n\t// Maaaaagic antialiased-line-with-round-caps shader.\n\n\t// \"along-the-lineness\". This increases parallel to the line.\n\t// It goes from negative before the start point, to 0.5 through the start to the end, then ramps up again\n\t// past the end point.\n\tfloat d = ((v_texCoord.x - clamp(v_texCoord.x, 0.0, v_lineLength)) * 0.5) + 0.5;\n\n\t// Distance from (0.5, 0.5) to (d, the perpendicular coordinate). When we're in the middle of the line,\n\t// d will be 0.5, so the distance will be 0 at points close to the line and will grow at points further from it.\n\t// For the \"caps\", d will ramp down/up, giving us rounding.\n\t// See https://www.youtube.com/watch?v=PMltMdi1Wzg for a rough outline of the technique used to round the lines.\n\tfloat line = distance(vec2(0.5), vec2(d, v_texCoord.y)) * 2.0;\n\t// Expand out the line by its thickness.\n\tline -= ((v_lineThickness - 1.0) * 0.5);\n\t// Because \"distance to the center of the line\" decreases the closer we get to the line, but we want more opacity\n\t// the closer we are to the line, invert it.\n\tgl_FragColor = v_lineColor * clamp(1.0 - line, 0.0, 1.0);\n\t#endif // DRAW_MODE_line\n\n\t#ifdef DRAW_MODE_background\n\tgl_FragColor = u_backgroundColor;\n\t#endif\n}");

/***/ }),

/***/ 5460:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var AudioEngine = __webpack_require__(6733);

var SoundEffects = __webpack_require__(1352);

class Sound {
  constructor(engine, sprite, dataURL, onread) {
    this.engine = engine;
    this.sprite = sprite;
    this.src = dataURL;
    this.data = null;
    this.onread = onread || function () {};
    this.id = Date.now() + "_" + Math.round(Math.random() * 9999999);
    this.name = "";
    this.willPreload = true;
    this.playingOn = {};
    this.mimeType = "audio/mp3";
    this.loading = false;
    this.effects = new SoundEffects(this);
  }

  getSoundIdentifier() {
    //used by sound manager.
    return this.name;
  }

  get dataURL() {
    return this.src;
  }

  set dataURL(v) {
    this.src = v;
  }

  stopForSpriteID(spriteid) {
    throw new Error(
      "Deprecated call for stopForSpriteID, use the new SoundManager system.",
    );
  }

  stopForSprite(sprite = this.sprite) {
    throw new Error(
      "Deprecated call for stopForSprite, use the new SoundManager system.",
    );
  }

  stopAll() {
    throw new Error(
      "Deprecated call for stopAll, use the new SoundManager system.",
    );
  }

  tweakVolume(spriteContext, volume = 1) {
    throw new Error(
      "Deprecated call for tweakVolume, use the new SoundManager system.",
    );
  }

  tweakPlaybackRate(spriteContext, playbackRate = 1) {
    throw new Error(
      "Deprecated call for tweakPlaybackRate, use the new SoundManager system.",
    );
  }

  play(spriteContext, time = 0, volume = 1, playbackRate = 1) {
    throw new Error(
      "Deprecated call for play, use the new SoundManager system.",
    );
  }

  async loadSound() {
    if (this.loading) {
      return;
    }
    if (this.data) {
      return;
    }
    this.loading = true;
    var data = await AudioEngine.loadSoundFromURL(this.src);
    this.data = data;
    if (this.onread) {
      this.onread(true);
    }
    this.loading = false;
  }

  getDuration () {
    //this.data is a audio buffer. If it's not loaded (is null), return 0.
    if (!this.data) {
      return 0;
    }
    return this.data.duration;
  }

  deloadSound() {
    this.data = null;
    this.loading = false;
  }

  dispose() {
    this.data = null;
    this.effects.dispose();
  }
}

module.exports = Sound;


/***/ }),

/***/ 5486:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var JavascriptTranslation = {};
var utilFunctions = __webpack_require__(9547);
var outputBlocks = __webpack_require__(7147);

JavascriptTranslation["tween_to_xy"] = function (jsonblock, utils, options) {
  var X = utils.getInput(jsonblock, "X", options, "undefined");
  var Y = utils.getInput(jsonblock, "Y", options, "undefined");
  var SECONDS = utils.getInput(jsonblock, "SECONDS", options, "undefined");
  var EASING = utils.getField(jsonblock, "EASING", options, "linear");

  return `${utilFunctions.aliveCheck()}await thread.tweenToXY(${X}, ${Y}, ${SECONDS}, ${JSON.stringify(EASING)});${utilFunctions.aliveCheck()}`;
};

JavascriptTranslation["tween_to_stretch"] = function (jsonblock, utils, options) {
  var X = utils.getInput(jsonblock, "X", options, "undefined");
  var Y = utils.getInput(jsonblock, "Y", options, "undefined");
  var SECONDS = utils.getInput(jsonblock, "SECONDS", options, "undefined");
  var EASING = utils.getField(jsonblock, "EASING", options, "linear");

  return `${utilFunctions.aliveCheck()}await thread.tweenToStretchXY(${X}, ${Y}, ${SECONDS}, ${JSON.stringify(EASING)});${utilFunctions.aliveCheck()}`;
};

JavascriptTranslation["tween_to_size"] = function (jsonblock, utils, options) {
  var VALUE = utils.getInput(jsonblock, "VALUE", options, "undefined");
  var SECONDS = utils.getInput(jsonblock, "SECONDS", options, "undefined");
  var EASING = utils.getField(jsonblock, "EASING", options, "linear");

  return `${utilFunctions.aliveCheck()}await thread.tweenToSize(${VALUE}, ${SECONDS}, ${JSON.stringify(EASING)});${utilFunctions.aliveCheck()}`;
};

JavascriptTranslation["tween_to_skew"] = function (jsonblock, utils, options) {
  var X = utils.getInput(jsonblock, "X", options, "undefined");
  var Y = utils.getInput(jsonblock, "Y", options, "undefined");
  var SECONDS = utils.getInput(jsonblock, "SECONDS", options, "undefined");
  var EASING = utils.getField(jsonblock, "EASING", options, "linear");

  return `${utilFunctions.aliveCheck()}await thread.tweenToSkewXY(${X}, ${Y}, ${SECONDS}, ${JSON.stringify(EASING)});${utilFunctions.aliveCheck()}`;
};

JavascriptTranslation["tween_to_object"] = function (jsonblock, utils, options) {
  var SOURCE = utils.getInput(jsonblock, "SOURCE", options, "{}");
  var TARGET = utils.getInput(jsonblock, "TARGET", options, "{}");
  var SECONDS = utils.getInput(jsonblock, "SECONDS", options, "undefined");
  var EASING = utils.getField(jsonblock, "EASING", options, "linear");
  
  return `${utilFunctions.aliveCheck()}await thread.tweenToSource(${SOURCE}, ${TARGET}, +(${SECONDS}) || 0, ${JSON.stringify(EASING)});${utilFunctions.aliveCheck()}`;
};

JavascriptTranslation["tween_to_property"] = function (jsonblock, utils, options) {
  var VARIABLE = utils.getField(jsonblock, "VARIABLE", options, "null");
  var TARGET = utils.getInput(jsonblock, "TARGET", options, "{}");
  var SECONDS = utils.getInput(jsonblock, "SECONDS", options, "undefined");
  var EASING = utils.getField(jsonblock, "EASING", options, "linear");
  
  return `${utilFunctions.aliveCheck()}await thread.tweenToProperty(${JSON.stringify(VARIABLE)}, ${TARGET}, +(${SECONDS}) || 0, ${JSON.stringify(EASING)});${utilFunctions.aliveCheck()}`;
};

JavascriptTranslation["tween_to_global_variable"] = function (jsonblock, utils, options) {
  var VARIABLE = utils.getField(jsonblock, "VARIABLE", options, "null");
  var TARGET = utils.getInput(jsonblock, "TARGET", options, "{}");
  var SECONDS = utils.getInput(jsonblock, "SECONDS", options, "undefined");
  var EASING = utils.getField(jsonblock, "EASING", options, "linear");
  
  return `${utilFunctions.aliveCheck()}await thread.tweenToGlobalVariable(${JSON.stringify(VARIABLE)}, ${TARGET}, +(${SECONDS}) || 0, ${JSON.stringify(EASING)});${utilFunctions.aliveCheck()}`;
};

module.exports = JavascriptTranslation;


/***/ }),

/***/ 5604:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var elements = __webpack_require__(7255);
var AElement = __webpack_require__(3759);

var costumesContainer = elements.getGPId("costumesContainer");
var costumesHeaderContainer = elements.getGPId("costumesHeaderContainer");
var costumesSelectorContainer = elements.getGPId("costumesSelectorContainer");

var costumePivots = __webpack_require__(1077);

var { makeSortable } = __webpack_require__(2088);

var deps = {
  markAsDirty: () => {},
  forwardMarkAsDirty: function () {
    costumePivots.deps.markAsDirty = deps.markAsDirty;
  }
};

function reloadCostumes(spr, reloadTabCallback = function () {}) {
  costumePivots.reloadCostumes(spr, reloadTabCallback);
  elements.setInnerJSON(costumesHeaderContainer, [
    {
      element: "button",
      className: "greyButtonStyle",
      textContent: "Import Costume",
      style: {
        marginRight: "2px",
      },
      eventListeners: [
        {
          event: "click",
          func: function () {
            var input = document.createElement("input");
            input.type = "file";
            input.accept = ".webp, .png, .bmp, .svg, .jpg, .jpeg";
            input.multiple = true;
            input.onchange = async function () {
              if (input.files[0]) {
                var p = [];
                for (var _file of input.files) {
                  function load(file) {
                    return new Promise((resolve) => {
                      var reader = new FileReader();
                      reader.onload = async function () {
                        input.value = "";
                        input.remove();

                        try {
                          var costume = await spr.addCostume(reader.result);
                          costume.mimeType = file.type;
                          costume.name = file.name
                            .split(".")
                            .slice(0, file.name.split(".").length - 1)
                            .join(".")
                            .trim();
                          spr.ensureUniqueCostumeNames();
                          resolve();
                          reloadCostumes(spr);
                          deps.markAsDirty();
                        } catch (e) {
                          window.alert(e);
                        }
                      };
                      reader.readAsDataURL(file);
                    });
                  }
                  p.push(load(_file));
                }
                Promise.all(p).then(() => {
                  reloadTabCallback(spr);
                });
              } else {
                input.value = "";
                input.remove();
              }
            };
            input.click();
          },
        },
      ],
    },
  ]);
  if (spr.costumes.length < 1) {
    elements.setInnerJSON(costumesSelectorContainer, [
      {
        element: "span",
        textContent: "This sprite has no costumes.",
        style: {
          fontWeight: "bold",
          textDecoration: "underline",
        },
      },
    ]);
  } else {
    var previousScrollTop = costumesSelectorContainer.scrollTop;
    var previousScrollLeft = costumesSelectorContainer.scrollLeft;
    elements.setInnerJSON(
      costumesSelectorContainer,
      spr.costumes.map((costume, i) => {
        return {
          element: "div",
          className: "costumeContainer",
          children: [
            {
              element: "img",
              src: costume.dataURL,
              style: {
                width: "70px",
                height: "70px",
                objectFit: "contain",
              },
            },
            {
              element: "input",
              value: costume.name,
              className: "selectedCostumeInput",
              eventListeners: [
                {
                  event: "change",
                  func: function () {
                    costume.name = this.value.trim();
                    spr.ensureUniqueCostumeNames();
                    reloadCostumes(spr);
                    reloadTabCallback(spr);
                    deps.markAsDirty();
                  },
                },
              ],
            },
            {
              element: "button",
              className: "greyButtonStyle",
              textContent: "Switch",
              style: {
                marginRight: "2px",
                fontSize: "12px",
              },
              eventListeners: [
                {
                  event: "click",
                  func: function () {
                    spr.costumeIndex = i;
                    deps.markAsDirty();
                  },
                },
              ],
            },
            {
              element: "button",
              className: "greyButtonStyle",
              style: {
                marginRight: "2px",
                fontSize: "12px",
              },
              GPWhenCreated: function (elm) {
                if (costume.willPreload) {
                  elm.textContent = "Disable preloading";
                } else {
                  elm.textContent = "Enable preloading";
                }
              },
              eventListeners: [
                {
                  event: "click",
                  func: function () {
                    costume.willPreload = !costume.willPreload;
                    if (costume.willPreload) {
                      this.textContent = "Disable preloading";
                    } else {
                      this.textContent = "Enable preloading";
                    }
                    deps.markAsDirty();
                  },
                },
              ],
            },
            {
              element: "button",
              className: "greyButtonStyle",
              textContent: "Load",
              style: {
                marginRight: "2px",
                fontSize: "12px",
              },
              eventListeners: [
                {
                  event: "click",
                  func: function () {
                    costume.loadCostume();
                  },
                },
              ],
            },
            {
              element: "button",
              className: "greyButtonStyle",
              textContent: "Deload",
              style: {
                marginRight: "2px",
                fontSize: "12px",
              },
              eventListeners: [
                {
                  event: "click",
                  func: function () {
                    costume.deloadCostume();
                  },
                },
              ],
            },
            {
              element: "button",
              className: "greyButtonStyle",
              textContent: "Delete",
              style: {
                marginRight: "2px",
                fontSize: "12px",
              },
              eventListeners: [
                {
                  event: "click",
                  func: function () {
                    spr.deleteCostume(costume);
                    reloadCostumes(spr);
                    reloadTabCallback(spr);
                    deps.markAsDirty();
                  },
                },
              ],
            },
          ],
        };
      }),
    );
    costumesSelectorContainer.scrollTop = previousScrollTop;
    costumesSelectorContainer.scrollLeft = previousScrollLeft;

    makeSortable(
      costumesSelectorContainer,
      ".costumeContainer",
      (oldIndex, newIndex) => {
        // This callback runs only when the user releases the mouse
        // and the order has actually changed.

        if (oldIndex === newIndex) return;

        // 1. Move data in the engine
        var costumeToMove = spr.costumes[oldIndex];
        spr.costumes.splice(oldIndex, 1);
        spr.costumes.splice(newIndex, 0, costumeToMove);

        spr.costumeIndex = spr.costumes.indexOf(spr.costumes[spr.costumeIndex]);

        spr.ensureUniqueCostumeNames();

        reloadCostumes(spr);
        reloadTabCallback(spr);
        deps.markAsDirty();
      },
    );
  }
}

module.exports = {
  reloadCostumes,
  deps
};


/***/ }),

/***/ 5651:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var elements = __webpack_require__(7255);

function closeSpriteMenu2() {
  var spriteAddMenu = elements.getGPId("spriteAddMenu");
  spriteAddMenu.hidden = true;
  spriteAddMenu.innerHTML = "";
}

document.addEventListener("click", function (evt) {
  closeSpriteMenu2();
});

function init(state, deps) {
  var spriteNameInput = elements.getGPId("spriteNameInput");
  var spriteXPosInput = elements.getGPId("spriteXPosInput");
  var spriteYPosInput = elements.getGPId("spriteYPosInput");
  var spriteDirectionInput = elements.getGPId("spriteDirectionInput");
  var spriteSizeInput = elements.getGPId("spriteSizeInput");
  var spriteHiddenInput = elements.getGPId("spriteHiddenInput");

  var spritesContainer = elements.getGPId("spritesContainer");
  var addSpriteButton = elements.getGPId("addSpriteButton");
  var spriteAddMenu = elements.getGPId("spriteAddMenu");
  var errorLogsContainer = elements.getGPId("errorLogsContainer");

  function closeSpriteAddMenu() {
    spriteAddMenu.hidden = true;
    spriteAddMenu.innerHTML = "";
  }

  function openSpriteAddMenu() {
    if (!spriteAddMenu.hidden) {
      closeSpriteAddMenu();
      return;
    }
    spriteAddMenu.hidden = false;
    var elms = [
      {
        element: "div",
        className: "spriteAddMenuItem",
        eventListeners: [
          {
            event: "click",
            func: function () {
              closeSpriteAddMenu();
              deps.engine.createEmptySprite();
              deps.engine.makeUniqueSpriteNames();
              if (typeof deps.onSetCurrentSprite === "function") {
                deps.onSetCurrentSprite(deps.engine.sprites.length - 1);
              }
              deps.markProjectDirty();
            }
          }
        ],
        children: [
          {
            element: "img",
            src: "/icons/add.svg",
          },
          "New",
        ],
      },
      {
        element: "div",
        className: "spriteAddMenuItem",
        eventListeners: [
          {
            event: "click",
            func: function () {
              closeSpriteAddMenu();
              window.alert("Import feature coming soon!");
            }
          }
        ],
        children: [
          {
            element: "img",
            src: "/icons/import.svg",
          },
          "Import",
        ],
      },
    ];
    elements.setInnerJSON(spriteAddMenu, elms);
  }

  addSpriteButton.addEventListener("click", (event) => {
    openSpriteAddMenu();
    event.stopPropagation();
  });

  function getErrorLogDiv(error) {
    var logDiv = document.createElement("div");
    logDiv.className = "errorLogError";
    logDiv.textContent = error.toString();
    return logDiv;
  }

  function updateSpritesContainer() {
    var engine = deps.engine;
    elements.setInnerJSON(
      spritesContainer,
      engine.sprites.map((spr, i) => {
        return {
          element: "div",
          className: "spriteContainer",
          style: {
            cursor: "grab",
          },
          eventListeners: [
            {
              event: "dragover",
              func: function (evt) {
                try {
                  evt.preventDefault();
                  var elm = evt.currentTarget || evt.target;
                  elm.classList.add("sprite-drop-target");
                } catch (err) {}
              },
            },
            {
              event: "dragleave",
              func: function (evt) {
                try {
                  var elm = evt.currentTarget || evt.target;
                  elm.classList.remove("sprite-drop-target");
                } catch (err) {}
              },
            },
            {
              event: "mouseup",
              func: function (evt) {
                var elm = evt.currentTarget || evt.target;

                // --- FIX 1: Ignore if clicking buttons ---
                // If the user clicked "Select", "Delete", etc., stop here.
                if (evt.target.tagName === "BUTTON") return;
                // -----------------------------------------

                try {
                  elm.classList.remove("sprite-drop-target");
                } catch (err) {}

                if (!window.__ggm3_blockDragInProgress) return;
                var draggedBlock = window.__ggm3_currentDragBlock;

                // If we still don't think we are dragging, STOP.
                if (!draggedBlock) return;

                try {
                  if (!draggedBlock.workspace) return;
                  var srcWorkspace = deps.blocks.getCurrentWorkspace();
                  if (draggedBlock.workspace !== srcWorkspace) return;
                } catch (err) {
                  return;
                }

                if (i === state.currentSelectedSpriteIndex) return;
                if (
                  state.currentSelectedSprite &&
                  state.currentSelectedSprite.clones
                ) {
                  if (state.currentSelectedSprite.clones.indexOf(spr) !== -1)
                    return;
                }

                try {
                  var root = draggedBlock.getRootBlock();
                  if (!root) return;
                  var div = document.createElement("div");
                  document.body.append(div);
                  var tempWorkspace = Blockly.inject(div, {
                    comments: true,
                    disable: false,
                    collapse: false,
                    media: "../media/",
                    readOnly: false,
                    rtl: false,
                    scrollbars: false,
                    trashcan: false,
                    sounds: false,
                  });

                  if (spr.blocklyXML) {
                    Blockly.Xml.domToWorkspace(spr.blocklyXML, tempWorkspace);
                  }

                  var xmlBlock = Blockly.Xml.blockToDom(root);
                  Blockly.Xml.domToBlock(xmlBlock, tempWorkspace);

                  try {
                    if (
                      state.currentSelectedSprite &&
                      state.currentSelectedSprite.variables
                    ) {
                      for (var varId of Object.keys(
                        state.currentSelectedSprite.variables,
                      )) {
                        if (!spr.variables[varId]) {
                          spr.variables[varId] =
                            state.currentSelectedSprite.variables[varId];
                        }
                      }
                    }
                    if (
                      state.currentSelectedSprite &&
                      state.currentSelectedSprite.spriteProperties
                    ) {
                      for (var propName of Object.keys(
                        state.currentSelectedSprite.spriteProperties,
                      )) {
                        if (!spr.spriteProperties[propName]) {
                          spr.spriteProperties[propName] =
                            state.currentSelectedSprite.spriteProperties[
                              propName
                            ];
                        }
                      }
                    }
                  } catch (varErr) {
                    console.warn(
                      "Warning: could not copy variables to target sprite:",
                      varErr,
                    );
                  }

                  spr.blocklyXML = Blockly.Xml.workspaceToDom(tempWorkspace);

                  tempWorkspace.dispose();
                  div.remove();

                  try {
                    deps.compile.compileSpriteXML(spr);
                  } catch (e) {}

                  updateSpritesContainer();
                  deps.markProjectDirty();
                } catch (err) {
                  console.error("Error copying block to sprite:", err);
                }
              },
            },
          ],
          GPWhenCreated: function (elm) {
            if (state.currentSelectedSpriteIndex == i) {
              elm.setAttribute("selected", "");
            }
          },
          children: [
            {
              element: "div",
              className: "spriteTextContainer",
              textContent: spr.name,
              style: {
                marginRight: "5px",
              },
            },
            {
              element: "button",
              className: "greyButtonStyle",
              textContent: "Select",
              style: {
                fontSize: "15px",
                marginRight: "5px",
              },
              eventListeners: [
                {
                  event: "click",
                  func: function (elm) {
                    try {
                      if (typeof deps.onSetCurrentSprite === "function") {
                        deps.onSetCurrentSprite(i);
                      }
                    } catch (e) {
                      window.alert("Error selecting sprite: " + e.message);
                    }
                  },
                },
              ],
            },
            {
              element: "button",
              className: "greyButtonStyle",
              textContent: "Delete",
              style: {
                fontSize: "15px",
                marginRight: "5px",
              },
              eventListeners: [
                {
                  event: "click",
                  func: function (elm) {
                    if (deps.engine.sprites.length > 1) {
                      var newIndex = state.currentSelectedSpriteIndex;
                      deps.engine.deleteSprite(spr);
                      if (
                        state.currentSelectedSpriteIndex >
                        deps.engine.sprites.length - 1
                      ) {
                        newIndex = deps.engine.sprites.length - 1;
                      }
                      if (typeof deps.onSetCurrentSprite === "function") {
                        deps.onSetCurrentSprite(newIndex, true);
                      }
                      updateSpritesContainer();
                      deps.markProjectDirty();
                    }
                  },
                },
              ],
            },
            {
              element: "button",
              className: "greyButtonStyle",
              textContent: "Duplicate",
              style: {
                fontSize: "15px",
                marginRight: "5px",
              },
              eventListeners: [
                {
                  event: "click",
                  func: function (elm) {
                    deps.workspace.saveCurrentSpriteCode();
                    var newSprite = deps.engine.duplicateSprite(spr);
                    if (spr && spr.blocklyXML) {
                      try {
                        newSprite.blocklyXML = Blockly.Xml.textToDom(
                          Blockly.Xml.domToText(spr.blocklyXML),
                        );
                      } catch (e) {
                        console.warn("Failed to copy blockly XML:", e);
                      }
                    }
                    deps.compile.compileSpriteXML(newSprite);
                    deps.engine.makeUniqueSpriteNames();
                    try {
                      var newIndex = deps.engine.sprites.indexOf(newSprite);
                      if (newIndex !== -1) {
                        if (typeof deps.onSetCurrentSprite === "function") {
                          deps.onSetCurrentSprite(newIndex, true);
                        }
                      } else {
                        updateSpritesContainer();
                      }
                    } catch (e) {
                      updateSpritesContainer();
                    }

                    deps.markProjectDirty();
                  },
                },
              ],
            },

            {
              element: "button",
              className: "greyButtonStyle",
              textContent: "Export",
              style: {
                fontSize: "15px",
                marginRight: "5px",
              },
              eventListeners: [
                {
                  event: "click",
                  func: async function (elm) {
                    deps.exportSprite(spr);
                  },
                },
              ],
            },
          ],
        };
      }),
    );
  }

  spriteNameInput.addEventListener("input", () => {
    if (!state.currentSelectedSprite) return;
    state.currentSelectedSprite.name = spriteNameInput.value;
    deps.engine.makeUniqueSpriteNames();
    updateSpritesContainer();
    deps.markProjectDirty();
  });
  spriteXPosInput.addEventListener("input", () => {
    if (!state.currentSelectedSprite) return;
    state.currentSelectedSprite.x = +spriteXPosInput.value || 0;
    deps.markProjectDirty();
  });
  spriteYPosInput.addEventListener("input", () => {
    if (!state.currentSelectedSprite) return;
    state.currentSelectedSprite.y = +spriteYPosInput.value || 0;
    deps.markProjectDirty();
  });
  spriteDirectionInput.addEventListener("input", () => {
    if (!state.currentSelectedSprite) return;
    state.currentSelectedSprite.direction = +spriteDirectionInput.value || 0;
    deps.markProjectDirty();
  });
  spriteSizeInput.addEventListener("input", () => {
    if (!state.currentSelectedSprite) return;
    state.currentSelectedSprite.size = +spriteSizeInput.value || 0;
    deps.markProjectDirty();
  });
  spriteHiddenInput.addEventListener("input", () => {
    if (!state.currentSelectedSprite) return;
    state.currentSelectedSprite.hidden = spriteHiddenInput.checked;
    deps.markProjectDirty();
  });

  setInterval(() => {
    if (state.currentSelectedSprite) {
      if (spriteNameInput.value !== state.currentSelectedSprite.name) {
        spriteNameInput.value = state.currentSelectedSprite.name;
      }
      if (
        Math.round(+spriteXPosInput.value) !==
        Math.round(state.currentSelectedSprite.x) ||
        spriteXPosInput.value.length < 1
      ) {
        spriteXPosInput.value = Math.round(state.currentSelectedSprite.x);
      }
      if (
        Math.round(+spriteYPosInput.value) !==
        Math.round(state.currentSelectedSprite.y) ||
        spriteYPosInput.value.length < 1
      ) {
        spriteYPosInput.value = Math.round(state.currentSelectedSprite.y);
      }
      if (
        Math.round(+spriteDirectionInput.value) !==
        Math.round(state.currentSelectedSprite.direction) ||
        spriteDirectionInput.value.length < 1
      ) {
        spriteDirectionInput.value = Math.round(
          state.currentSelectedSprite.direction,
        );
      }
      if (
        Math.round(+spriteSizeInput.value) !==
        Math.round(state.currentSelectedSprite.size) ||
        spriteSizeInput.value.length < 1
      ) {
        spriteSizeInput.value = Math.round(state.currentSelectedSprite.size);
      }
      if (spriteHiddenInput.checked !== state.currentSelectedSprite.hidden) {
        spriteHiddenInput.checked = state.currentSelectedSprite.hidden;
      }
    }
  }, 1000 / 30);

  // Make sprites sortable
  deps.makeSortable(
    spritesContainer,
    ".spriteContainer",
    (oldIndex, newIndex) => {
      if (oldIndex === newIndex) return;
      var spriteToMove = deps.engine.sprites[oldIndex];
      deps.engine.sprites.splice(oldIndex, 1);
      deps.engine.sprites.splice(newIndex, 0, spriteToMove);
      if (state.currentSelectedSprite) {
        state.currentSelectedSpriteIndex = deps.engine.sprites.indexOf(
          state.currentSelectedSprite,
        );
      }
      deps.engine.makeUniqueSpriteNames();
      updateSpritesContainer();
      deps.markProjectDirty();
    },
  );

  return {
    updateSpritesContainer,
    getErrorLogDiv,
    errorLogsContainerRef: errorLogsContainer,
  };
}

module.exports = { init };


/***/ }),

/***/ 5808:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var engine = __webpack_require__(9940);

async function loadDefaultProject() {
  var logo = (__webpack_require__(3043)/* ["default"] */ .A);
  engine.emptyProject();

  var sprite = engine.createEmptySprite();
  var costume = sprite.addCostume(logo);
  sprite.size = 40;
}

module.exports = {
  loadDefaultProject,
};


/***/ }),

/***/ 5827:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var { GGM3Engine } = __webpack_require__(7677);

module.exports = GGM3Engine;


/***/ }),

/***/ 5873:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var AudioEngine = __webpack_require__(6733);

function getIdentifier(sound) {
  return sound.getSoundIdentifier();
}

class SoundManager {
  constructor(engine, sprite) {
    this.engine = engine;
    this.sprite = sprite;

    this.playingSounds = {};
  }

  _applyEffects(sound) {
    var player = this.playingSounds[getIdentifier(sound)];
    if (!player) {
      return; //Sound isn't playing, no need to apply effects.
    }
    player.playbackRate = sound.effects.playbackRate;
    player.volume = sound.effects.volume / 100;
  }

  stopSound(sound) {
    if (!sound) {
      return; //No sound to play, do nothing.
    }
    var player = this.playingSounds[getIdentifier(sound)];
    if (!player) {
      return; //Sound isn't playing, no need to stop.
    }
    player.pause();
    player.dispose();
    delete this.playingSounds[getIdentifier(sound)];
  }

  startSound(sound) {
    if (!sound) {
      return; //No sound to play, do nothing.
    }
    this.stopSound(sound); //The sound will be stopped even if its not loaded.
    if (!sound.data) {
      return; //Sound isn't loaded, don't play.
    }
    var player = new AudioEngine.Player(sound.data);
    player._soundName = sound.name;
    player._soundIdentifier = getIdentifier(sound);
    player._fromSprite = this.sprite;
    player._isWait = false;
    player._sound = sound;
    player.play();
    this.playingSounds[getIdentifier(sound)] = player;
    this._applyEffects(sound);
  }

  playSoundUntilDone(sound) {
    if (!sound) {
      return new Promise((resolve) => {
        resolve();
      });
    }
    this.stopSound(sound); //The sound will be stopped even if its not loaded.
    if (!sound.data) {
      return new Promise((resolve) => {
        resolve();
      });
    }
    var player = new AudioEngine.Player(sound.data);
    player._soundName = sound.name;
    player._soundIdentifier = getIdentifier(sound);
    player._fromSprite = this.sprite;
    player._isWait = true;
    player._sound = sound;
    player.play();
    this.playingSounds[getIdentifier(sound)] = player;
    this._applyEffects(sound);

    return new Promise((resolve) => {
      player.onended = () => resolve();
    });
  }

  setEffect(sound, effectName, effectValue) {
    if (!sound) {
      return;
    }
    var effects = sound.effects;
    if (typeof effects[effectName] !== "undefined") {
      effects[effectName] = effectValue;
    }
    this._applyEffects(sound);
  }

  changeEffect(sound, effectName, effectValue) {
    if (!sound) {
      return;
    }
    var effects = sound.effects;
    if (typeof effects[effectName] !== "undefined") {
      var previousValue = +effects[effectName] || 0;
      effects[effectName] = (+previousValue || 0) + (+effectValue || 0);
    }
    this._applyEffects(sound);
  }

  getEffect(sound, effectName, effectValue) {
    if (!sound) {
      return;
    }
    var effects = sound.effects;
    if (typeof effects[effectName] !== "undefined") {
      return effects[effectName];
    }
    return 0;
  }

  stopAllWaitingSounds() {
    for (var key of Object.keys(this.playingSounds)) {
      var player = this.playingSounds[key];
      if (player._isWait) {
        this.stopSound(player._sound);
      }
    }
  }

  stopAllSounds() {
    for (var key of Object.keys(this.playingSounds)) {
      var player = this.playingSounds[key];
      this.stopSound(player._sound);
    }
  }

  dispose() {
    this.stopAllSounds();
    this.playingSounds = null;
    this.engine = null;
    this.sprite = null;
  }
}

module.exports = SoundManager;


/***/ }),

/***/ 5890:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var JavascriptTranslation = {};
var utilFunctions = __webpack_require__(9547);
var starterBlocks = __webpack_require__(8355);
var outputBlocks = __webpack_require__(7147);

JavascriptTranslation["control_wait"] = function (jsonblock, utils, options) {
  // Fallback to "0" to prevent "waitSeconds()" with no args or undefined
  var DURATION = utils.getInput(jsonblock, "DURATION", options, "0");

  return `${utilFunctions.aliveCheck(jsonblock)}await thread.waitSeconds(${DURATION});${utilFunctions.aliveCheck(jsonblock)}`;
};

JavascriptTranslation["control_forever"] = function (
  jsonblock,
  utils,
  options,
) {
  // Fallback to empty string "" so we don't write "undefined" inside the loop
  var SUBSTACK = utils.getInput(jsonblock, "SUBSTACK", options, "");

  return `${utilFunctions.aliveCheck(jsonblock)}while (true) {${utilFunctions.aliveCheck(jsonblock)}${SUBSTACK}if (thread.screenRefresh) {await thread.waitForNextFrame();};${utilFunctions.aliveCheck(jsonblock)}}${utilFunctions.aliveCheck(jsonblock)}`;
};

JavascriptTranslation["control_repeat"] = function (jsonblock, utils, options) {
  var TIMES = utils.getInput(jsonblock, "TIMES", options, "0");
  var SUBSTACK = utils.getInput(jsonblock, "SUBSTACK", options, "");

  return `${utilFunctions.aliveCheck(jsonblock)}await thread.repeatTimes(${TIMES},async function (){${SUBSTACK}});${utilFunctions.aliveCheck(jsonblock)}`;
};

JavascriptTranslation["control_repeat_until"] = function (
  jsonblock,
  utils,
  options,
) {
  // Fallback to "false". "while(!(false))" is valid syntax (infinite loop).
  // "while(!())" is a syntax crash.
  var CONDITION = utils.getInput(jsonblock, "CONDITION", options, "false");
  var SUBSTACK = utils.getInput(jsonblock, "SUBSTACK", options, "");

  return `${utilFunctions.aliveCheck(jsonblock)}while (!(${CONDITION})) {${utilFunctions.aliveCheck(jsonblock)}${utilFunctions.aliveCheck(jsonblock)} ${SUBSTACK} if (thread.screenRefresh) {await thread.waitForNextFrame();}}${utilFunctions.aliveCheck(jsonblock)}`;
};

JavascriptTranslation["control_while"] = function (jsonblock, utils, options) {
  var CONDITION = utils.getInput(jsonblock, "CONDITION", options, "false");
  var SUBSTACK = utils.getInput(jsonblock, "SUBSTACK", options, "");

  return `${utilFunctions.aliveCheck(jsonblock)}while (${CONDITION}) {${utilFunctions.aliveCheck(jsonblock)} ${utilFunctions.aliveCheck(jsonblock)} ${SUBSTACK} if (thread.screenRefresh) {await thread.waitForNextFrame();}}${utilFunctions.aliveCheck(jsonblock)}`;
};

JavascriptTranslation["control_if"] = function (jsonblock, utils, options) {
  var CONDITION = utils.getInput(jsonblock, "CONDITION", options, "false");
  var SUBSTACK = utils.getInput(jsonblock, "SUBSTACK", options, "");

  return `if (${CONDITION}) {${SUBSTACK}}`;
};

JavascriptTranslation["control_if_else"] = function (
  jsonblock,
  utils,
  options,
) {
  var CONDITION = utils.getInput(jsonblock, "CONDITION", options, "false");
  var SUBSTACK = utils.getInput(jsonblock, "SUBSTACK", options, "");
  var SUBSTACK2 = utils.getInput(jsonblock, "SUBSTACK2", options, "");

  return `if (${CONDITION}) {${SUBSTACK}} else {${SUBSTACK2}}`;
};

JavascriptTranslation["control_wait_until"] = function (
  jsonblock,
  utils,
  options,
) {
  var CONDITION = utils.getInput(jsonblock, "CONDITION", options, "false");

  return `${utilFunctions.aliveCheck(jsonblock)}while (!(${CONDITION})) {${utilFunctions.aliveCheck(jsonblock)}await thread.waitForNextFrame();}${utilFunctions.aliveCheck(jsonblock)}`;
};

starterBlocks.push("control_start_as_clone");
JavascriptTranslation["control_start_as_clone"] = function (
  jsonblock,
  utils,
  options,
) {
  return function (insideCode) {
    if (options.EXECUTE_BLOCKS) {
      return `${insideCode}`;
    } else {
      return `sprite.addStackListener(
        "clonestart",
        ${JSON.stringify(jsonblock.id)},
        async function () {
        ${utilFunctions.startThreadStack(jsonblock)}
        ${insideCode}
        ${utilFunctions.endThreadStack(jsonblock)}
      });`;
    }
  };
};

starterBlocks.push("control_create_clone_of_menu");
JavascriptTranslation["control_create_clone_of_menu"] = function (
  jsonblock,
  utils,
  options,
) {
  var CLONE_OPTION = utils.getField(jsonblock, "CLONE_OPTION", options);
  return JSON.stringify(CLONE_OPTION);
};

JavascriptTranslation["control_create_clone_of"] = function (
  jsonblock,
  utils,
  options,
) {
  // Fallback to null string. "findSpriteByName()" with empty args might be valid or fail gracefully,
  // but "findSpriteByName( )" (empty space) is syntax error if generated poorly.
  // We use '"_myself_"' or 'null' to be safe.
  var CLONE_OPTION = utils.getInput(
    jsonblock,
    "CLONE_OPTION",
    options,
    '"_myself_"',
  );

  return `sprite.findSpriteByName(${CLONE_OPTION})?.createClone();`;
  // Added optional chaining (?.) just in case sprite is not found, to prevent crash.
};

JavascriptTranslation["control_delete_this_clone"] = function (
  jsonblock,
  utils,
  options,
) {
  //Update: Moving this to a thread function and also adding an alive check to prevent potential crashes
  // with spamming broadcasts that create clones and immediately delete themselves, which can cause
  // the engine to try to do things with clones that have already been deleted.
  return `thread.deleteClone();${utilFunctions.aliveCheck(jsonblock)}`;
};

outputBlocks.push("control_elapsed");
JavascriptTranslation["control_elapsed"] = function (
  jsonblock,
  utils,
  options,
) {
  return `(engine.elapsedFrameTime / 1000)`;
};

outputBlocks.push("control_isclone");
JavascriptTranslation["control_isclone"] = function (
  jsonblock,
  utils,
  options,
) {
  return `sprite.isClone`;
};

JavascriptTranslation["control_stop"] = function (jsonblock, utils, options) {
  var STOP_OPTION = utils.getField(jsonblock, "STOP_OPTION", options);

  if (STOP_OPTION == "this script") {
    return `thread.stop();${utilFunctions.aliveCheck(jsonblock)}`;
  }
  if (STOP_OPTION == "other scripts in sprite") {
    return `thread.stopEverythingButMe();${utilFunctions.aliveCheck(jsonblock)}`;
  }
  // Safe return if option is somehow missing
  return "";
};

module.exports = JavascriptTranslation;


/***/ }),

/***/ 5939:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var selectedSprite = __webpack_require__(3010);
var dialogs = __webpack_require__(269);
addEventListener("beforeunload", (event) => {
    if (selectedSprite.isProjectDirty()) {
        event.preventDefault();
        return false;
    }
});


/***/ }),

/***/ 5975:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var JavascriptTranslation = {};
var utilFunctions = __webpack_require__(9547);
var outputBlocks = __webpack_require__(7147);

outputBlocks.push("sound_sounds_menu");
JavascriptTranslation["sound_sounds_menu"] = function (
  jsonblock,
  utils,
  options,
) {
  var SOUND_MENU = utils.getField(jsonblock, "SOUND_MENU", options);
  return JSON.stringify(SOUND_MENU);
};

JavascriptTranslation["sound_play"] = function (jsonblock, utils, options) {
  var SOUND_MENU = utils.getInput(jsonblock, "SOUND_MENU", options, "0");
  return `sprite.playSound(${SOUND_MENU});`;
};

JavascriptTranslation["sound_playuntildone"] = function (
  jsonblock,
  utils,
  options,
) {
  var SOUND_MENU = utils.getInput(jsonblock, "SOUND_MENU", options, "0");
  return `await sprite.playSoundUntilDone(${SOUND_MENU});${utilFunctions.aliveCheck(jsonblock)}`;
};

JavascriptTranslation["sound_stopsound"] = function (
  jsonblock,
  utils,
  options,
) {
  var SOUND_MENU = utils.getInput(jsonblock, "SOUND_MENU", options, "0");
  return `sprite.stopSound(${SOUND_MENU});`;
};

JavascriptTranslation["sound_stopallsounds"] = function (
  jsonblock,
  utils,
  options,
) {
  return `engine.stopAllSounds();`;
};

JavascriptTranslation["sound_stopallsoundsinsprite"] = function (
  jsonblock,
  utils,
  options,
) {
  return `sprite.stopAllSounds();`;
};

JavascriptTranslation["sound_ggm3effect_set"] = function (
  jsonblock,
  utils,
  options,
) {
  var SOUND_MENU = utils.getInput(jsonblock, "SOUND_MENU", options, "0");
  var EFFECT = utils.getField(jsonblock, "EFFECT", options);
  var VALUE = utils.getInput(jsonblock, "VALUE", options, "0");
  return `sprite.setSoundEffect(${SOUND_MENU}, ${JSON.stringify(EFFECT)}, ${VALUE});`;
};

JavascriptTranslation["sound_ggm3effect_change"] = function (
  jsonblock,
  utils,
  options,
) {
  var SOUND_MENU = utils.getInput(jsonblock, "SOUND_MENU", options, "0");
  var EFFECT = utils.getField(jsonblock, "EFFECT", options);
  var BY = utils.getInput(jsonblock, "BY", options, "0");
  return `sprite.changeSoundEffect(${SOUND_MENU}, ${JSON.stringify(EFFECT)}, ${BY});`;
};

outputBlocks.push("sound_ggm3effect_get");
JavascriptTranslation["sound_ggm3effect_get"] = function (
  jsonblock,
  utils,
  options,
) {
  var SOUND_MENU = utils.getInput(jsonblock, "SOUND_MENU", options, "0");
  var EFFECT = utils.getField(jsonblock, "EFFECT", options);
  return `sprite.getSoundEffect(${SOUND_MENU}, ${JSON.stringify(EFFECT)});`;
};

module.exports = JavascriptTranslation;


/***/ }),

/***/ 6065:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var twgl = __webpack_require__(4391);

class Drawable {
  static getImageCanvas(img, scale = 1) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas;
  }
  constructor(engine, canvas, id) {
    this.engine = engine;
    this.gl = engine && engine.gl ? engine.gl : null;
    this.isOutdated = true;
    this.texture = null;
    this.canvas = canvas || document.createElement("canvas");
    this.disposed = false;

    // Create initial texture only if GL is available and canvas has size
    try {
      this.update();
    } catch (e) {
      // swallow errors during construction; update will be retried later
      console.warn("Drawable: initial update failed", e);
    }
  }
  markAsOutdated() {
    this.isOutdated = true;
  }
  update() {
    if (!this.isOutdated) return;

    // Ensure GL and canvas are available
    if (!this.gl) {
      // Try to recover the GL reference from engine
      if (this.engine && this.engine.gl) this.gl = this.engine.gl;
      if (!this.gl) return;
    }

    if (!this.canvas || this.canvas.width === 0 || this.canvas.height === 0) {
      // Nothing to upload
      this.isOutdated = false;
      return;
    }

    if (this.texture) {
      try {
        this.gl.deleteTexture(this.texture);
      } catch (e) {
        // ignore GL errors
      }
      this.texture = null;
    }

    try {
      this.texture = twgl.createTexture(this.gl, {
        src: this.canvas,
        mag: this.gl ? this.gl.NEAREST : undefined,
        min: this.gl ? this.gl.NEAREST : undefined,
        wrap: this.gl ? this.gl.CLAMP_TO_EDGE : undefined,
      });
    } catch (e) {
      console.warn("Drawable: failed to create texture", e);
      this.texture = null;
    }

    this.isOutdated = false;
  }
  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    try {
      if (this.texture && this.gl) {
        try {
          this.gl.deleteTexture(this.texture);
        } catch (e) {}
      }
    } finally {
      this.texture = null;
      this.canvas = null;
      this.gl = null;
      this.engine = null;
    }
  }
}

module.exports = Drawable;


/***/ }),

/***/ 6129:
/***/ ((module) => {

class BlockInstance {
  constructor(target, block) {
    this.targetId = target.id;
    this.id = block.id;
  }
}

module.exports = BlockInstance;


/***/ }),

/***/ 6156:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var JavascriptTranslation = {};
var utilFunctions = __webpack_require__(9547);
var starterBlocks = __webpack_require__(8355);
var outputBlocks = __webpack_require__(7147);

starterBlocks.push("procedures_definition");
JavascriptTranslation["procedures_definition"] = function (
  jsonblock,
  utils,
  options,
) {
  var definitionStuff = utils.getInputBlock(jsonblock, "custom_block", options);
  if (!definitionStuff) {
    return function (insideCode) {
      return "";
    };
  }
  var valueNameCode = "";
  definitionStuff.argumentIds.forEach((argId, i) => {
    var name = definitionStuff.displayNames[i];
    valueNameCode += `thread.customBlockValues[${JSON.stringify(name)}] = customBlockArgs[${JSON.stringify(argId)}];`;
  });

  return function (insideCode) {
    if (options.EXECUTE_BLOCKS) {
      //Means ONLY execute blocks, don't add listeners to the sprite.
      return `${insideCode}`;
    } else {
      return `sprite.addCustom(
        ${JSON.stringify(jsonblock.id)},
        ${JSON.stringify(definitionStuff.procCode)},
        async function (customBlockArgs,parentThread) {
        ${utilFunctions.startThreadStack(jsonblock)}
        thread.customBlockInherit(parentThread);
        ${definitionStuff.warp ? `thread.turnOnWithoutRefresh();` : ""}
        ${valueNameCode}
        ${insideCode}
        ${utilFunctions.endThreadStack(jsonblock)}
      });`;
    }
  };
};

JavascriptTranslation["procedures_call"] = function (
  jsonblock,
  utils,
  options,
) {
  var valueCode = "{";
  var i = 0;
  for (var argId of jsonblock.argumentIds) {
    var code = utils.getInput(jsonblock, argId, options, "undefined");
    if (code) {
      valueCode += JSON.stringify(argId);
      valueCode += ":";
      valueCode += `(${code})`;
      valueCode += ",";
    }
    i += 1;
  }
  valueCode += "}";

  return `await sprite.callCustom(${JSON.stringify(jsonblock.procCode)}, ${valueCode}, thread);`;
};

outputBlocks.push("argument_reporter_boolean");
JavascriptTranslation["argument_reporter_boolean"] = function (
  jsonblock,
  utils,
  options,
) {
  var field = utils.getField(jsonblock, "VALUE", options);
  return `thread.customBlockValues[${JSON.stringify(field)}]`;
};

outputBlocks.push("argument_reporter_string_number");
JavascriptTranslation["argument_reporter_string_number"] = function (
  jsonblock,
  utils,
  options,
) {
  var field = utils.getField(jsonblock, "VALUE", options);
  return `thread.customBlockValues[${JSON.stringify(field)}]`;
};

module.exports = JavascriptTranslation;


/***/ }),

/***/ 6185:
/***/ ((module) => {

function getSaveableVariables(variables) {
  var saveableVars = {};
  for (var varName in variables) {
    var variable = variables[varName];
    try {
      saveableVars[varName] = JSON.parse(JSON.stringify(variable.value));
    } catch (e) {
      saveableVars[varName] = 0;
    }
  }
  return saveableVars;
}

function getSaveableVariablesGlobal(variables) {
  var saveableVars = {};
  for (var varName in variables) {
    var variable = variables[varName];
    try {
      saveableVars[varName] = JSON.parse(JSON.stringify(variable));
    } catch (e) {
      saveableVars[varName] = 0;
    }
  }
  return saveableVars;
}

module.exports = {
  getSaveableVariables,
  getSaveableVariablesGlobal,
};


/***/ }),

/***/ 6280:
/***/ ((module) => {

function init(state, deps) {
  var workspace = null;
  var disposingWorkspace = false;
  var workspaceLoadToken = 0;
  var pendingCompileAllTimeout = null;

  function saveScroll() {
    if (!workspace) return;
    var spr = state.currentSelectedSprite;
    var flyoutWorkspace = workspace.getFlyout().getWorkspace();
    spr._flyout_scrollX = flyoutWorkspace.scrollX;
    spr._flyout_scrollY = flyoutWorkspace.scrollY;
    spr._flyout_scale = flyoutWorkspace.scale;

    spr._editor_scrollX = workspace.scrollX;
    spr._editor_scrollY = workspace.scrollY;
    spr._editor_scale = workspace.scale;
  }

  function scrollToPrevious() {
    if (!workspace) return;
    var spr = state.currentSelectedSprite;
    if (typeof spr._editor_scrollX == "number") {
      Blockly.svgResize(workspace);
      workspace.scrollX = spr._editor_scrollX;
      workspace.scrollY = spr._editor_scrollY;
      workspace.scale = spr._editor_scale;

      var flyoutWorkspace = workspace.getFlyout().getWorkspace();
      flyoutWorkspace.scrollX = spr._flyout_scrollX || 0;
      flyoutWorkspace.scrollY = spr._flyout_scrollY || 0;
      flyoutWorkspace.scale = spr._flyout_scale || 0;
      flyoutWorkspace.resize();

      workspace.resize();
      Blockly.svgResize(workspace);
    }
  }

  function handleSpriteErrorLog(spr) {
    deps.ui.errorLogsContainerRef.innerHTML = "";
    var willScroll = false;
    if (
      deps.ui.errorLogsContainerRef.scrollTop +
        deps.ui.errorLogsContainerRef.offsetHeight +
        2 >=
      deps.ui.errorLogsContainerRef.scrollHeight
    ) {
      willScroll = true;
    }
    for (var error of spr.errorLogs) {
      var logDiv = deps.ui.getErrorLogDiv(error);
      deps.ui.errorLogsContainerRef.appendChild(logDiv);
    }
    if (willScroll) {
      deps.ui.errorLogsContainerRef.scrollTo(
        0,
        deps.ui.errorLogsContainerRef.scrollHeight,
      );
    }

    spr.onErrorLog = function (error) {
      var willScroll = false;
      if (
        deps.ui.errorLogsContainerRef.scrollTop +
          deps.ui.errorLogsContainerRef.offsetHeight +
          2 >=
        deps.ui.errorLogsContainerRef.scrollHeight
      ) {
        willScroll = true;
      }
      var logDiv = deps.ui.getErrorLogDiv(error);
      deps.ui.errorLogsContainerRef.appendChild(logDiv);
      if (willScroll) {
        deps.ui.errorLogsContainerRef.scrollTo(
          0,
          deps.ui.errorLogsContainerRef.scrollHeight,
        );
      }
    };
  }

  function loadCode(spr) {
    if (!spr) return;
    workspaceLoadToken += 1;
    var thisLoadToken = workspaceLoadToken;
    if (pendingCompileAllTimeout) {
      clearTimeout(pendingCompileAllTimeout);
      pendingCompileAllTimeout = null;
    }
    deps.loadBlockMenus(spr);
    disposingWorkspace = true;
    Blockly.Events.disable();
    deps.blocks.createFreshWorkspace(spr);
    workspace = deps.blocks.getCurrentWorkspace();
    if (spr.blocklyXML) {
      Blockly.Xml.domToWorkspace(spr.blocklyXML, workspace);
    }
    var currentBlocks = {};
    var currentBlockParentIDs = {};

    async function compileRoot(rootBlock) {
      if (!rootBlock) return;
      if (deps.compiler.isStarterBlock(rootBlock)) {
        try {
          var code = deps.compiler.compileBlock(rootBlock);
          var allSprs = [spr].concat(spr.clones);
          for (var cspr of allSprs) {
            // Clear existing listeners/custom refs for this root before re-registering.
            cspr.removeStackListener(rootBlock.id);
            cspr.removeSpriteFunction(rootBlock.id);
            cspr.addFunction(code, rootBlock.id);
            cspr.runFunctionID(rootBlock.id);
          }
        } catch (e) {
          workspace.reportValue(rootBlock.id, "Unable to compile: " + e);
          console.error(`Unable to compile block `, e);
          return;
        }
      }
    }

    function compileAll() {
      var blocks = workspace.getTopBlocks(true);
      for (var block of blocks) {
        compileRoot(block.getRootBlock());
      }
    }

    function requestCompileAll() {
      if (pendingCompileAllTimeout) {
        clearTimeout(pendingCompileAllTimeout);
      }
      pendingCompileAllTimeout = setTimeout(function () {
        pendingCompileAllTimeout = null;
        if (thisLoadToken !== workspaceLoadToken) return;
        if (disposingWorkspace || !workspace) return;
        if (state.currentSelectedSprite !== spr) return;
        if (
          deps.blocks.getCurrentWorkspace &&
          deps.blocks.getCurrentWorkspace() !== workspace
        )
          return;
        compileAll();
      }, 0);
    }

    function unglowErrorOnBlock(blockId) {
      try {
        var changedBlock = workspace.getBlockById(blockId);
        if (changedBlock && changedBlock.getSvgRoot) {
          var changedSvg = changedBlock.getSvgRoot();
          if (changedSvg && changedSvg.classList)
            changedSvg.classList.remove("error-glow");
          try {
            var errFilterId2 =
              workspace.options && workspace.options.errorGlowFilterId;
            if (
              errFilterId2 &&
              changedSvg &&
              changedSvg.getAttribute &&
              changedSvg.getAttribute("filter") === "url(#" + errFilterId2 + ")"
            ) {
              changedSvg.removeAttribute("filter");
            }
          } catch (innerErr) {}
        }
      } catch (err) {}
    }

    workspace.addChangeListener(function (e) {
      deps.markProjectDirty();
      if (thisLoadToken !== workspaceLoadToken) return;
      if (state.currentSelectedSprite !== spr) return;
      if (
        !workspace ||
        (deps.blocks.getCurrentWorkspace &&
          deps.blocks.getCurrentWorkspace() !== workspace)
      )
        return;
      if (disposingWorkspace) return;
      spr.editorScanVariables(workspace);

      if (e.element == "click") {
        var clickedBlock = workspace.getBlockById(e.blockId);
        if (!clickedBlock) return;
        if (clickedBlock && clickedBlock.getSvgRoot) {
          try {
            var svg = clickedBlock.getSvgRoot();
            if (svg && svg.classList) svg.classList.remove("error-glow");
            try {
              var errFilterId =
                workspace.options && workspace.options.errorGlowFilterId;
              if (
                errFilterId &&
                svg &&
                svg.getAttribute &&
                svg.getAttribute("filter") === "url(#" + errFilterId + ")"
              ) {
                svg.removeAttribute("filter");
              }
            } catch (inner) {}
          } catch (err) {}
        }
        var root = clickedBlock.getRootBlock();
        if (!spr.runningStacks[root.id]) {
          (async function () {
            var code = deps.compiler.compileBlockWithThreadForced(root);
            var outputThread = await spr.runFunction(code);
            if (outputThread) {
              if (
                deps.compiler.isOutputBlock(root) ||
                typeof outputThread.output !== "undefined"
              ) {
                workspace.reportValue(
                  e.blockId,
                  deps.valueReport(outputThread.output),
                );
              }
            }
          })();
        } else {
          spr.runningStacks[root.id].stop();
        }
      } else if (e.blockId && e.element !== "stackclick") {
        var eventBlock = workspace.getBlockById(e.blockId);

        if (!eventBlock) {
          if (currentBlocks[e.blockId]) {
            var thread = spr.runningStacks[e.blockId];
            if (thread) thread.stop();
          }
          spr.removeSpriteFunction(e.blockId);
          spr.removeStackListener(e.blockId);
          delete currentBlocks[e.blockId];

          if (e.oldParentId) {
            var oldParentBlock = workspace.getBlockById(e.oldParentId);
            if (oldParentBlock) {
              unglowErrorOnBlock(oldParentBlock.getRootBlock().id);
              requestCompileAll();
            }
          }
        } else {
          currentBlocks[e.blockId] = true;
          var newRoot = eventBlock.getRootBlock();
          requestCompileAll();

          if (
            (e instanceof Blockly.Events.Move || e.type == "move") &&
            e.oldParentId
          ) {
            var oldParentBlock = workspace.getBlockById(e.oldParentId);
            if (oldParentBlock) {
              var oldRoot = oldParentBlock.getRootBlock();
              if (oldRoot.id !== newRoot.id) {
                unglowErrorOnBlock(oldRoot.id);
                requestCompileAll();
              }
            }
          }

          if (e.blockId) {
            unglowErrorOnBlock(e.blockId);
          }
        }
      }
    });

    var flyoutWorkspace = workspace.getFlyout().getWorkspace();
    flyoutWorkspace.addChangeListener(function (e) {
      if (thisLoadToken !== workspaceLoadToken) return;
      if (state.currentSelectedSprite !== spr) return;
      if (
        !workspace ||
        (deps.blocks.getCurrentWorkspace &&
          deps.blocks.getCurrentWorkspace() !== workspace)
      )
        return;
      spr.editorScanVariables(workspace);
      if (e.element == "click") {
        var clickedBlock = workspace.getBlockById(e.blockId);
        if (!clickedBlock) return;
        var root = clickedBlock.getRootBlock();
        if (!spr.runningStacks[root.id]) {
          (async function () {
            var code = deps.compiler.compileBlockWithThreadForced(root);
            var outputThread = await spr.runFunction(code);
            if (outputThread) {
              if (
                deps.compiler.isOutputBlock(root) ||
                typeof outputThread.output !== "undefined"
              ) {
                workspace.reportValue(
                  e.blockId,
                  deps.valueReport(outputThread.output),
                );
              }
            }
          })();
        } else {
          spr.runningStacks[root.id].stop();
        }
      }
    });

    for (var id of Object.keys(spr.runningStacks)) {
      if (workspace.getBlockById(id)) {
        workspace.glowStack(id, true);
      }
    }
    var endTimeouts = {};
    spr.threadStartListener = function (id) {
      if (disposingWorkspace) return;
      if (workspace.getBlockById(id)) {
        if (typeof endTimeouts[id] !== "undefined")
          clearTimeout(endTimeouts[id]);
        workspace.glowStack(id, true);
      }
    };
    spr.threadEndListener = function (id, isPreviewMode) {
      if (disposingWorkspace) return;
      if (workspace.getBlockById(id)) {
        if (typeof endTimeouts[id] !== "undefined")
          clearTimeout(endTimeouts[id]);
        endTimeouts[id] = setTimeout(() => {
          delete endTimeouts[id];
          if (workspace.getBlockById(id)) {
            workspace.glowStack(id, false);
            try {
              var b = workspace.getBlockById(id);
              if (b && b.getSvgRoot) {
                var svg = b.getSvgRoot();
                if (svg && svg.classList) svg.classList.remove("error-glow");
                try {
                  var errFilterId =
                    workspace.options && workspace.options.errorGlowFilterId;
                  if (
                    errFilterId &&
                    svg &&
                    svg.getAttribute &&
                    svg.getAttribute("filter") === "url(#" + errFilterId + ")"
                  ) {
                    svg.removeAttribute("filter");
                  }
                } catch (inner) {}
              }
            } catch (e) {}
          }
        }, 1000 / 30);
      }
    };

    spr.threadErrorListener = function (id, output) {
      if (disposingWorkspace) return;
      if (workspace.getBlockById(id)) {
        if (typeof endTimeouts[id] !== "undefined")
          clearTimeout(endTimeouts[id]);
        workspace.glowStack(id, true);
        try {
          var b = workspace.getBlockById(id);
          if (b && b.getSvgRoot) {
            var svg = b.getSvgRoot();
            if (svg && svg.classList) svg.classList.add("error-glow");
            try {
              var errFilterId =
                workspace.options && workspace.options.errorGlowFilterId;
              if (errFilterId && svg && svg.setAttribute) {
                svg.setAttribute("filter", "url(#" + errFilterId + ")");
              }
            } catch (inner) {}
          }
        } catch (e) {
          console.warn("Failed to add error-glow filter/class", e);
        }
      }
    };

    setTimeout(function () {
      Blockly.svgResize(workspace);
    }, 0);

    scrollToPrevious();

    disposingWorkspace = false;
    Blockly.Events.enable();
    workspace.getToolbox().refreshSelection();
    return { scrollToPrevious };
  }

  function saveCurrentSpriteCode() {
    if (state.currentSelectedSprite && workspace) {
      try {
        state.currentSelectedSprite.blocklyXML =
          Blockly.Xml.workspaceToDom(workspace);
      } catch (e) {}
      deps.markProjectDirty();
    }
  }

  return {
    loadCode,
    saveScroll,
    scrollToPrevious,
    handleSpriteErrorLog,
    saveCurrentSpriteCode,
  };
}

module.exports = { init };


/***/ }),

/***/ 6544:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var EventEmitter = __webpack_require__(228);

function ProgressEvent(p) {
  this.max = p._max;
  this.current = p._current;
  this.finished = p._finished;
}

class ProgressMonitor extends EventEmitter {
  constructor() {
    super();
    this._max = 0;
    this._current = 0;
    this._state = "";
    this._didCalculate = false;
    this._finished = false;
  }

  calculatedMax(v) {
    if (this._finished) {
      return;
    }
    if (!this._didCalculate) {
      this._didCalculate = true;
      this._max = +v || 0;
      this.emit("progress", new ProgressEvent(this));
    }
  }

  get max() {
    return this._max;
  }

  set current(v) {
    if (this._finished) {
      return;
    }
    var value = +v || 0;
    if (value !== this._current) {
      this._current = value;
      this.emit("progress", new ProgressEvent(this));
    }
  }

  get current() {
    return this._current;
  }

  finish(...values) {
    if (this._finished) {
      return;
    }
    this._finished = true;
    this.emit("progress", new ProgressEvent(this));
    this.emit("finish", new ProgressEvent(this), ...values);
    this.removeAllListeners();
  }
}

module.exports = { ProgressMonitor };


/***/ }),

/***/ 6733:
/***/ ((module) => {

var audioEngine = {};

var AudioContext = window.AudioContext || window.webkitAudioContext; //If running under safari, uses webkitAudioContext.

var audioCTX = new AudioContext();
audioEngine.context = audioCTX;
audioEngine.running = false;

setInterval(() => {
  if (audioCTX.state === "suspended") {
    audioCTX.resume().catch(() => {});
  }
  audioEngine.running = audioCTX.state === "running";
}, 100);

function cloneAudioBuffer(fromAudioBuffer) {
  const audioBuffer = new AudioBuffer({
    length: fromAudioBuffer.length,
    numberOfChannels: fromAudioBuffer.numberOfChannels,
    sampleRate: fromAudioBuffer.sampleRate,
  });
  for (let channelI = 0; channelI < audioBuffer.numberOfChannels; ++channelI) {
    const samples = fromAudioBuffer.getChannelData(channelI);
    audioBuffer.copyToChannel(samples, channelI);
  }
  return audioBuffer;
}
audioEngine.cloneAudioBuffer = cloneAudioBuffer;

function decodeAsync(data) {
  return new Promise((resolve, reject) => {
    try {
      audioCTX.decodeAudioData(data, resolve, reject);
    } catch (e) {
      resolve(null);
    }
  });
}
audioEngine.decodeAsync = decodeAsync;
audioEngine.loadSoundFromURL = async function loadSoundURL(url) {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return await decodeAsync(buffer);
  } catch (e) {
    console.warn(e);
    return null;
  }
};

class AudioBufferPlayer {
  constructor(data) {
    this.data = data;
    this.source = null;
    this._playbackRate = 1;
    this.playbackRate = 1;
    this.looped = false;
    this.loopStart = 0;
    this.loopEnd = 0;
    this.detune = 0;
    this.startVol = 1;
    this.gainNode = null;
    this.filters = [];
  }

  setData(data) {
    this.data = data;
  }

  set looped(v) {
    if (this.source) {
      this.source.loop = v;
    }
    this._looped = v;
  }

  get looped() {
    return this._looped;
  }

  set loopStart(v) {
    if (this.source) {
      this.source.loopStart = v;
    }
    this._loopStart = v;
  }

  get loopStart() {
    return this._loopStart;
  }

  set loopEnd(v) {
    if (this.source) {
      this.source.loopEnd = v;
    }
    this._loopEnd = v;
  }

  get loopEnd() {
    return this._loopEnd;
  }

  set detune(v) {
    if (this.source) {
      this.source.detune.value = v;
    }
    this._detune = v;
  }

  get detune() {
    return this._detune;
  }

  loopAt(start, end) {
    this.loopStart = start;
    this.loopEnd = end;
  }

  stop() {
    this.pause();
  }

  play(time) {
    if (this.data) {
      if (!this.source) {
        const source = audioCTX.createBufferSource();
        this.gainNode = audioCTX.createGain();
        source.buffer = this.data;
        source.playbackRate.value = this._playbackRate;
        source.loop = this._looped;
        source.loopStart = this._loopStart;
        source.loopEnd = this._loopEnd;
        source.detune.value = this._detune;

        // Apply filters
        let currentNode = this.gainNode;
        for (const filter of this.filters) {
          currentNode.connect(filter);
          currentNode = filter;
        }
        currentNode.connect(audioCTX.destination);

        this.gainNode.gain.value = this.startVol;
        source.connect(this.gainNode);
        source.start(time);

        this.source = source;
        source.onended = () => {
          this._callOnEnded();
          this.source = null;
        };
        this._endedCalled = false;
      }
    }
  }

  _callOnEnded() {
    if (this._endedCalled) return; // prevent double firing
    this._endedCalled = true;
    if (typeof this.onended === "function") {
      this.onended();
    }
  }

  pause() {
    if (this.source) {
      this.source.stop();
      this.source = null;
      this.gainNode = null;
      this._callOnEnded();
    }
  }

  remove() {
    this.destroy();
  }

  setVolume(value) {
    if (this.gainNode) {
      this.gainNode.gain.value = value;
    }
    this.startVol = value;
  }

  get volume() {
    return this.startVol;
  }

  set volume(v) {
    if (this.gainNode) {
      this.gainNode.gain.value = v;
    }
    this.startVol = v;
  }

  getVolume() {
    return this.gainNode ? this.gainNode.gain.value : this.startVol;
  }

  setPlaybackRate(value) {
    this.playbackRate = value;
  }

  set playbackRate(v) {
    this._playbackRate = v;
    if (this.source) {
      this.source.playbackRate.value = v;
    }
  }

  get playbackRate() {
    return this._playbackRate;
  }

  addFilter(filter) {
    if (filter instanceof BiquadFilterNode || filter instanceof GainNode) {
      this.filters.push(filter);
    }
  }

  clearFilters() {
    this.filters = [];
  }

  fadeIn(duration) {
    if (this.gainNode) {
      this.gainNode.gain.setValueAtTime(0, audioCTX.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(
        this.startVol,
        audioCTX.currentTime + duration,
      );
    }
  }

  fadeOut(duration) {
    if (this.gainNode) {
      this.gainNode.gain.setValueAtTime(this.getVolume(), audioCTX.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(
        0,
        audioCTX.currentTime + duration,
      );
    }
  }

  applyEqualizer(lowGain = 0, midGain = 0, highGain = 0) {
    const lowFilter = audioCTX.createBiquadFilter();
    lowFilter.type = "lowshelf";
    lowFilter.frequency.value = 250;
    lowFilter.gain.value = lowGain;

    const midFilter = audioCTX.createBiquadFilter();
    midFilter.type = "peaking";
    midFilter.frequency.value = 1000;
    midFilter.Q.value = 1;
    midFilter.gain.value = midGain;

    const highFilter = audioCTX.createBiquadFilter();
    highFilter.type = "highshelf";
    highFilter.frequency.value = 4000;
    highFilter.gain.value = highGain;

    this.filters = [lowFilter, midFilter, highFilter];
  }

  destroy() {
    // Stop playback
    this.pause();

    // Disconnect all filters and gain node
    if (this.gainNode) {
      this.gainNode.disconnect();
      this.gainNode = null;
    }
    for (const filter of this.filters) {
      filter.disconnect();
    }
    this.filters = [];

    // Clear audio buffer reference
    this.data = null;

    // Clear event handlers
    this.onended = null;
  }

  dispose() {
    this.destroy();
  }

  onended() {
    // Gets overwritten by the user script
  }
}

audioEngine.Player = AudioBufferPlayer;
audioEngine.AudioBufferPlayer = AudioBufferPlayer;

module.exports = audioEngine;


/***/ }),

/***/ 6936:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var EasingMap = __webpack_require__(3514);

function getEasingOptions () {
    var options = [];

    for (var key of Object.keys(EasingMap)) {
        options.push([key, key]);
    }

    return options;
}

Blockly.Blocks["tween_to_xy"] = {
  init: function () {
    this.jsonInit({
      message0: "tween to x: %1 y: %2 in %3 seconds easing %4",
      args0: [
        {
          type: "input_value",
          name: "X",
        },
        {
          type: "input_value",
          name: "Y",
        },
        {
          type: "input_value",
          name: "SECONDS",
        },
        {
          type: "field_dropdown",
          name: "EASING",
          options: getEasingOptions,
        },
      ],
      colour: "#74b62e",
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["tween_to_stretch"] = {
  init: function () {
    this.jsonInit({
      message0: "tween stretch to x: %1 y: %2 in %3 seconds easing %4",
      args0: [
        {
          type: "input_value",
          name: "X",
        },
        {
          type: "input_value",
          name: "Y",
        },
        {
          type: "input_value",
          name: "SECONDS",
        },
        {
          type: "field_dropdown",
          name: "EASING",
          options: getEasingOptions,
        },
      ],
      colour: "#74b62e",
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["tween_to_size"] = {
  init: function () {
    this.jsonInit({
      message0: "tween size to %1 in %2 seconds easing %3",
      args0: [
        {
          type: "input_value",
          name: "VALUE",
        },
        {
          type: "input_value",
          name: "SECONDS",
        },
        {
          type: "field_dropdown",
          name: "EASING",
          options: getEasingOptions,
        },
      ],
      colour: "#74b62e",
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["tween_to_skew"] = {
  init: function () {
    this.jsonInit({
      message0: "tween skew to x: %1 y: %2 in %3 seconds easing %4",
      args0: [
        {
          type: "input_value",
          name: "X",
        },
        {
          type: "input_value",
          name: "Y",
        },
        {
          type: "input_value",
          name: "SECONDS",
        },
        {
          type: "field_dropdown",
          name: "EASING",
          options: getEasingOptions,
        },
      ],
      colour: "#74b62e",
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["tween_to_object"] = {
  init: function () {
    this.jsonInit({
      message0: "tween object %1 to values in object %2 in %3 seconds easing %4",
      args0: [
        {
          type: "input_value",
          name: "SOURCE",
        },
        {
          type: "input_value",
          name: "TARGET",
        },
        {
          type: "input_value",
          name: "SECONDS",
        },
        {
          type: "field_dropdown",
          name: "EASING",
          options: getEasingOptions,
        },
      ],
      colour: "#74b62e",
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["tween_to_property"] = {
  init: function () {
    this.jsonInit({
      message0: "tween my property %1 to %2 in %3 seconds easing %4",
      args0: [
        {
          type: "field_dropdown",
          name: "VARIABLE",
          options:
            Blockly.Blocks["tween_to_property"]._listProperties,
        },
        {
          type: "input_value",
          name: "TARGET",
        },
        {
          type: "input_value",
          name: "SECONDS",
        },
        {
          type: "field_dropdown",
          name: "EASING",
          options: getEasingOptions,
        },
      ],
      colour: "#74b62e",
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["tween_to_global_variable"] = {
  init: function () {
    this.jsonInit({
      message0: "tween global variable %1 to %2 in %3 seconds easing %4",
      args0: [
        {
          type: "field_dropdown",
          name: "VARIABLE",
          options: Blockly.Blocks["tween_to_global_variable"]._listGlobalVariables,
        },
        {
          type: "input_value",
          name: "TARGET",
        },
        {
          type: "input_value",
          name: "SECONDS",
        },
        {
          type: "field_dropdown",
          name: "EASING",
          options: getEasingOptions,
        },
      ],
      colour: "#74b62e",
      extensions: ["shape_statement"],
    });
  },
};

/***/ }),

/***/ 6938:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var SpriteMasterConsts = __webpack_require__(1065);

Blockly.Blocks["spritemaster_spriteobjectof"] = {
  init: function () {
    this.jsonInit({
      message0: "sprite object of %1",
      args0: [
        {
          type: "input_value",
          name: "SPRITE",
        },
      ],
      colour: "#c70000",
      extensions: ["output_string"],
    });
  },
};

Blockly.Blocks["spritemaster_spriteproperty"] = {
  init: function () {
    this.jsonInit({
      message0: "get %1: %2",
      args0: [
        {
          type: "input_value",
          name: "SPRITE",
        },
        {
          type: "field_dropdown",
          name: "PROPERTY_OPTION",
          options: SpriteMasterConsts.SPRITE_MASTER_DROPDOWN,
        },
      ],
      colour: "#c70000",
      extensions: ["output_string"],
    });
  },
};

Blockly.Blocks["spritemaster_getclonesofsprite"] = {
  init: function () {
    this.jsonInit({
      message0: "get clones of %1",
      args0: [
        {
          type: "input_value",
          name: "SPRITE",
        },
      ],
      colour: "#c70000",
      extensions: ["output_string"],
    });
  },
};

Blockly.Blocks["spritemaster_getclonecountofsprite"] = {
  init: function () {
    this.jsonInit({
      message0: "get clone count of %1",
      args0: [
        {
          type: "input_value",
          name: "SPRITE",
        },
      ],
      colour: "#c70000",
      extensions: ["output_string"],
    });
  },
};

Blockly.Blocks["spritemaster_checktouchingsprite_equals_propertyvalue"] = {
  //Very long type id lol.
  init: function () {
    this.jsonInit({
      message0: "touching %1 with properties of %2 equaling %3",
      args0: [
        {
          type: "input_value",
          name: "SPRITE",
        },
        {
          type: "field_dropdown",
          name: "VARIABLE",
          options:
            Blockly.Blocks[
              "spritemaster_checktouchingsprite_equals_propertyvalue"
            ]._listProperties,
        },
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      colour: "#c70000",
      extensions: ["output_boolean"],
    });
  },
};


/***/ }),

/***/ 7056:
/***/ (() => {

Blockly.Blocks["sensing_keypressed"] = {
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.SENSING_KEYPRESSED,
      args0: [
        {
          type: "input_value",
          name: "KEY_OPTION",
        },
      ],
      category: Blockly.Categories.sensing,
      extensions: ["colours_sensing", "output_boolean"],
    });
  },
};

Blockly.Blocks["sensing_keyoptions"] = {
  init: function () {
    this.jsonInit({
      message0: "%1",
      args0: [
        {
          type: "field_dropdown",
          name: "KEY_OPTION",
          options: [
            ["space", "space-bar"],
            ["up arrow", "up-arrow"],
            ["down arrow", "down-arrow"],
            ["left arrow", "left-arrow"],
            ["right arrow", "right-arrow"],
            ["enter", "enter"],
            ["shift", "shift"],
            ["[", "["],
            ["\\", "\\"],
            ["=", "="],
            ["-", "-"],
            ["`", "`"],
            [";", ";"],
            ["'", "'"],
            [".", "."],
            ["/", "/"],
            [",", ","],
            ["a", "a"],
            ["b", "b"],
            ["c", "c"],
            ["d", "d"],
            ["e", "e"],
            ["f", "f"],
            ["g", "g"],
            ["h", "h"],
            ["i", "i"],
            ["j", "j"],
            ["k", "k"],
            ["l", "l"],
            ["m", "m"],
            ["n", "n"],
            ["o", "o"],
            ["p", "p"],
            ["q", "q"],
            ["r", "r"],
            ["s", "s"],
            ["t", "t"],
            ["u", "u"],
            ["v", "v"],
            ["w", "w"],
            ["x", "x"],
            ["y", "y"],
            ["z", "z"],
            ["0", "0"],
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5", "5"],
            ["6", "6"],
            ["7", "7"],
            ["8", "8"],
            ["9", "9"],
          ],
        },
      ],
      extensions: ["colours_sensing", "output_string"],
    });
  },
};


/***/ }),

/***/ 7067:
/***/ (() => {

Blockly.Blocks["json_new"] = {
  init: function () {
    this.jsonInit({
      message0: "New %1",
      args0: [
        {
          type: "field_dropdown",
          name: "TYPE",
          options: [
            ["object", "object"],
            ["array", "array"],
          ],
        },
      ],
      colour: "#058fff",
      extensions: ["output_number"],
    });
  },
};

//Object blocks:

Blockly.Blocks["json_setto"] = {
  init: function () {
    this.jsonInit({
      message0: "Set %1 to %2 on %3",
      args0: [
        {
          type: "input_value",
          name: "NAME",
        },
        {
          type: "input_value",
          name: "VALUE",
        },
        {
          type: "input_value",
          name: "OBJECT",
        },
      ],
      colour: "#058fff",
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["json_geton"] = {
  init: function () {
    this.jsonInit({
      message0: "Get %1 on %2",
      args0: [
        {
          type: "input_value",
          name: "NAME",
        },
        {
          type: "input_value",
          name: "OBJECT",
        },
      ],
      colour: "#058fff",
      extensions: ["output_string"],
    });
  },
};

Blockly.Blocks["json_deleteon"] = {
  init: function () {
    this.jsonInit({
      message0: "Delete %1 on %2",
      args0: [
        {
          type: "input_value",
          name: "NAME",
        },
        {
          type: "input_value",
          name: "OBJECT",
        },
      ],
      colour: "#058fff",
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["json_keys"] = {
  init: function () {
    this.jsonInit({
      message0: "Get value names of %1",
      args0: [
        {
          type: "input_value",
          name: "OBJECT",
        },
      ],
      colour: "#058fff",
      extensions: ["output_string"],
    });
  },
};

Blockly.Blocks["json_tostring"] = {
  init: function () {
    this.jsonInit({
      message0: "%1 to json string",
      args0: [
        {
          type: "input_value",
          name: "OBJECT",
        },
      ],
      colour: "#058fff",
      extensions: ["output_string"],
    });
  },
};

Blockly.Blocks["json_fromstring"] = {
  init: function () {
    this.jsonInit({
      message0: "%1 from json string",
      args0: [
        {
          type: "input_value",
          name: "OBJECT",
        },
      ],
      colour: "#058fff",
      extensions: ["output_string"],
    });
  },
};

//Array blocks:

Blockly.Blocks["json_array_push"] = {
  init: function () {
    this.jsonInit({
      message0: "Add %1 to end of %2",
      args0: [
        {
          type: "input_value",
          name: "VALUE",
        },
        {
          type: "input_value",
          name: "OBJECT",
        },
      ],
      colour: "#058fff",
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["json_array_unshift"] = {
  init: function () {
    this.jsonInit({
      message0: "Add %1 to start of %2",
      args0: [
        {
          type: "input_value",
          name: "VALUE",
        },
        {
          type: "input_value",
          name: "OBJECT",
        },
      ],
      colour: "#058fff",
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["json_array_lengthof"] = {
  init: function () {
    this.jsonInit({
      message0: "Length of array %1",
      args0: [
        {
          type: "input_value",
          name: "OBJECT",
        },
      ],
      colour: "#058fff",
      extensions: ["output_number"],
    });
  },
};

Blockly.Blocks["json_array_indexof"] = {
  init: function () {
    this.jsonInit({
      message0: "Index of %1 in %2",
      args0: [
        {
          type: "input_value",
          name: "VALUE",
        },
        {
          type: "input_value",
          name: "OBJECT",
        },
      ],
      colour: "#058fff",
      extensions: ["output_number"],
    });
  },
};

// Additional JSON utility blocks

Blockly.Blocks["json_has_key"] = {
  init: function () {
    this.jsonInit({
      message0: "Has key %1 in %2",
      args0: [
        { type: "input_value", name: "NAME" },
        { type: "input_value", name: "OBJECT" },
      ],
      colour: "#058fff",
      extensions: ["output_boolean"],
    });
  },
};

Blockly.Blocks["json_get_path"] = {
  init: function () {
    this.jsonInit({
      message0: "Get path %1 on %2 default %3",
      args0: [
        { type: "input_value", name: "PATH" },
        { type: "input_value", name: "OBJECT" },
        { type: "input_value", name: "DEFAULT" },
      ],
      colour: "#058fff",
      extensions: ["output_string"],
    });
  },
};

Blockly.Blocks["json_set_path"] = {
  init: function () {
    this.jsonInit({
      message0: "Set path %1 to %2 on %3",
      args0: [
        { type: "input_value", name: "PATH" },
        { type: "input_value", name: "VALUE" },
        { type: "input_value", name: "OBJECT" },
      ],
      colour: "#058fff",
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["json_delete_path"] = {
  init: function () {
    this.jsonInit({
      message0: "Delete path %1 on %2",
      args0: [
        { type: "input_value", name: "PATH" },
        { type: "input_value", name: "OBJECT" },
      ],
      colour: "#058fff",
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["json_array_pop"] = {
  init: function () {
    this.jsonInit({
      message0: "Remove last element from %1 and report it",
      args0: [{ type: "input_value", name: "OBJECT" }],
      colour: "#058fff",
      extensions: ["output_string"],
    });
  },
};

Blockly.Blocks["json_array_contains"] = {
  init: function () {
    this.jsonInit({
      message0: "Contains %1 in %2",
      args0: [
        { type: "input_value", name: "VALUE" },
        { type: "input_value", name: "OBJECT" },
      ],
      colour: "#058fff",
      extensions: ["output_boolean"],
    });
  },
};

Blockly.Blocks["json_clone"] = {
  init: function () {
    this.jsonInit({
      message0: "Clone %1",
      args0: [{ type: "input_value", name: "OBJECT" }],
      colour: "#058fff",
      extensions: ["output_string"],
    });
  },
};

Blockly.Blocks["json_parse_safe"] = {
  init: function () {
    this.jsonInit({
      message0: "Parse JSON %1 fallback %2",
      args0: [
        { type: "input_value", name: "STRING" },
        { type: "input_value", name: "DEFAULT" },
      ],
      colour: "#058fff",
      extensions: ["output_string"],
    });
  },
};

Blockly.Blocks["json_pretty_print"] = {
  init: function () {
    this.jsonInit({
      message0: "Pretty print %1 indent %2",
      args0: [
        { type: "input_value", name: "OBJECT" },
        { type: "input_value", name: "INDENT" },
      ],
      colour: "#058fff",
      extensions: ["output_string"],
    });
  },
};

Blockly.Blocks["json_typeof"] = {
  init: function () {
    this.jsonInit({
      message0: "typeof %1",
      args0: [{ type: "input_value", name: "OBJECT" }],
      colour: "#058fff",
      extensions: ["output_string"],
    });
  },
};

Blockly.Blocks["json_array_split"] = {
  init: function () {
    this.jsonInit({
      message0: "split %1 using separator %2",
      args0: [
        { type: "input_value", name: "STRING" },
        { type: "input_value", name: "USING" },
      ],
      colour: "#058fff",
      extensions: ["output_string"],
    });
  },
};

Blockly.Blocks["json_array_join"] = {
  init: function () {
    this.jsonInit({
      message0: "join %1 using separator %2",
      args0: [
        { type: "input_value", name: "ARRAY" },
        { type: "input_value", name: "USING" },
      ],
      colour: "#058fff",
      extensions: ["output_string"],
    });
  },
};


/***/ }),

/***/ 7135:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var engine = __webpack_require__(9940);

function createElement(type, args = {}, children = []) {
  var element = document.createElement(type);
  for (var name of Object.keys(args)) {
    element.setAttribute(name, args[name]);
  }
  for (var child of children) {
    element.append(child);
  }
  return element;
}

function getSafeHTML(text) {
  var span = document.createElement("span");
  span.textContent = text;
  var html = span.innerHTML;
  span.textContent = "";
  span.remove();
  return html;
}

function createElementXML(text) {
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(text, "text/xml");
  return xmlDoc.children[0];
}

Blockly.WorkspaceSvg.prototype.registerToolboxCategoryCallback(
  "GGM3_GLOBAL_VARIABLE",
  function (workspace) {
    var xmlList = [];

    xmlList.push(
      createElement("button", {
        text: "Create variable",
        callbackKey: "GGM3_CREATE_VARIABLE_GLOBAL",
      }),
    );

    workspace._ggm3_createVariable = (button) => {
      Blockly.prompt("New global variable name: ", "", function (output) {
        if (!output) {
          return;
        }
        var name = output.trim();
        if (!engine.hasGlobalVariable(name)) {
          engine.addGlobalVariable(name);
        }
        workspace.getToolbox().refreshSelection();
      });
    };

    workspace.registerButtonCallback(
      "GGM3_CREATE_VARIABLE_GLOBAL",
      (button) => {
        workspace._ggm3_createVariable(button);
      },
    );

    var variableNames = Array.from(Object.keys(engine.globalVariables));

    xmlList = xmlList.concat(
      variableNames.map((varName) => {
        var blockElement = document.createElement("block");
        blockElement.setAttribute("type", "globaldata_get");
        blockElement.setAttribute("id", "global_var_getter_" + varName);

        var field = document.createElement("field");
        field.setAttribute("name", "VARIABLE");
        field.textContent = varName;
        blockElement.append(field);

        // Add context menu to delete the variable
        blockElement.setAttribute("data-variable-name", varName);
        return blockElement;
      }),
    );

    if (variableNames.length > 0) {
      var firstVariable = variableNames[0];
      xmlList.push(
        createElementXML(`
          <block type="globaldata_changeby">
            <field name="VARIABLE">${getSafeHTML(firstVariable)}</field>
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
          </block>`),
      );

      xmlList.push(
        createElementXML(`
          <block type="globaldata_set">
            <field name="VARIABLE">${getSafeHTML(firstVariable)}</field>
            <value name="VALUE">
                <shadow type="text">
                    <field name="TEXT">0</field>
                </shadow>
            </value>
          </block>`),
      );
    }

    return xmlList;
  },
);


/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = [];


/***/ }),

/***/ 7156:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var elements = __webpack_require__(7255);
var gameSettingOptions = __webpack_require__(2194);

var gameSettingsDialog = elements.createElementsFromJSON([
  {
    element: "div",
    hidden: true,
    children: [
      {
        element: "div",
        className: "dialogBackground",
      },

      {
        element: "div",
        className: "gameSettingsBox centerMiddle",
        children: [
          {
            element: "h2",
            textContent: "Game Settings",
            style: {
              textAlign: "center",
              flexShrink: "0px",
            },
          },
          {
            element: "div",
            className: "gameSettingSelection",
            children: [
              {
                element: "button",
                className: "greyButtonStyle",
                textContent: "Close",
                style: {
                  width: "100%",
                  boxSizing: "border-box",
                  textAlign: "center",
                },
                onclick: () => {
                  gameSettingsDialog.hidden = true;
                },
              },
            ],
          },
          {
            element: "div",
            className: "gameSelectionCategory",
            children: gameSettingOptions.elements,
          },
        ],
      },
    ],
  },
])[0];

function gameSettingsShow() {
  gameSettingsDialog.hidden = false;
}

gameSettingsDialog.hidden = true;
document.body.append(gameSettingsDialog);

var { addAppMenu } = __webpack_require__(9366);

addAppMenu(
  "edit",
  [
    {
      element: "img",
      src: "icons/edit.svg",
    },
    {
      element: "span",
      textContent: "Edit",
    },
  ],
  [
    {
      label: "Edit game settings",
      icon: "icons/controller.svg",
      action: async function () {
        gameSettingsShow();
      },
    },
  ],
);

gameSettingOptions.start();


/***/ }),

/***/ 7255:
/***/ ((module) => {

//Webpack compatible version of elements module from gvbvdxx-pack-2
//With some new updates as well.
var __GP_elements = {};
function isDOM(Obj) {
  return Obj instanceof Element;
}
var elements = {
  appendElements: function (elm, appendArray) {
    for (var appendElm of appendArray) {
      elm.append(appendElm);
    }
  },
  getStylelessAJSON(props = {}) {
    return {
      element: "a",
      style: {
        all: "unset",
      },
      ...props,
    };
  },
  removeAllChildren: function (elm) {
    Array.from(elm.children).forEach((elm) => elm.remove());
  },
  appendElementsFromJSON: function (elm, appendJSONArray) {
    var elms = elements.createElementsFromJSON(appendJSONArray);
    elements.appendElements(elm, elms);
    return elms;
  },
  setInnerJSON: function (elm, appendJSONArray) {
    elements.removeAllChildren(elm);
    var elms = elements.createElementsFromJSON(appendJSONArray);
    elements.appendElements(elm, elms);
    return elms;
  },
  createElementsFromJSON: function (jsonelmArray) {
    //converts an array of json's with element properties to a element list.
    function runElements(arry) {
      var myRealElms = [];
      for (var elm of arry) {
        if (!isDOM(elm)) {
          if (typeof elm == "object") {
            var realElm = document.createElement(elm.element);
            for (var attriName of Object.keys(elm)) {
              if (!(attriName == "element" || attriName == "children")) {
                var attributeValue = elm[attriName];
                var setattri = true;
                if (attriName == "gid") {
                  __GP_elements[attributeValue] = realElm;
                  setattri = false;
                }
                if (attriName == "style") {
                  for (var styleName of Object.keys(attributeValue)) {
                    var styleValue = attributeValue[styleName];
                    realElm.style[styleName] = styleValue;
                  }
                  setattri = false;
                }
                if (attriName == "styleProperties") {
                  for (var styleName of Object.keys(attributeValue)) {
                    var styleValue = attributeValue[styleName];
                    realElm.style.setProperty(styleName, styleValue);
                  }
                  setattri = false;
                }
                if (attriName == "dangerouslySetInnerHTML") {
                  realElm.innerHTML = attributeValue;
                  setattri = false;
                } else if (attriName == "innerHTML") {
                  console.trace(
                    'Warning: The "innerHTML" property is deprecated. ' +
                      'Please use "dangerouslySetInnerHTML" instead.',
                  );
                  realElm.innerHTML = attributeValue;
                  setattri = false;
                }
                if (attriName == "textContent") {
                  realElm.textContent = attributeValue;
                  setattri = false;
                }
                if (attriName == "src") {
                  realElm.src = attributeValue;
                  setattri = false;
                }
                if (attriName == "srcObject") {
                  realElm.srcObject = attributeValue;
                  setattri = false;
                }
                if (attriName == "value") {
                  realElm.value = attributeValue;
                  setattri = false;
                }
                if (attriName == "min") {
                  realElm.min = attributeValue;
                  setattri = false;
                }
                if (attriName == "max") {
                  realElm.max = attributeValue;
                  setattri = false;
                }
                if (attriName == "width") {
                  realElm.width = attributeValue;
                  setattri = false;
                }
                if (attriName == "height") {
                  realElm.height = attributeValue;
                  setattri = false;
                }
                if (attriName == "className") {
                  realElm.className = attributeValue;
                  setattri = false;
                }
                if (attriName == "hidden") {
                  if (attributeValue) {
                    realElm.hidden = true;
                  }
                  setattri = false;
                }
                if (attriName == "selected") {
                  if (attributeValue) {
                    realElm.selected = true;
                  }
                  setattri = false;
                }
                if (attriName == "eventListeners") {
                  if (Array.isArray(attributeValue)) {
                    for (var event of attributeValue) {
                      realElm.addEventListener(event.event, event.func);
                    }
                  }
                  setattri = false;
                }
                if (attriName == "GPWhenCreated") {
                  attributeValue.bind(realElm)(realElm); //This seems weird, but first realElm is the "this" value refrence, then the second realElm is for the function value, as well as calling the new binded function.
                  setattri = false;
                }
                if (setattri) {
                  if (typeof realElm[attriName] !== "undefined") {
                    realElm[attriName] = attributeValue;
                    setattri = false;
                  }
                }
                if (setattri) {
                  realElm.setAttribute(attriName, attributeValue);
                }
              }
            }

            if (elm.children) {
              var elmsToAppend = runElements(elm.children);
              for (var elmAppend of elmsToAppend) {
                realElm.append(elmAppend);
              }
            }
            myRealElms.push(realElm);
          } else {
            myRealElms.push(elm);
          }
        } else {
          if (elm) {
            myRealElms.push(elm);
          }
        }
      }
      return myRealElms;
    }
    return runElements(jsonelmArray);
  },
  getById: function (id) {
    return document.getElementById(id);
  },
  setGPId: function (el, id) {
    __GP_elements[id] = el;
    return el;
  },
  disposeGPId: function (id) {
    __GP_elements[id] = undefined;
  },
  getGPId: function (id) {
    if (__GP_elements[id]) {
      return __GP_elements[id];
    }
    return null;
  },
  body: document.body,
  __GP_elements: __GP_elements,
};
module.exports = elements;


/***/ }),

/***/ 7278:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var BlockInstance = __webpack_require__(6129);
/**
 * Helper class to flash a Blockly scratch block in the users workspace
 */
class BlockFlasher {
  /**
   * FLash a block 3 times
   * @param block the block to flash
   */
  static flash(block) {
    const getSvgPath = (block) => {
      if (!block) return null;
      if (block.pathObject) return block.pathObject.svgPath; // new Blockly
      return block.svgPath_;
    };

    if (myFlash.timerID > 0) {
      clearTimeout(myFlash.timerID);
      if (getSvgPath(myFlash.block)) {
        getSvgPath(myFlash.block).style.fill = "";
      }
    }

    let count = 4;
    let flashOn = true;
    myFlash.block = block;

    /**
     * Internal method to switch the colour of a block between light yellow and it's original colour
     * @private
     */
    function _flash() {
      if (getSvgPath(myFlash.block)) {
        getSvgPath(myFlash.block).style.fill = flashOn ? "#ffff80" : "";
      }
      flashOn = !flashOn;
      count--;
      if (count > 0) {
        myFlash.timerID = setTimeout(_flash, 200);
      } else {
        myFlash.timerID = 0;
        myFlash.block = null;
      }
    }

    _flash();
  }
}

const myFlash = { block: null, timerID: null };

module.exports = BlockFlasher;


/***/ }),

/***/ 7367:
/***/ (() => {

Blockly.Blocks["engine_framerate_to"] = {
  init: function () {
    this.jsonInit({
      message0: "set game framerate to %1",
      args0: [
        {
          type: "input_value",
          name: "FPS",
        },
      ],
      extensions: ["shape_statement"],
      colour: "#77a1b5",
    });
  },
};

Blockly.Blocks["engine_framerate"] = {
  init: function () {
    this.jsonInit({
      message0: "game framerate",
      args0: [],
      extensions: ["output_number"],
      colour: "#77a1b5",
    });
  },
};


/***/ }),

/***/ 7405:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var {
  getSaveableVariables,
  getSaveableVariablesGlobal,
} = __webpack_require__(6185);
var engine = __webpack_require__(9940);

//Engine property names

function _fromEnginePropertyNames(from) {
  engine.propertyVariables = {};
  for (var name of from || []) {
    engine.propertyVariables[name] = true;
  }
}

function _toEnginePropertyNames(from) {
  return Object.keys(engine.propertyVariables);
}

//Engine properties

function fromEngineJSON(mainJSON) {
  Object.assign(engine, {
    globalVariables: mainJSON.globalVariables || {},
    broadcastNames: mainJSON.broadcastNames || [],
    frameRate: mainJSON.frameRate || 60,
    gameWidth: mainJSON.gameWidth || engine.DEFAULT_WIDTH,
    gameHeight: mainJSON.gameHeight || engine.DEFAULT_HEIGHT,
  });
  _fromEnginePropertyNames(mainJSON.spriteProperties);
  engine.updateCanvasSize();
}

function toEngineJSON() {
  return {
    globalVariables: getSaveableVariablesGlobal(engine.globalVariables),
    broadcastNames: engine.broadcastNames,
    frameRate: engine.frameRate,
    spriteProperties: _toEnginePropertyNames(),
    gameWidth: engine.gameWidth,
    gameHeight: engine.gameHeight,
  };
}

//Sprite properties

function fromSpriteJSON(sprite, spriteJson) {
  Object.assign(sprite, {
    x: spriteJson.x,
    y: spriteJson.y,
    angle: spriteJson.angle,
    scaleX: spriteJson.scaleX,
    scaleY: spriteJson.scaleY,
    skewX: spriteJson.skewX || 0,
    skewY: spriteJson.skewY || 0,
    size: spriteJson.size,
    blocklyXML: spriteJson.blocklyXML
      ? Blockly.Xml.textToDom(spriteJson.blocklyXML)
      : null,
    name: spriteJson.name,
    costumeIndex: spriteJson.costumeIndex,
    zIndex: spriteJson.zIndex,
    variables: spriteJson.variables,
    hidden: spriteJson.hidden,
    spriteProperties: spriteJson.properties || {},
  });
}

function toSpriteJSON(sprite) {
  return {
    x: sprite.x,
    y: sprite.y,
    angle: sprite.angle,
    scaleX: sprite.scaleX,
    scaleY: sprite.scaleY,
    skewX: sprite.skewX,
    skewY: sprite.skewY,
    size: sprite.size,
    blocklyXML: sprite.blocklyXML
      ? Blockly.Xml.domToText(sprite.blocklyXML)
      : null,
    name: sprite.name,
    zIndex: sprite.zIndex,
    costumeIndex: sprite.costumeIndex,
    variables: getSaveableVariables(sprite.variables),
    properties: getSaveableVariablesGlobal(sprite.spriteProperties),
    hidden: sprite.hidden,
  };
}

//Costume properties

function fromCostumeJSON(costume, costumeJson) {
  Object.assign(costume, {
    id: costumeJson.id,
    rotationCenterX: costumeJson.rotationCenterX,
    rotationCenterY: costumeJson.rotationCenterY,
    preferedScale: costumeJson.preferedScale,
    willPreload: costumeJson.willPreload,
    mimeType: costumeJson.mimeType,
  });
}

function toCostumeJSON(costume) {
  return {
    name: costume.name,
    id: costume.id,
    rotationCenterX: costume.rotationCenterX,
    rotationCenterY: costume.rotationCenterY,
    preferedScale: costume.preferedScale,
    willPreload: costume.willPreload,
    mimeType: costume.mimeType,
  };
}

//Sound properties

function fromSoundJSON(sound, soundJson) {
  Object.assign(sound, {
    id: soundJson.id,
    willPreload: soundJson.willPreload,
    mimeType: soundJson.mimeType,
  });
}

function toSoundJSON(sound) {
  return {
    name: sound.name,
    id: sound.id,
    willPreload: sound.willPreload,
    mimeType: sound.mimeType,
  };
}

module.exports = {
  fromEngineJSON,
  toEngineJSON,

  fromSpriteJSON,
  toSpriteJSON,

  fromCostumeJSON,
  toCostumeJSON,

  fromSoundJSON,
  toSoundJSON,
};


/***/ }),

/***/ 7590:
/***/ ((module) => {

module.exports = {
  element: "div",
  className: "loader2Container",
  children: [
    {
      element: "div",
      className: "loaderBlock1 loaderBlock",
    },
    {
      element: "div",
      className: "loaderBlock3 loaderBlock",
    },
    {
      element: "div",
      className: "loaderBlock2 loaderBlock",
    },
    {
      element: "div",
      className: "loaderBlockIcon loaderBlock",
    },
  ],
};


/***/ }),

/***/ 7677:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var twgl = __webpack_require__(4391);
var TWEEN = __webpack_require__(484);

var Drawable = __webpack_require__(6065);
var Sprite = __webpack_require__(2242);
var calculateMatrix = __webpack_require__(8190);
var sMath = __webpack_require__(4912);
var EventEmitter = __webpack_require__(228);
var CollisionSprite = __webpack_require__(4447);
var SHADERS = __webpack_require__(425);

var created = false;

class GGM3Engine extends EventEmitter {
  SPRITE_CREATED = "SPRITE_CREATED";
  SPRITE_DELETED = "SPRITE_DELETED";

  RESOLUTION_UPDATED = "RESOLUTION_UPDATED";
  CURSOR_CHANGED = "CURSOR_CHANGED";
  FRAMERATE_CHANGED = "FRAMERATE_CHANGED";

  DEFAULT_WIDTH = 640;
  DEFAULT_HEIGHT = 360;
  DEFAULT_FRAMERATE = 60;
  DEFAULT_CURSOR_STYLE = "default";

  constructor(canvas) {
    super();
    if (!created) {
      created = true;
    } else {
      throw new Error(
        "A GGM3Engine was already created. Use iframes to run multiple games at once.",
      );
    }
    this.canvas = canvas;
    if (!canvas) {
      this.canvas = document.createElement("canvas");
    }
    this.editMode = false;
    this._editDragging = null;
    this.drawables = [];
    this.sprites = [];
    this.frameRate = this.DEFAULT_FRAMERATE;
    this._frameRate = this.frameRate;
    this._iTime = 0;
    this.sMath = sMath;
    this.tween = new TWEEN.Group();
    this.keyNames = {
      " ": "space-bar",
      ArrowLeft: "left-arrow",
      ArrowRight: "right-arrow",
      ArrowUp: "up-arrow",
      ArrowDown: "down-arrow",
    };
    this.keysPressed = {};
    this.initCanvas();
    this.generateMouseMask();
    this.startRenderLoop();
    this.spriteMap = {};
    this.globalVariables = {};
    this.propertyVariables = {};
    this.broadcastNames = [];
    this.broadcastQueue = [];

    this.gameWidth = this.DEFAULT_WIDTH;
    this.gameHeight = this.DEFAULT_HEIGHT;
    this.screenScale = 1;
    this.updateCanvasSize();
    this.calculateGLStuff();
    this.changeCursorStyle(this.DEFAULT_CURSOR_STYLE);
  }

  changeCursorStyle(value) {
    var cursorStyle = value ? "" + value : this.DEFAULT_CURSOR_STYLE;
    if (cursorStyle !== this.cursorStyle) {
      this.cursorStyle = cursorStyle;
      this.canvas.style.cursor = cursorStyle;
      this.emit(this.CURSOR_CHANGED, cursorStyle);
    }
  }

  setWidth(v) {
    this.gameWidth = +v || this.DEFAULT_WIDTH;
    if (this.gameWidth < 1) {
      this.gameWidth = 1;
    }
  }

  setHeight(v) {
    this.gameHeight = +v || this.DEFAULT_HEIGHT;
    if (this.gameHeight < 1) {
      this.gameHeight = 1;
    }
  }

  setFramerate(v) {
    //Used by blocks
    this.frameRate = +v || this.DEFAULT_FRAMERATE;
    if (this.frameRate > 1000) {
      this.frameRate = 1000;
    }
    if (this.frameRate < 1) {
      this.frameRate = 1;
    }
  }

  stopAllSounds() {
    for (var sprite of this.getAllTopSprites()) {
      sprite.stopAllSounds();
    }
  }

  broadcast(name) {
    this.getAllTopSprites().forEach((sprite) => {
      sprite.emitBroadcastListener(name);
    });
  }

  broadcastOnNextFrame(name) {
    this.broadcastQueue.push(() => {
      this.getAllTopSprites().forEach((sprite) => {
        sprite.emitBroadcastListener(name);
      });
    });
  }

  async broadcastAndWait(name) {
    var promises = [];
    this.getAllTopSprites().forEach((sprite) => {
      promises.push(sprite.emitBroadcastListener(name));
    });
    await Promise.all(promises);
  }

  getBroadcastNames() {
    return this.broadcastNames;
  }

  addBroadcastName(name) {
    if (this.broadcastNames.indexOf(name) === -1) {
      this.broadcastNames.push(name);
    }
  }

  removeBroadcastName(name) {
    this.broadcastNames = this.broadcastNames.filter((n) => n !== name);
  }

  updateCanvasSize() {
    var { canvas, gameWidth, gameHeight, screenScale } = this;
    var cwidth = gameWidth * screenScale;
    var cheight = gameHeight * screenScale;

    var needsUpdate = cwidth !== canvas.width || cheight !== canvas.height;
    if (needsUpdate) {
      canvas.width = cwidth;
      canvas.height = cheight;
      this.calculateGLStuff();
      this.emit(this.RESOLUTION_UPDATED);
    }
  }

  hasGlobalVariable(name) {
    return Object.keys(this.globalVariables).indexOf(name) > -1;
  }

  addGlobalVariable(name) {
    this.globalVariables[name] = 0;
  }

  removeGlobalVariable(name) {
    this.globalVariables[name] = true; //Blocks can set variables to undefined and may cause deletion to bug, so set it temporarily to true before deleting.
    delete this.globalVariables[name];
  }


  addSpriteProperty(name) {
    this.propertyVariables[name] = true; //Values are unique for each sprite.
  }

  hasSpriteProperty(name) {
    if (this.propertyVariables[name]) {
      return true;
    }
    return false;
  }

  removeSpriteProperty(name) {
    this.propertyVariables[name] = true;
    delete this.propertyVariables[name];
    for (var sprite of this.sprites) {
      sprite.removeProperty(name);
    }
  }

  makeUniqueSpriteNames() {
    var existingNames = [];
    var nameCounts = {};
    var spriteMap = {};
    this.sprites.forEach((sprite) => {
      if (existingNames.indexOf(sprite.name) !== -1) {
        if (nameCounts[sprite.name]) {
          nameCounts[sprite.name] += 1;
        } else {
          nameCounts[sprite.name] = 1;
        }
        sprite.name = sprite.name + ` (${nameCounts[sprite.name]})`;
      } else {
        existingNames.push(sprite.name);
      }
      spriteMap[sprite.name] = sprite;
    });
    this.spriteMap = spriteMap;
  }

  get mouseX() {
    return this.mouseMask.x;
  }
  get mouseY() {
    return -this.mouseMask.y;
  }
  get mouseIsDown() {
    return this.mouseMask.isDown;
  }

  stopGame() {
    this.broadcastQueue = [];
    for (var sprite of this.sprites) {
      sprite.stopAllScripts();
      sprite.deleteClones();
      sprite.effects.reset();
    }
  }

  startGame() {
    this.stopGame();
    this.makeUniqueSpriteNames();
    for (var sprite of this.sprites) {
      sprite.emitStackListener("beforestart");
    }
    for (var sprite of this.sprites) {
      sprite.emitStackListener("started");
    }
  }

  deleteSprite(sprite) {
    if (!sprite.id) {
      return;
    }
    sprite.dispose();
    this.sprites = this.sprites.filter((s) => s.id !== sprite.id);
    this.emit(this.SPRITE_DELETED, sprite);
  }

  emptyProject() {
    var _this = this;
    this.sprites.forEach((s) => {
      _this.deleteSprite(s);
    });
    this.sprites = [];
    this.spriteProperties = {};
    this.globalVariables = {};
    this.propertyVariables = {};
    this.broadcastNames = [];
    this.stopGame();
    this.setWidth(this.DEFAULT_WIDTH);
    this.setHeight(this.DEFAULT_HEIGHT);
    this.setFramerate(this.DEFAULT_FRAMERATE);
    this.changeCursorStyle(this.DEFAULT_CURSOR_STYLE);
  }

  createEmptySprite() {
    var spr = this.__createEmptySpriteNoEvent();
    this.emit(this.SPRITE_CREATED, spr);
    return spr;
  }

  __createEmptySpriteNoEvent() {
    var spr = new Sprite(this, "Sprite " + (this.sprites.length + 1));
    this.sprites.push(spr);
    this.makeUniqueSpriteNames();
    return spr;
  }

  duplicateSprite(fromSprite) {
    var newSprite = this.__createEmptySpriteNoEvent();
    newSprite.name = fromSprite.name + " " + Math.round(Date.now());
    this.makeUniqueSpriteNames();

    newSprite.x = fromSprite.x + 10;
    newSprite.y = fromSprite.y - 10;
    newSprite.angle = fromSprite.angle;
    newSprite.scaleX = fromSprite.scaleX;
    newSprite.scaleY = fromSprite.scaleY;
    newSprite.size = fromSprite.size;
    newSprite.costumeIndex = fromSprite.costumeIndex;
    newSprite.alpha = fromSprite.alpha;
    newSprite.skewX = fromSprite.skewX;
    newSprite.skewY = fromSprite.skewY;

    for (var variable of Object.keys(fromSprite.variables)) {
      try {
        newSprite.variables[variable] = JSON.parse(
          JSON.stringify(fromSprite.variables[variable]),
        ); //This clones the variable value, including json values.
      } catch (e) {}
    }

    for (var variable of Object.keys(fromSprite.spriteProperties)) {
      try {
        newSprite.spriteProperties[variable] = JSON.parse(
          JSON.stringify(fromSprite.spriteProperties[variable]),
        ); //This clones the variable value, including json values.
      } catch (e) {}
    }

    fromSprite.costumes.forEach(async (fromCostume) => {
      var costume = await newSprite.addCostume(fromCostume.dataURL);
      costume.name = fromCostume.name;
      costume.rotationCenterX = fromCostume.rotationCenterX;
      costume.rotationCenterY = fromCostume.rotationCenterY;
      costume.preferedScale = fromCostume.preferedScale;
      costume.willPreload = fromCostume.willPreload;
      costume.renderImageAtScale();
    });

    fromSprite.sounds.forEach(async (fromSound) => {
      var sound = await newSprite.addSound(fromSound.src);
      sound.name = fromSound.name;
      sound.willPreload = sound.willPreload;
    });

    this.emit(this.SPRITE_CREATED, newSprite);
    return newSprite;
  }

  startRenderLoop() {
    const _this = this;

    let previous = performance.now();
    let lag = 0.0;

    function loop() {
      setTimeout(loop, 1);
      var now = performance.now();

      const frameDuration = 1000 / _this.frameRate;

      // Calculate time since last frame
      let delta = now - previous;
      previous = now;

      if (delta > 1000) {
        delta = 1000;
      }

      // Add the (capped) delta to our lag accumulator
      lag += delta;

      // Run update logic in fixed steps
      // This loop will run 0 or more times
      while (lag >= frameDuration) {
        // Pass the *fixed* step to the update logic
        _this.render(frameDuration);
        lag -= frameDuration;
      }
    }

    setTimeout(loop, 1);
  }

  newDrawable(canvas) {
    var drawable = new Drawable(this, canvas, this.drawables.length);
    this.drawables.push(drawable);
    return drawable;
  }

  disposeDrawable(drawable) {
    drawable.dispose();
    this.drawables = this.drawables.filter((d) => d.id !== drawable.id);
  }

  disposeAllDrawables() {
    var t = this;
    Array.from(this.drawables).forEach((d) => t.disposeDrawable(d));
  }

  turnOnEditing() {
    this.editMode = true;
  }

  turnOffEditing() {
    this.editMode = false;
  }

  generateMouseMask() {
    var c = document.createElement("canvas");
    var ctx = c.getContext("2d");
    c.width = 1;
    c.height = 1;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 1, 1);
    this.mouseMask = new CollisionSprite(ctx.getImageData(0, 0, 1, 1));
    this.mouseMask.isDown = false;
    c.width = 0;
    c.height = 0;
    c.remove();
  }

  initCanvas() {
    if (this.gl) {
      return;
    }
    var canvas = this.canvas;
    canvas.width = 640;
    canvas.height = 360;
    const contextAttribs = {
      alpha: false,
      stencil: true,
      antialias: false,
      preserveDrawingBuffer: true
    };
    var gl =
      canvas.getContext("webgl", contextAttribs) ||
      canvas.getContext("experimental-webgl", contextAttribs) ||
      canvas.getContext("webgl2", contextAttribs);

    var fragmentShader = SHADERS.FRAGMENT_SHADER;
    this._gl_spriteProgramInfo = twgl.createProgramInfo(gl, [
      SHADERS.VERTEX_SHADER,
      fragmentShader,
    ]);

    this.gl = gl;
  }

  calculateGLStuff() {
    var gl = this.gl;

    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    this._gl_position = [-0, -0, 1, -0, -0, 1, -0, 1, 1, -0, 1, 1];
    this._gl_texcoord = [
      0,
      0, // Bottom-left vertex maps to (0,0)
      1,
      0, // Bottom-right vertex maps to (1,0)
      0,
      1, // Top-left vertex maps to (0,1)
      0,
      1, // Top-left vertex maps to (0,1)
      1,
      0, // Bottom-right vertex maps to (1,0)
      1,
      1, // Top-right vertex maps to (1,1)
    ];
    this._gl_quadBufferInfo = twgl.createBufferInfoFromArrays(gl, {
      a_position: {
        // This now matches `attribute vec2 a_position`
        numComponents: 2,
        data: this._gl_position,
      },
      a_texCoord: {
        // This now matches `attribute vec2 a_texCoord`
        numComponents: 2,
        data: this._gl_texcoord,
      },
    });

    var projectionMatrix = twgl.m4.ortho(
      0,
      this.canvas.width,
      this.canvas.height,
      0,
      -1,
      1,
    );

    this._gl_projectionMatrix = projectionMatrix;

    this.render(1 / this.frameRate);
  }

  render(elapsed) {
    var { canvas, gl } = this;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1, 1, 1, 0); // Use 0,0,0,0 to respect canvas style background
    gl.clear(gl.COLOR_BUFFER_BIT);

    this._iTime += elapsed / 1000;
    this.elapsedFrameTime = elapsed;
    if (this._frameRate !== this.frameRate) {
      this._frameRate = this.frameRate;
      this.emit(this.FRAMERATE_CHANGED, this._frameRate);
    }
    this.tween.update(this._iTime * 1000);

    var _this = this;
    while (this.broadcastQueue.length > 0) {
      var broadcastFunc = this.broadcastQueue.shift();
      broadcastFunc();
    }
    this.getAllTopSprites()
      .reverse()
      .forEach((spr) => {
        _this.tickSprite(spr);
        _this.renderSprite(spr);
      });
    if (this.editMode) {
      this.tickEditMode();
    } else {
      this._editDragging = null;
    }
  }

  findSpriteByName(name) {
    if (name instanceof Sprite) {
      return name;
    }
    var spr = this.spriteMap[name];
    if (spr) {
      return spr;
    }
    for (var spr of this.sprites) {
      if (spr.name == name) {
        return spr;
      }
    }
    return null;
  }

  changeMousePosition(cx, cy) {
    this.mouseMask.x = (+cx || 0) / this.screenScale - this.gameWidth / 2;
    this.mouseMask.y = (+cy || 0) / this.screenScale - this.gameHeight / 2;
  }

  changeMouseDown(down) {
    this.mouseMask.isDown = !!down;
  }

  changeKeyPressed(key, down) {
    var keyName = key.toLowerCase();
    if (this.keyNames[key]) {
      keyName = this.keyNames[key];
    }
    if (down) {
      this.keysPressed[keyName] = true;
    } else {
      delete this.keysPressed[keyName];
    }
  }

  tickSprite(sprite) {
    sprite.emitFrameListeners();
  }

  sortLayers() {
    var i = 0;
    for (var sprite of this.getAllTopSprites()) {
      sprite.zIndex = i;
      i += 1;
    }
  }

  getAllTopSprites() {
    var sprs = [];
    for (var spr of this.sprites) {
      for (var clone of spr.clones) {
        sprs.push(clone);
      }
      sprs.push(spr);
    }
    var topSprites = sprs
      .map((s) => s)
      .sort((sprite, sprite2) => sprite2.zIndex - sprite.zIndex);
    return topSprites;
  }

  getTopSprites() {
    var topSprites = this.sprites
      .map((s) => s)
      .sort((sprite, sprite2) => sprite2.zIndex - sprite.zIndex);
    return topSprites;
  }

  tickEditMode() {
    if (this._editDragging) {
      if (this.mouseIsDown) {
        var { sprite, offsetx, offsety } = this._editDragging;
        sprite.x = this.mouseX + offsetx;
        sprite.y = this.mouseY + offsety;
        this.canvas.style.cursor = "grabbing";
      } else {
        this._editDragging = null;
      }
    } else {
      this._editDragging = null;
      var topSprites = this.getAllTopSprites()
        .reverse()
        .filter((s) => !s.hidden)
        .filter((s) => s.alpha > 70);
      var touchedSprite = null;
      var mouseMask = this.mouseMask;
      for (var sprite of topSprites) {
        sprite.alignMask();
        var mask = sprite.mask;
        if (mask && mouseMask) {
          if (mouseMask.collisionTest(mask)) {
            touchedSprite = sprite;
          }
        }
      }
      this.canvas.style.cursor = "unset";
      if (touchedSprite) {
        this.canvas.style.cursor = "grab";
      }
      if (this.mouseIsDown) {
        if (!this._previousMouseDown) {
          this._previousMouseDown = true;
          if (touchedSprite) {
            this._editDragging = {
              offsetx: touchedSprite.x - this.mouseX,
              offsety: touchedSprite.y - this.mouseY,
              sprite: touchedSprite,
            };
          }
        }
      } else {
        this._previousMouseDown = false;
      }
    }
  }

  renderSprite(spr) {
    if (spr.hidden) {
      return;
    }
    if (spr.alpha <= 0) {
      return;
    }
    var {
      gl,
      _gl_spriteProgramInfo,
      _gl_projectionMatrix,
      _gl_quadBufferInfo,
      _iTime,
    } = this;
    if (spr.costumes[spr.costumeIndex]) {
      var costume = spr.costumes[spr.costumeIndex];
      var drawable = costume.drawable;
      if (costume.drawable) {
        costume.drawable.update(); //This updates the costume texture if needed.
        var center = costume.getFinalRotationCenter();
        var modelMatrix = calculateMatrix({
          x: spr.x * this.screenScale + this.canvas.width / 2,
          y: -spr.y * this.screenScale + this.canvas.height / 2,
          rotation: spr.angle * (Math.PI / 180),
          rotationCenterX: center[0],
          rotationCenterY: center[1],
          textureWidth: costume.canvas.width,
          textureHeight: costume.canvas.height,
          scaleX:
            ((spr.scaleX * (spr.size / 100)) / costume.currentScale) *
            this.screenScale,
          scaleY:
            ((spr.scaleY * (spr.size / 100)) / costume.currentScale) *
            this.screenScale,
          skewX: spr.skewX * (Math.PI / 180),
          skewY: spr.skewY * (Math.PI / 180),
        });

        //var modelMatrix = twgl.m4.identity();
        //modelMatrix = twgl.m4.scale(modelMatrix, [100, 100, 1]);
        var uniforms = {
          u_modelMatrix: modelMatrix,
          u_skin: drawable.texture,
          u_projectionMatrix: _gl_projectionMatrix,

          u_ghost: spr.alpha / 100,
          ...spr.effects.getRenderableEffects(),
        };

        //window.alert(JSON.stringify(uniforms));

        gl.useProgram(_gl_spriteProgramInfo.program);
        twgl.setBuffersAndAttributes(
          gl,
          _gl_spriteProgramInfo,
          _gl_quadBufferInfo,
        );
        twgl.setUniforms(_gl_spriteProgramInfo, uniforms);
        twgl.drawBufferInfo(gl, _gl_quadBufferInfo);
      }
    }
  }

  generateID() {
    var id = "";
    id += Date.now();
    id += "_";
    id += Math.round(Math.random() * 999999);
    return id;
  }
}

module.exports = {
    GGM3Engine
};

/***/ }),

/***/ 7714:
/***/ ((module) => {

module.exports = [
  {
    element: "div",
    className: "spriteInputContainer",
    children: [
      {
        element: "span",
        className: "selectedSpriteLabel",
        textContent: "Name:",
      },
      {
        element: "input",
        className: "selectedSpriteInput",
        value: "Sprite",
        gid: "spriteNameInput",
      },
    ],
  },
  {
    element: "div",
    className: "spriteInputContainer",
    children: [
      {
        element: "span",
        className: "selectedSpriteLabel",
        textContent: "X:",
      },
      {
        element: "input",
        className: "selectedSpriteInput",
        value: "Sprite",
        type: "number",
        gid: "spriteXPosInput",
      },
    ],
  },
  {
    element: "div",
    className: "spriteInputContainer",
    children: [
      {
        element: "span",
        className: "selectedSpriteLabel",
        textContent: "Y:",
      },
      {
        element: "input",
        className: "selectedSpriteInput",
        value: "Sprite",
        type: "number",
        gid: "spriteYPosInput",
      },
    ],
  },
  {
    element: "div",
    className: "spriteInputContainer",
    children: [
      {
        element: "span",
        className: "selectedSpriteLabel",
        textContent: "Direction:",
      },
      {
        element: "input",
        className: "selectedSpriteInput",
        value: "Sprite",
        type: "number",
        gid: "spriteDirectionInput",
      },
    ],
  },
  {
    element: "div",
    className: "spriteInputContainer",
    children: [
      {
        element: "span",
        className: "selectedSpriteLabel",
        textContent: "Size:",
      },
      {
        element: "input",
        className: "selectedSpriteInput",
        value: "Sprite",
        type: "number",
        gid: "spriteSizeInput",
      },
    ],
  },
  {
    element: "div",
    className: "spriteInputContainer",
    style: {
      display: "flex",
      flexDirection: "column",
    },
    children: [
      {
        element: "span",
        className: "selectedSpriteLabel",
        textContent: "Hidden:",
      },
      {
        element: "input",
        type: "checkbox",
        gid: "spriteHiddenInput",
      },
    ],
  },
];


/***/ }),

/***/ 7780:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Blockly.Blocks["event_whengamestarts"] = {
  init: function () {
    this.jsonInit({
      id: "event_whengamestarts",
      message0: "When game starts",
      inputsInline: true,
      nextStatement: null,
      category: Blockly.Categories.event,
      colour: Blockly.Colours.event.primary,
    });
  },
};
Blockly.Blocks["event_beforegamestarts"] = {
  init: function () {
    this.jsonInit({
      id: "event_whengamestarts",
      message0: "Before game starts",
      inputsInline: true,
      nextStatement: null,
      category: Blockly.Categories.event,
      colour: Blockly.Colours.event.primary,
    });
  },
};

var engine = __webpack_require__(9940);

function createElement(type, args = {}, children = []) {
  var element = document.createElement(type);
  for (var name of Object.keys(args)) {
    element.setAttribute(name, args[name]);
  }
  for (var child of children) {
    element.append(child);
  }
  return element;
}

function getSafeHTML(text) {
  var span = document.createElement("span");
  span.textContent = text;
  var html = span.innerHTML;
  span.textContent = "";
  span.remove();
  return html;
}

function createElementXML(text) {
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(text, "text/xml");
  return xmlDoc.children[0];
}

Blockly.WorkspaceSvg.prototype.registerToolboxCategoryCallback(
  "GGM3_BROADCASTING",
  function (workspace) {
    var xmlList = [];

    xmlList.push(
      createElement("button", {
        text: "Create broadcast message",
        callbackKey: "GGM3_CREATE_BROADCAST_MESSAGE",
      }),
    );

    workspace.registerButtonCallback(
      "GGM3_CREATE_BROADCAST_MESSAGE",
      (button) => {
        Blockly.prompt(
          "New broadcast message name: ",
          "message",
          function (output) {
            if (!output) {
              return;
            }
            var name = output.trim();
            engine.addBroadcastName(name);
            workspace.getToolbox().refreshSelection();
          },
        );
      },
    );

    var broadcastNames = engine.getBroadcastNames();

    for (var brodcastName of broadcastNames) {
      xmlList.push(
        createElementXML(`
          <block type="event_ggm3_whenbroadcasted">
            <field name="BROADCAST_NAME">${getSafeHTML(brodcastName)}</field>
          </block>`),
      );
    }

    if (broadcastNames.length > 0) {
      xmlList.push(
        createElementXML(`
          <block type="event_ggm3_broadcast">
            <value name="BROADCAST_NAME">
              <shadow type="event_ggm3_broadcast_menu">
                <field name="BROADCAST_NAME">${getSafeHTML(brodcastName)}</field>
              </shadow>
            </value>
          </block>`),
      );
      xmlList.push(
        createElementXML(`
          <block type="event_ggm3_broadcast_and_wait">
            <value name="BROADCAST_NAME">
              <shadow type="event_ggm3_broadcast_menu">
                <field name="BROADCAST_NAME">${getSafeHTML(brodcastName)}</field>
              </shadow>
            </value>
          </block>`),
      );
      xmlList.push(
        createElementXML(`
          <block type="event_ggm3_frame_broadcast" gap="20">
            <value name="BROADCAST_NAME">
              <shadow type="event_ggm3_broadcast_menu">
                <field name="BROADCAST_NAME">${getSafeHTML(brodcastName)}</field>
              </shadow>
            </value>
          </block>`),
      );
    }

    return xmlList;
  },
);

function getBroadcastMenuFunction() {
  return function () {
    var broadcastNames = engine.getBroadcastNames();
    if (broadcastNames.length === 0) {
      return [["(No Broadcast Messages)", "none"]];
    }
    return broadcastNames.map((name) => [name, name]);
  };
}

function contextMenuFunction(options) {
  var broadcastField = this.getField("BROADCAST_NAME");
  if (broadcastField) {
    var broadcastName = broadcastField.getValue();
    // Try to get main workspace from flyout/toolbox
    var mainWorkspace = null;
    if (this.workspace && this.workspace.targetWorkspace) {
      mainWorkspace = this.workspace.targetWorkspace;
    } else if (
      this.workspace &&
      this.workspace.options &&
      this.workspace.options.parentWorkspace
    ) {
      mainWorkspace = this.workspace.options.parentWorkspace;
    } else if (window.Blockly && Blockly.getMainWorkspace) {
      mainWorkspace = Blockly.getMainWorkspace();
    }

    options.push({
      text: "Delete broadcast message",
      enabled: true,
      callback: function () {
        Blockly.confirm(
          `Delete broadcast message "${broadcastName}"?`,
          function (accepted) {
            if (accepted) {
              engine.removeBroadcastName(broadcastName);

              if (
                mainWorkspace &&
                mainWorkspace.getToolbox &&
                mainWorkspace.getToolbox()
              ) {
                mainWorkspace.getToolbox().refreshSelection();
              }
            }
          },
        );
      },
    });
  }
}

Blockly.Blocks["event_ggm3_broadcast_menu"] = {
  init: function () {
    this.jsonInit({
      message0: "%1",
      args0: [
        {
          type: "field_dropdown",
          name: "BROADCAST_NAME",
          options: getBroadcastMenuFunction(),
        },
      ],
      category: Blockly.Categories.control,
      extensions: ["output_string"],
      colour: "#bf9c00",
    });
  },
  customContextMenu: contextMenuFunction,
};

Blockly.Blocks["event_ggm3_broadcast"] = {
  init: function () {
    this.jsonInit({
      message0: "broadcast %1",
      args0: [
        {
          type: "input_value",
          name: "BROADCAST_NAME",
        },
      ],
      category: Blockly.Categories.control,
      extensions: ["shape_statement"],
      colour: "#bf9c00",
    });
  },
};

Blockly.Blocks["event_ggm3_frame_broadcast"] = {
  init: function () {
    this.jsonInit({
      message0: "broadcast %1 before next frame",
      args0: [
        {
          type: "input_value",
          name: "BROADCAST_NAME",
        },
      ],
      category: Blockly.Categories.control,
      extensions: ["shape_statement"],
      colour: "#bf9c00",
    });
  },
};

Blockly.Blocks["event_ggm3_broadcast_and_wait"] = {
  init: function () {
    this.jsonInit({
      message0: "broadcast %1 and wait",
      args0: [
        {
          type: "input_value",
          name: "BROADCAST_NAME",
        },
      ],
      category: Blockly.Categories.control,
      extensions: ["shape_statement"],
      colour: "#bf9c00",
    });
  },
};

Blockly.Blocks["event_ggm3_whenbroadcasted"] = {
  init: function () {
    this.jsonInit({
      message0: "when %1 broadcasted",
      args0: [
        {
          type: "field_dropdown",
          name: "BROADCAST_NAME",
          options: getBroadcastMenuFunction(),
        },
      ],
      category: Blockly.Categories.control,
      colour: "#bf9c00",
      extensions: ["shape_hat"],
    });
  },
  customContextMenu: contextMenuFunction,
};


/***/ }),

/***/ 7802:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var {
  compileSpriteXML,
  saveCurrentSpriteCode,
  compileAllSprites,
} = __webpack_require__(3010);

function compileSprite(sprite) {
  compileSpriteXML(sprite);
}

module.exports = {
  compileSprite,
  saveCurrentSpriteCode,
  compileAllSprites,
};


/***/ }),

/***/ 7816:
/***/ (() => {

Blockly.Blocks["operator_sign"] = {
  init: function () {
    this.jsonInit({
      message0: "Sign of %1",
      args0: [
        {
          type: "input_value",
          name: "NUM",
        },
      ],
      category: Blockly.Categories.operators,
      extensions: ["colours_operators", "output_number"],
    });
  },
};

Blockly.Blocks["operator_fixed"] = {
  init: function () {
    this.jsonInit({
      message0: "%1 to fixed %2",
      args0: [
        {
          type: "input_value",
          name: "NUM",
        },
        {
          type: "input_value",
          name: "DECIMALS",
        },
      ],
      category: Blockly.Categories.operators,
      extensions: ["colours_operators", "output_number"],
    });
  },
};

Blockly.Blocks["operator_true"] = {
  init: function () {
    this.jsonInit({
      message0: "true",
      args0: [],
      category: Blockly.Categories.operators,
      extensions: ["colours_operators", "output_boolean"],
    });
  },
};

Blockly.Blocks["operator_false"] = {
  init: function () {
    this.jsonInit({
      message0: "false",
      args0: [],
      category: Blockly.Categories.operators,
      extensions: ["colours_operators", "output_boolean"],
    });
  },
};

Blockly.Blocks["operator_nan"] = {
  init: function () {
    this.jsonInit({
      message0: "NaN",
      args0: [],
      category: Blockly.Categories.operators,
      extensions: ["colours_operators", "output_number"],
    });
  },
};

Blockly.Blocks["operator_null"] = {
  init: function () {
    this.jsonInit({
      message0: "null",
      args0: [],
      category: Blockly.Categories.operators,
      extensions: ["colours_operators", "output_string"],
    });
  },
};

Blockly.Blocks["operator_infinity"] = {
  init: function () {
    this.jsonInit({
      message0: "Infinity",
      args0: [],
      category: Blockly.Categories.operators,
      extensions: ["colours_operators", "output_number"],
    });
  },
};

Blockly.Blocks["operator_empty_string"] = {
  init: function () {
    this.jsonInit({
      message0: "empty string",
      args0: [],
      category: Blockly.Categories.operators,
      extensions: ["colours_operators", "output_string"],
    });
  },
};

Blockly.Blocks["operator_newline"] = {
  init: function () {
    this.jsonInit({
      message0: "New line character",
      args0: [],
      category: Blockly.Categories.operators,
      extensions: ["colours_operators", "output_string"],
    });
  },
};

Blockly.Blocks["operator_tostring"] = {
  init: function () {
    this.jsonInit({
      message0: "%1 to string",
      args0: [
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      category: Blockly.Categories.operators,
      extensions: ["colours_operators", "output_string"],
    });
  },
};
Blockly.Blocks["operator_tonumber"] = {
  init: function () {
    this.jsonInit({
      message0: "%1 to number",
      args0: [
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      category: Blockly.Categories.operators,
      extensions: ["colours_operators", "output_string"],
    });
  },
};
Blockly.Blocks["operator_toboolean"] = {
  init: function () {
    this.jsonInit({
      message0: "%1 to boolean",
      args0: [
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      category: Blockly.Categories.operators,
      extensions: ["colours_operators", "output_string"],
    });
  },
};

Blockly.Blocks["operator_outputif"] = {
  init: function () {
    this.jsonInit({
      message0: "If %1 output %2 else output %3",
      args0: [
        {
          type: "input_value",
          name: "CONDITION",
          check: "Boolean",
        },
        {
          type: "input_value",
          name: "PASS_OUTPUT",
        },
        {
          type: "input_value",
          name: "FAIL_OUTPUT",
        },
      ],
      category: Blockly.Categories.operators,
      extensions: ["colours_operators", "output_string"],
    });
  },
};

Blockly.Blocks["operator_mathop"] = {
  /**
   * Block for "advanced" math ops on a number.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.OPERATORS_MATHOP,
      args0: [
        {
          type: "field_dropdown",
          name: "OPERATOR",
          options: [
            [Blockly.Msg.OPERATORS_MATHOP_ABS, "abs"],
            [Blockly.Msg.OPERATORS_MATHOP_FLOOR, "floor"],
            [Blockly.Msg.OPERATORS_MATHOP_CEILING, "ceiling"],
            [Blockly.Msg.OPERATORS_MATHOP_SQRT, "sqrt"],
            [Blockly.Msg.OPERATORS_MATHOP_SIN, "sin"],
            [Blockly.Msg.OPERATORS_MATHOP_COS, "cos"],
            [Blockly.Msg.OPERATORS_MATHOP_TAN, "tan"],
            [Blockly.Msg.OPERATORS_MATHOP_ASIN, "asin"],
            [Blockly.Msg.OPERATORS_MATHOP_ACOS, "acos"],
            [Blockly.Msg.OPERATORS_MATHOP_ATAN, "atan"],
            [Blockly.Msg.OPERATORS_MATHOP_LN, "ln"],
            [Blockly.Msg.OPERATORS_MATHOP_LOG, "log"],
            [Blockly.Msg.OPERATORS_MATHOP_EEXP, "e ^"],
            [Blockly.Msg.OPERATORS_MATHOP_10EXP, "10 ^"],
          ],
        },
        {
          type: "input_value",
          name: "NUM",
        },
      ],
      category: Blockly.Categories.operators,
      extensions: ["colours_operators", "output_number"],
    });
  },
};

Blockly.Blocks["operator_joinstring"] = {
  init: function () {
    this.jsonInit({
      message0: "join %1 %2",
      args0: [
        {
          type: "input_value",
          name: "VALUE1",
        },
        {
          type: "input_value",
          name: "VALUE2",
        },
      ],
      category: Blockly.Categories.operators,
      extensions: ["colours_operators", "output_string"],
    });
  },
};

Blockly.Blocks["operator_stringlength"] = {
  init: function () {
    this.jsonInit({
      message0: "length of %1",
      args0: [
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      category: Blockly.Categories.operators,
      extensions: ["colours_operators", "output_number"],
    });
  },
};

Blockly.Blocks["operator_stringtrim"] = {
  init: function () {
    this.jsonInit({
      message0: "trim %1",
      args0: [
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      category: Blockly.Categories.operators,
      extensions: ["colours_operators", "output_string"],
    });
  },
};

Blockly.Blocks["operator_stringlowercase"] = {
  init: function () {
    this.jsonInit({
      message0: "%1 to lower case",
      args0: [
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      category: Blockly.Categories.operators,
      extensions: ["colours_operators", "output_string"],
    });
  },
};

Blockly.Blocks["operator_stringuppercase"] = {
  init: function () {
    this.jsonInit({
      message0: "%1 to upper case",
      args0: [
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      category: Blockly.Categories.operators,
      extensions: ["colours_operators", "output_string"],
    });
  },
};

Blockly.Blocks["operator_js_mod"] = {
  init: function () {
    this.jsonInit({
      message0: "%1 % %2",
      args0: [
        {
          type: "input_value",
          name: "NUM1",
        },
        {
          type: "input_value",
          name: "NUM2",
        },
      ],
      category: Blockly.Categories.operators,
      extensions: ["colours_operators", "output_number"],
    });
  },
};

Blockly.Blocks["operator_scratch_mod"] = {
  init: function () {
    this.jsonInit({
      message0: "%1 mod (scratch) %2",
      args0: [
        {
          type: "input_value",
          name: "NUM1",
        },
        {
          type: "input_value",
          name: "NUM2",
        },
      ],
      category: Blockly.Categories.operators,
      extensions: ["colours_operators", "output_number"],
    });
  },
};


/***/ }),

/***/ 8190:
/***/ ((module) => {

// Use a shared Float32Array if none is provided to avoid garbage collection
const MatrixArrayType =
  typeof Float32Array !== "undefined" ? Float32Array : Array;

function calculateMatrix(sprite, dst) {
  // 1. Setup: Ensure we have a destination array
  if (!dst) {
    dst = new MatrixArrayType(16);
  }

  // --- STEP 1: GATHER VARIABLES ---
  const x = sprite.x;
  const y = sprite.y;
  const rotation = sprite.rotation;

  // Default to 0 if skew properties don't exist on the sprite
  // These should be in RADIANS, just like rotation
  const skewX = sprite.skewX || 0;
  const skewY = sprite.skewY || 0;

  const width = sprite.textureWidth * sprite.scaleX;
  const height = sprite.textureHeight * sprite.scaleY;

  const pivotU = sprite.rotationCenterX / sprite.textureWidth;
  const pivotV = sprite.rotationCenterY / sprite.textureHeight;

  // --- STEP 2: CALCULATE 2D MATH ---
  const c = Math.cos(rotation);
  const s = Math.sin(rotation);

  // Calculate Skew Offsets (Tangent tells us how much to slide per unit)
  const tanX = Math.tan(skewX);
  const tanY = Math.tan(skewY);

  // 2a. Create the Local Vectors (Scale + Skew)
  // Local X-Axis (The "Right" direction)
  // If SkewY is active, the X-axis points slightly up or down
  const localX_x = width;
  const localX_y = width * tanY;

  // Local Y-Axis (The "Down" direction)
  // If SkewX is active, the Y-axis points slightly left or right
  const localY_x = height * tanX;
  const localY_y = height;

  // 2b. Rotate the Vectors (Apply Rotation)
  // Formula: x' = x*cos - y*sin, y' = x*sin + y*cos

  const rightX = localX_x * c - localX_y * s;
  const rightY = localX_x * s + localX_y * c;

  const downX = localY_x * c - localY_y * s;
  const downY = localY_x * s + localY_y * c;

  // 2c. Calculate Final Position (Translate)
  // Start at sprite.x,y and subtract the rotated/skewed pivot offset
  const posX = x - (rightX * pivotU + downX * pivotV);
  const posY = y - (rightY * pivotU + downY * pivotV);

  // --- STEP 3: FILL THE MATRIX ---

  // Column 0: X-Axis
  dst[0] = rightX;
  dst[1] = rightY;
  dst[2] = 0;
  dst[3] = 0;

  // Column 1: Y-Axis
  dst[4] = downX;
  dst[5] = downY;
  dst[6] = 0;
  dst[7] = 0;

  // Column 2: Z-Axis
  dst[8] = 0;
  dst[9] = 0;
  dst[10] = 1;
  dst[11] = 0;

  // Column 3: World Position
  dst[12] = posX;
  dst[13] = posY;
  dst[14] = 0;
  dst[15] = 1;

  return dst;
}

module.exports = calculateMatrix;


/***/ }),

/***/ 8195:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var JavascriptTranslation = {};
var utilFunctions = __webpack_require__(9547);
var outputBlocks = __webpack_require__(7147);

outputBlocks.push("data_variable");
JavascriptTranslation["data_variable"] = function (jsonblock, utils, options) {
  var VARIABLE = utils.getFieldVariableID(jsonblock, "VARIABLE");
  return `sprite.variables[${JSON.stringify(VARIABLE)}]`;
};

JavascriptTranslation["data_changevariableby"] = function (
  jsonblock,
  utils,
  options,
) {
  var VARIABLE = utils.getFieldVariableID(jsonblock, "VARIABLE");
  var VALUE = utils.getInput(jsonblock, "VALUE", options, "null");
  return `sprite.variables[${JSON.stringify(VARIABLE)}] = (+(sprite.variables[${JSON.stringify(VARIABLE)}]) || 0) + (+(${VALUE}) || 0);`;
};

JavascriptTranslation["data_setvariableto"] = function (
  jsonblock,
  utils,
  options,
) {
  var VARIABLE = utils.getFieldVariableID(jsonblock, "VARIABLE");
  var VALUE = utils.getInput(jsonblock, "VALUE", options, "null");
  return `sprite.variables[${JSON.stringify(VARIABLE)}] = ${VALUE};`;
};

module.exports = JavascriptTranslation;


/***/ }),

/***/ 8289:
/***/ ((module) => {

module.exports = {
  element: "div",
  className: "costumePivotContainer",
  gid: "costumePivotContainer",
  children: [
    {
      element: "div",
      className: "costumesInPivotContainer",
      gid: "costumesInPivotContainer",
    },
    {
      element: "div",
      className: "pivotEditor",
      gid: "pivotEditor",
      children: [
        {
          element: "div",
          className: "pivotEditorContainer",
          gid: "pivotEditorContainer",
          children: [
            {
              element: "div",
              className: "pivotEditorImageContainer",
              gid: "pivotEditorImageContainer",
              children: [
                {
                  element: "img",
                  gid: "pivotEditorImage",
                },
                {
                  element: "div",
                  gid: "pivotEditorDot",
                  className: "pivotEditorDot",
                },
              ],
            },
          ],
        },
        {
          element: "div",
          className: "pivotEditorMenuBar",
          gid: "pivotEditorMenuBar",
          children: [
            {
              element: "span",
              style: {
                fontWeight: "bold",
              },
              textContent: "X: ",
            },
            {
              element: "input",
              className: "pivotEditorMenuInput",
              type: "number",
              gid: "pivotEditorXInput",
            },
            {
              element: "span",
              style: {
                fontWeight: "bold",
              },
              textContent: "Y: ",
            },
            {
              element: "input",
              className: "pivotEditorMenuInput",
              type: "number",
              gid: "pivotEditorYInput",
            },
            {
              element: "span",
              style: {
                fontWeight: "bold",
              },
              textContent: "Zoom: ",
            },
            {
              element: "input",
              type: "range",
              min: 1,
              max: 500,
              gid: "pivotEditorZoomInput",
            },
            {
              element: "button",
              textContent: "Center image",
              className: "greyButtonStyle",
              gid: "centerImagePivotEditor",
            },
          ],
        },
      ],
    },
  ],
};


/***/ }),

/***/ 8337:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var JavascriptTranslation = {};
var utilFunctions = __webpack_require__(9547);
var outputBlocks = __webpack_require__(7147);

outputBlocks.push("engine_framerate");
JavascriptTranslation["engine_framerate"] = function (
  jsonblock,
  utils,
  options,
) {
  return "(engine.frameRate)";
};

JavascriptTranslation["engine_framerate_to"] = function (
  jsonblock,
  utils,
  options,
) {
  var FPS = utils.getInput(jsonblock, "FPS", options, "0");
  return `engine.setFramerate(${FPS});`;
};

module.exports = JavascriptTranslation;


/***/ }),

/***/ 8355:
/***/ ((module) => {

module.exports = [];


/***/ }),

/***/ 8366:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var JavascriptTranslation = {};
var utilFunctions = __webpack_require__(9547);

JavascriptTranslation["math_number"] = function (jsonblock, utils, options) {
  var NUM = utils.getField(jsonblock, "NUM");
  return JSON.stringify(+NUM || 0);
};

JavascriptTranslation["math_angle"] = function (jsonblock, utils, options) {
  var NUM = utils.getField(jsonblock, "NUM");
  return JSON.stringify(+NUM || 0);
};

JavascriptTranslation["text"] = function (jsonblock, utils, options) {
  var TEXT = utils.getField(jsonblock, "TEXT");
  return JSON.stringify(TEXT);
};

module.exports = JavascriptTranslation;


/***/ }),

/***/ 8570:
/***/ ((module) => {

function arrayBufferToDataURL(arrayBuffer, mimeType) {
  return new Promise((resolve, reject) => {
    const blob = new Blob([arrayBuffer], { type: mimeType });

    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(blob);
  });
}

async function dataURLToArrayBuffer(dataURL) {
  var response = await fetch(dataURL);
  var arrayBuffer = await response.arrayBuffer();
  return arrayBuffer;
}

module.exports = {
  arrayBufferToDataURL,
  dataURLToArrayBuffer,
};


/***/ }),

/***/ 9009:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Sprite = __webpack_require__(2242);

class SpriteEffects {
  constructor(sprite) {
    this.sprite = sprite;
    this.reset();
  }

  reset() {
    this.waveTime = 0;
    this.waveXTime = 0;
    this.waveYTime = 0;
    this.waveX = 0;
    this.waveY = 0;
    this.ribbonShiftX = 0;
    this.ribbonShiftY = 0;
    this.brightness = 0;
  }

  set waveTime(v) {
    var value = +v || 0;
    if (value < 0) value = 0;

    this._waveTime = value;
  }
  get waveTime() {
    return this._waveTime;
  }

  set waveXTime(v) {
    var value = +v || 0;
    if (value < 0) value = 0;

    this._waveXTime = value;
  }
  get waveXTime() {
    return this._waveXTime;
  }

  set waveYTime(v) {
    var value = +v || 0;
    if (value < 0) value = 0;

    this._waveYTime = value;
  }
  get waveYTime() {
    return this._waveYTime;
  }

  set waveX(v) {
    var value = +v || 0;
    if (value < 0) value = 0;

    this._waveX = value;
  }
  get waveX() {
    return this._waveX;
  }

  set waveY(v) {
    var value = +v || 0;
    if (value < 0) value = 0;

    this._waveY = value;
  }
  get waveY() {
    return this._waveY;
  }

  set ribbonShiftX(v) {
    this._ribbonShiftX = +v || 0;
    this._ribbonShiftX = this._ribbonShiftX % 100;
  }
  get ribbonShiftX() {
    return this._ribbonShiftX;
  }

  set ribbonShiftY(v) {
    this._ribbonShiftY = +v || 0;
    this._ribbonShiftY = this._ribbonShiftY % 100;
  }
  get ribbonShiftY() {
    return this._ribbonShiftY;
  }

  set brightness(v) {
    var value = +v || 0;
    if (value < -100) value = -100;
    if (value > 100) value = 100;

    this._brightness = value;
  }
  get brightness() {
    return this._brightness;
  }

  getRenderableEffects() {
    // Get costume scale for ribbon shift scaling
    var costumeScale = 1;
    try {
      if (
        this.sprite &&
        this.sprite.costume &&
        typeof this.sprite.costume.currentScale === "number" &&
        this.sprite.costume.currentScale > 0
      ) {
        costumeScale = this.sprite.costume.currentScale;
      }
    } catch (e) {
      // If any error accessing costume, just use default scale
    }

    return {
      iTime: this.waveTime,
      u_wave_xwave: this.waveX,
      u_wave_ywave: this.waveY,
      u_wave_xtime: this.waveXTime,
      u_wave_ytime: this.waveYTime,
      u_ribbonShiftX: this.ribbonShiftX / 100,
      u_ribbonShiftY: this.ribbonShiftY / 100,
      u_brightness: this.brightness / 100,
    };
  }
}
module.exports = SpriteEffects;


/***/ }),

/***/ 9291:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var elements = __webpack_require__(7255);
var AElement = __webpack_require__(3759);

var cssContent = __webpack_require__(735);

elements.appendElementsFromJSON(document.body, [
  {
    element: "style",
    textContent: cssContent,
  },
  {
    element: "style",
    textContent: "[hidden] {display: none;}", //Fix for hidden attribute.
  },
  {
    element: "div",
    className: "appContainer",
    children: [
      __webpack_require__(2199), //Menu bar
      {
        element: "div",
        className: "panelContainer",
        children: [
          __webpack_require__(2290), //Left panel
          __webpack_require__(3989), //Right panel
          __webpack_require__(4170),
        ],
      },
      __webpack_require__(2075),
    ],
  },
]);


/***/ }),

/***/ 9335:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var elements = __webpack_require__(7255);
var AElement = __webpack_require__(3759);
var engine = __webpack_require__(9940);
var canvas = elements.getGPId("projectCanvas");
var tabs = __webpack_require__(3618);

var isFullscreen = false;
var fullscreenModeContainer = elements.getGPId("fullscreenModeContainer");
var projectControls = elements.getGPId("projectControls");
var projectContainer = elements.getGPId("projectContainer");
var fullscreenModeContainerMain = elements.getGPId(
  "fullscreenModeContainerMain",
);

var gameViewportStyles = document.createElement("style");
document.body.append(gameViewportStyles);

function updateGameViewportStyles() {
  gameViewportStyles.textContent = `:root { --game-viewport-width: ${engine.gameWidth}px; --game-viewport-height: ${engine.gameHeight}px; }`;
}

function switchFullscreenMode() {
  canvas.remove();
  projectControls.remove();
  fullscreenModeContainerMain.hidden = !isFullscreen;
  if (isFullscreen) {
    fullscreenModeContainer.append(projectControls);
    fullscreenModeContainer.append(canvas);
    function handleResize() {
      var controlsRect = projectControls.getBoundingClientRect();
      var scale =
        (window.innerHeight - controlsRect.height) / engine.gameHeight;
      var scaleHorizontal = window.innerWidth / engine.gameWidth;
      if (scale > scaleHorizontal) {
        scale = scaleHorizontal;
      }
      canvas.style.width = scale * engine.gameWidth + "px";
      canvas.style.height = scale * engine.gameHeight + "px";
      engine.screenScale = scale;
      engine.updateCanvasSize();
    }
    window.onresize = handleResize;
    handleResize();
    tabs.hideEverything();
  } else {
    projectContainer.append(projectControls);
    projectContainer.append(canvas);
    window.onresize = function () {};
    canvas.style.width = "unset";
    canvas.style.height = "unset";
    engine.screenScale = 1;
    engine.updateCanvasSize();
    tabs.updateTabs();
  }
}

switchFullscreenMode();
elements.setInnerJSON(projectControls, [
  {
    element: "div",
    className: "projectButton",
    title: "Start/play game",
    children: [
      {
        element: "img",
        src: "icons/playcircle.svg",
        className: "projectButtonImg",
      },
    ],
    eventListeners: [
      {
        event: "click",
        func: function () {
          engine.startGame();
        },
      },
    ],
  },
  {
    element: "div",
    className: "projectButton",
    title: "Stop/end game",
    children: [
      {
        element: "img",
        src: "icons/stopcircle.svg",
        className: "projectButtonImg",
      },
    ],
    eventListeners: [
      {
        event: "click",
        func: function () {
          engine.stopGame();
        },
      },
    ],
  },
  {
    element: "div",
    style: {
      marginRight: "auto",
    },
  },
  {
    element: "div",
    className: "projectButton",
    GPWhenCreated: (elm) => {
      if (engine.editMode) {
        elements.setInnerJSON(elm, [
          {
            element: "img",
            src: "icons/grab.svg",
            className: "projectButtonImg",
          },
        ]);
      } else {
        elements.setInnerJSON(elm, [
          {
            element: "img",
            src: "icons/nograb.svg",
            className: "projectButtonImg",
          },
        ]);
      }
    },
    title: "Toggle dragging sprites",
    eventListeners: [
      {
        event: "click",
        func: function () {
          if (engine.editMode) {
            engine.turnOffEditing();
          } else {
            engine.turnOnEditing();
          }
          if (engine.editMode) {
            elements.setInnerJSON(this, [
              {
                element: "img",
                src: "icons/grab.svg",
                className: "projectButtonImg",
              },
            ]);
          } else {
            elements.setInnerJSON(this, [
              {
                element: "img",
                src: "icons/nograb.svg",
                className: "projectButtonImg",
              },
            ]);
          }
        },
      },
    ],
  },
  {
    element: "div",
    className: "projectButton",
    GPWhenCreated: (elm) => {
      if (isFullscreen) {
        elements.setInnerJSON(elm, [
          {
            element: "img",
            src: "icons/fullscreen-exit.svg",
            className: "projectButtonImg",
          },
        ]);
      } else {
        elements.setInnerJSON(elm, [
          {
            element: "img",
            src: "icons/fullscreen.svg",
            className: "projectButtonImg",
          },
        ]);
      }
    },
    title: "Toggle fullscreen",
    eventListeners: [
      {
        event: "click",
        func: function () {
          isFullscreen = !isFullscreen;
          switchFullscreenMode();
          if (isFullscreen) {
            elements.setInnerJSON(this, [
              {
                element: "img",
                src: "icons/fullscreen-exit.svg",
                className: "projectButtonImg",
              },
            ]);
          } else {
            elements.setInnerJSON(this, [
              {
                element: "img",
                src: "icons/fullscreen.svg",
                className: "projectButtonImg",
              },
            ]);
          }
        },
      },
    ],
  },
]);
var projectMouseCoordinates = elements.getGPId("projectMouseCoordinates");

function getMousePosition(event, onElement, size) {
  var client = onElement.getBoundingClientRect();

  var relativeX = event.x - client.x;
  var relativeY = event.y - client.y;

  var scaleX = client.width / size[0];
  var realX = relativeX * scaleX;

  var scaleY = client.height / size[1];
  var realY = relativeY * scaleY;

  if (realX < 0) {
    realX = 0;
  }
  if (realY < 0) {
    realY = 0;
  }

  if (realX > size[0]) {
    realX = size[0];
  }
  if (realY > size[1]) {
    realY = size[1];
  }

  var pos = {
    x: realX,
    y: realY,
  };
  return pos;
}

function updateCoordinates() {
  projectMouseCoordinates.textContent = `X: ${Math.round(engine.mouseMask.x)} Y: ${Math.round(engine.mouseMask.y)} Down: ${engine.mouseMask.isDown}`;
}

document.addEventListener("mousemove", (event) => {
  var pos = getMousePosition(event, canvas, [canvas.width, canvas.height]);
  engine.changeMousePosition(pos.x, pos.y);
  updateCoordinates();
});

canvas.addEventListener("mousedown", (event) => {
  var pos = getMousePosition(event, canvas, [canvas.width, canvas.height]);
  engine.changeMousePosition(pos.x, pos.y);
  engine.changeMouseDown(true);
  updateCoordinates();
  event.preventDefault();
});

document.addEventListener("mouseup", (event) => {
  var pos = getMousePosition(event, canvas, [canvas.width, canvas.height]);
  engine.changeMousePosition(pos.x, pos.y);
  engine.changeMouseDown(false);
  updateCoordinates();
});

document.addEventListener("keydown", (event) => {
  if (document.activeElement == document.body) {
    engine.changeKeyPressed(event.key, true);
    event.preventDefault();
  }
});

document.addEventListener("keyup", (event) => {
  engine.changeKeyPressed(event.key, false);
});

updateCoordinates();

updateGameViewportStyles();

engine.on(engine.RESOLUTION_UPDATED, () => {
  updateGameViewportStyles();
});


/***/ }),

/***/ 9366:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var elements = __webpack_require__(7255);
var AElement = __webpack_require__(3759);

module.exports = {
  addAppMenu: function (id, titleChildren, items) {
    var menuId = "menu-" + id.toLowerCase().replace(/\s+/g, "-");
    var dropdownId = menuId + "-dropdown";

    var menuJSON = [
      {
        element: "div",
        className: "menuParentMain",
        children: [
          {
            element: "div",
            className: "menuBarItem menuParent",
            gid: menuId,
            children: [
              {
                element: "div",
                className: "menuBarItemLabel",
                children: titleChildren,
              },
              {
                element: "div",
                className: "menuDropdown",
                gid: dropdownId,
                hidden: true,
                children: items.map(function (it, idx) {
                  var child = {
                    element: "div",
                    className: "menuDropdownItem",
                    gid: dropdownId + "-item-" + idx,
                  };
                  if (it.icon) {
                    child.children = [
                      { element: "img", src: it.icon, className: "menuIcon" },
                      {
                        element: "div",
                        className: "menuDropdownItemLabel",
                        textContent: it.label,
                      },
                    ];
                  } else {
                    child.textContent = it.label;
                  }
                  return child;
                }),
              },
            ],
          },
        ],
      },
    ];

    var newEls = elements.createElementsFromJSON(menuJSON);
    var menusContainer = elements.getGPId("menuBarMenus");
    for (var ne of newEls) menusContainer.append(ne);

    var parent = elements.getGPId(menuId);
    var dropdown = elements.getGPId(dropdownId);

    function closeDropdown() {
      if (dropdown) dropdown.hidden = true;
      parent.classList.remove("open");
    }

    parent.addEventListener("click", function (ev) {
      ev.stopPropagation();
      var wasHidden = dropdown.hidden;
      document.querySelectorAll(".menuDropdown").forEach(function (d) {
        d.hidden = true;
        var p = d.parentElement;
        if (p) p.classList.remove("open");
      });
      dropdown.hidden = !wasHidden;
      if (!dropdown.hidden) parent.classList.add("open");
      else parent.classList.remove("open");
    });

    items.forEach(function (it, idx) {
      var itemEl = elements.getGPId(dropdownId + "-item-" + idx);
      if (!itemEl) return;
      itemEl.addEventListener("click", function (ev) {
        ev.stopPropagation();
        closeDropdown();
        try {
          if (typeof it.action === "function") it.action();
        } catch (e) {
          console.error("Menu action error:", e);
        }
      });
    });

    document.addEventListener("click", function () {
      closeDropdown();
    });

    return { id: menuId, dropdownId: dropdownId };
  },
};


/***/ }),

/***/ 9421:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var elements = __webpack_require__(7255);
var AElement = __webpack_require__(3759);

var soundsContainer = elements.getGPId("soundsContainer");
var soundsHeaderContainer = elements.getGPId("soundsHeaderContainer");
var soundsSelectorContainer = elements.getGPId("soundsSelectorContainer");

var { makeSortable } = __webpack_require__(2088);

var deps = {
  markAsDirty: () => {},
};

function reloadSounds(spr, reloadTabCallback = function () {}) {
  elements.setInnerJSON(soundsHeaderContainer, [
    {
      element: "button",
      className: "greyButtonStyle",
      textContent: "Import Sound",
      style: {
        marginRight: "2px",
      },
      eventListeners: [
        {
          event: "click",
          func: function () {
            var input = document.createElement("input");
            input.type = "file";
            input.accept = ".mp3, .webm, .ogg, .flac, .wav";
            input.multiple = true;
            input.onchange = async function () {
              if (input.files[0]) {
                var p = [];
                for (var _file of input.files) {
                  function load(file) {
                    return new Promise((resolve) => {
                      var reader = new FileReader();
                      reader.onload = async function () {
                        input.value = "";
                        input.remove();

                        try {
                          var sound = await spr.addSound(reader.result);
                          sound.mimeType = file.type;
                          sound.name = file.name
                            .split(".")
                            .slice(0, file.name.split(".").length - 1)
                            .join(".")
                            .trim();
                          spr.ensureUniqueSoundNames();
                          resolve();
                          deps.markAsDirty();
                          reloadSounds(spr);
                        } catch (e) {
                          window.alert(e);
                        }
                      };
                      reader.readAsDataURL(file);
                    });
                  }
                  p.push(load(_file));
                }
                Promise.all(p).then(() => {
                  reloadTabCallback(spr);
                  deps.markAsDirty();
                });
              } else {
                input.value = "";
                input.remove();
              }
            };
            input.click();
          },
        },
      ],
    },
  ]);
  if (spr.sounds.length < 1) {
    elements.setInnerJSON(soundsSelectorContainer, [
      {
        element: "span",
        textContent: "This sprite has no sounds.",
        style: {
          fontWeight: "bold",
          textDecoration: "underline",
        },
      },
    ]);
  } else {
    elements.setInnerJSON(
      soundsSelectorContainer,
      spr.sounds.map((sound, i) => {
        return {
          element: "div",
          className: "soundContainer",
          children: [
            {
              element: "audio",
              controls: true,
              src: sound.src,
              style: {
                objectFit: "contain",
              },
            },
            {
              element: "br",
            },
            {
              element: "div",
              style: {
                display: "flex",
                flexDirection: "row",
              },
              children: [
                {
                  element: "input",
                  value: sound.name,
                  className: "selectedCostumeInput",
                  eventListeners: [
                    {
                      event: "change",
                      func: function () {
                        sound.name = this.value.trim();
                        spr.ensureUniqueSoundNames();
                        reloadSounds(spr);
                        reloadTabCallback(spr);
                        deps.markAsDirty();
                      },
                    },
                  ],
                },
                {
                  element: "button",
                  className: "greyButtonStyle",
                  style: {
                    marginRight: "2px",
                    fontSize: "12px",
                  },
                  GPWhenCreated: function (elm) {
                    if (sound.willPreload) {
                      elm.textContent = "Disable preloading";
                    } else {
                      elm.textContent = "Enable preloading";
                    }
                  },
                  eventListeners: [
                    {
                      event: "click",
                      func: function () {
                        sound.willPreload = !sound.willPreload;
                        if (sound.willPreload) {
                          this.textContent = "Disable preloading";
                        } else {
                          this.textContent = "Enable preloading";
                        }
                        deps.markAsDirty();
                      },
                    },
                  ],
                },
                {
                  element: "button",
                  className: "greyButtonStyle",
                  textContent: "Load",
                  style: {
                    marginRight: "2px",
                    fontSize: "12px",
                  },
                  eventListeners: [
                    {
                      event: "click",
                      func: function () {
                        sound.loadSound();
                      },
                    },
                  ],
                },
                {
                  element: "button",
                  className: "greyButtonStyle",
                  textContent: "Deload",
                  style: {
                    marginRight: "2px",
                    fontSize: "12px",
                  },
                  eventListeners: [
                    {
                      event: "click",
                      func: function () {
                        sound.deloadSound();
                      },
                    },
                  ],
                },
                {
                  element: "button",
                  className: "greyButtonStyle",
                  textContent: "Delete",
                  style: {
                    marginRight: "2px",
                    fontSize: "12px",
                  },
                  eventListeners: [
                    {
                      event: "click",
                      func: function () {
                        spr.deleteSound(sound);
                        reloadSounds(spr);
                        reloadTabCallback(spr);
                        deps.markAsDirty();
                      },
                    },
                  ],
                },
              ],
            },
          ],
        };
      }),
    );

    makeSortable(
      soundsSelectorContainer,
      ".soundContainer",
      (oldIndex, newIndex) => {
        // This callback runs only when the user releases the mouse
        // and the order has actually changed.

        if (oldIndex === newIndex) return;

        // 1. Move data in the engine
        var soundToMove = spr.sounds[oldIndex];
        spr.sounds.splice(oldIndex, 1);
        spr.sounds.splice(newIndex, 0, soundToMove);

        spr.ensureUniqueSoundNames();

        reloadSounds(spr);
        reloadTabCallback(spr);
        deps.markAsDirty();
      },
    );
  }
}

module.exports = {
  reloadSounds,
  deps
};


/***/ }),

/***/ 9436:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var elements = __webpack_require__(7255);
var AElement = __webpack_require__(3759);
window.ScratchBlocks = window.Blockly;

// Disable flyout checkboxes early so initial flyout blocks don't get checkboxes.
try {
  if (window.Blockly && Blockly.Block && Blockly.Block.prototype) {
    Blockly.Block.prototype.hasCheckboxInFlyout = function () {
      return false;
    };
  }
  if (
    window.Blockly &&
    Blockly.VerticalFlyout &&
    Blockly.VerticalFlyout.prototype
  ) {
    Blockly.VerticalFlyout.prototype.createCheckbox_ = function () {
      // no-op
    };
  }
} catch (e) {
  console.warn("Unable to override Blockly flyout checkbox behavior:", e);
}

var blocklyDiv = elements.getGPId("blocklyDiv");

var toolboxGenerator = __webpack_require__(5371);
var dialogs = __webpack_require__(269);
var customBlocks = __webpack_require__(4043);

var workspace = null;

function getCurrentWorkspace() {
  return workspace;
}

function createFreshWorkspace(spr) {
  if (workspace) {
    workspace.dispose();
  }
  if (spr) {
    var toolbox = elements.createElementsFromJSON([
      {
        element: "xml",
        dangerouslySetInnerHTML: toolboxGenerator(spr.x, spr.y),
      },
    ])[0];
  } else {
    var toolbox = elements.createElementsFromJSON([
      {
        element: "xml",
        dangerouslySetInnerHTML: toolboxGenerator(),
      },
    ])[0];
  }
  workspace = Blockly.inject(blocklyDiv, {
    comments: true,
    disable: false,
    collapse: false,
    media: "../media/",
    readOnly: false,
    rtl: false,
    scrollbars: true,
    toolbox,
    //toolboxPosition: "side",
    //horizontalLayout: "start",
    trashcan: false,
    sounds: false,
    zoom: {
      controls: true,
      wheel: true,
      startScale: 0.75,
      maxScale: 4,
      minScale: 0.25,
      scaleSpeed: 1.1,
    },
    colours: {
      workspace: "#7d7d7d",
      flyout: "#787878",
      toolbox: "#7d7d7d",
      toolboxSelected: "#3d3d3d",
      scrollbar: "#CECDCE",
      scrollbarHover: "#CECDCE",
      insertionMarker: "#000000",
      insertionMarkerOpacity: 0.2,
      fieldShadow: "rgba(255, 255, 255, 0.3)",
      dragShadowOpacity: 0.6,
    },
    grid: {
      spacing: 40,
      length: 2,
      colour: "#ddd",
    },
  });
  // Create an SVG filter for error glow (red) and store its id on workspace.options
  try {
    var parentSvg = workspace.getParentSvg && workspace.getParentSvg();
    var defs =
      parentSvg && parentSvg.querySelector && parentSvg.querySelector("defs");
    if (defs && Blockly && Blockly.utils && Blockly.utils.createSvgElement) {
      var errId = "blocklyErrorGlowFilter" + String(Math.random()).slice(2);
      var f = Blockly.utils.createSvgElement(
        "filter",
        { id: errId, height: "160%", width: "180%", y: "-30%", x: "-40%" },
        defs,
      );
      // Use a moderate blur for the error glow to make it visible but not oversized.
      var stdDev =
        typeof Blockly.Colours.stackGlowSize === "number"
          ? Math.max(1, Blockly.Colours.stackGlowSize / 1.5)
          : 2.5;
      Blockly.utils.createSvgElement(
        "feGaussianBlur",
        { in: "SourceGraphic", stdDeviation: stdDev },
        f,
      );
      var comp = Blockly.utils.createSvgElement(
        "feComponentTransfer",
        { result: "outBlur" },
        f,
      );
      Blockly.utils.createSvgElement(
        "feFuncA",
        { type: "table", tableValues: "0" + " 1".repeat(16) },
        comp,
      );
      // Increase flood opacity to make the glow more visible and thicker.
      Blockly.utils.createSvgElement(
        "feFlood",
        { "flood-color": "#ff0000", "flood-opacity": 1, result: "outColor" },
        f,
      );
      Blockly.utils.createSvgElement(
        "feComposite",
        { in: "outColor", in2: "outBlur", operator: "in", result: "outGlow" },
        f,
      );
      Blockly.utils.createSvgElement(
        "feComposite",
        { in: "SourceGraphic", in2: "outGlow", operator: "over" },
        f,
      );
      workspace.options.errorGlowFilterId = errId;
    }
  } catch (e) {
    console.warn("Could not create error glow filter for Blockly workspace", e);
  }

  var flyoutWorkspace = workspace.getFlyout().getWorkspace();
  Blockly.Procedures.externalProcedureDefCallback = function (a, b) {
    customBlocks.showCustomBlockDialog(a, b, workspace);
  };
  var procButtonCallback = () => {
    Blockly.Procedures.createProcedureDefCallback_(workspace);
  };
  flyoutWorkspace.registerButtonCallback(
    "MAKE_A_PROCEDURE",
    procButtonCallback,
  );
}

Blockly.alert = function (msg, callback) {
  dialogs.alert(msg).then(callback);
};
Blockly.prompt = function (msg, defaultValue, callback) {
  dialogs.prompt(msg, defaultValue).then(callback);
};
Blockly.confirm = function (msg, callback) {
  dialogs.confirm(msg).then(callback);
};

module.exports = {
  getCurrentWorkspace,
  createFreshWorkspace,
};


/***/ }),

/***/ 9483:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var elements = __webpack_require__(7255);
var AElement = __webpack_require__(3759);
var dialogs = __webpack_require__(269);
__webpack_require__(9291);
__webpack_require__(1097);
__webpack_require__(4234);
__webpack_require__(9335);
__webpack_require__(2498);
__webpack_require__(7156);
__webpack_require__(5939);

/***/ }),

/***/ 9547:
/***/ ((module) => {

var utilFunctions = {
  startThreadStack: function (blockjson) {
    return `var thread = sprite.createThread(${JSON.stringify(blockjson.id)});try {${utilFunctions.aliveCheck(blockjson)}`;
  },
  endThreadStack: function (blockjson) {
    return `thread.stop();}catch(e){thread.hadError = true;thread.output = e;thread.stop();return thread;}`;
  },
  stopThisThread: function (blockjson) {
    return `thread.stop();`;
  },
  threadWaitFrame: function (blockjson) {
    return `await thread.waitForNextFrame();`;
  },
  aliveCheck: function (blockjson) {
    return `try{if (!thread.running) {thread.stop();return thread;}}catch(e){}`;
  },
};
module.exports = utilFunctions;


/***/ }),

/***/ 9766:
/***/ (() => {

Blockly.Blocks["loader_costumeisloaded"] = {
  init: function () {
    this.jsonInit({
      message0: "Is costume %1 loaded?",
      args0: [
        {
          type: "input_value",
          name: "COSTUME",
        },
      ],
      colour: "#0066a1",
      extensions: ["output_boolean"],
    });
  },
};

Blockly.Blocks["loader_loadcostume"] = {
  init: function () {
    this.jsonInit({
      message0: "Load costume %1",
      args0: [
        {
          type: "input_value",
          name: "COSTUME",
        },
      ],
      colour: "#0066a1",
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["loader_deloadcostume"] = {
  init: function () {
    this.jsonInit({
      message0: "Deload costume %1",
      args0: [
        {
          type: "input_value",
          name: "COSTUME",
        },
      ],
      colour: "#0066a1",
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["loader_rendercostumescale"] = {
  init: function () {
    this.jsonInit({
      message0: "Set costume %1 to render at scale %2",
      args0: [
        {
          type: "input_value",
          name: "COSTUME",
        },
        {
          type: "input_value",
          name: "SCALE",
        },
      ],
      colour: "#0066a1",
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["loader_setrenderscale"] = {
  init: function () {
    this.jsonInit({
      message0: "Render costume %1 at set scale",
      args0: [
        {
          type: "input_value",
          name: "COSTUME",
        },
      ],
      colour: "#0066a1",
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["loader_costume_scale"] = {
  init: function () {
    this.jsonInit({
      message0: "Costume %1 scale",
      args0: [
        {
          type: "input_value",
          name: "COSTUME",
        },
      ],
      colour: "#0066a1",
      extensions: ["output_number"],
    });
  },
};

Blockly.Blocks["loader_loadsound"] = {
  init: function () {
    this.jsonInit({
      message0: "Load sound %1",
      args0: [
        {
          type: "input_value",
          name: "SOUND_MENU",
        },
      ],
      colour: "#0066a1",
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["loader_deloadsound"] = {
  init: function () {
    this.jsonInit({
      message0: "Deload sound %1",
      args0: [
        {
          type: "input_value",
          name: "SOUND_MENU",
        },
      ],
      colour: "#0066a1",
      extensions: ["shape_statement"],
    });
  },
};
Blockly.Blocks["loader_soundisloaded"] = {
  init: function () {
    this.jsonInit({
      message0: "Is sound %1 loaded?",
      args0: [
        {
          type: "input_value",
          name: "SOUND_MENU",
        },
      ],
      colour: "#0066a1",
      extensions: ["output_boolean"],
    });
  },
};

Blockly.Blocks["loader_costumeisloaded"] = {
  init: function () {
    this.jsonInit({
      message0: "Is costume %1 loaded?",
      args0: [
        {
          type: "input_value",
          name: "COSTUME",
        },
      ],
      colour: "#0066a1",
      extensions: ["output_boolean"],
    });
  },
};

Blockly.Blocks["loader_soundisloaded"] = {
  init: function () {
    this.jsonInit({
      message0: "Is sound %1 loaded?",
      args0: [
        {
          type: "input_value",
          name: "SOUND",
        },
      ],
      colour: "#0066a1",
      extensions: ["output_boolean"],
    });
  },
};

Blockly.Blocks["loader_loadsound"] = {
  init: function () {
    this.jsonInit({
      message0: "Load sound %1",
      args0: [
        {
          type: "input_value",
          name: "SOUND",
        },
      ],
      colour: "#0066a1",
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["loader_deloadsound"] = {
  init: function () {
    this.jsonInit({
      message0: "Deload sound %1",
      args0: [
        {
          type: "input_value",
          name: "SOUND",
        },
      ],
      colour: "#0066a1",
      extensions: ["shape_statement"],
    });
  },
};


/***/ }),

/***/ 9769:
/***/ (() => {

Blockly.Blocks["looks_hidden"] = {
  init: function () {
    this.jsonInit({
      message0: "Hidden?",
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "output_boolean"],
    });
  },
};

Blockly.Blocks["looks_visible"] = {
  init: function () {
    this.jsonInit({
      message0: "Visible?",
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "output_boolean"],
    });
  },
};

Blockly.Blocks["looks_stretch_to"] = {
  init: function () {
    this.jsonInit({
      message0: "set stretch to x: %1 y: %2",
      args0: [
        {
          type: "input_value",
          name: "XVALUE",
        },
        {
          type: "input_value",
          name: "YVALUE",
        },
      ],
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "shape_statement"],
    });
  },
};

Blockly.Blocks["looks_xstretch_to"] = {
  init: function () {
    this.jsonInit({
      message0: "set x stretch to %1",
      args0: [
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "shape_statement"],
    });
  },
};
Blockly.Blocks["looks_ystretch_to"] = {
  init: function () {
    this.jsonInit({
      message0: "set y stretch to %1",
      args0: [
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "shape_statement"],
    });
  },
};

Blockly.Blocks["looks_xstretch_by"] = {
  init: function () {
    this.jsonInit({
      message0: "change x stretch by %1",
      args0: [
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "shape_statement"],
    });
  },
};
Blockly.Blocks["looks_ystretch_by"] = {
  init: function () {
    this.jsonInit({
      message0: "change y stretch by %1",
      args0: [
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "shape_statement"],
    });
  },
};

Blockly.Blocks["looks_xstretch"] = {
  init: function () {
    this.jsonInit({
      message0: "x stretch",
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "output_number"],
    });
  },
};
Blockly.Blocks["looks_ystretch"] = {
  init: function () {
    this.jsonInit({
      message0: "y stretch",
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "output_number"],
    });
  },
};
/*Throw error test thats used to check if error handling works, not used by actual game stuff.*/
Blockly.Blocks["error_test"] = {
  init: function () {
    this.jsonInit({
      message0: "Throw error",
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "shape_statement"],
    });
  },
};

var effectTypes = [
  ["wave time", "waveTime"],
  ["wave x time", "waveXTime"],
  ["wave y time", "waveYTime"],
  ["wave x multiplier", "waveX"],
  ["wave y multiplier", "waveY"],
  ["brightness", "brightness"],
  ["ribbon shift x", "ribbonShiftX"],
  ["ribbon shift y", "ribbonShiftY"],
];

Blockly.Blocks["looks_seteffectto"] = {
  init: function () {
    this.jsonInit({
      message0: "set %1 effect to %2",
      args0: [
        {
          type: "field_dropdown",
          name: "EFFECT",
          options: effectTypes,
        },
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "shape_statement"],
    });
  },
};

Blockly.Blocks["looks_change_effect_by"] = {
  init: function () {
    this.jsonInit({
      message0: "change %1 effect by %2",
      args0: [
        {
          type: "field_dropdown",
          name: "EFFECT",
          options: effectTypes,
        },
        {
          type: "input_value",
          name: "BY",
        },
      ],
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "shape_statement"],
    });
  },
};

Blockly.Blocks["looks_geteffect"] = {
  init: function () {
    this.jsonInit({
      message0: "get effect %1",
      args0: [
        {
          type: "field_dropdown",
          name: "EFFECT",
          options: effectTypes,
        },
      ],
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "output_number"],
    });
  },
};

Blockly.Blocks["looks_zindex_to"] = {
  init: function () {
    this.jsonInit({
      message0: "set z index to %1",
      args0: [
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "shape_statement"],
    });
  },
};

Blockly.Blocks["looks_zindex_by"] = {
  init: function () {
    this.jsonInit({
      message0: "change z index by %1",
      args0: [
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "shape_statement"],
    });
  },
};

Blockly.Blocks["looks_zindex"] = {
  init: function () {
    this.jsonInit({
      message0: "z index",
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "output_number"],
    });
  },
};

Blockly.Blocks["looks_alpha_to"] = {
  init: function () {
    this.jsonInit({
      message0: "set alpha to %1",
      args0: [
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "shape_statement"],
    });
  },
};

Blockly.Blocks["looks_alpha_by"] = {
  init: function () {
    this.jsonInit({
      message0: "change alpha by %1",
      args0: [
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "shape_statement"],
    });
  },
};

Blockly.Blocks["looks_alpha"] = {
  init: function () {
    this.jsonInit({
      message0: "alpha",
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "output_number"],
    });
  },
};

Blockly.Blocks["looks_skew_to"] = {
  init: function () {
    this.jsonInit({
      message0: "set skew to x: %1 y: %2",
      args0: [
        {
          type: "input_value",
          name: "XVALUE",
        },
        {
          type: "input_value",
          name: "YVALUE",
        },
      ],
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "shape_statement"],
    });
  },
};

Blockly.Blocks["looks_xskew_to"] = {
  init: function () {
    this.jsonInit({
      message0: "set x skew to %1",
      args0: [
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "shape_statement"],
    });
  },
};
Blockly.Blocks["looks_yskew_to"] = {
  init: function () {
    this.jsonInit({
      message0: "set y skew to %1",
      args0: [
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "shape_statement"],
    });
  },
};

Blockly.Blocks["looks_xskew_by"] = {
  init: function () {
    this.jsonInit({
      message0: "change x skew by %1",
      args0: [
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "shape_statement"],
    });
  },
};
Blockly.Blocks["looks_yskew_by"] = {
  init: function () {
    this.jsonInit({
      message0: "change y skew by %1",
      args0: [
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "shape_statement"],
    });
  },
};

Blockly.Blocks["looks_xskew"] = {
  init: function () {
    this.jsonInit({
      message0: "x skew",
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "output_number"],
    });
  },
};
Blockly.Blocks["looks_yskew"] = {
  init: function () {
    this.jsonInit({
      message0: "y skew",
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "output_number"],
    });
  },
};

Blockly.Blocks["looks_costumenames"] = {
  init: function () {
    this.jsonInit({
      message0: "costume name array",
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "output_string"],
    });
  },
};

Blockly.Blocks["looks_costumes"] = {
  init: function () {
    this.jsonInit({
      message0: "costumes",
      category: Blockly.Categories.looks,
      extensions: ["colours_looks", "output_string"],
    });
  },
};


/***/ }),

/***/ 9870:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var contextMenuCallbacks = [];
var createdAnyBlockContextMenus = false;
var blocks = __webpack_require__(9436);
var BlockFlasher = __webpack_require__(7278);
var BlockInstance = __webpack_require__(6129);
let views = [];
let forward = (/* unused pure expression or super */ null && ([]));
function getBlockly() {
  return new Promise((r) => r(window.Blockly));
}

const CONTEXT_MENU_ORDER = [
  "jump-to-def",
  "editor-devtools",
  "block-switching",
  "blocks2image",
  "swap-local-global",
];

function createBlockContextMenu(
  callback,
  { workspace = false, blocks = false, flyout = false, comments = false } = {},
) {
  contextMenuCallbacks.push({
    addonId: this._addonId,
    callback,
    workspace,
    blocks,
    flyout,
    comments,
  });

  // Sort to ensure userscript run order doesn't change callback order
  contextMenuCallbacks.sort(
    (b, a) =>
      CONTEXT_MENU_ORDER.indexOf(b.addonId) -
      CONTEXT_MENU_ORDER.indexOf(a.addonId),
  );

  if (createdAnyBlockContextMenus) return;
  createdAnyBlockContextMenus = true;

  getBlockly().then((ScratchBlocks) => {
    if (ScratchBlocks.registry) {
      // new Blockly
      const oldGenerateContextMenu =
        ScratchBlocks.BlockSvg.prototype.generateContextMenu;
      ScratchBlocks.BlockSvg.prototype.generateContextMenu = function (
        ...args
      ) {
        let items = oldGenerateContextMenu.call(this, ...args);
        for (const { callback, blocks, flyout } of contextMenuCallbacks) {
          let injectMenu =
            // Block in workspace
            (blocks && !this.isInFlyout) ||
            // Block in flyout
            (flyout && this.isInFlyout);
          if (injectMenu) {
            try {
              items = callback(items, this);
            } catch (e) {
              console.error("Error while calling context menu callback: ", e);
            }
          }
        }
        return items;
      };
      return;
    }

    const oldShow = ScratchBlocks.ContextMenu.show;
    ScratchBlocks.ContextMenu.show = function (event, items, rtl) {
      const gesture = ScratchBlocks.mainWorkspace.currentGesture_;
      const block = gesture.targetBlock_;

      for (const {
        callback,
        workspace,
        blocks,
        flyout,
        comments,
      } of contextMenuCallbacks) {
        let injectMenu =
          // Workspace
          (workspace && !block && !gesture.flyout_ && !gesture.startBubble_) ||
          // Block in workspace
          (blocks && block && !gesture.flyout_) ||
          // Block in flyout
          (flyout && gesture.flyout_) ||
          // Comments
          (comments && gesture.startBubble_);
        if (injectMenu) {
          try {
            items = callback(items, block);
          } catch (e) {
            console.error("Error while calling context menu callback: ", e);
          }
        }
      }

      const oldCreateWidget = ScratchBlocks.ContextMenu.createWidget_;
      ScratchBlocks.ContextMenu.createWidget_ = function (...args) {
        oldCreateWidget.call(this, ...args);
        // Add styles to separator items
        // This must be done before ContextMenu.position_() is called because it changes the height
        const blocklyContextMenu = ScratchBlocks.WidgetDiv.DIV.firstChild;
        items.forEach((item, i) => {
          if (item.separator) {
            const itemElt = blocklyContextMenu.children[i];
            itemElt.setAttribute("role", "separator");
            itemElt.style.padding = "0";
            if (i !== 0) {
              itemElt.style.borderTop = "1px solid hsla(0, 0%, 0%, 0.15)";
            }
          }
        });
      };

      oldShow.call(this, event, items, rtl);

      ScratchBlocks.ContextMenu.createWidget_ = oldCreateWidget;
    };
  });
}

function scrollPosFromOffset({ left, top }, metrics) {
  // New Blockly uses "scrollLeft" and "scrollTop" instead of "contentLeft" and "contentTop"
  let scrollLeft = metrics.scrollLeft ?? metrics.contentLeft;
  let scrollTop = metrics.scrollTop ?? metrics.contentTop;
  return {
    sx: left - scrollLeft,
    sy: top - scrollTop,
  };
}

function distance(pos, next) {
  return Math.sqrt(
    Math.pow(pos.left - next.left, 2) + Math.pow(pos.top - next.top, 2),
  );
}

function storeView(next, dist) {
  forward = [];
  let workspace = blocks.getCurrentWorkspace(),
    s = workspace.getMetrics();

  let pos = { left: s.viewLeft, top: s.viewTop };
  if (!next || distance(pos, next) > dist) {
    views.push(pos);
  }
}

function peek() {
  return views.length > 0 ? views[views.length - 1] : null;
}
function getTopOfStackFor(block) {
  let base = block;
  while (base.getOutputShape() && base.getSurroundParent()) {
    base = base.getSurroundParent();
  }
  return base;
}

function scrollBlockIntoView(blockOrId) {
  var offsetX = 32;
  var offsetY = 32;
  let workspace = blocks.getCurrentWorkspace();
  /** @type {Blockly.Block} */
  let block; // or is it really a Blockly.BlockSvg?

  if (blockOrId instanceof BlockInstance) {
    // Highlight the block!
    block = workspace.getBlockById(blockOrId.id);
  } else {
    block =
      blockOrId && blockOrId.id ? blockOrId : workspace.getBlockById(blockOrId);
  }

  if (!block) {
    return;
  }

  /**
   * !Blockly.Block
   */
  let root = block.getRootBlock();
  let base = getTopOfStackFor(block);
  let ePos = base.getRelativeToSurfaceXY(), // Align with the top of the block
    rPos = root.getRelativeToSurfaceXY(), // Align with the left of the block 'stack'
    scale = workspace.scale,
    x = rPos.x * scale,
    y = ePos.y * scale,
    xx = block.width + x, // Turns out they have their x & y stored locally, and they are the actual size rather than scaled or including children...
    yy = block.height + y,
    s = workspace.getMetrics();
  if (
    x < s.viewLeft + offsetX - 4 ||
    xx > s.viewLeft + s.viewWidth ||
    y < s.viewTop + offsetY - 4 ||
    yy > s.viewTop + s.viewHeight
  ) {
    let { sx, sy } = scrollPosFromOffset(
      {
        left: x - offsetX,
        top: y - offsetY,
      },
      s,
    );

    storeView(peek(), 64);

    // workspace.hideChaff(),
    workspace.scrollbar.set(sx, sy);
    storeView({ left: sx, top: sy }, 64);
  }
  this.blockly?.hideChaff();
  BlockFlasher.flash(block);
}

module.exports = {
  createBlockContextMenu,
  scrollBlockIntoView,
};


/***/ }),

/***/ 9884:
/***/ (() => {

Blockly.Blocks["control_while"] = {
  init: function () {
    this.jsonInit({
      message0: "while %1",
      message1: "%1",
      message2: "%1",
      lastDummyAlign2: "RIGHT",
      args0: [
        {
          type: "input_value",
          name: "CONDITION",
          check: "Boolean",
        },
      ],
      args1: [
        {
          type: "input_statement",
          name: "SUBSTACK",
        },
      ],
      args2: [
        {
          type: "field_image",
          src: Blockly.mainWorkspace.options.pathToMedia + "repeat.svg",
          width: 24,
          height: 24,
          alt: "*",
          flip_rtl: true,
        },
      ],
      category: Blockly.Categories.control,
      extensions: ["colours_control", "shape_statement"],
    });
  },
};

Blockly.Blocks["control_elapsed"] = {
  init: function () {
    this.jsonInit({
      message0: "elapsed frame time",
      args0: [],
      category: Blockly.Categories.control,
      extensions: ["colours_control", "output_number"],
    });
  },
};

Blockly.Blocks["control_isclone"] = {
  init: function () {
    this.jsonInit({
      message0: "Is a clone?",
      args0: [],
      category: Blockly.Categories.control,
      extensions: ["colours_control", "output_boolean"],
    });
  },
};

Blockly.Blocks["control_stop"] = {
  /**
   * Block for stop all scripts.
   * @this Blockly.Block
   */
  init: function () {
    var THIS_SCRIPT = "this script";
    var OTHER_SCRIPTS = "other scripts in sprite";
    var stopDropdown = new Blockly.FieldDropdown(
      function () {
        if (
          this.sourceBlock_ &&
          this.sourceBlock_.nextConnection &&
          this.sourceBlock_.nextConnection.isConnected()
        ) {
          return [["other scripts in sprite", OTHER_SCRIPTS]];
        }
        return [
          ["this script", THIS_SCRIPT],
          ["other scripts in sprite", OTHER_SCRIPTS],
        ];
      },
      function (option) {
        // Create an event group to keep field value and mutator in sync
        // Return null at the end because setValue is called here already.
        Blockly.Events.setGroup(true);
        var oldMutation = Blockly.Xml.domToText(
          this.sourceBlock_.mutationToDom(),
        );
        this.sourceBlock_.setNextStatement(option == OTHER_SCRIPTS);
        var newMutation = Blockly.Xml.domToText(
          this.sourceBlock_.mutationToDom(),
        );
        Blockly.Events.fire(
          new Blockly.Events.BlockChange(
            this.sourceBlock_,
            "mutation",
            null,
            oldMutation,
            newMutation,
          ),
        );
        this.setValue(option);
        Blockly.Events.setGroup(false);
        return null;
      },
    );
    this.appendDummyInput()
      .appendField("stop")
      .appendField(stopDropdown, "STOP_OPTION");
    this.setCategory(Blockly.Categories.control);
    this.setColour(
      Blockly.Colours.control.primary,
      Blockly.Colours.control.secondary,
      Blockly.Colours.control.tertiary,
      Blockly.Colours.control.quaternary,
    );
    this.setPreviousStatement(true);
  },
  mutationToDom: function () {
    var container = document.createElement("mutation");
    container.setAttribute("hasnext", this.nextConnection != null);
    return container;
  },
  domToMutation: function (xmlElement) {
    var hasNext = xmlElement.getAttribute("hasnext") == "true";
    this.setNextStatement(hasNext);
  },
};


/***/ }),

/***/ 9940:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var elements = __webpack_require__(7255);
var AElement = __webpack_require__(3759);
var engine = __webpack_require__(5827);
module.exports = new engine(elements.getGPId("projectCanvas"));
window.engine = module.exports;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			952: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkgvbvdxx_game_maker_3"] = self["webpackChunkgvbvdxx_game_maker_3"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [804], () => (__webpack_require__(1652)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;