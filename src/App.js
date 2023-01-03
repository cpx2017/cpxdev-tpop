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

import {Backdrop, Snackbar, Alert, AlertTitle, Slide} from '@mui/material';

import moment from 'moment'

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
import TopChart from './component/topchart';
import About from './component/about';
import Contact from './component/contact';

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
const eventTime = 1673337600

const aa = true

function App() {
  const [loadsession, setLoad] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [width, setRealwidth] = React.useState(window.innerWidth);
  const [langselect, setLang] = React.useState(localStorage.getItem('tpoplang') != null ? localStorage.getItem('tpoplang') : 'en');
  const ref = React.useRef(null)
  const [footerHeight, setFooterH] = React.useState(0)
  const [page, setPage] = React.useState('');

  const [login, setLogin] = React.useState('');

  const history = useHistory();

  const [grandfetch, setFetGrandcount] = React.useState(0);
  const [grandopen, setGrand] = React.useState(false);
  const [block, setBlock] = React.useState(false);

  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    document.title = page + " | T-POP Megaverse Platform"
  }, [page])

  React.useEffect(() => {
    if (!loadsession) {
        setDone(true)
    }
  }, [loadsession])

  const fetchgrand = () => {
    if (grandfetch != 5) {
      fetch('https://worldtimeapi.org/api/timezone/etc/utc')
            .then((response) => response.json())
            .then((data) => {
              if (parseInt(data.unixtime) >= eventTime) {
                setGrand(true)
              }
            });
            let a = grandfetch
            a += 1
            setFetGrandcount(a);
    } else {
      setBlock(true)
    }
  }
 
  
  React.useEffect(() => {
    function handleWindowResize() {
      setRealwidth(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowResize);
    // fetch('https://apiweb.cpxdev.tk/tpop/status')
    //   .then((response) => response.text())
    //   .then((data) => setLoad(false));

      var url = new URL(window.location.href);
      var c = url.searchParams.get("idtest");
      if (c === '3633d63affc9aa2a30cddae9f683abf7') {
        setGrand(true)
      } else {
        fetchgrand()
        setInterval(function () {
          setFetGrandcount(0)
        }, 120000);
      }
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);


  React.useEffect(() => {
    if (ref.current != null){
      setFooterH(ref.current.clientHeight)
    } 
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

  if (!grandopen) {
    var metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor.setAttribute("content", '#fff');
    return (
      <>
       <Backdrop
       sx={{ backgroundColor: 'rgba(255,255,255,0.4)', zIndex: 1500, position: 'fixed' }}
       open={true}
       onClick={() => fetchgrand()}
       className='point'
       >
       <img src='https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/tpopplay-load.svg' width='60px' />
      <div>
        You are at T-POP Megaverse Platform. But system is under testing. Please wait until {moment.unix(eventTime).local().locale('en').format("DD MMMM YYYY HH:mm:ss")}. or Click here to fetching
      </div>
       </Backdrop>
         <Snackbar anchorOrigin={{horizontal: "center",vertical: "top" }} open={block} onClose={() => setBlock(false)} sx={{zIndex: 5000}} autoHideDuration={5000}>
                    <Alert className='point' severity="error">
                        <AlertTitle>Too many request!</AlertTitle>
                        Calm down and relax. You will be meet something special. It's not too long
                    </Alert>
                </Snackbar>
      </>
    )
  }

  function changeroute(page) {
    if (page != window.location.pathname) {
      setLoad(true)
      setTimeout(() => history.push(page), 500);
    }
  }

 
  var metaThemeColor = document.querySelector("meta[name=theme-color]");
  metaThemeColor.setAttribute("content", 'rgb(25, 118, 210)');
  return (
    <Box>
    <Backdrop
      sx={{ backgroundColor: 'rgba(255,255,255,1)', zIndex: 1500, position: 'fixed' }}
      open={loadsession}
      transitionDuration={{ appear: done ? 300 : 0, enter: done ? 300 : 0, exit: 800 }}
      >
      <img src='https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/tpopplay-load.svg' width='60px' />
      </Backdrop>
      <Slide in={!loadsession} direction="down">
      <AppBar component="nav" className='appbaredge'>
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
              <Button component={Link} onClick={() => changeroute('/' + navItemsLink[i])} key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, mr: 1 }} className='text-right'>
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar alt="U" src="/static/images/avatar/2.jpg" />
            </IconButton>
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
      </Slide>
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
          <ListItem component={Link} onClick={() => changeroute('/' + navItemsLink[i])} key={item} disablePadding>
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
              <Home setLoad={(val) => setLoad(val)} lang={langselect} setPage={(val) => setPage(val)} />
            </Route>
            <Route exact path="/artists">
              <Art setLoad={(val) => setLoad(val)} lang={langselect} setPage={(val) => setPage(val)} />
            </Route>
            <Route exact path="/artist/:id">
              <ArtDetail setLoad={(val) => setLoad(val)} lang={langselect} setPage={(val) => setPage(val)} />
            </Route>
            <Route exact path="/news">
              <News setLoad={(val) => setLoad(val)} lang={langselect} setPage={(val) => setPage(val)} />
            </Route>
            <Route exact path="/songlist">
              <TopChart setLoad={(val) => setLoad(val)} lang={langselect} setPage={(val) => setPage(val)} />
            </Route>
            <Route exact path="/about">
              <About setLoad={(val) => setLoad(val)} lang={langselect} setPage={(val) => setPage(val)} />
            </Route>
            <Route exact path="/contact">
              <Contact setLoad={(val) => setLoad(val)} lang={langselect} setPage={(val) => setPage(val)} />
            </Route>
          </BasicSwitch>
        </div>
      </Box>
      <br />
      <Slide in={!loadsession} direction="up">
      <footer className='fixed-bottom text-center text-dark pb-1 pt-1 bg-light' ref={ref}>
        &copy; Copyright 2023 CPXDevStudio<br />
        All artist information and images are the property of the record label owner and the artist themselves. This website is intended to support artists on a non-profit basis.
      </footer>
      </Slide>
    </Box>
  );
}

export default App