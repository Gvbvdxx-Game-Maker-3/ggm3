//Function for starting a threads code, this should only be used internally, for blocks use putThreadStack instead.
function startThreadStack(blockUtil) {
  var id = JSON.stringify(blockUtil.getID());
  return `var thread = sprite.createThread(${id});try {${aliveCheck(blockUtil)}`;
}

//Function for ending a threads code, this should only be used internally, for blocks use putThreadStack instead.
function endThreadStack(blockUtil) {
  return `thread.stop();}catch(e){thread.hadError = true;thread.output = e;thread.stop();return thread;}`;
}

//Stops the thread, use aliveCheck right after for best results in blocks.
function stopThisThread(blockUtil) {
  return `thread.stop();`;
}

//Tells the thread to wait for the next frame
function threadWaitFrame(blockUtil) {
  return `await thread.waitForNextFrame();`;
}

//Tells the code to exit if the thread stops.
function aliveCheck(blockUtil) {
  return `try{if (!thread.running) {thread.stop();return thread;}}catch(e){}`;
}

//Turns on a feature used by the editor to tell if its been clicked.
function enableThreadPreview(blockUtil) {
  return `thread.isPreviewMode = true;`;
}

//Value used by the editor and error checking to set the output.
function setThreadOutput(code) {
  return `thread.output = ${code};`;
}

//Return the thread, this is probably not used but whatever.
function returnThread(blockUtil) {
  return `return thread;`;
}

//Used by the compiler to get the normal clicked block logic for the editor.
function getClickedBlockLogic(blockUtil, code) {
  var fullCode = "";
  //Start the thread
  fullCode += startThreadStack(blockUtil);

  //This tells the editor that this thread is running because it was clicked.
  fullCode += enableThreadPreview();

  //We aren't trying to get an output here, so run it normally.
  fullCode += code;

  //End the thread
  fullCode += endThreadStack(blockUtil);

  return fullCode;
}

//Used by the compiler to get the output block clicked logic for the editor.
function getClickedOutputBlockLogic(blockUtil, code) {
  var fullCode = "";
  //Start the thread
  fullCode += startThreadStack(blockUtil);

  //This tells the editor that this thread is running because it was clicked.
  fullCode += enableThreadPreview(blockUtil);

  //This will return the output of the code.
  fullCode += setThreadOutput(code);

  //End the thread
  fullCode += endThreadStack(blockUtil);

  //Return the thread, not sure if this is required.
  //Still good to have it if I ever use it later.
  fullCode += returnThread(blockUtil);

  return fullCode;
}

//Used by hat blocks to add the thread identifier to the code.
function putThreadStack(blockUtil, code) {
  return startThreadStack(blockUtil) + code + endThreadStack(blockUtil);
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

//Used to tell if a string is javascript safe or
// if it should be wrapped in a string and brackets.
//Used for getters like "engine.KeyCode.LETTER_A".
function isJavaScriptSafe(str) {
  var safeChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
  var safeNums = "1234567890";

  if (typeof str !== "string") {
    //Not even a string.
    return false;
  }

  if (str.length < 1) {
    //Has to not be empty.
    return false;
  }

  if (safeNums.indexOf(str[0]) !== -1) {
    //The first character can't be a number.
    return false;
  }

  for (var char of str) {
    if (safeNums.indexOf(char) == -1 && safeChars.indexOf(char) == -1) {
      //This character is not safe for javascript directly.
      return false;
    }
  }

  return true;
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
  isJavaScriptSafe
};
