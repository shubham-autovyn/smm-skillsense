import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Box, Paper } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPermissions } from "container/selectPermissions";
import Filter from '../../assets/icons/Filter.svg';
import FilterEnabled from '../../assets/icons/FilterEnabled.svg';
import RoundButton from '../../components/Buttons/RoundFilterButton/RoundFilterButton';
import NoReportsSelected from '../../components/NoDataViews/NoReportsSelected';
import Select from '../../components/Select/Select';
import {
  setAlertMessage,
  setIsAlert,
} from '../../redux/ActionCreator/AlertActionCreator';
import { getShop } from '../../redux/Reducers/SMMShopReducer';
import FourMData from './4M/4M';
import L0toL3Report from './L0toL3Report/L0toL3Report';
import NewOperator from './NewOperator/NewOperator';
import SkillMatrix from './SkillMatrix/SkillMatrix';
import StationWise from './StationWise/StationWise';
import TestEvaluationReport from './TestEvaluationReport/TestEvaluationReport';
import TestTemplateReport from './TestTemplateReport/TestTemplateReport';

const ReportDashboard = ({ isSupervisor, isDepartmentHead }) => {
  const dispatch = useDispatch();
  const [showFilters, setShowFilters] = useState(true);
  const [disableFilterButton, setDisableFilterButton] = useState(true);
  const [selectedReportType, setSelectedReportType] = useState('');
  const [filterCount, setFilterCount] = useState(0);
  const shop = useSelector(getShop);
  const [showContent, setShowContent] = useState(false);
  const [disableReport, setDisableReport] = useState(false);
  const roles = useSelector(selectPermissions)?.ROLES || {};
  const permissions = roles['Smart Man Power'] || {};
  const classCoordinatorShops =
    permissions?.SMM_CLASSROOM_COORDINATOR?.ALLOWED_SHOP_IDS || [];

  useEffect(() => {
    if (shop?.id) {
      if (classCoordinatorShops?.includes(String(shop?.id))) {
        setDisableReport(false);
      } else {
        setDisableReport(true);
        setSelectedReportType('');
        setDisableFilterButton(true);
        dispatch(setIsAlert(true));
        setShowFilters(true);
        dispatch(setAlertMessage("You don't have access to this shop"));
      }
    }
  }, [shop]);

  const getReportTypes = () => {
    if (isSupervisor) {
      return ['L0 to L3 OJT Records'];
    }
    if (isDepartmentHead) {
      return ['L0 to L3 OJT Records', 'Classroom Training Test Evaluations'];
    }
    return [
      'Classroom Training Test Paper Templates',
      'Classroom Training Test Evaluations',
      'Station Wise Operator Deployment',
      '4M',
      'Skill Matrix & Training',
      'New Operator Allocation',
    ];
  };

  const handleReportTypeChange = (type) => {
    setSelectedReportType(type);
    setDisableFilterButton(false);
    setShowFilters(true);
    setShowContent(false);
    setFilterCount(0);
  };

  const handleApplyFilters = () => {
    setShowFilters(false);
    setShowContent(true);
  };

  const updateFilterCount = (filters) => {
    const count =
      selectedReportType === 'Classroom Training Test Evaluations' ||
      selectedReportType === 'L0 to L3 OJT Records'
        ? Object.keys(filters).filter((v) =>
            Array.isArray(filters[v]) ? filters[v]?.length : filters[v]
          ).length
        : filters;
    setFilterCount(count);
  };

  const renderSelectedReport = (reportType) => {
    switch (reportType) {
      case 'Classroom Training Test Paper Templates':
        return (
          <TestTemplateReport
            showFilters={showFilters}
            updateFilterCount={updateFilterCount}
          />
        );
      case 'Classroom Training Test Evaluations':
        return (
          <TestEvaluationReport
            showFilters={showFilters}
            updateFilterCount={updateFilterCount}
            selectedReportType={'Classroom Training Test Evaluations'}
          />
        );
      case 'Station Wise Operator Deployment':
        return (
          <StationWise
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            updateFilterCount={updateFilterCount}
            handleApplyFilters={handleApplyFilters}
            selectedReportType={'Station Wise Operator Deployment'}
          />
        );
      case '4M':
        return (
          <FourMData
            showFilters={showFilters}
            updateFilterCount={updateFilterCount}
            handleApplyFilters={handleApplyFilters}
            selectedReportType={'4M'}
          />
        );
      case 'Skill Matrix & Training':
        return (
          <SkillMatrix
            showFilters={showFilters}
            updateFilterCount={updateFilterCount}
            handleApplyFilters={handleApplyFilters}
            selectedReportType={'Skill Matrix & Training'}
          />
        );
      case 'New Operator Allocation':
        return (
          <NewOperator
            showFilters={showFilters}
            updateFilterCount={updateFilterCount}
            handleApplyFilters={handleApplyFilters}
            selectedReportType={'New Operator Allocation'}
          />
        );

      case 'L0 to L3 OJT Records':
        return (
          <L0toL3Report
            showFilters={showFilters}
            updateFilterCount={updateFilterCount}
            selectedReportType={'L0 to L3 OJT Records'}
            isDepartmentHead={isDepartmentHead}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Fragment>
      <Paper sx={{ mb: 1.6, p: 1.6, display: 'flex', gap: '10px' }}>
        <Box sx={{ minWidth: '17rem', maxWidth: '48rem' }}>
          <Select
            defaultValue="Select"
            label="Report Type"
            value={selectedReportType}
            disabled={disableReport}
            onChange={(event) => handleReportTypeChange(event.target.value)}
            options={getReportTypes().map((type) => ({
              label: type,
              value: type,
            }))}
          />
        </Box>
        <Box>
          <RoundButton
            disabled={disableFilterButton}
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <img
                style={{
                  height: '12px',
                  width: '12px',
                }}
                alt="Filter"
                src={disableFilterButton ? Filter : FilterEnabled}
              />
              {`Filter ${filterCount ? `(${filterCount})` : ''}`}
              {showFilters ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </Box>
          </RoundButton>
        </Box>
      </Paper>
      <Box>
        {selectedReportType === '' ? (
          <Paper sx={{ mb: 1.6, p: 1.6 }}>
            <NoReportsSelected />
          </Paper>
        ) : (
          renderSelectedReport(selectedReportType)
        )}
      </Box>
    </Fragment>
  );
};
export default ReportDashboard;
