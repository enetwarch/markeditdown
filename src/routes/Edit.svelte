<script lang="ts">
  import { onMount } from "svelte";
  import type { SvelteHTMLElements } from "svelte/elements";
  import { cn } from "$lib/utils";
  import {
    EditorView,
    lineNumbers,
    highlightActiveLineGutter,
    highlightSpecialChars,
    drawSelection,
    dropCursor,
    rectangularSelection,
    crosshairCursor,
    highlightActiveLine,
    keymap,
  } from "@codemirror/view";
  import {
    indentOnInput,
    syntaxHighlighting,
    HighlightStyle,
    bracketMatching,
  } from "@codemirror/language";
  import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
  import { searchKeymap, highlightSelectionMatches } from "@codemirror/search";
  import { closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";
  import { markdown } from "@codemirror/lang-markdown";
  import { languages } from "@codemirror/language-data";
  import { tags } from "@lezer/highlight";

  let {
    class: className,
    content = $bindable(),
    ...rest
  } = $props<{ class?: string; content?: string } & SvelteHTMLElements["section"]>();
  let editorContainer = $state<HTMLElement>();
  let view = $state<EditorView>();

  const highlighting = HighlightStyle.define([
    // Block-Level Structure (The "Skeleton")
    { tag: tags.heading, color: "var(--color-primary)", fontWeight: "bold" },
    { tag: tags.quote, color: "var(--color-subforeground)", fontStyle: "italic" },
    { tag: tags.contentSeparator, color: "var(--color-primary)", fontWeight: "bold" },
    { tag: tags.list, color: "var(--color-primary)" },

    // Inline Formatting (The "Emphasizers")
    { tag: tags.strong, color: "var(--color-primary)", fontWeight: "bold" },
    { tag: tags.emphasis, fontStyle: "italic" },
    { tag: tags.strikethrough, textDecoration: "line-through" },
    { tag: tags.monospace, color: "var(--color-primary)" },

    // Links and References
    { tag: tags.link, color: "var(--color-primary)", textDecoration: "underline" },
    { tag: tags.labelName, color: "var(--color-primary)" },
    { tag: tags.url, color: "var(--color-subforeground)", textDecoration: "underline" },
    { tag: tags.propertyName, color: "var(--color-primary)" },

    // Programming & Syntax (For Fenced Code Blocks)
    { tag: tags.keyword, color: "var(--color-primary)" },
    { tag: tags.operator, color: "var(--color-primary)" },
    { tag: tags.comment, color: "var(--color-subforeground)", fontStyle: "italic" },

    // Meta & Technical
    { tag: tags.meta, color: "var(--color-subforeground)" },
    { tag: tags.content, color: "var(--color-foreground)" },
  ]);

  onMount(() => {
    if (!editorContainer) return;
    view = new EditorView({
      doc: content,
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        drawSelection(),
        dropCursor(),
        EditorView.lineWrapping,
        indentOnInput(),
        syntaxHighlighting(highlighting),
        bracketMatching(),
        closeBrackets(),
        rectangularSelection(),
        crosshairCursor(),
        highlightActiveLine(),
        highlightSelectionMatches(),
        keymap.of([
          indentWithTab,
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...searchKeymap,
          ...historyKeymap,
        ]),
        markdown({ codeLanguages: languages }),
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            content = update.state.doc.toString();
          }
        }),
      ],
      parent: editorContainer,
    });
    return () => view?.destroy();
  });
</script>

<section class={cn("editor bg-background", className)} aria-label="Edit Section" {...rest}>
  <div bind:this={editorContainer} class="h-full w-full overflow-hidden"></div>
</section>

<style>
  section.editor :global(.cm-editor) {
    color: var(--color-foreground) !important;
    background-color: var(--color-background) !important;
    font-family: "Source Code Pro", monospace !important;
    font-size: 1rem !important;
    height: 100% !important;
  }

  section.editor :global(.cm-editor.cm-focused) {
    outline: none !important;
  }

  section.editor :global(.cm-gutters) {
    background-color: var(--color-surface) !important;
    color: var(--color-subforeground) !important;
    border-right: 1px solid var(--color-border) !important;
  }

  section.editor :global(.cm-gutterElement) {
    padding-inline: 1rem !important;
    text-align: right !important;
  }

  section.editor :global(.cm-activeLineGutter) {
    background-color: var(--color-primary) !important;
    color: var(--color-surface) !important;
  }

  section.editor :global(.cm-content) {
    caret-color: var(--color-primary) !important;
    padding: none !important;
  }

  section.editor :global(.cm-content ::selection),
  section.editor :global(.cm-selectionBackground),
  section.editor :global(.cm-selectionMatch) {
    background-color: var(--color-highlight) !important;
  }

  section.editor :global(.cm-activeLine) {
    background-color: var(--color-subsurface) !important;
  }

  section.editor :global(.cm-cursor) {
    border-left: 2px solid var(--color-primary) !important;
  }

  section.editor :global(.cm-matchingBracket),
  section.editor :global(.cm-nonmatchingBracket) {
    background-color: transparent !important;
  }
</style>
