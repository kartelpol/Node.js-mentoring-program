const parser = require('./parser').createParser();
const args = parser.parseArgs();

const errorMsgs = require('./errorMsgs');
const actions = require('./actions');

analyzeArgs(args);

function analyzeArgs (args) {
    if (process.argv[2] === '--help' || process.argv[2] === '-h' || process.argv.length == 2) {
        parser.printHelp();
    } else if (args.action && (process.argv[2].indexOf('--action=') == 0 || process.argv[2].indexOf('-a=') == 0)) {
        checkAction(args.action);
    } else {
        printError(errorMsgs.params.wrong_format);
    }
}

function checkAction(chosenAction) {
    switch (chosenAction) {
        case 'reverse':
            actions.reverse();
        break;
        case 'transform':
            actions.transform();
        break;
        case 'outputFile':
            checkExtraParam('file');
            actions.outputFile(args.file);
        break;
        case 'convertFromFile':
            checkExtraParam('file');
            actions.convertFromFile(args.file);
        break;
        case'convertToFile':
            checkExtraParam('file');
            actions.convertToFile(args.file);
        break;
        case'cssBundler':
            checkExtraParam('path');
            actions.buildCss(args.path);
        break;
    }
}

function checkExtraParam(param) {
    if (!args[param]) {
        printError(errorMsgs.params.wrong_number(param));        
    }
}

function printError(message) {
    throw new Error(message);
}