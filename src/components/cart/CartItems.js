import { Avatar, Badge, Box } from '@mui/material'
import React from 'react';
import { alpha, useTheme, styled } from '@mui/material/styles';
import eth from '../../assets/images/eth.svg';
import card_img from '../../assets/images/cart_image.svg'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { useNavigate } from 'react-router-dom';
import { parseEther } from 'ethers/lib/utils';
import { ethers } from 'ethers';
import CancelIcon from '@mui/icons-material/Cancel';

export default function CartItems({ cartItem, popCartData, usdprice, roundOff }) {
    const navigate = useNavigate();
    const theme = useTheme();
    return (
        <>
            <Box sx={{
                display: 'flex', mb: 1,
            }}>
                <Box sx={{
                    display: 'flex', width: '100%', alignItems: 'center', cursor: 'pointer',
                    padding: '0.5rem',
                    '&:hover,&:focus': {
                        borderRadius: '15px',
                        backgroundColor: theme.palette.primary.itemhover,
                    }
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: '25px', cursor: 'initial', mr: '15px' }}>
                        <Badge badgeContent={<CancelIcon onClick={() => popCartData(cartItem.uid)} sx={{ color: alpha(theme.palette.primary.borderDrawer, 1), '&:hover': { color: '#EF4676' }, cursor: 'pointer', }} />
                        } color="primary" className='cartitem' sx={{ borderRadius: '9px' }}>
                            <Avatar sx={{ borderRadius: '8px', width: "48px", height: "48px" }} src={cartItem.imageurl} />
                        </Badge>
                    </Box>
                    <Box sx={{ width: '100%', cursor: 'pointer' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mb: 1 }}>
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ marginRight: '0.5rem', fontSize: '14px', maxWidth: '50px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {cartItem.tokenId}
                                </Box>
                                <span style={{ display: 'flex' }}>
                                    <InfoRoundedIcon sx={{ color: '#EB5757', width: '18px' }} />
                                </span>
                            </span>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Box sx={{ fontSize: '14px' }}>
                                    {/* {parseFloat(ethers.utils.formatEther(cartItem.price)).toFixed(4)} */}
                                    {roundOff(parseFloat(ethers.utils.formatUnits(cartItem.price, cartItem.decimal)), 4) }
                                </Box>
                                <span style={{ display: 'flex' }}>
                                    <img src={eth} />
                                </span>
                            </Box>

                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ textAlign: 'left', fontSize: '10px', lineHeight: '110%', fontWeight: 400, color: '#91939B' }}>
                                {cartItem.collection}
                            </Box>
                            <Box>
                                <Box sx={{ textAlign: 'left', fontSize: '10px', lineHeight: '110%', fontWeight: 400, color: '#91939B' }}>
                                    ${(parseFloat(ethers.utils.formatEther(cartItem.price)) * (usdprice)) >= 1000000 ? roundOff(parseFloat(ethers.utils.formatEther(cartItem.price)) * (usdprice) / 1000000, 1, 'M') :((parseFloat(ethers.utils.formatEther(cartItem.price))) * usdprice) < 1000 ? roundOff(parseFloat(ethers.utils.formatEther(cartItem.price)) * usdprice,1) : roundOff((parseFloat(ethers.utils.formatEther(cartItem.price)) * usdprice) / 1000, 1, 'K')}
                                </Box>
                            </Box>
                        </Box>

                    </Box> 
                </Box>

            </Box>
        </>
    )
}
