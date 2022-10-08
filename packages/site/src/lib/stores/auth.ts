import { get, writable } from 'svelte/store';
import { ethers, Signer } from 'ethers';
import { BaseWeb3Store, web3Store } from './web3';
import type { Web3Provider } from '@ethersproject/providers';
import {browser} from "$app/environment";
import { z, ZodObject } from 'zod';
import Storage from './Storage';

export interface Auth {
  authenticated?: boolean;
  walletAddress?: string;
}

export const BaseAuthStore = {
  authenticated: false,
  walletAddress: undefined,
} as Auth;

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

export class AuthStorage extends Storage<Auth> {
  private readonly key = 'AuthStorageIntegration';
  private readonly validator = z.object({
    authenticated: z.boolean().optional(),
    walletAddress: z.string().optional(),
  })
  constructor() {
    super();
  }
  public getAuth(): Auth | null {
    return this.get(this.validator, this.key);
  }

  public setAuth(item: Auth) {
    this.set(this.validator, item, this.key);
  }

  public clear() {
    this.clearItem(this.key);
  }

}

const store = writable(BaseAuthStore);
const { subscribe, set, update } = store;

if (browser) {
  const authStorage = new AuthStorage()
  const stored = authStorage.getAuth()
  if (stored) {
    store.update((self) => ({
      ...self,
      ...stored,
    }));
  }
  store.subscribe((value) => {
    authStorage.setAuth(value);
  })
}

export const authStore = {
  subscribe,
  set,
  update,
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

