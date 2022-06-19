import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { fetching, translate, SetupContext } from '../utils/generals';
import contact from '../resources/images/contact.svg';
import { PhoneVibrate, ChatDots, Wrench } from 'react-bootstrap-icons';

import {Helmet} from "react-helmet";

const ContactForm = () => {
    return (
        <div className='py-5'>
            <Container>
                <Row className='align-items-center'>
                    <Col className='fade-in-top'>
                        <h2>{ translate('formulario-de-contacto') }</h2>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>{translate('nombre')}</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>{translate('email')}</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>{translate('telefono')}</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="message">
                            <Form.Label>{translate('mensaje')}</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Button>{ translate('enviar') }</Button>
                    </Col>
                    <Col className='fade-in-bottom'>
                        <img src={contact} alt={ translate('contactar') }/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

const ContactUs = () => {
    const [ contactUs, setContactUs ] = useState(null);
    const { global, loading, setLoadingMain, config } = useContext(SetupContext);
    
    const loadServices = () =>{
        fetching(config, global, 'contact', setContactUs);
    }

    let delay = 0;
    let modules = [];

    if (contactUs){

        modules = [    
            {
                id: 1,
                classModule:'dark-gray',
                icon: <PhoneVibrate  size={86} />,
                title: contactUs.country.phone,
                btnText: translate('llamanos'),
                btnClass: "btn btn-darkgray shadow-dark-gray"
            },
            {
                id: 2,
                classModule:'green',
                icon: <ChatDots  size={86} />,
                title: translate('consulta-en-linea'),
                btnText: translate('chatear-con-representante'),
                btnClass: "btn btn-success"
            },
            {
                id: 2,
                classModule:'blue',
                icon: <Wrench size={86} />,
                title: contactUs.country.phone,
                btnText: translate('abrir-tiquete'),
                btnClass: "btn btn-primary shadow-cyan"
            }
        ]
    }

    useEffect(() => loadServices(), [])

    console.log(contactUs)

    return (
        <div className=''>            
            {contactUs != null && (
                <>
                    <Helmet>
                        <title>{ translate(contactUs.about.metatitle, 0) }</title>
                        <meta name="description" content={ translate(contactUs.about.metadescription, 0) } />
                        <meta name="keywords" content={ translate(contactUs.about.metakeywords, 0) } />
                        <meta property="og:title" content={ translate(contactUs.about.metatitle, 0) } />
                    </Helmet>
                    <div
                        className='border-bottom py-5'
                        style={{
                            backgroundSize:'cover',
                            backgroundImage:"url("+global.domainFiles + contactUs.content.img+")",
                            backgroundPosition:"center"
                        }}
                    >
                        <div className='py-5'>
                            <Container fluid>
                                <Row>
                                    <Col className='text-center'>
                                        <p className='subtitle text-white text-shadow'>{ translate(contactUs.country.name) + ' - ' + translate(contactUs.language.name) }</p>
                                        <h1 className='text-center fade-in-top text-white text-shadow'>{ translate(contactUs.content.title, 0) }</h1>
                                        <p className='text-center subtitle shadow-white fade-in-top text-white text-shadow'>{ translate(contactUs.content.content, 0  ) }</p>
                                        <div className='w-100 mt-5'>
                                            <a className='fade-in-top shadow-blue btn btn-primary'>{ translate('abrir-tiquete') }</a> <a className='btn btn-success fade-in-top'>{ translate('chatear-con-representante') }</a>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                    <div className='bg-light py-5 border-bottom'>
                        <Container>
                            <Row>
                                <Col className='text-center'>
                                    <h2 className='text-center fade-in-top'>{ translate(contactUs.contentd.title, 0) }</h2>
                                    <div className='fade-in-top mb-5' dangerouslySetInnerHTML={{__html : translate(contactUs.contentd.content)}}></div>
                                    <Row className=''>
                                    {modules.map( (mod, ind) => {
                                        delay = delay +.10;
                                        return (
                                            <Col key={ind}>
                                                <div className={'cardspace text-center my-3 py-5 fade-in-top '+mod.classModule}
                                                    style={{
                                                        animationDelay:delay+'s'
                                                    }}>
                                                    {mod.icon}
                                                    <p className='dark-gray mt-2'>{mod.title}</p>
                                                    <a className={mod.btnClass} href={mod.link}>{mod.btnText}</a>
                                                </div>
                                            </Col>
                                        );
                                    })}
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <ContactForm />
                </>
            )
             }
        </div>

    );
};

export default ContactUs;