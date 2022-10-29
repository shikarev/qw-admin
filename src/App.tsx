import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store";
import {Box, CssBaseline, ThemeProvider, useMediaQuery} from '@mui/material';
import {getDesignTokens} from './theme/theme';
import {createTheme} from '@mui/material/styles';
import MainPage from '../src/pages/main';
import Header from '../src/components/Header';
import Navbar from '../src/components/Navbar';
import './index.css'

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(
        () => createTheme(
            //getDesignTokens(prefersDarkMode ? 'dark' : 'light')
            getDesignTokens('light')
        ), [prefersDarkMode]);

    return (
        <BrowserRouter basename='admin'>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>

                    <Box sx={{display: 'flex', width: '100%', flexDirection: 'column', minHeight: '100vh'}}>
                        <Box sx={{display: 'flex'}}>
                            <Navbar/>
                            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                                <Header/>
                                <MainPage/>
                            </Box>
                        </Box>
                        <Box sx={{mt: 'auto', height: '4rem', width: '100%'}}/>
                    </Box>
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
