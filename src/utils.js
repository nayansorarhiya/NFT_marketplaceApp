
import eth from './assets/images/eth.svg'
import sol from './assets/images/solana.svg'
// export const baseUrl="http://localhost:3004";
export const baseUrl="https://dh-backend.vercel.app"

export const getCurrencyLogo = (network) => {
    
    return network === "solana"? sol: eth;
}