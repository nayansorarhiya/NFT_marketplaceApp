import { Box, Grid } from '@mui/material'
import React from 'react'
import card_img1 from '../../assets/images/card_img1.svg'
import card_img2 from '../../assets/images/card_img2.svg'
import card_img3 from '../../assets/images/card_img3.svg'
import card_img4 from '../../assets/images/card_img4.svg'
import card_img5 from '../../assets/images/card_img5.svg'
import opensea from '../../assets/images/opensea.svg'
import NFTCard from '../card/NFTCard'



export default function NFTCollection() {
    return (
        <>

            <Box sx={{ p: '32px 20px 20px 20px', height: '100vh', maxHeight: '100vh', overflow: 'auto' }}>
                <Grid container spacing={2}>
                    <NFTCard opensea={opensea} card_img1={card_img1}></NFTCard>
                    <NFTCard opensea={opensea} card_img1={card_img2}></NFTCard>
                    <NFTCard opensea={opensea} card_img1={card_img3}></NFTCard>
                    <NFTCard opensea={opensea} card_img1={card_img4}></NFTCard>
                    <NFTCard opensea={opensea} card_img1={card_img5}></NFTCard>
                </Grid>
            </Box>
        </>
    )
}
