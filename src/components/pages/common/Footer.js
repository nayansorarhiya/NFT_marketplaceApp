import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid/Grid';
import { Paper, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import discord from '../../../assets/images/discord.svg';
import discordDark from '../../../assets/images/discordDark.svg';
import telegram from '../../../assets/images/telegram.svg';
import medium from '../../../assets/images/medium.svg';
import logo from '../../../assets/images/logo.svg';


export default function Footer() {
    const theme = useTheme();

    return (
        <>
            <Paper sx={{ background: alpha(theme.palette.primary.main, 1), borderRadius: 0 }}>
                <Box sx={{ boxShadow: `0px 0px 0px 1px  ${theme.palette.primary.borderDrawer}`, padding: 4, mt: '2px' }}>
                    <Container >
                        <Box sx={{ display: { xs: 'block', sm: 'block', md: 'flex', lg: 'flex' } }} >
                            <Box sx={{ width: { xs: '100%', sm: '100%', md: '50%', lg: '50%' } }}>
                                <Box sx={{ textAlign: 'start' }}>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="div"
                                        sx={{ cursor: 'pointer', fontSize: '20px', display: 'flex', color: alpha(theme.palette.primary.footerIcon, 1), marginLeft: { xs: theme.spacing(0), sm: theme.spacing(0) } }}
                                        className="headerlogo"
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <img src={logo} alt='header logo' className='logo' />
                                            <Box sx={{ display: 'flex', ml: '15px' }}>
                                                {/* <img src={theme.palette.mode == "dark" ? logo_name : blacklogo_name} alt='logo name' className='logo_name' /> */}
                                                KOLECT
                                            </Box>
                                        </Box>
                                    </Typography>
                                </Box>
                                <Box sx={{ mt: 3.5, color: '#91939B', fontSize: '14px', fontWaight: 400, lineHeight: '18px' }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br /> In ut elementum libero. Nunc ut diam velit. Mauris et nisi
                                    <br /> vel libero laoreet accumsan at ac quam.
                                </Box>
                                <Stack direction="row" spacing={3} sx={{ mt: 5 }} >
                                    <Avatar variant="rounded" sx={{ width: 32, height: 32, bgcolor: alpha(theme.palette.primary.footerIcon, 1), }}>
                                        <TwitterIcon sx={{ color: alpha(theme.palette.primary.main, 1) }} />
                                    </Avatar>
                                    <Avatar variant="rounded" sx={{ width: 32, height: 32, bgcolor: alpha(theme.palette.primary.footerIcon, 1) }}>
                                        <InstagramIcon sx={{ color: alpha(theme.palette.primary.main, 1) }} />
                                    </Avatar>
                                    <Avatar variant="rounded" sx={{ width: 32, height: 32, bgcolor: alpha(theme.palette.primary.footerIcon, 1) }}>
                                        <Avatar variant="rounded" src={theme.palette.mode === 'light' ? discord : discordDark} alt="Discord icon" sx={{ width: 20, height: 20 }}>

                                        </Avatar>
                                    </Avatar>
                                    <Avatar variant="rounded" sx={{ width: 32, height: 32, bgcolor: alpha(theme.palette.primary.footerIcon, 1) }}>
                                        <Avatar variant="rounded" src={theme.palette.mode === 'light' ? telegram : telegram} alt="Telegram icon" sx={{ width: 20, height: 20 }}>

                                        </Avatar>
                                    </Avatar>
                                    <Avatar variant="rounded" sx={{ width: 32, height: 32, bgcolor: alpha(theme.palette.primary.footerIcon, 1) }}>
                                        <Avatar variant="rounded" src={theme.palette.mode === 'light' ? medium : medium} alt="Discord icon" sx={{ width: 20, height: 20 }}>

                                        </Avatar>
                                    </Avatar>
                                </Stack>
                            </Box>
                            <Box sx={{ width: { xs: '100%', sm: '100%', md: '50%', lg: '50%' } }}>
                                <Box sx={{ fontWeight: 600, fontSize: '22px', lineHeight: '22px', mt: { xs: 5.5, sm: 5.5, md: 0, lg: 0 } }}>
                                    Navigation
                                </Box>
                                <Box sx={{ mt: 4 }}>
                                    <Grid container rowSpacing={6} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
                                        <Grid item xs={6} md={4} lg={4}>
                                            <Box>
                                                <Box>
                                                    About
                                                </Box>
                                                <Box sx={{ mt: 2.5 }}>
                                                    API
                                                </Box>
                                                <Box sx={{ mt: 2.5 }}>
                                                    Contact
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6} md={4} lg={4}>
                                            <Box>
                                                <Box>
                                                    Help
                                                </Box>
                                                <Box sx={{ mt: 2.5 }}>
                                                    Jobs
                                                </Box>
                                                <Box sx={{ mt: 2.5 }}>
                                                    Bug Bounty
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6} md={4} lg={4}>
                                            <Box>
                                                <Box>
                                                    Brand
                                                </Box>
                                                <Box sx={{ mt: 2.5 }}>
                                                    Terms of Service
                                                </Box>
                                                <Box sx={{ mt: 2.5 }}>
                                                    Advretise With Us
                                                </Box>
                                            </Box>
                                        </Grid>

                                    </Grid>
                                </Box>

                            </Box>
                        </Box>

                    </Container>
                </Box>
            </Paper >
        </>
    );
}
