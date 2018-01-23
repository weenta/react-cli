#!/usr/bin/env node

var program = require('commander')
var logger = require('../lib/logger')


program
  .version(require('../package.json').version)
  .usage('<command> [options]')
  .command('init', 'generate a new react project')
  .parse(process.argv)
