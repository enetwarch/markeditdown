<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import Icon from "@iconify/svelte";
  import { appState } from "$lib/appState.svelte";
  import { cn } from "$lib/utils";

  let { class: className = "", ...restAttributes } = $derived(appState.rootAttributes ?? {});
  let { children } = $props();
</script>

<svelte:head>
  <title>{appState.pageTitle}</title>
  <link rel="icon" href={favicon} />
</svelte:head>
<div class={cn("flex min-h-screen flex-col gap-0", className)} {...restAttributes}>
  <header class="flex w-full items-center justify-between border-b border-border bg-background p-4">
    <nav class="flex items-center gap-12">
      <a href="/">
        <h1 class="font-space-grotesk text-3xl font-extrabold tracking-widest text-primary">
          MARKEDITDOWN
        </h1>
      </a>
      <ul class="flex gap-8">
        {#snippet navLink(href: string, text: string)}
          <li>
            <a class="font-space-grotesk text-base tracking-wider text-foreground" {href}>
              {text}
            </a>
          </li>
        {/snippet}
        {@render navLink("/editor", "EDITOR")}
        {@render navLink("/docs", "DOCS")}
      </ul>
    </nav>
    <nav>
      <ul class="flex gap-4">
        {#snippet iconLink(href: string, icon: string)}
          <li>
            <a class="flex items-center justify-center" {href} target="_blank" rel="noreferrer">
              <Icon class="text-3xl text-subforeground" {icon}></Icon>
            </a>
          </li>
        {/snippet}
        {@render iconLink(
          "https://github.com/enetwarch/markeditdown",
          "material-symbols:code-blocks-outline-sharp"
        )}
        {@render iconLink(
          "https://github.com/enetwarch",
          "material-symbols:credit-card-heart-outline-sharp"
        )}
      </ul>
    </nav>
  </header>
  {@render children()}
  <footer class="flex w-full justify-center border-t border-border bg-background p-2">
    <p class="font-space-grotesk text-subforeground">
      Made by
      <a class="underline" href="https://github.com/enetwarch" target="_blank" rel="noreferrer"
        >Enetwarch</a
      >
    </p>
  </footer>
</div>

<style>
  @supports (not selector(::-webkit-scrollbar)) {
    :global(*) {
      scrollbar-width: thin !important;
      scrollbar-color: var(--color-border) var(--color-background) !important;
    }
  }

  :global(::-webkit-scrollbar) {
    width: 0.75rem !important;
    height: 0.75rem !important;
  }

  :global(::-webkit-scrollbar-track) {
    background: var(--color-background) !important;
    border-radius: 0 !important;
  }

  :global(::-webkit-scrollbar-thumb) {
    background-color: var(--color-border) !important;
    border-radius: 0 !important;
    border: none !important;
  }

  :global(::-webkit-scrollbar-thumb:hover) {
    background-color: var(--color-primary) !important;
  }

  :global(::-webkit-scrollbar-button) {
    display: none !important;
  }
</style>
