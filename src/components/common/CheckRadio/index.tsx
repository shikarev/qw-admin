import {Box, Radio, RadioProps, styled} from "@mui/material";
import RadioCheck from "../../../assets/icons/outlined/radio_check.svg";

const RadioStyled = styled(Radio)(({}) => ({
    '&:hover': {
        backgroundColor: 'transparent',
    },
    '&.Mui-checked + .MuiFormControlLabel-label': {
        fontWeight: '600'
    },
    '& .MuiSvgIcon-root': {
        borderRadius: '50%',
        width: 18,
        height: 18,
    },
}))

const CheckRadio = (props: RadioProps) => {
    return (
        <RadioStyled
            disableRipple
            checkedIcon={
                <Box sx={{
                    display: 'inline',
                    backgroundColor: 'primary.main',
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${RadioCheck})`
                }}/>}
            {...props}
        />
    );
}

export default CheckRadio;
