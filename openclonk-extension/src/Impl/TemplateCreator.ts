import { ITemplateCreator } from "../Ifaces/ITemplateCreator";
import { InputBoxOptions, window, workspace } from "vscode";

interface TemplateEntry {
    label: string,
    fsName: string,
    isFolder: boolean,
    prompt: string,
}

const templatesConfig: {
    templates: TemplateEntry[]
} = {
    templates: [{
        label: "Scenario",
        fsName: "ocs",
        isFolder: true,
        prompt: "Scenario name"
    }, {
        label: "Object",
        fsName: "ocd",
        isFolder: true,
        prompt: "Object name"
    }],
};

export class TemplateCreator implements ITemplateCreator {

    createScenarioTemplate(): void {
    }

    createObjectTemplate(): void {
    }

    openTemplateCreation(pathToParent: string) {
        const templateNames = templatesConfig.templates.map(entry => entry.label);

        window.showQuickPick(templateNames)
            .then(templateName => {
                if (!templateName)
                    return;

                const idx = templateNames.indexOf(templateName);
                const template = templatesConfig.templates[idx];

                const inputBoxOptions: InputBoxOptions = {
                    prompt: templateName.trim() + ": ",
                    placeHolder: "(Itemname)",
                };

                window.showInputBox(inputBoxOptions)
                    .then(value => {
                        
                        // workspace.fs.copy();
                        console.log(value);
                    });
            });
    }

    private getTemplatesPath() {

    }
}