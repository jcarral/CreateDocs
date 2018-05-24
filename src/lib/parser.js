const parseCodeOfConduct = (name, language = 'en') => {
  switch (name) {
    case 'Citizen code of conduct':
      return `CITIZEN`;
    default:
      return `CONTRIBUTORCOVENANT`;
  }
};


module.exports = {
  parseCodeOfConduct,
};
