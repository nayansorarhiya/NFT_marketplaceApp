import React, { useEffect, useState } from "react";
import Header from "./components/pages/common/Header";
import Body from "./components/pages/Body";
import CollectionPage from "./components/pages/CollectionPage";
import { Main, ScrollToTop } from "./components/CustomStyles";
import Footer from "./components/pages/common/Footer";
import { Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfilePage from "./components/pages/ProfilePage";
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
        itemhover: 'rgba(53,57,69,1)',
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
        itemhover: 'rgba(244, 245, 246,1)',
      },
    },
    typography: {
      fontFamily: 'DMSans',
    }
  });
  const [cartwidth, setcartWidth] = useState(0);

  return (<>
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Paper sx={{ background: darkMode ? '#040404' : '#F8F8F8', pt: '60px' }}>
        <BrowserRouter>
          <Header onClickTheme={modeChange} setcartWidth={setcartWidth}></Header>
          <Main cartwidth={cartwidth}>
            <ScrollToTop />
            <Routes>
              <Route path='/*' element={<Body />} />
              <Route path='collection/:slug' element={<CollectionPage />} />
              <Route path='/profile' element={<ProfilePage />} />
            </Routes>
            <Footer />
          </Main>
        </BrowserRouter>
      </Paper>
    </ThemeProvider>

  </>
  );
}

export default App;
