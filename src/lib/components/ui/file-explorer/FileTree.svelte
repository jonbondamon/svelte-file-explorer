<script lang="ts">
  import { writable } from 'svelte/store';
  import ChevronRight from "lucide-svelte/icons/chevron-right";
  import ChevronDown from "lucide-svelte/icons/chevron-down";
  import FolderIcon from "lucide-svelte/icons/folder";
  import FileTextIcon from "lucide-svelte/icons/file-text";
  import * as Collapsible from "$lib/components/ui/collapsible/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Toggle } from "$lib/components/ui/toggle/index.js";

  // Self-reference for recursive component
  import FileTree from './FileTree.svelte';

  interface Node {
    name: string;
    type: 'file' | 'folder';
    children?: Node[];
  }

  export let node: Node;
  export let update_breadcrumb: (path: string) => void;
  export let parent_path: string = '';

  const open_state = writable(false);

  function handle_folder_click(name: string) {
    const new_path = `${parent_path}/${name}`;
    update_breadcrumb(new_path);
  }
</script>

{#if node.type === 'folder'}
  <Collapsible.Root bind:open={$open_state}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="flex items-center" on:click={() => handle_folder_click(node.name)}>
      <Collapsible.Trigger asChild let:builder>
        <Button builders={[builder]} variant="ghost" size="sm" class="flex items-center">
          {#if $open_state}
            <ChevronDown class="h-4 w-4" />
          {:else}
            <ChevronRight class="h-4 w-4" />
          {/if}
          <FolderIcon class="h-4 w-4 ml-2" />
          <h4 class="text-xs font-semibold pl-2">{node.name}</h4>
          <span class="sr-only">Toggle</span>
        </Button>
      </Collapsible.Trigger>
    </div>
    <Collapsible.Content>
      <div class="pl-4">
        {#each node.children as child}
          <FileTree node={child} {update_breadcrumb} parent_path={`${parent_path}/${node.name}`} />
        {/each}
      </div>
    </Collapsible.Content>
  </Collapsible.Root>
{:else if node.type === 'file'}
  <div class="flex items-center">
    <Button variant="ghost" size="sm" class="flex items-center">
      <FileTextIcon class="h-4 w-4" />
      <div class="pl-2 text-xs">{node.name}</div>
    </Button>
  </div>
{/if}
