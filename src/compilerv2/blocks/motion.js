
var BlockCompiler = require("../compiler/compiler.js");
var CBlockType = require("../compiler/types.js");
var CoreFunctions = require("../compiler/corefunc.js");

BlockCompiler.defineBlock("motion_movesteps", {
    type: CBlockType.COMMAND,
    func: function (util) {
        var STEPS = util.getInput("STEPS", '0');
        return `sprite.moveSteps(+(${STEPS}) || 0);`;
    }
});

BlockCompiler.defineBlock("motion_goto", {
    type: CBlockType.OUTPUT,
    func: function (util) {
        var TO = util.getInput("TO", "null");
        return `sprite.goTo(${TO});`;
    }
});

BlockCompiler.defineBlock("motion_goto_menu", {
    type: CBlockType.OUTPUT,
    func: function (util) {
        var TO = util.getField("TO", "");
        return JSON.stringify(TO);
    }
});

BlockCompiler.defineBlock("motion_xposition", {
    type: CBlockType.OUTPUT,
    func: function (util) {
        return `sprite.x`;
    }
});

BlockCompiler.defineBlock("motion_yposition", {
    type: CBlockType.OUTPUT,
    func: function (util) {
        return `sprite.y`;
    }
});

BlockCompiler.defineBlock("motion_direction", {
    type: CBlockType.OUTPUT,
    func: function (util) {
        return `sprite.direction`;
    }
});

BlockCompiler.defineBlock("motion_gotoxy", {
    type: CBlockType.COMMAND,
    func: function (util) {
        var X = util.getInput("X", '0');
        var Y = util.getInput("Y", '0');
        
        return `sprite.x = +(${X}) || 0; sprite.y = +(${Y}) || 0;`;
    }
});

BlockCompiler.defineBlock("motion_changexby", {
    type: CBlockType.COMMAND,
    func: function (util) {
        var DX = util.getInput("DX", '0');
        
        return `sprite.x += +(${DX}) || 0;`;
    }
});

BlockCompiler.defineBlock("motion_setx", {
    type: CBlockType.COMMAND,
    func: function (util) {
        var X = util.getInput("X", '0');
        
        return `sprite.x = +(${X}) || 0;`;
    }
});

BlockCompiler.defineBlock("motion_changeyby", {
    type: CBlockType.COMMAND,
    func: function (util) {
        var DY = util.getInput("DY", '0');
        
        return `sprite.y += +(${DY}) || 0;`;
    }
});

BlockCompiler.defineBlock("motion_sety", {
    type: CBlockType.COMMAND,
    func: function (util) {
        var Y = util.getInput("Y", '0');
        
        return `sprite.y = +(${Y}) || 0;`;
    }
});

BlockCompiler.defineBlock("motion_pointindirection", {
    type: CBlockType.COMMAND,
    func: function (util) {
        var DIRECTION = util.getInput("DIRECTION", '0');
        
        return `sprite.direction = +(${DIRECTION}) || 0;`;
    }
});

BlockCompiler.defineBlock("motion_turnleft", {
    type: CBlockType.COMMAND,
    func: function (util) {
        var DEGREES = util.getInput("DEGREES", '0');
        
        return `sprite.direction -= +(${DEGREES}) || 0;`;
    }
});

BlockCompiler.defineBlock("motion_turnright", {
    type: CBlockType.COMMAND,
    func: function (util) {
        var DEGREES = util.getInput("DEGREES", '0');
        
        return `sprite.direction += +(${DEGREES}) || 0;`;
    }
});