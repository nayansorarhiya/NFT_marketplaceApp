import { alpha, Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Grid, styled, Typography, useTheme } from '@mui/material'
import React from 'react';
import eth from '../../assets/images/eth.svg'

const CountButton = styled(Button)`
    background: #485FE6;
    border: 2px solid #FFFFFF;
    border-radius: 3px;
    padding: 2px 6px;
    color: #FFFFFF;
    width: 60px;
    height: 22px;
    position: absolute;
    bottom : 15px;
    ${'' /* bottom: 90px; */}
    left: 15px;

`

const BadgeImage = styled(Avatar)`
    position: absolute;
    ${'' /* bottom: 300px; */}
    margin : 15px;
    height: 32px;
    width: 32px;
`

export default function NFTCard(props) {
    const theme = useTheme();
    return (<>
        <Grid item lg={2.4} sm={6} xs={12} md={4}  >
            <Card sx={{ mt: 6, borderRadius: '10px', background: alpha(theme.palette.primary.main, 1) }}>
                <Box sx={{ position: 'relative' }}>
                    <BadgeImage src={props.opensea}></BadgeImage>
                    <CardMedia
                        component="img"
                        image={props.card_img1}
                        alt="green iguana"
                    >
                    </CardMedia>
                    <CountButton># 7258</CountButton>
                </Box>
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
            </Card>
        </Grid>
    </>
    )
}
