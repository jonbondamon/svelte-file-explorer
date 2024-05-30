<script lang="ts">
  import { writable } from 'svelte/store';
  import ChevronRight from "lucide-svelte/icons/chevron-right";
  import ChevronDown from "lucide-svelte/icons/chevron-down";
  import FolderIcon from "lucide-svelte/icons/folder";
  import FileTextIcon from "lucide-svelte/icons/file-text";
  import * as Collapsible from "$lib/components/ui/collapsible/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  import FileTree from './FileTree.svelte';

  export let cursor;
  export let node;
  export let parent_path: string = '';

  const open_state = writable(false);

  function handle_folder_click(name: string) {
    const new_path = parent_path ? `${parent_path}/${name}` : name;
    console.log(new_path);
  
    cursor.change_directory(new_path);
  }
</script>



{#if node.type === 'folder'}
  <Collapsible.Root bind:open={$open_state}>
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
          <FileTree node={child} cursor={cursor} parent_path={`${parent_path}/${node.name}`} />
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