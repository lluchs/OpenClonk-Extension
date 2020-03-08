import * as vscode from 'vscode';
import { IC4groupProvider } from './Ifaces/IC4GroupProvider';
import { C4GroupProvider } from './Impl/C4GroupProvider';
import { IRunScenarioProvider } from './Ifaces/IRunScenarioProvider';
import { RunScenarioProvider } from './Impl/RunScenarioProvider';
import { ITemplateCreator } from './Ifaces/ITemplateCreator';
import { TemplateCreator } from './Impl/TemplateCreator';
import { ITemplateSelection } from './Ifaces/ITemplateSelection';
import { TemplateSelection } from './Impl/TemplateSelection';

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind
} from 'vscode-languageclient';

let client: LanguageClient;

function activateLS(context: vscode.ExtensionContext, oclspPath: string) {
  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  let serverOptions: ServerOptions = {
    run: { command: oclspPath },
    debug: { command: oclspPath },
  };

  // Options to control the language client
  let clientOptions: LanguageClientOptions = {
    // Register the server for OC c4script documents
    documentSelector: [{ scheme: 'file', language: 'ocs' }],
    synchronize: {
	  // Notify the server about file changes to '.clientrc files contained in the workspace
	  // TODO: what does this file do?
      fileEvents: vscode.workspace.createFileSystemWatcher('**/.clientrc')
    }
  };

  // Create the language client and start the client.
  client = new LanguageClient(
    'oclsp',
    'OpenClonk Language Server',
    serverOptions,
    clientOptions
  );

  // Start the client. This will also launch the server
  client.start();
}

export function activate(context: vscode.ExtensionContext) {
	const provider: IC4groupProvider = new C4GroupProvider();
	const runScenarioProvider: IRunScenarioProvider = new RunScenarioProvider();
	const templateCreator: ITemplateCreator = new TemplateCreator();
	const templateSelection: ITemplateSelection = new TemplateSelection();
	const outputChannel = vscode.window.createOutputChannel('OpenClonk');

	context.subscriptions.push(vscode.commands.registerCommand('oc-ext.unpackC4g', ({ fsPath }) => {
		provider.unpack(fsPath)
			.then(_ => vscode.commands.executeCommand("workbench.files.action.refreshFilesExplorer"));
	}));

	context.subscriptions.push(vscode.commands.registerCommand('oc-ext.packC4g', ({ fsPath, ...args }) => {
		provider.pack(fsPath)
			.then(_ => vscode.commands.executeCommand("workbench.files.action.refreshFilesExplorer"));
	}));

	context.subscriptions.push(vscode.commands.registerCommand('oc-ext.runScenarioInEditor', ({ fsPath }) => {
		runScenarioProvider.runScenarioInEditorMode(fsPath, outputChannel);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('oc-ext.createScenario', async ({ fsPath }) => {
		const result = await templateSelection.selectTemplate();
		
		if (result) {
			await templateCreator.createFromTemplate(result.templateDef, context.extensionPath, result.itemName, fsPath);
			vscode.commands.executeCommand("workbench.files.action.refreshFilesExplorer");
		}
	}));

  const oclsp = vscode.workspace.getConfiguration("oc-ext").get<string>("pathToOCLSPExecutable");
  if (oclsp)
    activateLS(context, oclsp);
  else
    vscode.window.showInformationMessage('Path to oclsp executable is not set, syntax checking is disabled. Please update your settings.');
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}

