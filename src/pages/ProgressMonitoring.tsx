import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
} from '@mui/material';
import {
  Timeline as TimelineIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`progress-tabpanel-${index}`}
      aria-labelledby={`progress-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ProgressMonitoring: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Sample data for progress tracking
  const departmentProgress = [
    { department: 'Computer Science', total: 120, completed: 85, inProgress: 30, atRisk: 5 },
    { department: 'Mechanical', total: 95, completed: 65, inProgress: 25, atRisk: 5 },
    { department: 'Electrical', total: 80, completed: 50, inProgress: 25, atRisk: 5 },
    { department: 'Civil', total: 70, completed: 45, inProgress: 20, atRisk: 5 },
  ];

  const studentProgress = [
    { id: 'STU001', name: 'John Doe', department: 'Computer Science', internship: 'Web Development', startDate: '2023-01-15', endDate: '2023-06-15', progress: 85, status: 'On Track' },
    { id: 'STU002', name: 'Jane Smith', department: 'Mechanical', internship: 'Automotive Design', startDate: '2023-02-01', endDate: '2023-07-01', progress: 65, status: 'On Track' },
    { id: 'STU003', name: 'Robert Johnson', department: 'Electrical', internship: 'Power Systems', startDate: '2023-01-10', endDate: '2023-06-10', progress: 45, status: 'At Risk' },
    { id: 'STU004', name: 'Emily Davis', department: 'Civil', internship: 'Structural Engineering', startDate: '2023-03-01', endDate: '2023-08-01', progress: 30, status: 'On Track' },
    { id: 'STU005', name: 'Michael Wilson', department: 'Computer Science', internship: 'Data Science', startDate: '2023-02-15', endDate: '2023-07-15', progress: 75, status: 'On Track' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track':
        return theme.palette.success.main;
      case 'At Risk':
        return theme.palette.warning.main;
      case 'Completed':
        return theme.palette.info.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'On Track':
        return <CheckCircleIcon fontSize="small" />;
      case 'At Risk':
        return <WarningIcon fontSize="small" />;
      case 'Completed':
        return <CheckCircleIcon fontSize="small" />;
      default:
        return <PendingIcon fontSize="small" />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, color: theme.palette.text.primary, fontWeight: 600 }}>
        Progress Monitoring
      </Typography>

      <Paper sx={{ mb: 4, backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Department Overview" />
          <Tab label="Student Progress" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {departmentProgress.map((dept) => (
              <Grid item xs={12} md={6} key={dept.department}>
                <Card sx={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.primary }}>
                      {dept.department}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                        Total Internships: {dept.total}
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={(dept.completed / dept.total) * 100} 
                        sx={{ 
                          height: 10, 
                          borderRadius: 5,
                          backgroundColor: theme.palette.background.default,
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: theme.palette.success.main,
                          }
                        }} 
                      />
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" sx={{ color: theme.palette.success.main }}>
                            {dept.completed}
                          </Typography>
                          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            Completed
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" sx={{ color: theme.palette.warning.main }}>
                            {dept.inProgress}
                          </Typography>
                          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            In Progress
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" sx={{ color: theme.palette.error.main }}>
                            {dept.atRisk}
                          </Typography>
                          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            At Risk
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 3 }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="department-filter-label">Filter by Department</InputLabel>
              <Select
                labelId="department-filter-label"
                value={departmentFilter}
                label="Filter by Department"
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <MenuItem value="all">All Departments</MenuItem>
                <MenuItem value="Computer Science">Computer Science</MenuItem>
                <MenuItem value="Mechanical">Mechanical</MenuItem>
                <MenuItem value="Electrical">Electrical</MenuItem>
                <MenuItem value="Civil">Civil</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: theme.palette.text.secondary }}>Student ID</TableCell>
                  <TableCell sx={{ color: theme.palette.text.secondary }}>Name</TableCell>
                  <TableCell sx={{ color: theme.palette.text.secondary }}>Department</TableCell>
                  <TableCell sx={{ color: theme.palette.text.secondary }}>Internship</TableCell>
                  <TableCell sx={{ color: theme.palette.text.secondary }}>Duration</TableCell>
                  <TableCell sx={{ color: theme.palette.text.secondary }}>Progress</TableCell>
                  <TableCell sx={{ color: theme.palette.text.secondary }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentProgress
                  .filter(student => departmentFilter === 'all' || student.department === departmentFilter)
                  .map((student) => (
                    <TableRow key={student.id}>
                      <TableCell sx={{ color: theme.palette.text.primary }}>{student.id}</TableCell>
                      <TableCell sx={{ color: theme.palette.text.primary }}>{student.name}</TableCell>
                      <TableCell sx={{ color: theme.palette.text.primary }}>{student.department}</TableCell>
                      <TableCell sx={{ color: theme.palette.text.primary }}>{student.internship}</TableCell>
                      <TableCell sx={{ color: theme.palette.text.primary }}>
                        {student.startDate} - {student.endDate}
                      </TableCell>
                      <TableCell sx={{ color: theme.palette.text.primary }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ width: '100%', mr: 1 }}>
                            <LinearProgress 
                              variant="determinate" 
                              value={student.progress} 
                              sx={{ 
                                height: 8, 
                                borderRadius: 4,
                                backgroundColor: theme.palette.background.default,
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: getStatusColor(student.status),
                                }
                              }} 
                            />
                          </Box>
                          <Box sx={{ minWidth: 35 }}>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                              {`${Math.round(student.progress)}%`}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getStatusIcon(student.status)}
                          label={student.status}
                          size="small"
                          sx={{ 
                            backgroundColor: `${getStatusColor(student.status)}20`,
                            color: getStatusColor(student.status),
                            borderColor: getStatusColor(student.status),
                            borderWidth: 1,
                            borderStyle: 'solid',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default ProgressMonitoring; 