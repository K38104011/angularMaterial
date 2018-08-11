export class ComboboxItem {
    TemplateDisplay: string;
    [key: string]: any;
}

export class ComboboxConfig {
    Api: string;
    SearchValue: string;
    displayTemplate?: (item: ComboboxItem) => string;
}