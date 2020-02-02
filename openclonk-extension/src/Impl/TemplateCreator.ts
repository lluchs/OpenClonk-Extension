import { ITemplateCreator } from "../Ifaces/ITemplateCreator";
import { ITemplateDefinition } from "../Ifaces/ITemplateSelection";
import * as path from 'path';
import { workspace, Uri, window } from "vscode";

export class TemplateCreator implements ITemplateCreator {

    async createFromTemplate(templateDef: ITemplateDefinition, extensionPath: string, itemName: string, pathToParent: string) {

        const templatePath = path.join(extensionPath, "templates", templateDef.fsName);
        const templateUri = Uri.file(templatePath);
        let targetPath = path.join(pathToParent, itemName);

        try {
            workspace.fs.copy(templateUri, Uri.file(targetPath));
        }
        catch(e) {
            window.showErrorMessage(`An error occured during template creation.`);
            console.error(e);
        }

        return;
    }
}