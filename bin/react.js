#!/usr/bin/env node

var program = require('commander')

program
  .version(require('../package.json').version)
  .usage('<command> [options]')
  .command('init', 'generate a new project')
  .parse(process.argv)


