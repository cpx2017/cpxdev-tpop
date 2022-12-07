import React from 'react'
import pagedetail from '../menulist/Artists.json'
import Typography from '@mui/material/Typography';
import { CardHeader, CardMedia, Card, CardActionArea, CardContent } from '@mui/material';

const a = [
  {
    artId: "8c05ea89-d8ac-4b14-b67d-e75f4862ff1b",
    artImg: "https://i.scdn.co/image/ab6761610000e5eb60bbde73af6f47df1fe8c8d5",
    artName: {
      en:"BNK48",
      th:"บีเอ็นเคโฟตี้เอต"
    },
    artType: {
      en:"group",
      th:"กลุ่ม"
    },
    artlabel: "Independent Artist Management"
  },
  {
    artId: "f2038c70-0ebb-460d-98f0-f84e23399656",
    artImg: "https://i.scdn.co/image/ab6761610000e5eb3d335d336e2cd328483e18aa",
    artName: {
      en:"SCRUBB",
      th:"สครับ"
    },
    artType: {
      en:"duo",
      th:"คู่"
    },
    artlabel: ""
  },
  {
    artId: "d4a40e1b-7598-4ef8-8fd8-e19fc8e1a0d9",
    artImg: "https://i.scdn.co/image/ab6761610000e5eb66ce24077a255374fe0ae3aa",
    artName: {
      en:"Zommarie",
      th:"ส้ม มารี"
    },
    artType: {
      en:"single",
      th:"เดี่ยว"
    },
    artlabel: "SpicyDisc"
  }
]

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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
          <div className='container col-12'>
            <div className='row d-flex justify-content-center'>
              {a.map((item) => (
                <Card className='col-md-3 text-center'>
                  <CardContent>
                    <CardActionArea>
                      <CardMedia className='mb-2' src={item.artImg} component='img' />
                        <Typography variant='h5'>
                          {item.artName[langselect]}
                        </Typography>
                        <Typography variant='subtitle2'>
                        {langselect == 'th' && 'ศิลปิน'}{capitalizeFirstLetter(item.artType[langselect])}{langselect == 'en' && ' Artist'}
                        </Typography>
                        <Typography variant='body1'>
                          {item.artlabel != "" ? item.artlabel : "No Music Label (Independent Artist)"}
                        </Typography>
                    </CardActionArea>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
     );
}
 
export default Art;