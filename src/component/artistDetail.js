import React from 'react'
import pagedetail from '../menulist/ArtistsDetail.json'
import Typography from '@mui/material/Typography';
import { CardHeader, CardMedia, Card, CardActionArea, CardContent, ListItem, Skeleton } from '@mui/material';
import moment from 'moment'
import 'moment/locale/th'  // without this line it didn't work

import {
    useParams,
    useHistory
  } from "react-router-dom";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function numberWithCommas(x) {
    return Number(x).toLocaleString('en');
}

const ArtDetail = ({setLoad, lang}) => {
    const [width, setRealwidth] = React.useState(window.innerWidth);
    const [langselect, setLang] = React.useState('en');
    const [rootArr, setRootArr] = React.useState(null);
    const [follow, setFollow] = React.useState(null);
    const [spot, setSpot] = React.useState(null);

    const [Update, setUpdate] = React.useState(null);
    const [Currentshow, setCurrentshow] = React.useState(null);

    let { id } = useParams();
    const History = useHistory();
  
    const Fetchspot = (keyword) => {
        fetch('https://apiweb.cpxdev.tk/tpop/gettopsong/' + keyword, {
          method: 'post'
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error == undefined) {
                setSpot(data.tracks)
              } else {
                setSpot([])
              }
          });
    }

    const getArtUpdate = (keyword) => {
        fetch('https://apiweb.cpxdev.tk/tpop/getArtUpdate/' + keyword, {
          method: 'post'
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error == undefined) {
                setUpdate(data.data)
                const ran = Math.floor(Math.random() * 9);
                setCurrentshow(ran)
                setInterval(function () {
                    const ran = Math.floor(Math.random() * 9);
                    setCurrentshow(ran)
                }, 10000);
              } else {
                setUpdate([])
              }
          });
    }

    const FetchFollower = (keyword) => {
        fetch('https://apiweb.cpxdev.tk/tpop/getfollower?name=' + keyword, {
          method: 'post'
        })
          .then((response) => response.text())
          .then((data) => {
            if (data.error == undefined) {
                setFollow(data)
              } else {
                setFollow(0)
              }
          });
    }

    React.useEffect(() => {
      function handleWindowResize() {
        setRealwidth(window.innerWidth);
      }
  
      window.addEventListener('resize', handleWindowResize);
      setLoad(true)
      fetch('https://apiweb.cpxdev.tk/tpop/artistdetail/' + id, {
          method: 'post'
        })
          .then((response) => response.text())
          .then((data) => {
            if (!data.includes('response') && !data.includes('error')) {
                const json = JSON.parse(data)
                setRootArr(json)
                FetchFollower(json.forsearchFollower)
                Fetchspot(json.spotID)
                getArtUpdate(json.tweetID)
              } else {
                History.push("/artists")
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
          <CardHeader title={rootArr != null ? (<h2>{rootArr.artName[langselect]}</h2>) : (<h2>กำลังโหลด</h2>)} subheader={pagedetail[langselect].title} />
                {
                    rootArr != null && (
                        <div className='text-center'>
                            <div className='container col-12'>
                                <div className='row d-flex justify-content-center'>
                                    <div className='col-md-3'>
                                        <img className='imgcircle' src={rootArr.artImg} width="100%" />
                                    </div>
                                    <div className='col-md text-left mt-3'>
                                        <Typography variant='body1'>
                                            {pagedetail[langselect].obj.type}{langselect == 'th' && 'ศิลปิน'}{capitalizeFirstLetter(rootArr.artType[langselect])}{langselect == 'en' && ' Artist'}
                                        </Typography>
                                        <Typography variant='h6'>
                                            {pagedetail[langselect].obj.follower}{follow != null ? numberWithCommas(follow) + (langselect == 'th' ? ' คน' : " follower(s)") : (langselect == 'th' ? 'กำลังโหลดข้อมูล' : "fetching data, please wait")}
                                        </Typography>
                                        <Typography variant='h6'>
                                            {pagedetail[langselect].obj.label}{rootArr.artlabel}
                                        </Typography>
                                        <p className='indent mt-5'>
                                            {rootArr.artDesc[langselect]}
                                        </p>
                                    </div>
                                </div>
                                {
                                    Update != null && Currentshow != null && (
                                        <Card className='mt-2 pt-2'>
                                            <CardContent>
                                                <CardActionArea onClick={() => window.open("https://twitter.com/page/status/" + Update[Currentshow].id, "_blank")}>
                                                <Typography variant='h6' dangerouslySetInnerHTML={{ __html: (langselect == 'th' ? 'อัปเดตจากศิลปิน: ' : 'Update from artist: ') + Update[Currentshow].text }}></Typography>
                                                <Typography variant='subtitle1'>{langselect == 'th' ? 'อัปเดตเมื่อ ' : 'Update in '}{moment.utc(Update[Currentshow].created_at).local().locale(langselect).format("DD MMMM YYYY HH:mm")}</Typography>
                                                </CardActionArea>
                                            </CardContent>
                                        </Card>
                                    )
                                }
                                {
                                    spot != null ? (
                                        <div className='row d-flex justify-content-center mt-5'>
                                            <CardHeader className='col-12' title={langselect == 'th' ? 'เพลงที่มีผู้ฟังมากที่สุดในเดือนนี้' : 'Top Song of this month'} />
                                            {spot.map((itemobj, index) => (
                                                <Card key={itemobj.id} className={'col-md-3 mt-2 text-center'}>
                                                        <CardContent>
                                                        <CardActionArea onClick={() => window.open(itemobj.external_urls.spotify, "_blank")}>
                                                            <CardMedia className='mb-3' src={itemobj.album.images[0].url} component='img' />
                                                            <Typography variant='h5'>
                                                                {itemobj.name}
                                                            </Typography>
                                                <Typography variant='subtitle1'>{langselect == 'th' ? 'จำหน่ายเมื่อ ' : 'Released in '}{moment.utc(itemobj.release_date).local().locale(langselect).format("DD MMMM YYYY")}</Typography>
                                                        </CardActionArea>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                         </div>
                                    ) : (
                                        <Skeleton variant="text" sx={{ fontSize: '100px', marginTop: '1rem' }} />
                                    )
                                }
                            </div>
                        </div>
                    )
                }
        </>
     );
}
 
export default ArtDetail;