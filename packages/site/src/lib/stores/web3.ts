import { get, writable } from 'svelte/store';
import { ethers, Signer } from 'ethers';
import { utils } from 'ethers';
import { authStore } from './auth';
import type { Web3Provider } from '@ethersproject/providers';

export enum EthersStoreErrorType {
  ProviderNotAvailable,
}

export class EthersStoreError extends Error {
  type: EthersStoreErrorType;

  constructor(type: EthersStoreErrorType) {
    super('[svelte-ethers-store] Please authorize browser extension (Metamask or similar)');
    this.type = type;
  }
}

export interface EthersStore {
  connected?: boolean | null;
  authenticated?: boolean | null;
  chainId?: string | number | null;
  balance?: number | null;
  provider?: Web3Provider | null;
  providerType?: string | null;
  eipProvider?: any | null;
  signer?: Signer | null;
  signerAddress?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export const BaseWeb3Store = {
  connected: false,
  authenticated: false,
  chainId: null,
  balance: null,
  provider: null,
  providerType: null,
  eipProvider: null,
  signer: null,
  signerAddress: null,
} as EthersStore;

const store = writable(BaseWeb3Store);
const { subscribe, set, update } = store;

const init = () => {
  const { eipProvider } = get(store);
  if (eipProvider && eipProvider.removeListener) {
    eipProvider.removeListener('accountsChanged', accountsChangedHandler);
    eipProvider.removeListener('chainChanged', chainChangedHandler);
    eipProvider.removeListener('disconnect', disconnectHandler);
  }
  set({
    connected: false,
  });
};

const accountsChangedHandler = (accounts: [string]) => {
  if (accounts.length) {
    updateWallet();
  } else {
    web3Store.disconnect();
  }
};
const chainChangedHandler = (chainId: number | string) => updateWallet();
const disconnectHandler = (error: any) => updateWallet();

const set1193Provider = async (eipProvider: any) => {
  init();
  try {
    await eipProvider.request({
      method: 'eth_requestAccounts',
    });
  } catch (e: any) {
    if (e.code === -32002) {
      console.log('Already connecting to metamask');
    } else {
      console.warn('[svelte-ethers-store] non compliant 1193 provider');
    }
    return false;
  }
  update((self) => {
    self.provider = new ethers.providers.Web3Provider(eipProvider, 'any');
    self.eipProvider = eipProvider;
    self.providerType = 'EIP1193';
    if (eipProvider.on) {
      eipProvider.on('accountsChanged', accountsChangedHandler);
      eipProvider.on('chainChanged', chainChangedHandler);
      eipProvider.on('disconnect', disconnectHandler);
    }
    return self;
  });
  return await updateWallet();
};

const updateWallet = async () => {
  const { provider } = get(store);
  if (!provider) {
    init();
    return;
  }
  try {
    const chainId = (await provider.getNetwork()).chainId;
    const signer = provider.getSigner();
    const [signerAddress, weiBalance] = await Promise.all([signer.getAddress(), signer.getBalance()]);
    const balance = Number(utils.formatUnits(weiBalance, 18));
    update((self) => {
      self.connected = true;
      self.chainId = chainId;
      self.signer = signer;
      self.signerAddress = signerAddress;
      self.balance = balance;
      return self;
    });
    await authStore.authenticate();
    return true;
  } catch (e) {
    const error = JSON.parse(JSON.stringify(e));
    if (error.code === 'ACTION_REJECTED') return { error };
    console.warn('[svelte-ethers-store] ' + e);
    return false;
  }
};

export const web3Store = {
  subscribe,
  set,
  update,

  setProvider: async (provider: any = null) => {
    if (!provider) {
      if (!window.ethereum) throw new EthersStoreError(EthersStoreErrorType.ProviderNotAvailable);
      window.ethereum.autoRefreshOnNetworkChange = false;
      return await set1193Provider(window.ethereum);
    }
    return true;
  },

  disconnect: () => {
    init();
  },
};
