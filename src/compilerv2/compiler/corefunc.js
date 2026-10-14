//Function for starting a threads code, this should only be used internally, for blocks use putThreadStack instead.
function startThreadStack(block) {
  var id = JSON.stringify(block.id);
  return `var thread = sprite.createThread(${id});try {${aliveCheck(block)}`;
}

//Function for ending a threads code, this should only be used internally, for blocks use putThreadStack instead.
function endThreadStack(block) {
  return `thread.stop();}catch(e){thread.hadError = true;thread.output = e;thread.stop();return thread;}`;
}

//Stops the thread, use aliveCheck right after for best results in blocks.
function stopThisThread(block) {
  return `thread.stop();`;
}

//Tells the thread to wait for the next frame
function threadWaitFrame(block) {
  return `await thread.waitForNextFrame();`;
}

//Tells the code to exit if the thread stops.
function aliveCheck() {
  return `try{if (!thread.running) {thread.stop();return thread;}}catch(e){}`;
}

//Turns on a feature used by the editor to tell if its been clicked.
function enableThreadPreview() {
  return `thread.isPreviewMode = true;`;
}

//Value used by the editor and error checking to set the output.
function setThreadOutput(code) {
  return `thread.output = ${code};`;
}

//Return the thread, this is probably not used but whatever.
function returnThread() {
  return `return thread;`;
}

//Used by the compiler to get the normal clicked block logic for the editor.
function getClickedBlockLogic(block, code) {
  var fullCode = "";
  //Start the thread
  fullCode += startThreadStack(block);

  //This tells the editor that this thread is running because it was clicked.
  fullCode += enableThreadPreview();

  //We aren't trying to get an output here, so run it normally.
  fullCode += code;

  //End the thread
  fullCode += endThreadStack(block);

  return fullCode;
}

//Used by the compiler to get the output block clicked logic for the editor.
function getClickedOutputBlockLogic(block, code) {
  var fullCode = "";
  //Start the thread
  fullCode += startThreadStack(block);

  //This tells the editor that this thread is running because it was clicked.
  fullCode += enableThreadPreview();

  //This will return the output of the code.
  fullCode += setThreadOutput(code);

  //End the thread
  fullCode += endThreadStack(block);

  //Return the thread, not sure if this is required.
  //Still good to have it if I ever use it later.
  fullCode += returnThread();

  return fullCode;
}

//Used by hat blocks to add the thread identifier to the code.
function putThreadStack(block, code) {
  return startThreadStack(block) + code + endThreadStack(block);
}

//Cast a value to number
function castToNumber(code, surround = false) {
  var c = `+(${code}) || 0`;
  return surround ? `(${c})` : c;
}

//Cast a value to string
function castToString(code, surround = false) {
  var c = `""+(${code})`;
  return surround ? `(${c})` : c;
}

//Cast a value to boolean
function castToBoolean(code, surround = false) {
  var c = `!!(${code})`;
  return surround ? `(${c})` : c;
}

module.exports = {
  startThreadStack,
  endThreadStack,
  stopThisThread,
  threadWaitFrame,
  aliveCheck,
  enableThreadPreview,
  setThreadOutput,
  returnThread,
  getClickedBlockLogic,
  getClickedOutputBlockLogic,
  putThreadStack,
  castToNumber,
  castToString,
  castToBoolean,
};
