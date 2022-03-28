import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
// import MoreIcon from '@mui/icons-material/MoreVert';
import { useTheme } from '@mui/material/styles';


export default function Footer() {
    const theme = useTheme();
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <BottomNavigation sx={{ width: '100%' }} value={value} onChange={handleChange} >
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="relative" sx={{ bgcolor: alpha(theme.palette.primary.main, 1) }}>
                    <Container>
                        <Toolbar>
                            <Box sx={{ display: 'flex', color: alpha(theme.palette.primary.dark) }} className="menulist">
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    className="headerlogo"
                                >
                                    logo
                                </Typography>
                            </Box>
                            <Box sx={{ flexGrow: 1 }} />


                            <Box sx={{ display: {xs : 'none',sm : 'none', md:'flex', lg:'flex'}, color: alpha(theme.palette.primary.dark) }} className="menulist">
                                <Box sx={{ ml: 5 }}>
                                    <MenuItem>
                                        discover
                                    </MenuItem>
                                </Box>
                                <Box sx={{ ml: 5 }}>
                                    <MenuItem>
                                        states
                                    </MenuItem>
                                </Box>
                                <Box sx={{ ml: 5 }}>
                                    <MenuItem>
                                        staking
                                    </MenuItem>
                                </Box>
                                <Box sx={{ ml: 5 }}>
                                    <MenuItem>
                                        sell
                                    </MenuItem>
                                </Box>
                            </Box>
                            <Box sx={{ flexGrow: 1 }} />

                        </Toolbar>
                    </Container>
                </AppBar>

            </Box>


        </BottomNavigation>
    );
}
