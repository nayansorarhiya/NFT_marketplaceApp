import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid/Grid';
import { Paper } from '@mui/material';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import discord from '../../../assets/images/discord.svg';
import discordDark from '../../../assets/images/discordDark.svg';
import { LogoTypography } from '../../CustomStyles';


export default function Footer() {
    const theme = useTheme();

    return (
        <>
            <Paper sx={{ background: alpha(theme.palette.primary.main, 1), borderRadius: 0 }}>
                <Box sx={{ boxShadow: `0px 0px 0px 1px  ${theme.palette.primary.borderDrawer}`, padding: 2, mt: '2px' }}>
                    <Container >
                        <Grid container columns={{ md: 12, lg: 12 }}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center', alignItems: 'center', position: 'relative', flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' }
                            }}>
                            <Grid item md={3} lg={3} >
                                <Box sx={{ textAlign: 'start' }}>
                                    <LogoTypography />
                                </Box>
                            </Grid>
                            <Grid item md={5} lg={5} sx={{ pb: { xs: 1, sm: 1 }, pt: { xs: 1, sm: 1 } }}>
                                <Box sx={{ display: 'flex', justifyContent: 'end', color: alpha(theme.palette.primary.dark) }} className="menulist">
                                    <Box>
                                        <MenuItem>
                                            discover
                                        </MenuItem>
                                    </Box>
                                    <Box sx={{ ml: { sx: 0, sm: 0, md: 3, lg: 4 } }} >
                                        <MenuItem>
                                            Stats
                                        </MenuItem>
                                    </Box>
                                    <Box sx={{ ml: { sx: 0, sm: 0, md: 3, lg: 4 } }}>
                                        <MenuItem>
                                        Rewards
                                        </MenuItem>
                                    </Box>
                                    <Box sx={{ ml: { sx: 0, sm: 0, md: 3, lg: 4 } }}>
                                        <MenuItem>
                                            sell
                                        </MenuItem>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item md={4} lg={4} sx={{ pb: { xs: 1, sm: 1 }, pt: { xs: 1, sm: 1 } }}>

                                <Stack direction="row" spacing={3} sx={{ justifyContent: 'end', }}>
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
                                </Stack>
                            </Grid>

                        </Grid>
                    </Container>
                </Box>
            </Paper>
        </>
    );
}
