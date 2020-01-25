import { IRunScenarioProvider } from "../Ifaces/IRunScenarioProvider";
import { exec } from 'child_process';
import { exists } from 'fs';
import * as vscode from 'vscode';

export class RunScenarioProvider implements IRunScenarioProvider {
    public runScenarioInEditorMode(pathToScenario: string) {
        const pathToExecutable = this.getPathToGameExecutable();

        if (!pathToExecutable) {
            vscode.window.showInformationMessage('Path to OpenClonk executable is not set. Please update your settings.');
            return;
        }

        this.execute([pathToScenario]);
    }

    private execute(args: string[]) {
        const pathToExecutable = this.getPathToGameExecutable();

        if (!pathToExecutable) {
            vscode.window.showInformationMessage('Path to OpenClonk executable is not set. Please update your settings.');
            return;
        }

        const cmdString = [pathToExecutable, ...args].join(" ");

        exec(cmdString, (err) => {
            if (err) {
                this.provideDiagnostics(err, cmdString);
            }
        });
    }

    private provideDiagnostics(err: Error, cmdString: string) {
        const pathToExecutable = this.getPathToGameExecutable() as string;

        exists(pathToExecutable, (doesExist) => {
            if (doesExist) {
                // vscode.window.showErrorMessage('Failed to invoke OpenClonk executable.');
                console.log(`Calling Game-Executable by: ${cmdString}`);
                console.error(err);
            }
            else {
                vscode.window.showErrorMessage(`OpenClonk executable could not be found at: "${pathToExecutable}". Please check your settings.`);
            }
        });
    }

    private getPathToGameExecutable() {
        return vscode.workspace.getConfiguration("oclang").get<string>("pathToGameExecutable");
    }
}