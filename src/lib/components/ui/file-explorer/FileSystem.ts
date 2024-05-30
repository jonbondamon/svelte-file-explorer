// FileSystem.ts

type FileNode = {
    name: string;
    type: "file";
};

type FolderNode = {
    name: string;
    type: "folder";
    children: Array<FileNode | FolderNode>;
};

type FileSystemNode = FileNode | FolderNode;

class FileSystem {
    private fileSystem: FolderNode;
    private currentNode: FolderNode;
    private path: string[];
    private history: string[][];

    constructor(fileSystemJson: string) {
        this.fileSystem = JSON.parse(fileSystemJson);
        this.currentNode = this.fileSystem;
        this.path = [this.fileSystem.name];
        this.history = [];
    }

    private findNodeByPath(path: string[]): FileSystemNode {
        let node: FileSystemNode = this.fileSystem;
        for (const part of path.slice(1)) {  // Skip the root node as it's already assigned
            if ((node as FolderNode).children) {
                const childNode = (node as FolderNode).children.find(child => child.name === part);
                if (childNode) {
                    node = childNode;
                } else {
                    throw new Error(`Path not found: ${path.join('/')}`);
                }
            } else {
                throw new Error(`Path not found: ${path.join('/')}`);
            }
        }
        return node;
    }

    changeDirectory(path: string): void {
        if (path === "..") {
            if (this.path.length > 1) {
                this.history.push([...this.path]);
                this.path.pop();
                this.currentNode = this.findNodeByPath(this.path) as FolderNode;
            } else {
                throw new Error("Already at the root directory");
            }
        } else {
            const newPath = this.path.concat(path.split("/"));
            const node = this.findNodeByPath(newPath);
            if (node.type === "folder") {
                this.history.push([...this.path]);
                this.path = newPath;
                this.currentNode = node as FolderNode;
            } else {
                throw new Error("Not a folder");
            }
        }
    }

    goBack(): void {
        if (this.history.length > 0) {
            this.path = this.history.pop()!;
            this.currentNode = this.findNodeByPath(this.path) as FolderNode;
        } else {
            throw new Error("No history to go back to");
        }
    }

    listContents(): string[] {
        return (this.currentNode.children || []).map(child => child.name);
    }

    getCurrentPath(): string {
        return this.path.join("/");
    }

    getCurrentNode(): FolderNode {
        return this.currentNode;
    }

    getPath(): string[] {
        return this.path;
    }
}

export default FileSystem;


// Example usage:
const fileSystemJson = `
{
    "name": "root_folder",
    "type": "folder",
    "children": [
        {
            "name": "sub_folder_1",
            "type": "folder",
            "children": [
                {
                    "name": "file_in_sub_folder_1.txt",
                    "type": "file"
                },
                {
                    "name": "nested_sub_folder_1_1",
                    "type": "folder",
                    "children": [
                        {
                            "name": "file_in_nested_sub_folder_1_1.txt",
                            "type": "file"
                        },
                        {
                            "name": "deeper_nested_sub_folder_1_1_1",
                            "type": "folder",
                            "children": [
                                {
                                    "name": "file_in_deeper_nested_sub_folder_1_1_1.txt",
                                    "type": "file"
                                },
                                {
                                    "name": "deepest_nested_sub_folder_1_1_1_1",
                                    "type": "folder",
                                    "children": [
                                        {
                                            "name": "file_in_deepest_nested_sub_folder_1_1_1_1.txt",
                                            "type": "file"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "nested_sub_folder_1_2",
                    "type": "folder",
                    "children": [
                        {
                            "name": "file_in_nested_sub_folder_1_2.txt",
                            "type": "file"
                        }
                    ]
                }
            ]
        },
        {
            "name": "sub_folder_2",
            "type": "folder",
            "children": [
                {
                    "name": "file_in_sub_folder_2.txt",
                    "type": "file"
                },
                {
                    "name": "nested_sub_folder_2_1",
                    "type": "folder",
                    "children": [
                        {
                            "name": "file_in_nested_sub_folder_2_1.txt",
                            "type": "file"
                        }
                    ]
                }
            ]
        },
        {
            "name": "file_in_root_folder.txt",
            "type": "file"
        },
        {
            "name": "another_file_in_root_folder.txt",
            "type": "file"
        }
    ]
}
`;

const fs = new FileSystem(fileSystemJson);
console.log("Current Path:", fs.getCurrentPath());  // Output: root_folder
console.log("Contents:", fs.listContents());  // Output: ['sub_folder_1', 'sub_folder_2', 'file_in_root_folder.txt', 'another_file_in_root_folder.txt']

fs.changeDirectory("sub_folder_1");
console.log("Current Path:", fs.getCurrentPath());  // Output: root_folder/sub_folder_1
console.log("Contents:", fs.listContents());  // Output: ['file_in_sub_folder_1.txt', 'nested_sub_folder_1_1', 'nested_sub_folder_1_2']

fs.changeDirectory("nested_sub_folder_1_1");
console.log("Current Path:", fs.getCurrentPath());  // Output: root_folder/sub_folder_1/nested_sub_folder_1_1
console.log("Contents:", fs.listContents());  // Output: ['file_in_nested_sub_folder_1_1.txt', 'deeper_nested_sub_folder_1_1_1']

fs.goBack();
console.log("Current Path:", fs.getCurrentPath());  // Output: root_folder/sub_folder_1
console.log("Contents:", fs.listContents());  // Output: ['file_in_sub_folder_1.txt', 'nested_sub_folder_1_1', 'nested_sub_folder_1_2']
