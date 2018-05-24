const _ = require('lodash');
const fs = require('fs');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const questions = require('../lib/questions');
const inquirer = require('../lib/inquirer');
const github = require('../lib/github');
const files = require('../lib/files');
const repo = require('../lib/repo');

module.exports = async () => {
  try {
    // Initial variables
    let gitignore;
    let repoDetails;
    let token;
    let url;
    const filelist = _.without(fs.readdirSync('.'), '.git', '.gitignore');
    
    token = github.getStoredGithubToken();
    if (!token) { //If there is not token ask for it
      await github.setGithubCredentials();
      token = await github.registerNewToken();
    }
    github.githubAuth(token); 
    const details = await inquirer(questions.mainQuestions());
    if (details.startGit) { 
      gitignore = await inquirer(questions.gitignoreQuestion(filelist));
      await files.createFile('.gitignore', gitignore.ignore.join('\n'));
    }
    const publish = await inquirer(questions.publishOnGitHub());
    if (publish.publish) {
      repoDetails = await inquirer(questions.repoQuestions());
      url = await github.createRemoteRepo(repoDetails);
    }
    await files.createAllFiles(details);

    if (details.startGit) { 
      await repo.startRepo();
    }
    if (publish.publish) {
      await repo.addRemote(url);
      await repo.pushToRemote();
    }
  } catch (e) {
    console.error(e);
  }
}
