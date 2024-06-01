
<script lang="ts">
    
    import FileExplorer from '$lib/components/ui/file-explorer/FileExplorer.svelte';

    // Example usage:
    const file_system: string = `
    {
    "name": "root_folder",
    "type": "folder",
    "children": [
        {
            "name": "folder_at_depth_0",
            "type": "folder",
            "children": [
                {
                    "name": "folder_at_depth_1",
                    "type": "folder",
                    "children": [
                        {
                            "name": "folder_at_depth_2",
                            "type": "folder",
                            "children": [
                                {
                                    "name": "folder_at_depth_3",
                                    "type": "folder",
                                    "children": [
                                        {
                                            "name": "folder_at_depth_4",
                                            "type": "folder",
                                            "children": [
                                                {
                                                    "name": "folder_at_depth_5",
                                                    "type": "folder",
                                                    "children": [
                                                        {
                                                            "name": "folder_at_depth_6",
                                                            "type": "folder",
                                                            "children": [
                                                                {
                                                                    "name": "folder_at_depth_7",
                                                                    "type": "folder",
                                                                    "children": [
                                                                        {
                                                                            "name": "folder_at_depth_8",
                                                                            "type": "folder",
                                                                            "children": [
                                                                                {
                                                                                    "name": "folder_at_depth_9",
                                                                                    "type": "folder",
                                                                                    "children": [
                                                                                        {
                                                                                            "name": "file_at_depth_10.txt",
                                                                                            "type": "file"
                                                                                        },
                                                                                        {
                                                                                            "name": "file_at_depth_9.txt",
                                                                                            "type": "file"
                                                                                        },
                                                                                        {
                                                                                            "name": "another_file_at_depth_9.txt",
                                                                                            "type": "file"
                                                                                        },
                                                                                        {
                                                                                            "name": "extra_folder_at_depth_9_60",
                                                                                            "type": "folder",
                                                                                            "children": [
                                                                                                {
                                                                                                    "name": "nested_file_at_depth_9_39.txt",
                                                                                                    "type": "file"
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        {
                                                                                            "name": "extra_file_at_depth_9_19.txt",
                                                                                            "type": "file"
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "name": "file_at_depth_8.txt",
                                                                                    "type": "file"
                                                                                },
                                                                                {
                                                                                    "name": "another_file_at_depth_8.txt",
                                                                                    "type": "file"
                                                                                },
                                                                                {
                                                                                    "name": "extra_file_at_depth_8_5.txt",
                                                                                    "type": "file"
                                                                                },
                                                                                {
                                                                                    "name": "extra_folder_at_depth_8_83",
                                                                                    "type": "folder",
                                                                                    "children": [
                                                                                        {
                                                                                            "name": "nested_file_at_depth_8_26.txt",
                                                                                            "type": "file"
                                                                                        }
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            "name": "file_at_depth_7.txt",
                                                                            "type": "file"
                                                                        },
                                                                        {
                                                                            "name": "another_file_at_depth_7.txt",
                                                                            "type": "file"
                                                                        },
                                                                        {
                                                                            "name": "extra_file_at_depth_7_93.txt",
                                                                            "type": "file"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "name": "file_at_depth_6.txt",
                                                                    "type": "file"
                                                                },
                                                                {
                                                                    "name": "another_file_at_depth_6.txt",
                                                                    "type": "file"
                                                                },
                                                                {
                                                                    "name": "extra_folder_at_depth_6_20",
                                                                    "type": "folder",
                                                                    "children": [
                                                                        {
                                                                            "name": "nested_file_at_depth_6_16.txt",
                                                                            "type": "file"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "name": "file_at_depth_5.txt",
                                                            "type": "file"
                                                        },
                                                        {
                                                            "name": "another_file_at_depth_5.txt",
                                                            "type": "file"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "name": "file_at_depth_4.txt",
                                                    "type": "file"
                                                },
                                                {
                                                    "name": "another_file_at_depth_4.txt",
                                                    "type": "file"
                                                },
                                                {
                                                    "name": "extra_file_at_depth_4_56.txt",
                                                    "type": "file"
                                                },
                                                {
                                                    "name": "extra_folder_at_depth_4_40",
                                                    "type": "folder",
                                                    "children": [
                                                        {
                                                            "name": "nested_file_at_depth_4_3.txt",
                                                            "type": "file"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "name": "file_at_depth_3.txt",
                                            "type": "file"
                                        },
                                        {
                                            "name": "another_file_at_depth_3.txt",
                                            "type": "file"
                                        },
                                        {
                                            "name": "extra_file_at_depth_3_22.txt",
                                            "type": "file"
                                        }
                                    ]
                                },
                                {
                                    "name": "file_at_depth_2.txt",
                                    "type": "file"
                                },
                                {
                                    "name": "another_file_at_depth_2.txt",
                                    "type": "file"
                                },
                                {
                                    "name": "extra_file_at_depth_2_7.txt",
                                    "type": "file"
                                },
                                {
                                    "name": "extra_folder_at_depth_2_80",
                                    "type": "folder",
                                    "children": [
                                        {
                                            "name": "nested_file_at_depth_2_36.txt",
                                            "type": "file"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "name": "file_at_depth_1.txt",
                            "type": "file"
                        },
                        {
                            "name": "another_file_at_depth_1.txt",
                            "type": "file"
                        },
                        {
                            "name": "extra_file_at_depth_1_53.txt",
                            "type": "file"
                        },
                        {
                            "name": "extra_folder_at_depth_1_75",
                            "type": "folder",
                            "children": [
                                {
                                    "name": "nested_file_at_depth_1_46.txt",
                                    "type": "file"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "file_at_depth_0.txt",
                    "type": "file"
                },
                {
                    "name": "another_file_at_depth_0.txt",
                    "type": "file"
                },
                {
                    "name": "extra_file_at_depth_0_34.txt",
                    "type": "file"
                },
                {
                    "name": "extra_folder_at_depth_0_29",
                    "type": "folder",
                    "children": [
                        {
                            "name": "nested_file_at_depth_0_98.txt",
                            "type": "file"
                        }
                    ]
                }
            ]
        },
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
}`;


</script>


<FileExplorer {file_system}/>