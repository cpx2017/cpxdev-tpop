import React from 'react'
import pagedetail from '../menulist/Artists.json'
import Typography from '@mui/material/Typography';
import { CardHeader, CardMedia, Card, CardActionArea, CardContent } from '@mui/material';
import {
  useParams,
  useHistory
} from "react-router-dom";


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Art = ({setLoad, lang}) => {
    const [width, setRealwidth] = React.useState(window.innerWidth);
    const [langselect, setLang] = React.useState('en');
    const [rootArr, setRootArr] = React.useState([]);
    const History = useHistory();
  
    
    React.useEffect(() => {
      function handleWindowResize() {
        setRealwidth(window.innerWidth);
      }
  
      window.addEventListener('resize', handleWindowResize);
      setLoad(true)
      fetch('https://apiweb.cpxdev.tk/tpop/artistlist', {
        method: 'post'
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setRootArr(data.sort((a, b) => (a.artName[langselect] > b.artName[langselect]) ? 1 : ((a.artName[langselect] < b.artName[langselect]) ? -1 : 0)))
          }
          setLoad(false)
        });
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }, []);
    
    React.useEffect(() => {
      setLang(lang)
      let datatemp = rootArr
      setRootArr(datatemp.sort((a, b) => (a.artName[lang] > b.artName[lang]) ? 1 : ((a.artName[lang] < b.artName[lang]) ? -1 : 0)))
    }, [lang]);
    return ( 
        <>
          <CardHeader title={(<h3>{pagedetail[langselect].title}</h3>)} />
          <div className='text-center'>
            <div className='container col-12'>
              <div className='row d-flex justify-content-center'>
              {rootArr.map((item) => (
                  <Card key={item.artId} className={'col-md-3 mt-2 text-center'}>
                    <CardContent>
                      <CardActionArea onClick={() => History.push('/artist/' + item.artId)}>
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
              </div>
            </div>
          </div>
        </>
     );
}
 
export default Art;