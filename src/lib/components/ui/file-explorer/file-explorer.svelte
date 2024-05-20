<script lang="ts">
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

    let showSearch = false;

    function toggleSearch() {
        showSearch = !showSearch;
    }
</script>

<div class="p-6">

<Resizable.PaneGroup direction="vertical" class="max-w rounded-lg border">
    <Resizable.Pane class="flex h-[700px] items-center py-7 px-0">
        <!-- This is the header -->
        <div class="flex h-[50px] w-full items-center p-2">
            <!-- This is the NAVIGATION BUTTONS -->
            <Button variant="ghost" class="h-full"><ArrowLeft class="h-5 w-5" /></Button>
            <Button variant="ghost" class="h-full ml-1"><ArrowRight class="h-5 w-5" /></Button>
            <Button variant="ghost" class="h-full ml-1"><Reload class="h-5 w-5" /></Button>
            <!-- This is the NAVIGATION BUTTONS -->

            <!-- This is the PATH -->
            <Card.Root class="ml-2 flex h-full w-full items-center rounded-md">
                <Breadcrumb.Root class="w-full">
                    <Breadcrumb.List class="pl-3">
                        <Breadcrumb.Item>
                            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Separator />
                        <Breadcrumb.Item>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger class="flex items-center gap-1">
                                    <Breadcrumb.Ellipsis class="h-4 w-4" />
                                    <span class="sr-only">Toggle menu</span>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content align="start">
                                    <DropdownMenu.Item>Documentation</DropdownMenu.Item>
                                    <DropdownMenu.Item>Themes</DropdownMenu.Item>
                                    <DropdownMenu.Item>GitHub</DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </Breadcrumb.Item>
                        <Breadcrumb.Separator />
                        <Breadcrumb.Item>
                            <Breadcrumb.Link href="/docs/components">Components</Breadcrumb.Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Separator />
                        <Breadcrumb.Item>
                            <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
                        </Breadcrumb.Item>
                    </Breadcrumb.List>
                </Breadcrumb.Root>
            </Card.Root>
            <!-- This is the PATH -->

            <!-- Search Input -->
            <Input
                type="text"
                placeholder="search..."
                class="max-w-xs ml-2 flex h-full items-center rounded-md shadow lg:block hidden"

            />

            <!-- Search Button -->
            <Button variant="ghost" class="h-full ml-2 lg:hidden block" on:click={toggleSearch}>
                <MagnifyingGlass class="h-5 w-5" />
            </Button>
        </div>
    </Resizable.Pane>
    <Resizable.Handle />

    <Resizable.PaneGroup direction="horizontal">

        <Resizable.Pane  defaultSize={15} class="flex h-[700px] items-center justify-center p-6">
            Two
        </Resizable.Pane>
        <Resizable.Handle />

        <Resizable.Pane class="flex h-[700px] items-center justify-center p-6">
            Two
        </Resizable.Pane>
        
    </Resizable.PaneGroup>
</Resizable.PaneGroup>

</div>