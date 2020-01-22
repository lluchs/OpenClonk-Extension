import * as vscode from 'vscode';
import { IC4groupProvider } from './Ifaces/IC4GroupProvider';
import { C4GroupProvider } from './Impl/C4GroupProvider';

export function activate(context: vscode.ExtensionContext) {
	const provider: IC4groupProvider = new C4GroupProvider();

	context.subscriptions.push(vscode.commands.registerCommand('oc-ext.unpackC4g', ({ fsPath }) => {
		provider.unpack(fsPath)
			.then(_ => vscode.commands.executeCommand("workbench.files.action.refreshFilesExplorer"));
	}));

	context.subscriptions.push(vscode.commands.registerCommand('oc-ext.packC4g', ({ fsPath, ...args }) => {
		provider.pack(fsPath)
			.then(_ => vscode.commands.executeCommand("workbench.files.action.refreshFilesExplorer"));
	}));
}

export function deactivate() { }