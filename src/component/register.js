import React from 'react'
import { Card, CardActionArea, CardContent, CardMedia, TextField, Zoom, FormControlLabel, Switch, Button, CardHeader, MenuItem, Backdrop } from '@mui/material';
import Swal from 'sweetalert2';
import pagedetail from '../menulist/Register.json'
import {
  useParams,
  useHistory
} from "react-router-dom";

import {
    GoogleAuthProvider,
    TwitterAuthProvider,
    signInWithPopup,
    deleteUser,
    OAuthProvider
  } from "firebase/auth";
  import auth from "../fbindex";



const Registype = [
    {label: "Choose service", value: 0},
    {label: "Google Account", value: 1},
    {label: "Twitter Account", value: 2},
    {label: "Yahoo Account", value: 3}
]

const RegisterMember = ({load, setLoad, lang, setPage}) => {
  const history = useHistory()
  const [width, setRealwidth] = React.useState(window.innerWidth);
    const [ regis, setRegis ] = React.useState({
        name: "",
        email: "",
        googleid: "",
        twitterid: "",
        yahooid: ""
    })
    const [Loadint, LoadInternal] = React.useState(false);
    const [choose, setChoose] = React.useState(0);

    const UpdateParam = (key, value) => {
        let tempedit = regis
        tempedit[key] = value
        setRegis(tempedit);
    }

    function ValidateEmail(mail) 
    {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        {
            return (true)
        }
        return (false)
    }

    React.useEffect(() => {
      function handleWindowResize() {
        setRealwidth(window.innerWidth);
      }
      sessionStorage.removeItem('artlistprevious')
      window.addEventListener('resize', handleWindowResize);
      setLoad(true)
      fetch('https://apiweb.cpxdev.tk/tpop/status')
        .then((response) => response.text())
        .then((data) => {
          setLoad(false)
        });
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }, []);

    const RegisterAPI = (obj) => {
        fetch('https://apiweb.cpxdev.tk/tpop/registerFanSpace', {
            method :'post',
            body: JSON.stringify(regis),
            headers: {
                'Content-Type': 'application/json'
              },
        })
            .then(response => response.text())
            .then(data => {
                LoadInternal(false)
                if (JSON.parse(data).status != null) {
                  deleteUser(obj.user)
                    Swal.fire({
                        title: "Error while login, please try again",
                        icon: 'error',
                        text: pagedetail.msg.regiserror[lang],
                      })
                } else {
                    if (data == "2") {
                      deleteUser(obj.user)
                        Swal.fire({
                            title: "Error while login, please try again",
                            icon: 'error',
                            text: pagedetail.msg.regiserror[lang],
                          })
                    } else if (data == "1") {
                      deleteUser(obj.user)
                        Swal.fire({
                            title: "This login authentication is already used",
                            icon: 'error',
                            text: pagedetail.msg.regisexist[lang],
                          })
                    } else {
                      LoadInternal(false)
                        Swal.fire({
                            title: "Success",
                            icon: 'success',
                            text: pagedetail.msg.regisdone[lang],
                          }).then(() => {
                            setLoad(true)
                            setTimeout(() => history.push('/'), 500);
                          })
                    }
                }
            }).catch(() => {
              deleteUser(obj.user)
                LoadInternal(false)
            })
    }

    const RegisterAction = () => {
        if (ValidateEmail(regis.email) == false) {
            Swal.fire({
                title: "Email format is incorrect",
                icon: 'warning',
                text: pagedetail.msg.emailinvalid[lang],
              })
            return;
        } else if (regis.name == '' || regis.email == '') {
            Swal.fire({
                title: "Blank value found",
                icon: 'warning',
                text: pagedetail.msg.emptyfield[lang],
              })
            return;
        } else if (choose == 0) {
            Swal.fire({
                title: "Fan Space Platform need at least one Account service to make Seamless Login.",
                icon: 'warning',
                text: pagedetail.msg.chooseservice[lang],
              })
            return;
        }
        let provider = null;
    switch (choose) {
      case 1:
        provider = new GoogleAuthProvider();
        break;
      case 2:
        provider = new TwitterAuthProvider();
        break;
      case 3:
        provider = new OAuthProvider("yahoo.com");
        break;
      default:
        alert("Login fail");
        return;
    }
    LoadInternal(true)
    signInWithPopup(auth, provider)
      .then((result) => {
        switch (choose) {
            case 1:
              UpdateParam('googleid', result.user.uid);
              break;
            case 2:
              UpdateParam('twitterid', result.user.uid);
              break;
            case 3:
              UpdateParam('yahooid', result.user.uid);
              break;
            default:
              return;
          }
          RegisterAPI(result)    
      })
      .catch((error) => {
        // Handle error.
        LoadInternal(false)
        Swal.fire({
          title: "Account Link fail",
          icon: 'error',
          text: 'Seamless Login required to use one of these service to make login process.',
        })
      });
    }

    React.useEffect(() => {
      sessionStorage.removeItem('artlistprevious')
      if (lang == 'th') {
        setPage('สมัครสมาชิก Fan Space Membership')
      } else {
        setPage('Fan Space Membership Registration')
      }
    },[])

    return (
        <div className='mt-3 container'>
            <CardHeader title={pagedetail.head[lang]} subheader={pagedetail.sub[lang]} />
            <div className='col-md-12'>
              <TextField
                 label={pagedetail.nameField[lang]}
                 className="m-3"
                 fullWidth={true}
                 onChange={(e) => UpdateParam('name',e.target.value)}
                 ></TextField>
            <TextField
                 label={pagedetail.emailField[lang]}
                 className="m-3"
                 type='email'
                 fullWidth={true}
                 onChange={(e) => UpdateParam('email',e.target.value)}
                 ></TextField>
                   <TextField
                        select
                        label={pagedetail.loginOption[lang]}
                        value={choose}
                        fullWidth={true}
                        className="m-3"
                        onChange={(e) => setChoose(e.target.value)}
                        >
                     {Registype.map((option) => (
                         <MenuItem key={option.value} value={option.value}>
                         {option.label}
                         </MenuItem>
                     ))}
              </TextField>
                 <div className='justify-content-center row'>
                    <p className='text-info'>{pagedetail.loginNotes[lang]}</p>
                 </div>
                 <div className='justify-content-center row mb-4'>
                 <Button onClick={() => RegisterAction()} variant='contained'>Register</Button>
                 </div>
            </div>
            <Backdrop  sx={{ zIndex: 1500, position: 'fixed' }} open={Loadint}>
            <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/tpopplay-load.svg" width="50px" />
        </Backdrop>
        </div>
    )
}

export default RegisterMember;