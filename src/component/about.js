import React from 'react'
import pagedetail from '../menulist/About.json'
import Typography from '@mui/material/Typography';
import { CardHeader, CardMedia, Card, CardActionArea, CardContent, List, ListItem, ListItemText, Grow } from '@mui/material';

import {
  useParams,
  useHistory
} from "react-router-dom";

const About = ({load, setLoad, lang, setPage}) => {
    const [width, setRealwidth] = React.useState(window.innerWidth);
    const [langselect, setLang] = React.useState('en');
    const History = useHistory();

    React.useEffect(() => {
      function handleWindowResize() {
        setRealwidth(window.innerWidth);
      }
  
      if (lang == 'th') {
        setPage('เกี่ยวกับ')
      } else {
        setPage('About')
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

    if (load) return null
    return ( 
      <>
      <CardHeader title={pagedetail[langselect].title} />
        <Typography className='indent mt-4' dangerouslySetInnerHTML={{ __html: pagedetail[langselect].desc }}>
        </Typography>
        <div className='mt-4'>
        <List>
                    <ListItem>
                        <ListItemText primary={(<h5>{pagedetail[langselect].list[0].title}</h5>)} />
                    </ListItem>
                </List>
        {
            pagedetail[langselect].list.map((item, i) => i > 0 && (
                <List key={item.title}>
                    <ListItem>
                        <ListItemText primary={item.title} secondary={item.desc} />
                    </ListItem>
                </List>
            ))
        }
        </div>
      </>
     );
}
 
export default About;