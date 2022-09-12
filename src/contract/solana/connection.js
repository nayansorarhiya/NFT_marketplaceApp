import { clusterApiUrl, Connection } from '@solana/web3.js';

export const connectionString = 'mainnet-beta';
export const COMMITMENT = "singleGossip";

export const connection = new Connection(
    clusterApiUrl(connectionString),
    'confirmed'
)