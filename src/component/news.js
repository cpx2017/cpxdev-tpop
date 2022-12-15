import React from 'react'
import pagedetail from '../menulist/News.json'
import Typography from '@mui/material/Typography';
import { CardHeader, CardMedia, Card, AlertTitle, Alert, ListItem, ListItemButton, ListItemText, Snackbar } from '@mui/material';
import {
  useParams,
  useHistory
} from "react-router-dom";
import moment from 'moment'


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const News = ({setLoad, lang}) => {
    const [width, setRealwidth] = React.useState(window.innerWidth);
    const [langselect, setLang] = React.useState('en');
    const [rootArr, setRootArr] = React.useState([]);
    const [readyupdate, setReadyUpdate] = React.useState(false);
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
      fetch('https://apiweb.cpxdev.tk/tpop/news/'+ lang, {
        method: 'post'
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setRootArr(data.sort((a, b) => (new Date(b.pubDate) - new Date(a.pubDate))))
          }
          setLoad(false)
        });
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }, []);

    const UpdateFetch = () => {
        setReadyUpdate(false)
        setLoad(true)
        fetch('https://apiweb.cpxdev.tk/tpop/news/'+ lang, {
          method: 'post'
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.length > 0) {
              setRootArr(data.sort((a, b) => (new Date(a.pubDate) > new Date(b.pubDate)) ? 1 : ((new Date(a.pubDate) < new Date(b.pubDate)) ? -1 : 0)))
            }
            setLoad(false)
          });
    }

    React.useEffect(() => {
        if (rootArr.length > 0) {
            setReadyUpdate(true)
          }
      }, [lang]);
    
    React.useEffect(() => {
      setLang(lang)
    }, [lang]);
    return ( 
        <>
          <CardHeader title={(<h3>{pagedetail[langselect].title}</h3>)} />
                <Snackbar anchorOrigin={{horizontal: "center",vertical: "top" }} open={readyupdate}>
                    <Alert className='point' severity="info" onClick={() => UpdateFetch()}>
                        <AlertTitle>{pagedetail[langselect].notify.head}</AlertTitle>
                        {pagedetail[langselect].notify.sub}
                    </Alert>
                </Snackbar>
          <div className='text-center'>
            <div className='container col-12'>
              <div className='row d-flex justify-content-center'>
              {rootArr.map((item) => (
                 <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemText primary={
                        (<Typography variant='h6' dangerouslySetInnerHTML={{ __html: removefonttag(item.description)}} />)} secondary={pagedetail[langselect].obj.by + item.source["#text"] + pagedetail[langselect].obj.provide + moment.utc(new Date(item.pubDate).toISOString()).local().locale(langselect).format("DD MMMM YYYY HH:mm")} 
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
 
export default News;