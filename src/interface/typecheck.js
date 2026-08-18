
var types = {
    graphics: [
        "image/gif",
        "image/x-icon",
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/tiff",
        "image/webp"
    ],
    audio: [
        "audio/aac",
        "audio/mpeg",
        "audio/ogg",
        "audio/x-wav",
        "audio/webm",
    ]
};

function isValid(target, mimeType) {
    if (!types[target]) {
        return false;
    }
    var str = (""+mimeType).trim().toLowerCase();
    var arr = types[target];
    return arr.indexOf(str) !== -1;
}

module.exports = {
    isValid
};