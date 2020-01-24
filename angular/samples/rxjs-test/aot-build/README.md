jit/AOT build, rollup(minifying and treeshaking)， inline templates, static template, 
   Angular has only one compiler and it is referred to as JIT or AOT 
   depending on when it is used. If it’s used during runtime in a browser 
   it is JIT. If you compile your components before the code is executed 
   in a browser, it’s AOT compilation. 
   https://angular.io/guide/aot-compiler#!#why-aot
   https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
   
   For angular2 AOT we will rely on the ngc command line tool (angular compiler) 
   which we just installed instead of the standard tsc (TypeScript compiler). 
   
   > npm install @angular/compiler-cli @angular/platform-server --save
   > npm install rollup rollup-plugin-node-resolve rollup-plugin-commonjs rollup-plugin-uglify --save-dev
   > .\node_modules\.bin\ngc -p tsconfig-aot.json
   > .\node_modules\.bin\rollup -c rollup-config.js
     "node_modules/.bin/rollup"  -c rollup-config.js
      > npm install lite-server --save-dev
   > node copy-dist-files
   > node copy-dist-files
   > npm run build:aot && npm run serve:aot
   rollup-config.js


   update ".angular-cli", set "index" to "index-jit.html",
   
   
   > Inspect the Bundle
   
   npm install source-map-explorer --save-dev
   "node_modules\.bin\source-map-explorer" aot/dist/build.js
   
   
   > use ngc to build prod lib: 
      "aot-prod": "ng build --prod --aot", 