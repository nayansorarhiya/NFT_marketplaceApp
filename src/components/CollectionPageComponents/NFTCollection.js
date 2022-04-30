import { alpha, Avatar, Box, Button, Card, CardContent, CardMedia, Grid, styled, Typography, useTheme } from '@mui/material'
import React from 'react'
import card_img1 from '../../assets/images/card_img1.svg'
import eth from '../../assets/images/eth.svg'
import opensea from '../../assets/images/opensea.svg'

const CountButton = styled(Button)`
    background: #485FE6;
    border: 2px solid #FFFFFF;
    border-radius: 3px;
    padding: 2px 6px;
    color: #FFFFFF;
    width: 60px;
    height: 22px;
    position: relative;
    /* right: 100px;
    bottom: 45px; */
    bottom: 90px;
    left: 15px;

`
const BadgeImage = styled(Avatar)`
    position: relative;
    bottom: 300px;
    /* right: 160px; */
    left: 15px;
    height: 32px;
    width: 32px;


`

export default function NFTCollection() {
    const theme = useTheme();
    return (
        <>
            <Box>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={3} md={3} sm={5} lg={2} xl={2}  >
                        <Card sx={{
                            minWidth: 240, maxHeight: '295px', mt: 6, borderRadius: '10px', background: alpha(theme.palette.primary.main, 1)
                        }}>
                            <CardMedia
                                component="img"
                                image={card_img1}
                                alt="NFT image"
                            />
                            <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box>
                                    34.91
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '7px' }}>
                                    <Box sx={{ color: 'rgba(145, 147, 155, 1)' }}>
                                        38.51
                                    </Box>
                                    <img src={eth} alt="eth" height={'21px'} />
                                </Box>
                            </CardContent>
                            <CountButton># 7258</CountButton>
                            <BadgeImage src={opensea}></BadgeImage>

                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
