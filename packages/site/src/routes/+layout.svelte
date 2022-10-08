<script lang="ts">
  import '../app.css';
  import Navbar from './Navbar.svelte';
  import {authStore} from "$lib/stores/auth";
  import ConnectPrompt from "./ConnectPrompt.svelte";

  $: authenticated = $authStore.authenticated

</script>
<div class="w-full h-full">
  <Navbar />
  {#if authenticated}
    <slot />
  {:else}
    <ConnectPrompt />
  {/if}
</div>
