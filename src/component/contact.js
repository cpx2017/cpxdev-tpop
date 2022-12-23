import React from 'react'
import pagedetail from '../menulist/Contact.json'
import Typography from '@mui/material/Typography';
import { CardHeader, CardMedia, Card, CardActionArea, ListItemIcon, List, ListItem, ListItemText, ListItemButton } from '@mui/material';

import { Telegram, Email } from '@mui/icons-material';

import {
  useParams,
  useHistory
} from "react-router-dom";

const Con = ({setLoad, lang, setPage}) => {
    const [width, setRealwidth] = React.useState(window.innerWidth);
    const [langselect, setLang] = React.useState('en');
    const History = useHistory();
  
    
    React.useEffect(() => {
      function handleWindowResize() {
        setRealwidth(window.innerWidth);
      }
  
      if (lang == 'th') {
        setPage('ติดต่อเรา')
      } else {
        setPage('Contact us')
      }
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
    
    React.useEffect(() => {
      setLang(lang)
    }, [lang]);
    return ( 
      <>
      <CardHeader title={pagedetail[langselect].title} />
        <div className='mt-2'>
        {
            pagedetail[langselect].list.map((item, i) => (
                <List key={item.title}>
                    <ListItemButton onClick={() => window.open(item.link, '_blank')}>
                      <>
                      {
                        i == 0 ? (
                          <ListItemIcon>
                            <Email />
                          </ListItemIcon>
                        ) : i == 1 ? (
                          <ListItemIcon>
                            <Telegram />
                          </ListItemIcon>
                        ) : null
                      }
                      </>
                        <ListItemText primary={item.title} />
                    </ListItemButton>
                </List>
            ))
        }
        </div>
      </>
     );
}
 
export default Con;