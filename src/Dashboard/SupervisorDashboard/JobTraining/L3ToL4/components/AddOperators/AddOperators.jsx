import { Backdrop, Box, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import DeleteIcon from '../../../../../../../SMM/assets/icons/Delete.svg';
import SecondaryButton from '../../../../../../../Utilities/Buttons/SecondaryButton/SecondaryButton';
import PrimaryButton from '../../../../../../components/PrimaryButton/PrimaryButton';
import SelectBox from '../../../../../../components/Select/Select';
import useAddOperator from '../../../../hooks/addOperator';
import useFetchSkillOperators from '../../../../hooks/fetchSkillOperator';
import useFetchSkillStations from '../../../../hooks/fetchSkillStation';

// Validation schema for each row
const validationSchema = Yup.object().shape({
  rows: Yup.array().of(
    Yup.object().shape({
      operator: Yup.string().required('Operator is required'),
      station: Yup.string().required('Station is required'),
    })
  ),
});

export const AddOperators = ({ closeDialog }) => {
  const [rows, setRows] = useState([
    { operator: '', station: '' }, // Initial row
  ]);
  const [skillOperatorData, setSkillOperatorData] = useState([]);
  const [skillStationData, setSkillStationData] = useState([]);
  const [multiSkillData, setMultiSkillData] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state

  const { dataSkillOperators, fetchSkillOperators } = useFetchSkillOperators();
  const { dataSkillStations, fetchSkillStation } = useFetchSkillStations();
  const { addOperator } = useAddOperator();
  const supervisorId = localStorage.getItem('supervisorId');

  const formik = useFormik({
    initialValues: { rows },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true); // Set loading to true before starting the API call
      const operators = values?.rows?.map((res) => ({
        staffId: res?.operator,
        staffName: skillOperatorData?.find(
          (val) => val?.value === res?.operator
        )?.label,
        stationName: skillStationData
          ?.find((val) => val?.label === res?.station)
          ?.label.replace(/\n|\r/g, ''),
        maruAAr: skillStationData?.find((val) => val?.label === res?.station)
          ?.maru_a_ar,
        description: skillStationData?.find(
          (val) => val?.label === res?.station
        )?.description,
      }));

      const payload = {
        supervisorId: 155217,
        operators,
      };

      try {
        const response = await addOperator(payload);

        if (response?.status === 200) {
          formik.resetForm();
          setRows([{ operator: '', station: '' }]);
        } else {
          console.error('API call failed:', response.operator);
        }
      } catch (error) {
        console.error('Error during API call:', error);
      } finally {
        setLoading(false); // Set loading to false after the API call is complete
      }
    },
  });

  const addRow = () => {
    const updatedRows = [...formik.values.rows, { operator: '', station: '' }];
    setRows(updatedRows);
    formik.setFieldValue('rows', updatedRows);
  };

  const removeRow = (index) => {
    const updatedRows = formik.values.rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    formik.setFieldValue('rows', updatedRows);
  };

  const handleSelectOperator = useCallback(
    async (index, value) => {
      try {
        setLoading(true); // Set loading to true when fetching stations
        const staffId = value;
        const params = `staffId=${staffId}`;
        formik.setFieldValue(`rows.${index}.operator`, value);

        const response = await fetchSkillStation(params);
        console.log(response, 'response');

        if (response?.data?.responseCode === 200) {
          const stationOptions = response?.data?.response.map((station) => ({
            label: station?.station_name,
            value: station?.station_name,
            maru_a_ar: station?.maruAAr,
            stationName: station?.stationName,
            description: station?.description,
          }));

          setSkillStationData(stationOptions);
          formik.setFieldValue(`rows.${index}.station`, '');
        } else {
          setSkillStationData([]);
          formik.setFieldValue(`rows.${index}.station`, '');
        }
      } catch (error) {
        console.error('Error fetching stations:', error);
        setSkillStationData([]);
        formik.setFieldValue(`rows.${index}.station`, '');
      } finally {
        setLoading(false); // Set loading to false after fetching stations
      }
    },
    [dataSkillStations]
  );

  const isButtonDisabled = useCallback(() => {
    return formik.values.rows.every((row) => !row.operator && !row.station);
  }, [formik.values.rows]);

  useEffect(() => {
    const fetchSkillOperator = async () => {
      try {
        setLoading(true); // Set loading to true when fetching operators
        const params = `supervisorId=${supervisorId}`;
        const response = await fetchSkillOperators(params);
        console.log(response);
        if (response?.data?.responseCode === 200) {
          const modifiedResponse = response?.data?.response?.map((val) => ({
            label: val?.staffName,
            value: val?.staffId,
          }));
          setSkillOperatorData(modifiedResponse);
        }
        setLoading(false);
      } catch (error) {
        setSkillOperatorData([]);
        return;
      } finally {
        // Set loading to false after fetching operators
      }
    };
    fetchSkillOperator();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading} // Use the defined loading state
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div style={{ padding: '16px' }}>
        {rows.map((row, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '10px',
              alignItems: 'center',
            }}
          >
            <div style={{ width: index > 0 ? '47%' : '45%' }}>
              <label
                htmlFor={`rows.${index}.operator`}
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  lineHeight: '16px',
                  letterSpacing: '-0.025em',
                  color: '#7A7C7E',
                }}
              >
                Operator
              </label>
              <SelectBox
                id={`rows.${index}.operator`}
                options={skillOperatorData} // Add your operator options here
                onChange={(e) => handleSelectOperator(index, e?.target?.value)}
                subLabel={''}
                label="Select"
                value={formik.values.rows[index]?.operator}
                width="100%"
                style={{
                  padding: '4px 8px 4px 12px',
                  gap: '0px',
                  borderRadius: '4px 0px 0px 0px',
                }}
              ></SelectBox>
              {formik.touched.rows?.[index]?.operator &&
                formik.errors.rows?.[index]?.operator && (
                  <div style={{ color: 'red', fontSize: '10px' }}>
                    {formik.errors.rows[index].operator}
                  </div>
                )}
            </div>
            <div style={{ width: index > 0 ? '47%' : '45%' }}>
              <label
                htmlFor={`rows.${index}.station`}
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  lineHeight: '16px',
                  letterSpacing: '-0.025em',
                  color: '#7A7C7E',
                }}
              >
                Applicable Station
              </label>
              <SelectBox
                id={`rows.${index}.station`}
                options={skillStationData} // Add your station options here
                onChange={(e) =>
                  formik.setFieldValue(`rows.${index}.station`, e.target.value)
                }
                disabled={skillOperatorData?.length ? false : true}
                subLabel={''}
                label="Select"
                value={formik.values.rows[index]?.station}
                width="100%"
                style={{
                  padding: '4px 8px 4px 12px',
                  gap: '0px',
                  borderRadius: '4px 0px 0px 0px',
                }}
              ></SelectBox>
              {formik.touched.rows?.[index]?.station &&
                formik.errors.rows?.[index]?.station && (
                  <div style={{ color: 'red', fontSize: '10px' }}>
                    {formik.errors.rows[index].station}
                  </div>
                )}
            </div>
            {index > 0 && (
              <div style={{ width: '6%' }}>
                <button
                  onClick={() => removeRow(index)}
                  style={{
                    marginTop: '22px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <img src={DeleteIcon} alt="" />
                </button>
              </div>
            )}
          </div>
        ))}
        <div style={{ marginTop: '10px', width: '45%' }}>
          <SecondaryButton onClick={addRow} style={{ marginRight: '10px' }}>
            Add Another Operator
          </SecondaryButton>
        </div>
        <hr style={{ marginTop: '10px' }} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            marginTop: '10px',
          }}
        >
          <Box>
            <SecondaryButton onClick={closeDialog}>Cancel</SecondaryButton>
          </Box>
          <Box>
            <PrimaryButton disabled={isButtonDisabled()} type="submit">
              Add Operators
            </PrimaryButton>
          </Box>
        </div>
      </div>
    </form>
  );
};

export default AddOperators;
