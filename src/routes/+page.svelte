<script lang="ts">
  import { cn } from "$lib/utils";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import Edit from "./Edit.svelte";
  import Preview from "./Preview.svelte";
  import sampleContent from "./sample.md?raw";
  import { appState } from "$lib/appState.svelte";

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
    window.addEventListener("mousemove", handleResize);
    window.addEventListener("mouseup", stopResize);
  }

  function stopResize() {
    isResizing = false;
    window.removeEventListener("mousemove", handleResize);
    window.removeEventListener("mouseup", stopResize);
  }

  let editElement = $state<HTMLElement>();
  let previewElement = $state<HTMLElement>();
  let isSyncingScroll = false;
  let scrollPercentage = $state(0);
  function syncScroll(source: HTMLElement, target: HTMLElement | undefined) {
    // The way this works is it basically scrolls the other view if you scroll on the other.
    // It scrolls based on the percentage because the preview is usually longer than the edit.
    // However, it is not a solid solution as it skips past pixels if the content is big enough.
    if (isSyncingScroll) return;
    const sourceMax = source.scrollHeight - source.clientHeight;
    if (sourceMax <= 0) return;
    isSyncingScroll = true;
    scrollPercentage = source.scrollTop / sourceMax;
    if (target) {
      const targetMax = target.scrollHeight - target.clientHeight;
      target.scrollTop = scrollPercentage * targetMax;
    }
    requestAnimationFrame(() => (isSyncingScroll = false));
  }

  $effect(() => {
    const edit = editElement;
    const preview = previewElement;
    if (edit && preview) {
      const syncEditScrollToPreview = () => syncScroll(edit, preview);
      const syncPreviewScrollToEdit = () => syncScroll(preview, edit);
      edit.addEventListener("scroll", syncEditScrollToPreview, { passive: true });
      preview.addEventListener("scroll", syncPreviewScrollToEdit, { passive: true });
      return () => {
        edit.removeEventListener("scroll", syncEditScrollToPreview);
        preview.removeEventListener("scroll", syncPreviewScrollToEdit);
      };
    }
  });

  $effect(() => {
    const _ = [editModeActive, previewModeActive];
    requestAnimationFrame(() => {
      if (editModeActive && editElement) {
        const max = editElement.scrollHeight - editElement.clientHeight;
        editElement.scrollTop = scrollPercentage * max;
      }
      if (previewModeActive && previewElement) {
        const max = previewElement.scrollHeight - previewElement.clientHeight;
        previewElement.scrollTop = scrollPercentage * max;
      }
    });
  });

  let content = $state<string>(sampleContent);
  $effect(() => {
    appState.pageTitle = "MarkEditDown";
    appState.rootAttributes = { class: "min-h-0 h-screen" };
  });
</script>

<div class="flex min-h-0 grow">
  <main bind:this={mainReference} class="flex w-full grow flex-col gap-0 bg-background">
    <header class="relative flex w-full border-b border-border bg-surface">
      {#snippet modeButton(text: string, { class: className, ...rest }: HTMLButtonAttributes = {})}
        <button
          class={cn(
            "flex items-center justify-center border-x border-b-3 border-x-border border-b-transparent px-8 py-2 font-space-grotesk text-base tracking-wider text-foreground hover:cursor-pointer data-[active=true]:border-b-primary data-[active=true]:font-bold data-[active=true]:tracking-widest data-[active=true]:text-primary",
            className
          )}
          {...rest}
        >
          {text.toUpperCase()}
        </button>
      {/snippet}
      {@render modeButton("EDIT", {
        class: "border-l-0",
        "data-active": editModeActive,
        "data-onlyactive": onlyEditModeActive,
        onclick: () => {
          if (onlyEditModeActive) return;
          editModeActive = !editModeActive;
        },
      })}
      {@render modeButton("PREVIEW", {
        class:
          "data-[active=true]:absolute data-[active=false]:border-l-0 data-[onlyactive=true]:static data-[onlyactive=true]:border-l-0",
        style: `left: ${editSplitPercent}%`,
        "data-active": previewModeActive,
        "data-onlyactive": onlyPreviewModeActive,
        onclick: () => {
          if (onlyPreviewModeActive) return;
          previewModeActive = !previewModeActive;
        },
      })}
    </header>
    <div class="flex min-h-0 grow gap-0">
      <Edit
        class="h-full min-h-0 grow data-[active=false]:hidden"
        style="width: {editSplitPercent}%"
        data-active={editModeActive}
        data-onlyactive={onlyEditModeActive}
        aria-label="Edit Section"
        bind:element={editElement}
        bind:content
      />
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <div
        role="separator"
        onmousedown={startResize}
        data-active={bothModesActive}
        class="z-999 -mx-1 h-full w-2 cursor-col-resize opacity-0 data-[active=false]:hidden"
      ></div>
      <Preview
        class="h-full min-h-0 grow overflow-y-auto data-[active=false]:hidden data-[active=true]:border-l data-[active=true]:border-border data-[onlyactive=true]:border-l-0"
        style="width: {100 - editSplitPercent}%"
        data-active={previewModeActive}
        data-onlyactive={onlyPreviewModeActive}
        bind:element={previewElement}
        bind:content
      />
    </div>
  </main>
</div>
