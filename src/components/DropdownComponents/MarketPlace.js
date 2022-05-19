import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Accordion, AccordionDetails, AccordionSummary, alpha, Box, FormControlLabel, FormGroup, InputBase, styled, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';



const CheckboxComponents = styled(Checkbox)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `8px`,
        transition: theme.transitions.create('width'),
        width: '100%',
        borderRadius: '3px',
        border: '1px solid rgba(145, 147, 155, 0.3)',
        fontSize: '14px',
        lineHeigth: '18px'
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        // padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `8px`,
        // transition: theme.transitions.create('width'),
        borderRadius: '3px',
        border: '1px solid rgba(145, 147, 155, 0.3)',
        fontSize: '14px',
        lineHeigth: '18px'
    },
}));

const StyleAccordion = styled(Accordion)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    borderRadius: '3px',
    border: '1px solid rgba(145, 147, 155, 0.3)',
    fontSize: '14px',
    background: alpha(theme.palette.primary.main, 1)
}));

const TotalItems = styled(Box)`
    font-weight: 400;
    font-size: 14px;
    color: #91939B;
    line-height: 18px;
`

export default function MarketPlace(props) {
    const [expanded, setExpanded] = React.useState(false);
    const [filter, setFilter] = React.useState(true);
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded((!expanded));
    };
    return (
        <Box sx={{mt : 2}}>

            <StyleAccordion expanded={expanded} onChange={handleChange(true)} >
                {<Box sx={{ p: '12px', pl: '16px', pr: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} id="panel1a-header" aria-controls="panel1a-content">
                    {!expanded ? <Box onClick={handleChange(true)} sx={{ width: '100%' }}>
                        <Typography>{props.name}</Typography>
                    </Box> :
                        <Box>
                            <StyledInputBase placeholder='Search'></StyledInputBase>
                        </Box>}
                    <Box sx={{display : 'flex'}}>
                        {expanded === true && <SignalCellularAltRoundedIcon onClick={() => setFilter(!filter)}
                            sx={{ cursor: 'pointer', transform: filter ? 'scaleX(1)' : 'scaleX(-1)' }} />}
                        <ExpandMoreIcon onClick={handleChange(true)} sx={{ transform: !expanded ? 'rotate(0)' : 'rotate(180deg)' }} />
                    </Box>
                </Box>}
                <AccordionDetails sx={{ mt: 0 }}>
                    <Typography >

                        <FormGroup>
                            {(props.list).map((item) => {

                                return (<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <FormControlLabel control={<CheckboxComponents
                                        sx={{
                                            color: blue[800],
                                            '&.Mui-checked': {
                                                color: blue[600],
                                            },
                                        }}
                                    />} label={item.name} />
                                    <Box sx={{ display: 'flex', gap: '2px', maxWidth: '80px', overflow: 'hidden' }}>
                                        <TotalItems>{item.total}</TotalItems>
                                        <TotalItems>({item.percentage}%)</TotalItems>
                                    </Box>
                                </Box>)
                            })}

                        </FormGroup>
                    </Typography>
                </AccordionDetails>
            </StyleAccordion>

        </Box>


    );
}