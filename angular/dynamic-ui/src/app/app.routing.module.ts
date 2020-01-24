import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";

import { BasicDemoComponent } from "./basic/basic-demo.component";
import { PrimengDemoComponent } from "./primeng/primeng-demo.component";
import { MaterialDemoComponent } from "./material/material-demo.component";

const APP_ROUTES: Route[] = [
    {
        path: "",
        redirectTo: "basic",
        pathMatch: "full"
    },
    {
        path: "basic",
        component: BasicDemoComponent,
        data: {
            title: "Bsaic UI",
            href: "https://github.com/udos86/ng2-dynamic-forms/blob/master/example/app/basic/basic-example.model.ts",
            bgColor: "gray"
        }
    },
    {
        path: "material",
        component: MaterialDemoComponent,
        data: {
            title: "Material UI",
            href: "https://github.com/udos86/ng2-dynamic-forms/blob/master/example/app/basic/basic-example.model.ts",
            bgColor: "gray"
        }
    },
    {
        path: "primeng",
        component: PrimengDemoComponent,
        data: {
            title: "Primeng UI",
            href: "https://github.com/udos86/ng2-dynamic-forms/blob/master/example/app/basic/basic-example.model.ts",
            bgColor: "gray"
        }
    }
];
@NgModule({
   imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
