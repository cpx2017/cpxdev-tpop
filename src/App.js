import './App.css';

import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import {Backdrop} from '@mui/material';

import pagedetail from './menulist/App.json'

const drawerWidth = 240;
const navItemsEn = ['Home', 'Artists', 'News', 'Top Songs', 'Social', 'About', 'Contact us'];
const navItemsTh = ['หน้าหลัก', 'ค้นหาศิลปิน', 'ข่าวสาร', 'อันดับเพลงสูงสุด', 'สังคมออนไลน์', 'เกี่ยวกับ', 'ติดต่อเรา'];
const LangList = [{
  id:'en',
  label: 'English'
},{
  id:'th',
  label: 'ภาษาไทย'
}];
const settingsEn = ['Account', 'Logout'];
const settingsTh = ['ตั้งค่าบัญชี', 'ออกจากระบบ'];


function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [width, setRealwidth] = React.useState(window.innerWidth);
  const [langselect, setLang] = React.useState('en');

  const [loadsession, setLoad] = React.useState(true);

  
  React.useEffect(() => {
    function handleWindowResize() {
      setRealwidth(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowResize);
    fetch('https://api.cpxdev.tk/home/status')
      .then((response) => response.text())
      .then((data) => console.log());
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);


  React.useEffect(() => {
    if (localStorage.getItem('tpoplang') != null) {
      setLang(localStorage.getItem('tpoplang'))
    } else {
      localStorage.setItem('tpoplang', langselect)
    }
  }, [])
  
  React.useEffect(() => {
    localStorage.setItem('tpoplang', langselect)
  }, [langselect]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
      Menu
      </Typography>
      <Divider />
      <List>
        {(langselect == 'en' ?navItemsEn:navItemsTh).map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar disableGutters sx={{justifyContent: 'space-between !important'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 1, ml:1, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, ml:2, display: { xs: 'none', sm: 'block' } }}
          >
            T-POP Megaverse
          </Typography>
          {width < 500 && (
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            T-POP Megaverse
          </Typography>
          )}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {(langselect == 'en' ?navItemsEn:navItemsTh).map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, mr: 1 }} className='text-right'>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                  <Typography textAlign="center">{langselect == 'en' ?'Welcome back, ':'ยินดีต้อนรับครับ คุณ'} User</Typography>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <TextField
                    select
                    label={langselect == 'en' ? 'Choose Language': 'กรุณาเลือกภาษา'}
                    value={langselect}
                    onChange={(e) => setLang(e.target.value)}
                    fullWidth={true}
                    variant="standard"
                  >
                    {LangList.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </MenuItem>
              {(langselect == 'en' ?settingsEn:settingsTh).map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography>
          {pagedetail[langselect].desc}
        </Typography>
      </Box>
      <Backdrop
        sx={{ color: 'rgba(255,255,255,0.4)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadsession}
        >
        <img src='https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/tpopplay-load.svg' />
        </Backdrop>
    </Box>
  );
}
export default App;