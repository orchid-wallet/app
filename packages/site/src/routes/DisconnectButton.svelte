<script lang="ts">

  import { web3Store } from '$lib/stores/web3';
  import { authStore } from "$lib/stores/auth.js";
  import { contractStore } from "$lib/stores/contracts.js";
  import { goto } from '$app/navigation';

</script>

  <button class="ml-6 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          on:click={async () => {
            web3Store.disconnect()
            authStore.reset()
            contractStore.reset()
            await goto('/')
        }}>Disconnect</button>
