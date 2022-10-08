<script lang="ts">
  import logo from '$lib/assets/images/logo.png';
  import ConnectButton from './ConnectButton.svelte';
  import DisconnectButton from './DisconnectButton.svelte';
  import {authStore} from "$lib/stores/auth.js";

  let loading = false;

  function truncatedAddress(str: string) {
    const first = str.slice(0,6)
    const last = str.slice(str.length - 5, str.length-1)
    console.log(first, last);
    return first + '...' + last
  }
  let selectedOption = 'mumbai'
  let options = [{ text: 'Goerli', value: 'goerli' }, { text: 'Mumbai', value: 'mumbai' }]
</script>

<header class="bg-white shadow-sm static overflow-y-visible">
  <div class="mx-auto max-w-7xl px-4 px-8 py-3">
    <div class="relative flex justify-between gap-8">
      <div class="flex static">
        <div class="flex flex-shrink-0 items-center">
          <a href="/">
            <img class="block h-8 w-auto" src={logo} alt="Orchid Wallet">
          </a>
        </div>
      </div>
      <div class="flex items-center">
        {#if $authStore.authenticated}
          <UiDropdown class="inline-flex px-4" bind:value={selectedOption} options={options} />
          <div class="inline-flex items-center rounded-full bg-indigo-100 py-0.5 px-2 pr-1 text-sm font-medium text-indigo-700">
            {truncatedAddress($authStore.walletAddress)}
              <button on:click={ () => {
                navigator.clipboard.writeText($authStore.walletAddress);
              }} class="ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500 focus:text-white focus:outline-none">
              <span class="sr-only">copy wallet address</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
              </svg>
            </button>
          </div>

          <DisconnectButton />
        {:else}
          <ConnectButton />
        {/if}
      </div>
    </div>
  </div>
</header>
