const en = require('./en');
const es = require('./es');

const translations = {
  en,
  es,
};

class Translate {
  constructor(locale) {
    this.locale = locale;
  }

  t(path) {
    return translations[this.locale][path];
  }
}

const translation = new Translate('en');

module.exports = translation;
