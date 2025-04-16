import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  useTheme,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  Assessment as AssessmentIcon,
  Timeline as TimelineIcon,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
} from '@mui/icons-material';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';

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
      id={`report-tabpanel-${index}`}
      aria-labelledby={`report-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Reports: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  // Sample data for charts
  const applicationData = [
    { department: 'Computer Science', applications: 45, accepted: 30, rejected: 15 },
    { department: 'Mechanical', applications: 30, accepted: 20, rejected: 10 },
    { department: 'Electrical', applications: 25, accepted: 15, rejected: 10 },
    { department: 'Civil', applications: 20, accepted: 12, rejected: 8 },
  ];

  const statusData = [
    { id: 'Completed', value: 35 },
    { id: 'In Progress', value: 25 },
    { id: 'Pending', value: 20 },
    { id: 'On Hold', value: 15 },
  ];

  const timelineData = [
    {
      id: 'Applications',
      data: [
        { x: 'Jan', y: 10 },
        { x: 'Feb', y: 15 },
        { x: 'Mar', y: 20 },
        { x: 'Apr', y: 25 },
        { x: 'May', y: 30 },
      ],
    },
    {
      id: 'Acceptances',
      data: [
        { x: 'Jan', y: 5 },
        { x: 'Feb', y: 8 },
        { x: 'Mar', y: 12 },
        { x: 'Apr', y: 15 },
        { x: 'May', y: 18 },
      ],
    },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
          Reports & Analytics
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{
              color: theme.palette.text.secondary,
              borderColor: theme.palette.divider,
              '&:hover': {
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
              },
            }}
          >
            Export
          </Button>
          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            sx={{
              color: theme.palette.text.secondary,
              borderColor: theme.palette.divider,
              '&:hover': {
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
              },
            }}
          >
            Print
          </Button>
          <Button
            variant="contained"
            startIcon={<ShareIcon />}
            onClick={handleOpenDialog}
            sx={{
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Share Report
          </Button>
        </Box>
      </Box>

      <Paper sx={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            borderBottom: `1px solid ${theme.palette.divider}`,
            '& .MuiTab-root': {
              color: theme.palette.text.secondary,
              '&.Mui-selected': {
                color: theme.palette.primary.main,
              },
            },
          }}
        >
          <Tab icon={<AssessmentIcon />} label="Overview" />
          <Tab icon={<TimelineIcon />} label="Timeline" />
          <Tab icon={<PieChartIcon />} label="Distribution" />
          <Tab icon={<BarChartIcon />} label="Analytics" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 2 }}>
                    Application Status
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsivePie
                      data={statusData}
                      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                      innerRadius={0.5}
                      padAngle={0.7}
                      cornerRadius={3}
                      activeOuterRadiusOffset={8}
                      colors={{ scheme: 'nivo' }}
                      borderWidth={1}
                      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                      arcLinkLabelsSkipAngle={10}
                      arcLinkLabelsTextColor={theme.palette.text.secondary}
                      arcLinkLabelsThickness={2}
                      arcLinkLabelsColor={{ from: 'color' }}
                      arcLabelsSkipAngle={10}
                      arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                      legends={[
                        {
                          anchor: 'bottom',
                          direction: 'row',
                          justify: false,
                          translateX: 0,
                          translateY: 56,
                          itemsSpacing: 0,
                          itemWidth: 100,
                          itemHeight: 18,
                          itemTextColor: theme.palette.text.secondary,
                          itemDirection: 'left-to-right',
                          itemOpacity: 1,
                          symbolSize: 18,
                          symbolShape: 'circle',
                        },
                      ]}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 2 }}>
                    Department-wise Applications
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveBar
                      data={applicationData}
                      keys={['accepted', 'rejected']}
                      indexBy="department"
                      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                      padding={0.3}
                      valueScale={{ type: 'linear' }}
                      colors={{ scheme: 'nivo' }}
                      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                      axisTop={null}
                      axisRight={null}
                      axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Department',
                        legendPosition: 'middle',
                        legendOffset: 32,
                      }}
                      axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Applications',
                        legendPosition: 'middle',
                        legendOffset: -40,
                      }}
                      labelSkipWidth={12}
                      labelSkipHeight={12}
                      legends={[
                        {
                          dataFrom: 'keys',
                          anchor: 'bottom-right',
                          direction: 'column',
                          justify: false,
                          translateX: 120,
                          translateY: 0,
                          itemsSpacing: 2,
                          itemWidth: 100,
                          itemHeight: 20,
                          itemDirection: 'left-to-right',
                          itemOpacity: 0.85,
                          symbolSize: 20,
                        },
                      ]}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Card sx={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 2 }}>
                Application Timeline
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveLine
                  data={timelineData}
                  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                  xScale={{ type: 'point' }}
                  yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Month',
                    legendOffset: 36,
                    legendPosition: 'middle',
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Count',
                    legendOffset: -40,
                    legendPosition: 'middle',
                  }}
                  pointSize={10}
                  pointColor={{ theme: 'background' }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: 'serieColor' }}
                  pointLabelYOffset={-12}
                  useMesh={true}
                  legends={[
                    {
                      anchor: 'bottom-right',
                      direction: 'column',
                      justify: false,
                      translateX: 100,
                      translateY: 0,
                      itemsSpacing: 0,
                      itemDirection: 'left-to-right',
                      itemWidth: 80,
                      itemHeight: 20,
                      itemOpacity: 0.75,
                      symbolSize: 12,
                      symbolShape: 'circle',
                    },
                  ]}
                />
              </Box>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 2 }}>
                    Detailed Statistics
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>Department</TableCell>
                          <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>Total Applications</TableCell>
                          <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>Accepted</TableCell>
                          <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>Rejected</TableCell>
                          <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>Acceptance Rate</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {applicationData.map((row) => (
                          <TableRow key={row.department}>
                            <TableCell sx={{ color: theme.palette.text.primary }}>{row.department}</TableCell>
                            <TableCell sx={{ color: theme.palette.text.secondary }}>{row.applications}</TableCell>
                            <TableCell sx={{ color: theme.palette.text.secondary }}>{row.accepted}</TableCell>
                            <TableCell sx={{ color: theme.palette.text.secondary }}>{row.rejected}</TableCell>
                            <TableCell sx={{ color: theme.palette.text.secondary }}>
                              {((row.accepted / row.applications) * 100).toFixed(1)}%
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: theme.palette.text.primary, mb: 2 }}>
                    Performance Metrics
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>Metric</TableCell>
                          <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>Current</TableCell>
                          <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>Previous</TableCell>
                          <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>Change</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ color: theme.palette.text.primary }}>Total Applications</TableCell>
                          <TableCell sx={{ color: theme.palette.text.secondary }}>120</TableCell>
                          <TableCell sx={{ color: theme.palette.text.secondary }}>100</TableCell>
                          <TableCell>
                            <Chip
                              label="+20%"
                              size="small"
                              sx={{
                                backgroundColor: `${theme.palette.success.main}20`,
                                color: theme.palette.success.main,
                                borderColor: theme.palette.success.main,
                                borderWidth: 1,
                                borderStyle: 'solid',
                              }}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ color: theme.palette.text.primary }}>Acceptance Rate</TableCell>
                          <TableCell sx={{ color: theme.palette.text.secondary }}>65%</TableCell>
                          <TableCell sx={{ color: theme.palette.text.secondary }}>60%</TableCell>
                          <TableCell>
                            <Chip
                              label="+5%"
                              size="small"
                              sx={{
                                backgroundColor: `${theme.palette.success.main}20`,
                                color: theme.palette.success.main,
                                borderColor: theme.palette.success.main,
                                borderWidth: 1,
                                borderStyle: 'solid',
                              }}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ color: theme.palette.text.primary }}>Average Completion Time</TableCell>
                          <TableCell sx={{ color: theme.palette.text.secondary }}>45 days</TableCell>
                          <TableCell sx={{ color: theme.palette.text.secondary }}>50 days</TableCell>
                          <TableCell>
                            <Chip
                              label="-10%"
                              size="small"
                              sx={{
                                backgroundColor: `${theme.palette.success.main}20`,
                                color: theme.palette.success.main,
                                borderColor: theme.palette.success.main,
                                borderWidth: 1,
                                borderStyle: 'solid',
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: theme.palette.text.primary }}>Share Report</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: theme.palette.text.secondary, mb: 2 }}>
            Choose how you want to share this report with others.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="share-type-label">Share Type</InputLabel>
                <Select
                  labelId="share-type-label"
                  id="share-type"
                  label="Share Type"
                  defaultValue="email"
                >
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="link">Generate Link</MenuItem>
                  <MenuItem value="download">Download PDF</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="recipients"
                label="Recipients"
                type="text"
                fullWidth
                variant="outlined"
                placeholder="Enter email addresses separated by commas"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="message"
                label="Message"
                type="text"
                fullWidth
                multiline
                rows={3}
                variant="outlined"
                placeholder="Add a message (optional)"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: theme.palette.text.secondary }}>
            Cancel
          </Button>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Reports; 