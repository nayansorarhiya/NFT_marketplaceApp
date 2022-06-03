import { Box, Card, CardContent, Grid, TableCell, TableRow } from '@mui/material'
import React from 'react';
import { Skeleton } from '@mui/material';

export const TableSkeleton = () => {
    return (
        <>
            <TableRow>
                <TableCell sx={{ p: 2 }}><Box><Skeleton variant="text" /></Box></TableCell>
                <TableCell>
                    <Box sx={{ maxWidth: '21vw', display: 'flex', justifyContent: 'space-around' }}>
                        <Skeleton variant="circular" width={36} height={36} />
                        <Skeleton variant="text" width={'75%'} />
                    </Box>
                </TableCell>
                <TableCell sx={{ pl: 0, pr: 0 }}><Box sx={{ display: 'flex', justifyContent: 'end' }}><Skeleton variant="text" width={'75%'} /></Box></TableCell>
                <TableCell sx={{ pl: 0, pr: 0 }}><Box sx={{ display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex' }, justifyContent: 'end' }}><Skeleton variant="text" width={'75%'} /></Box></TableCell>
                <TableCell sx={{ pl: 0, pr: 0 }}><Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' }, justifyContent: 'end' }}><Skeleton variant="text" width={'75%'} /></Box></TableCell>
                <TableCell sx={{ pl: 0, pr: 0 }}><Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' }, justifyContent: 'end' }}><Skeleton variant="text" width={'75%'} /></Box></TableCell>
                <TableCell sx={{ pl: 0, pr: 0 }}><Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' }, justifyContent: 'end' }}><Skeleton variant="text" width={'75%'} /></Box></TableCell>
                <TableCell sx={{ pl: 0, pr: 0 }}><Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' }, justifyContent: 'end' }}><Skeleton variant="text" width={'75%'} /></Box></TableCell>
            </TableRow>
        </>
    )
}

export const CardSkeleton = () => {
    return (

        <Grid item lg={2.4} sm={6} xs={12} md={4} className="NFTCard" >
            <Card sx={{borderRadius : '10px'}}>
                <Box sx={{ position: 'relative' }}>
                    <Skeleton animation="wave" variant="rectangular" sx={{
                        display: 'block',
                        background: 'url()',
                        width: '100%',
                        paddingTop: '100%',
                    }} />
                </Box>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between',borderTop : '1px solid rgba(145, 147, 155, 0.3)' }}>
                    <Box>
                        <Skeleton animation="wave" variant="rectangular" sx={{
                            display: 'block',
                            width: '50px',
                            borderRadius : '25px'
                        }} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '7px', height: '21px', }}>
                        <Box sx={{ color: 'rgba(145, 147, 155, 1)' }}>
                            <Skeleton animation="wave" variant="rectangular" sx={{
                                display: 'block',
                                width: '25px',
                                borderRadius : '25px'
                            }} />
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
}
