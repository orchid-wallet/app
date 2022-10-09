<script lang="ts">
  import '../app.css';
  import Navbar from './Navbar.svelte';
  import {authStore} from "$lib/stores/auth";
  import ConnectPrompt from "./ConnectPrompt.svelte";

  $: authenticated = $authStore.authenticated

  import {browser} from "$app/environment";
  import {goto} from "$app/navigation";

  $: if (browser) {
    if (authenticated) {
      goto('/')
    }
  }

</script>
<div class="w-full h-full">
  <Navbar />
  {#if authenticated}
    <slot />
  {:else}
    <ConnectPrompt />
  {/if}
  <UiToast />
</div>
