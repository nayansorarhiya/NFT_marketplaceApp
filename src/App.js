import React, { useState } from "react";
import Header from "./components/pages/common/Header";
import Body from "./components/pages/Body";
import Footer from "./components/pages/common/Footer";
import { Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { alpha, useTheme } from '@mui/material/styles';


function App() {
  // const theme = useTheme();
  let val = localStorage.getItem('themeMode');
  val = val == null ? `false` : val;
  const [darkMode, setDarkMode] = useState(val === 'true');

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#2B2F41',
        dark: '#485FE6',
        logo : '#FFFFFF',
        searchIcon: '#91939B',
        font: '#FFFFFF',
        buttonfont: '#FFFFFF',
        homeBg: '#1E212E',
        tableHead: '#F8F8F8',
        footerIcon : '#F8F8F8',
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
        logo : '#485FE6',
        searchIcon: '#91939B',
        font: '#1E212E',
        buttonfont: '#2B2F41',
        homeBg: '#F8F8F8',
        tableHead: '#1E212E',
        footerIcon : '#2B2F41',
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
        <Paper sx={{ background: darkMode ? '#1E212E' : '#F8F8F8', mt: '60px' }}>
          <Body></Body>
        </Paper>

        <Footer ></Footer>
      </Paper>
    </ThemeProvider>
  </>
  );
}

export default App;
