<script lang="ts">
  import logo from '$lib/assets/images/logo.png';
  import ConnectButton from './ConnectButton.svelte';
  import DisconnectButton from './DisconnectButton.svelte';
  import {authStore} from "$lib/stores/auth.js";

  let loading = false;
</script>

<header class="bg-white shadow-sm static overflow-y-visible">
  <div class="mx-auto max-w-7xl px-4 px-8 py-3">
    <div class="relative flex justify-between gap-8">
      <div class="flex static">
        <div class="flex flex-shrink-0 items-center">
          <a href="#">
            <img class="block h-8 w-auto" src={logo} alt="Orchid Wallet">
          </a>
        </div>
      </div>
      <div class="flex items-center justify-end">
        <a href="#" class="ml-5 flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span class="sr-only">View notifications</span>
          <!-- Heroicon name: outline/bell -->
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
        </a>

        {#if $authStore.authenticated}
          <DisconnectButton />
        {:else}
          <ConnectButton />
        {/if}
      </div>
    </div>
  </div>
</header>
