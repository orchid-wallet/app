<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let outline = false;
  export let disabled = false;
  export let loading = false;
  export let submit = false;
  export let blockButton = false;
  export let xPadding = 'px-5';
  export let primary = false;
  export let secondary = false;
  export let tertiary = false;
</script>

<button
  type={submit ? 'submit' : 'button'}
  on:click
  class={`
              ${$$props.class} ${xPadding}
               flex justify-center items-center text-menutitle py-2 border transition-colors whitespace-nowrap rounded-lg
              ${
                  disabled
                      ? `pointer-events-none bg-secondary-light`
                      : !outline
                      ? `border-primary-light bg-primary-light text-white hover:bg-transparent hover:text-primary-light`
                      : `border-primary-light text-primary-light hover:bg-primary-light hover:text-white`
              }
              ${loading ? 'pointer-events-none' : ''}
              ${blockButton ? 'min-w-[200px]' : ''}
              ${primary ? 'bg-primary text-white hover:bg-primary-hover hover:!text-white disabled:bg-primary-disabled' : ''}
              ${primary && disabled ? 'bg-primary-disabled' : ''}
              ${secondary ? '!bg-white !border-secondary !text-primary-dark hover:!bg-secondary hover:!text-primary-dark' : ''}
              ${tertiary ? '!bg-white !border-secondary !text-primary hover:!bg-primary-disabled hover:!text-primary' : ''}
          `}
>
  {#if !loading}
    <slot><!-- optional fallback --></slot>
  {:else}<div class="loader" />
  {/if}
</button>

<style>
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
