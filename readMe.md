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

```

- download-github-repo    
Download and extract a GitHub repository from node.
```js
  API
  download(repo, destination, callback)
```

- khaos (deprecated)       
A super-simple way to scaffold new projects.
```js
  khaos create segmentio/khaos-node my-new-project
```

- read-metadata    
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

### `/lib`
存放库文件