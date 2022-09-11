# WEBSITE BASE

### Simple web site sources with gulp

![DEMO](https://cdn.discordapp.com/attachments/650681889308278785/1018540399029133402/demo.png)

### DEPENDENCIES

`NodeJS` to work with gulp [[install NodeJS](https://nodejs.org/en/)]

`make` to use Makefile


### INSTALL

```powershell
git clone https://github.com/Avdushin/WebSiteBase
cd WebSiteBase
make setup
```

### HAND INSTALL

or you can start `install/node-v16.17.0-x64.msi` to download nodejs-v16.17.0

```powershell
npm init -y
npm i -D gulp gulp-file-include gulp-remove-empty-lines gulp-csso browser-sync del gulp-htmlmin gulp-replace fs
```

### USAGE:

#### Make

* Type `make setup` to install gulp && packages
* Type `make clean` to clean `dist` folder

#### gulp

* Type `gulp` or `gulp server` to build and run server at the localhost:3000
* Type `gulp build` to build site

