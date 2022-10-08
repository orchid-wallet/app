<script lang="ts">

</script>

<div class="mx-auto py-8 max-w-7xl sm:px-6 lg:px-8">
<div class="lg:grid lg:grid-cols-12 lg:gap-x-5">
  <aside class="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
    <nav class="space-y-1">
      <a href="#" class="bg-gray-50 text-indigo-700 hover:text-indigo-700 hover:bg-white group rounded-md px-3 py-2 flex items-center text-sm font-medium" aria-current="page">
        <svg class="text-indigo-500 group-hover:text-indigo-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span class="truncate">Create New Wallet</span>
      </a>
    </nav>
  </aside>

  <div class="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">

    <form action="#" method="POST">
      <div class="shadow sm:overflow-hidden sm:rounded-md">
        <div class="space-y-6 bg-white py-6 px-4 sm:p-6">
          <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900">Create New Wallet</h3>
            <p class="mt-1 text-sm text-gray-500">Create a new Smart Wallet that is controlled by you. This operation requires a network fee.</p>
          </div>

          <div class="grid grid-cols-6 gap-6">

            <div class="col-span-6 sm:col-span-4">
              <label for="wallet-name" class="block text-sm font-medium text-gray-700">Wallet Name</label>
              <input type="text" name="wallet-name" id="wallet-name" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
            </div>

            <div class="col-span-6 sm:col-span-4">
              <label for="successor" class="block text-sm font-medium text-gray-700">Successor Address</label>
              <input type="text" name="successor" id="successor" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              <p class="mt-1 text-sm text-gray-500">The successor is designated to receive ownership of the wallet in case of death.</p>
            </div>

          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          on:click={async () => {
            console.log('deploy contract')
          }}>Deploy Contract</button>
        </div>
      </div>
    </form>
  </div>
</div>
</div>
