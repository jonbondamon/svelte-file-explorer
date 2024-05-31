<script lang="ts">
  import { writable } from 'svelte/store';
  import * as Resizable from '$lib/components/ui/resizable/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";

  import ArrowLeft from "lucide-svelte/icons/arrow-left";
  import ArrowRight from "lucide-svelte/icons/arrow-right";
  import RotateCw from "lucide-svelte/icons/rotate-cw";
  import FolderIcon from "lucide-svelte/icons/folder";
  import FileTextIcon from "lucide-svelte/icons/file-text";
  import MagnifyingGlass from 'svelte-radix/MagnifyingGlass.svelte';

  import FileTree from './FileTree.svelte';
  import FileSystem from '$lib/components/ui/file-explorer/FileSystem.js';

  export let file_system: string;

  const fs = new FileSystem(file_system);
  const root_file_system = fs.root_file_system;
  const current_node = fs.current_node;
  const path = fs.path;

  $: console.log($path)

  function handle_breadcrumb_click(index: number) {
    console.log(index);
    let sliced_path = $path.slice(0, index)
    let joined_path = sliced_path.join('/');
    console.log(joined_path);
    fs.change_directory(joined_path);
  }

</script>

<div class="p-6">
  <Resizable.PaneGroup direction="vertical" class="max-w rounded-lg border">
    <Resizable.Pane class="flex h-[700px] items-center px-0 py-7">
      <!-- HEADER -->
      <div class="flex h-[50px] w-full items-center p-2">
        <!-- NAVIGATION BUTTONS -->
        <Button variant="ghost" class="h-full" on:click={() => fs.go_back()}><ArrowLeft class="h-5 w-5" /></Button>
        <Button variant="ghost" class="ml-1 h-full" on:click={() => fs.go_forward()}><ArrowRight class="h-5 w-5" /></Button>
        <Button variant="ghost" class="ml-1 h-full"><RotateCw class="h-5 w-5" /></Button>
        <!-- NAVIGATION BUTTONS -->

        <!-- FILE PATH -->
        <Card.Root class="ml-2 flex h-full w-full items-center rounded-md">
          <Breadcrumb.Root class="w-full">
            <Breadcrumb.List class="pl-3">
              {#each $path as item, index}
                <Breadcrumb.Item>
                  {#if index === $path.length - 1}
                    <Breadcrumb.Page>{item}</Breadcrumb.Page>
                  {:else}
                  <a href="##" on:click|preventDefault={() => handle_breadcrumb_click(index)}>
                    <Breadcrumb.Link>{item}</Breadcrumb.Link>
                  </a>
                  {/if}
                </Breadcrumb.Item>
                {#if index !== $path.length - 1}
                  <Breadcrumb.Separator />
                {/if}
              {/each}
            </Breadcrumb.List>
          </Breadcrumb.Root>
        </Card.Root>
        <!-- FILE PATH -->

        <!-- SEARCH INPUT -->
        <Input
          type="text"
          placeholder="Search..."
          class="ml-2 flex hidden h-full max-w-xs items-center rounded-md shadow lg:block"
        />
        <Button variant="ghost" class="ml-2 block h-full lg:hidden">
          <MagnifyingGlass class="h-5 w-5" />
        </Button>
        <!-- SEARCH INPUT -->
      </div>
      <!-- HEADER -->
    </Resizable.Pane>
    <Resizable.Handle />

    <Resizable.PaneGroup direction="horizontal">

      <!-- FILE TREE -->
      <Resizable.Pane defaultSize={15} class="flex h-[700px]">
          <FileTree node={$root_file_system} cursor={fs}/>
      </Resizable.Pane>
      <Resizable.Handle />
      <!-- FILE TREE -->
      
      <Resizable.Pane class="flex flex-col h-[700px] items-start p-2">
        {#if $current_node}
          {#each $current_node.children as child}
            <ContextMenu.Root>
              <ContextMenu.Trigger>
                  {#if child.type === 'folder'}
                    <Button variant="ghost" class="flex items-center w-full mb-1 justify-start text-left" on:click={() => console.log('I clicked on a folder')}>
                      <FolderIcon class="h-6 w-6 mr-2" />
                      <div class="text-xs">{child.name}</div>
                    </Button>
                  {:else}
                    <Button variant="ghost" class="flex items-center w-full mb-1 justify-start text-left">
                      <FileTextIcon class="h-6 w-6 mr-2" />
                      <div class="text-xs">{child.name}</div>
                    </Button>
                  {/if}
              </ContextMenu.Trigger>
              <ContextMenu.Content class="w-64">
                <ContextMenu.Item inset>
                  Back
                  <ContextMenu.Shortcut>⌘[</ContextMenu.Shortcut>
                </ContextMenu.Item>
                <ContextMenu.Item inset>
                  Forward
                  <ContextMenu.Shortcut>⌘]</ContextMenu.Shortcut>
                </ContextMenu.Item>
                <ContextMenu.Item inset>
                  Reload
                  <ContextMenu.Shortcut>⌘R</ContextMenu.Shortcut>
                </ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu.Root>
          {/each}
        {/if}
      </Resizable.Pane>
    </Resizable.PaneGroup>
  </Resizable.PaneGroup>
</div>
