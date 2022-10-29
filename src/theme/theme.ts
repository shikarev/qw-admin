import QColors from './colors';
import shadows from '@mui/material/styles/shadows';
import { PaletteMode } from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {
    gradients: {
      main: string;
    },
    colors: {
      border: string,
      shadow: string,
      background: string,
    }
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    gradients?: {
      main?: string;
    },
    colors?: {
      border?: string,
      shadow?: string,
      background?: string,
    }
  }
}

// MUI palette colors:
// .palette.primary
// .palette.secondary
// .palette.error
// .palette.warning
// .palette.info
// .palette.success

export const getDesignTokens: any = (mode: PaletteMode) => ({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440
    }
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          color: QColors.primary,
          fontSize: '1.4rem',
          fontWeight: 600
        }
      }
    },
    // Buttons
    MuiPaginationItem: {
      styleOverrides: {
        root:{
          '&.Mui-selected:hover':{
            backgroundColor: QColors.primaryHover,
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          textTransform: 'none',
          boxShadow: 'none',
          padding: '1rem 3.2rem',
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
            color: QColors.primaryLight,
            borderColor: QColors.primaryLight,
          },
          borderWidth: 2,
          borderRadius: '4rem',
          '&:hover': {
            borderWidth: 2,
            boxShadow: 'none',
            backgroundColor: QColors.primaryHover,
            color: QColors.white,
          }
        },
        sizeMedium: {
          padding: '1rem 2rem',
          fontSize: '1.4rem',
          lineHeight: 1.2,
          fontWeight: '600'
        },
        outlined: {
          borderColor: QColors.primary,
        },
        containedPrimary: {
          '&.Mui-disabled': {
            backgroundColor: QColors.lightGray,
            color: QColors.white,
            borderColor: 'none',
          },
        }
      }
    },
    MuiIconButton:{
      styleOverrides: {
        root: {
          color: QColors.grayDark,
          '&.Mui-disabled': {
            color: QColors.lightGray,
          },
        },
        sizeSmall: {
          width: '4rem',
          height: '4rem',
          padding: '.8rem'
        }
      }
    },
    MuiFab:{
      styleOverrides:{
        sizeMedium: {
            width: '4.8rem',
            height: '4.8rem',
            borderRadius:'1.8rem',
            boxShadow: 'none'
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: 14,
          '&:placeholder': {
            color: QColors.blue
          }
        }
      }
    },
    MuiPaper:{
      styleOverrides:{
        root:{
          borderRadius: '2.4rem',
          borderWidth: '2px'
        }
      }
    },
    // TextFields
    MuiAutocomplete: {
      styleOverrides:{
        root: {
          padding: 0
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        // Name of the slot
        label:{
          fontSize: 14
        },
        root: {
          // Some CSS
          backgroundColor: QColors.grayLight,
          borderRadius: '1.6rem',
          fontSize: 16,

          '&:before':{
            content: 'none'
          },
          '&:after':{
            content: 'none'
          }
        },
      }
    },
    // TABS
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: '2px',
          backgroundColor: 'transparent',

          '&:after': {
            position: 'absolute',
            content: '" "',
            width: 'min(100%, 4.8rem)',
            height: '2px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: QColors.primary,
          },
        },
        flexContainer: {
          '& button':{
            color: QColors.textDark,
            fontWeight: 400,
            '&.Mui-selected':{
              color: QColors.textDark,
              fontWeight: 600
            }
          }
        }
      }
    },
    MuiPagination:{
      styleOverrides: {
        ul: {
          '& button':{
            fontSize: 14,
            fontWeight: 600,
            width: '36px',
            height: '36px',
            borderRadius: '15px',
            '& svg':{
              width: '24px',
              height: '24px',
            }
          }
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          minWidth: 72,
          fontWeight: 600,
          fontSize: '1.4rem',
          lineHeight: '1.6rem',
          color: QColors.grayDark,
          '&:hover': {
            color: QColors.primary,
            opacity: 1
          },
          '&$selected': {
            color: QColors.primary
          },
          '&:focus': {
            color: QColors.primary
          }
        }
      }
    },
    //Cards
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: 0,
        },
        avatar: {
          marginRight: '2rem',
          svg: {
            width: '4rem',
            height: '4rem',
            color: QColors.primary,
          }
        },
        title: {
          color: QColors.textDark,
          fontWeight: 600,
          fontSize: '2rem',
          lineHeight: '2.4rem',
          marginBottom: 2,
        },
        subheader: {
          color: QColors.grayDark,
          fontWeight: 500,
          fontSize: '1.4rem',
          lineHeight: '1.7rem',
        },
        action: {
          alignSelf: 'center',
          margin: 0,
        }
      }
    },

    //Items
    MuiListItemButton: {
      styleOverrides: {
        root: {
          //'&:not(:last-child)': { marginBottom: '.5rem' },
          padding: '1rem 2rem 1rem 2rem',
          borderRadius: '1.2rem',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 37,
          marginRight: 6,
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 17,
          fontWeight: 600,
          maxWidth: '10rem',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        },
        secondary: {
          fontSize: 14,
          fontWeight: 600,
          maxWidth: '14rem',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          overflow: 'hidden',
          webkitLineClamp: '2',
          webkitBoxOrient: 'vertical',
          color: QColors.textDark,
        }
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '2rem',
          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: '2px',
            borderColor: QColors.gray,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: QColors.primary,
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: QColors.green,
          },
        },
        input: {
          padding: '1.2rem 1.6rem',
        },
        inputMultiline: {
          padding: 0,
          minHeight: '8rem',
        },
      }
    },
  },
  spacing: 5,
  // @ts-ignore
  shadows: [...shadows, '0px 4px 32px 0px #00000014'],
  ...(mode === 'light' ?
    {
      gradients: {
        main: `linear-gradient(to left, ${QColors.white} 0%, transparent 70%) ,linear-gradient(150deg, #ffffff00 30%, #e47dd5 100%)`
      }
    } : {
      gradients: {
        main: `linear-gradient(to left, ${QColors.bgDark} 0%, transparent 70%) ,linear-gradient(166.65deg, #27273C -6.96%, #333144 7.17%, #332E3E 30.74%, #372A3C 60.25%, #16151D 99.67%)`
      }
    }),
  typography: {
    fontSize: 10,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Inter',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    allVariants: {
      fontSize: '12px'
    },
    body2: {
      fontSize: 14,
    },
    h6: {
      fontSize: 14,
      fontWeight: 600
    },
    h5: {
      fontSize: 16,
      fontWeight: 600,
    },
    h1: {
      fontSize: 34,
      fontWeight: 700,
      lineHeight: 1.2
    },
    h2: {
      fontSize: 17,
      fontWeight: 600
    },
    h3: {
      fontSize: 24,
      fontWeight: 600,
      lineHeight: 1.7
    }
  },
  ...(mode === 'light'
    ? {
      colors: {
        border: QColors.white50,
        shadow: QColors.white,
        background: QColors.white20
      }
    } : {
      colors: {
        border: QColors.white20,
        shadow: 'transparent',
        background: 'transparent'
      }
    }),

  // Used by `getContrastText()` to maximize the contrast between
  // the background and the text.
  contrastThreshold: 3,
  // Used by the functions below to shift a color's luminance by approximately
  // two indexes within its tonal palette.
  // E.g., shift from Red 500 to Red 300 or Red 700.
  tonalOffset: 0.2,
  action: {
    disabledBackground: QColors.primaryLight,
    disabled: QColors.white
  },
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        // palette values for light mode
        primary: {
          light: QColors.primaryLight,
          main: QColors.primary
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
          light: QColors.grayLight,
          main: QColors.gray,
          dark: QColors.grayDark
        },
        info: {
          main: QColors.blue20
        },
        text: {
          primary: QColors.textDark,
          secondary: QColors.grayDark
        },
        error: {
          main: QColors.error
        },
        success: {
          main: QColors.green,
          light: QColors.greenLight
        },
        warning: {
          main: QColors.yellow
        },
      }
      : {
        // palette values for dark mode
        primary: {
          light: QColors.primaryLight,
          main: QColors.primary
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
          light: QColors.grayLight,
          main: QColors.gray,
          dark: QColors.grayDark
        },
        info: {
          main: QColors.grayDark
        },
        text: {
          primary: QColors.white,
          secondary: QColors.white
        },
        error: {
          main: QColors.error
        },
        success: {
          light: QColors.greenLight,
          main: QColors.green
        },
        warning: {
          main: QColors.yellow
        }
      }),
    ...(mode === 'light'
      ? {
        background: {
          default: QColors.white
        }
      }
      :
      {
        background: {
          default: QColors.bgDark
        }
      })
  }
});