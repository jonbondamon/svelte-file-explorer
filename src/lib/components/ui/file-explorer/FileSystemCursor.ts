interface FileNode {
    name: string;
    type: 'file';
}

interface FolderNode {
    name: string;
    type: 'folder';
    children: (FileNode | FolderNode)[];
    childIndex?: Map<string, FileNode | FolderNode>;
}

class FileSystemCursor {
    private root: FolderNode;
    private currentNode: FolderNode | FileNode;
    private path: (FolderNode | FileNode)[];

    constructor(fileSystem: FolderNode) {
        this.root = fileSystem;
        this.currentNode = fileSystem;
        this.path = [];
        this.indexChildren(fileSystem);
    }

    private indexChildren(node: FolderNode | FileNode): void {
        if (node.type === 'folder') {
            node.childIndex = new Map(node.children.map(child => [child.name, child]));
            node.children.forEach(child => {
                if (child.type === 'folder') {
                    this.indexChildren(child);
                }
            });
        }
    }

    public enterFolder(folderName: string): boolean {
        if (this.currentNode.type === 'folder') {
            const found = this.currentNode.childIndex?.get(folderName);
            if (found && found.type === 'folder') {
                this.path.push(this.currentNode);
                this.currentNode = found;
                return true;
            }
        }
        return false;
    }

    public exitFolder(): boolean {
        if (this.path.length > 0) {
            this.currentNode = this.path.pop()!;
            return true;
        }
        return false;
    }

    public getCurrentNode(): FolderNode | FileNode {
        return this.currentNode;
    }

    public getPath(): string[] {
        return this.path.map(node => node.name).concat(this.currentNode.name);
    }
}



// Example usage
const cursor = new FileSystemCursor(fileSystem);
console.log(cursor.getCurrentNode()); // Root folder

cursor.enterFolder("sub_folder_1");
console.log(cursor.getCurrentNode()); // sub_folder_1

cursor.enterFolder("nested_sub_folder_1_1");
console.log(cursor.getCurrentNode()); // nested_sub_folder_1_1

cursor.exitFolder();
console.log(cursor.getCurrentNode()); // sub_folder_1

console.log(cursor.getPath()); // ["root_folder", "sub_folder_1"]
