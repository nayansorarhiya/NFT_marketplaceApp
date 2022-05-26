import { Box, Grid } from '@mui/material'
import React, { Suspense } from 'react'
import card_img1 from '../../assets/images/card_img1.svg'
import card_img2 from '../../assets/images/card_img2.svg'
import card_img3 from '../../assets/images/card_img3.svg'
import card_img4 from '../../assets/images/card_img4.svg'
import card_img5 from '../../assets/images/card_img5.svg'
// import NFTCard from '../card/NFTCard';
const NFTCard = React.lazy(() => import('../card/NFTCard'));



export default function NFTCollection(props) {
    return (
        <>

            <Box sx={{ p: '32px 20px 20px 20px', height: '100vh', maxHeight: '100vh', overflow: 'auto' }}>
                {props.assetsdata.length !== 0 ?
                    <Grid container spacing={2}>
                        <Suspense fallback={<div>Loading...</div>}>
                            {
                                (props.assetsdata).map((value) => <NFTCard apidata={value} rarityinput={props.rarityinput}></NFTCard>)
                            }
                        </Suspense>
                    </Grid>
                    :
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        No Data Found
                    </Box>
                }
            </Box>
        </>
    )
}
