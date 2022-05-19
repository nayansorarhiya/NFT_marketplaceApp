
import { styled, alpha} from '@mui/material/styles';
import Button from '@mui/material/Button/Button';


const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#485FE6',
    color: '#FFFFFF',
    textTransform: 'none',
    borderRadius: '3px',
    '&:hover,&:focus': {
        backgroundColor: alpha(theme.palette.primary.dark, 1),
    },
}));

export default CustomButton;