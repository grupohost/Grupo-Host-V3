import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { fetching, translate, SetupContext } from '../utils/generals';
import {Helmet} from "react-helmet";

const Services = () => {
    const [ services, setServices ] = useState(null);
    const { global, config } = useContext(SetupContext);
    
    const loadServices = () =>{
        fetching(config, global, 'services', setServices);
    }

    let delay = 0;

    useEffect(() => loadServices(), [])

    return (
        <div className='py-5'>
            
            {services != null && (
                <>
                    <Helmet>
                        <title>{ translate(services.service_content.metatitle, 0) }</title>
                        <meta name="description" content={ translate(services.service_content.metadescription, 0) } />
                        <meta name="keywords" content={ translate(services.service_content.metakeywords, 0) } />
                        <meta property="og:title" content={ translate(services.service_content.metatitle, 0) } />
                    </Helmet>
                    <Container fluid>
                        <Row>
                            <Col className='text-center'>
                                <h2>{ translate(services.service_content.title, 0) }</h2>
                                <p className='mb-5'>{ translate(services.service_content.content, 0  ) }</p>
                            </Col>
                        </Row>

                        <Row>
                            {
                                services.services.map( serv => {
                                    delay = delay +.15
                                    return <Col xs={12} md={4} lg={3} xl={2} key={serv.id}>
                                        <div className='cardspace text-center my-3 py-4 fade-in-top'
                                            style={{
                                                animationDelay:delay+'s'
                                            }}
                                        >
                                            <a href={'/' + translate(serv.alias, 0) }>
                                                <img src={ global.domainFiles + serv.img } />
                                                <p className='subtitle green mt-5'>{ translate(serv.title, 0)}</p>
                                            </a>
                                            <p className='m-0'>{ translate(serv.slogan, 0)}</p>
                                            
                                        </div>
                                    </Col>
                                })
                            }
                        </Row>
                    </Container>
                </>
            )
             }
        </div>

    );
};

export default Services;