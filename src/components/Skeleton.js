import { Box, TableCell, TableRow } from '@mui/material'
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
