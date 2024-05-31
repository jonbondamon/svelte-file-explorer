<script lang="ts">
  import { writable, get } from 'svelte/store';
  import ChevronRight from "lucide-svelte/icons/chevron-right";
  import ChevronDown from "lucide-svelte/icons/chevron-down";
  import FolderIcon from "lucide-svelte/icons/folder";
  import FileTextIcon from "lucide-svelte/icons/file-text";
  import * as Collapsible from "$lib/components/ui/collapsible/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Toggle } from "$lib/components/ui/toggle/index.js";

  import FileTree from './FileTree.svelte';

  export let cursor;
  export let node;
  export let parent_path: string = '';

  const open_state = writable(false);
  const toggle = writable(false)

  function handle_folder_click(name: string) {
    const new_path = parent_path ? `${parent_path}/${name}` : name;
    cursor.change_directory_absolute(new_path);
  }

  function normalizePath(path) {
    return path.replace(/^\/+/, ''); // Remove leading slashes
  }

  // Subscribe to the current_node store to update the toggle state
  cursor.current_node.subscribe(current => {
    const full_path = normalizePath(parent_path ? `${parent_path}/${node.name}` : node.name);
    toggle.set(current.name === node.name && normalizePath(cursor.get_current_path()) === full_path);
  });
  
</script>

{#if node.type === 'folder'}
  <Collapsible.Root bind:open={$open_state}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="flex items-center">
      <Collapsible.Trigger asChild let:builder>
        <Button builders={[builder]} variant="ghost" size="sm" class="flex items-center px-2">
          {#if $open_state}
            <ChevronDown class="h-4 w-4" />
          {:else}
            <ChevronRight class="h-4 w-4" />
          {/if}
        </Button>
      </Collapsible.Trigger>

      <Toggle class="flex items-center p-2" bind:pressed={$toggle} on:click={() => handle_folder_click(node.name)}>
        <FolderIcon class="h-4 w-4" />
        <h4 class="text-xs font-semibold pl-2">{node.name}</h4>
      </Toggle>
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
