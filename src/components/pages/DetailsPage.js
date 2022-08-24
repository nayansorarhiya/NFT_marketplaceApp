import { alpha, Box, Button, Container, Grid, Typography, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react'
import CustomButton from '../CustomButton';
import FeaturedCard from '../FeaturedCard';
import homeimage from '../../assets/images/home.png'

function DetailsPage() {
    const theme = useTheme();
    const useStyles = makeStyles({
        bgGradiant: {
            position: 'absolute',
            zIndex: 0,
            opacity: '0.5',
            filter: 'blur(200px)',
            left: '-200px',
            transform: 'rotate(30deg)',
            height: '12%',
            background: theme.palette.mode === 'light' ? 'radial-gradient(72.4% 72.4% at 17.21% 12.93%, #9ED8F2 100%, #B6BBE5 100%)' : 'radial-gradient(72.4% 72.4% at 17.21% 12.93%, #FE00FF 75%, #0101FF 100%)',
        },
    });
    const classes = useStyles();
    return (
        <>
            {/* <Box className={classes.bgGradiant} sx={{
                width: { xs: '100%', sm: '100%', md: '50%' },
            }}
            >
                
            </Box> */}
            <Container>
                <Box sx={{ mt: 6, display: 'flex', gap: '50px' }}>
                    <Box>
                        <img src={homeimage} alt="bkimage" width={400} height={400} />
                    </Box>
                    <Box sx={{fontWeight: 700, fontSize: '44px', lineHeight: '57px', color: alpha(theme.palette.primary.buttonfont, 1)}}>
                        Card Name #29632
                    </Box>
                </Box>
            </Container>

        </>
    )
}

export default DetailsPage