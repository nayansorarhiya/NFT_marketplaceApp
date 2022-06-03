import { alpha, Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Checkbox, Grid, Skeleton, styled, Typography, useTheme } from '@mui/material'
import React, { Suspense, useEffect, useState } from 'react';
import eth from '../../assets/images/eth.svg'
import { ethers } from 'ethers';
import opensea from '../../assets/images/opensea.svg';
import looksrare from '../../assets/images/looksrare.svg';
import x2y2 from '../../assets/images/x2y2.svg';
import nftx from '../../assets/images/nftx.svg';
import xmarket from '../../assets/images/xmarket.svg';
import addcarticon from '../../assets/images/addcarticon.svg';
import verifiedtick from '../../assets/images/verifiedtick.svg';
import { SportsRugbySharp } from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { getIdx, setCartIdx } from "../../store/IndexSlice";
import placeholderImage from "../../assets/images/placeholderImage.jpg";
import { CardSkeleton } from '../Skeleton';


const CountButton = styled(Button)`
    background: #485FE6;
    border: 2px solid #FFFFFF;
    border-radius: 3px;
    padding: 2px 6px;
    color: #FFFFFF;
    width: 60px;
    height: 22px;
    position: absolute;
    bottom : 5%;
    ${'' /* bottom: 90px; */}
    left: 5%;
`

const BadgeImage = styled(Avatar)`
    position: absolute;
    margin : 5%;
    height: 32px;
    width: 32px;
`
const AddCheckbox = styled(Checkbox)`
    position: absolute;
    right : 5%;
    top: 5%;
    height: 32px;
    width: 32px;
    opacity : 0;
`

export default function NFTCard(props) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [addcartCheck, setaddcartCheck] = useState(false);
    const [imgSrc, setImgSrc] = useState(placeholderImage || props.apidata.imageurl);
    useEffect(() => {
        const img = new Image();
        img.src = props.apidata.imageurl;
        img.onload = () => {
            setImgSrc(props.apidata.imageurl);
        };
    }, [props.apidata.imageurl]);

    let svgpath = '';
    switch (props.apidata.market) {
        case "looksrare":
            svgpath = looksrare;
            break;
        case "x2y2":
            svgpath = x2y2;
            break;
        case "opensea":
            svgpath = opensea;
            break;
        case "nftx":
            svgpath = nftx;
            break;
        case "xMarket":
            svgpath = xmarket;
            break;
    }

    let CartData = (useSelector((state) => state.Index.cartdata))
    const setReduxCartData = (data) => {
        dispatch(setCartIdx(data))
    }

    const cartListManage = () => {
        for (let item of CartData) {
            if (item.uid === props.apidata.uid) {
                setaddcartCheck(true)
                break;
            }
            else {
                setaddcartCheck(false)
            }
        }
    }

    useEffect(() => {
        if (CartData.length === 0) {
            setaddcartCheck(false);
            return;
        }
        cartListManage();
    }, [CartData])

    const AddtoCart = () => {
        if (svgpath !== '') {

            if (!addcartCheck) {
                setReduxCartData([...CartData, props.apidata]);
            } else {
                const popCart = CartData.filter((value) => {
                    return value.uid !== props.apidata.uid
                });
                setReduxCartData(popCart);
            }
        }
    }

    return (<>

        {props.apidata.uid !== '' && props.apidata.imageurl !== '' &&
            <Suspense fallback={<></>}>

                <Grid item lg={2.4} sm={6} xs={12} md={4} className="NFTCard" >

                    <Card sx={{ ...(addcartCheck && { boxShadow: '0 0 0 3px #485FE6,0 2px 8px #485FE6 !important' }), ...(props.buynowinput ? { cursor: 'pointer' } : { cursor: 'not-allowed' }), mt: 6, borderRadius: '10px', background: alpha(theme.palette.primary.main, 1), '&:hover': { boxShadow: '0 0 0 4px transparent, 0 2px 8px #b1b5c34d' } }} onClick={AddtoCart}>
                        <Box sx={{ position: 'relative' }}>
                            {svgpath !== '' && <><BadgeImage src={svgpath}></BadgeImage>
                                <AddCheckbox className="addicon"
                                    icon={<Avatar sx={{ width: '32px', height: '32px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}><img src={addcarticon} /></Avatar>}
                                    checkedIcon={<Avatar sx={{ width: '32px', height: '32px', backgroundColor: '#485FE6', }}><img src={verifiedtick} /></Avatar>}
                                    checked={addcartCheck}
                                    sx={{ ...(addcartCheck && { opacity: '1 !important' }) }}
                                /></>}

                            <CardMedia
                                component="img"
                                image={imgSrc}
                                alt="NFT image"
                            >
                            </CardMedia>

                            {props.rarityinput && props.apidata.rarityscore && <CountButton>#{props.apidata.rarityscore}</CountButton>}

                        </Box>

                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                                {props.apidata.name !== '' && props.apidata.name !== null ? props.apidata.name : props.apidata.id}
                                {/* {props.apidata.id} */}
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '7px', height: '21px' }}>
                                {props.buynowinput && <><Box sx={{ color: 'rgba(145, 147, 155, 1)' }}>
                                    {parseFloat(ethers.utils.formatEther((props.apidata.price).toString())).toFixed(3)}
                                </Box>
                                    <img src={eth} alt="eth" height={'21px'} /></>}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Suspense>
        }
    </>
    )
}
