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


/**
 * Settings.
 */
var template = 'react-template'
var name = program.args[0]
var dir = program.directory
var to = resolve(name)
if (program.args.length < 1) return program.help()

/**
 * settings
 */
var name = program.args[0]
var to = resolve(name)
if (exists(to)) logger.fatal('"%s" already exists.', name)


/**
 * Detect if template on file system.
 */

if (exists(template)) {
    generate(template, to, function (err) {
        if (err) logger.fatal(err)
        console.log()
        logger.success('Generated "%s".', name)
    })
} else {
    /**
     * Detect official template.
     */

    if (!~template.indexOf('/')) {
        template = 'weenta/' + template
    }

    /**
     * Download and generate.
     */

    var tmp = '/tmp/react-template-' + uid()
    download(template, tmp, function (err) {
        if (err) logger.fatal(err)
        generate(tmp, to, function (err) {
            if (err) logger.fatal(err)
            rm(tmp)
            console.log()
            logger.success('Success Generated "%s".\n\nHave a good day', name)
        })
    })
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
    defaultName(opts)
    return opts
}

/**
 * Automatically infer the default project name
 *
 * @param {Object} opts
 */

function defaultName(opts) {
    var schema = opts.schema || (opts.schema = {})
    if (!schema.name || typeof schema.name !== 'object') {
        schema.name = {
            'type': 'string',
            'default': name
        }
    } else {
        schema.name['default'] = name
    }
}

/**
 * Generate a template given a `src` and `dest`.
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
    khaos.read(function (err, files) {
        if (err) logger.fatal(err)
        khaos.parse(files, function (err, schema) {
            if (err) logger.fatal(err)
            khaos.prompt(schema, function (err, answers) {
                if (err) logger.fatal(err)
                // work around prompt-for bug...
                // which ignores default value for strings
                // otherwise we can just use khaos.generate :(
                Object.keys(schema).forEach(function (key) {
                    if (
                        typeof schema[key] === 'object' &&
                        schema[key].type === 'string' &&
                        schema[key].default != null &&
                        answers[key] === ''
                    ) {
                        answers[key] = schema[key].default
                    }
                })
                khaos.write(dest, files, answers, fn)
            })
        })
    })
}