const octokit = require('@octokit/rest')();
const Configstore = require('configstore');
const pkg = require('../../package.json');
const _ = require('lodash');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const chalk = require('chalk');

const translation = require('../locale/index');
const questions = require('./questions');
const inquirer = require('./inquirer');

const conf = new Configstore(pkg.name);

module.exports = {
  getInstance: () => {
    return octokit;
  },

  getStoredGithubToken: () => {
    return conf.get('github.token');
  },
  setGithubCredentials: async () => {
    const credentials = await inquirer(questions.loginQuestions());
    octokit.authenticate(
      _.extend(
        {
          type: 'basic',
        },
        credentials
      )
    );
  },

  registerNewToken: async () => {
    const status = new Spinner('Authenticating you, please wait...');
    status.start();

    try {
      const response = await octokit.authorization.create({
        scopes: ['user', 'public_repo', 'repo', 'repo:status'],
        note: 'ginits, the command-line tool for initalizing Git repos'
      });
      const token = response.data.token;
      if (token) {
        conf.set('github.token', token);
        return token;
      } else {
        throw new Error("Missing Token", "GitHub token was not found in the response");
      }
    } catch (err) {
      throw err;
    } finally {
      status.stop();
    }
  },
  createRemoteRepo: async (answers) => {
    const github = octokit;

    const data = {
      name: answers.name,
      description: answers.description,
      private: (answers.visibility === 'private')
    };

    const status = new Spinner('Creating remote repository...');
    status.start();

    try {
      const response = await github.repos.create(data);
      return response.data.ssh_url;
    } catch (err) {
      throw err;
    } finally {
      status.stop();
    }
  },
  githubAuth: (token) => {
    octokit.authenticate({
      type: 'oauth',
      token: token
    });
  },
  fetchContent: async (path) => {
    const status = new Spinner('Fetching data...');
    status.start();
    try {
      const locale = translation.locale;
      const result = await octokit.repos.getContent({
        owner: 'jcarral',
        repo: 'Documentacion-TFG',
        path: `/docs/${locale}/${path}`,
        });
      return Buffer.from(result.data.content, 'base64').toString();
    } catch (err) {
      console.log('error', err, path)
      throw err;
    } finally {
      status.stop();
    }
  }
}
