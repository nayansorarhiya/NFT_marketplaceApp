import { Box, Grid } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'
import eth from '../../assets/images/eth.svg'
import info from '../../assets/images/info.svg'

const Price = styled(Box)`
    display: flex;
    gap: 4px;
`
const Text = styled(Box)`
    color: #EB5757;
`

export default function PriceRange() {
    return (

        <Box sx={{ display: 'flex', gap: '25px' }}>
            <Price>
                <span style={{ color: '#91939B' }}>24h: </span>
                <span>5,05.7</span>
                <img style={{ marginLeft: '5px' }} src={eth} alt='eth' />
            </Price>
            <Text>
                -98.47%
            </Text>
            <Price >
                <span style={{ color: '#91939B' }}>Floor: </span>
                <span>15.375</span>
                <img style={{ marginLeft: '5px' }} src={eth} alt='eth' />
            </Price>
            <Price >
                <span style={{ color: '#91939B' }}>Reveal: </span>
                <span style={{ color: '#27AE60' }} >97.25%</span>
                <img style={{ marginLeft: '5px' }} src={info} alt='info' />
            </Price>
        </Box>
    )
}
