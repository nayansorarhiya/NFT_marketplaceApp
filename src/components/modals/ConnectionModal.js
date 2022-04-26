import { Box, Divider, IconButton, List, ListItem, Modal, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import metamask from '../../assets/images/metamask.svg';
import walletconnectlogo from '../../assets/images/walletconnectlogo.svg';
import coinbasewallet from '../../assets/images/coinbasewallet.svg';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core'

// const CoinbaseWallet = new WalletLinkConnector({
//     url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
//     appName: "Web3-react Demo",
//     supportedChainIds: [1, 3, 4, 5, 42, 97],
// });

const walletConnect = new WalletConnectConnector({
    rpcUrl: `https://data-seed-prebsc-1-s1.binance.org:8545`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
});

const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 97]
});

export default function ConnectionModal(props) {
    const { activate, deactivate } = useWeb3React();
    const theme = useTheme();
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
                        <ListItem button sx={{ py: 3 }} onClick={() => { activate(Injected); }}>
                            <img src={metamask} alt='metamask' />
                            <Typography sx={WalletConnect}>Metamask

                            </Typography>
                            <IconButton size="small">
                                <KeyboardArrowRightIcon />
                            </IconButton>
                        </ListItem>
                        <Divider />
                        <ListItem button divider sx={{ py: 3 }} onClick={() => { activate(walletConnect, err => console.log(err)); }}>
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
