import React from 'react'
import { alpha, Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { setFilterTiles } from '../../store/IndexSlice';

const FilterTilesCard = ({ data }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const FilterTiles = (useSelector((state) => state.Index.filtertiles));
    const popFilterData = (id) => {
        const popfilter = FilterTiles.filter((v) => {
            return v.id !== id;
        });
        dispatch(setFilterTiles(popfilter));
    }
    return (
        <Box sx={{ mt: 1, mr: 1, p: '4px', display: 'flex', border: '1px solid rgba(145, 147, 155, 0.3)', borderRadius: 1 }}>
            <Box>
                <Typography sx={{ cursor: 'initial',textTransform : 'capitalize', fontSize: '12px' }} color="text.secondary" >
                    {data.name}
                </Typography>
                <Typography sx={{ cursor: 'initial',textTransform : 'uppercase', fontSize: '12px', fontWeight: 700, color: alpha(theme.palette.primary.dark,0.7) }} >
                    {data.value}
                </Typography>
            </Box>
            <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}> <CloseIcon onClick={()=>popFilterData(data.id)} sx={{ cursor: 'pointer', width: '16px', height: '16px' }} /></Box>
        </Box>
    )
}
export default FilterTilesCard;
