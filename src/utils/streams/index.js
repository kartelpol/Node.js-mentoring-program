const parser = require('./parser').createParser();
const args = parser.parseArgs();

const actions = require('./actions');

analyzeArgs(args);

function analyzeArgs (args) {
    console.dir(args);
    if (process.argv[2] === '--help' || process.argv[2] === '-h' || process.argv.length == 2) {
        parser.printHelp();
    } else if (args.action && (process.argv[2].indexOf('--action=') == 0 || process.argv[2].indexOf('-a=') == 0)) {
        checkAction(args);
    } else {
        printError('INVALID ARGUMENTS COMBINATION');
    }
}

function checkAction(args) {
    switch (args.action) {
        case 'reverse':
            actions.reverse();
        break;
        case 'transform':
            actions.transform();
        break;
        case 'outputFile':
            checkExtraParam('file', args);
            actions.outputFile(args.file);
        break;
        case 'convertFromFile':
            checkExtraParam('file', args);
            actions.convertFromFile(args.file);
        break;
        case'convertToFile':
            checkExtraParam('file', args);
            actions.convertToFile(args.file);
        break;
        case'cssBundler':
            checkExtraParam('path', args);
            actions.buildCss(args.path);
        break;
    }
}

function checkExtraParam(param, args) {
    if (!args[param]) {
        printError('NEED AN EXTRA ARGUMENT --' + param.toUpperCase() + '. SEE HELP: --HELP OR -H');        
    }
}

function printError(message) {
    throw new Error(message);
}