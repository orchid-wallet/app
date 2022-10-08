<script lang="ts">
  import { utilStore } from '$lib/stores/util';
  import { fade } from 'svelte/transition';

</script>

{#if $utilStore.isToastShowing}
  <div transition:fade="{{delay: 250, duration: 300}}" class='pointer-events-none'>
    <div class="fixed bottom-0 mb-3 w-full z-50 flex justify-center">
      <div
        class="min-w-[425px] flex justify-between items-center p-4 text-white rounded-2xl {`!bg-${$utilStore.toastColor}`}">
        <div class="min-w-[36px] min-h-[36px] flex items-center justify-center bg-transparency-30 rounded-lg">
          <UiIcon name="{$utilStore.toastIcon}"></UiIcon>
        </div>
        <div class="w-full text-center text-smleading">
          {$utilStore.toastText}
        </div>
      </div>
    </div>
  </div>
{/if}
