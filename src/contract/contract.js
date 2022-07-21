import { ethers } from 'ethers';

export const getDiamondContract = (contractAddress, abi, signer) => {
    return new ethers.Contract(contractAddress, abi, signer);
}

export default {
    // diamondSwap: "0xA4f6B2Ae5cCCc55255Ed9b2044d3054dFac920C8", //call mainnet
    // diamondSwap: "0x344a77e3cAa9F0887041B9ca60B5361Ba3A74342", // delegatecall mainnet

    //testing
    diamondSwap: "0x8520fe724B33A03D7425726B07489fA02C9B55C3", // call mainnet
    gemSwap: "0x83C8F28c26bF6aaca652Df1DbBE0e1b56F8baBa2",

};
