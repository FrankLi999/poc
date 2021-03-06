export class BaseMewResourceDialog {
  jsonFormObject: any;
  jsonFormOptions: any = {
    addSubmit: true, // Add a submit button if layout does not have one
    debug: false, // Don't show inline debugging information
    loadExternalAssets: true, // Load external css and JavaScript for frameworks
    returnEmptyFields: false, // Don't return values for empty input fields
    setSchemaDefaults: true, // Always use schema defaults for empty fields
    defautWidgetOptions: { feedback: true }, // Show inline feedback icons
  };
  selectedFramework = 'material-design';
  selectedLanguage = 'en';
  constructor(protected data: any) { 
  }

  ngOnInit() {
    this.jsonFormObject = this.data.jsonFormObject;
  }
}
