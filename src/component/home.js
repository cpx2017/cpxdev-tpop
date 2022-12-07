import React from 'react'
import pagedetail from '../menulist/Home.json'
import Typography from '@mui/material/Typography';

const Home = ({setLoad, lang}) => {
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
        <Typography dangerouslySetInnerHTML={{ __html: pagedetail[langselect].desc }}>
        </Typography>
     );
}
 
export default Home;