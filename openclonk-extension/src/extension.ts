import * as vscode from 'vscode';
import { exec } from 'child_process';

export interface IC4groupProvider {
	unpack(pathToFolder: string): void;
	pack(pathToFolder: string): void;
}

class C4GroupProvider {
	public static ARG_EXPLODE = "-x";
	public static ARG_PACK = "-p";
	public static PATH_TO_C4GROUP = `D:\\oc\\OpenClonk-win-x64\\c4group.exe`;

	public unpack(pathToFolder: string) {
		if (this.canExecute()) {
			this.execute([pathToFolder, C4GroupProvider.ARG_EXPLODE]);
		}
	}

	public pack(pathToFolder: string) {
		if (this.canExecute()) {
			this.execute([pathToFolder, C4GroupProvider.ARG_PACK]);
		}
	}

	private canExecute() {
		return true;
	}

	private execute(args: string[]) {
		const cmdString = [C4GroupProvider.PATH_TO_C4GROUP, ...args].join(" ");
		
		console.log(`Executing: ${cmdString}`);

		exec(cmdString, (error, stdout, stderr) => {
			if (error) {
				vscode.window.showErrorMessage('Failed to invoke c4group executable.');
				console.error(error);
			}
			else if(stderr)
			{
				vscode.window.showErrorMessage('Failed to invoke c4group executable.');
				console.error(stderr);
			}
			console.log(stdout);
		})
	}
}

export function activate(context: vscode.ExtensionContext) {
	const provider: IC4groupProvider = new C4GroupProvider();

	context.subscriptions.push(vscode.commands.registerCommand('oc-ext.unpackC4g', ({ fsPath }) => {
		provider.unpack(fsPath);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('oc-ext.packC4g', ({ fsPath }) => {
		provider.pack(fsPath);
	}));
}

export function deactivate() { }