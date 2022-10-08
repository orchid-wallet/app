import { get, writable } from 'svelte/store';
import { ethers, Signer } from 'ethers';
import { BaseWeb3Store, web3Store } from './web3';

export interface Contract {
  walletName?: string;
  walletAddress?: string;
  walletSuccessor?: string;
  transaction?: string;
}

export const BaseContractStore = {
  walletName: undefined,
  walletAddress: undefined,
  walletSuccessor: undefined,
  transaction: undefined,
} as Contract;

const store = writable(BaseContractStore);
const { subscribe, set, update } = store;

export const contractStore = {
  subscribe,
  set,
  update,
  updateData: (newContract: Contract, name: string) => {
    update((self) => ({
      ...self,
      ...newContract,
      walletName: name,
    }));
  }
}
