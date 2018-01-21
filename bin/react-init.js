#!/usr/bin/env node

var Khaos = require('khaos-patched')
var metadata = require('read-metadata')
var download = require('download-git-repo')
var program = require('commander')
var exists = require('fs').existsSync
var join = require('path').join
var resolve = require('path').resolve
var rm = require('rimraf').sync
var uid = require('uid')
var chalk = require('chalk')
var logger = require('../lib/logger')
// var getGitUser = require('../lib/git-user')

/**
 * usage
 */
program
    .usage('<template-name> <project-name>')
    .option('-c, --clone', 'use git clone')

/**
 * help
 */
program.on('--help', function () {
    console.log('========================================')
    console.log('program.args')
    console.log(program.args)
    console.log('========================================')
    console.log('  Examples:')
    console.log()
    console.log(chalk.gray('    # create my project'))
    console.log('    $ myreact init my-project')
    console.log()
   
})


/**
 * Help.
 * 打印--help信息
 */
program.parse(process.argv)
if (program.args.length < 1) return program.help()

/**
 * settings
 */
var name = program.args[0]
var to = resolve(name)
// 文件已存在 则提示
if (exists(to)) logger.fatal('"%s" already exists.', name)



/**
 * Download and generate.
 */
var gitRepo = 'weenta/antd-todolist'

download(gitRepo, to, { clone: true }, function (err) {
    if (err) logger.fatal(err)
    console.log('success')
})

