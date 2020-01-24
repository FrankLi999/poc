import {Component,HostListener,Directive,HostBinding} from '@angular/core';

@Directive({
    // this directive will work only if the DOM el has the c_highlight class
    selector: '.c_highlight'
 })
export class HostDirective {

  // we could pass lots of thing to the HostBinding function. 
  // like class.valid or attr.required etc.
  @HostBinding('style.backgroundColor') c_colorrr = "red"; 
  @HostBinding('attr.role') role = 'button';
  @HostListener('mouseenter') c_onEnterrr() {
   this.c_colorrr= "blue" ;
  }

  @HostListener('mouseleave') c_onLeaveee() {
   this.c_colorrr = "yellow" ;
  } 
}