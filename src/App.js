import React, { useState } from "react";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import { Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';


function App() {
  let val = localStorage.getItem('themeMode');
  val = val == null ? `false` : val;
  const [darkMode, setDarkMode] = useState(val === 'true');

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#2B2F41',
        dark: '#485FE6',
        search: '#1E212E',
        searchIcon: '#91939B',
        font: '#FFFFFF',
        buttonfont: '#FFFFFF',
        homeBg :'#1E212E',
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
        search: '#F8F8F8',
        searchIcon: '#91939B',
        font: '#1E212E',
        buttonfont: '#2B2F41',
        homeBg :'#F8F8F8',
      },
    },
    typography: {
      fontFamily: 'DMSans',
    }
  });

  return (<>
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Paper>
        <Header onClickTheme={() => {
          localStorage.setItem('themeMode', !darkMode);
          setDarkMode(!darkMode);
        }}></Header>
        <Paper sx={{ background: darkMode ? '#1E212E' : '#F8F8F8' , mt: '60px' }}>
          <Body></Body>
          <Footer></Footer>
        </Paper>
      </Paper>
    </ThemeProvider>
  </>
  );
}

export default App;
