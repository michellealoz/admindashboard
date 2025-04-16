import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Divider,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  useTheme,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Assignment as AssignmentIcon,
  Event as EventIcon,
  Person as PersonIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Send as SendIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

const Notifications: React.FC = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [notificationType, setNotificationType] = useState('deadline');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationRecipients, setNotificationRecipients] = useState('all');

  // Sample notification data
  const notifications = [
    {
      id: 1,
      type: 'deadline',
      title: 'Internship Application Deadline',
      message: 'The deadline for submitting internship applications for the summer semester is approaching.',
      date: '2023-05-15',
      recipients: 'All Students',
      status: 'pending',
    },
    {
      id: 2,
      type: 'assignment',
      title: 'Faculty Mentor Assignment',
      message: 'New faculty mentor assignments have been made for the upcoming semester.',
      date: '2023-05-10',
      recipients: 'Faculty Members',
      status: 'sent',
    },
    {
      id: 3,
      type: 'application',
      title: 'New Internship Application',
      message: 'A new internship application has been submitted and requires review.',
      date: '2023-05-08',
      recipients: 'Administrators',
      status: 'pending',
    },
    {
      id: 4,
      type: 'deadline',
      title: 'Progress Report Submission',
      message: 'Students are required to submit their progress reports by the end of this week.',
      date: '2023-05-05',
      recipients: 'All Students',
      status: 'sent',
    },
    {
      id: 5,
      type: 'assignment',
      title: 'Industry Mentor Assignment',
      message: 'Industry mentors have been assigned to students for the current semester.',
      date: '2023-05-01',
      recipients: 'Industry Mentors',
      status: 'sent',
    },
  ];

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNotificationType('deadline');
    setNotificationTitle('');
    setNotificationMessage('');
    setNotificationRecipients('all');
  };

  const handleSendNotification = () => {
    // Here you would typically send the notification to the backend
    console.log({
      type: notificationType,
      title: notificationTitle,
      message: notificationMessage,
      recipients: notificationRecipients,
    });
    handleCloseDialog();
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'deadline':
        return <EventIcon sx={{ color: theme.palette.warning.main }} />;
      case 'assignment':
        return <PersonIcon sx={{ color: theme.palette.info.main }} />;
      case 'application':
        return <AssignmentIcon sx={{ color: theme.palette.success.main }} />;
      default:
        return <NotificationsIcon />;
    }
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'sent':
        return (
          <Chip
            icon={<CheckCircleIcon fontSize="small" />}
            label="Sent"
            size="small"
            sx={{
              backgroundColor: `${theme.palette.success.main}20`,
              color: theme.palette.success.main,
              borderColor: theme.palette.success.main,
              borderWidth: 1,
              borderStyle: 'solid',
            }}
          />
        );
      case 'pending':
        return (
          <Chip
            icon={<WarningIcon fontSize="small" />}
            label="Pending"
            size="small"
            sx={{
              backgroundColor: `${theme.palette.warning.main}20`,
              color: theme.palette.warning.main,
              borderColor: theme.palette.warning.main,
              borderWidth: 1,
              borderStyle: 'solid',
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
          Notifications & Alerts
        </Typography>
        <Button
          variant="contained"
          startIcon={<SendIcon />}
          onClick={handleOpenDialog}
          sx={{
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Send New Notification
        </Button>
      </Box>

      <Paper sx={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
        <List>
          {notifications.map((notification, index) => (
            <React.Fragment key={notification.id}>
              <ListItem alignItems="flex-start">
                <ListItemIcon>
                  {getNotificationIcon(notification.type)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                      {notification.title}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        {notification.message}
                      </Typography>
                      <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                          Date: {notification.date}
                        </Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                          Recipients: {notification.recipients}
                        </Typography>
                        {getStatusChip(notification.status)}
                      </Box>
                    </React.Fragment>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit" sx={{ mr: 1 }}>
                    <EditIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {index < notifications.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: theme.palette.text.primary }}>Send New Notification</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: theme.palette.text.secondary, mb: 2 }}>
            Create and send a new notification to users.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="notification-type-label">Notification Type</InputLabel>
                <Select
                  labelId="notification-type-label"
                  value={notificationType}
                  label="Notification Type"
                  onChange={(e) => setNotificationType(e.target.value)}
                >
                  <MenuItem value="deadline">Deadline</MenuItem>
                  <MenuItem value="assignment">Assignment</MenuItem>
                  <MenuItem value="application">Application</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                variant="outlined"
                value={notificationTitle}
                onChange={(e) => setNotificationTitle(e.target.value)}
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
                rows={4}
                variant="outlined"
                value={notificationMessage}
                onChange={(e) => setNotificationMessage(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="recipients-label">Recipients</InputLabel>
                <Select
                  labelId="recipients-label"
                  value={notificationRecipients}
                  label="Recipients"
                  onChange={(e) => setNotificationRecipients(e.target.value)}
                >
                  <MenuItem value="all">All Users</MenuItem>
                  <MenuItem value="students">All Students</MenuItem>
                  <MenuItem value="faculty">Faculty Members</MenuItem>
                  <MenuItem value="mentors">Industry Mentors</MenuItem>
                  <MenuItem value="administrators">Administrators</MenuItem>
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
            onClick={handleSendNotification} 
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Notifications; 