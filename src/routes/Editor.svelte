<script lang="ts">
  import { cn } from '$lib/utils';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  let { class: className } = $props<{ class?: string }>();

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
</script>

<main bind:this={mainReference} class={cn('flex flex-col gap-0', className)}>
  <header class="relative flex w-full border-b border-border bg-surface">
    {#snippet modeButton(text: string, { class: className, ...rest }: HTMLButtonAttributes = {})}
      <button
        class={cn(
          'flex items-center justify-center border-x border-border px-8 py-2',
          'font-space-grotesk text-base tracking-wider text-foreground hover:cursor-pointer',
          className
        )}
        {...rest}
      >
        {text.toUpperCase()}
      </button>
    {/snippet}
    {@render modeButton('EDIT')}
    {@render modeButton('PREVIEW', {
      class: 'absolute',
      style: `left: ${editSplitPercent}%`
    })}
  </header>
  <div class="flex grow gap-0">
    <section
      class="flex grow bg-background"
      style="width: {editSplitPercent}%"
      aria-label="Edit Section"
    ></section>
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <div
      role="separator"
      onmousedown={startResize}
      class="z-999 h-full w-px cursor-col-resize bg-border"
    ></div>
    <section
      class="flex grow resize bg-surface"
      style="width: {100 - editSplitPercent}%"
      aria-label="Preview Section"
    ></section>
  </div>
</main>
