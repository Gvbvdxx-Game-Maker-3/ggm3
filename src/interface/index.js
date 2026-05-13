var canLoad = true;

if (window.Blockly) {
  window.ScratchBlocks = window.Blockly;
} else {
  canLoad = false;
  window.alert("ScratcbBlocks is required to run GGM3, but it failed to load or isn't included. Please make sure to include ScratchBlocks before GGM3.");
}

try{
  var testCanvas = document.createElement("canvas");
  const contextAttribs = {
    alpha: false,
    stencil: true,
    antialias: false,
    preserveDrawingBuffer: true
  };
  var gl =
    testCanvas.getContext("webgl", contextAttribs) ||
    testCanvas.getContext("experimental-webgl", contextAttribs) ||
    testCanvas.getContext("webgl2", contextAttribs);
  if (!gl) {
    canLoad = false;
    window.alert("WebGL is required to run GGM3, but it isn't supported by your browser. Please make sure you have a compatible browser and that WebGL is enabled.");
  }
}catch(e){
  canLoad = false;
  window.alert("WebGL can't be checked, its required to run GGM3, but it failed to load or isn't supported by your browser. Please make sure you have a compatible browser and that WebGL is enabled.");
}

if (canLoad) {
  require("./main.js");
}
