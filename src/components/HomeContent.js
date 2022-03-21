import React from "react";
import Typography from '@mui/material/Typography';
import homeimage from '../assets/images/home.png';
import Grid from '@mui/material/Grid/Grid';
import Button from '@mui/material/Button/Button';
import CustomButton from '../components/CustomButton';
import Box from '@mui/material/Box/Box';
import { alpha, useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import vector from '../assets/images/vectorCorrect.svg';
import scullLogo from '../assets/images/Ellipse2.png';
function HomeContent() {
    const theme = useTheme();

    return (<>
        <Grid container spacing={{ xs: 1, md: 2, lg: 3 }} columns={{ lg: 12 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <Grid item md={3} lg={6} >
                <Typography className="mainheading" sx={{ marginTop: '108px', color: alpha(theme.palette.primary.font, 1) }}>
                    Discover, Collect, and <br />
                    Sell Extraordinary NFTs
                </Typography>
                <Typography className="content" sx={{ marginTop: '31px', color: alpha(theme.palette.primary.buttonfont, 1) }}>
                    Lorem ipsum dolor sit amet, consectetur<br /> adipiscing elit. Proin volutpat.
                </Typography>
                <Box sx={{ marginTop: '46px' }}>
                    <CustomButton variant="contained" type="button" sx={{
                        padding: '18px 36px 18px 36px ', mr: '10px', mb: '10px', fontWeight: '500',
                        fontSize: '16px',
                        lineHeight: '21px', textTransform: 'capitalize'
                    }}>call to action</CustomButton>
                    <Button variant="outlined" sx={{
                        padding: '18px 36px 18px 36px ', mb: '10px', color: alpha(theme.palette.primary.buttonfont, 1),
                        border: '1px solid #485FE6',
                        fontWeight: '500',
                        fontSize: '16px',
                        lineHeight: '21px', textTransform: 'capitalize',
                        '&:hover,&:focus': {
                            border: '1px solid #485FE6',
                        },
                    }}>call to action #2</Button>
                </Box>
            </Grid>
            <Grid item md={3} lg={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: '33px' }}>
                <Box sx={{ ml: '10px', textAlign: 'end' }}>
                    <img src={homeimage} alt="bkimage" width="100%"></img>  {/*  430px  ||  75% */}
                    <Box sx={{
                        minWidth: 180, maxWidth: 180, position: 'relative', textAlign: "center",
                        boxShadow: '0px 12px 34px rgba(72, 95, 230, 0.2)', borderRadius: '6px',
                        mt: { md: '-35px', lg: '-220px' }, ml: { md: '30%', lg: '-130px' }
                    }}>

                        <Box sx={{
                            ml: '25%', mt: '-25%',
                            position: 'absolute',
                            width: '84px',
                            height: '84px',
                            background: alpha(theme.palette.primary.homeBg, 1),
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <Box sx={{
                                position: 'absolute',
                                borderRadius: '50%',
                                width: '70px',
                                height: '70px',
                                boxSizing: 'border-box',
                                ml: 0
                            }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 70, mt: '7px', position: 'absolute' }}
                                    image={scullLogo}
                                    alt="Live from space album cover"
                                />
                            </Box>
                        </Box>

                        <Card sx={{ background: alpha(theme.palette.primary.main, 1), }}>

                            <CardContent>
                                <Typography sx={{
                                    fontSize: 14, fontWeight: '400', lineHeight: '18px', mb: '26px', mt: '44px',
                                    color: alpha(theme.palette.primary.searchIcon, 1)
                                }} gutterBottom>
                                    Featured Collection
                                </Typography>
                                <Typography sx={{ fontSize: 20, fontWeight: '700', lineHeight: '22px', pb: '15px' }}>
                                    Mutanat  Ape <br />
                                    Yacht Club <img src={vector} alt="vectoricon" />
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'center', mb: '10px' }}>
                                <CustomButton variant="contained" sx={{ padding: '11px 22px 11px 22px ' }}>view collection</CustomButton>
                            </CardActions>
                        </Card>
                    </Box>


                </Box>
            </Grid>
        </Grid>
    </>);
}

export default HomeContent;