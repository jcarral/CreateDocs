const fs = require('fs');
const path = require('path');
const CLI = require('clui');
const Spinner = CLI.Spinner;
const touch = require('touch');
const inquirer = require('./inquirer');
const { fetchAllFiles } = require('./fetch');
const translation = require('../locale/index');

//const questions = require('./questions');

const createFile = async (name, content) => {
  const status = new Spinner(`🔨 Creating ${name}...\n`);
  try {
    const language = translation.locale;
    const exists = fs.existsSync(path.join(process.cwd(), name));
    let create = true;
    if (exists) {
      // const answer = await inquirer(questions.existingFile(name, language)); // FIXME: Why doesn't work !???? 😒
      const answer = await inquirer(require('./questions').existingFile(name, language)); 
      create = answer.override;
      touch(name);
    }
    status.start();
    if (create) {
      fs.writeFileSync(name, content);
    }
    
  } catch (e) {
    console.log('error creating', e)
  } finally {
    status.stop();
  }
};

const createFileAndFolder = async (dir, name, content) => {
  try {
    const existsFolder = fs.existsSync(path.join(process.cwd(),dir, name));
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    await createFile(`${dir}/${name.toUpperCase()}`, content);
  } catch (e) {
    console.log('error creating folder', e)
  } 
};

const createAllFiles = async (details) => {
  try {
    const files = await fetchAllFiles(details);
    for (const file of files) {
      if (file.value === 'prTemplate' || file.value === 'issueTemplate') {
        await createFileAndFolder('.github', file.dest, file.content);
      } else {
        await createFile(file.dest.toUpperCase(), file.content);
      }
    }
  } catch (e) {
    console.log('ERROR docs');
    throw e;
  }
};

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  directoryExists: (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },
  fileExists: (filePath) => {
    try {
      return statSync(filePath).isFile();
    } catch (err) {
      return false;
    }
  },
  createFile,
  createAllFiles,
};
