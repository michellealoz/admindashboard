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
  LinearProgress,
  useTheme,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';

interface Milestone {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: 'completed' | 'in-progress' | 'pending';
  progress: number;
  assignedTo: string;
}

const ProgressTracking: React.FC = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);

  // Sample milestone data
  const milestones: Milestone[] = [
    {
      id: 1,
      title: 'Project Proposal Submission',
      description: 'Submit initial project proposal with objectives and timeline',
      dueDate: '2024-03-15',
      status: 'completed',
      progress: 100,
      assignedTo: 'John Doe',
    },
    {
      id: 2,
      title: 'Mid-term Progress Report',
      description: 'Submit progress report with achievements and challenges',
      dueDate: '2024-04-01',
      status: 'in-progress',
      progress: 60,
      assignedTo: 'Jane Smith',
    },
    {
      id: 3,
      title: 'Final Project Presentation',
      description: 'Present final project outcomes and deliverables',
      dueDate: '2024-05-15',
      status: 'pending',
      progress: 0,
      assignedTo: 'Mike Johnson',
    },
  ];

  const handleOpenDialog = (milestone?: Milestone) => {
    setSelectedMilestone(milestone || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMilestone(null);
  };

  const getStatusChip = (status: string) => {
    const statusConfig = {
      completed: {
        icon: <CheckCircleIcon fontSize="small" />,
        label: 'Completed',
        color: theme.palette.success.main,
      },
      'in-progress': {
        icon: <TimelineIcon fontSize="small" />,
        label: 'In Progress',
        color: theme.palette.warning.main,
      },
      pending: {
        icon: <WarningIcon fontSize="small" />,
        label: 'Pending',
        color: theme.palette.error.main,
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];

    return (
      <Chip
        icon={config.icon}
        label={config.label}
        size="small"
        sx={{
          backgroundColor: `${config.color}20`,
          color: config.color,
          borderColor: config.color,
          borderWidth: 1,
          borderStyle: 'solid',
        }}
      />
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
          Progress Tracking
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Add Milestone
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>Milestone</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>Description</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>Due Date</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>Progress</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>Assigned To</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {milestones.map((milestone) => (
                    <TableRow key={milestone.id}>
                      <TableCell sx={{ color: theme.palette.text.primary }}>{milestone.title}</TableCell>
                      <TableCell sx={{ color: theme.palette.text.secondary }}>{milestone.description}</TableCell>
                      <TableCell sx={{ color: theme.palette.text.secondary }}>{milestone.dueDate}</TableCell>
                      <TableCell>{getStatusChip(milestone.status)}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={milestone.progress}
                            sx={{
                              width: '100px',
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: `${theme.palette.primary.main}20`,
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: theme.palette.primary.main,
                              },
                            }}
                          />
                          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            {milestone.progress}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: theme.palette.text.secondary }}>{milestone.assignedTo}</TableCell>
                      <TableCell>
                        <IconButton size="small" sx={{ mr: 1 }} onClick={() => handleOpenDialog(milestone)}>
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
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: theme.palette.text.primary }}>
          {selectedMilestone ? 'Edit Milestone' : 'Add New Milestone'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: theme.palette.text.secondary, mb: 2 }}>
            {selectedMilestone
              ? 'Update the milestone details below.'
              : 'Fill in the details to create a new milestone.'}
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Milestone Title"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={selectedMilestone?.title}
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
                defaultValue={selectedMilestone?.description}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                id="dueDate"
                label="Due Date"
                type="date"
                fullWidth
                variant="outlined"
                defaultValue={selectedMilestone?.dueDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  label="Status"
                  defaultValue={selectedMilestone?.status || 'pending'}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="progress"
                label="Progress (%)"
                type="number"
                fullWidth
                variant="outlined"
                defaultValue={selectedMilestone?.progress || 0}
                inputProps={{ min: 0, max: 100 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="assignedTo"
                label="Assigned To"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={selectedMilestone?.assignedTo}
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
            {selectedMilestone ? 'Update' : 'Add'} Milestone
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProgressTracking; 