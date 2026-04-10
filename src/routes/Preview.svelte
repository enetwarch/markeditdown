<script lang="ts">
  import { unified } from "unified";
  import remarkParse from "remark-parse";
  import remarkGfm from "remark-gfm";
  import remarkRehype from "remark-rehype";
  import rehypeSanitize from "rehype-sanitize";
  import rehypeHighlight from "rehype-highlight";
  import rehypeStringify from "rehype-stringify";
  import type { SvelteHTMLElements } from "svelte/elements";
  import { cn } from "$lib/utils";

  let {
    class: className,
    content = $bindable(),
    ...rest
  } = $props<{ class?: string; content?: string } & SvelteHTMLElements["section"]>();

  async function processMarkdown(content: string) {
    const file = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, {
        handlers: {
          link(state, node) {
            return {
              type: "element",
              tagName: "a",
              properties: {
                href: node.url,
                target: "_blank",
                rel: "noopener noreferrer",
              },
              children: state.all(node),
            };
          },
          image(state, node) {
            return {
              type: "element",
              tagName: "a",
              properties: {
                href: node.url,
                target: "_blank",
                rel: "noopener noreferrer",
              },
              children: [{ type: "text", value: node.alt || node.url }],
            };
          },
        },
      })
      .use(rehypeSanitize)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(content);
    return String(file);
  }

  let html = $state("");
  $effect(() => {
    processMarkdown(content).then((result: string) => (html = result));
  });
</script>

<section
  class={cn(
    "preview flex flex-col gap-6 bg-surface p-6 font-source-code-pro text-base text-foreground",
    className
  )}
  aria-label="Preview Section"
  {...rest}
>
  {@html html}
</section>

<style>
  section.preview :global(h1),
  section.preview :global(h2),
  section.preview :global(h3),
  section.preview :global(h4),
  section.preview :global(h5),
  section.preview :global(h6) {
    color: var(--color-primary);
    font-weight: bold;
  }

  section.preview :global(h1) {
    font-size: 2.5rem;
  }
  section.preview :global(h2) {
    font-size: 2rem;
  }
  section.preview :global(h3) {
    font-size: 1.5rem;
  }
  section.preview :global(h4) {
    font-size: 1.25rem;
  }
  section.preview :global(h5) {
    font-size: 1.1rem;
  }
  section.preview :global(h6) {
    font-size: 1rem;
  }

  section.preview :global(strong) {
    font-weight: bold;
  }

  section.preview :global(em) {
    color: var(--color-foreground);
    font-style: italic;
  }

  section.preview :global(a) {
    color: var(--color-primary);
    text-decoration: underline;
  }

  section.preview :global(ul),
  section.preview :global(ol) {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  section.preview :global(ul) {
    list-style-type: disc;
    padding-left: 1.5rem;
  }

  section.preview :global(ol) {
    list-style-type: decimal;
    padding-left: 1.5rem;
  }

  section.preview :global(li::marker) {
    color: var(--color-primary);
    font-weight: bold;
  }

  section.preview :global(blockquote) {
    border-left: 3px solid var(--color-primary);
    padding-left: 1rem;
    color: var(--color-subforeground);
    font-style: italic;
  }

  section.preview :global(code:not(pre code)) {
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    padding: 0.25rem;
  }

  section.preview :global(pre) {
    background-color: var(--color-background) !important;
    padding: 0.5rem;
    overflow-x: auto;
    border: 1px solid var(--color-border);
  }

  section.preview :global(.hljs-keyword),
  section.preview :global(.hljs-operator) {
    color: var(--color-primary);
  }

  section.preview :global(.hljs-comment) {
    color: var(--color-subforeground);
    font-style: italic;
  }

  section.preview :global(hr) {
    border: none;
    border-top: 2px solid var(--color-primary);
  }

  section.preview :global(input[type="checkbox"]) {
    appearance: none;
    width: 1rem;
    height: 1rem;
    border: 2px solid var(--color-primary);
    background: transparent;
    vertical-align: middle;
    position: relative;
  }

  section.preview :global(input[type="checkbox"]:checked) {
    background: var(--color-primary);
    color: var(--color-surface);
  }

  section.preview :global(input[type="checkbox"]:checked::after) {
    content: "";
    position: absolute;
    left: 4px;
    top: 1.5px;
    width: 4px;
    height: 8px;
    border: solid var(--color-surface);
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  section.preview :global(table) {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid var(--color-border);
  }

  section.preview :global(th) {
    background-color: var(--color-surface);
    color: var(--color-primary);
    font-weight: bold;
    text-align: left;
    padding: 0.75rem;
    border: 1px solid var(--color-border);
  }

  section.preview :global(td) {
    padding: 0.75rem;
    border: 1px solid var(--color-border);
  }
</style>
