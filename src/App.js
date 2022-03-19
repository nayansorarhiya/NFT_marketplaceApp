import React, { useState } from "react";
import Header from "./Header";
import Body from "./Body";
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
        main: '#485FE6',
        // dark: '#91939B',
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
        <Body></Body>
      </Paper>
    </ThemeProvider>
  </>
  );
}

export default App;
