<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { MouseEventHandler } from 'svelte/elements';
  import Editor from './Editor.svelte';

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
          {#snippet iconButton(
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
          {@render iconButton('Rename Button', 'material-symbols:edit-outline-sharp')}
          {@render iconButton('Delete Button', 'material-symbols:delete-outline-sharp')}
        </div>
        <p class="font-space-grotesk text-sm text-subforeground">Last edited 20m ago</p>
      </header>
    </div>
    <ul class="flex w-full flex-col">
      {#snippet fileTree(nodes: (File | Directory)[], pl: number, increment: number)}
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
              <ul class="flex w-full flex-col">
                {@render fileTree(node.children, pl + increment, increment)}
              </ul>
            {/if}
          </li>
        {/each}
      {/snippet}
      {@render fileTree(nodes, 4, 4)}
    </ul>
  </aside>
  <Editor class="w-full grow" />
</div>
