import { alpha, Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Skeleton, styled, Typography, useTheme } from '@mui/material'
import React from 'react';
import eth from '../../assets/images/eth.svg'
import { ethers } from 'ethers';
import opensea from '../../assets/images/opensea.svg';
import looksrare from '../../assets/images/looksrare.svg';
import x2y2 from '../../assets/images/x2y2.svg';
import nftx from '../../assets/images/nftx.svg';

const CountButton = styled(Button)`
    background: #485FE6;
    border: 2px solid #FFFFFF;
    border-radius: 3px;
    padding: 2px 6px;
    color: #FFFFFF;
    width: 60px;
    height: 22px;
    position: absolute;
    bottom : 5%;
    ${'' /* bottom: 90px; */}
    left: 5%;

`

const BadgeImage = styled(Avatar)`
    position: absolute;
    ${'' /* bottom: 300px; */}
    margin : 5%;
    height: 32px;
    width: 32px;
`

export default function NFTCard(props) {
    const theme = useTheme();
    let svgpath = '';
    if (props.apidata.market == "looksrare") {
        svgpath = looksrare;
    } else if (props.apidata.market == "x2y2") {
        svgpath = x2y2;
    } else if (props.apidata.market == "opensea") {
        svgpath = opensea;
    }
    else if (props.apidata.market == "nftx") {
        svgpath = nftx;
    }
    return (<>
        {props.apidata.name !== '' &&
            <Grid item lg={2.4} sm={6} xs={12} md={4}  >
                <Card sx={{ ...(props.buynowinput ? { cursor: 'pointer' } : { cursor: 'not-allowed' }), mt: 6, borderRadius: '10px', background: alpha(theme.palette.primary.main, 1) }}>
                    <Box sx={{ position: 'relative' }}>
                        {svgpath !== '' && <BadgeImage src={svgpath}></BadgeImage>}
                        <CardMedia
                            component="img"
                            image={props.apidata.imageurl}
                            alt="NFT image"
                        >
                        </CardMedia>
                        {props.rarityinput && <CountButton>#{props.apidata.rarityscore}</CountButton>}
                    </Box>
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                            {props.apidata.name}
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '7px' }}>
                            <Box sx={{ color: 'rgba(145, 147, 155, 1)' }}>
                                {parseFloat(ethers.utils.formatEther((props.apidata.price).toString())).toFixed(3)}
                            </Box>
                            <img src={eth} alt="eth" height={'21px'} />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        }
    </>
    )
}
