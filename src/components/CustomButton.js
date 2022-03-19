
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button/Button';


const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#485FE6',
    color: '#FFFFFF',
    textTransform: 'capitalize',
    borderRadius: '3px',
}));
export default CustomButton;