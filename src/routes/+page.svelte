<script lang="ts">
  import type { Node } from './types';
  import Files from './Files.svelte';
  import Editor from './Editor.svelte';

  let selectedNode: Node | null = $state(null);
  let nodes: Node[] = $state([
    {
      id: crypto.randomUUID(),
      type: 'directory',
      name: 'important',
      children: [
        { id: crypto.randomUUID(), type: 'file', name: 'information' },
        { id: crypto.randomUUID(), type: 'file', name: 'data' }
      ]
    },
    { id: crypto.randomUUID(), type: 'file', name: 'readme' },
    { id: crypto.randomUUID(), type: 'file', name: 'sample' }
  ]);
</script>

<div class="flex grow">
  <Files class="min-w-70 grow border-r border-border" {nodes} {selectedNode} />
  <Editor class="w-full grow" />
</div>
