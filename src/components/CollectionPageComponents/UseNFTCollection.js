import { Box, Grid } from '@mui/material'
import React, { Suspense } from 'react'
import NFTCard from '../card/NFTCard'

export default function UseNFTCollection({usernftlist}) {
    return (
        <Box sx={{ p: '20px 20px 20px 20px', height: '100vh', maxHeight: '100vh', overflow: 'auto' }}>
            {usernftlist.length !== 0 ?
                <Grid container spacing={2}>

                    {
                        (usernftlist).map((value, index) =>
                            <>
                                <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center' }}>Loading...</Box>}>
                                    <NFTCard key={index} apidata={value} rarityinput={''} buynowinput={''}></NFTCard>
                                </Suspense>
                            </>
                        )
                    }
                </Grid>
                :
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    No Data Found
                </Box>
            }
        </Box>

    )
}
