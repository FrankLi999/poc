const resolve    = require("rollup-plugin-node-resolve"),
      sourcemaps = require("rollup-plugin-sourcemaps"),
      uglify     = require("rollup-plugin-uglify"),
      dateFormat = require("dateformat"),
      license    = require("fs").readFileSync("./LICENSE", "utf8");

const utils = {

    hasMinifyFlag: argv => {
        return !!argv.includes("--minify");
    },

    getBanner: packageJson => {
        return `/*!\n${packageJson.name} ${packageJson.version} ${dateFormat(Date.now(), "UTC:yyyy-mm-dd HH:MM")} UTC\n${license}\n*/`;
    },

    getRollupInputPath: packageJson => {

        let pkgNameSplit = packageJson.name.split("/");
        return `./dist-package/${packageJson.name}/src/${pkgNameSplit[pkgNameSplit.length - 1]}.js`;
    },

    getRollupOutputPath: (packageJson, format, minify) => {

        let pkgNameSplit  = packageJson.name.split("/"),
            bundleFolder  = format === "umd" ? "bundles" : "dynamic-ui",
            fileExtension = minify ? "min." : "";

        return `./dist-package/${packageJson.name}/${bundleFolder}/${pkgNameSplit[pkgNameSplit.length - 1]}.${format}.${fileExtension}js`;
    },

    getRollupPlugins: minify => {

        const plugins = [resolve(), sourcemaps()];

        if (minify) {
            plugins.push(uglify({output: {comments: (node, comment) => comment.value.startsWith("!")}}));
        }

        return plugins;
    },

    getRollupFormat: argv => {
        return argv[argv.indexOf("-f") + 1];
    },

    getRollupGlobals: () => {

        return {
            "@angular/animations": "ng.animations",
            "@angular/common": "ng.common",
            "@angular/core": "ng.core",
            "@angular/forms": "ng.forms",
            "@angular/material": "ng.material",
            "@angular/http": "ng.http",
            "@angular/platform-browser": "ng.platformBrowser",
            "@angular/platform-browser-dynamic": "ng.platformBrowserDynamic",
            "@angular/router": "ng.router",
            "@bpw-ui/base": "bpwUI.base",
            "angular2-text-mask": "angular2-text-mask",
            "primeng/primeng": "primeng/primeng",
            "rxjs/Observable": "Rx.Observable",
            "rxjs/Subject": "Rx.Subject",
            "rxjs/Subscription": "Rx.Subscription",
            "rxjs/BehaviorSubject": "Rx.BehaviorSubject",
            "rxjs/add/observable/of": "rxjs/add/observable/of",
            "rxjs/add/operator/map": "rxjs/add/operator/map",
            "rxjs/operator/filter": "rxjs/operator/filter",      
            "rxjs/operator/map": "rxjs/operator/map",
            "angular2-fontawesome": "angular2-fontawesome/angular2-fontawesome" 
        };
    }
};

module.exports = utils;
