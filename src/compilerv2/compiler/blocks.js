
class CBlockDefinition {
    constructor (name, options) {
        this.name = name;
        this.func = options.func || (() => {});
        this.type = options.type;
    }


}

module.exports = {CBlockDefinition};