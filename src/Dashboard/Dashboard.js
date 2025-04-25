import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Box,
  Breadcrumbs,
  Link,
  MenuItem,
  Tab,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectPermissions } from "container/selectPermissions";

// import { selectPermissions } from '../redux/Selectors/Permission.selector';
import { fetchUserPermissions } from 'container/UserRepository';
import { getUser } from '../services/auth';
import TransparentButton from '../utils/Buttons/TransparentButton/TransparentButton';
import Select from '../utils/Select/Select';
import Alert from '../components/Snackbar/Snackbar';
import Back from '../assets/svg/nextArrow.svg';
import CustomPopover from '../components/Popover/DashboardPopover';
import { setAlert, setAlertStatus } from '../redux/Actions/AlertActions';
import { fetchSupervisorShopsArea } from '../redux/Actions/RoleAccessActions';
import * as shopActions from '../redux/Actions/ShopActions';
import {
  getAlertMessage,
  getAlertStatus,
} from '../redux/Reducers/SMMAlertReducer';
import { getClassroomTabIndex } from '../redux/Reducers/SMMClassroomReducer';
import { getSupervisorAccessData } from '../redux/Reducers/SMMRoleAccessReducer';
import * as shopReducer from '../redux/Reducers/SMMShopReducer';
import ClassroomTrainingDashboard from './ClassroomTraining/ClassroomTraining';
import DepartmentHeadDashboard from './DepartmentHeadDashboard/DepartmentHeadDashboard';
import Master from './DepartmentHeadDashboard/Master/Master';
import BasicRequirement from './Dpm/components/BasicRequirement/bsicrequirement';
import DpmTabIndex from './Dpm/components/ShopDashboardTabs/tabIndex';
import useCalendar from './Dpm/hooks/calendarApi';
import useManpowerPlanningFilter from './Dpm/hooks/manpowerPlanningFilter';
import LineIncharge from './LineIncharge/lineIncharge';
import ManpowerPlanning from './PlantControl/ManpowerPlanning/ManpowerPlanning';
import PlanControlTabs from './PlantControl/PlanControlTabs/PlanControlTabs';
import QCTestMaster from './Quality Incharge/Master/Master';
import ReportDashboard from './Reports/ReportDashboard';
import ShiftIncharge from './ShiftIncharge/ShiftIncharge';
import useStyles from './styles';
import AreaDashboard from './SupervisorDashboard/AreaDashboard/AreaDashboard';
import Deployment from './SupervisorDashboard/Deployment/Deployment';
import useFetchSupervisorHierarchy from './SupervisorDashboard/hooks/fetchSupervisorHierarchy';
import JobTraining from './SupervisorDashboard/JobTraining/JobTraining';
import SkillMatrix from './SupervisorDashboard/SKillMatrix/SkillMatrix';
import SupervisorDashboard from './SupervisorDashboard/SupervisorDashboard';

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const sites = useSelector(shopReducer.getAllSites);
  const site = useSelector(shopReducer.getSite);
  const location = useSelector(shopReducer.getLocation);
  const plant = useSelector(shopReducer.getPlant);
  const shop = useSelector(shopReducer.getShop);
  const siteLoading = useSelector(shopReducer.getLoading);
  const alertMessage = useSelector(getAlertMessage);
  const isAlert = useSelector(getAlertStatus);
  const [selectedTab, setSelectedTab] = useState('1');
  const classroomTab = useSelector(getClassroomTabIndex);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);
  const [isSupervisor, setSupervisor] = useState(false);
  const [isDepartmentHead, setIsDepartmentHead] = useState(false);
  const classes = useStyles();
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const shopsForSmmSupervisor = useSelector(getSupervisorAccessData);
  const roles = useSelector(selectPermissions)?.ROLES || {};
  const permissions = roles['Smart Man Power'] || {};
  const classCoordinatorShops =
    permissions?.SMM_CLASSROOM_COORDINATOR?.ALLOWED_SHOP_IDS || [];
  const drmShops = permissions?.SMM_DPM?.ALLOWED_SHOP_IDS || [];
  const [TabIndexName, setTabIndexName] = useState([]);
  const [subLabel, setSubLabel] = useState(null);
  const [roleOptions, setRoleOptions] = useState([]);
  const { fetchManpowerFilter: fetchManpowerFilter } =
    useManpowerPlanningFilter();
  const { fetchCalendar: fetchCalendar } = useCalendar();
  const { dataHierarchy } = useFetchSupervisorHierarchy();
  useEffect(() => {
    if (shop?.id && (currentRole === 'PlantControl' || currentRole === 'Dpm')) {
      const payload = {
        plantId: currentRole === 'PlantControl' ? plant.id : null,
        shopId: currentRole === 'Dpm' ? shop.id : null,
      };
      fetchManpowerFilter(payload);
    }

    if (
      currentRole === 'Supervisor' &&
      Object.keys(shopsForSmmSupervisor).length &&
      shop?.id === shopsForSmmSupervisor?.roleAccess[0]?.shop_id
    ) {
      dispatch(
        shopActions.setShopDetails(
          site,
          location,
          plant,
          shop,
          shopsForSmmSupervisor?.roleAccess[0]?.subcategory,
          shopsForSmmSupervisor?.roleAccess[0]?.group,
          shopsForSmmSupervisor?.roleAccess[0]?.line,
          shopsForSmmSupervisor?.roleAccess[0]?.area
        )
      );
      dispatch(shopActions.changeFilterChangeStatus(true));
    }
  }, [shop, plant]);
  const handlepopperClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopperClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(fetchSupervisorShopsArea());
    fetchCalendar();
  }, []);
  useEffect(() => {
    if (!sites) {
      dispatch(shopActions.fetchAllSites());
    }
  }, [sites]);
  const getRolePermittedShops = (role) => {
    switch (role) {
      case 'Dpm':
        return findPermittedShop(sites, drmShops);
      case 'PlantControl':
        return findPermittedShop(sites, classCoordinatorShops);
      case 'Supervisor':
        let supervisorShop = [];
        if (Object.keys(shopsForSmmSupervisor).length) {
          supervisorShop = [`${shopsForSmmSupervisor?.roleAccess[0]?.shop_id}`];
        }
        return findPermittedShop(sites, supervisorShop); //TODO: FETCH DATA IN UseEffect and set
      default:
        return null;
    }
  };

  const findAllowedChecksheet = (roles) => {
    if (roles.includes('SMM_DPM')) {
      return 'Dpm';
    } else if (roles.includes('SMM_PLANT_CONTROLLER')) {
      return 'PlantControl';
    } else if (roles.includes('SMM_SUPERVISOR')) {
      return 'Supervisor';
    } else if (roles.includes('SMM_QUALITY_INCHARGE')) {
      return 'Qualityincharge';
    } else if (roles.includes('SMM_LINE_INCHARGE')) {
      return 'LineIncharge';
    } else if (roles.includes('SMM_SHIFT_INCHARGE')) {
      return 'ShiftIncharge';
    }
  };

  useEffect(() => {
    if (sites !== undefined) {
      if (sites.length > 0) {
        if (!location && !shop && !plant !== {} && !site !== {}) {
          dispatch(shopActions.setShopDetails(site, location, plant, shop));
        } else {
          var cred = getUser()?.username.split('\\');
          // if (cred === undefined) {
          //   setOpen(false);
          //   setPermissionsGot(false);
          // }
          if (cred) {
            let username;
            if (cred.length === 1) {
              username = cred[0];
            } else {
              username = cred[0] + '%5C' + cred[1];
            }

            fetchUserPermissions(username)
              .then((res) => {
                var permissions = res.data.response.role_permissions;
                localStorage.setItem('staffId', res?.data?.response?.id);
                localStorage.setItem(
                  'supervisorId',
                  res.data.response.username === 'skillsense_03'
                    ? 165719
                    : res.data.response.role_permissions[0]?.id
                );

                var items = Object.values(permissions).map(
                  (module) => module.resource
                );
                let currentChecksheet = findAllowedChecksheet(items);

                if (username === 'autovyn') {
                  setRoleOptions([
                    'Dpm',
                    'PlantControl',
                    'Supervisor',
                    'Qualityincharge',
                    'Classroomtraining',
                    'LineIncharge',
                    'ShiftIncharge',
                  ]);
                }

                onRoleSelect(currentChecksheet);

                // let shopObj1 = getRolePermittedShops(currentRole); //Fetching the current role shops
                let shopObj = getRolePermittedShops(currentChecksheet); //Fetching the current role shops

                dispatch(
                  shopActions.setShopDetails(
                    Object.values(site)?.length > 0 ? site : shopObj?.site,
                    Object.values(location)?.length > 0
                      ? location
                      : shopObj?.location,
                    Object.values(plant)?.length > 0 ? plant : shopObj?.plant,
                    Object.values(shop)?.length > 0 ? shop : shopObj?.shop
                  )
                );
              })
              .catch((err) => {
                console.error('ERROR', err);
              });
          }
        }
      }
    }
  }, [sites]);

  const getTabIndexName = (role) => {
    switch (role) {
      case 'Dpm':
        return ['SHOP DASHBOARD', 'BASIC REQUIREMENTS', 'REPORTS', 'MASTER'];
      case 'PlantControl':
        return ['PLANT DASHBOARD', 'MANPOWER PLANNING', 'REPORTS'];
      case 'Supervisor':
        return [
          'AREA DASHBOARD',
          'DEPLOYMENT',
          'ON THE JOB TRAINING',
          'SKILL MATRIX',
          'REPORTS',
        ];
      case 'Qualityincharge':
        return ['REPORTS', 'TEST MASTER'];
      case 'Classroomtraining':
        return ['Classroom Training'];
      default:
        return [''];
    }
  };

  const onRoleSelect = (role) => {
    setCurrentRole(role);
    localStorage.setItem('role', role);
    setTabIndexName(getTabIndexName(role));
  };
  const handleSiteChange = (site) => {
    dispatch(
      shopActions.setShopDetails(
        site,
        site?.locations[0],
        site?.locations[0]?.plants[0],
        site?.locations[0]?.plants[0]?.shops[0]
      )
    );
    dispatch(shopActions.changeFilterChangeStatus(true));
  };

  const handleLocationChange = (location) => {
    dispatch(
      shopActions.setShopDetails(
        site,
        location,
        location?.plants[0],
        location?.plants[0]?.shops[0]
      )
    );
    dispatch(shopActions.changeFilterChangeStatus(true));
  };

  const handlePlantChange = (plant) => {
    dispatch(
      shopActions.setShopDetails(site, location, plant, plant?.shops[0])
    );
    dispatch(shopActions.changeFilterChangeStatus(true));
  };

  const handleShopChange = (event) => {
    dispatch(
      shopActions.setShopDetails(site, location, plant, event.target.value)
    );
    dispatch(shopActions.changeFilterChangeStatus(true));
  };
  function findPermittedShop(sites, shopsPermitted) {
    for (let siteIndex = 0; siteIndex < sites.length; siteIndex++) {
      for (
        let locationIndex = 1;
        locationIndex < sites[siteIndex]?.locations.length;
        locationIndex++
      ) {
        for (
          let plantIndex = 0;
          plantIndex <
          sites[siteIndex]?.locations[locationIndex]?.plants.length;
          plantIndex++
        ) {
          for (
            let shopIndex = 0;
            shopIndex <
            sites[siteIndex]?.locations[locationIndex]?.plants[plantIndex]
              ?.shops.length;
            shopIndex++
          ) {
            let currentShop =
              sites[siteIndex]?.locations[locationIndex]?.plants[plantIndex]
                ?.shops[shopIndex];
            if (shopsPermitted.includes(String(currentShop.id))) {
              return {
                site: sites[siteIndex],
                location: sites[siteIndex]?.locations[locationIndex],
                plant:
                  sites[siteIndex]?.locations[locationIndex]?.plants[
                    plantIndex
                  ],
                shop: sites[siteIndex]?.locations[locationIndex]?.plants[
                  plantIndex
                ]?.shops[shopIndex],
              };
            }
          }
        }
      }
    }
    if (sites !== undefined) {
      return {
        site: sites[0],
        location: sites[0]?.locations[1],
        plant: sites[0]?.locations[1]?.plants[0],
        shop: sites[0]?.locations[1]?.plants[0]?.shops[0],
      };
    }
  }

  const getViewTabName = (index) => {
    switch (index) {
      case '1':
        return 'Area Dashboard';

      case '2':
        return 'Skill Matrix';

      default:
        return '';
    }
  };
  const getMainTabName = (index) => {
    switch (index) {
      case '1':
        return 'Shop Dashboard';

      case '2':
        return 'Basic Requirements';

      case '3':
        return 'Reports';

      case '4':
        return 'Master';

      default:
        return '';
    }
  };

  const getClasroomTab = (tab) => {
    switch (tab) {
      case '1':
        return 'Refresher Training';
      case '2':
        return 'New Joinee Training';
      case '3':
        return 'Department Change Training';
      default:
        return '';
    }
  };
  const getSupervisorTabName = (index) => {
    switch (index) {
      case '1':
        return 'Area Dashboard';

      case '2':
        return 'Deployment';

      case '3':
        return 'On The Job Training';

      case '4':
        return 'Skill Matrix';

      case '5':
        return 'Reports';

      default:
        return '';
    }
  };
  const getDpmTabName = (index) => {
    switch (index) {
      case '1':
        return 'Shop Dashboard';

      case '2':
        return 'Basic Requirements';

      case '3':
        return 'Reports';

      case '4':
        return 'Master';

      default:
        return '';
    }
  };
  const getPlanControlTabName = (index) => {
    switch (index) {
      case '1':
        return 'Plant Dashboard';

      case '2':
        return 'Manpower Planning';

      case '3':
        return 'Reports';

      default:
        return '';
    }
  };
  useEffect(() => {
    if (currentRole === 'Supervisor' || currentRole === 'Department Head') {
      setSelectedTab('1');
    } else {
      setSelectedTab('1');
    }
  }, [currentRole]);

  const getBreadCrumb = (mainTab) => {
    if (currentRole === 'Supervisor') {
      return mainTab === '3' ? (
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="Blue.main" href={'/SMM'}>
            {getSupervisorTabName(selectedTab)}
          </Link>
          <Typography color="Silver.dark">L0ToL3</Typography>
        </Breadcrumbs>
      ) : (
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="Silver.dark">
            {' '}
            {getSupervisorTabName(selectedTab)}
          </Typography>
        </Breadcrumbs>
      );
    } else if (currentRole === 'Dpm') {
      return (
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="Blue.main" href={'/SMM'}>
            {getDpmTabName(selectedTab)}
          </Link>
          {subLabel && <Typography>{subLabel}</Typography>}
        </Breadcrumbs>
      );
    } else if (currentRole === 'PlantControl') {
      return (
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="Blue.main" href={'/SMM'}>
            {getPlanControlTabName(selectedTab)}
          </Link>
          {subLabel && <Typography>{subLabel}</Typography>}
        </Breadcrumbs>
      );
    } else if (currentRole === 'Classroomtraining') {
      return (
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="Blue.main" href={'/SMM'}>
            {getClasroomTab(selectedTab)}
          </Link>
          {subLabel && <Typography>{subLabel}</Typography>}
        </Breadcrumbs>
      );
    } else if (
      currentRole === 'LineIncharge' ||
      currentRole === 'ShiftIncharge'
    ) {
      return (
        <Breadcrumbs aria-label="breadcrumb">
          {currentRole === 'LineIncharge' ? (
            <Link
              color="Blue.main"
              sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}
            >
              {' '}
              <span className="primaryText">OJT</span>
              {'>'}
              <span className="primaryText">New joinee Summmary</span>
              {'>'}
              <span className="secondaryText">L2 to L3</span>
            </Link>
          ) : (
            <Link
              color="Blue.main"
              sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}
            >
              {' '}
              <span className="primaryText">Shift incharge</span>
              {'>'}
              <span className="secondaryText">
                Multi Skilling Training Plan
              </span>
            </Link>
          )}
        </Breadcrumbs>
      );
    } else {
      return mainTab === '1' ? (
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="Blue.main" href={'/SMM'}>
            {getMainTabName(mainTab)}
          </Link>
        </Breadcrumbs>
      ) : (
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="Silver.dark">
            {' '}
            {getMainTabName(mainTab)}
          </Typography>
        </Breadcrumbs>
      );
    }
  };

  const currentLocation = useLocation();

  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
    setSubLabel(null);
    if (localStorage.getItem('isSupervisorDashboard')) {
      navigate();
    } else {
      const searchParams = new URLSearchParams(currentLocation.search);
      searchParams.set('tabName', TabIndexName[newValue - 1]);
      navigate({ search: searchParams.toString() });
    }
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(currentLocation.search);
    const tabLabel = searchParams.get('tabName');
    if (tabLabel) {
      const decodedTabLabel = decodeURIComponent(tabLabel).toLowerCase();
      const tabIndex = TabIndexName.indexOf(decodedTabLabel.toUpperCase()) + 1;
      if (tabIndex !== 0) {
        setSelectedTab(tabIndex.toString());
      }
    }
    setSubLabel(null);
  }, [TabIndexName]);

  const handleSubLabel = useCallback(
    (label) => {
      setSubLabel(label);
    },
    [setSubLabel]
  );

  const tabComponents = {
    'SHOP DASHBOARD': <DpmTabIndex sendLabelName={handleSubLabel} />,
    'BASIC REQUIREMENTS': <BasicRequirement />,
    REPORTS: <ReportDashboard />,
    MASTER: <Master />,
    'PLANT DASHBOARD': <PlanControlTabs sendLabelName={handleSubLabel} />,
    'MANPOWER PLANNING': <ManpowerPlanning />,
    'AREA DASHBOARD': <AreaDashboard />,
    DEPLOYMENT: <Deployment />,
    'ON THE JOB TRAINING': <JobTraining />,
    'SKILL MATRIX': <SkillMatrix />,
    'Classroom Training': <ClassroomTrainingDashboard />,
    'TEST MASTER': <QCTestMaster />,
  };

  const viewBtnTab = {
    'AREA DASHBOARD': <AreaDashboard />,
    'SKILL MATRIX': <SkillMatrix />,
  };
  const [localValue, setLocalValue] = useState(() => {
    return JSON.parse(localStorage.getItem('isSupervisorDashboard') || 'false');
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedValue = JSON.parse(
        localStorage.getItem('isSupervisorDashboard') || 'false'
      );
      setLocalValue(updatedValue);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleClickRemoveLocalStore = () => {
    setSelectedTab('1');
    localStorage.removeItem('isSupervisorDashboard');
    setLocalValue(false);
  };
  const newTabIndexName = ['AREA DASHBOARD', 'SKILL MATRIX'];

  const handleAlertClose = () => {
    dispatch(setAlert(''));
    dispatch(setAlertStatus(false));
  };
  return (
    <Box className={classes['outer-container']}>
      <Box className={classes['container-flex']} sx={{ minWidth: '90vw' }}>
        {localValue ? (
          <Breadcrumbs aria-label="breadcrumb">
            <p style={{ color: '#171C8F', display: 'flex', gap: '0.8rem' }}>
              <span>Shop Dashboard</span> <span>/</span>{' '}
              <span>Manpower Planning</span>
            </p>

            <Typography color="Silver.dark">
              {getViewTabName(selectedTab)}
            </Typography>
          </Breadcrumbs>
        ) : (
          getBreadCrumb(selectedTab, classroomTab)
        )}
        <Box
          sx={
            localValue ? { display: 'none' } : { display: 'flex', gap: '1rem' }
          }
        >
          <Box sx={{ minWidth: '17rem' }}>
            <Select
              label="Site"
              value={site}
              onChange={(event) => handleSiteChange(event.target.value)}
            >
              {sites?.map((option) => (
                <MenuItem key={option.id} value={option}>
                  {option.site_name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ minWidth: '20rem' }}>
            <Select
              label="Location"
              value={location}
              onChange={(event) => handleLocationChange(event.target.value)}
            >
              {site?.locations?.map(
                (
                  option //LOCATION EQUIVALENT TO DIVISION CLUSTER
                ) => (
                  <MenuItem key={option.id} value={option}>
                    {option.location_name}
                  </MenuItem>
                )
              )}
            </Select>
          </Box>
          <Box sx={{ minWidth: '12rem' }}>
            <Select
              label="Plant"
              value={plant}
              onChange={(event) => handlePlantChange(event.target.value)}
            >
              {location?.plants?.map(
                (
                  option //PLANT EQUIVALENT TO DIVISON
                ) => (
                  <MenuItem key={option.id} value={option}>
                    {option.plant_name}
                  </MenuItem>
                )
              )}
            </Select>
          </Box>
          <Box sx={{ minWidth: '12rem' }}>
            <Select label="Shop" value={shop} onChange={handleShopChange}>
              {currentRole === 'PlantControl' && (
                <MenuItem key={'All'} value="All">
                  All
                </MenuItem>
              )}
              {plant?.shops?.map(
                (
                  option //SHOP EQUIVALENT TO DEPT
                ) => (
                  <MenuItem key={option.id} value={option}>
                    {option.shop_name}
                  </MenuItem>
                )
              )}
            </Select>
          </Box>
          <Box className="custom-button">
            <TransparentButton
              disabled={siteLoading}
              onClick={handlepopperClick}
            >
              More
            </TransparentButton>
            <CustomPopover
              id={id}
              open={open}
              handleClose={handlePopperClose}
              anchorEl={anchorEl}
              onRoleSelect={onRoleSelect}
              currentRole={currentRole}
              roleOptions={roleOptions}
            />
          </Box>
        </Box>
      </Box>
      {currentRole === 'LineIncharge' ? (
        <LineIncharge />
      ) : currentRole === 'ShiftIncharge' ? (
        <ShiftIncharge />
      ) : (
        <>
          {isDepartmentHead ? (
            <DepartmentHeadDashboard
              selectedTab={selectedTab}
              handleChange={handleChange}
            />
          ) : isSupervisor ? (
            <SupervisorDashboard
              selectedTab={selectedTab}
              handleChange={handleChange}
            />
          ) : (
            <Box sx={{ mt: 2 }}>
              <Box sx={{ width: '100%' }}>
                <TabContext value={selectedTab}>
                  <Box sx={{ display: 'flex' }}>
                    <Box>
                      {localValue ? (
                        <div
                          style={{
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'center',
                            width: '100px',
                          }}
                        >
                          <button
                            onClick={handleClickRemoveLocalStore}
                            style={{ cursor: 'pointer' }}
                          >
                            <img src={Back} alt="Back" />
                          </button>
                          <h1>{dataHierarchy?.response?.area || ''}</h1>{' '}
                        </div>
                      ) : (
                        <Typography variant="h2">SKILLSENSE</Typography>
                      )}
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center',
                      }}
                    >
                      <TabList
                        onChange={handleChange}
                        aria-label="dialog-tabs"
                        value={selectedTab}
                        sx={{
                          '& button': {
                            borderBottom: '2px solid white',
                          },
                          '& .Mui-selected': {
                            borderBottomColor: 'blue',
                          },
                        }}
                      >
                        {localValue
                          ? newTabIndexName.map((tab, index) => (
                              <Tab
                                key={index}
                                label={tab}
                                value={(index + 1).toString()}
                              />
                            ))
                          : TabIndexName.map((tab, index) => (
                              <Tab
                                key={index}
                                label={tab}
                                value={(index + 1).toString()}
                              />
                            ))}
                      </TabList>
                    </Box>
                  </Box>
                  {localValue
                    ? newTabIndexName.map((tab, index) => (
                        <TabPanel key={index} value={(index + 1).toString()}>
                          {viewBtnTab[tab]}
                        </TabPanel>
                      ))
                    : TabIndexName.map((tab, index) => (
                        <TabPanel key={index} value={(index + 1).toString()}>
                          {tabComponents[tab]}
                        </TabPanel>
                      ))}
                </TabContext>
              </Box>
            </Box>
          )}
        </>
      )}
      <Alert
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={isAlert}
        onClose={handleAlertClose}
        message={alertMessage}
      />
    </Box>
  );
};
export default Dashboard;
