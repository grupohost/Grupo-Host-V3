import { useState, useEffect, useContext, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { fetching, translate, SetupContext } from '../utils/generals';
import {Helmet} from "react-helmet";

import backgroundVideo from '../resources/videos/it2.mp4';

const AboutText = ( { about, global } ) =>{
    return <div className='py-3 light-gardient dark-gray'>
        <Container >
            <Row className='align-items-center'>
                <Col xs={12} md={6}>
                    <h3
                        style={{
                            animationDelay:'.25s'
                        }}
                        className='fade-in-top'
                    >{ translate(about.about.title, 0) }</h3>
                    <div 
                        style={{
                            animationDelay:'.45s'
                        }}
                        className='fade-in-top py-3'
                        dangerouslySetInnerHTML={
                            {
                                 __html: translate(about.about.content)
                            }
                        }
                    >
                    </div>
                    <Button variant={'success'} href={'#reasons'}>Comenzar</Button>
                </Col>
                <Col>
                    <img 
                        style={{
                            animationDelay:'.95s'
                        }}
                        className={'w-100 fade-in-top'}
                        alt={ translate(about.about.title) }
                        src={ global.domainFiles + about.differents.img }
                    />
                </Col>
            </Row>
        </Container>
    </div>
}

const Differents = ( { global, about } ) =>{
    const [background, setBackground] = useState(1);
    const [sizeCanvas, setSizeCanvas] = useState({width:0, height:0});
    const [ctx, setCtx] = useState(null);
    const differentsModule = useRef();
    const canvasSpace = useRef();
    const canvasDiv = useRef();
    var images = new Array();
    var totalImages = 72;


    const scaleToFit = (img) => {
        var scale = Math.min(sizeCanvas.width / img.width, sizeCanvas.height / img.height);
        var x = (sizeCanvas.width / 2) - (img.width / 2) * scale;
        var y = (sizeCanvas.height / 2) - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }

    for (var i = 1; i < totalImages; i++) {
        var img = new Image();
        var slug = '00000' + i;
        let url = global.domainFiles+'img/sequence/about_'+slug.slice(-5) +".jpg";
        img.src = url;
        images.push(img);
    }

    var setImage = (newLocation) => {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, sizeCanvas.width, sizeCanvas.height);
        scaleToFit(images[newLocation - 1]);
    }

    function logit() {
        var bottomPosition = window.innerHeight + window.pageYOffset; 

        var offsetTop = differentsModule.current.offsetTop

        var calculatingIfArriveScrollBottom = bottomPosition - offsetTop;

        let calculate = Math.ceil( (calculatingIfArriveScrollBottom /26)) ;

        if(calculate > 0 && calculate < totalImages){
            setImage(calculate);
        }
      }

      useEffect(() => {
        setSizeCanvas({ width: canvasDiv.current.offsetWidth, height:canvasDiv.current.offsetHeight });
        setCtx(canvasSpace.current.getContext("2d"));
      }, []);

    useEffect(() => {
        function watchScroll() {
          window.addEventListener("scroll", logit);
        }
        watchScroll();
        return () => {
          window.removeEventListener("scroll", logit);
        };
    });

    return <>
        <div ref={differentsModule}>
            <div 
                style={{
                    height: '70vh'
                }}
            >
                <Container>
                <Row className={'h-100 align-items-center'} >
                    <Col className={'text-center'}>
                        
                        <div ref={canvasDiv} className={'text-center canvasSpace'} style={{
                            height: '70vh'
                        }}>
                            <canvas ref={canvasSpace} width={sizeCanvas.width} height={sizeCanvas.height}></canvas>
                        </div>
                    </Col>
                    <Col>
                        <h3>{ translate(about.differents.title, 0) }</h3>
                        <p>
                            { translate(about.differents.content,0) }
                        </p>
                    </Col>
                </Row>
                </Container>
            </div>
        </div>
        
    </>
}

const Reasons = ( { global, reasons } ) =>{
    return (
        <div id={'reasons'} className='bg-light border-top border-bottom'>
            <Container fluid>
                <div className='pt-5'>
                    <div className='pt-2 pb-3 text-center position-relative' style={{zIndex:4}}>
                        <h3 className=''>{ translate('razones-para-elegirnos') }</h3>
                    </div>
                    <Row className='position-relative pb-5' style={{
                        zIndex:4
                    }}>
                        {reasons.map(item => {
                            return (
                                <Col xs={12} md={6} lg={4} key={'reasons'+item.id}>
                                    <div className='d-flex align-items-center '>
                                        <img 
                                            height={100}
                                            src={ global.domainFiles + item.img }
                                        />
                                        <div>
                                            <p className='subtitle'>
                                                { translate(item.title,0) }
                                            </p>
                                            <p>
                                                { translate(item.content,0) }
                                            </p>
                                        </div>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                </div>
            </Container>
        </div>
    );
}

const Vision = ( {about} ) => {
    return (
        <Container>
            <div className={'bg-cyan p-5 text-white'}>
                <Row className={'g-5'}>
                    <Col>
                        <div dangerouslySetInnerHTML={{__html : translate(about.visionandmision.content)}}></div>
                    </Col>
                    <Col>
                        <h4>{ translate(about.quality.title, 0 )}</h4>
                        <div dangerouslySetInnerHTML={{__html : translate(about.quality.content)}}></div>
                    </Col>
                </Row>

            </div>
        </Container>
    );
}

const GoodHands = ( {global, good} ) =>{
    return (
        <div className={'text-center py-5'}>
            <img width={600} src={global.domainFiles + 'img/team-object2.png'} />
            <h3 className={'mt-5'}>{translate(good.title, 0)}</h3>
            <p>{translate(good.content, 0)}</p>
        </div>
    );
}
const About = () => {
    const [ about, setAbout ] = useState(null);
    const { global, loading, setLoadingMain, config } = useContext(SetupContext);
    
    const loadAbout = () =>{
        fetching(config, global, 'about', setAbout);
    }

    useEffect(() => loadAbout(), [])

    return (
        <div className=''>

            <div className='videoAbout d-flex align-items-center justify-content-center'>
                <div className='videoAboutContainer' dangerouslySetInnerHTML={{
                        __html : `
                        <video
                            autoplay = "autoplay"
                            loop = "loop"
                            muted = "muted"
                            id='videoAboutPlayer'
                        >
                            <source
                                src=" ${backgroundVideo} "
                                type='video/mp4'
                            />
                        </video>
                        `
                    }}>
                </div>
                <div>
                    <h4 className='text-center fade-in-top text-white test-shadow'>{ translate('no-ponga-su-proyecto-en-manos-de-cualquiera') }</h4>
                    <h2 className='m-0 jumbo text-white test-shadow'>{ translate('asegurelo-con-nosotros') }</h2>
                </div>
                
            </div>

            {about != null && <>
                <Helmet>
                    <title>{ translate(about.about.metatitle, 0) }</title>
                    <meta name="description" content={ translate(about.about.metadescription, 0) } />
                    <meta name="keywords" content={ translate(about.about.metakeywords, 0) } />
                    <meta property="og:title" content={ translate(about.about.metatitle, 0) } />
                </Helmet>
                <AboutText global={global} about={about}/>
                <Reasons global={global} reasons={about.reasons}/>
                <Differents global={global} about={about} />
                <Vision global={global} about={about} />
                <GoodHands global={global} good={about.good} />
                </>
             }
        </div>

    );
};

export default About;