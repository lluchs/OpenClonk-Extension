"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const C4GroupProvider_1 = require("./Impl/C4GroupProvider");
function activate(context) {
    const provider = new C4GroupProvider_1.C4GroupProvider();
    context.subscriptions.push(vscode.commands.registerCommand('oc-ext.unpackC4g', ({ fsPath }) => {
        provider.unpack(fsPath)
            .then(_ => vscode.commands.executeCommand("workbench.files.action.refreshFilesExplorer"));
    }));
    context.subscriptions.push(vscode.commands.registerCommand('oc-ext.packC4g', (_a) => {
        var { fsPath } = _a, args = __rest(_a, ["fsPath"]);
        provider.pack(fsPath)
            .then(_ => vscode.commands.executeCommand("workbench.files.action.refreshFilesExplorer"));
    }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map