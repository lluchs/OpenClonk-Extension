import { IC4groupProvider } from "../Ifaces/IC4GroupProvider";
import * as vscode from 'vscode';
import { exec } from 'child_process';

export class C4GroupProvider implements IC4groupProvider {
    public static ARG_EXPLODE = "-x";
    public static ARG_PACK = "-p";

    public unpack(pathToFolder: string): Thenable<void> {
        if (this.canExecute()) {
            return this.execute([pathToFolder, C4GroupProvider.ARG_EXPLODE]);
        }

        return Promise.resolve();
    }

    public pack(pathToFolder: string): Thenable<void> {
        if (this.canExecute()) {
            return this.execute([pathToFolder, C4GroupProvider.ARG_PACK]);
        }

        return Promise.resolve();
    }

    private canExecute() {
        return true;
    }

    private getPathToExecutable() {
        return vscode.workspace.getConfiguration("oclang").get<string>("pathToC4gExecutable");
    }

    private execute(args: string[]): Thenable<void> {
        const pathToExecutable = this.getPathToExecutable();

        if (!pathToExecutable) {
            return Promise.resolve();
        }

        const cmdString = [pathToExecutable, ...args].join(" ");

        return new Promise<never>((resolve) => {
            exec(cmdString, (error, _stdout, _stderr) => {
                if (error) {
                    vscode.window.showErrorMessage('Failed to invoke c4group executable.');
                }

                resolve();
            });
        });
    }
}