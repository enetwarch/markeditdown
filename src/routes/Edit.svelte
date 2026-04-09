<script lang="ts">
  import { onMount } from 'svelte';
  import type { SvelteHTMLElements } from 'svelte/elements';
  import { cn } from '$lib/utils';
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
    keymap
  } from '@codemirror/view';
  import {
    indentOnInput,
    syntaxHighlighting,
    HighlightStyle,
    bracketMatching
  } from '@codemirror/language';
  import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
  import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
  import {
    autocompletion,
    completionKeymap,
    closeBrackets,
    closeBracketsKeymap
  } from '@codemirror/autocomplete';
  import { markdown } from '@codemirror/lang-markdown';
  import { languages } from '@codemirror/language-data';
  import { tags } from '@lezer/highlight';

  let {
    class: className,
    content = $bindable(),
    ...rest
  } = $props<{ class?: string; content?: string } & SvelteHTMLElements['section']>();
  let editorContainer = $state<HTMLDivElement>();
  let view = $state<EditorView>();

  const highlighting = HighlightStyle.define([
    /* { tag: tags.keyword, color: 'var(--color-primary)' },
    { tag: tags.operator, color: 'var(--color-primary)' },
    { tag: tags.comment, color: '#adaaaa', fontStyle: 'italic' },
    { tag: tags.heading1, fontWeight: 'bold', color: 'var(--color-primary)' },
    { tag: tags.link, color: '#9cff93', textDecoration: 'underline' } */
    // TODO: Add syntax higlighting
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
        autocompletion(),
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
          ...completionKeymap
        ]),
        markdown({ codeLanguages: languages }),
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            content = update.state.doc.toString();
          }
        })
      ],
      parent: editorContainer
    });
    return () => view?.destroy();
  });
</script>

<section class={cn('editor bg-background', className)} aria-label="Edit Section" {...rest}>
  <div bind:this={editorContainer} class="h-full w-full overflow-hidden"></div>
</section>

<style>
  section.editor :global(.cm-editor) {
    color: var(--color-foreground) !important;
    background-color: var(--color-background) !important;
    font-family: 'Source Code Pro', monospace !important;
    font-size: 16px !important;
    height: 100% !important;
  }

  section.editor :global(.cm-editor.cm-focused) {
    outline: none !important;
  }

  section.editor :global(.cm-gutters) {
    background-color: var(--color-surface) !important;
    color: var(--color-subforeground) !important;
    border-right: none !important;
  }

  section.editor :global(.cm-gutterElement) {
    padding-inline: 16px !important;
    text-align: right !important;
  }

  section.editor :global(.cm-activeLineGutter) {
    background-color: var(--color-primary) !important;
    color: var(--color-background) !important;
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
