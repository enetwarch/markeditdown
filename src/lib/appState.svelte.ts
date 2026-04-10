import type { SvelteHTMLElements } from "svelte/elements";

export let appState = $state({
  pageTitle: "MarkEditDown" as string,
  headerAction: null as null | { label: string; function: () => void },
  rootAttributes: {} as SvelteHTMLElements["div"],
});
