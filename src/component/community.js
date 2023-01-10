import React from 'react'
import { Backdrop } from '@mui/material'

const Communitymain = ({lang, setLoad, setPage, login}) => {
    const [width, setRealwidth] = React.useState(window.innerWidth);
    const [langselect, setLang] = React.useState('en');

    React.useEffect(() => {
        function handleWindowResize() {
          setRealwidth(window.innerWidth);
        }
        sessionStorage.removeItem('artlistprevious')
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
    if (login == null) {
        return ( 
            <Backdrop
            sx={{ zIndex: 100, position: 'fixed' }}
            open={true}
            className='text-light'
            >
            <img src='https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/tpopplay-load.svg' width='60px' />
            {lang == 'th' ? 'T-POP Community อยู่ระหว่างการพัฒนาระบบ': 'T-POP Community is under development'}<br/>
            {lang == 'th' ? 'ผู้ที่ไม่ได้เป็นสมาชิกจะสามารถดูกระทู้และคอมเม้นได้เท่านั้น และจะสามารถมองเห็นเฉพาะกระทู้ที่เปิดเป็นสาธารณะเท่านั้น': 'For non membership can view article and comment only. Also limit for public article.'}
          </Backdrop>
         );
    }
    return ( 
        <Backdrop
        sx={{ zIndex: 100, position: 'fixed' }}
        open={true}
        className='text-light'
        >
        <img src='https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/tpopplay-load.svg' width='60px' />
        {lang == 'th' ? 'T-POP Community อยู่ระะหว่างการพัฒนาระบบ': 'T-POP Community is under development'}
      </Backdrop>
     );
}
 
export default Communitymain;