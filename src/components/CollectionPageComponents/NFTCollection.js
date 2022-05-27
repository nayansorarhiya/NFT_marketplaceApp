import { Box, Button, Grid } from '@mui/material'
import React, { Suspense } from 'react'
// import NFTCard from '../card/NFTCard';
import { styled, alpha, useTheme } from '@mui/material/styles';
const NFTCard = React.lazy(() => import('../card/NFTCard'));



export default function NFTCollection(props) {
    const theme = useTheme();
    const showMoredata = () => {
        if (props.totalNFT.hasNext === true) {
            props.setApiFilter({ ...(props.apifilter), "offset": (props.apifilter.offset) + 30 })
        }
    }
    return (
        <>

            <Box sx={{ p: '32px 20px 20px 20px', height: '100vh', maxHeight: '100vh', overflow: 'auto' }}>
                {props.assetsdata.length !== 0 ?
                    <Grid container spacing={2}>
                        <Suspense fallback={<div>Loading...</div>}>
                            {
                                (props.assetsdata).map((value, index) => <NFTCard key={index} apidata={value} rarityinput={props.rarityinput} buynowinput={props.buynowinput}></NFTCard>)
                            }
                        </Suspense>
                    </Grid>
                    :
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        No Data Found
                    </Box>
                }
                {props.totalNFT.hasNext === true && <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" sx={{
                        '&:hover,&:focus': {
                            backgroundColor: alpha(theme.palette.primary.main, 1),
                        }, color: '#485FE6', fontWeight: 700, fontSize: '18px', my: 4
                    }} onClick={showMoredata}>
                        Show More
                    </Button>
                </Box>}
            </Box>
        </>
    )
}
