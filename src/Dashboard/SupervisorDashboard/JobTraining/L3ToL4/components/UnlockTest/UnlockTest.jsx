import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    DialogContent,
    DialogTitle,
    IconButton,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import SecondaryButton from '../../../../../../../Utilities/Buttons/SecondaryButton/SecondaryButton';
import CommonRadio from '../../../../../../components/RadioBtn/RadioBtn';
import { BootstrapDialog } from './UnlockTest.style';

const TestDialogs = ({ open, handleClose, rowData, handleFormData }) => {
    const methods = useForm({
        defaultValues: {
            Q1: 'OK',
            Q1_remarks: '',
            Q2: 'OK',
            Q2_remarks: '',
            staffId: rowData?.staff,
        },
    });
    const { handleSubmit, control, register, watch } = methods;
    const [formValues, setFormValues] = React.useState({});

    const onSubmit = (data) => {
        if (data) {
            setFormValues(data);
            handleFormData(data);
            handleClose();
        }
    };

    const options = [
        { value: 'OK', label: 'OK', color: 'sucess' },
        { value: 'NG', label: 'NG' },
        { value: 'NA', label: 'NA' },
    ];
    const q1Value = watch('Q1');
    const q2Value = watch('Q2');

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            maxWidth="md"
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: 1 }} id="customized-dialog-title">
                <p
                    style={{
                        fontStyle: 'Roboto Semibold / 16',
                        fontFamily: 'Roboto',
                        fontSize: '16px',
                        fontWeight: '600',
                        lineHeight: '20px',
                        letterSpacing: '-0.025em',
                        textAlign: 'left',
                        textUnderlinePosition: 'from-font',
                        textDecorationSkipInk: 'none',
                        margin: '2px',
                    }}
                >
                    Unlock L4 Test
                </p>
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                }}
            >
                <CloseIcon />
            </IconButton>

            <DialogContent>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        border: '1px solid #E6E9F0',
                        borderRadius: '8px',
                        backgroundColor: '#E6E9F0',
                        gap: '12px',
                        padding: '0px 16px 0px 16px',
                    }}
                >
                    <p
                        style={{
                            gap: '8px',
                            opacity: '0px',
                            fontSize: '16px',
                            fontWeight: '600',
                            lineHeight: '20px',
                            letterSpacing: '-0.025em',
                            margin: '10px',
                        }}
                    >
                        {rowData.name} ({rowData.staff})
                    </p>

                    <span
                        style={{
                            lineHeight: '16px',
                            fontWeight: '400',
                            color: '#66696B',
                            justifyContent: 'space-between',
                            display: 'flex',
                        }}
                    >
                        <span
                            style={{
                                border: '1px solid #374957',
                                borderRadius: '50%',
                                width: '25px',
                                height: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '6px',
                                fontSize: '14px',
                            }}
                        >
                            {rowData.processStation.evaluation}{' '}
                        </span>
                        <span
                            style={{
                                fontSize: '14px',
                                fontWeight: '400',
                                lineHeight: '16px',
                                letterSpacing: '-0.025em',
                            }}
                        >
                            {rowData.processStation.firstName} {'|'}{' '}
                            {rowData.processStation.lastName}
                        </span>
                    </span>
                </div>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Typography
                            variant="h3"
                            style={{
                                padding: '0px 16px 0px 16px',
                                gap: '16px',
                                color: '#343536',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '14px',
                                    textAlign: 'left',
                                }}
                            >
                                <p style={{ margin: '8px' }}>Q1.</p>
                                <p style={{ margin: '8px' }}>
                                    Operator able to catch or Solve
                                    defect/problem of the assigned station?
                                </p>
                            </div>
                            <div style={{ marginLeft: '32px', gap: '16px' }}>
                                <CommonRadio
                                    name="Q1"
                                    control={control}
                                    options={options}
                                />

                                <p
                                    style={{
                                        color: '#7A7C7E',
                                        margin: '8px',
                                    }}
                                >
                                    Observation Remarks
                                    {q1Value === 'NG' && (
                                        <span style={{ color: 'red' }}>
                                            (mandatory)
                                        </span>
                                    )}
                                </p>
                                <Box
                                    sx={{
                                        width: 772,
                                        maxWidth: '100%',
                                        gap: '0px',
                                        borderRadius: '4px 0px 0px 0px',
                                        border: '1px 0px 0px 0px',
                                        height: '(32px)px !fixed',
                                    }}
                                >
                                    <TextField
                                        placeholder="Enter observation remarks"
                                        {...register('Q1_remarks')}
                                        size="large"
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{
                                            style: {
                                                height: 32,
                                            },
                                        }}
                                    />
                                </Box>
                            </div>
                        </Typography>
                        <hr style={{ marginTop: '20px' }} />

                        <Typography
                            variant="h3"
                            style={{
                                padding: '0px 16px 0px 16px',
                                gap: '16px',
                                color: '#343536',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '14px',
                                    textAlign: 'left',
                                }}
                            >
                                <p style={{ margin: '8px' }}>Q2.</p>
                                <p style={{ margin: '8px' }}>
                                    Operator able to communicate or explain
                                    (WIS/MOS etc.) to others?{' '}
                                </p>
                            </div>
                            <div style={{ marginLeft: '32px', gap: '16px' }}>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <CommonRadio
                                        name="Q2"
                                        control={control}
                                        options={options}
                                    />
                                </RadioGroup>
                                <p
                                    style={{
                                        color: '#7A7C7E',
                                        margin: '8px',
                                    }}
                                >
                                    Observation Remarks
                                    {q2Value === 'NG' && (
                                        <span style={{ color: 'red' }}>
                                            (mandatory)
                                        </span>
                                    )}
                                </p>
                                <Box
                                    sx={{
                                        width: 772,
                                        maxWidth: '100%',
                                        gap: '0px',
                                        borderRadius: '4px 0px 0px 0px',
                                        border: '1px 0px 0px 0px',
                                        height: '(32px)px !fixed',
                                    }}
                                >
                                    <TextField
                                        placeholder="earch Staff ID, Name"
                                        {...register('Q2_remarks')}
                                        size="large"
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{
                                            style: {
                                                height: 32,
                                            },
                                        }}
                                    />
                                </Box>
                            </div>
                        </Typography>
                        <hr style={{ marginTop: '20px' }} />
                        <div
                            style={{
                                justifyContent: 'end',
                                display: 'flex',
                                gap: '10px',
                                padding: '10px 0px 0px 0px',
                            }}
                        >
                            <div>
                                <SecondaryButton
                                    onClick={handleClose}
                                    bgColor="none"
                                >
                                    Cancle
                                </SecondaryButton>
                            </div>
                            <div>
                                <button
                                    style={{
                                        padding: '4px 16px',
                                        backgroundColor: 'transparent',
                                        color: '#171C8F',
                                        border: '0.5px solid #171C8F',
                                        borderRadius: '3px',
                                        fontSize: '12px',
                                        cursor: 'pointer',
                                    }}
                                    type="submit"
                                >
                                    Unlock L4 Test
                                </button>
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </DialogContent>
        </BootstrapDialog>
    );
};
export default TestDialogs;
