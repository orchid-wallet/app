<script lang="ts">

  import {contractStore} from "$lib/stores/contracts";



</script>

{#if $contractStore.owner}
 <div class="mx-auto max-w-5xl py-16 px-4 sm:px-6 lg:px-8">
   <h2 class="text-lg font-medium py-2">Your Smart Wallets</h2>
  <div class="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
    <div class="rounded-tl-lg rounded-tr-lg sm:rounded-tr-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
      <div class="mt-8">
        <h3 class="text-lg font-medium">
          Name
        </h3>
        <p class="text-sm text-gray-500">{$contractStore.walletName}</p>
        <h3 class="mt-2 text-lg font-medium">
          Owner
        </h3>
        <p class="text-sm text-gray-500">{$contractStore.owner}</p>
        <h3 class="mt-2 text-lg font-medium">
          Successor
        </h3>
        <p class="text-sm text-gray-500">{$contractStore.walletSuccessor}</p>
        <h3 class="mt-2 text-lg font-medium">
          Succession Threshold
        </h3>
        <p class="text-sm text-gray-500">{$contractStore.threshold}</p>
      </div>
      <span class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
    </span>
    </div>

    <div class="rounded-tl-lg rounded-tr-lg sm:rounded-tr-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
      <div class="mt-8">
        <h3 class="text-lg font-medium">
          Name
        </h3>
        <p class="text-sm text-gray-500">{$contractStore.walletName}</p>
        <h3 class="mt-2 text-lg font-medium">
          Owner
        </h3>
        <p class="text-sm text-gray-500">{$contractStore.owner}</p>
        <h3 class="mt-2 text-lg font-medium">
          Successor
        </h3>
        <p class="text-sm text-gray-500">{$contractStore.walletSuccessor}</p>
        <h3 class="mt-2 text-lg font-medium">
          Succession Threshold
        </h3>
        <p class="text-sm text-gray-500">{$contractStore.threshold}</p>
      </div>
      <span class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
    </span>
    </div>

    <div class="rounded-tl-lg rounded-tr-lg sm:rounded-tr-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
      <div class="mt-8">
        <h3 class="text-lg font-medium">
          Name
        </h3>
        <p class="text-sm text-gray-500">{$contractStore.walletName}</p>
        <h3 class="mt-2 text-lg font-medium">
          Owner
        </h3>
        <p class="text-sm text-gray-500">{$contractStore.owner}</p>
        <h3 class="mt-2 text-lg font-medium">
          Successor
        </h3>
        <p class="text-sm text-gray-500">{$contractStore.walletSuccessor}</p>
        <h3 class="mt-2 text-lg font-medium">
          Succession Threshold
        </h3>
        <p class="text-sm text-gray-500">{$contractStore.threshold}</p>
      </div>
      <span class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
    </span>
    </div>

    <div class="rounded-tl-lg rounded-tr-lg sm:rounded-tr-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
      <div class="mt-8">
        <h3 class="text-lg font-medium">
          Name
        </h3>
        <p class="text-sm text-gray-500">{$contractStore.walletName}</p>
        <h3 class="mt-2 text-lg font-medium">
          Owner
        </h3>
        <p class="text-sm text-gray-500">{$contractStore.owner}</p>
        <h3 class="mt-2 text-lg font-medium">
          Successor
        </h3>
        <p class="text-sm text-gray-500">{$contractStore.walletSuccessor}</p>
        <h3 class="mt-2 text-lg font-medium">
          Succession Threshold
        </h3>
        <p class="text-sm text-gray-500">{$contractStore.threshold}</p>
      </div>
      <span class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
    </span>
    </div>
  </div>
 </div>
{:else}
<div class="mx-auto max-w-5xl py-16 px-4 sm:px-6 lg:px-8">
  <div class="overflow-hidden rounded-lg bg-indigo-700 border lg:grid lg:grid-cols lg:gap-4">
    <div class="bg-indigo-50">
      <div class="mx-auto max-w-7xl py-12 px-8 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-24 lg:px-8">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          <span class="block">Welcome to Orchid Wallet</span>
          <span class="block text-indigo-600">Create a new Smart Wallet or Load an existing one.</span>
        </h2>
        <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div class="inline-flex rounded-md shadow">
            <a href="/create" class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700">Create New Wallet</a>
          </div>
          <div class="ml-3 inline-flex">
            <a href="/load" class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Load Existing Wallet</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/if}
