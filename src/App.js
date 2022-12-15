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

import {Backdrop, Paper} from '@mui/material';

import {
  BrowserRouter,
  Route,
  Link,
  Switch as BasicSwitch,
  useHistory,
} from "react-router-dom";

import Home from './component/home';
import Art from './component/artists';
import ArtDetail from './component/artistDetail';
import News from './component/news';

const drawerWidth = 240;
const navItemsLink = ['', 'artists', 'news', 'songlist', 'about', 'contact'];
const navItemsEn = ['Home', 'Artists', 'News', 'Top Songs', 'About', 'Contact us'];
const navItemsTh = ['หน้าหลัก', 'ค้นหาศิลปิน', 'ข่าวสาร', 'อันดับเพลงสูงสุด', 'เกี่ยวกับ', 'ติดต่อเรา'];
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
  const [langselect, setLang] = React.useState(localStorage.getItem('tpoplang') != null ? localStorage.getItem('tpoplang') : 'en');
  const ref = React.useRef(null)
  const [footerHeight, setFooterH] = React.useState(0)

  const [login, setLogin] = React.useState('');

  const [loadsession, setLoad] = React.useState(true);
  
  React.useEffect(() => {
    function handleWindowResize() {
      setRealwidth(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowResize);
    fetch('https://api.cpxdev.tk/home/status')
      .then((response) => response.text())
      .then((data) => setLoad(false));
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  React.useEffect(() => {
    setFooterH(ref.current.clientHeight)
  })

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

 

  return (
    <Box>
    <Backdrop
      sx={{ backgroundColor: 'rgba(255,255,255,0.4)', zIndex: 1500, position: 'fixed' }}
      open={loadsession}
      >
      <img src='https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/tpopplay-load.svg' width='60px' />
      </Backdrop>
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
            component="div"
            sx={{
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            T-POP Megaverse
          </Typography>
          )}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {(langselect == 'en' ?navItemsEn:navItemsTh).map((item, i) => (
              <Button component={Link} to={'/' + navItemsLink[i]} key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, mr: 1 }} className='text-right'>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar alt="U" src="/static/images/avatar/2.jpg" />
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
              {login != '' ? (langselect == 'en' ?settingsEn:settingsTh).map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              )) : (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{langselect == 'en' ? 'You are not Login' :'คุณยังไม่ได้เข้าสู่ระบบ'}</Typography>
                </MenuItem>
              )}
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
          <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
      Menu
      </Typography>
      <Divider />
      <List>
        {(langselect == 'en' ?navItemsEn:navItemsTh).map((item, i) => (
          <ListItem component={Link} to={'/' + navItemsLink[i]} key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <div style={{marginBottom: footerHeight + 'px'}}>
          <BasicSwitch>
            <Route exact path="/">
              <Home setLoad={(val) => setLoad(val)} lang={langselect} />
            </Route>
            <Route exact path="/artists">
              <Art setLoad={(val) => setLoad(val)} lang={langselect} />
            </Route>
            <Route exact path="/artist/:id">
              <ArtDetail setLoad={(val) => setLoad(val)} lang={langselect} />
            </Route>
            <Route exact path="/news">
              <News setLoad={(val) => setLoad(val)} lang={langselect} />
            </Route>
          </BasicSwitch>
        </div>
      </Box>
      <br />
      <footer className='fixed-bottom text-center text-dark pb-1 pt-1 bg-light' ref={ref}>
        &copy; Copyright 2023 CPXDevStudio<br />
        All artist information and images are the property of the record label owner and the artist themselves. This website is intended to support artists on a non-profit basis.
      </footer>
    </Box>
  );
}

export default App