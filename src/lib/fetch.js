const github = require('./github');
const { parseCodeOfConduct } = require('../lib/parser');

const fetchAllFiles = async (details) => {
  try {
    const files = [
      {
        source: 'README.md',
        dest: 'README.md',
        value: 'readme',
      },
      {
        source: '.github/ISSUE_TEMPLATE.md',
        dest: 'ISSUE_TEMPLATE.md',
        value: 'issueTemplate',
      },
      {
        source: '.github/PULL_REQUEST_TEMPLATE.md',
        dest: 'PULL_REQUEST_TEMPLATE.md',
        value: 'prTemplate',
      },
      {
        source: 'CONTRIBUTING.md',
        dest: 'CONTRIBUTING.md',
        value: 'contributing',
      },
      {
        source: `licenses/${details.license.toUpperCase()}.md`,
        dest: 'LICENSE.md',
        value: 'license',
      },
      {
        source: `codesofconduct/${parseCodeOfConduct(details.codeOfConduct)}.md`,
        dest: 'CODE_OF_CONDUCT.md',
        value: 'codeofconduct',
      },
    ];
    let results = [];
    const year = new Date().getFullYear();
    for (const file of files) {
      let content = await github.fetchContent(file.source);
      content = content.replace('<author>', details.author);
      content = content.replace('<name>', details.name);
      content = content.replace('<year>', year);
      content = content.replace('<licenseName>', details.license);
      content = content.replace('<email>', details.email);
      results = [...results, Object.assign({}, file, { content })];
    }
    return results;
  } catch (err) {
    throw err;
  } finally {
  }
}

module.exports = {
  fetchAllFiles,
}
