"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const child_process_1 = require("child_process");
class C4GroupProvider {
    unpack(pathToFolder) {
        if (this.canExecute()) {
            return this.execute([pathToFolder, C4GroupProvider.ARG_EXPLODE]);
        }
        return Promise.resolve();
    }
    pack(pathToFolder) {
        if (this.canExecute()) {
            return this.execute([pathToFolder, C4GroupProvider.ARG_PACK]);
        }
        return Promise.resolve();
    }
    canExecute() {
        return true;
    }
    execute(args) {
        const cmdString = [C4GroupProvider.PATH_TO_C4GROUP, ...args].join(" ");
        return new Promise((resolve) => {
            child_process_1.exec(cmdString, (error, _stdout, _stderr) => {
                if (error) {
                    vscode.window.showErrorMessage('Failed to invoke c4group executable.');
                }
                resolve();
            });
        });
    }
}
exports.C4GroupProvider = C4GroupProvider;
C4GroupProvider.ARG_EXPLODE = "-x";
C4GroupProvider.ARG_PACK = "-p";
C4GroupProvider.PATH_TO_C4GROUP = `D:\\oc\\OpenClonk-win-x64\\c4group.exe`;
//# sourceMappingURL=C4GroupProvider.js.map