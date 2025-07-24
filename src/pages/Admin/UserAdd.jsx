import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Container,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Avatar,
  Badge,
  Divider,
  TextField,
  Button,
  Menu,
  MenuItem,
  Switch,
  FormControlLabel,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as LeaveIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  BarChart as AnalyticsIcon,
  Security as SecurityIcon,
  Upload as UploadIcon,
  FilterList as FilterIcon,
  MoreVert as MoreIcon,
  Search as SearchIcon,
  Email as EmailIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as ApproveIcon,
  Warning as FlagIcon,
  CloudDownload as DownloadIcon,
  AccountCircle as UserIcon
} from '@mui/icons-material';
import { blue, grey } from '@mui/material/colors';

const drawerWidth = 240;

const UserAdd = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  // Sample data
  const users = [
    { id: 1, name: 'John Doe', email: 'john@univ.edu', role: 'Faculty', department: 'Computer Science', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@univ.edu', role: 'Student', department: 'Mathematics', status: 'Active' },
    { id: 3, name: 'Robert Johnson', email: 'robert@univ.edu', role: 'HOD', department: 'Physics', status: 'Inactive' },
  ];

  const leaveApplications = [
    { id: 1, name: 'Jane Smith', type: 'Medical', startDate: '2023-06-15', endDate: '2023-06-18', status: 'Approved', approver: 'John Doe' },
    { id: 2, name: 'Mike Brown', type: 'Casual', startDate: '2023-06-20', endDate: '2023-06-21', status: 'Pending', approver: 'Robert Johnson' },
    { id: 3, name: 'Sarah Wilson', type: 'Emergency', startDate: '2023-06-10', endDate: '2023-06-12', status: 'Rejected', approver: 'John Doe' },
  ];

  const drawer = (
    <div>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <Avatar sx={{ bgcolor: blue[800], mr: 1 }}>U</Avatar>
        <Typography variant="h6" noWrap>
          UniLeave Admin
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {[
          { text: 'Dashboard', icon: <DashboardIcon />, tab: 'dashboard' },
          { text: 'User Management', icon: <PeopleIcon />, tab: 'users' },
          { text: 'Leave Applications', icon: <LeaveIcon />, tab: 'leaves' },
          { text: 'System Config', icon: <SettingsIcon />, tab: 'config' },
          { text: 'Notifications', icon: <NotificationsIcon />, tab: 'notifications' },
          { text: 'Analytics', icon: <AnalyticsIcon />, tab: 'analytics' },
          { text: 'Security', icon: <SecurityIcon />, tab: 'security' },
        ].map((item) => (
          <ListItem 
            button 
            key={item.text}
            selected={activeTab === item.tab}
            onClick={() => handleTabChange(item.tab)}
            sx={{
              '&.Mui-selected': {
                backgroundColor: blue[50],
                borderRight: `3px solid ${blue[800]}`,
              },
              '&.Mui-selected:hover': {
                backgroundColor: blue[100],
              },
            }}
          >
            <ListItemIcon sx={{ color: activeTab === item.tab ? blue[800] : grey[600] }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Users
                  </Typography>
                  <Typography variant="h4">1,254</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Pending Leaves
                  </Typography>
                  <Typography variant="h4">42</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Approved This Month
                  </Typography>
                  <Typography variant="h4">156</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Rejected This Month
                  </Typography>
                  <Typography variant="h4">23</Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Recent Leave Applications
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Dates</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Approver</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {leaveApplications.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>{row.startDate} to {row.endDate}</TableCell>
                            <TableCell>
                              <Badge 
                                color={
                                  row.status === 'Approved' ? 'success' : 
                                  row.status === 'Rejected' ? 'error' : 'warning'
                                } 
                                variant="dot"
                                sx={{ mr: 1 }}
                              />
                              {row.status}
                            </TableCell>
                            <TableCell>{row.approver}</TableCell>
                            <TableCell>
                              <IconButton size="small">
                                <MoreIcon />
                              </IconButton>
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
        );
      
      case 'users':
        return (
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">User Management</Typography>
                <Button 
                  variant="contained" 
                  startIcon={<UploadIcon />}
                  sx={{ backgroundColor: blue[800], '&:hover': { backgroundColor: blue[900] } }}
                >
                  Upload Excel
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', mb: 2 }}>
                <TextField
                  size="small"
                  placeholder="Search users..."
                  InputProps={{
                    startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
                  }}
                  sx={{ mr: 2, flexGrow: 1 }}
                />
                <Button 
                  variant="outlined" 
                  startIcon={<FilterIcon />}
                  sx={{ borderColor: grey[400], color: grey[800] }}
                >
                  Filters
                </Button>
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: blue[100], color: blue[800] }}>
                              {user.name.charAt(0)}
                            </Avatar>
                            {user.name}
                          </Box>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>
                          <FormControlLabel
                            control={<Switch checked={user.status === 'Active'} color="success" size="small" />}
                            label={user.status}
                            labelPlacement="start"
                            sx={{ ml: 0 }}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton size="small" sx={{ color: blue[800] }}>
                            <EmailIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" sx={{ color: grey[600] }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" sx={{ color: grey[600] }}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        );
      
      case 'leaves':
        return (
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Leave Applications
              </Typography>
              
              <Box sx={{ display: 'flex', mb: 2 }}>
                <TextField
                  size="small"
                  placeholder="Search leaves..."
                  InputProps={{
                    startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
                  }}
                  sx={{ mr: 2, flexGrow: 1 }}
                />
                <Button 
                  variant="outlined" 
                  startIcon={<FilterIcon />}
                  sx={{ borderColor: grey[400], color: grey[800], mr: 2 }}
                >
                  Filters
                </Button>
                <Button 
                  variant="contained" 
                  startIcon={<DownloadIcon />}
                  sx={{ backgroundColor: blue[800], '&:hover': { backgroundColor: blue[900] } }}
                >
                  Export
                </Button>
              </Box>
              
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Applicant</TableCell>
                      <TableCell>Leave Type</TableCell>
                      <TableCell>Dates</TableCell>
                      <TableCell>Duration</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Approval Progress</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leaveApplications.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.startDate} to {row.endDate}</TableCell>
                        <TableCell>3 days</TableCell>
                        <TableCell>
                          <Box sx={{ 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            px: 1, 
                            borderRadius: 1,
                            backgroundColor: 
                              row.status === 'Approved' ? 'rgba(46, 125, 50, 0.1)' : 
                              row.status === 'Rejected' ? 'rgba(198, 40, 40, 0.1)' : 'rgba(251, 192, 45, 0.1)',
                            color: 
                              row.status === 'Approved' ? '#2e7d32' : 
                              row.status === 'Rejected' ? '#c62828' : '#fbc02d',
                          }}>
                            {row.status}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {['Student', 'Faculty', 'Warden', 'HOD'].map((role, index) => (
                              <React.Fragment key={role}>
                                <Avatar sx={{ 
                                  width: 24, 
                                  height: 24, 
                                  fontSize: 12,
                                  bgcolor: index < 2 ? blue[500] : grey[300],
                                  color: 'white'
                                }}>
                                  {index < 2 ? '✓' : index + 1}
                                </Avatar>
                                {index < 3 && (
                                  <Box sx={{ 
                                    width: 20, 
                                    height: 2, 
                                    bgcolor: index < 1 ? blue[500] : grey[300],
                                    mx: 0.5 
                                  }} />
                                )}
                              </React.Fragment>
                            ))}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <IconButton size="small" sx={{ color: blue[800] }}>
                            <ApproveIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" sx={{ color: grey[600] }}>
                            <FlagIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small">
                            <MoreIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        );
      
      case 'config':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Leave Types
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Button variant="contained" size="small" sx={{ backgroundColor: blue[800] }}>
                      Add New Leave Type
                    </Button>
                  </Box>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Leave Type</TableCell>
                          <TableCell>Max Days</TableCell>
                          <TableCell>Requires Doc</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {[
                          { id: 1, name: 'Casual Leave', maxDays: 12, requiresDoc: false },
                          { id: 2, name: 'Medical Leave', maxDays: 30, requiresDoc: true },
                          { id: 3, name: 'Emergency Leave', maxDays: 5, requiresDoc: false },
                        ].map((type) => (
                          <TableRow key={type.id}>
                            <TableCell>{type.name}</TableCell>
                            <TableCell>{type.maxDays}</TableCell>
                            <TableCell>
                              <Switch checked={type.requiresDoc} size="small" />
                            </TableCell>
                            <TableCell>
                              <IconButton size="small">
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton size="small">
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Approval Workflow
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <FormControlLabel
                      control={<Switch checked />}
                      label="Enable Multi-level Approval"
                    />
                  </Box>
                  <Box sx={{ 
                    p: 2, 
                    border: `1px solid ${grey[300]}`, 
                    borderRadius: 1,
                    backgroundColor: grey[50]
                  }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Current Workflow:
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                      {['Student', 'Faculty Advisor', 'Warden', 'HOD'].map((role, index) => (
                        <React.Fragment key={role}>
                          <Box sx={{ 
                            p: 1, 
                            border: `1px solid ${blue[200]}`,
                            borderRadius: 1,
                            backgroundColor: blue[50],
                            textAlign: 'center',
                            minWidth: 100,
                            mr: 1,
                            mb: 1
                          }}>
                            <Typography variant="body2">{role}</Typography>
                          </Box>
                          {index < 3 && (
                            <Box sx={{ 
                              width: 20, 
                              height: 2, 
                              bgcolor: blue[500],
                              mr: 1,
                              mb: 1
                            }} />
                          )}
                        </React.Fragment>
                      ))}
                    </Box>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Button variant="outlined" size="small">
                      Edit Workflow
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );
      
      default:
        return (
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
              </Typography>
              <Typography color="textSecondary" sx={{ mt: 1 }}>
                This section is under development. Check back soon!
              </Typography>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'white',
          color: 'text.primary',
          boxShadow: 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </Typography>
          <IconButton color="inherit" sx={{ mr: 1 }}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
          >
            <UserIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <Divider />
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: '#f9fafc'
        }}
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          {renderTabContent()}
        </Container>
      </Box>
    </Box>
  );
};

export default UserAdd;