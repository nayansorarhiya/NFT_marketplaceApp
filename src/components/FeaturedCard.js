import React from "react";
import Typography from '@mui/material/Typography';
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


function FeaturedCard() {
    const theme = useTheme();
    return (<>
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
                        alt="Live from space album cover" />
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
    </>);
}
export default FeaturedCard;