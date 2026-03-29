<script lang="ts">
  import Icon from '@iconify/svelte';
</script>

<div class="flex min-h-screen flex-col gap-0">
  <header
    class="flex w-full items-center justify-between border-b border-border bg-background p-4"
  >
    <nav>
      <a href="./">
        <h1 class="font-space-grotesk text-3xl font-extrabold text-primary">MARKEDITDOWN</h1>
      </a>
    </nav>
    <nav class="flex">
      <ul class="flex gap-4">
        <li class="flex items-center justify-center">
          <a href="https://github.com/enetwarch/markeditdown" target="_blank">
            <Icon
              class="text-3xl text-subforeground"
              icon="material-symbols:code-blocks-outline-sharp"
            />
          </a>
        </li>
        <li class="flex items-center justify-center">
          <a href="https://github.com/enetwarch" target="_blank">
            <Icon
              class="text-3xl text-subforeground"
              icon="material-symbols:credit-card-heart-outline-sharp"
            />
          </a>
        </li>
      </ul>
    </nav>
  </header>
  <div class="flex grow">
    <aside class="flex min-w-70 flex-col gap-4 border-r border-border bg-surface">
      <div class="w-full flex p-4 gap-4 space-between">
        <header class="w-full flex flex-col">
          <div class="flex gap-2">
                    <h2 class="font-space-grotesk font-bold text-primary text-lg tracking-widest">COMPUTER</h2>
          <button class="flex items-center justify-center hover:cursor-pointer">
            <Icon class="text-xl text-subforeground"
              icon="material-symbols:edit-outline-sharp" />
          </button>
          <button class="flex items-center justify-center hover:cursor-pointer">
            <Icon class="text-xl text-subforeground"
              icon="material-symbols:delete-outline-sharp" />
          </button>
        </div>
          <p class="font-space-grotesk text-sm text-subforeground">Last edited 20m ago</p>
        </header>
      </div>
      <ul class="flex w-full flex-col">
        <li class="flex w-full flex-col">
          <div class="flex items-center gap-2 px-4 py-2 pl-4 hover:bg-foreground">
            <Icon
              class="text-xl text-foreground"
              icon="material-symbols:folder-open-outline-sharp"
            />
            <p class="font-space-grotesk text-base text-foreground">IMPORTANT</p>
          </div>
          <ul class="flex w-full flex-col">
            <li class="flex w-full flex-col">
              <div class="flex items-center gap-2 px-4 py-2 pl-8 hover:bg-foreground">
                <Icon class="text-xl text-foreground" icon="material-symbols:docs-outline-sharp" />
                <p class="font-space-grotesk text-base text-foreground">COMPUTER</p>
              </div>
            </li>
            <li class="flex w-full flex-col">
              <div class="flex items-center gap-2 px-4 py-2 pl-8 hover:bg-foreground">
                <Icon class="text-xl text-foreground" icon="material-symbols:docs-outline-sharp" />
                <p class="font-space-grotesk text-base text-foreground">PHONE</p>
              </div>
            </li>
            <li class="flex w-full flex-col">
              <div class="flex items-center gap-2 px-4 py-2 pl-8 hover:bg-foreground">
                <Icon class="text-xl text-foreground" icon="material-symbols:docs-outline-sharp" />
                <p class="font-space-grotesk text-base text-foreground">DATE</p>
              </div>
            </li>
          </ul>
        </li>
        <li class="flex w-full flex-col">
          <div class="flex items-center gap-2 px-4 py-2 pl-4 hover:bg-foreground">
            <Icon class="text-xl text-foreground" icon="material-symbols:docs-outline-sharp" />
            <p class="font-space-grotesk text-base text-foreground">DATA</p>
          </div>
        </li>
      </ul>
    </aside>
    <main class="grow flex w-full flex-col gap-0">
      <header class="flex w-full bg-surface border-b border-border">
        <button class="flex items-center justify-center px-8 py-2 border-r border-border hover:cursor-pointer">
          <h2 class="font-space-grotesk text-lg text-foreground">EDIT</h2>
        </button>
        <button class="flex items-center justify-center px-8 py-2 border-r border-border hover:cursor-pointer">
          <h2 class="font-space-grotesk text-lg text-foreground">PREVIEW</h2>
        </button>
      </header>
      <div class="grow flex gap-0">
        <section class="grow flex bg-background border-r border-border"></section>
        <section class="grow flex bg-surface"></section>
      </div>
    </main>
  </div>
</div>
