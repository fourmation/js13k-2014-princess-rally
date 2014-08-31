# js13k Princess Rally

* Authors:
** Zak Henry <zak@4mation.com.au>


# Development notes

***

## Prerequisites

1.  Git Installed
2.  NodeJS Installed (http://nodejs.org)
    See notes below for extra steps if using Windows Git Bash.

## Quick Start

1. Clone this repo
    ```sh
    $ https://github.com/xiphiaz/js13k-server-boilerplate.git your-game-name
    ```

2. cd into directory
    ```sh
    $ cd your-game-name
    ```

3. Install Global NodeJS modules (sudo should not be needed, if you get errors see (http://stackoverflow.com/a/21712034)
    ```sh
    $ npm install -g grunt-cli
    ```

4. Install Local NodeJS modules
    ```sh
    $ npm install
    ```
5. Edit the config .json files (./package.json, ./src/game.json, ./src/game/package.json) to your game name and info
    * note the ./package.json "name" attribute - this is used later to install your game to the sandbox server

6. Run Grunt task
    The following happens:
    * Code is linted and copied into build folder, index.html has it's assets (js/css etc) linked
    * Built code is minified, application javascripts is concatenated into bin folder
    * All code is archived into a .zip (Check your output is under 13k!)
    ```sh
    $ grunt
    ```


## Example output
```sh
$ grunt
Running "clean:build" (clean) task
Cleaning "build/"...OK

Running "jshint:src" (jshint) task
>> 2 files lint free.

Running "jshint:gruntfile" (jshint) task
>> 1 file lint free.

Running "jshint:globals" (jshint) task
>> 0 files lint free.

Running "less:build" (less) task
File build/game/app/css/global.css created: 0 B → 21 B

Running "copy:build_assets" (copy) task
Created 1 directories, copied 1 files

Running "copy:build_sandbox_files" (copy) task
Copied 3 files

Running "copy:build_appjs" (copy) task
Copied 2 files

Running "copy:build_serverjs" (copy) task
Copied 2 files

Running "index:build" (index) task

Running "clean:compile" (clean) task
Cleaning "bin/"...OK
Cleaning "compressed/"...OK

Running "less:compile" (less) task
File build/game/app/assets/princess-rally.css created: 21 B → 13 B

Running "copy:compile_sandbox_files" (copy) task
Copied 3 files

Running "copy:compile_assets" (copy) task
Created 1 directories, copied 2 files

Running "copy:compile_serverjs" (copy) task
Created 2 directories, copied 2 files

Running "concat:compile_app_js" (concat) task
File "bin/game/app/princess-rally.js" created.

Running "uglify:compile" (uglify) task
File "bin/game/server/baz/bar.js" created.
File "bin/game/server/server.js" created.

Running "index:compile" (index) task

Running "compress:main" (compress) task
Created compressed/princess-rally.zip (8.1 kB)

Done, without errors.
```

# Development
While developing, you can use the grunt task
```sh
$ grunt watch
```
To watch the files that have been changed to automatically complete the build process.

# Testing in js-game-server (https://github.com/aurium/js-game-server)

1. Complete the installation in the readme
2. Test the example games are working at http://localhost:3000
3. cd into the games folder (current default is ./examples, though this may change soon
4. Symlink your game build folder into the games folder.
    Example:
    ```sh
    $ ln -s ~/sites/js14k/your-game-name/build your-game-name
    ```
5. Restart the server
    ```sh
    $ cd <js-game-server dir>
    npm start
    ```
6. Test your game
7. To test your compiled and minified game, symlink the bin folder instead.

Happy programming :)

### This toolchain is inspired by:
* ng-boilerplate (http://joshdmiller.github.com/ng-boilerplate)

