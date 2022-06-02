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

export default function CartDrawer({ topdrawerwidth, cartvariant, cartopen, ConnectModal }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { active, account, library } = useWeb3React();
    const [balance, setBalance] = React.useState(BigNumber.from("0"));
    useEffect(() => {
        let getBalance = async () => {
            if (active) {
                setBalance(await library.getBalance(account));
            }
        }
        getBalance();
    }, [active])
    const [totalamount, setTotalAmount] = useState(0);
    const CartData = (useSelector((state) => state.Index.cartdata))
    useEffect(() => {
        // if (CartData.length !== 0) {
        const total = CartData.reduce((acc, item) => {
            return acc += parseFloat(ethers.utils.formatEther(item.price))
        }, 0)
        setTotalAmount(total.toFixed(2))
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
                            return (<CartItems key={value.uid} cartItem={value} popCartData={popCartData}></CartItems>)
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
                                        {totalamount}
                                    </Box>
                                    <img src={eth} />
                                </Box>
                                <Box sx={{ textAlign: 'left', fontSize: '10px', lineHeight: '110%', fontWeight: 400, color: '#91939B' }}>
                                    $207.55k
                                </Box>
                            </Box>
                        </Box>
                    </>
                    }
                    {!active && <CustomButton onClick={() => !active && ConnectModal()} sx={{ mt: 3, whiteSpace: 'nowrap', width: '100%', lineHeight: '40px' }} variant="contained">Connect Wallet </CustomButton>}
                    {active && CartData.length !== 0 && (balance < totalamount) && <Button onClick={() => !active && ConnectModal()}
                        sx={{
                            mt: 3,
                            backgroundColor: alpha(theme.palette.primary.searchIcon, 1),
                            '&:hover,&:focus': {
                                backgroundColor: alpha(theme.palette.primary.searchIcon, 1),
                            }, whiteSpace: 'nowrap', width: '100%', lineHeight: '40px', color: '#ffffff', textTransform: 'none', fontSize: '16px', fontWeight: 500,
                        }} variant="contained" disabled>Insufficient Balance </Button>}
                    {active && CartData.length !== 0 && (balance >= totalamount) && <>
                        <Box sx={{ mt: 3 }}>
                            <Button sx={{
                                background: 'linear-gradient(90deg, #E875D2 0%, #642CC8 100%)', borderRadius: '3px', padding: '11px 22px', color: '#ffffff', width: '100%', textTransform: 'none', '&:hover,&:focus': {
                                    opacity: 0.8,
                                }
                            }}>Buy Now</Button>
                        </Box>
                        <Box sx={{ mt: 1.5 }}>
                            <Button sx={{
                                background: '#485FE6', borderRadius: '3px', padding: '11px 22px', color: '#ffffff', width: '100%', textTransform: 'none',
                                '&:hover,&:focus': {
                                    background: '#485FE6',
                                    opacity: 0.8,
                                }
                            }}>Proceed to Checkout</Button>
                        </Box>
                    </>}


                </Box>
            </Drawer>
        </>
    )
}
