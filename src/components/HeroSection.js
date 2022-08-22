import React from "react";
import Typography from '@mui/material/Typography';
import homeimage from '../assets/images/home.png';
import Grid from '@mui/material/Grid/Grid';
import Button from '@mui/material/Button/Button';
import CustomButton from './CustomButton';
import Box from '@mui/material/Box/Box';
import { alpha, useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import FeaturedCard from './FeaturedCard';


function HeroSection() {
    const theme = useTheme();
    const useStyles = makeStyles({
        bgGradiant: {
            position: 'absolute',
            zIndex: 0,
            opacity: '1',
            filter: 'blur(200px)',
            left: '-200px',
            transform: 'rotate(30deg)',
            height: '25%',
            background: theme.palette.mode === 'light' ? 'radial-gradient(72.4% 72.4% at 17.21% 12.93%, #9ED8F2 100%, #B6BBE5 100%)' : 'radial-gradient(72.4% 72.4% at 17.21% 12.93%, #FE00FF 75%, #0101FF 100%)',
        },
    });
    const classes = useStyles();
    return (<>
        <Box className={classes.bgGradiant} sx={{
            width: { xs: '100%', sm: '100%', md: '50%'},
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
                    Sell NFTs Across Marketplaces
                </Typography>
                <Typography className="content" sx={{ marginTop: '31px', color: alpha(theme.palette.primary.buttonfont, 1) }}>
                    Kolect saves you money and time
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'center', md: 'center', lg: 'left' }, marginTop: '46px' }}>
                    <CustomButton variant="contained" type="button" sx={{
                        padding: { xs: '18px 24px', md: '18px 24px', lg: '18px 36px' }, mr: '10px', fontWeight: '500',
                        fontSize: '16px',
                        lineHeight: '21px', textTransform: 'capitalize',
                    }}>Explore</CustomButton>
                    <Button variant="outlined" sx={{
                        padding: { xs: '18px 24px', md: '18px 24px', lg: '18px 36px' }, color: alpha(theme.palette.primary.buttonfont, 1),
                        border: '1px solid #485FE6',
                        fontWeight: '500',
                        fontSize: '16px',
                        lineHeight: '21px', textTransform: 'capitalize',
                        '&:hover,&:focus': {
                            border: '1px solid #485FE6',
                        },
                    }}>Stats</Button>
                </Box>
            </Grid>
            <Grid item md={3} lg={6} sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' }, justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: '33px' }}>
                <Box sx={{ ml: '10px', textAlign: 'end' }}>
                    <img src={homeimage} alt="bkimage" width="100%"></img>  {/*  430px  ||  75% */}
                    <FeaturedCard/>
                </Box>
            </Grid>
        </Grid>
    </>);
}

export default HeroSection;