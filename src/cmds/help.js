const menus = {
  main: `
    create-docs [command] <options>

    --help, -h .............. show help menu for a command
    --version, -v ............ show package version
    --language, -l ........... Select language for the documents`,
}

module.exports = (args) => console.log(menus.main);
