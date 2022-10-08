import type { LoadEvent } from '@sveltejs/kit';
import { authStore } from "$lib/stores/auth";
import { goto } from "$app/navigation";
import {browser} from "$app/environment";

export async function load(event: LoadEvent) {
  if (browser) {
    if (!authStore.authenticated) {
      goto('/')
    }
  }
  return {}
}
