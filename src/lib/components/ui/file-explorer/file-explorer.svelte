<script lang="ts">
    import { writable } from 'svelte/store';
    import * as Resizable from '$lib/components/ui/resizable/index.js';
    import * as Card from '$lib/components/ui/card/index.js';
    import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
    import { Input } from '$lib/components/ui/input/index.js';
    import { Button } from '$lib/components/ui/button/index.js';
  
    import ArrowLeft from 'svelte-radix/ArrowLeft.svelte';
    import ArrowRight from 'svelte-radix/ArrowRight.svelte';
    import Reload from 'svelte-radix/Reload.svelte';
    import MagnifyingGlass from 'svelte-radix/MagnifyingGlass.svelte';
  
    import FileTree from './FileTree.svelte';
  
    const fileSystem = {
      name: "Root Folder",
      type: "folder",
      children: [
        {
          name: "Sub Folder 1",
          type: "folder",
          children: [
            {
              name: "File in Sub Folder 1.txt",
              type: "file"
            },
            {
              name: "Nested Sub Folder 1-1",
              type: "folder",
              children: [
                {
                  name: "File in Nested Sub Folder 1-1.txt",
                  type: "file"
                },
                {
                  name: "Deeper Nested Sub Folder 1-1-1",
                  type: "folder",
                  children: [
                    {
                      name: "File in Deeper Nested Sub Folder 1-1-1.txt",
                      type: "file"
                    },
                    {
                      name: "Deepest Nested Sub Folder 1-1-1-1",
                      type: "folder",
                      children: [
                        {
                          name: "File in Deepest Nested Sub Folder 1-1-1-1.txt",
                          type: "file"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              name: "Nested Sub Folder 1-2",
              type: "folder",
              children: [
                {
                  name: "File in Nested Sub Folder 1-2.txt",
                  type: "file"
                }
              ]
            }
          ]
        },
        {
          name: "Sub Folder 2",
          type: "folder",
          children: [
            {
              name: "File in Sub Folder 2.txt",
              type: "file"
            },
            {
              name: "Nested Sub Folder 2-1",
              type: "folder",
              children: [
                {
                  name: "File in Nested Sub Folder 2-1.txt",
                  type: "file"
                }
              ]
            }
          ]
        },
        {
          name: "File in Root Folder.txt",
          type: "file"
        },
        {
          name: "Another File in Root Folder.txt",
          type: "file"
        }
      ]
    };
  
    const breadcrumb = writable([{ name: '', path: '/' }]);
    const currentPath = writable('/');
    let activePath = writable('');

    function setActivePath(newPath) {
        activePath.set(newPath);
    }
  
    function updateBreadcrumb(path) {
      currentPath.set(path);
      breadcrumb.update(b => {
        const parts = path.split('/').filter(p => p);
        return parts.map((part, index) => ({
          name: part,
          path: '/' + parts.slice(0, index + 1).join('/')
        }));
      });
    }
  </script>
  
  <style>
    .breadcrumb-container {
      display: flex;
      align-items: center;
      overflow: hidden;
    }
  
    .breadcrumb-list {
      display: flex;
      flex-wrap: nowrap;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  
    .breadcrumb-item {
      flex-shrink: 0;
    }
  
    .breadcrumb-item.ellipsis::after {
      content: '...';
      padding: 0 0.5rem;
    }
  
    .breadcrumb-link {
      display: inline-block;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  </style>
  
  <div class="p-6">
    <Resizable.PaneGroup direction="vertical" class="max-w rounded-lg border">
      <Resizable.Pane class="flex h-[700px] items-center px-0 py-7">
        <!-- This is the HEADER -->
        <div class="flex h-[50px] w-full items-center p-2">
          <!-- This is the NAVIGATION BUTTONS -->
          <Button variant="ghost" class="h-full"><ArrowLeft class="h-5 w-5" /></Button>
          <Button variant="ghost" class="ml-1 h-full"><ArrowRight class="h-5 w-5" /></Button>
          <Button variant="ghost" class="ml-1 h-full"><Reload class="h-5 w-5" /></Button>
          <!-- This is the NAVIGATION BUTTONS -->
  
          <!-- This is the FILE PATH -->
          <Card.Root class="ml-2 flex h-full w-full items-center rounded-md">
            <Breadcrumb.Root class="breadcrumb-container w-full">
                <Breadcrumb.List class="breadcrumb-list pl-3">
                    {#each $breadcrumb as item, index (item.path)}
                        <Breadcrumb.Item class="breadcrumb-item">
                            {#if index === $breadcrumb.length - 1}
                                <Breadcrumb.Page>{item.name}</Breadcrumb.Page>
                            {:else}
                                <Breadcrumb.Link href="{item.path}" on:click="{() => updateBreadcrumb(item.path)}" class="breadcrumb-link">{item.name}</Breadcrumb.Link>
                            {/if}
                        </Breadcrumb.Item>
                        {#if index !== $breadcrumb.length - 1}
                            <Breadcrumb.Separator />
                        {/if}
                    {/each}
                </Breadcrumb.List>
            </Breadcrumb.Root>
          </Card.Root>
          <!-- This is the FILE PATH -->
  
          <!-- This is the SEARCH INPUT -->
          <Input
            type="text"
            placeholder="search..."
            class="ml-2 flex hidden h-full max-w-xs items-center rounded-md shadow lg:block"
          />
  
          <Button variant="ghost" class="ml-2 block h-full lg:hidden">
            <MagnifyingGlass class="h-5 w-5" />
          </Button>
          <!-- This is the SEARCH INPUT -->
        </div>
        <!-- This is the HEADER -->
      </Resizable.Pane>
      <Resizable.Handle />
  
      <Resizable.PaneGroup direction="horizontal">
        <Resizable.Pane defaultSize={15} class="flex h-[700px]">
          <FileTree node={fileSystem} {updateBreadcrumb} />
        </Resizable.Pane>
        <Resizable.Handle />
  
        <Resizable.Pane class="flex h-[700px] items-center justify-center p-6">Two</Resizable.Pane>
      </Resizable.PaneGroup>
    </Resizable.PaneGroup>
  </div>
  