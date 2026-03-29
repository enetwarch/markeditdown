<script lang="ts">
  import Icon from '@iconify/svelte';
  import { cn } from '$lib/utils';
  import type { MouseEventHandler } from 'svelte/elements';

  type File = {
    type: 'file';
    name: string;
    size?: number;
  };

  type Directory = {
    type: 'directory';
    name: string;
    children: (File | Directory)[];
  };

  let nodes: (File | Directory)[] = [
    {
      type: 'directory',
      name: 'important',
      children: [
        { type: 'file', name: 'information' },
        { type: 'file', name: 'data' }
      ]
    },
    { type: 'file', name: 'readme' },
    { type: 'file', name: 'sample' }
  ];
</script>

<div class="flex grow">
  <aside
    class="flex min-w-70 grow flex-col gap-4 overflow-y-auto border-r border-border bg-surface"
  >
    <div class="space-between flex w-full gap-4 p-4">
      <header class="flex w-full flex-col">
        <div class="flex gap-2">
          <h2 class="font-space-grotesk text-lg font-bold tracking-widest text-primary">
            COMPUTER
          </h2>
          {#snippet button(
            label: string,
            icon: string,
            onclick?: MouseEventHandler<HTMLButtonElement>
          )}
            <button
              class="flex items-center justify-center hover:cursor-pointer"
              aria-label={label}
              {onclick}
            >
              <Icon class="text-xl text-subforeground" {icon} />
            </button>
          {/snippet}
          {@render button('Rename Button', 'material-symbols:edit-outline-sharp')}
          {@render button('Delete Button', 'material-symbols:delete-outline-sharp')}
        </div>
        <p class="font-space-grotesk text-sm text-subforeground">Last edited 20m ago</p>
      </header>
    </div>
    <ul class="flex w-full flex-col">
      {#snippet tree(nodes: (File | Directory)[], pl: number, increment: number)}
        {#each nodes as node}
          <li class="flex w-full flex-col">
            <div class="flex items-center gap-2 py-2 pr-4" style:padding-left="{pl * 0.25}rem">
              <Icon
                class="text-xl text-foreground"
                icon={node.type == 'file'
                  ? 'material-symbols:docs-outline-sharp'
                  : 'material-symbols:folder-outline-sharp'}
              />
              <span class="font-space-grotesk text-base tracking-wider text-foreground">
                {node.name.toUpperCase()}
              </span>
            </div>
            {#if node.type == 'directory'}
              {@render tree(node.children, pl + increment, increment)}
            {/if}
          </li>
        {/each}
      {/snippet}
      {@render tree(nodes, 4, 4)}
    </ul>
  </aside>
  <main class="flex w-full grow flex-col gap-0">
    <header class="flex w-full border-b border-border bg-surface">
      {#snippet mode(text: string, onclick?: MouseEventHandler<HTMLButtonElement>)}
        <button
          class={cn(
            'flex items-center justify-center border-x border-border px-8 py-2',
            'font-space-grotesk text-base tracking-wider text-foreground hover:cursor-pointer'
          )}
          draggable="true"
          {onclick}
        >
          {text.toUpperCase()}
        </button>
      {/snippet}
      {@render mode('EDIT')}
      {@render mode('PREVIEW')}
    </header>
    <div class="flex grow gap-0">
      <section class="flex grow border-r border-border bg-background"></section>
      <section class="flex grow bg-surface"></section>
    </div>
  </main>
</div>
