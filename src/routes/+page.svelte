<script lang="ts">
    import FileExplorer from "$lib/components/ui/file-explorer/FileExplorer.svelte";

    interface file_node {
        name: string;
        type: 'file';
    }

    interface folder_node {
        name: string;
        type: 'folder';
        children: (file_node | folder_node)[];
    }

    const file_system: folder_node = {
        name: "root_folder",
        type: "folder",
        children: [
        {
            name: "sub_folder_1",
            type: "folder",
            children: [
            {
                name: "file_in_sub_folder_1.txt",
                type: "file"
            },
            {
                name: "nested_sub_folder_1_1",
                type: "folder",
                children: [
                {
                    name: "file_in_nested_sub_folder_1_1.txt",
                    type: "file"
                },
                {
                    name: "deeper_nested_sub_folder_1_1_1",
                    type: "folder",
                    children: [
                    {
                        name: "file_in_deeper_nested_sub_folder_1_1_1.txt",
                        type: "file"
                    },
                    {
                        name: "deepest_nested_sub_folder_1_1_1_1",
                        type: "folder",
                        children: [
                        {
                            name: "file_in_deepest_nested_sub_folder_1_1_1_1.txt",
                            type: "file"
                        }
                        ]
                    }
                    ]
                }
                ]
            },
            {
                name: "nested_sub_folder_1_2",
                type: "folder",
                children: [
                {
                    name: "file_in_nested_sub_folder_1_2.txt",
                    type: "file"
                }
                ]
            }
            ]
        },
        {
            name: "sub_folder_2",
            type: "folder",
            children: [
            {
                name: "file_in_sub_folder_2.txt",
                type: "file"
            },
            {
                name: "nested_sub_folder_2_1",
                type: "folder",
                children: [
                {
                    name: "file_in_nested_sub_folder_2_1.txt",
                    type: "file"
                }
                ]
            }
            ]
        },
        {
            name: "file_in_root_folder.txt",
            type: "file"
        },
        {
            name: "another_file_in_root_folder.txt",
            type: "file"
        }
        ]
    };
</script>

<FileExplorer {file_system}/>

