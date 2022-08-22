import { Box, Button, Grid, Skeleton } from '@mui/material'
import React, { Suspense } from 'react'
// import NFTCard from '../card/NFTCard';
import FilterTilesCard from '../card/FilterTilesCard';
import { useDispatch, useSelector } from "react-redux";
import { setFilterTiles } from "../../store/IndexSlice";
import { styled, alpha, useTheme } from '@mui/material/styles';
// import NFTCard from '../card/NFTCard';
const NFTCard = React.lazy(() => import('../card/NFTCard'));


export default function NFTCollection(props) {
	const theme = useTheme();
	const dispatch = useDispatch();
	const FilterTiles = (useSelector((state) => state.Index.filtertiles));
	const showMoredata = () => {
		if (props.totalNFT.hasNext === true) {
			props.setApiFilter({ ...(props.apifilter), "offset": (props.apifilter.offset) + 30 })
		}
	}
	const clearAllfilterData = () => {
		dispatch(setFilterTiles([]))
	}
	return (
		<Box sx={{ p: '20px 20px 20px 20px', height: { md: '100vh', lg: '100vh' }, maxHeight: { md: '100vh', lg: '100vh' }, overflow: 'auto' }}>
			{/* {FilterTiles.length !== 0 && <><Box sx={{ display: 'flex', justifyContent: 'start', flexWrap: 'wrap', flexDirection: 'row' }}>
                    {
                        FilterTiles.map((value, index) => <FilterTilesCard key={index} data={value}></FilterTilesCard>)
                    }
                    <Box onClick={clearAllfilterData} sx={{ cursor : 'pointer', display: 'flex',alignItems : 'center', mt: 1, ml: 1, fontSize : '14px',fontWeight : 700 ,color : theme.palette.primary.dark}}>Clear all</Box>
                </Box>
                </>
                } */}
			{props.assetsdata.length !== 0 ?
				<Grid container spacing={2}>

					{
						(props.assetsdata).map((value, index) =>
							<>
								<Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center' }}>Loading...</Box>}>
									<NFTCard key={value.uid} apidata={value} rarityinput={props.rarityinput} buynowinput={props.buynowinput}></NFTCard>
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
	)
}
