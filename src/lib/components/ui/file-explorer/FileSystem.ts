import { writable } from 'svelte/store';

interface FileSystemNode {
    name: string;
    type: 'file' | 'folder';
    children?: FileSystemNode[];
}

class FileSystem {

    private _file_system: FileSystemNode;
    private _current_node: FileSystemNode;
    private _path: string[];
    private history: string[][];
    private forward_history: string[][];

    root_file_system = writable<FileSystemNode>();
    current_node = writable<FileSystemNode>();
    path = writable<string[]>([]);

    constructor(file_system_json: string) {
        this._file_system = JSON.parse(file_system_json);
        this._current_node = this._file_system;
        this._path = [this._file_system.name];
        this.history = [];
        this.forward_history = [];

        this.root_file_system.set(this._file_system);
        this.current_node.set(this._current_node);
        this.path.set(this._path);
    }

    private find_node_by_path(path: string[]): FileSystemNode {
        let node = this._file_system;
        for (let part of path.slice(1)) {  // Skip the root node as it's already assigned
            if (node.children) {
                let child_node = node.children.find(child => child.name === part);
                if (child_node) {
                    node = child_node;
                } else {
                    throw new Error(`Path not found: ${path.join('/')}`);
                }
            } else {
                throw new Error(`Path not found: ${path.join('/')}`);
            }
        }
        return node;
    }

    change_directory(path: string): void {
        if (path === "..") {
            if (this._path.length > 1) {
                this.forward_history = [];
                this.history.push([...this._path]);
                this._path.pop();
                this._current_node = this.find_node_by_path(this._path);
            } else {
                throw new Error("Already at the root directory");
            }
        } else {
            let new_path = this._path.concat(path.split("/"));
            let node = this.find_node_by_path(new_path);
            if (node.type === 'folder') {
                this.forward_history = [];
                this.history.push([...this._path]);
                this._path = new_path;
                this._current_node = node;
            } else {
                throw new Error("Not a folder");
            }
        }
        this.current_node.set(this._current_node);
        this.path.set(this._path);
    }

    go_back(): void {
        if (this.history.length) {
            this.forward_history.push([...this._path]);
            this._path = this.history.pop()!;
            this._current_node = this.find_node_by_path(this._path);
        } else {
            throw new Error("No history to go back to");
        }
        this.current_node.set(this._current_node);
        this.path.set(this._path);
    }

    go_forward(): void {
        if (this.forward_history.length) {
            this.history.push([...this._path]);
            this._path = this.forward_history.pop()!;
            this._current_node = this.find_node_by_path(this._path);
        } else {
            throw new Error("No forward history to go to");
        }
        this.current_node.set(this._current_node);
        this.path.set(this._path);
    }

    list_contents(): string[] {
        return this._current_node.children ? this._current_node.children.map(child => child.name) : [];
    }

    get_current_path(): string {
        return this._path.join("/");
    }
}

export default FileSystem;