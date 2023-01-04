import React from 'react'
import pagedetail from '../menulist/Home.json'
import Typography from '@mui/material/Typography';
import { CardHeader, CardMedia, Card, CardActionArea, CardContent, ListItem, Grow } from '@mui/material';

import {
  useParams,
  useHistory
} from "react-router-dom";

import Carousel from 'react-material-ui-carousel'

const Home = ({load, setLoad, lang, setPage}) => {
    const [width, setRealwidth] = React.useState(window.innerWidth);
    const [langselect, setLang] = React.useState('en');
    const History = useHistory();
  
    
    React.useEffect(() => {
      function handleWindowResize() {
        setRealwidth(window.innerWidth);
      }
  
      if (lang == 'th') {
        setPage('หน้าหลัก')
      } else {
        setPage('Homepage')
      }
      window.addEventListener('resize', handleWindowResize);
      setLoad(true)
      fetch('https://apiweb.cpxdev.tk/tpop/status')
        .then((response) => response.text())
        .then((data) => {
          console.log('backend ready')
          setLoad(false)
        }).catch(() => {
          console.log('fail')
        });
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }, []);
    
    React.useEffect(() => {
      setLang(lang)
    }, [lang]);

    React.useEffect(() => {
      setLang(lang)
    }, [load]);

    const changep = (artid) => {
      setLoad(true)
      setTimeout(() => History.push('/artist/' + artid), 600)
    }

    if (load) return null
    return ( 
      <>
      {
         width > 900 ? (
           <Carousel interval={8000}>
           {pagedetail[langselect].list.map((item, i) => (
             <Card key={"home-" + item.id} className={width > 1400 ? "padcro" : ''}>
                <CardActionArea className='cro-container' onClick={() => changep(item.id)}>
                  <CardMedia src={item.img} component="img" />
                  <Grow in={true} timeout={1000}>
                    <Card className='cro-text'>
                        <CardHeader title={(<h3>{item.artistName}</h3>)} subheader={pagedetail[langselect].listforclick} />
                    </Card>
                  </Grow>
                </CardActionArea>
                </Card>
          ))}
      </Carousel>
              ) : (
                <Carousel interval={8000}>
                    {pagedetail[langselect].list.map((item, i) => (
                      <Card key={"home-" + item.id} className={width > 1400 ? "padcro" : ''}>
                          <CardActionArea className='cro-container' onClick={() => History.push('/artist/' + item.id)}>
                      <CardMedia src={item.img} component="img" />
                      <Grow in={true} timeout={1000}>
                        <CardHeader title={item.artistName} subheader={pagedetail[langselect].listforclick} />
                      </Grow>
                    </CardActionArea>
                    </Card>
              ))}
          </Carousel>
              )
      }
        <Typography className='indent mt-4' dangerouslySetInnerHTML={{ __html: pagedetail[langselect].desc }}>
        </Typography>
      </>
     );
}
 
export default Home;