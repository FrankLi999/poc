## Before upgrade
1. replace HttpModule with HttpClientModule
   and remove "@angular/http" from package.json, make it it has "@angular/common"
2. replace rxjs-compat
3. If you use the Angular Service worker, migrate any versionedFiles to the files array. The behavior is the same.
4. Stop using matRippleSpeedFactor and baseSpeedFactor for ripples, using Animation config instead.

## Upgrde to v8
1. ng update @angular/cli@8 @angular/core@8
2. Replace /deep/ with ::ng-deep in your styles
https://angular.io/guide/component-styles#deprecated-deep--and-ng-deep
3. Angular now uses TypeScript 3.4
4. Make sure you are using Node 10 or later.
5. The CLI's build command now automatically creates a modern ES2015 build with minimal polyfills and a compatible ES5 build for older browsers, and loads the appropriate file based on the browser. You may opt-out of this change by setting your target back to es5 in your tsconfig.json.
6. If you use ViewChild or ContentChild, we're updating the way we resolve these queries to give developers more control. You must now specify that change detection should run before results are set. Example: @ContentChild('foo', {static: false}) foo !: ElementRef;. ng update will update your queries automatically, but it will err on the side of making your queries static for compatibility.
https://angular.io/guide/static-query-migration
originally,
// query results sometimes available in `ngOnInit`, sometimes in `ngAfterViewInit` (based on template)
@ViewChild('foo') foo: ElementRef;
after the upgrade:
// query results available in ngOnInit
@ViewChild('foo', {static: true}) foo: ElementRef;

OR

// query results available in ngAfterViewInit
@ViewChild('foo', {static: false}) foo: ElementRef;
7. Update Angular Material to version 8 by running ng update @angular/material@8 in your terminal.
8. Instead of importing from @angular/material, you should import deeply from the specific component. E.g. @angular/material/button. ng update will do this automatically for you.
9. For lazy loaded modules via the router, make sure you are using dynamic imports. Importing via string is removed in v9. ng update should take care of this automatically.
https://angular.io/guide/deprecations#loadchildren-string-syntax
10. We are deprecating support for @angular/platform-webworker, as it has been incompatible with the CLI. Running Angular's rendering architecture in a web worker did not meet developer needs. You can still use web workers with Angular. Learn more in our web worker guide.
https://angular.io/guide/web-worker
11. We have switched from the native Sass compiler to the JavaScript compiler. To switch back to the native version, install it as a devDependency: npm install node-sass --save-dev.
12. If you are building your own Schematics, they have previously been potentially asynchronous. As of 8.0, all schematics will be asynchronous.
14. Make sure you are using Node 10.13 or later.
15. ng update @angular/core@8 @angular/cli@8 in your workspace directory to update to the latest 8.x version of @angular/core and @angular/cli and commit these changes.
You can optionally pass the --create-commits (or -C) flag to ng update commands to create a git commit per individual migration.
16. npm install --save tslib
    npm outdated
       replace outdates dependencies
17. ng update @angular/core @angular/cli
    now it is typescript 3.7
    npm install --save-dev @angular-devkit/schematics
17. ng update @angular/material