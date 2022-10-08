import { writable } from 'svelte/store';
import type { ToastType } from '$lib/types';

export interface Util {
  copyText: string | null;
  isToastShowing: boolean;
  toastText: string | null;
  toastColor: string | null;
  toastIcon: string | null;
}

export const BaseUtilStore = {
  copyText: null,
  isToastShowing: false,
  toastText: null,
  toastColor: null,
  toastIcon: null,
} as Util;

const store = writable(BaseUtilStore);
const { subscribe, set, update } = store;

export const utilStore = {
  subscribe,
  set,
  update,
  copyToClipboard: (text: string) => {
    update((self) => ({
      ...self,
      copyText: text,
    }));
  },
  showToast: (text: string | null, type: ToastType | null, hideToast = true) => {
    update((self) => {
      if (!!text && !!type && hideToast) setTimeout(() => utilStore.showToast(null, null), 5000);
      self = {
        ...self,
        isToastShowing: !!text && !!type,
        toastText: text,
        toastColor: type,
        toastIcon: `${type}Toast`,
      };
      return self;
    });
  },
};
