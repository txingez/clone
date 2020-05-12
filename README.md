# gulp-webpack-reactjs-redux
Build reactJs - redux project by gulp &amp; webpack

Execute below command on project root
```
$ sh setup.sh
```
### Set environment variables（optional）
```
export PATH=./node_modules/.bin:$PATH
```

You can use commands that installed by npm.
* If you want to fix environment variables, please add above on your shell setting file(~/.zshrc ~/.bashrc etc...)

### gulp

gulp is task automation tool that using Node.js.
This will do building, testing ...etc.
Here are some generally commands.

```
$ npm install -g gulp
```

##### Build
```
$ gulp
```
Default building process.
This will make below directory.

 `.build` : Files for test. This is not minified, so it keeps readability.
 `dist` : Files for production. This is minified.


 ```
 $ gulp script
 ```

 This will build `main/scripts`

 ```
 $ gulp style
 ```

This will build `main/styles`

 ```
 $ gulp clean
 ```
 This will remove all files created by building.
 If you met some problem with cache, please try to do this.

```
$ gulp lint
```
This will execute only lint command for syntax check.
lint will be done when building, but execute this command is more faster if you only need to syntax check.

##### Launch server
```
$ gulp server
```
Launch testing server refer to `.build`

```
$ gulp server:dist
```
Launch testing server refer to `dist`

```
$ gulp server:frontonly
```
If backend is not available yet, you can launch server with mock of backend/
This will help you to confirm backend specification or develop on pararrel.
It will read Json file in `src/backendjson`

#### generate module
```
$ gulp make:ui --name 'modulename'
```
make a new module by gulp

##### DummyData
```
$ gulp mocky
```

```
 api mocky
 https://chrome.google.com/webstore/detail/dhc-resthttp-api-client/aejoelaoggembcahagimdiliamlcdmfm?utm_source=chrome-ntp-launcher
 http://localhost:4321/api/ + path --> test mocky
```
##### Setting on IntelliJ
* Preferences > Languages & Frameworks > Change 'JavaScript language version' of 'JavaScript' to 'ReactJs in ECMAScript 6'
* Preferences > Editor > Code Style > Enable Editor Config
* Preferences > Languages & Frameworks >  JavaScript > Code Quality Tools > ESLint > Enable & node path
* Heavy? File > Invalidate Caches on Invalidate
