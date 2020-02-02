import { ITemplateDefinition } from "./ITemplateSelection";

export interface ITemplateCreator {
    createFromTemplate(templateDef: ITemplateDefinition): Thenable<void>;
}