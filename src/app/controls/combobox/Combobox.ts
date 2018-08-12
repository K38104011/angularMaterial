export class ComboboxConfig {
    required: boolean = false;
    api: string;
    text: string = "Text";
    value: string = "Value";
    textTemplateFn?: (item: any) => string;
    selectedValueTemplateFn?: (item: any) => string;

    constructor(){
        this.textTemplateFn = this.defaultTextTemplateFn;
        this.selectedValueTemplateFn = function(item) {
            if (item == null) {
                return '';
            };
            // bad practice
            // 'this' keyword is matautocomplete
            var element = this.template.elementRef.nativeElement;
            var dataSet = element.parentElement.dataset;
            var propertyName = dataSet.comboboxDisplayProp;
            return item[propertyName];
        }
    };

    private defaultTextTemplateFn(item: any) : string
    {
        return item[this.text];
    };
}