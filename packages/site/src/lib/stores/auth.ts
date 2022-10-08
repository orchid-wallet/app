import { get, writable } from 'svelte/store';
import { ethers, Signer } from 'ethers';
import { BaseWeb3Store, web3Store } from './web3';
import type { Web3Provider } from '@ethersproject/providers';
import {browser} from "$app/environment";

export interface Auth {
  authenticated?: boolean;
  walletAddress?: string;
}

export const BaseAuthStore = {
  authenticated: false,
  walletAddress: undefined,
} as Auth;

function validMessage(message: string) {
  const split = message.split('\n').filter((l) => l !== '');
  const first = 'GM, please sign this message to connect to Orchid.';
  const isValid = split[0] === first && split[1].startsWith('Wallet address: ') && split[2].startsWith('Date: ');
  const date = new Date(split[2].substring('Date: '.length));
  if (new Date().getTime() - date.getTime() > 1000 * 60 * 60 * 24 * 7) {
    return false;
  }
  if (!isValid || new Date().getTime() - date.getTime() > 1000 * 60 * 60 * 24 * 7) {
    return false;
  }
  return true;
}

// let stored
// if (browser) {
//   stored = localStorage.auth
// }

// const store = writable(stored || BaseAuthStore);
const store = writable(BaseAuthStore);
const { subscribe, set, update } = store;

// store.subscribe((value) => localStorage.auth = value)

export const authStore = {
  subscribe,
  set,
  update,
  authenticated: false,
  walletAddress: undefined,
  authenticate: async () => {
    const { signer } = get(web3Store);
    if (!signer) return;
    let message = `GM, please sign this message to connect to Orchid.`;
    message += `\n\nWallet address: ${get(web3Store).signerAddress}`;
    message += `\nDate: ${new Date().toISOString()}`;
    const signature = await signer.signMessage(message);
    try {
      const resolved = loadAddressFromMessage(message, signature)
      if (resolved) {
        update((self) => ({
          ...self,
          authenticated: true,
          walletAddress: resolved
        }));
      }
    } catch (err) {
      console.log(err);
    }
  },
  reset: () => {
    authStore.set(BaseAuthStore);
  }
}

function loadAddressFromMessage(message: string, signature: string): string | null {
  const { hashMessage, arrayify, recoverAddress } = ethers.utils;
  if (validMessage(message)) {
    const msgHash = hashMessage(message);
    const msgHashBytes = arrayify(msgHash);
    try {
      const public_address = recoverAddress(msgHashBytes, signature);
      return public_address;
    } catch (e) {
      return null;
    }
  }
  return null;
}
