import React from "react";
import Container from '@mui/material/Container/Container';
import HomeContent from './components/HomeContent';
import DataTable from "./components/DataTable";

function Body() {
    return (<>

        <Container fixed>
        <HomeContent /> 
        <DataTable></DataTable>
        </Container>

    </>);
}

export default Body;