var TWEEN = require("@tweenjs/tween.js");

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