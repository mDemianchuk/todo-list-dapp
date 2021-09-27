import * as contractJson from '../../build/contracts/TodoList.json'

function getContractAbi() {
    return contractJson.abi;
}

function getContractAddress() {
    const contractNetworks = contractJson.networks;
    const contractNetworkNames = Object.keys(contractNetworks);
    const contractNetwork = contractNetworks[contractNetworkNames[0]];
    return contractNetwork.address;
}

export const CONTRACT_ABI = getContractAbi();
export const CONTRACT_ADDRESS = getContractAddress();