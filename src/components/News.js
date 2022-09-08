import { alpha, Box, Button, Card, CardContent, CardMedia, Grid, styled, Typography } from '@mui/material'
import { useTheme } from '@mui/styles';
import React from 'react'
import newscard from '../assets/images/newscard.svg'
import newscard2 from '../assets/images/newscard2.svg'
import newscard3 from '../assets/images/newscard3.svg'
import newscard4 from '../assets/images/newscard4.svg'


const NewsContent = styled(Box)`
    font-family: 'WorkSans';
    font-style: normal;
    font-weight: 600;
    line-height: 42px;
    text-transform: capitalize;
`

const itemData = [
    {
        img: newscard,
        title: 'Category Name',
        subtitle: 'Title goes here',
    },
    {
        img: newscard2,
        title: 'Category Name',
        subtitle: 'Title goes here',
    },
    {
        img: newscard3,
        title: 'Category Name',
        subtitle: 'Title goes here',
    },
    {
        img: newscard4,
        title: 'Category Name',
        subtitle: 'Title goes here',
    },

];

function News() {
    const theme = useTheme();
    return (
        <Box sx={{ mt: 10 }}>
            <Box sx={{ display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'flex' }, justifyContent: 'space-between', overflowX: 'auto' }}>
                <Box>
                    <NewsContent sx={{ fontSize: { xs: '26px', sm: '36px', md: '36px', lg: '36px' } }}>
                        News & Content
                    </NewsContent>
                </Box>
                <Button variant="outlined" sx={{
                    padding: { xs: '10px 24px', md: '18px 24px', lg: '15px 36px' }, color: alpha(theme.palette.primary.buttonfont, 1),
                    border: '1px solid #485FE6',
                    fontWeight: '500',
                    fontSize: '16px',
                    lineHeight: '21px',
                    textTransform: 'capitalize',
                    borderRadius: '3px',
                    '&:hover,&:focus': {
                        border: '1px solid #485FE6',
                    },
                }}>All News</Button>
            </Box>
            <Box>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {
                        itemData.map((item) => (
                            <Grid item xs={12} sm={12} md={6} lg={3}>
                                <Card sx={{ cursor: 'pointer', mt: 6, borderRadius: '10px', background: alpha(theme.palette.primary.main, 1), '&:hover': { boxShadow: '0 0 0 4px transparent, 0 2px 8px #b1b5c34d' } }} >
                                    <Box>
                                        <CardMedia
                                            component="img"
                                            image={item.img}
                                            alt="NFT image"
                                        >
                                        </CardMedia>
                                    </Box>

                                    <CardContent>
                                        <Box sx={{ height: '45px' }}>
                                            <Box sx={{ color: '#91939B', fontSize: '14px', fontWeight: '500', lineHeight: '18px' }}>
                                                {item.title}
                                            </Box>
                                            <Box sx={{ color: alpha(theme.palette.primary.buttonfont, 1), fontSize: '18px', fontWeight: 700, lineHeight: '32px', textTransform: 'capitalize' }}>
                                                {item.subtitle}
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }


                </Grid>

            </Box>
        </Box>

    )
}

export default News