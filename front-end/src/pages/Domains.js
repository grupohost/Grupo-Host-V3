import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, ListGroup} from 'react-bootstrap';
import { fetching, translate, SetupContext, Loader } from '../utils/generals';
import {Helmet} from "react-helmet";
import axios from 'axios';

const Domains = ( props ) => {
    const [ domains, setDomains ] = useState(null);
    const [ domainsList, setDomainsdomainsList ] = useState(null);
    const { global, loading, setLoadingMain, config } = useContext(SetupContext);

    const loadContents = async () =>{        
        fetching(config, global, 'domains', setDomains);
        let result = await axios.get(global.domainBackEndFile + 'domains/domains_ext.json');
        setDomainsdomainsList(result.data);
        
    }

    useEffect(() => loadContents(), [])

    return (
        <div className=''>
            {
                domains != null && (
                <>
                    <Helmet>
                        <title>{ translate(domains.content.metatitle, 0) }</title>
                        <meta name="description" content={ translate(domains.content.metadescription, 0) } />
                        <meta name="keywords" content={ translate(domains.content.metakeywords, 0) } />
                        <meta property="og:title" content={ translate(domains.content.metatitle, 0) } />
                    </Helmet>
                    <Container className='py-5'>
                        <h2 className='text-center'>{ translate(domains.content.title, 0) }</h2>
                        <p className='text-center mb-5'>{ translate(domains.content.content, 0) }</p>
                        { domainsList !== null ?
                        <Row>
                            {domainsList.map(item => {
                                return (
                                    <Col key={'it'+item.id} xs={12} md={4} lg={3} xl={2}>
                                        <p><span className='subtitle'><a className='dark-gray' href={ translate('menu_items-32-link',0) + '/' + item.alias}>{item.extension}</a></span> - { translate(item.specialty.title, 0) }</p>
                                    </Col>
                                );
                            })}
                        </Row>
                        :
                        <Loader />
                        }
                    </Container>
                </>
                )
                
            }
        </div>

    );
};

export default Domains;