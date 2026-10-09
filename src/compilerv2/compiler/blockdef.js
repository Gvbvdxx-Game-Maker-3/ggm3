
class CBlockDefinition {
    constructor (name, options) {
        this.name = name;
        this.func = options.func || (() => {});
        this.type = options.type;
    }

    callCompile (blockUtil) {
        return this.func(blockUtil);
    }
}

module.exports = {CBlockDefinition};