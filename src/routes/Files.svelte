<script lang="ts">
  import Icon from '@iconify/svelte';
  import { cn } from '$lib/utils';
  import { tick } from 'svelte';
  import type { Node } from './types';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  let {
    nodes = $bindable(),
    selectedNode = $bindable(),
    class: className
  }: { nodes: Node[]; selectedNode: Node | null; class?: string } = $props();

  // Rename selected node.
  let isRenaming = $state(false);
  let inputReference = $state<HTMLInputElement>();
  async function onRenameButtonClick() {
    if (!selectedNode) return;
    isRenaming = true;
    await tick();
    inputReference?.focus();
  }
  function onConfirmRenameButtonClick() {
    if (!selectedNode) return;
    selectedNode.name = inputReference?.value || 'NONE';
    isRenaming = false;
  }
  function onCancelRenameButtonClick() {
    if (!selectedNode) return;
    isRenaming = false;
  }

  // Delete selected node.
  let isDeleting = $state(false);
  let deleteTimeout: ReturnType<typeof setTimeout> | null = null;
  function onDeleteButtonClick() {
    if (!selectedNode) return;
    isDeleting = true;
    deleteTimeout = setTimeout(() => (isDeleting = false), 3000);
  }
  function onConfirmDeleteButtonClick() {
    if (!selectedNode) return;
    if (deleteTimeout) clearTimeout(deleteTimeout);
    deleteNode(selectedNode);
    isDeleting = false;
  }
  function onCancelDeleteButtonClick() {
    if (!selectedNode) return;
    if (deleteTimeout) clearTimeout(deleteTimeout);
    isDeleting = false;
  }

  function deleteNode(node: Node | null) {
    if (!node) return;
    // TODO: Implement delete and sort function.
  }

  $effect(() => {
    return () => {
      if (deleteTimeout) clearTimeout(deleteTimeout);
    };
  });
</script>

<aside class={cn('flex flex-col gap-4 bg-surface', className)}>
  <div class="space-between flex w-full gap-4 p-4">
    <header class="flex w-full flex-col gap-1">
      <p class="font-space-grotesk text-sm tracking-wider text-subforeground">CURRENTLY EDITING</p>
      <div class="flex gap-2">
        <div class="flex items-center gap-2">
          {#if !isRenaming}
            <h2 class="font-space-grotesk text-lg font-bold tracking-widest text-primary">
              {selectedNode ? selectedNode.name : 'NONE'}
            </h2>
          {:else}
            <input
              bind:this={inputReference}
              class="field-sizing-content font-space-grotesk text-lg font-bold tracking-widest text-primary"
              value={selectedNode ? selectedNode.name : 'NONE'}
              onkeydown={(event: KeyboardEvent) => {
                if (event.key === 'Enter') onConfirmRenameButtonClick();
                else if (event.key === 'Escape') onCancelRenameButtonClick();
              }}
              onblur={onCancelRenameButtonClick}
              type="text"
            />
          {/if}
        </div>
        {#snippet actionButton(icon: string, { class: className, ...rest }: HTMLButtonAttributes)}
          <button
            class={cn('flex items-center justify-center hover:cursor-pointer', className)}
            {...rest}
          >
            <Icon class="text-xl text-subforeground" {icon} />
          </button>
        {/snippet}
        {#if selectedNode}
          {#if !isDeleting}
            {@render actionButton('material-symbols:edit-square-outline-sharp', {
              'aria-label': 'Rename Button',
              onclick: onRenameButtonClick
            })}
          {/if}
          {#if !isRenaming}
            {@render actionButton('material-symbols:delete-outline-sharp', {
              'aria-label': 'Delete Button',
              onclick: onDeleteButtonClick
            })}
          {/if}
        {/if}
        {#if isRenaming}
          {@render actionButton('material-symbols:check-circle-outline-sharp', {
            'aria-label': 'Confirm Rename Button',
            onclick: onConfirmRenameButtonClick
          })}
          {@render actionButton('material-symbols:cancel-outline-sharp', {
            'aria-label': 'Cancel Rename Button',
            onclick: onCancelRenameButtonClick
          })}
        {:else if isDeleting}
          {@render actionButton('material-symbols:check-circle-outline-sharp', {
            'aria-label': 'Confirm Delete Button',
            onclick: onConfirmDeleteButtonClick
          })}
          {@render actionButton('material-symbols:cancel-outline-sharp', {
            'aria-label': 'Cancel Delete Button',
            onclick: onCancelDeleteButtonClick
          })}
        {/if}
      </div>
    </header>
  </div>
  <ul class="flex w-full flex-col">
    {#snippet treeNode(nodes: Node[], pl: number, increment: number)}
      {#each nodes as node}
        <li class="flex w-full flex-col">
          <button
            class="group flex items-center gap-2 border-l-3 border-l-transparent py-2 pr-4 hover:cursor-pointer data-[active=true]:border-l-primary data-[active=true]:bg-subsurface"
            style:padding-left="{pl * 0.25}rem"
            data-active={selectedNode === node}
            onclick={() => (selectedNode = node)}
          >
            <Icon
              class="text-xl text-foreground group-data-[active=true]:text-primary"
              icon={(() => {
                if (node.type == 'file' && selectedNode !== node)
                  return 'material-symbols:docs-outline-sharp';
                if (node.type == 'file' && selectedNode === node)
                  return 'material-symbols:edit-document-outline-sharp';
                if (node.type == 'directory' && selectedNode !== node)
                  return 'material-symbols:folder-outline-sharp';
                return 'material-symbols:folder-open-outline-sharp';
              })()}
            />
            <span
              class="font-space-grotesk text-sm tracking-wider text-foreground group-data-[active=true]:font-bold group-data-[active=true]:tracking-widest group-data-[active=true]:text-primary"
            >
              {node.name}
            </span>
          </button>
          {#if node.type == 'directory'}
            <ul class="flex w-full flex-col">
              {@render treeNode(node.children, pl + increment, increment)}
            </ul>
          {/if}
        </li>
      {/each}
    {/snippet}
    {@render treeNode(nodes, 4, 4)}
  </ul>
</aside>
