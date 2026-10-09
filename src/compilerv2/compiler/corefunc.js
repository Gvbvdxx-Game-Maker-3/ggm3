
function startThreadStack(block) {
    var id = JSON.stringify(block.id);
    return `var thread = sprite.createThread(${id});try {${aliveCheck(block)}`;
}

function endThreadStack(block) {
    return `thread.stop();}catch(e){thread.hadError = true;thread.output = e;thread.stop();return thread;}`;
}

function stopThisThread(block) {
    return `thread.stop();`;
}

function threadWaitFrame(block) {
    return `await thread.waitForNextFrame();`;
}

function aliveCheck() {
    return `try{if (!thread.running) {thread.stop();return thread;}}catch(e){}`;
}

function enableThreadPreview() {
    return `thread.isPreviewMode = true;`;
}

function setThreadOutput(code) {
    return `thread.output = ${code};`;
}

function returnThread() {
    return `return thread;`;
}

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

function putThreadStack(block, code) {
    return startThreadStack(block) + code  + endThreadStack(block);
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
    putThreadStack
};