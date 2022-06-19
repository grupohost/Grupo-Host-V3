import {useEffect, useState, useContext} from 'react';
import { Row, Col, Container, Button, Carousel, Card, CarouselItem } from 'react-bootstrap';
import { ChevronRight, ChevronLeft } from 'react-bootstrap-icons';

import { Loader, SetupContext, Translate, translate, Price, fetching } from '../utils/generals';

const Slideshow  = ( { slideshow, global } ) => {
    var headerHeight = document.querySelector('header').offsetHeight;
    var height = window.innerHeight - headerHeight;
    if(height < 500){
        height='auto';
    }
    return (
        <div style={
            {
                height : height
            }
        }>
            <div className={'h-100 slideshow'}>
                <Carousel fade
                    className={'h-100'} 
                    indicators={false} 
                    nextIcon={<Button variant={'light'} className={'btn-white-button'}><ChevronRight/></Button>}
                    prevIcon={<Button variant={'light'} className={'btn-white-button'}><ChevronLeft/></Button>}
                    >
                    { slideshow.map(item => {
                        return (
                            <Carousel.Item key={'carslide'+item.id} className='light-gardient h-100'> 
                                <Container className='h-100'>
                                    <Row className={'h-100 py-5 justify-content-between align-items-center'}>
                                        <Col xs={12} sm={6} md={5} lg={5}>
                                            <p 
                                                className='subtitle fade-in-top'
                                                style={{
                                                    animationDelay:'.10s'
                                                }}
                                            >
                                                { translate(item.title) }
                                            </p>
                                            <h1 
                                                style={{
                                                    animationDelay:'.35s'
                                                }}
                                                className={'m-0 fade-in-top'}
                                            >
                                                { translate(item.subtitle) }</h1>
                                            <Button 
                                                variant={ 'primary' } 
                                                style={{
                                                    animationDelay:'.45s'
                                                }}
                                                className={'my-4 fade-in-top shadow-blue'}
                                            >
                                                { translate(item.buttonTag) }
                                            </Button>
                                            {item.price !== null && <>
                                                <p 
                                                    style={{
                                                        animationDelay:'.55s'
                                                    }}
                                                    className={'m-0 fade-in-top'}>
                                                        <Translate value={'strating-with'}/>
                                                </p>
                                                <div 
                                                    style={{
                                                        animationDelay:'.65s'
                                                    }}
                                                    className=' fade-in-top'>
                                                        <Price value={ item.price } />
                                                </div>
                                            </>
                                            }
                                            <div
                                                style={{
                                                    animationDelay:'.75s'
                                                }}
                                                className=' fade-in-top'
                                                dangerouslySetInnerHTML={
                                                    {__html : translate(item.content, 1)}
                                                }
                                            >
                                            </div>
                                        </Col>
                                        <Col className='p-5'>
                                                <img 
                                                    style={{
                                                        animationDelay:'.95s'
                                                    }}
                                                    className={'w-100 fade-in-top'}
                                                    alt={ translate(item.title) }
                                                    src={ global.domainFiles + item.img }
                                                />
                                        </Col>
                                    </Row>
                                </Container>
                            </Carousel.Item>
                        )
                    }) 
                    }
                </Carousel>
            </div>
        </div>
    );
}

export const Razones = ( {global , reasons} ) => {
    let countSlides = reasons.length / 2;
    let reasonsLoop = []

    for (var i = 1; i <= countSlides; i++){
        var index1 = 1 * i + (i - 1);
        var index2 = 2 * i ;
        var itemone = reasons[index1];
        var itemtwo = reasons[index2];

        reasonsLoop.push(<Carousel.Item key={ 'itemcarCount'+i } className='w-100'> 
                    <div className='cardspace itemone float-left fade-in-top'
                        style={{
                            animationDelay:'.20s'
                        }}
                    >
                        <div className='d-flex'>
                            <div>
                                <p className='subtitle green'>{index1 +'. '+ translate(itemone.title, 0) }</p>
                                <div dangerouslySetInnerHTML={{__html: translate( itemone.content) }}
                                ></div>
                            </div>
                            <img 
                                className='ml-2 pc'
                                height={130}
                                src={ global.domainFiles + itemone.img } />
                        </div>
                    </div>
                    {itemtwo !== undefined && <div className='cardspace itemtwo mt-5 float-right fade-in-top'
                        style={{
                            animationDelay:'.60s'
                        }}
                    >
                            <div className='d-flex '>
                                <div>
                                    <p className='subtitle green'>{index2 +'. '+ translate(itemtwo.title, 0)}</p>
                                    <div dangerouslySetInnerHTML={{__html: translate(itemtwo.content)}}
                                    ></div>
                                </div>
                                <img 
                                    className='ml-2 pc'
                                    height={130}
                                    src={ global.domainFiles + itemtwo.img } />
                            </div>
                    </div> 
                    }
            </Carousel.Item>
        );
    }
    
    return (
        <div className={'position-relative'}>
            <div className='bottom-rounded my-5 reasons'>
                <Container className={'position-relative pt-1 pb-5'} style={{zIndex:3}}>
                    <Row className='my-5 py-5 align-items-center justify-content-around'>
                        <Col xs={12} md={4} className='text-white'>
                            <h3>
                                {translate('8-razones-para-elegirnos')}
                            </h3>
                            <p>
                                {translate('desde-2009-hemos-provisto')}
                            </p>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
            <div className='reasonscontainer w-100 pt-1 pb-5' style={{zIndex:4, top:'10px'}}>
                <Container>
                    <Row className='justify-content-around'>
                        <Col></Col>
                        <Col xs={12} md={6}>   
                            <Carousel
                                fade
                                className={'h-100'} 
                                controls={false}
                                indicators={false} 
                                nextIcon={<Button variant={'light'} className={'btn-white-button'}><ChevronRight/></Button>}
                                prevIcon={<Button variant={'light'} className={'btn-white-button'}><ChevronLeft/></Button>}
                                >
                                    {reasonsLoop}
                            </Carousel>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export const Complementos = ( { global, addons } ) => {
    return <div>
            <Container fluid>
                <Row className={'py-5 text-center'}>
                    <Col>
                        <p>
                            { translate('complementos-incluidos-en-todos-nuestros-planes')}
                        </p>
                        <h2>
                            { translate('incluyen-un-valor-de-800-en-complementos') }
                        </h2>
                    </Col>
                </Row>
                <Row className='g-5 pb-5'>
                    { addons.map(addon => {
                        return (
                            <Col key={'addon'+addon.id} className={'text-center grayscale'}>
                                <img 
                                    height={60} 
                                    src={global.domainFiles + addon.img}
                                    alt={ translate(addon.title) }
                                />
                            </Col>
                        );
                    }) }
                </Row>
            </Container>
        </div>
}

export const OtroNivel = ( { global, features } ) =>{
    return (
        <div>
            <Container fluid  className={'mb-5'}>
                <Row className={'py-5 text-center'}>
                    <Col>
                        <h2>
                            { translate('lleva-tu-negocio-a-otro-nivel') }
                        </h2>
                        <p>
                            { translate('all-the-tools-to-develop-your-projects') }
                        </p>
                    </Col>
                </Row>
                <Row className='g-5 pb-5'>
                    { features.map(feat => {
                        return (
                            <Col key={'feat'+feat.id} className={'text-center'}>
                                <i className={"fas fa-4x " + feat.icon}></i>
                                <p className='subtitle mt-4 mb-2'>
                                    { translate(feat.title, 0) }
                                    <Translate value ={feat.title}/>
                                </p>
                                <p>{ translate(feat.subtitle) }</p>
                            </Col>
                        );
                    }) }
                </Row>
                <Row>
                    <Col>
                        <div className='d-flex mb-5 gap-3 justify-content-center'>
                            <Button variant={'success'}>
                                { translate('ver-todas') }
                            </Button>
                            <Button variant='outline-light'>
                                { translate('iniciar-ahora') }
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export const ChangeProvider = ( { global, change } ) => {
    return <div className='position-relative'>
        <div className='top-rounded mt-5 pb-0 position-relative'>
            <Container className={'pb-4 position-relative '} style={{zIndex:3}}>
                <Row className='py-5'>
                    <Col xs={12} lg={6}>
                        <div className='pt-5'>
                            <h4 className='mt-5'>{ translate(change.title, 0) }</h4>
                            <div dangerouslySetInnerHTML={{ __html: translate(change.content) }}></div>
                            <Button className={'mt-4'} variant='success'>
                                { translate('iniciar-migracion') }
                            </Button>
                        </div>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
        <div className={'position-absolute w-100 pc'} style={{zIndex:4, top:0}}>
            <Container fluid>
            <Row className={'px-5'}>
                <Col></Col>
                <Col className={'px-5'}>
                    <img  
                        style={
                            { 
                                marginTop: '-70px', 
                                maxHeight: '470px'
                            }
                        }
                        className='w-100'
                        src={global.domainFiles + change.img}
                        alt={change.title_translated}
                    />
                </Col>
            </Row>
            </Container>            
        </div>
        </div>
}

const Home = () => {
    const [ home, setHome ] = useState(null);

    const { global, loading, setLoadingMain, config } = useContext(SetupContext);

    const loadHome = () => fetching(config, global, 'home', setHome);

    useEffect( () => loadHome(), [] );
    return (
        <div>
                { home === null ? 
                    <Loader/>
                : 
                <>
                    <Slideshow global={global} slideshow ={ home.slideshow } />
                    <Complementos global={global} addons ={ home.addons }/>
                    <Razones global={global} reasons={ home.reasons }/>  
                    <OtroNivel global={global} features={ home.features }/> 
                    <ChangeProvider global={global} change={ home.change }/>
                </>
                }
                
        </div>
    );
} 

export default Home;