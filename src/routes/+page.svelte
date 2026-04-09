<script lang="ts">
  import { cn } from '$lib/utils';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import Edit from './Edit.svelte';
  import sampleContent from './sample.md?raw';

  let editModeActive = $state(true);
  let previewModeActive = $state(true);
  let onlyEditModeActive = $derived(editModeActive && !previewModeActive);
  let onlyPreviewModeActive = $derived(previewModeActive && !editModeActive);
  let bothModesActive = $derived(editModeActive && previewModeActive);

  let mainReference = $state<HTMLElement>();
  let editSplitPercent = $state(50);
  let isResizing = $state(false);

  function handleResize(event: MouseEvent) {
    if (!isResizing || !mainReference) return;
    const mainRectangle = mainReference.getBoundingClientRect();
    const relativeX = event.clientX - mainRectangle.left;
    let newSplit = (relativeX / mainRectangle.width) * 100;
    editSplitPercent = Math.min(Math.max(newSplit, 20), 80);
  }

  function startResize(event: MouseEvent) {
    event.preventDefault(); // allows rapid resizing
    isResizing = true;
    window.addEventListener('mousemove', handleResize);
    window.addEventListener('mouseup', stopResize);
  }

  function stopResize() {
    isResizing = false;
    window.removeEventListener('mousemove', handleResize);
    window.removeEventListener('mouseup', stopResize);
  }

  let content = $state<string>(sampleContent);
</script>

<div class="flex grow">
  <main bind:this={mainReference} class="flex w-full grow flex-col gap-0 bg-background">
    <header class="relative flex w-full border-b border-border bg-surface">
      {#snippet modeButton(text: string, { class: className, ...rest }: HTMLButtonAttributes = {})}
        <button
          class={cn(
            'flex items-center justify-center border-x border-b-3 border-x-border border-b-transparent px-8 py-2 font-space-grotesk text-base tracking-wider text-foreground hover:cursor-pointer data-[active=true]:border-b-primary data-[active=true]:font-bold data-[active=true]:tracking-widest data-[active=true]:text-primary',
            className
          )}
          {...rest}
        >
          {text.toUpperCase()}
        </button>
      {/snippet}
      {@render modeButton('EDIT', {
        class: 'border-l-0',
        'data-active': editModeActive,
        'data-onlyactive': onlyEditModeActive,
        onclick: () => {
          if (onlyEditModeActive) return;
          editModeActive = !editModeActive;
        }
      })}
      {@render modeButton('PREVIEW', {
        class:
          'data-[active=true]:absolute data-[active=false]:border-l-0 data-[onlyactive=true]:static data-[onlyactive=true]:border-l-0',
        style: `left: ${editSplitPercent}%`,
        'data-active': previewModeActive,
        'data-onlyactive': onlyPreviewModeActive,
        onclick: () => {
          if (onlyPreviewModeActive) return;
          previewModeActive = !previewModeActive;
        }
      })}
    </header>
    <div class="flex grow gap-0">
      <Edit
        class="flex grow data-[active=false]:hidden"
        style="width: {editSplitPercent}%"
        data-active={editModeActive}
        data-onlyactive={onlyEditModeActive}
        aria-label="Edit Section"
        bind:content
      />
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <div
        role="separator"
        onmousedown={startResize}
        data-active={bothModesActive}
        class="z-999 -mx-2 h-full w-4 cursor-col-resize opacity-0 data-[active=false]:hidden"
      ></div>
      <section
        class="flex grow resize bg-surface data-[active=false]:hidden data-[active=true]:border-l data-[active=true]:border-border data-[onlyactive=true]:border-l-0"
        style="width: {100 - editSplitPercent}%"
        data-active={previewModeActive}
        data-onlyactive={onlyPreviewModeActive}
        aria-label="Preview Section"
      ></section>
    </div>
  </main>
</div>
