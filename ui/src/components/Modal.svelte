<script>
  import { createEventDispatcher, onMount, onDestroy } from "svelte";
  import { scale } from "svelte/transition";

  export let title = "Are you sure?";
  export let message = "This action cannot be undone.";
  export let confirmText = "Confirm";
  export let cancelText = "Cancel";
  export let type = "danger"; // danger | info

  const dispatch = createEventDispatcher();

  function handleKeydown(event) {
    if (event.key === "Escape") {
      dispatch("cancel");
    }
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
  });

  onDestroy(() => {
    window.removeEventListener("keydown", handleKeydown);
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
  role="dialog"
  aria-modal="true"
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5 backdrop-blur-sm"
  on:click={() => dispatch("cancel")}
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="w-[400px] max-w-full space-y-5 rounded-md bg-dark p-5 outline outline-[1.5px] outline-white/10"
    role="document"
    on:click|stopPropagation
    transition:scale={{ duration: 250, opacity: 0.001, start: 0.98 }}
  >
    <div class="space-y-2">
      <h2 class="text-xl font-medium text-white">{title}</h2>
      <p class="text-base text-white/50">{message}</p>
    </div>

    <div class="flex items-center justify-end gap-3">
      <button
        on:click={() => dispatch("cancel")}
        class="rounded-md bg-white/10 px-4 py-2 text-white transition hover:bg-white/20"
      >
        {cancelText}
      </button>
      <button
        on:click={() => dispatch("confirm")}
        class={type === "danger"
          ? "rounded-md bg-red-400/80 px-4 py-2 text-white transition hover:bg-red-400"
          : "rounded-md bg-main px-4 py-2 text-white transition hover:bg-main/80"}
      >
        {confirmText}
      </button>
    </div>
  </div>
</div>
