const { readFileSync } = require('fs');
const { Readable } = require('stream');   
const { join } = require('path');

const TEMPLATE_PATH = 'template.html';
const customData = {
    message: 'A custom message from html-server',
};


require('http')
  .createServer((req, res) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      createReadableStream().pipe(res);
    })
  .listen(8080);  


  function createReadableStream() {
    const readStream = new Readable({
      read() {
        const htmlTemplate = readFileSync(join(__dirname, TEMPLATE_PATH), 'utf8');
        this.push(generateHTML(htmlTemplate));
        this.push(null);
      }
    });

    return readStream;
  }


  function generateHTML(template) {
    const regexp = /{(.*?)}/;
    const variables = template.match(regexp);
    
    let generatedHTML;

    variables.forEach((variable) => {
      if (customData[variable]) {
        const replaceRegExp = new RegExp(`{(${variable}?)}`);
        generatedHTML = template.replace(replaceRegExp, customData[variable]);
      }
    }); 

    return generatedHTML;
  }