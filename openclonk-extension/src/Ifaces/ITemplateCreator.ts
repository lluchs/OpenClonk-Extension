import { ITemplateDefinition } from "./ITemplateSelection";

export interface ITemplateCreator {
    createFromTemplate(
        templateDef: ITemplateDefinition,
        extensionPath: string,
        itemName: string,
        pathToParent: string): Thenable<void>;
}