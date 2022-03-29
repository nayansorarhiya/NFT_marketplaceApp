import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid/Grid';
import { Paper } from '@mui/material';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import discord from '../../../assets/images/discord.svg'


export default function Footer() {
    const theme = useTheme();

    return (
        <>
            <Paper sx={{ bgcolor: alpha(theme.palette.primary.main, 1), padding: 3 }}>
                <Container >
                    <Grid container columns={{ md: 12, lg: 12 }}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center', alignItems: 'center', position: 'relative',
                        }}>
                        <Grid item md={3} lg={3} >
                            <Box sx={{ textAlign: 'start' }}>

                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    className="headerlogo"
                                    sx={{color :alpha(theme.palette.primary.logo,1)}}
                                >
                                    logo
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item md={5} lg={5} >
                            <Box sx={{ display: 'flex', justifyContent: 'end', color: alpha(theme.palette.primary.dark) }} className="menulist">
                                <Box>
                                    <MenuItem>
                                        discover
                                    </MenuItem>
                                </Box>
                                <Box sx={{ ml: { sx: 0, sm: 0, md: 3, lg: 4 } }} >
                                    <MenuItem>
                                        states
                                    </MenuItem>
                                </Box>
                                <Box sx={{ ml: { sx: 0, sm: 0, md: 3, lg: 4 } }}>
                                    <MenuItem>
                                        staking
                                    </MenuItem>
                                </Box>
                                <Box sx={{ ml: { sx: 0, sm: 0, md: 3, lg: 4 } }}>
                                    <MenuItem>
                                        sell
                                    </MenuItem>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item md={4} lg={4}>

                            <Stack direction="row" spacing={3} sx={{ flex: 'end', justifyContent: 'end', }}>
                                <Avatar variant="rounded" sx={{ width: 32, height: 32, bgcolor: alpha(theme.palette.primary.footerIcon, 1), }}>
                                    <TwitterIcon sx={{ color: alpha(theme.palette.primary.main, 1) }} />
                                </Avatar>
                                <Avatar variant="rounded" sx={{ width: 32, height: 32, bgcolor: alpha(theme.palette.primary.footerIcon, 1) }}>
                                    <InstagramIcon sx={{ color: alpha(theme.palette.primary.main, 1) }} />
                                </Avatar>
                                <Avatar variant="rounded" sx={{ width: 32, height: 32, bgcolor: alpha(theme.palette.primary.footerIcon, 1) }}>
                                    <Avatar variant="rounded" src={discord} sx={{ width: 20, height: 20 }}>

                                    </Avatar>
                                </Avatar>
                            </Stack>
                        </Grid>

                    </Grid>
                </Container>
            </Paper>
        </>
    );
}
