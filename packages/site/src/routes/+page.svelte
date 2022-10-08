<script>
  import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  } from "@rgossiaux/svelte-headlessui";

  const people = [
    { id: 1, name: "Durward Reynolds", unavailable: false },
    { id: 2, name: "Kenton Towne", unavailable: false },
    { id: 3, name: "Therese Wunsch", unavailable: false },
    { id: 4, name: "Benedict Kessler", unavailable: true },
    { id: 5, name: "Katelyn Rohan", unavailable: false },
  ];

  let selectedPerson = people[0];
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit what <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<h1 class="text-3xl font-bold underline">
  Hello world!
</h1>

<div>
  <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
  <select id="location" name="location" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
    <option>United States</option>
    <option selected>Canada</option>
    <option>Mexico</option>
  </select>
</div>
