import React from "react";
import Typography from '@mui/material/Typography';
import homeimage from '../assets/images/home.png';
import Grid from '@mui/material/Grid/Grid';
import Button from '@mui/material/Button/Button';
import CustomButton from './CustomButton';
import Box from '@mui/material/Box/Box';
import { alpha, useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import vector from '../assets/images/vectorCorrect.svg';
import scullLogoDark from '../assets/images/Ellipse2.png';
import scullLogoLight from '../assets/images/Ellipse1.png';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    bgGradiant: {
        position: 'absolute',
        zIndex: 0,
        opacity: '1',
        filter: 'blur(200px)',
        left: '-200px',
        transform: 'rotate(30deg)',
        height: '25%',
    },
});

function HeroSection() {
    const theme = useTheme();
    const classes = useStyles();
    return (<>
        <Box className={classes.bgGradiant} sx={{
            width: { xs: '100%', sm: '100%', md: '50%', lg: '50%' },
            background: theme.palette.primary.main === '#FFFFFF' ? 'radial-gradient(72.4% 72.4% at 17.21% 12.93%, #9ED8F2 100%, #B6BBE5 100%)' : 'radial-gradient(72.4% 72.4% at 17.21% 12.93%, #FE00FF 75%, #0101FF 100%)', 
        }}
        ></Box>
        <Grid container spacing={{ xs: 1, md: 2, lg: 3 }} columns={{ lg: 12 }}
            sx={{
                display: 'flex',
                justifyContent: 'center', alignItems: 'flex-start', position: 'relative', zIndex: 1
            }}>
            <Grid item md={3} lg={6} sx={{ textAlign: { xs: 'center', sm: 'center', md: 'center', lg: 'left' } }}>
                <Typography className="mainheading" sx={{
                    marginTop: { xs: '50px', sm: '50px', md: '50px', lg: '108px' },
                    color: alpha(theme.palette.primary.font, 1),
                    fontSize: { xs: '30px', sm: '30px', md: '44px', lg: '44px' },
                    lineHeight: { xs: '39px', sm: '39px', md: '57px', lg: '57px' },
                }}>
                    Discover, Collect, and <br />
                    Sell Extraordinary NFTs
                </Typography>
                <Typography className="content" sx={{ marginTop: '31px', color: alpha(theme.palette.primary.buttonfont, 1) }}>
                    Lorem ipsum dolor sit amet, consectetur<br /> adipiscing elit. Proin volutpat.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'center', md: 'center', lg: 'left' }, marginTop: '46px' }}>
                    <CustomButton variant="contained" type="button" sx={{
                        padding: { xs: '18px 24px', sm: '18px 24px', md: '18px 24px', lg: '18px 36px' }, mr: '10px', mb: '10px', fontWeight: '500',
                        fontSize: '16px',
                        lineHeight: '21px', textTransform: 'capitalize',
                    }}>call to action</CustomButton>
                    <Button variant="outlined" sx={{
                        padding: { xs: '18px 24px', sm: '18px 24px', md: '18px 24px', lg: '18px 36px' }, mb: '10px', color: alpha(theme.palette.primary.buttonfont, 1),
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
            <Grid item md={3} lg={6} sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' }, justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: '33px' }}>
                <Box sx={{ ml: '10px', textAlign: 'end' }}>
                    <img src={homeimage} alt="bkimage" width="100%"></img>  {/*  430px  ||  75% */}
                    <Box sx={{
                        width: 180, maxWidth: 180, position: 'relative', textAlign: "center",
                        boxShadow: '0px 12px 34px rgba(72, 95, 230, 0.2)', borderRadius: '6px',
                        mt: '-220px', ml: '-130px',
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
                                    image={theme.palette.mode === 'dark' ? scullLogoDark : scullLogoLight}
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
                                <CustomButton variant="contained" sx={{ padding: '11px 22px' }}>view collection</CustomButton>
                            </CardActions>
                        </Card>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </>);
}

export default HeroSection;