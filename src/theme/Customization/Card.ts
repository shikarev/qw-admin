import QColors from '../colors';

const overrides = {
  MuiCardHeader: {
    styleOverrides: {
      root: {

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
    }
  },
}

export { overrides }