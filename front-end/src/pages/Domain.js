import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { fetching, translate, SetupContext, Loader, Price, MoneyFormat, Card } from '../utils/generals';
import { Helmet } from "react-helmet";
import { CheckCircle } from 'react-bootstrap-icons';
import { useParams } from "react-router-dom";

const Domain = ( props ) => {
    const [ domain, setDomain ] = useState(null);
    const { global, config } = useContext(SetupContext);
    let params = useParams();

    const loadContents = async () =>{
        fetching(config, global, 'domain/'+params.extension, setDomain).then(oo =>{
            setDomain(oo);
        });
    }

    let title
    let description
    let keywords

    if(domain !== null){
        title = translate( 'registrar-dominio' ) + domain.domain.extension + ', ' + translate('dominios') + " " + domain.domain.extension;
        description = translate( 'consulta-whois-para-registro-de-dominios' ) + " " + domain.domain.extension;
    }

    useEffect(() => loadContents(), []);

    return (
        <div className=''>
            {
                domain != null ? (
                <>
                    <Helmet>
                        <title>{ title }</title>
                        <meta name="description" content={ description } />
                        <meta name="keywords" content={ keywords } />
                        <meta property="og:title" content={ title } />
                    </Helmet>
                    
                    <Container className='py-5'>
                        <Row className='justify-content-center'> 
                            <Col>
                                <div className='d-flex justify-content-between'>
                                    <div className=''>
                                        <div className='d-flex align-items-center gap-3'>
                                            <h1 className='m-0'> { translate('dominio', 0) + ' ' + translate(domain.domain.extension, 0) }</h1>
                                            {domain.domain.priceoffert !== null ? 
                                                <>
                                                    <div className='text-xs m-0 text-decoration-line-through text-secondary'><Price className={'m-0'} value={domain.domain.price}/></div>
                                                    <div className='text-sm'><Price className={'m-0 green'} value={domain.domain.priceoffert}/></div>
                                                </>
                                            : 
                                                <>
                                                    <div className='text-sm m-0'><Price className={'m-0 green'} value={domain.domain.price}/></div>
                                                </>
                                            }
                                            
                                        </div>
                                    </div>
                                    <img height={30} src={ domain.domain.img !== null && domain.domain.img !== "" ? global.domainFiles + domain.domain.img : global.domainFiles + domain.country_domain.img } />
                                </div>                                    
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} sm={12} md={8} lg={8}>
                                <Row className='mt-4'>
                                    <Col>
                                        <p className='subtitle'>{ translate(domain.domain.specialty.title, 0) }</p>
                                        <div dangerouslySetInnerHTML={{ __html : translate(domain.domain.content) }}></div>
                                    </Col>
                                </Row>

                                <Row className='mt-4'>
                                    <Col>
                                        <p className='subtitle'>{ translate(domain.ciclo.title, 0) }</p>
                                        <div dangerouslySetInnerHTML={{ __html : translate(domain.ciclo.content) }}></div>
                                    </Col>
                                </Row>

                                <Row className='mt-4'>
                                    <Col>
                                        <p className='subtitle'>{ translate(domain.residence.content, 0) }</p>
                                        <div dangerouslySetInnerHTML={{ __html : !domain.domain.o_residence ? translate(domain.residence.content, 0) : domain.domain.residences }}></div>
                                    </Col>
                                </Row>

                                <Row className='mt-4'>
                                    <Col>
                                        <p className='subtitle'>{ translate(domain.technicals.title, 0) }</p>
                                        <div dangerouslySetInnerHTML={{ __html : !domain.domain.o_technicals ? translate(domain.technicals.content, 0) : domain.domain.technicals }}></div>
                                    </Col>
                                </Row>

                                <Row className='mt-4'>
                                    <Col>
                                        <p className='subtitle'>{ translate(domain.registration.title, 0) }</p>
                                        <div dangerouslySetInnerHTML={{ __html : !domain.domain.o_registration ? translate(domain.registration.content, 0) : domain.domain.registration }}></div>
                                    </Col>
                                </Row>

                                <Row className='mt-4'>
                                    <Col>
                                        <p className='subtitle'>{ translate(domain.transfers.title, 0) }</p>
                                        <div dangerouslySetInnerHTML={{ __html : !domain.domain.o_transfers ? translate(domain.transfers.content, 0) : domain.domain.transfers }}></div>
                                    </Col>
                                </Row>

                                <Row className='mt-4'>
                                    <Col>
                                        <p className='subtitle'>{ translate(domain.renewals.title, 0) }</p>
                                        <div dangerouslySetInnerHTML={{ __html : !domain.domain.o_renewals ? translate(domain.renewals.content, 0) : domain.domain.renewals }}></div>
                                    </Col>
                                </Row>

                                <Row className='mt-4'>
                                    <Col>
                                        <p className='subtitle'>{ translate(domain.cancelation.title, 0) }</p>
                                        <div dangerouslySetInnerHTML={{ __html : !domain.domain.o_cancelation ? translate(domain.cancelation.content, 0) : domain.domain.cancelation }}></div>
                                    </Col>
                                </Row>

                                <Row className='mt-4'>
                                    <Col>
                                        <p className='subtitle'>{ translate(domain.updatedns.title, 0) }</p>
                                        <div dangerouslySetInnerHTML={{ __html : !domain.domain.o_updatedns ? translate(domain.updatedns.content, 0) : domain.domain.updatedns }}></div>
                                    </Col>
                                </Row>

                                <Row className='mt-4'>
                                    <Col>
                                        <p className='subtitle'>{ translate(domain.changeowner.title, 0) }</p>
                                        <div dangerouslySetInnerHTML={{ __html : !domain.domain.o_changeowner ? translate(domain.changeowner.content, 0) : domain.domain.changeowner }}></div>
                                    </Col>
                                </Row>

                                <Row className='mt-4'>
                                    <Col>
                                        <p className='subtitle'>{ translate(domain.officialinfo.title, 0) }</p>
                                        <div dangerouslySetInnerHTML={{ __html : !domain.domain.o_officialinfo ? translate(domain.officialinfo.content, 0) : domain.domain.officialinfo }}></div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Card header={ translate('extensiones-relacionadas') }>
                                    { domain.may_like.map( domainit => {                                        
                                        return (
                                                <div className='d-flex py-1 justify-content-between' key={domainit.id}>
                                                    <a className='dark-gray' href={ translate('menu_items-32-link') + '/' + domainit.alias}>{domainit.extension}</a>
                                                    <div className='d-flex gap-2  align-items-center'>
                                                        <span className={domainit.priceoffert !== null ? 'text-xs text-decoration-line-through text-secondary' : 'text-success'}><MoneyFormat value={domainit.price}/></span>
                                                        {domainit.priceoffert !== null && <span className='text-success font-weight-bolder'><MoneyFormat value={domainit.priceoffert}/></span>}
                                                    </div>
                                                    
                                                </div>
                                                )
                                        }) 
                                    }
                                    <div className='text-center border-top pt-3 mt-3'>
                                        <a 
                                            href={ translate('menu_items-32-link') }
                                            style={{ whiteSpace: 'nowrap'}}
                                        >
                                            {translate('-extensiones-de-dominios')}
                                        </a>
                                    </div>
                                </Card>

                                <Card className={'mt-5'} header={ translate('translations-3307-value',0) }>
                                    { domain.domain_support.map( dosup => {  
                                            var icon = domain.domain.o_domain_support === 0 ? <CheckCircle className='green' /> : "Condicion";     
                                            return (
                                                <div className='py-1' key={dosup.id}>
                                                    {icon} { translate(dosup.title,0) }
                                                </div>
                                            )
                                        })
                                    }
                                </Card>

                                <Card className={'mt-5'} header={ translate('dominios') +" "+ translate(domain.domain.specialty.title, 0) }>
                                    { domain.domains_same.map(item => {                                        
                                        return (
                                                <div className='d-flex py-1 justify-content-between' key={item.id}>
                                                    <a className='dark-gray' href={ translate('menu_items-32-link') + '/' + item.alias}>{item.extension}</a>
                                                    <div className='d-flex gap-2 align-items-center'>
                                                        <span className={item.priceoffert !== null ? 'text-xs text-decoration-line-through text-secondary' : 'text-success'}><MoneyFormat value={item.price}/></span>
                                                        {item.priceoffert !== null && <span className='text-success font-weight-bolder'><MoneyFormat value={item.priceoffert}/></span>}
                                                    </div>                                                    
                                                </div>
                                                )
                                        })  
                                    }
                                </Card>
                            </Col>
                        </Row>
                        
                    </Container>
                </>
                )
                :
                <Loader />
            }
        </div>

    );
};

export default Domain;