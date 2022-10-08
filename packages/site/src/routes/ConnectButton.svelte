<script lang="ts">

  import { web3Store } from '$lib/stores/web3';
  import {EthersStoreError, EthersStoreErrorType} from "../lib/stores/web3.js";
  import {utilStore} from "$lib/stores/util.js";
  import {ToastType} from "$lib/types.js";


  let loading = false;

</script>

<div class="relative">
  <button class="ml-6 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          on:click={async () => {
                  loading = true;
                  console.log('connect button');
                  try {
                     const setProvider = await web3Store.setProvider();
                     if (!setProvider || setProvider.error) return loading = false;
                  } catch (error) {
                      if (error instanceof EthersStoreError) {
                          loading = false;
                          if (error.type == EthersStoreErrorType.ProviderNotAvailable) {
                              utilStore.showToast('MetaMask is not accessible', ToastType.Error);
                          } else {
                              utilStore.showToast('Unknown Error, could be your wallet connection?', ToastType.Error);
                          }
                      }
                  }
                  loading = false;
        }}><div class:opacity-0={loading}>Connect</div><div class:opacity-0={!loading} class="absolute bottom-1/4 left-1/2 loader"></div></button>
</div>

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
