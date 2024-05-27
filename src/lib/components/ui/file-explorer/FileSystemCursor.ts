import { writable, get } from 'svelte/store';

// Define the types
export interface file_node {
    name: string;
    type: 'file';
}

export interface folder_node {
    name: string;
    type: 'folder';
    children: (file_node | folder_node)[];
}

// Define the stores
export const root = writable<folder_node>();
export const current_node = writable<folder_node | file_node | null>(null);
export const path = writable<(folder_node | file_node)[]>([]);

export class FileSystemCursor {
    constructor(file_system: folder_node) {
        root.update((x) => file_system);
        current_node.update((x) => file_system)
        path.update((a) => []);
    }

    public enter_folder(folder_name: string): boolean {
        const current = get(current_node) as folder_node;
        if (current.type === 'folder') {
            const found = current.children.find(
                child => child.name === folder_name && child.type === 'folder'
            ) as folder_node | undefined;
            if (found) {
                path.update(p => [...p, current]);
                current_node.update((f) => found);
                return true;
            }
        }
        return false;
    }

    public exit_folder(): boolean {
        const current_path = get(path);
        if (current_path.length > 0) {
            const previous_node = current_path.pop()!;
            current_node.update((node) => previous_node);
            path.update((path) => current_path);
            return true;
        }
        return false;
    }

    public navigate_to_path(navigate_path: string[]): boolean {
        //console.log(navigate_path)
        let start: folder_node = get(root);
        let new_path = [get(root)];

        if (navigate_path.length > 1) {
            for (const folder_name of navigate_path) {
                //console.log('looking at ' + folder_name);
                for (const item of start.children) {
                    //console.log('checking ' + item.name)
                    if (item.name === folder_name && item.type === 'folder') {
                        start = item as folder_node;
                        new_path.push(start);
                    }
                }
            }

            //console.log(start);
            path.update((p) => new_path);
            current_node.update((x) => start);
        } else {
            path.update((p) => new_path);
            current_node.update((x) => start);
        }
        return false;
    }
    

    public get_current_node(): folder_node | file_node | null {
        return get(current_node);
    }

    public get_path(): string[] {
        const current_path = get(path);
        const current = get(current_node);
        return current_path.map(node => node.name).concat(current ? current.name : '');
    }
}
