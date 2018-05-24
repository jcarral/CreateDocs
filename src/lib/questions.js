const inquirer = require('inquirer');
const translation = require('../locale/index');
const files = require('./files');
const chalk = require('chalk');

const mainQuestions = () => ([
  {
    type: 'input',
    name: 'name',
    default: files.getCurrentDirectoryBase(),
    message: translation.t('name'),
  },
  {
    type: 'input',
    name: 'author',
    default: require("os").userInfo().username,
    message: translation.t('author'),
  },
  {
    type: 'input',
    name: 'email',
    default: '',
    message: translation.t('email'),
  },
  {
    type: 'list',
    name: 'license',
    message: translation.t('license'),
    choices: ['BSD', 'MIT', 'Apache', 'GPL'],
    default: 'MIT',
  },
  {
    type: 'list',
    name: 'codeofconduct',
    message: translation.t('codeOfConduct'),
    choices: ['Contributor Covenant', 'Citizen code of conduct'],
    default: 'Contributor Covenant',
  },
  {
    type: 'confirm',
    name: 'issueTemplate',
    message: translation.t('issueTemplate'),
    default: true,
  },
  {
    type: 'confirm',
    name: 'prTemplate',
    message: translation.t('prTemplate'),
    default: true,
  },
  {
    type: 'confirm',
    name: 'startGit',
    message: translation.t('startGit'),
    default: true,
  },
]);

const loginQuestions = () => ([
  {
    name: 'username',
    type: 'input',
    message: translation.t('loginPassword'),
    validate: function (value) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter your password.';
      }
    }
  }
]);

const repoQuestions = () => ([
  {
    type: 'input',
    name: 'name',
    message: translation.t('repoName'),
    default: files.getCurrentDirectoryBase(),
  },
  {
    type: 'input',
    name: 'description',
    message: translation.t('repoDescription'),
    default: ''
  },
  {
    type: 'input',
    name: 'visibility',
    message: translation.t('repoVisibility'),
    choices: ['public', 'private'],
    default: 'public'
  }
]);

const gitignoreQuestion = (list = []) => ([
  {
    type: 'checkbox',
    name: 'ignore',
    message: translation.t('ignore'),
    choices: list,
  },
]);

const publishOnGitHub = () => ([
  {
    type: 'confirm',
    name: 'publish',
    message: translation.t('publish'),
    default: false,
  }
]);

const existingFile = (filename) => ([
  {
    type: 'confirm',
    default: true,
    name: 'override',
    message: `${chalk.red(filename)} ${translation.t('override')}`,
  }
]);

module.exports = {
  mainQuestions,
  loginQuestions,
  repoQuestions,
  gitignoreQuestion,
  publishOnGitHub,
  existingFile,
}
