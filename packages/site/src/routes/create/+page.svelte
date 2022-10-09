<script lang="ts">

  import abi from "$lib/assets/contract/abi.json";
  import bytecode from "$lib/assets/contract/bytecode";
  import {ContractFactory, Contract, ethers} from "ethers";
  import {web3Store} from "$lib/stores/web3";
  import {contractStore} from "$lib/stores/contracts";
  import {JsonRpcProvider, Web3Provider} from "@ethersproject/providers";
  import * as PushAPI from "@pushprotocol/restapi";
  import {authStore} from "$lib/stores/auth";
  import {ToastType} from "$lib/types";
  import {utilStore} from "$lib/stores/util";
  import {goto} from "$app/navigation";

  async function handleSubmit(event) {
    loading = true;
    const data = new FormData(this);
    const walletName = data.get('wallet-name');
    let successor = data.get('successor') as string;
    const threshold = data.get('threshold') as number;

    if (!threshold || !walletName || !successor) {
      utilStore.showToast("Please enter all fields", ToastType.Error);
      return
    }

    const rpcProvider = new JsonRpcProvider('https://eth-mainnet.gateway.pokt.network/v1/lb/5ed414f3a4ccc6fa16ee44e9')
    try {
      if (!successor.startsWith('0x')) {
        avatarUri = await rpcProvider.getAvatar(successor);
        successor = await rpcProvider.resolveName(successor);
      }
      console.log(successor);
      const provider = new Web3Provider(window.ethereum);
      console.log($authStore.walletAddress);
      const signer = await provider.getSigner();
      console.log("Got Signer");
      const factory = new ContractFactory(abi, bytecode, signer);
      console.log("Contract Factory Created");
      const contract = await factory.deploy(successor, threshold);
      console.log("Contract Deployed");
      isWaitingForConfirmation = true
      const transaction = await contract.deployTransaction.wait();
      console.log("1 Confirmation received")
      const contractAddress = contract.address;

      console.log("contract: " + contractAddress);

      console.log('CONTRACT')
      console.log(contract);
      contractStore.updateData({
        owner: $authStore.walletAddress,
        walletAddress: contractAddress,
        walletName: walletName,
        walletSuccessor: successor,
        threshold: threshold,
        transaction: transaction.contractAddress,
      } as Contract, walletName as string);

      isWaitingForInitialisation = true;
      await setZKPRequest(contract)
      isWaitingForInitialisation = false;
      isWaitingForConfirmation = false;
      loading = false;
      await goto('/');
    } catch (error) {
      utilStore.showToast("An Error occurred, have you filled out all fields?", ToastType.Error)
      console.log(error);
      loading = false;
      isWaitingForConfirmation = false
      isWaitingForInitialisation = false
    }
  }

  async function handleNotification() {
    notificationsLoading = true;
    const provider = new Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress()
    console.log(address);
    await PushAPI.channels.subscribe({
      signer: signer,
      channelAddress: 'eip155:80001:0x3863e428E7Cb0C28623fEcE9Ff0e16b74e96E13d', // channel address in CAIP
      userAddress: `eip155:80001:${address}`, // user address in CAIP
      onSuccess: () => {
        notificationsLoading = false;
        authStore.enabledNotifications();
        utilStore.showToast("Successfully Enabled Notifications", ToastType.Success)
      },
      onError: () => {
        notificationsLoading = false;
        utilStore.showToast("Error Enabling Notifications", ToastType.Error)
      },
      env: 'staging'
    })
  }

  async function setZKPRequest(contract: any) {
    const circuitId = "credentialAtomicQuerySig";
    const validatorAddress = "0xb1e86C4c687B85520eF4fd2a0d14e81970a15aFB";

    const ageQuery = {
      schema: ethers.BigNumber.from("278334752384909982388055862178842950570"),
      slotIndex: 2,
      operator: 1,
      value: [1, ...new Array(63).fill(0).map(i => 0)],
      circuitId,
    };

    try {
      await contract.setZKPRequest(
        1,
        validatorAddress,
        ageQuery,
      )
      console.log("Request set");
    } catch (e) {
      console.log("error: ", e);
    }

  }

  let loading = false;
  let isWaitingForConfirmation = false;
  let isWaitingForInitialisation = false
  let notificationsLoading = false;
  let avatarUri = "";

</script>

<div class="mx-auto py-8 max-w-7xl sm:px-6 lg:px-8">
<div class="lg:grid lg:grid-cols-12 lg:gap-x-5">
  <aside class="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
    <nav class="space-y-1">
      <a href="#" class="bg-gray-50 text-indigo-700 hover:text-indigo-700 hover:bg-white group rounded-md px-3 py-2 flex items-center text-sm font-medium" aria-current="page">
        <svg class="text-indigo-500 group-hover:text-indigo-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span class="truncate">Create New Wallet</span>
      </a>
    </nav>
  </aside>

  <div class="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">

    <form method="POST" on:submit|preventDefault={handleSubmit}>
      <div class="shadow sm:overflow-hidden sm:rounded-md">
        <div class="space-y-6 bg-white py-6 px-4 sm:p-6">
          <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900">Create New Wallet</h3>
            <p class="mt-1 text-sm text-gray-500">Create a new Smart Wallet that is controlled by you. This operation requires a network fee.</p>
          </div>

          <div class="grid grid-cols-6 gap-6">

            <div class="col-span-6 sm:col-span-4">
              <label for="wallet-name" class="block text-sm font-medium text-gray-700">Wallet Name</label>
              <input type="text" name="wallet-name" id="wallet-name" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
            </div>

            <div class="col-span-6 sm:col-span-4">
              <label for="successor" class="block text-sm font-medium text-gray-700">Successor Address or ENS Domain</label>
              <div class="flex justify-start space-x-3 items-center">
                <input type="text" name="successor" id="successor" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                {#if avatarUri}
                <img class="inline-block h-9 w-9 rounded-md mt-1" src={avatarUri} alt="">
                {/if}
              </div>
              <p class="mt-1 text-sm text-gray-500">The successor is designated to receive ownership of the wallet in case of death.</p>
            </div>

            <div class="col-span-6 sm:col-span-4">
              <label for="threshold" class="block text-sm font-medium text-gray-700">Vote Threshold</label>
              <input type="text" name="threshold" id="threshold" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              <p class="mt-1 text-sm text-gray-500">This is the number of people needed to execute an ownership change.</p>
            </div>

          </div>
        </div>
        <div class="flex bg-gray-50 px-4 py-3 sm:px-6 justify-between items-center space-x-4">
          {#if !$authStore.registeredNotification}
            <UiButton secondary loading={notificationsLoading} title="Enable Notifications" on:click={async () => {
              await handleNotification()
            }} />
          {:else}
            <span class="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-gray-800">✅ Notifications Enabled</span>
          {/if}
          <UiButton type="submit" {loading} customLoadingTitle={isWaitingForInitialisation ? "Setting Polygon ID Credentials" : isWaitingForConfirmation ? "Waiting For Confirmations" : ""} title="Deploy Contract" />
        </div>
      </div>
    </form>
  </div>
</div>
</div>
