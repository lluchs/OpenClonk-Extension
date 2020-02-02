import { ITemplateCreator } from "../Ifaces/ITemplateCreator";
import { ITemplateDefinition } from "../Ifaces/ITemplateSelection";


export class TemplateCreator implements ITemplateCreator {

    async createFromTemplate(templateDef: ITemplateDefinition, pathToParent: string) {
        return; 
    }
}