import React from "react";
import Container from '@mui/material/Container/Container';
import Typography from '@mui/material/Typography';

function Body() {
    return (<>
        <Container fixed >
            <Typography className="mainheading" sx={{mt : 15}}>
               Discover, Collect, and <br />
               Sell Extraordinary NFTs
            </Typography>
        </Container>
    </>);
}

export default Body;