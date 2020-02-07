import { OutputChannel } from "vscode";

export interface IRunScenarioProvider {
    runScenarioInEditorMode(pathToScenario: string, output: OutputChannel): void;
}