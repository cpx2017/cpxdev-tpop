import React from 'react'
import pagedetail from '../menulist/Artists.json'
import Typography from '@mui/material/Typography';
import { CardHeader, CardMedia, Card, CardActionArea, CardContent, Button, LinearProgress, Snackbar, Alert, AlertTitle } from '@mui/material';
import {
  useParams,
  useHistory
} from "react-router-dom";


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Art = ({load, setLoad, lang, setPage}) => {
    const [width, setRealwidth] = React.useState(window.innerWidth);
    const [langselect, setLang] = React.useState('en');
    const [rootArr, setRootArr] = React.useState([]);

    const [loadInfinite, setInfinLoad] = React.useState(false);
    const [updatedone, setDone] = React.useState(false);
    const [Alertupdatedone, setAlertDone] = React.useState(false);
    const History = useHistory();
  
    const FetchData = () => {
      setLoad(true)
      fetch('https://apiweb.cpxdev.tk/tpop/artistlist?lang='+lang, {
        method: 'post'
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setRootArr(data.sort((a, b) => (a.artName[lang] > b.artName[lang]) ? 1 : ((a.artName[lang] < b.artName[lang]) ? -1 : 0)))
          }
          setLoad(false)
        });
    }
    
    React.useEffect(() => {
      function handleWindowResize() {
        setRealwidth(window.innerWidth);
      }
  
      if (lang == 'th') {
        setPage('รายชื่อสิลปิน')
      } else {
        setPage('Artists')
      }
      window.addEventListener('resize', handleWindowResize);
      FetchData()
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }, []);
    
    React.useEffect(() => {
      FetchData()
      setTimeout(() => setLang(lang), 600)
    }, [lang]);

    const changep = (artid) => {
      setLoad(true)
      setTimeout(() => History.push('/artist/' + artid), 600)
    }
    
    const LoadmoreFunc = () => {
      if (!updatedone && !loadInfinite && rootArr.length >= 8) {
        setInfinLoad(true)
        setTimeout(() => {
        const pre = rootArr.length
        fetch('https://apiweb.cpxdev.tk/tpop/artistListLoad?lang='+lang + '&countloaded=' + pre, {
          method: 'post'
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.length > 0) {
              let datatemp = rootArr
              for (let i = 0; i < data.length ; i++) {
                datatemp.push(data[i])
              }
              setRootArr(datatemp)
              if (data.length < 8) {
                setDone(true)
                setAlertDone(true)
              }
            } else {
              setDone(true)
              setAlertDone(true)
            }
            setInfinLoad(false)
          });
        }, 600)
      }
    }


     

    if (load) return null
    return ( 
        <div>
         <Snackbar anchorOrigin={{horizontal: "center",vertical: "top" }} open={Alertupdatedone} onClose={() => setAlertDone(false)} autoHideDuration={4000}>
                    <Alert className='point' severity="info" onClick={() => setAlertDone(false)}>
                        <AlertTitle>{langselect == 'th' ? 'รายชื่อศิลปินแสดงทั้งหมดแล้ว' : "That's all we know"}</AlertTitle>
                        {langselect == 'th' ? 'ไม่พบรายชื่อศิลปินเพิ่มเติมในระบบ' : "No any more artists to load"}
                    </Alert>
                </Snackbar>
          <CardHeader title={(<h3>{pagedetail[langselect].title}</h3>)} />
          <div className='text-center'>
            <div className='container col-12'>
              <div className='row d-flex justify-content-center'>
              {rootArr.map((item) => (
                  <Card key={item.artId} className={'col-md-3 mt-2 text-center'}>
                    <CardContent>
                      <CardActionArea onClick={() =>  changep(item.artId)}>
                        <CardMedia className='mb-2 imgcircle' src={item.artImg} component='img' />
                          <Typography variant='h5'>
                            {item.artName[langselect]}
                          </Typography>
                          <Typography variant='subtitle2'>
                          {langselect == 'th' && 'ศิลปิน'}{capitalizeFirstLetter(item.artType[langselect])}{langselect == 'en' && ' Artist'}
                          </Typography>
                      </CardActionArea>
                    </CardContent>
                  </Card>
                ))}
                <div className='container col-md-12 mt-2'>
                {!updatedone && !loadInfinite ? (
                  <Button className='w-100' size='large' variant='contained' onClick={() => LoadmoreFunc()} color='primary'>{lang =='th' ? 'โหลดเพิ่มเติม': 'Load more'}</Button>
                ):!updatedone && loadInfinite ?(
                  <LinearProgress className='mt-3 rounded' sx={{height: '7px'}} />
                ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
     );
}
 
export default Art;