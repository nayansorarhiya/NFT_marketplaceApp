import { Box, Divider, IconButton, List, ListItem, Modal, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import metamask from '../../assets/images/metamask.svg';
import walletconnectlogo from '../../assets/images/walletconnectlogo.svg';
import coinbasewallet from '../../assets/images/coinbasewallet.svg';
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core'

// const CoinbaseWallet = new WalletLinkConnector({
//     url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
//     appName: "Web3-react Demo",
//     supportedChainIds: [1, 3, 4, 5, 42, 97],
// });

// const reqChainId = "0x7A69"
// const myrpcUrl = ['http://localhost:8545'];

// const reqChainId = "0x7A69";
// const reqChainId = "0x145B7F";
// const myrpcUrl = ['http://localhost:6545'];
// const myrpcUrl = ['http://64.52.80.186:8545'];
// const myrpcUrl = ['https://dot3.tech/'];

const reqChainId = "0x1";
const myrpcUrl = ['https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'];

// const myrpcUrl = ['https://speedy-nodes-nyc.moralis.io/f4821cc9723d2edb79055d15/bsc/testnet'];
// const reqChainId = "0x61";

const walletConnectOption = new WalletConnectConnector({
    // rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
    rpcUrl: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
});

const Injected = new InjectedConnector({
    supportedChainIds: [1, 97, 1337,1334143, 31337]
    // supportedChainIds: [1, 3, 4, 5, 42, 97, 1334142]
});

export default function ConnectionModal(props) {
    const { activate, chainId } = useWeb3React();
    const theme = useTheme();
    const walletConnect = async () => {

        if (window.ethereum) {

            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            if (chainId != reqChainId) {
                await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: reqChainId }] });
            }
            activate(Injected);
        }
        else {
            alert("Metamask is not Installed");
        }


    }
    async function chainSwitch() {
        try {
            // debugger;
            const result = await window.ethereum.request('wallet_switchEthereumChain', [{ chainId: reqChainId }])
            // activate(Injected)
        } catch (switchError) {
            // 4902 indicates that the client does not recognize the Harmony One network
            if (switchError.code === 4902) {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: reqChainId,
                        rpcUrls: myrpcUrl,
                        chainName: 'Ethereum Fork',
                        // chainName: 'Binance Smart Chain Testnet',
                        nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
                        blockExplorerUrls: ['https://explorer.harmony.one'],
                    }],
                })
            }
        }
    }
    React.useEffect(() => {
        chainSwitch();
    }, [chainId])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 470,
        bgcolor: alpha(theme.palette.primary.homeBg, 1),
        // border: '1px solid alpha(theme.palette.primary.font, 1)',
        borderRadius: '10px',
        boxShadow: 24,
        color: alpha(theme.palette.primary.font, 1),
        p: 4,
    };

    const heading = {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '25px',
        fontStyle: 'normal',
        fontSize: '30px',
        lineHeight: '39px',
        fontWeight: '700',
    }

    const WalletConnect = {
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '20px',
        lineHeight: '110%',
        ml: 3,
    }

    return (
        <>
            <Modal
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ float: 'right' }}>
                        <IconButton aria-label="close" size="medium" onClick={props.onClose}>
                            <CloseIcon fontSize="large" />
                        </IconButton>
                    </Box>
                    <Typography id="modal-modal-title" variant="h4" component="h1" sx={heading}>
                        Choose Your Wallet
                    </Typography>
                    <Typography id="modal-modal-description" sx={{
                        mt: 2,
                        fontStyle: 'normal',
                        fontWeight: '500',
                        fontSize: '16px',
                        lineHeight: '21px',
                        textAlign: 'center'
                    }}>
                        Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit.
                    </Typography>
                    <List sx={{ pt: 6 }}>
                        <Divider />
                        <ListItem button sx={{ py: 3 }} onClick={() => { walletConnect() }}>
                            <img src={metamask} alt='metamask' />
                            <Typography sx={WalletConnect}>
                                Metamask
                            </Typography>
                            <IconButton size="small">
                                {/* <KeyboardArrowRightIcon /> */}
                            </IconButton>
                        </ListItem>
                        <Divider />
                        <ListItem button divider sx={{ py: 3 }} onClick={() => { activate(walletConnectOption, err => console.log(err)); }}>
                            <img src={walletconnectlogo} alt='wallect connect' width={32} height={30} />
                            <Typography sx={WalletConnect}>WalletConnect</Typography>
                        </ListItem>
                        <Divider light />
                        <ListItem button sx={{ py: 3 }}>
                            <img src={coinbasewallet} alt='coinbase wallet' width={32} height={30} />
                            <Typography sx={WalletConnect}>Coinbase Wallet</Typography>
                        </ListItem>
                        <Divider light />
                    </List>
                </Box>
            </Modal>
        </>
    );
}
