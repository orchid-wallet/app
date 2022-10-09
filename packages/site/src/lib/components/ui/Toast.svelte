<script lang="ts">
  import { utilStore } from '$lib/stores/util';
  import { fade } from 'svelte/transition';

</script>

{#if $utilStore.isToastShowing}
  <div transition:fade="{{delay: 0, duration: 300}}" class="fixed inset-x-0 bottom-0 pb-2 sm:pb-5">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="rounded-lg bg-indigo-600 p-2 shadow-lg sm:p-3">
        <div class="flex flex-wrap items-center justify-between">
          <div class="flex w-0 flex-1 items-center">
          <span class="flex rounded-lg bg-indigo-800 p-2 text-white">
            <!-- Heroicon name: outline/megaphone -->
            <UiIcon name="{$utilStore.toastIcon}"></UiIcon>
          </span>
            <p class="ml-3 truncate font-medium text-white">
              {$utilStore.toastText}
            </p>
          </div>
          <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
            <button on:click={() => {utilStore.showToast(null, null)}} type="button" class="-mr-1 flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white">
              <span class="sr-only">Dismiss</span>
              <!-- Heroicon name: outline/x-mark -->
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}
