

export interface ITemplateCreator {
    createScenarioTemplate(): void;
    createObjectTemplate(): void;
    openTemplateCreation(pathToParent: string): void;
}