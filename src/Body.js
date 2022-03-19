import React from "react";
import Container from '@mui/material/Container/Container';
import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box/Box';
import homeimage from './assets/images/home.png';
import Grid from '@mui/material/Grid/Grid';
import Button from '@mui/material/Button/Button';
import CustomButton from './components/CustomButton';
import Box from '@mui/material/Box/Box';
import { alpha, useTheme } from '@mui/material/styles';



function Body() {
    const theme = useTheme();
    return (<>
        <Container fixed>
            <Grid container spacing={{ xs: 1, md: 2, lg: 3 }} columns={{ md: 12, lg: 12 }} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Grid item xs={6} >
                    <Typography className="mainheading" sx={{ marginTop: '108px', color: alpha(theme.palette.primary.font, 1) }}>
                        Discover, Collect, and <br />
                        Sell Extraordinary NFTs
                    </Typography>
                    <Typography className="content" sx={{ marginTop: '31px', color: alpha(theme.palette.primary.buttonfont, 1) }}>
                        Lorem ipsum dolor sit amet, consectetur<br /> adipiscing elit. Proin volutpat.
                    </Typography>
                    <Box sx={{ marginTop: '46px' }}>
                        <CustomButton variant="contained" sx={{
                            padding: '18px 36px 18px 36px ', mr: '10px', fontWeight: '500',
                            fontSize: '16px',
                            lineHeight: '21px', textTransform: 'capitalize'
                        }}>call to action</CustomButton>
                        <Button variant="outlined" sx={{
                            padding: '18px 36px 18px 36px ', color: alpha(theme.palette.primary.buttonfont, 1), border: '1px solid #485FE6', fontWeight: '500',
                            fontSize: '16px',
                            lineHeight: '21px', textTransform: 'capitalize'
                        }}>call to action #2</Button>
                    </Box>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '33px' }}>
                    <img src={homeimage} alt="bkimage" width="75%"></img>  {/*  430px */}
                </Grid>

            </Grid>

        </Container>
    </>);
}

export default Body;