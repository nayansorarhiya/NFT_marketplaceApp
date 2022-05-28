import { Box } from '@mui/material'
import React from 'react';
import { alpha, useTheme, styled } from '@mui/material/styles';
import eth from '../../assets/images/eth.svg';
import card_img from '../../assets/images/cart_image.svg'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { useNavigate } from 'react-router-dom';

export default function CartItems() {
    const navigate = useNavigate();
    const theme = useTheme();
    return (
        <>
            <Box sx={{
                display: 'flex', mb: 3,
            }}>
                <Box sx={{
                    display: 'flex', width: '100%', alignItems: 'center', cursor: 'pointer',
                    padding: '0.5rem',
                    '&:hover,&:focus': {
                        borderRadius: '15px',
                        backgroundColor: theme.palette.primary.itemhover,
                    }
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src={card_img} />
                    </Box>
                    <Box sx={{
                        cursor: 'pointer', position: 'relative', bottom: '20px',
                        right: '10px'
                    }}>
                        {/* <img src={close} /> */}
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11" cy="11" r="10" fill="#91939B" stroke={alpha(theme.palette.primary.main, 1)} strokeWidth="2" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.83433 6.77424C7.54144 6.48135 7.06656 6.48135 6.77367 6.77424C6.48078 7.06714 6.48078 7.54201 6.77367 7.8349L9.99645 11.0577L6.77367 14.2805C6.48078 14.5733 6.48078 15.0482 6.77367 15.3411C7.06656 15.634 7.54144 15.634 7.83433 15.3411L11.0571 12.1183L14.2799 15.3411C14.5728 15.634 15.0476 15.634 15.3405 15.3411C15.6334 15.0482 15.6334 14.5733 15.3405 14.2805L12.1178 11.0577L15.3405 7.8349C15.6334 7.54201 15.6334 7.06714 15.3405 6.77424C15.0476 6.48135 14.5728 6.48135 14.2799 6.77424L11.0571 9.99702L7.83433 6.77424Z" fill="white" />
                        </svg>

                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mb: 1 }}>
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ marginRight: '0.5rem', fontSize: '14px' }}>
                                    7258
                                </Box>
                                <span style={{ display: 'flex' }}>
                                    {/* <img src={vector} /> */}
                                    <InfoRoundedIcon sx={{ color: '#EB5757', width: '18px' }} />
                                </span>
                            </span>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Box sx={{ fontSize: '14px' }}>
                                    97.99
                                </Box>
                                <span style={{ display: 'flex' }}>
                                    <img src={eth} />
                                </span>
                            </Box>

                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ textAlign: 'left', fontSize: '10px', lineHeight: '110%', fontWeight: 400, color: '#91939B' }}>
                                Mutant Ape Yacht club
                            </Box>
                            <Box>
                                <Box sx={{ textAlign: 'left', fontSize: '10px', lineHeight: '110%', fontWeight: 400, color: '#91939B' }}>
                                    $207.55k
                                </Box>
                            </Box>
                        </Box>

                    </Box>
                    {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                        <Box sx={{ textAlign: 'left' }}>
                                            Mutant Ape Yacht club
                                        </Box>
                                    </Box> */}
                </Box>

            </Box>
        </>
    )
}
