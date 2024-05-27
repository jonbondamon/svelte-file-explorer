import { writable } from 'svelte/store';

export interface file_node {
    name: string;
    type: 'file';
}

export interface folder_node {
    name: string;
    type: 'folder';
    children: (file_node | folder_node)[];
}

export const root = writable<folder_node | null>(null);
export const current_node = writable<folder_node | file_node | null>(null);
export const path = writable<(folder_node | file_node)[]>([]);
