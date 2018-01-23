# React-cli-project Notes

## packages
- chalk        
终端彩色输出

- commander        
The complete solution for node.js command-line interfaces, 
```js
#!/usr/bin/env node
 
/**
 * Module dependencies.
 */
 
var program = require('commander');
 
program
  .version('0.1.0')
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);
 
console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbqSauce) console.log('  - bbq');
console.log('  - %s cheese', program.cheese);

commander 默认存在两个选项 -V 和 -h，代表查看版本和查看帮助
.usage('<path>[options]')
    .parse(process.argv)

console.log(program.args) // 默认去除progress.argv前两项后所得的参数 

```
```js
#! /usr/bin/env node

var program = require('commander')

program
    .version(require('../package.json').version)
    .usage('<path>[options]')
    .parse(process.argv)

console.log(program.args)

 $mycli a -b -c
 ['a']
 a 为参数（argument）
 b、c为选项（options)
 
```



- download-github-repo    
Download and extract a GitHub repository from node.
```js
  API
  download(repo, destination, callback)
```

- khaos (deprecated)       
A super-simple way to scaffold new projects.    
搭建新项目脚手架    
```js
  khaos create segmentio/khaos-node my-new-project
```

- read-metadata        
Load a JSON or YAML metadata file and return it as an object.      
```js
  var read = require('read-metadata');
  
  read('path/to/metadata.json', function(err, data){
      console.log(data);
  });
```

- request   
Request is designed to be the simplest way possible to make http calls
```js
var request = require('request');
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
  
```

- rimraf    
The UNIX command rm -rf for node.     
```js
rimraf(f, [opts], callback)
```


### `/bin`    
存放可执行文件   
- `/bin/react`    
命令行提示信息


### `/lib`
存放库文件

### `npm link`    
执行package.json中的bin命令； 对应一个可执行本地文件地址； 相当于全局安装一个本地模块； 可用于测试本地模块

`npm unlink` 删除


- todo 
  - 更新template
  - 默认模板
  - 更新模板
