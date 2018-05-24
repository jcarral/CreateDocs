const _ = require('lodash');
const fs = require('fs');
const git = require('simple-git')();
const CLI = require('clui')
const Spinner = CLI.Spinner;

const questions = require('./questions');
const gh = require('./github');

module.exports = {
  startRepo: async () => {
    const status = new Spinner('Initializing local repository and pushing to remote...');
    status.start();
    try {
      git
        .init()
        .add('./*')
        .commit('Initial commit');
    } catch (e) {
      throw e;
    } finally {
      status.stop();
    }
  },
  addRemote: async (url) => {
    const status = new Spinner('Origin...');
    status.start();
    try {
      git.addRemote('origin', url);
    } catch (e) {
      throw e;
    } finally {
      status.stop();
    }
  },
  pushToRemote: async (url) => {
    const status = new Spinner('Pushing...');
    status.start();
    try {
      git.push('origin', 'master');
    } catch (e) {
      throw e;
    } finally {
      status.stop();
    }
  },
}
