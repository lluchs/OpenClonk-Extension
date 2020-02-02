
export interface ITemplateDefinition {
    label: string,
    fsName: string,
    isFolder: boolean,
    prompt: string,
}

export interface ITemplateSelectionResult {
    templateDef: ITemplateDefinition,
    itemName: string,
}

export interface ITemplateSelection {
    selectTemplate(): Thenable<ITemplateSelectionResult | null>;
}