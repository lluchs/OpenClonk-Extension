import { ITemplateDefinition } from "./ITemplateSelection";

export interface ITemplateCreator {
    createFromTemplate(templateDef: ITemplateDefinition, itemName: string, pathToParent: string): Thenable<void>;
}