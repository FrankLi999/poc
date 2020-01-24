#HostListener 
    ref highlight.directive.ts.

    The @HostListener decorator lets you subscribe to events of the DOM element.
    Declares a host listener.Angular will invoke the decorated method when the host element emits the specified event. 
    
    HostListener - will listen to the event emitted by host element, declared with @HostListener.

    @Directive({
    selector: '[myHighlight]'
    })
    export class HighlightDirective {

        constructor(private el: ElementRef) { }

        @Input('myHighlight') highlightColor: string;

        @HostListener('mouseenter') onMouseEnter() {
            this.highlight(this.highlightColor || 'red');
        }
        ...
         private highlight(color: string) {
            this.el.nativeElement.style.backgroundColor = color;
        }
    }
#@HostBinding
    ref "host.directive.ts"
    Declares a host property binding.Angular automatically checks host property bindings during change detection. If a binding changes, it will update the host element of the directive. 

    HostBinding - will bind property to host element, If a binding changes, HostBinding will update the host element.

#moduleId: module.id,
    Update for (2017-03-13):
        We strongly encourage you to only write component-relative paths. That is the only form of URL discussed in these docs. You no longer need to write @Component({ moduleId: module.id }), nor should you.

    The beta release of Angular2 (since alpha.51) supports relative assets for components, like templateUrl and styleUrls in the @Component decorator.

    module.id works when using CommonJS. You don't need to worry about how it works.

    If you are using webpack for bundling then you don't need  module.id in decorator. Webpack plugins auto handle (add it)  module.id in final bundle

    Why is it necessary to use moduleId:module.id at the time of using templateUrl in Angular 2 Component?

    moduleId is used to resolve relative paths for your stylesheets and templates as it says in the documentation.

    Without Module ID

        @Component({
        selector: 'my-component',
        templateUrl: 'app/components/my.component.html',
        styleUrls:  ['app/components/my.component.css'] 
        })
    With Module ID

        @Component({
        moduleId: module.id,
        selector: 'my-component',
        templateUrl: 'my.component.html', 
        styleUrls:  ['my.component.css'] 
        })

# Property binding vs attribute interpolation
    http://ghost-imperativedesign.herokuapp.com/angular-2-property-and-attribute-binding-explained-in-depth/

    Standard Element Attributes
        Standard element attributes are only strings that you write when you create your markup. They usually are just attatched to provide a default or initial value. 

    Element Properties
        roperties on the other hand, live a fast pace exiting life, they can be the result of expressions, functions, change at runtime, ect. In other words, they can be dynamic.
    The moment of truth: When attributes become properties
        When the browser reads your markup it converts the HTML to DOM nodes. Those elements become objects, DOM nodes, and the attributes become properties. There isn't always a one to one conversion. Take for instance an attribute of class. It doesn't convert to a property of class, but instead it becomes classList.

        An object's property can be almost anything. You can have a string, a function, another object, almost anything. Inversely an attribute is just a string. Angular has a declarative syntax that let's you bind directly to an element's properties and it calls this syntax property binding. It looks a little something like this:

        <input id="username" type="text" name="username" [value]="'paul1234'">  
        The snippet above binds the string paul1234 to the value property of the input.

        That's not the thing thats so magical though. Angular's main purpose or property binding is to let you pass data from your component instance, directly to the template.

        Angular's main purpose or property binding is to let you pass data from your component instance, directly to the template.

    Property binding:
    [trueValue]="'Y'", Note the additional quotes to make Y a string.

    Plain attributes are also assigned to inputs:
        trueValue="Y"
    Another way is string interpolation
        trueValue="{{true}}"

    To explicitly bind to an attribute instead of a property you can use (besides trueValue="Y" which creates an attribute but doesn't do any evaluation)

        [attr.trueValue]="'Y'"
        or

        attr.trueValue="{{'Y'}}"

        Attribute binding is helpful if you want to use the trueValue attribute to address the element with CSS selectors.
#Change detection stragtegy: default, OnPush
   
   OnPush is for performance.

# View Encapsulation
    Emulated (default) - styles from main HTML propagate to the component. Styles defined in this component's @Component decorator are scoped to this component only.

    Native - styles from main HTML do not propagate to the component. Styles defined in this component's @Component decorator are scoped to this component only.

    None - styles from the component propagate back to the main HTML and therefore are visible to all components on the page. Be careful with apps that have None and Native components in the application. All components with None encapsulation will have their styles duplicated in all components with Native encapsulation.

#Decorator

#ViewChild, ViewContent


#18n/ng xi18n, 

#Lodash 

#hmr 

#Immutible, Ramda

#Javascript functional programming