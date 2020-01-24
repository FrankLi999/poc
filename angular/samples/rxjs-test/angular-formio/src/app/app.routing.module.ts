import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";

// import { BasicExampleComponent } from "./basic/basic-example.component";
// import { BasicDynamicComponent } from "./basic/basic-dynamic.component";
import { BasicFormioComponent } from "./basic/basic-formio.component";
import { MaterialFormioComponent } from "./material/material-formio.component";
import { PrimengFormioComponent } from "./primeng/primeng-formio.component";
// import { BootstrapExampleComponent } from "./bootstrap/bootstrap-example.component";
// import { FoundationExampleComponent } from "./foundation/foundation-example.component";
// import { KendoExampleComponent } from "./kendo/kendo-example.component";
// import { MaterialExampleComponent } from "./material/material-example.component";
// import { MaterialDynamicComponent } from "./material/material-dynamic.component";
// import { MaterialLayoutComponent } from "./material/material-layout.component";
// import { NGBootstrapExampleComponent } from "./ng-bootstrap/ng-bootstrap-example.component";
// import { PrimeNGExampleComponent } from "./primeng/primeng-example.component";
// import { PrimeNGDynamicComponent } from "./primeng/primeng-dynamic.component";

const APP_ROUTES: Route[] = [
    {
        path: "",
        redirectTo: "/formio-basic",
        pathMatch: "full"
    }, /*{
        path: "example-basic",
        component: BasicExampleComponent,
        data: {
            title: "Basic UI",
            href: "https://github.com/udos86/ng2-dynamic-forms/blob/master/example/app/basic/basic-example.model.ts",
            bgColor: "gray"
        }
    }, 
    {
        path: "dynamic-basic",
        component: BasicDynamicComponent,
        data: {
            title: "Dynamic Basic UI",
            href: "https://github.com/udos86/ng2-dynamic-forms/blob/master/example/app/basic/basic-example.model.ts",
            bgColor: "gray"
        }
    },
    
    
    {
        path: "example-material",
        component: MaterialExampleComponent,
        data: {
            title: "Material UI",
            href: "https://github.com/udos86/ng2-dynamic-forms/blob/master/example/app/material/material-example.model.ts",
            bgColor: "#009688"
        }
    },
    {
        path: "dynamic-material",
        component: MaterialDynamicComponent,
        data: {
            title: "Dynamic Material UI",
            href: "https://github.com/udos86/ng2-dynamic-forms/blob/master/example/app/material/material-example.model.ts",
            bgColor: "#009688"
        }
    },
    {
        path: "material-layout",
        component: MaterialLayoutComponent,
        data: {
            title: "Material Layout",
            href: "https://github.com/udos86/ng2-dynamic-forms/blob/master/example/app/material/material-example.model.ts",
            bgColor: "#009688"
        }
    },
    {
        path: "example-primeng",
        component: PrimeNGExampleComponent,
        data: {
            title: "Prime NG UI",
            href: "https://github.com/udos86/ng2-dynamic-forms/blob/master/example/app/primeng/primeng-example.model.ts",
            bgColor: "#DB2226"
        }
    },
    {
        path: "dynamic-primeng",
        component: PrimeNGDynamicComponent,
        data: {
            title: "Dynamic Prime NG UI",
            href: "https://github.com/udos86/ng2-dynamic-forms/blob/master/example/app/primeng/primeng-example.model.ts",
            bgColor: "#DB2226"
        }
    },
    */
    {
        path: "formio-basic",
        component: BasicFormioComponent,
        data: {
            title: "Formio Basic UI",
            href: "https://github.com/udos86/ng2-dynamic-forms/blob/master/example/app/basic/basic-example.model.ts",
            bgColor: "gray"
        }
    },
    {
        path: "formio-material",
        component: MaterialFormioComponent,
        data: {
            title: "Formio Material UI",
            href: "https://github.com/udos86/ng2-dynamic-forms/blob/master/example/app/basic/basic-example.model.ts",
            bgColor: "gray"
        }
    },
    {
        path: "formio-primeng",
        component: PrimengFormioComponent,
        data: {
            title: "Formio Primeng UI",
            href: "https://github.com/udos86/ng2-dynamic-forms/blob/master/example/app/basic/basic-example.model.ts",
            bgColor: "gray"
        }
    }
    /*
    {
        path: "example-bootstrap",
        component: BootstrapExampleComponent,
        data: {
            title: "Bootstrap UI",
            href: "https://github.com/udos86/ng2-dynamic-forms/blob/master/example/app/bootstrap/bootstrap-example.model.ts",
            bgColor: "#6f5499"
        }
    },

    {
        path: "example-foundation",
        component: FoundationExampleComponent,
        data: {
            title: "Foundation UI",
            href: "https://github.com/udos86/ng2-dynamic-forms/blob/master/example/app/foundation/foundation-example.model.ts",
            bgColor: "#2199e8"
        }
    },
    {
        path: "example-ng-bootstrap",
        component: NGBootstrapExampleComponent,
        data: {
            title: "NG Bootstrap UI",
            href: "https://github.com/udos86/ng2-dynamic-forms/blob/master/example/app/ng-bootstrap/ng-bootstrap-example.model.ts",
            bgColor: "#1b95e0"
        }
    },
    {
        path: "example-kendo",
        component: KendoExampleComponent,
        data: {
            title: "Kendo UI",
            href: "https://github.com/udos86/ng2-dynamic-forms/blob/master/example/app/kendo/kendo-example.model.ts",
            bgColor: "#ff5747"
        }
    },
    {
        path: "example-async",
        loadChildren: "app/async/async-example.module#AsyncExampleModule"
    }*/
];

@NgModule({

    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}