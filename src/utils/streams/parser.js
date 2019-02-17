const ArgumentParser = require('argparse').ArgumentParser;

function createParser() {
    const parser = new ArgumentParser({
        version: '0.0.1',
        addHelp: false,
        description: 'Command line arguments usage'
    });
    
      parser.addArgument(
        [ '-a', '--action' ],
        {
          help: 'Action to be performed. Some actions need an extra --file or --path arguments',
          dest: 'action',
          choices: ['reverse', 'transform', 'outputFile', 'convertFromFile', 'convertToFile', 'cssBundler'],
        }
      );

      parser.addArgument(
        [ '-f', '--file' ],
        {
          help: 'file for writing into / reading from',
          dest: 'file'
        }
      );
     
      parser.addArgument(
        [ '-p', '--path' ],
        {
          help: 'file for writing into / reading from',
          dest: 'path'
        }
      );
      
      parser.addArgument(
        [ '-h', '--help' ], 
        {
            action: 'storeTrue',
            dest: 'help',
            help: 'Show usage info if it\'s the first argument, otherwise ignore param' 
        }
      );

      return parser;
}

module.exports = {createParser};