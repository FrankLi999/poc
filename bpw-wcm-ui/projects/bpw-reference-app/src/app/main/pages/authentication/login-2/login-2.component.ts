import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UIConfigService, wcmAnimations } from 'bpw-common';

@Component({
    selector     : 'login-2',
    templateUrl  : './login-2.component.html',
    styleUrls    : ['./login-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : wcmAnimations
})
export class Login2Component implements OnInit
{
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {UIConfigService} _uiConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _uiConfigService: UIConfigService,
        private _formBuilder: FormBuilder
    )
    {
        // Configure the layout
        this._uiConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
}
