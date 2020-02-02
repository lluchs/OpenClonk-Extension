import * as vscode from 'vscode';
import { IC4groupProvider } from './Ifaces/IC4GroupProvider';
import { C4GroupProvider } from './Impl/C4GroupProvider';
import { IRunScenarioProvider } from './Ifaces/IRunScenarioProvider';
import { RunScenarioProvider } from './Impl/RunScenarioProvider';
import { ITemplateCreator } from './Ifaces/ITemplateCreator';
import { TemplateCreator } from './Impl/TemplateCreator';
import { ITemplateSelection } from './Ifaces/ITemplateSelection';
import { TemplateSelection } from './Impl/TemplateSelection';

export function activate(context: vscode.ExtensionContext) {
	const provider: IC4groupProvider = new C4GroupProvider();
	const runScenarioProvider: IRunScenarioProvider = new RunScenarioProvider();
	const templateCreator: ITemplateCreator = new TemplateCreator();
	const templateSelection: ITemplateSelection = new TemplateSelection();

	context.subscriptions.push(vscode.commands.registerCommand('oc-ext.unpackC4g', ({ fsPath }) => {
		provider.unpack(fsPath)
			.then(_ => vscode.commands.executeCommand("workbench.files.action.refreshFilesExplorer"));
	}));

	context.subscriptions.push(vscode.commands.registerCommand('oc-ext.packC4g', ({ fsPath, ...args }) => {
		provider.pack(fsPath)
			.then(_ => vscode.commands.executeCommand("workbench.files.action.refreshFilesExplorer"));
	}));

	context.subscriptions.push(vscode.commands.registerCommand('oc-ext.runScenarioInEditor', ({ fsPath }) => {
		runScenarioProvider.runScenarioInEditorMode(fsPath);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('oc-ext.createScenario', async ({ fsPath }) => {
		const result = await templateSelection.selectTemplate();

		if (result) {
			await templateCreator.createFromTemplate(result.templateDef, result.itemName, fsPath);
			vscode.commands.executeCommand("workbench.files.action.refreshFilesExplorer");
		}
	}));
}

export function deactivate() { }