"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const child_process_1 = require("child_process");
class C4GroupProvider {
    unpack(pathToFolder) {
        if (this.canExecute()) {
            this.execute([pathToFolder, C4GroupProvider.ARG_EXPLODE]);
        }
    }
    pack(pathToFolder) {
        if (this.canExecute()) {
            this.execute([pathToFolder, C4GroupProvider.ARG_PACK]);
        }
    }
    canExecute() {
        return true;
    }
    execute(args) {
        const cmdString = [C4GroupProvider.PATH_TO_C4GROUP, ...args].join(" ");
        console.log(`Executing: ${cmdString}`);
        child_process_1.exec(cmdString, (error, stdout, stderr) => {
            if (error) {
                vscode.window.showInformationMessage('Failed to invoke c4group executable.');
                console.error(error);
            }
            else if (stderr) {
                vscode.window.showInformationMessage('Failed to invoke c4group executable.');
                console.error(stderr);
            }
            console.log(stdout);
        });
    }
}
C4GroupProvider.ARG_EXPLODE = "-x";
C4GroupProvider.ARG_PACK = "-p";
C4GroupProvider.PATH_TO_C4GROUP = `D:\\oc\\OpenClonk-win-x64\\c4group.exe`;
function activate(context) {
    const provider = new C4GroupProvider();
    context.subscriptions.push(vscode.commands.registerCommand('oc-ext.unpackC4g', ({ fsPath }) => {
        provider.unpack(fsPath);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('oc-ext.packC4g', ({ fsPath }) => {
        provider.pack(fsPath);
    }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map