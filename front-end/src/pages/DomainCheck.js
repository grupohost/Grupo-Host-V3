import React, { useState, useRef, useContext, useEffect } from 'react';
import { 
    Container, 
    Row, 
    Col, 
    FormControl, 
    Button, 
    Overlay, 
    Tooltip, 
    ListGroup, 
    ListGroupItem,
    ButtonGroup
} from 'react-bootstrap';
import { translate, SetupContext, fetching, Loader, Card, MoneyFormat } from '../utils/generals';
import { InfoCircle, CheckCircle, XCircle } from 'react-bootstrap-icons';
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";

const Searcher = ( {domainToSearchVal, multiple, target, checkDomain, show, setMultiple, setDomainToSearchVal } ) =>{
    return <Row className='py-5 align-items-center justify-content-center'>
        <Col xs={12} md={10} lg={9} xl={9}>
            <form
                action='/domaincheck'
                method='get'
                className='d-flex justify-content-center justify-content-lg-start align-items-center gap-3'
                onSubmit={checkDomain}
            >
                <FormControl 
                    className={'jumbo'}
                    as={ multiple ? "textarea" : "input" }
                    name={'name'}
                    ref={target}
                    onChange={(e)=>{setDomainToSearchVal(e.target.value) }}
                    value={ domainToSearchVal } 
                />
                
                <Overlay target={target} show={show} placement="bottom">
                    {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        { translate('campo-obligatorio') }
                    </Tooltip>
                    )}
                </Overlay>
                <Button 
                    type={'submit'} 
                    variant={'success'}
                >
                    { translate('search') }
                </Button>
                <button
                    type={'button'}
                    className='link'
                    style={{
                        whiteSpace : "nowrap"
                    }}
                    onClick={()=>setMultiple(!multiple)}
                >
                    {!multiple ? translate('busqueda-multiple') : translate('busqueda-individual') }
                </button>
            </form>
            {multiple && <span className='d-inline-block alert alert-light py-1 mt-3'><InfoCircle/> { translate('un-dominio-por-linea') }</span> }
        </Col>
    </Row>
}

const DomainTable = ( { checkDomainData, setWhois, global } ) =>{
    return <ListGroup>
    {checkDomainData.map(it => (
        <>{it.result === 'success' && it.domainInfo !== undefined && 
        <ListGroupItem key={it.id} className='d-flex justify-content-between align-items-center'>
            <p className='subtitle m-0'>
                {it.status === 'available' ? <CheckCircle className='green'/> : <XCircle className='text-danger'/>} {it.domainInfo.country !== undefined && it.domainInfo.country.img !== undefined && it.domainInfo.country.img !== null && it.domainInfo.country.img !== "" && <img height={20} src={global.domainFiles + it.domainInfo.country.img} alt={it.domainInfo.country.name}/>} {it.domain}
            </p>
            <div className='m-0'>
                {it.status === 'available' ? 
                    <div className=' d-flex'>
                        {it.domainInfo.priceoffert !== null ? 
                            <div className='d-flex gap-2 align-items-center'>
                                <div className='text-xs m-0 text-decoration-line-through text-secondary'><MoneyFormat className={'m-0'} value={it.domainInfo.price}/></div>
                                <div className='text-sm m-0'><MoneyFormat className={'green mr-3 jumbo'} value={it.domainInfo.priceoffert}/></div>
                            </div>
                        : 
                            <>
                                <div className='text-sm m-0'><MoneyFormat className={'m-0 green jumbo'} value={it.domainInfo.price}/></div>
                            </>
                        }
                        <button
                            style={{
                                marginLeft:10
                            }} 
                            className='btn btn-info text-white'>Agregar al carrito
                        </button>
                    </div> 
                : 
                    <div>
                        <span className='text-muted'>{translate('no-disponible')}</span>
                        <ButtonGroup >
                            <Button
                                variant={'light'}
                                onClick={()=>setWhois(checkDomainData[0].whois)}
                            >
                                Whois
                            </Button>
                            <Button
                                target={'_blank'}
                                href={'//'+checkDomainData[0].domain}
                                variant={'light'}
                            >
                                www
                            </Button>
                        </ButtonGroup>
                    </div>
                }
            </div>
        </ListGroupItem>
        }</>
        )
    )}
</ListGroup>
}

const Result = ( {checkDomainData, global, setWhois} ) => {
    const { cartVal } = useContext(SetupContext);
    const addToCart = (item) => {
        cartVal.addToCart(1, 'Ejemplo', 15);
    }
    return <Row className='align-items-center justify-content-center'>
        <Col xs={12} md={10} lg={9} xl={9}>
            { checkDomainData !== null ?
                    <>
                    { checkDomainData.domains.length > 1 ? 
                        <DomainTable global={global} checkDomainData={checkDomainData.domains} setWhois={setWhois} />
                    :
                        <div>
                            <Card className={'d-flex align-items-center justify-content-between'}>  
                                <div>
                                    <h1 className='m-0 d-flex align-items-top gap-2'>
                                        
                                        { checkDomainData.domains[0].status === 'available' ? 
                                            <CheckCircle className='green'/> 
                                        : 
                                            <XCircle className='text-danger'/>
                                        } 
                                        { checkDomainData.domains[0].domainInfo.country !== undefined && checkDomainData.domains[0].domainInfo.country.img !== undefined && checkDomainData.domains[0].domainInfo.country.img !== null && checkDomainData.domains[0].domainInfo.country.img !== "" && 
                                            <img height={40} src={global.domainFiles + checkDomainData.domains[0].domainInfo.country.img} alt={checkDomainData.domains[0].domainInfo.country.name}/>
                                        } 
                                        <span>
                                            { checkDomainData.domains[0].domain }
                                            <p className='subtitle m-0'>{ checkDomainData.domains[0].status === 'available' ? <span className='text-success'>{ translate('disponible') }</span> : <span className='text-muted'>{ translate('no-disponible') }</span>}</p>
                                        </span>
                                        
                                        
                                    </h1>
                                    
                                </div>
                                <div>
                                    {checkDomainData.domains[0].status === 'available' ? 
                                        <div className=' d-flex'>
                                            {checkDomainData.domains[0].domainInfo.priceoffert !== null ? 
                                                <div className='d-flex gap-2 align-items-center'>
                                                    <div className='text-xs m-0 text-decoration-line-through text-secondary'><MoneyFormat className={'m-0'} value={checkDomainData.domains[0].domainInfo.price}/></div>
                                                    <div className='text-sm m-0'><MoneyFormat className={'green mr-3 jumbo'} value={checkDomainData.domains[0].domainInfo.priceoffert}/></div>
                                                </div>
                                            : 
                                                <>
                                                    <div className='text-sm m-0'><MoneyFormat className={'m-0 green jumbo'} value={checkDomainData.domains[0].domainInfo.price}/></div>
                                                </>
                                            }
                                            <button
                                                style={{
                                                    marginLeft:10
                                                }} 
                                                onClick = {()=>addToCart(checkDomainData.domains[0])}
                                                className='btn btn-info text-white'>Agregar al carrito
                                            </button>
                                        </div> 
                                    : 
                                        <ButtonGroup >
                                            <Button
                                                variant={'light'}
                                                onClick={()=>setWhois(checkDomainData.domains[0].whois)}
                                            >
                                                Whois
                                            </Button>
                                            <Button
                                                target={'_blank'}
                                                href={'//'+checkDomainData.domains[0].domain}
                                                variant={'light'}
                                            >
                                                www
                                            </Button>
                                        </ButtonGroup>
                                    }

                                </div>
                            </Card>
                            {checkDomainData.recommended !== undefined && checkDomainData.recommended.length > 0 && 
                                <Card className={'mt-5'}>
                                    <p className='subtitle'>Otras recomendaciones</p>
                                    <DomainTable  global={global} checkDomainData={checkDomainData.recommended} setWhois={setWhois} />
                                </Card>
                            }
                            
                        </div>
                    }
                    </>
                :
                <Loader />
            }
        </Col>
    </Row>
}
const DomainCheck = () => {
    let [ search ] = useSearchParams();
    let domain = search.get('name');
    if(domain === undefined){
        domain = [];
        
    }
    const { main, global, config } = useContext(SetupContext);
    const [ checkDomainData, setCheckDomainData ] = useState(null);
    const [ domainToSearch ] = useState(domain.split('\r\n'));
    const [ domainToSearchVal, setDomainToSearchVal ] = useState(domain);
    const [ show, setShow ] = useState(false);
    const [ whois, setWhois ] = useState(null);

    const target = useRef(null);

    const [ multiple, setMultiple ] = useState(domain.split('\r\n').length > 1 ? true : false);

    const checkDomain = (e) => {
        e.preventDefault();
        domainToSearch === "" &&  domainToSearch !== domain ? setShow(true) : e.target.submit(); 
        domainToSearch !== "" && setShow(false);
    }

    const checkDomainAvailable = () =>{
        let tosend = domainToSearchVal.replaceAll('\r\n','|')
        fetching(config, global, 'checkdomain', setCheckDomainData,{ domains : tosend });
       
    }

    let metatitle = translate('dominio', 0) +' Whois '+ main.selected_country.name;

    useEffect(() => checkDomainAvailable(), [])

    return (
        <>
        {
            <Helmet>
                <title>{ metatitle }</title>
                <meta name="description" content={ metatitle } />
                <meta name="keywords" content={ translate('dominio', 0)+', Whois, '+ main.selected_country.name} />
                <meta property="og:title" content={ metatitle } />
            </Helmet>
         }   
            <div className='light-gardient'>
                <Container className='py-5'>

                    <Searcher 
                        show={show}
                        checkDomain={checkDomain} 
                        multiple={multiple} 
                        setMultiple={setMultiple}
                        target={target} 
                        setDomainToSearchVal={setDomainToSearchVal} 
                        domainToSearchVal={domainToSearchVal} 
                    />
                    
                    <Result 
                        global = {global} 
                        checkDomainData = {checkDomainData} 
                        setWhois = { setWhois }
                    />
                    {whois !== null &&
                        <Row className='justify-content-center mt-5'>
                            <Col xs={12} md={10} lg={8} xl={7}>
                                <div dangerouslySetInnerHTML={ { __html : whois} }></div>
                            </Col>    
                        </Row>
                    }

                </Container>
            </div>
            <div>

            </div>
        </>
    )
}

export default DomainCheck;