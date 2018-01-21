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

var tmp = '/tmp/vue-template-' + uid()
download(template, tmp, { clone: clone }, function (err) {
    if (err) logger.fatal(err)
    generate(tmp, to, function (err) {
        if (err) logger.fatal(err)
        rm(tmp)
        console.log()
        logger.success('Generated "%s".', name)
    })
})

/**
 * Generate a template given a `src` and `dest`.
 * 生成模板
 *
 * @param {String} src
 * @param {String} dest
 * @param {Function} fn
 */

function generate(src, dest, fn) {
    var template = join(src, 'template')
    var khaos = new Khaos(template)
    var opts = options(src)

    khaos.schema(opts.schema)
    khaos.generate(dest, fn)
}


/**
 * Read prompts metadata.
 *
 * @param {String} dir
 * @return {Object}
 */
function options(dir) {
    var file = join(dir, 'meta.json')
    var opts = exists(file)
        ? metadata.sync(file)
        : {}

    setDefault(opts, 'name', name)

    var author = getGitUser()
    if (author) {
        setDefault(opts, 'author', author)
    }

    return opts
}

/**
 * Set the default value for a schema key
 *
 * @param {Object} opts
 * @param {String} key
 * @param {String} val
 */

function setDefault(opts, key, val) {
    var schema = opts.schema || (opts.schema = {})
    if (!schema[key] || typeof schema[key] !== 'object') {
        schema[key] = {
            'type': 'string',
            'default': val
        }
    } else {
        schema[key]['default'] = val
    }
}
