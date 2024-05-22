<script lang="ts">
  import { writable } from 'svelte/store';
  import * as Resizable from '$lib/components/ui/resizable/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Button } from '$lib/components/ui/button/index.js';

  import ArrowLeft from "lucide-svelte/icons/arrow-left";
  import ArrowRight from "lucide-svelte/icons/arrow-right";
  import RotateCw  from "lucide-svelte/icons/rotate-cw";
  import MagnifyingGlass from 'svelte-radix/MagnifyingGlass.svelte';

  import FileTree from './FileTree.svelte';

  interface file_node {
      name: string;
      type: 'file';
  }

  interface folder_node {
      name: string;
      type: 'folder';
      children: (file_node | folder_node)[];
  }

  export let file_system: folder_node;

  const breadcrumb_store = writable([{ name: '', path: '/' }]);
  const current_path = writable('/');

  let active_path = writable('');

  function update_breadcrumb(path: string) {
    current_path.set(path);
    breadcrumb_store.update(b => {
      const parts = path.split('/').filter(p => p);
      return parts.map((part, index) => ({
        name: part,
        path: '/' + parts.slice(0, index + 1).join('/')
      }));
    });
  }


</script>

<div class="p-6">
  <Resizable.PaneGroup direction="vertical" class="max-w rounded-lg border">
    <Resizable.Pane class="flex h-[700px] items-center px-0 py-7">
      <!-- HEADER -->
      <div class="flex h-[50px] w-full items-center p-2">
        <!-- NAVIGATION BUTTONS -->
        <Button variant="ghost" class="h-full"><ArrowLeft class="h-5 w-5" /></Button>
        <Button variant="ghost" class="ml-1 h-full"><ArrowRight class="h-5 w-5" /></Button>
        <Button variant="ghost" class="ml-1 h-full"><RotateCw  class="h-5 w-5" /></Button>
        <!-- NAVIGATION BUTTONS -->

        <!-- FILE PATH -->
        <Card.Root class="ml-2 flex h-full w-full items-center rounded-md">
          <Breadcrumb.Root class="w-full">
            <Breadcrumb.List class="pl-3">
              {#each $breadcrumb_store as item, index (item.path)}
                <Breadcrumb.Item>
                  {#if index === $breadcrumb_store.length - 1}
                    <Breadcrumb.Page>{item.name}</Breadcrumb.Page>
                  {:else}
                  <a href="##" on:click|preventDefault={() => update_breadcrumb(item.path)}>
                    <Breadcrumb.Link >{item.name}</Breadcrumb.Link>
                  </a>
                  {/if}
                </Breadcrumb.Item>
                {#if index !== $breadcrumb_store.length - 1}
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
      <Resizable.Pane defaultSize={15} class="flex h-[700px]">
        <FileTree node={file_system} {update_breadcrumb} />
      </Resizable.Pane>
      <Resizable.Handle />
      
      <Resizable.Pane class="flex h-[700px] items-center justify-center p-6">Two</Resizable.Pane>
    </Resizable.PaneGroup>
  </Resizable.PaneGroup>
</div>
