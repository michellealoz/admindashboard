import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';

interface Internship {
  id: number;
  title: string;
  company: string;
  department: string;
  status: 'active' | 'pending' | 'closed';
  sdg: string[];
  applications: number;
  deadline: string;
}

const InternshipListings: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);

  // Sample data
  const internships: Internship[] = [
    {
      id: 1,
      title: 'Software Development Intern',
      company: 'Tech Corp',
      department: 'Computer Science',
      status: 'active',
      sdg: ['SDG 4', 'SDG 8'],
      applications: 25,
      deadline: '2024-05-01',
    },
    {
      id: 2,
      title: 'Mechanical Engineering Intern',
      company: 'Auto Industries',
      department: 'Mechanical',
      status: 'pending',
      sdg: ['SDG 9'],
      applications: 15,
      deadline: '2024-04-15',
    },
    // Add more sample data as needed
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (internship?: Internship) => {
    setSelectedInternship(internship || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedInternship(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'closed':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Internship Listings</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add New Internship
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>SDGs</TableCell>
              <TableCell>Applications</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {internships
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((internship) => (
                <TableRow key={internship.id}>
                  <TableCell>{internship.title}</TableCell>
                  <TableCell>{internship.company}</TableCell>
                  <TableCell>{internship.department}</TableCell>
                  <TableCell>
                    <Chip
                      label={internship.status}
                      color={getStatusColor(internship.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {internship.sdg.map((sdg) => (
                      <Chip
                        key={sdg}
                        label={sdg}
                        size="small"
                        sx={{ mr: 0.5 }}
                      />
                    ))}
                  </TableCell>
                  <TableCell>{internship.applications}</TableCell>
                  <TableCell>{internship.deadline}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(internship)}
                    >
                      <ViewIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(internship)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={internships.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedInternship ? 'Edit Internship' : 'Add New Internship'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title"
                defaultValue={selectedInternship?.title}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                defaultValue={selectedInternship?.company}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Department"
                defaultValue={selectedInternship?.department}
              >
                <MenuItem value="Computer Science">Computer Science</MenuItem>
                <MenuItem value="Mechanical">Mechanical</MenuItem>
                <MenuItem value="Electrical">Electrical</MenuItem>
                <MenuItem value="Civil">Civil</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Status"
                defaultValue={selectedInternship?.status}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                defaultValue={selectedInternship?.title}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Deadline"
                defaultValue={selectedInternship?.deadline}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            {selectedInternship ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InternshipListings; 