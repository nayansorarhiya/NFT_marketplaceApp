import { Box, Button, Divider, Drawer } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { alpha, useTheme, styled } from '@mui/material/styles';
import eth from '../../assets/images/eth.svg';
import CartItems from './CartItems';
import { useDispatch, useSelector } from "react-redux";
import { getIdx, setCartIdx } from "../../store/IndexSlice";
import { BigNumber, ethers } from 'ethers';
import CustomButton from '../CustomButton';
import { useWeb3React } from '@web3-react/core';
import contract, { getDiamondContract } from '../../contract/contract';
import diamondswapABI from "../../contract/ABI/diamondswapABI.json";

export default function CartDrawer({ usdprice, topdrawerwidth, cartvariant, cartopen, ConnectModal }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { active, account, library } = useWeb3React();
    const [balance, setBalance] = React.useState(BigNumber.from("0"));
    const [loading, setLoading] = React.useState(false);
    useEffect(() => {
        let getBalance = async () => {
            if (active) {
                setBalance(await library.getBalance(account));
            }
        }
        getBalance();
    }, [active, account])
    const [totalamount, setTotalAmount] = React.useState(BigNumber.from("0"));
    const CartData = (useSelector((state) => state.Index.cartdata))
    useEffect(() => {
        // if (CartData.length !== 0) {
        const total = CartData.reduce((acc, item) => {
            return acc.add(item.price);
        }, BigNumber.from("0"))
        setTotalAmount(total.toString())
        // }
    }, [CartData]);
    const popCartData = (popuid) => {
        const popCart = CartData.filter((value) => {
            return value.uid !== popuid;
        });
        dispatch(setCartIdx(popCart));
    }
    const clearAllCartData = () => {
        dispatch(setCartIdx([]))
    }
    const buyNow = async () => {
        setLoading(true);
        let transferList = []
        let buylist = CartData.map((item) => {
            if (item.tokenType == "ERC721") {
                transferList.push({ "tokenAddr": item.address, "tokenId": item.tokenId })
            }
            return {
                "address": item.address,
                // "amount": parseFloat(ethers.utils.formatEther(item.price)),
                "amount": 1,
                "standard": item.tokenType,
                "tokenId": item.tokenId,
            }

        })
        let apifilter = {
            "balanceToken": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            "buy": buylist,
            "sell": [],
            "sender": account,
        }
        try {
            const initRsp = await fetch(
                `https://dh-backend.vercel.app/api/initTransaction`,
                {
                    method: "POST",
                    body: JSON.stringify(apifilter),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }
            );
            const initRspData = (await initRsp.json());
            const txnvalue = initRspData.data.value.hex;
            const buylistCode = initRspData.data.transaction;
            const signer = await library.getSigner();
            // const contractaddr = initRspData.data.contractAddress;
            const contractaddr = contract.diamondSwap;
            const diamondContract = await getDiamondContract(contractaddr, diamondswapABI, signer)
            let token = apifilter.buy.filter(ele => ele.address.toLowerCase() != "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb".toLowerCase())
            let ERC721 = token.filter(ele => "ERC1155" != ele.standard);
            let ERC1155 = token.filter(ele => "ERC1155" == ele.standard);
            ERC1155 = ERC1155.map(ele => {
                return [
                    ele.address,
                    ele.tokenId,
                    ele.amount
                ]
            })
            ERC721 = ERC721.map(ele => {
                return [
                    ele.address,
                    ele.tokenId
                ]
            })
            console.log(ERC721, ERC1155);
            // const tx = await diamondContract.buyNFT(initRspData.data.contractAddress, buylistCode, ERC721, ERC1155, { value: txnvalue });

            let nTx = {
                from: account,
                to: contractaddr,
                value: txnvalue,
                data: buylistCode
            };
            let jsonData = JSON.stringify({
                input: nTx.data,
                to: nTx.to,
                value: nTx.value.toString(),
                from: nTx.from,
                network_id: "1",
                save: true,
                save_if_fails: true,
                simulation_type: "quick",
                generate_access_list: true,
            }); 
            let simulate = await fetch(
                `https://api.tenderly.co/api/v1/account/me/project/gem-aggregator/simulate`,
                {
                    method: "POST",
                    body: jsonData,
                    headers: {
                        "x-access-key": "sduNMNsKx5ihVpZodjWVnWsP8odX1ZiI",
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }
            );
            simulate = await simulate.json();
            let gasUsed = simulate.transaction.gas_used;

            console.log(`Before: ${gasUsed}`);
            gasUsed += Math.ceil(gasUsed*23/100);
            // // const limit = await library.getSigner().estimateGas(nTx)
            // console.log(limit.toString());
            console.log(gasUsed);
            nTx = {
                ...nTx,
                gasLimit: gasUsed
            }
            const tx = await library.getSigner().sendTransaction(nTx);

            await tx.wait();
            clearAllCartData();
            setLoading(false);
        } catch (err) {
            console.log(err)
            setLoading(false);
        }
    }
    const roundOff = (figure, decimals, unit) => {
        if (!decimals) decimals = 2;
        if (!unit) unit = '';
        var d = Math.pow(10, decimals);
        return `${(parseInt(figure * d) / d).toFixed(decimals)}${unit}`;
    }

    return (
        <>
            <Drawer
                sx={{
                    // width: drawerWidth,
                    width: { xs: '0', sm: '0', md: topdrawerwidth, lg: topdrawerwidth },
                    background: alpha(theme.palette.primary.main, 1),
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: topdrawerwidth,
                        boxSizing: 'border-box',
                        // mt: { xs: 8.1, sm: 8.1, md: '0px', lg: '0px' },
                        // pb: { xs: 8.1, sm: 8.1, md: '0px', lg: '0px' },
                        mt: 8.1,
                        background: alpha(theme.palette.primary.main, 1),
                        // position: { xs: 'fixed', sm: 'fixed', md: 'relative', lg: 'relative' },
                        // position: 'fixed',
                        maxHeight: '100%',
                        overflow: 'auto',
                        zIndex: 1,
                    },
                }}
                variant={cartvariant.view}
                anchor={cartvariant.direction}
                open={cartopen}
            >

                <Divider />
                <Box sx={{ padding: '30px 20px 20px 20px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Box sx={{ display: 'flex', gap: '10px' }}>
                            <Box sx={{ fontSize: '22px', lineHeight: '120%' }}>My Cart</Box>
                            {CartData.length !== 0 && <Box sx={{ border: '1px solid', width: '1.5rem', display: 'flex', justifyContent: 'center', borderRadius: '50%', backgroundColor: '#485FE6', borderColor: '#485FE6', color: '#ffffff' }}>
                                {CartData.length}
                            </Box>}
                        </Box>
                        {CartData.length !== 0 && <Box onClick={clearAllCartData} sx={{ fontSize: '16px', lineHeight: '21px', color: '#485FE6', mt: 0.5, cursor: 'pointer' }}>Clear</Box>}
                    </Box>
                    {CartData.length === 0 && <Box sx={{ display: 'flex', justifyContent: 'center', color: '#91939B', my: 3 }}>
                        Cart is empty.
                    </Box>}

                    <Box sx={{
                        width: '100%', maxHeight: '32vh', overflow: 'auto', mt: 2, pt: '5px'
                    }}>
                        {CartData.map((value) => {
                            return (<CartItems key={value.uid} cartItem={value} usdprice={usdprice} roundOff={roundOff} popCartData={popCartData}></CartItems>)
                        })}
                    </Box>


                    {CartData.length !== 0 && active && <><Divider sx={{ borderBottomWidth: 1.5, color: '#D9DADC' }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 3 }}>
                            <Box sx={{ fontSize: '22px', fontWeight: 600, lineHeight: '120%', textTransform: 'capitalize', color: '#91939B', display: 'flex', alignItems: 'center' }}>
                                You pay
                            </Box>
                            <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: '6px' }}>
                                    <Box sx={{ fontSize: '14px' }}>
                                        {roundOff(parseFloat(ethers.utils.formatEther(totalamount.toString())), 4)}
                                    </Box>
                                    <img src={eth} />
                                </Box>
                                <Box sx={{ textAlign: 'left', fontSize: '10px', lineHeight: '110%', fontWeight: 400, color: '#91939B' }}>
                                    ${(parseFloat(ethers.utils.formatEther(totalamount.toString())) * usdprice) >= 1000000 ? roundOff((parseFloat(ethers.utils.formatEther(totalamount.toString())) * usdprice) / 1000000, 1, 'M') : ((parseFloat(ethers.utils.formatEther(totalamount.toString())) * usdprice) < 1000 ? roundOff(parseFloat(ethers.utils.formatEther(totalamount.toString())) * usdprice, 1) : roundOff((parseFloat(ethers.utils.formatEther(totalamount.toString())) * usdprice) / 1000, 1, 'K'))}
                                </Box>
                            </Box>
                        </Box>
                    </>
                    }
                    {!active && <CustomButton onClick={() => !active && ConnectModal()} sx={{ mt: 3, whiteSpace: 'nowrap', width: '100%', lineHeight: '40px' }} variant="contained">Connect Wallet </CustomButton>}
                    {active && CartData.length !== 0 && (balance.lt(totalamount)) && <Button onClick={() => !active && ConnectModal()}
                        sx={{
                            mt: 3,
                            backgroundColor: alpha(theme.palette.primary.searchIcon, 1),
                            '&:hover,&:focus': {
                                backgroundColor: alpha(theme.palette.primary.searchIcon, 1),
                            }, whiteSpace: 'nowrap', width: '100%', lineHeight: '40px', color: '#ffffff', textTransform: 'none', fontSize: '16px', fontWeight: 500,
                        }} variant="contained" disabled>Insufficient Balance </Button>}
                    {active && CartData.length !== 0 && (balance.gte(totalamount)) && <>
                        <Box sx={{ mt: 3 }}>
                            <Button sx={{
                                background: 'linear-gradient(90deg, #E875D2 0%, #642CC8 100%)', borderRadius: '3px', padding: '11px 22px', color: '#ffffff', width: '100%', textTransform: 'none', '&:hover,&:focus': {
                                    opacity: 0.8,
                                }
                            }} disabled={loading} onClick={buyNow}>Buy Now</Button>
                        </Box>
                        {/* <Box sx={{ mt: 1.5 }}>
                            <Button sx={{
                                background: '#485FE6', borderRadius: '3px', padding: '11px 22px', color: '#ffffff', width: '100%', textTransform: 'none',
                                '&:hover,&:focus': {
                                    background: '#485FE6',
                                    opacity: 0.8,
                                }
                            }}>Proceed to Checkout</Button>
                        </Box> */}
                    </>}


                </Box>
            </Drawer>
        </>
    )
}
