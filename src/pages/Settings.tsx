import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
} from '@mui/material';
import {
  Save as SaveIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Storage as StorageIcon,
  Backup as BackupIcon,
} from '@mui/icons-material';

const Settings: React.FC = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'backup' | 'restore' | 'delete' | null>(null);

  // Sample settings data
  const notificationSettings = [
    { id: 'email', label: 'Email Notifications', enabled: true },
    { id: 'push', label: 'Push Notifications', enabled: true },
    { id: 'sms', label: 'SMS Notifications', enabled: false },
  ];

  const securitySettings = [
    { id: '2fa', label: 'Two-Factor Authentication', enabled: true },
    { id: 'session', label: 'Session Timeout (30 minutes)', enabled: true },
    { id: 'ip', label: 'IP Restriction', enabled: false },
  ];

  const handleOpenDialog = (type: 'backup' | 'restore' | 'delete') => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogType(null);
  };

  const getDialogContent = () => {
    switch (dialogType) {
      case 'backup':
        return {
          title: 'Backup Data',
          content: 'Are you sure you want to create a backup of all your data? This process may take a few minutes.',
          action: 'Backup',
        };
      case 'restore':
        return {
          title: 'Restore Data',
          content: 'Are you sure you want to restore data from a backup? This will overwrite current data.',
          action: 'Restore',
        };
      case 'delete':
        return {
          title: 'Delete Data',
          content: 'Are you sure you want to delete all data? This action cannot be undone.',
          action: 'Delete',
        };
      default:
        return {
          title: '',
          content: '',
          action: '',
        };
    }
  };

  const dialogContent = getDialogContent();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
          Settings
        </Typography>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          sx={{
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Save Changes
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <NotificationsIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                  Notification Settings
                </Typography>
              </Box>
              <List>
                {notificationSettings.map((setting) => (
                  <ListItem key={setting.id}>
                    <ListItemText
                      primary={setting.label}
                      sx={{
                        '& .MuiTypography-root': {
                          color: theme.palette.text.primary,
                        },
                      }}
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={setting.enabled}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: theme.palette.primary.main,
                          },
                        }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SecurityIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                  Security Settings
                </Typography>
              </Box>
              <List>
                {securitySettings.map((setting) => (
                  <ListItem key={setting.id}>
                    <ListItemText
                      primary={setting.label}
                      sx={{
                        '& .MuiTypography-root': {
                          color: theme.palette.text.primary,
                        },
                      }}
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={setting.enabled}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: theme.palette.primary.main,
                          },
                        }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* System Settings */}
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <StorageIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                  System Settings
                </Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="language-label">Language</InputLabel>
                    <Select
                      labelId="language-label"
                      id="language"
                      label="Language"
                      defaultValue="en"
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Spanish</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="timezone-label">Timezone</InputLabel>
                    <Select
                      labelId="timezone-label"
                      id="timezone"
                      label="Timezone"
                      defaultValue="utc"
                    >
                      <MenuItem value="utc">UTC</MenuItem>
                      <MenuItem value="est">EST</MenuItem>
                      <MenuItem value="pst">PST</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Data Retention Period (days)"
                    type="number"
                    defaultValue={30}
                    inputProps={{ min: 1 }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Data Management */}
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BackupIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                  Data Management
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    variant="outlined"
                    startIcon={<BackupIcon />}
                    onClick={() => handleOpenDialog('backup')}
                    sx={{
                      color: theme.palette.text.secondary,
                      borderColor: theme.palette.divider,
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    Backup Data
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    startIcon={<BackupIcon />}
                    onClick={() => handleOpenDialog('restore')}
                    sx={{
                      color: theme.palette.text.secondary,
                      borderColor: theme.palette.divider,
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    Restore Data
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleOpenDialog('delete')}
                    sx={{
                      color: theme.palette.error.main,
                      borderColor: theme.palette.error.main,
                      '&:hover': {
                        borderColor: theme.palette.error.dark,
                        color: theme.palette.error.dark,
                      },
                    }}
                  >
                    Delete All Data
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: theme.palette.text.primary }}>{dialogContent.title}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: theme.palette.text.secondary }}>
            {dialogContent.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: theme.palette.text.secondary }}>
            Cancel
          </Button>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            color={dialogType === 'delete' ? 'error' : 'primary'}
            sx={{
              backgroundColor: dialogType === 'delete' ? theme.palette.error.main : theme.palette.primary.main,
              '&:hover': {
                backgroundColor: dialogType === 'delete' ? theme.palette.error.dark : theme.palette.primary.dark,
              },
            }}
          >
            {dialogContent.action}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings; 