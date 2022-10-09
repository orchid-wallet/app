<script lang="ts">

  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  export let loading = false;
  export let title: 'Get Started';
  export let secondary = false;
  export let disabled = false;
  export let customLoadingTitle = ""

  const primaryClasses = "inline-flex items-center place-items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  const secondaryClasses = "inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"

</script>

<div class="">
  <button disabled={loading || disabled} class={secondary ? secondaryClasses : primaryClasses}
          on:click>
    {#if loading}
      <div class="loader mr-4"></div>{customLoadingTitle ? customLoadingTitle : "Loading..."}
    {:else}
      <div>{title}</div>
    {/if}
  </button>
</div>

<style>
  .darkLoader {
    border: 0.2rem solid #f3f3f3; /* Light grey */
    border-top: 0.2rem solid #3498db; /* Blue */
    border-radius: 50%;
    width: 1.3rem;
    height: 1.3rem;
    animation: spin 2s linear infinite;
  }
  .loader {
    border: 0.2rem solid #f3f3f3; /* Light grey */
    border-top: 0.2rem solid #3498db; /* Blue */
    border-radius: 50%;
    width: 1.3rem;
    height: 1.3rem;
    animation: spin 2s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
