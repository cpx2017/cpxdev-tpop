import React from 'react'
import pagedetail from '../menulist/Top.json'
import Typography from '@mui/material/Typography';
import { CardHeader, CardMedia, Card, Avatar, CardContent, ListItem, ListItemButton, ListItemText, ListItemAvatar, CardActionArea } from '@mui/material';
import {
  useParams,
  useHistory
} from "react-router-dom";
import moment from 'moment'
import { Fireworks } from 'fireworks-js/dist/react'

const fwoptions = {
    speed: 2,
    delay: { min: 10, max: 1500 },
  }

  const fwstyle = {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    background: 'transperent'
  }

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Top = ({setLoad, lang}) => {
    const [width, setRealwidth] = React.useState(window.innerWidth);
    const [langselect, setLang] = React.useState('en');
    const [systemupdate, setUpdate] = React.useState('Loading');
    const [rootArr, setRootArr] = React.useState([]);
    const History = useHistory();
  
    const removefonttag = (data) => {
        var div = document.createElement('div');

        // assing your HTML to div's innerHTML
        div.innerHTML = data;

        // get all <a> elements from div
        var elements = div.getElementsByTagName('font');

        // remove all <a> elements
        while (elements[0])
        elements[0].parentNode.removeChild(elements[0])

        // get div's innerHTML into a new variable
        var repl = div.innerHTML;
        return repl
    }
    
    React.useEffect(() => {
      function handleWindowResize() {
        setRealwidth(window.innerWidth);
      }
  
      window.addEventListener('resize', handleWindowResize);
      setLoad(true)
      fetch('https://apiweb.cpxdev.tk/tpop/tophits', {
        method: 'post'
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.tracks.items.length > 0) {
            setUpdate(data.tracks.items[0].added_at)
            setRootArr(data.tracks.items)
          }
          setLoad(false)
        });
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }, []);
    
    React.useEffect(() => {
      setLang(lang)
    }, [lang]);
    return ( 
        <>
          <CardHeader title={(<h3>{pagedetail[langselect].title}</h3>)} subheader={pagedetail[langselect].update + moment.utc(systemupdate).local().locale(langselect).format("DD MMMM YYYY HH:mm")} />
          <div className='text-center'>
            <div className='container col-12'>
              <div className='row d-flex justify-content-center'>
              {rootArr.map((item, i) => i < 3 && (
                  <Card key={item.track.id} className={'col-md-4 mt-2 text-center'}>
                    <CardContent>
                      <CardActionArea onClick={() => window.open(item.track.external_urls.spotify, "_blank")}>
                        {i == 0 && (
                          <Fireworks options={fwoptions} style={fwstyle} />
                        )}
                        <CardMedia className='mb-2 imgcircle' src={item.track.album.images[0].url} component='img' />
                          <CardHeader title={"#" +(i +1) + " " + item.track.name} />
                      </CardActionArea>
                    </CardContent>
                  </Card>
                ))}
              {rootArr.map((item ,i) => i > 2 && (
                 <ListItem disablePadding key={item.track.id} className={"mt-2 " + (width > 700 ? "pl-5  pr-5" : "")}>
                    <ListItemButton onClick={() => window.open(item.track.external_urls.spotify, "_blank")}>
                      <ListItemAvatar>
                        <Avatar alt={item.track.name} src={item.track.album.images[0].url} sx={{ width: 100, height: 100 }} />
                      </ListItemAvatar>
                      <ListItemText className='ml-3' primary={
                        (<Typography variant='h6'>{item.track.name}</Typography>)} secondary={item.track.artists[0].name} 
                    />
                    </ListItemButton>
                </ListItem>
                ))}
              </div>
            </div>
          </div>
        </>
     );
}
 
export default Top;