import React from 'react'
import pagedetail from '../menulist/Artists.json'
import Typography from '@mui/material/Typography';
import { CardHeader } from '@mui/material';

const Art = ({setLoad, lang}) => {
    const [width, setRealwidth] = React.useState(window.innerWidth);
    const [langselect, setLang] = React.useState('en');
  
    
    React.useEffect(() => {
      function handleWindowResize() {
        setRealwidth(window.innerWidth);
      }
  
      window.addEventListener('resize', handleWindowResize);
      setLoad(true)
      fetch('https://api.cpxdev.tk/home/status')
        .then((response) => response.text())
        .then((data) => setLoad(false));
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }, []);
    
    React.useEffect(() => {
      setLang(lang)
    }, [lang]);
    return ( 
        <>
          <CardHeader title={(<h3>{pagedetail[langselect].title}</h3>)} />
        </>
     );
}
 
export default Art;