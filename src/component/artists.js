import React from 'react'
import pagedetail from '../menulist/Home.json'
import Typography from '@mui/material/Typography';

const Art = ({setLoad}) => {
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
      if (localStorage.getItem('tpoplang') != null) {
        setLang(localStorage.getItem('tpoplang'))
      } else {
        localStorage.setItem('tpoplang', langselect)
      }
    }, [])
    
    React.useEffect(() => {
      localStorage.setItem('tpoplang', langselect)
    }, [langselect]);
    return ( 
        <Typography dangerouslySetInnerHTML={{ __html: 'for testing' }}>
        </Typography>
     );
}
 
export default Art;