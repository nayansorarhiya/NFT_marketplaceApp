import React from "react";
import Container from '@mui/material/Container/Container';
import HeroSection from '../HeroSection';
import DataTable from "../DataTable";

function Body() {
    return (<>

        <Container sx={{ minHeight: '100vh' }} >
            <HeroSection />
            <DataTable></DataTable>
        </Container>

    </>);
}

export default Body;