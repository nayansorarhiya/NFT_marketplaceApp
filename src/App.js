import React, { useState } from "react";
import Header from "./components/pages/common/Header";
import Body from "./components/pages/Body";
import CollectionPage from "./components/pages/CollectionPage";
import Footer from "./components/pages/common/Footer";
import { Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
window.Buffer = window.Buffer || require("buffer").Buffer;

function App() {
  let val = localStorage.getItem('themeMode');
  val = val == null ? `false` : val;
  const [darkMode, setDarkMode] = useState(val === 'true');

  function modeChange() {
    localStorage.setItem('themeMode', !darkMode);
    setDarkMode(!darkMode);
  }

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        // main: '#2B2F41',
        main: "#161616",
        dark: '#485FE6',
        logo: '#FFFFFF',
        searchIcon: '#91939B',
        font: '#FFFFFF',
        buttonfont: '#FFFFFF',
        // homeBg: '#1E212E',
        homeBg: '#040404',
        tableHead: '#F8F8F8',
        footerIcon: '#F8F8F8',
        borderDrawer: '#343742',
      },
    },
    typography: {
      fontFamily: 'DMSans',
    }
  });

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#FFFFFF',
        dark: '#485FE6',
        logo: '#485FE6',
        searchIcon: '#91939B',
        font: '#1E212E',
        buttonfont: '#2B2F41',
        homeBg: '#F8F8F8',
        tableHead: '#1E212E',
        footerIcon: '#2B2F41',
        borderDrawer: '#D9DADC',
      },
    },
    typography: {
      fontFamily: 'DMSans',
    }
  });

  return (<>
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Paper sx={{ background: darkMode ? '#040404' : '#F8F8F8', pt: '60px' }}>
        <Header onClickTheme={modeChange}></Header>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Body />} />
            <Route path='/:contractAddress' element={<CollectionPage />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </Paper>
    </ThemeProvider>

  </>
  );
}

export default App;
