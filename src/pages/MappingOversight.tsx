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
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
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
      id={`mapping-tabpanel-${index}`}
      aria-labelledby={`mapping-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const MappingOversight: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [mappingType, setMappingType] = useState('sdg');

  // Sample mapping data
  const sdgMappings = [
    {
      id: 1,
      sdg: 'SDG 4',
      description: 'Quality Education',
      internships: ['Web Development Internship', 'Data Science Internship'],
      status: 'active',
    },
    {
      id: 2,
      sdg: 'SDG 8',
      description: 'Decent Work and Economic Growth',
      internships: ['Business Analytics Internship', 'Marketing Internship'],
      status: 'active',
    },
  ];

  const poMappings = [
    {
      id: 1,
      po: 'PO 1',
      description: 'Engineering Knowledge',
      internships: ['Software Engineering Internship', 'AI/ML Internship'],
      status: 'active',
    },
    {
      id: 2,
      po: 'PO 2',
      description: 'Problem Analysis',
      internships: ['Data Science Internship', 'Research Internship'],
      status: 'active',
    },
  ];

  const peoMappings = [
    {
      id: 1,
      peo: 'PEO 1',
      description: 'Technical Leadership',
      internships: ['Technical Lead Internship', 'Project Management Internship'],
      status: 'active',
    },
    {
      id: 2,
      peo: 'PEO 2',
      description: 'Research and Innovation',
      internships: ['Research Internship', 'Innovation Internship'],
      status: 'active',
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

  const getStatusChip = (status: string) => {
    return (
      <Chip
        icon={status === 'active' ? <CheckCircleIcon fontSize="small" /> : <WarningIcon fontSize="small" />}
        label={status === 'active' ? 'Active' : 'Inactive'}
        size="small"
        sx={{
          backgroundColor: status === 'active' 
            ? `${theme.palette.success.main}20`
            : `${theme.palette.warning.main}20`,
          color: status === 'active'
            ? theme.palette.success.main
            : theme.palette.warning.main,
          borderColor: status === 'active'
            ? theme.palette.success.main
            : theme.palette.warning.main,
          borderWidth: 1,
          borderStyle: 'solid',
        }}
      />
    );
  };

  const renderMappingTable = (mappings: any[], type: string) => (
    <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>{type.toUpperCase()}</TableCell>
            <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>Description</TableCell>
            <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>Mapped Internships</TableCell>
            <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>Status</TableCell>
            <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mappings.map((mapping) => (
            <TableRow key={mapping.id}>
              <TableCell sx={{ color: theme.palette.text.primary }}>{mapping[type.toLowerCase()]}</TableCell>
              <TableCell sx={{ color: theme.palette.text.secondary }}>{mapping.description}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {mapping.internships.map((internship: string, index: number) => (
                    <Chip
                      key={index}
                      label={internship}
                      size="small"
                      sx={{
                        backgroundColor: `${theme.palette.primary.main}20`,
                        color: theme.palette.primary.main,
                        borderColor: theme.palette.primary.main,
                        borderWidth: 1,
                        borderStyle: 'solid',
                      }}
                    />
                  ))}
                </Box>
              </TableCell>
              <TableCell>{getStatusChip(mapping.status)}</TableCell>
              <TableCell>
                <IconButton size="small" sx={{ mr: 1 }}>
                  <EditIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
                </IconButton>
                <IconButton size="small">
                  <DeleteIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
          Mapping Oversight
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          sx={{
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Add New Mapping
        </Button>
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
          <Tab label="SDG Mappings" />
          <Tab label="PO Mappings" />
          <Tab label="PEO Mappings" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          {renderMappingTable(sdgMappings, 'sdg')}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {renderMappingTable(poMappings, 'po')}
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          {renderMappingTable(peoMappings, 'peo')}
        </TabPanel>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: theme.palette.text.primary }}>Add New Mapping</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: theme.palette.text.secondary, mb: 2 }}>
            Create a new mapping between internships and {mappingType.toUpperCase()}.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="mapping-type-label">Mapping Type</InputLabel>
                <Select
                  labelId="mapping-type-label"
                  value={mappingType}
                  label="Mapping Type"
                  onChange={(e) => setMappingType(e.target.value)}
                >
                  <MenuItem value="sdg">SDG</MenuItem>
                  <MenuItem value="po">PO</MenuItem>
                  <MenuItem value="peo">PEO</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="code"
                label={`${mappingType.toUpperCase()} Code`}
                type="text"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="description"
                label="Description"
                type="text"
                fullWidth
                multiline
                rows={2}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="internships-label">Select Internships</InputLabel>
                <Select
                  labelId="internships-label"
                  multiple
                  value={[]}
                  label="Select Internships"
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  <MenuItem value="Web Development Internship">Web Development Internship</MenuItem>
                  <MenuItem value="Data Science Internship">Data Science Internship</MenuItem>
                  <MenuItem value="AI/ML Internship">AI/ML Internship</MenuItem>
                  <MenuItem value="Business Analytics Internship">Business Analytics Internship</MenuItem>
                </Select>
              </FormControl>
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
            Add Mapping
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MappingOversight; 