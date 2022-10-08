<script lang="ts">
  import type { DropdownOption } from '$lib/types';
  import { createEventDispatcher } from 'svelte';
  import { quintOut } from 'svelte/easing';

  const dispatch = createEventDispatcher();

  let isOpen = false;
  let selectedOption: DropdownOption | null;

  export let value: any;
  export let options: Array<DropdownOption> = [
    {
      text: 'No Option Available',
      value: 0,
    },
  ];
  let input: HTMLInputElement;
  $: selectedOption = options.find((o) => o.value === value) || null;


  const openDropdown = () => {
    isOpen = !isOpen;
  };

  const selectOption = (option: DropdownOption) => {
    isOpen = false;
    value = option.value;
    input.setCustomValidity('');
    dispatch('input', option.value);
  };

  function slideFade(node, params) {
    const existingTransform = getComputedStyle(node).transform.replace('none', '');

    return {
      delay: params.delay || 0,
      duration: params.duration || 300,
      easing: params.easing || quintOut,
      css: (t, u) => `transform-origin: top right; transform: ${existingTransform} scaleY(${t}) scaleX(${(t/2) + 0.5}); opacity: ${t};`
    };
  }

  $: inputValue = !selectedOption || selectedOption.value === 'None' ? '' : selectedOption?.value;

</script>

<div class="relative inline-block text-left px-4">
  <div>
    <button type="button" class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true"
    on:click={() => {openDropdown()}}>
      {selectedOption?.text}
      <!-- Heroicon name: mini/chevron-down -->
      <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>

  <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  -->
  {#if isOpen}
  <div transition:slideFade class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
    <div class="py-1" role="none">
      <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
      {#each options as option, i}
        {#if option.value === value}
          <a href="#" class="hover:bg-gray-200 bg-gray-100 text-gray-900 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" on:click={() => {
            isOpen = false;
          }}>{option.text}</a>
        {:else}
          <a href="#" class="hover:bg-gray-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" on:click={() => {
            selectOption(option)
            isOpen = false;
          }}>{option.text}</a>
        {/if}
      {/each}
    </div>
  </div>
  {/if}
</div>
