import { get, writable } from 'svelte/store';
import { ethers, Signer } from 'ethers';
import { BaseWeb3Store, web3Store } from './web3';
import {browser} from "$app/environment";
import Storage from "./Storage";
import z from 'zod';
import {BaseAuthStore} from "./auth";

export class ContractsStorage extends Storage<Contract> {
  private readonly key = 'ContractsStorageIntegration';
  private readonly validator = z.object({
    walletName: z.string().optional(),
    owner: z.string().optional(),
    walletAddress: z.string().optional(),
    walletSuccessor: z.string().optional(),
    threshold: z.number().optional(),
    transaction: z.string().optional(),
  })

  constructor() {
    super();
  }

  public getContract(): Contract | null {
    return this.get(this.validator, this.key);
  }

  public setContract(item: Contract) {
    this.set(this.validator, item, this.key);
  }

  public clear() {
    this.clearItem(this.key);
  }

}

export interface Contract {
  owner?: string;
  walletName?: string;
  walletAddress?: string;
  walletSuccessor?: string;
  threshold?: number;
  transaction?: string;
}

export const BaseContractStore = {
  owner: undefined,
  walletName: undefined,
  walletAddress: undefined,
  walletSuccessor: undefined,
  threshold: undefined,
  transaction: undefined,
} as Contract;

const store = writable(BaseContractStore);
const { subscribe, set, update } = store;

if (browser) {
  console.log('Loading ContractsStore from LocalStorage')
  const storage = new ContractsStorage()
  const stored = storage.getContract()
  if (stored) {
    store.update((self) => ({
      ...self,
      ...stored,
    }));
  }
  store.subscribe((value) => {
    storage.setContract(value);
  })
}

export const contractStore = {
  subscribe,
  set,
  update,
  updateData: (newContract: Contract, name: string) => {
    update((self) => ({
      ...self,
      ...newContract,
    }));
  },
  reset: () => {
    contractStore.set(BaseContractStore);
  }
}
