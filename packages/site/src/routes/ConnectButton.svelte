<script lang="ts">

  import { web3Store } from '$lib/stores/web3';
  import {EthersStoreError, EthersStoreErrorType} from "../lib/stores/web3.js";
  import {utilStore} from "$lib/stores/util.js";
  import {ToastType} from "$lib/types.js";

  let loading = false;

</script>

<UiButton {loading} title={"Connect"} on:click={async () => {
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
        }}/>
