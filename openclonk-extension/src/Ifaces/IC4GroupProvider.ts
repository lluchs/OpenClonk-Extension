
export interface IC4groupProvider {
	unpack(pathToFolder: string): Thenable<void>;
	pack(pathToFolder: string): Thenable<void>;
}