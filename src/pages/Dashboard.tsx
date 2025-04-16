import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  useTheme,
} from '@mui/material';
import {
  People as PeopleIcon,
  Business as BusinessIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  
  // Sample data for charts
  const departmentData = [
    { department: 'Computer Science', internships: 45 },
    { department: 'Mechanical', internships: 30 },
    { department: 'Electrical', internships: 25 },
    { department: 'Civil', internships: 20 },
  ];

  const sdgData = [
    { id: 'SDG 4', value: 35 },
    { id: 'SDG 8', value: 25 },
    { id: 'SDG 9', value: 20 },
    { id: 'SDG 11', value: 15 },
    { id: 'Others', value: 5 },
  ];

  const StatCard: React.FC<{
    title: string;
    value: string;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, icon, color }) => (
    <Card 
      sx={{ 
        height: '100%',
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              backgroundColor: `${color}20`,
              borderRadius: '50%',
              p: 1,
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
          <Typography 
            variant="h6" 
            sx={{ 
              color: theme.palette.text.secondary,
              fontWeight: 500,
            }}
          >
            {title}
          </Typography>
        </Box>
        <Typography 
          variant="h4" 
          component="div" 
          sx={{ 
            fontWeight: 'bold',
            color: theme.palette.text.primary,
            letterSpacing: '-0.5px',
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 4,
          color: theme.palette.text.primary,
          fontWeight: 600,
        }}
      >
        Dashboard Overview
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Students"
            value="1,234"
            icon={<PeopleIcon sx={{ color: theme.palette.primary.main }} />}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Internships"
            value="156"
            icon={<BusinessIcon sx={{ color: theme.palette.success.main }} />}
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed Internships"
            value="89"
            icon={<AssignmentIcon sx={{ color: theme.palette.warning.main }} />}
            color={theme.palette.warning.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Success Rate"
            value="92%"
            icon={<TrendingUpIcon sx={{ color: theme.palette.info.main }} />}
            color={theme.palette.info.main}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper 
            sx={{ 
              p: 3, 
              height: '400px',
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.primary }}>
              Internships by Department
            </Typography>
            <Box sx={{ height: '300px' }}>
              <ResponsiveBar
                data={departmentData}
                keys={['internships']}
                indexBy="department"
                margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
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
                  legend: 'Internships',
                  legendPosition: 'middle',
                  legendOffset: -40,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                theme={{
                  axis: {
                    ticks: {
                      text: {
                        fill: theme.palette.text.secondary,
                      },
                    },
                    legend: {
                      text: {
                        fill: theme.palette.text.secondary,
                      },
                    },
                  },
                  grid: {
                    line: {
                      stroke: theme.palette.divider,
                    },
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
              p: 3, 
              height: '400px',
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.primary }}>
              SDG Distribution
            </Typography>
            <Box sx={{ height: '300px' }}>
              <ResponsivePie
                data={sdgData}
                margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                enableArcLinkLabels={true}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor={theme.palette.text.secondary}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLinkLabelsOffset={5}
                arcLinkLabelsStraightLength={10}
                arcLabelsSkipAngle={20}
                arcLabelsRadiusOffset={0.5}
                arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                tooltip={({ datum }) => (
                  <Box
                    sx={{
                      background: theme.palette.background.paper,
                      padding: '8px 12px',
                      borderRadius: '4px',
                      border: `1px solid ${theme.palette.divider}`,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                  >
                    <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
                      {datum.id}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      Value: {datum.value}
                    </Typography>
                  </Box>
                )}
                theme={{
                  labels: {
                    text: {
                      fill: theme.palette.text.secondary,
                    },
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 