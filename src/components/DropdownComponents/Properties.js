import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Accordion, AccordionDetails, AccordionSummary, alpha, Box, FormControlLabel, FormGroup, InputBase, styled, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



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

export default function Properties() {


    return (
        <div>

            <StyleAccordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Background</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ mt: 0 }}>
                    <Typography >
                        <Box>
                            <StyledInputBase placeholder='Search'></StyledInputBase>

                        </Box>
                        <FormGroup>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <FormControlLabel control={<CheckboxComponents
                                    sx={{
                                        color: blue[800],
                                        '&.Mui-checked': {
                                            color: blue[600],
                                        },
                                    }}
                                />} label="Purple" />
                                <Box sx={{ display: 'flex', gap: '2px' }}>
                                    <TotalItems>1290</TotalItems>
                                    <TotalItems>(12.90%)</TotalItems>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <FormControlLabel control={<CheckboxComponents
                                    sx={{
                                        color: blue[800],
                                        '&.Mui-checked': {
                                            color: blue[600],
                                        },
                                    }}
                                />} label="Yellow" />
                                <Box sx={{ display: 'flex', gap: '2px' }}>
                                    <TotalItems>1283</TotalItems>
                                    <TotalItems>(12.83%)</TotalItems>
                                </Box>
                            </Box>
                        </FormGroup>
                    </Typography>
                </AccordionDetails>
            </StyleAccordion>

        </div>


    );
}
