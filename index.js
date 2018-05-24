const minimist = require('minimist')
const clear = require('clear');
const figlet = require('figlet');
const chalk = require('chalk');
const main = require('./src/cmds/main');
const translation = require('./src/locale/');
const boxen = require('boxen');

module.exports = () => {
  const args = minimist(process.argv.slice(2));
  let language = 'en';
  clear();

  console.log('\n\n' +
    boxen(chalk.magenta.bold(figlet.textSync('CreateDocs ', { horizontalLayout: '' })),
      {
        padding: 1,
        margin: 1,
        borderColor: 'yellow',
        borderStyle: 'round',
      }) + '\n');
  let cmd;
  if (args.version || args.v) {
    cmd = 'version';
  }
  else if (args.help || args.v) {
    cmd = 'help';
  }
  else {
    cmd = 'main';
  }
  if (args.l && args.l.length) language = args.l;
  else if (args.language && args.language.length) language = args.language;
  translation.locale = language;

  switch (cmd) {
    case 'version':
      require('./src/cmds/version')(args);
      break;
    case 'help':
      require('./src/cmds/help')(args);
      break;
    case 'main':
      main(language);
      break;
    default:
      console.log('Error: Invalid command');
      break;
  }

}

