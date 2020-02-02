import { ITemplateDefinition } from "./ITemplateSelection";

export interface ITemplateCreator {
    createFromTemplate(templateDef: ITemplateDefinition, pathToParent: string): Thenable<void>;
}