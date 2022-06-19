import { 
    Container, 
    Row, 
    Col, 
    Navbar, 
    Nav, 
    NavDropdown, 
    Offcanvas,
    Button
} 
from 'react-bootstrap';

import { 
    Loader,
    SetupContext, 
    Translate, 
    translate,
    Searcher 
} from '../utils/generals';


import { 
    createContext, 
    useContext, 
    useState 
} 
from 'react';

import axios from 'axios';

import { 
ArrowClockwise,
Chat,
Person, 
Cart,
CaretDownFill, 
CaretUpFill,
Gear
} from 'react-bootstrap-icons';

import { Observer } from "mobx-react"

import { useConfig } from '../hooks/useConfig';

export const Header = ( { main, setShowCart, showCart } ) => {
    const { global } = useContext(SetupContext);
    const [ config, setConfig ] = useConfig();

    let selectedLang 
    let selectedCurrency 
    let selectedCountry 

    if(main !== null){
        selectedLang = main.languages.filter(i => i.id === config.lang)[0].name;
        selectedCurrency = main.currencies.filter(i => i.id === config.currency)[0].code;
        selectedCountry = main.countries.filter(i => i.id === config.country)[0];
    }

    return <header className='border-bottom'>
        <Container fluid>
            <Row className={'justify-content-between top border-bottom align-items-center'}>
                <Col>
                    <Navbar className='m-0 p-0' expand="lg">
                        <Navbar.Toggle className={'border-0'} aria-controls="left-side-header" >
                            <Gear />
                        </Navbar.Toggle>
                        <Navbar.Collapse id="left-side-header">
                            <Nav className="me-auto">
                                <NavDropdown title={selectedLang} id="language-nav-dropdown">
                                    {
                                        main.languages.map(item => {
                                            return <NavDropdown.Item 
                                                        key = {'langiop' + item.id}
                                                        onClick={ () => {
                                                                setConfig({
                                                                    lang: item.id
                                                                })
                                                            } }
                                                    >{item.name}</NavDropdown.Item>
                                        })
                                    }
                                </NavDropdown>
                                <NavDropdown title={selectedCurrency} id="currency-nav-dropdown">
                                    {
                                        main.currencies.map(item => {
                                            return <NavDropdown.Item 
                                                        key = {'currencyop' + item.id}
                                                        onClick={ () => setConfig({currency: item.id}) }
                                                    >{item.code}</NavDropdown.Item>
                                        })
                                    }
                                </NavDropdown>
                                <Nav.Link>
                                    {selectedCountry.phone}
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
                <Col>
                    <Nav className={'justify-content-end'}>
                        <Nav.Link>
                            <Chat/> <span className='pc'>Livechat</span>
                        </Nav.Link>
                        <Nav.Link
                            onClick={()=>setShowCart(!showCart)}
                        >
                            <Cart/>
                        </Nav.Link>
                        <Nav.Link>
                            <Person/>
                        </Nav.Link>
                    </Nav>
                </Col>
            </Row>
            <Row className={'align-items-center'}>
                <Col xs={12} sm={12} md={12} lg={6}>
                    <div className='d-flex justify-content-between justify-content-lg-start'>
                        <a className={'py-3 d-block'} href={'/'}>
                            <img 
                                height={57}
                                alt={ main.main.websitename + ' - ' + selectedCountry.name } 
                                src={ global.domainFiles + main.main.logo }
                            />
                        </a>

                        <Navbar className={'justify-content-start main-menu'} expand="lg">
                            <Navbar.Toggle aria-controls="main-menu" />
                            <Navbar.Collapse className={'w-100 justify-content-start'}  id="right-side-header" >
                                <Nav className={'justify-content-start'}>
                                    { 
                                        main.main_menu.map(i => {
                                            var checkIfChildren = main.main_menu.filter(it => it.parent_id === i.id)                                            
                                            return (
                                                <div key={i.id}>
                                                    {i.parent_id === 0 && (
                                                        <>
                                                        { !checkIfChildren.length ? 
                                                            <Nav.Link key={'mainmenu'+i.id} href={ translate(i.link) } >{ translate(i.name) }</Nav.Link> 
                                                        : 
                                                            <NavDropdown title={ translate(i.name) } id="basic-nav-dropdown">
                                                                {checkIfChildren.map(nav => <NavDropdown.Item key={nav.id} href={ translate(nav.link) }>{ translate(nav.name) }</NavDropdown.Item>)}
                                                            </NavDropdown>
                                                        }
                                                        
                                                        </>
                                                    )
                                                    }
                                                </div>
                                            );
                                        })
                                    }
                                    
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                </Col>
                <Col className={'justify-align-start justify-lg-align-end text-start text-lg-end'}>
                    <Searcher main = {main} />
                </Col>
            </Row>
        </Container>
    </header>

}
const Footer = ( {main, config, setConfig, global} ) => {
    let selectedCountry;

    const [ showCountries, setShowCountries ] = useState(false);

    if(main !== null){
        selectedCountry = main.countries.filter(i => i.id === config.country)[0];
    }

    return (
        <footer>
            <div className={'bg-light border-top border-bottom py-4'}>
                <Container fluid>
                    <Row >
                        <Col xs={12} lg={6} className={'text-end'}>
                            <div className={'d-inline-flex align-items-center gap-3'}>
                                <h3 className={'m-0'}>
                                    { translate('necesita-ayuda-estamos-para-ayudarte-siempre') }
                                                                    </h3>
                                <Button className={'shadow-blue'} variant={'primary'}>
                                    { translate('contactanos') }
                                </Button>
                            </div>
                        </Col>

                        <Col className={'text-center text-lg-start mt-xs-2'}>
                            <Button 
                                onClick={ () => setShowCountries(!showCountries)}
                                variant={'light'} 
                                className={'bg-white shadow-gray'}
                            >
                                    {selectedCountry.name} { !showCountries ? <CaretDownFill /> : <CaretUpFill/> }
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className={'slide'}>
                <div className={ showCountries ? 'slideDown' : 'slideUp' }>
                    <Container fluid>
                        <Row className={'py-4'}>
                            {
                                main.countries.map(item => {
                                    return <Col key={'countries'+item.id} xs={6} md={4} lg={3}>
                                                <Button
                                                    className={'bg-white border-0 '}
                                                    variant={'light'}
                                                    onClick={ () => {
                                                        setConfig({
                                                            country: item.id
                                                        })
                                                    } }
                                                >
                                                    <img height={13} src={global.domainFiles + item.img} /> <span>{item.name}</span>
                                                </Button>
                                            </Col>
                                })
                            }
                        </Row>
                    </Container>
                </div>
            </div>

            <div className='py-4'>
                <Container fluid>
                    <Row className='footerlinks'>
                            { main.menus_footer.map(it => {
                                return (
                                    <Col key={'footermenu'+it.id} className={'mb-3'}>
                                        <h3 className='blue mb-4'>{ translate(it.name) }</h3>
                                        { it.links.map(link => {
                                            return (<p key={'linkfot'+it.id+link.id} className='mb-1'><a href={translate(link.link)}>{translate(link.name)}</a></p>) 
                                          })
                                        }
                                    </Col>
                                    ) 
                                }
                            )
                            }
                    </Row>
                </Container>
            </div>
            
            <div className='border-top py-2'>
                <Container fluid>
                    <Row>
                        <Col xs={12}>
                            © {main.websitename} {new Date().getFullYear()} {translate('rights-reserved')} 
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    );

}

export const Layout = ( {children} ) => {

    const { global, main, setMain, setLoadingMain, config, cartVal } = useContext(SetupContext);
    const [ , setConfig ] = useConfig();
    const [showCart, setShowCart] = useState(false);

    const loadMain = async() => {
        let url = global.domainBackEnd + 'index';
        let params = {
            lang: config.lang,
            currency: config.currency,
            country: config.country,
        }

        let result = await axios.get( url, {
            params : params
        } );
        
        if(result.status === 200 ){
            localStorage.setItem('main',JSON.stringify(result.data))
            setMain(result.data)
        }else{
            console.log(result);
            //setErrorMessage();
        }

        setLoadingMain(false)
    }

    if(main === null){
        loadMain()
    }

    const addToCart = (item) => {
        cartVal.addToCart(1, 'Ejemplo', 15);
        console.log(cartVal);
    }

    const deleteFromCart = (index) => {
        cartVal.removeFromCart(index);
        console.log(cartVal);
    }
   
    
    return (
        <div>
            
                { main === null ? 
                    <Loader/>
                :
                    <>
                        <Header showCart={showCart} setShowCart = {setShowCart} main = {main} />
                        <main>
                            { children }
                            <Offcanvas show={showCart} onHide={()=>setShowCart(false)}>
                                <Offcanvas.Header closeButton>
                                <Offcanvas.Title>{ translate('carrito-de-compra') }</Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                <Observer>
                                    { () => (
                                        <>
                                            { cartVal.items.length > 0 ? 
                                                <div>

                                                    {
                                                        cartVal.items.map( (item, index) => 
                                                        <div className='d-flex justify-content-between'>
                                                            <span>{item.name}</span>
                                                            <button
                                                                onClick={()=>deleteFromCart(index)}
                                                            >Borrar</button>
                                                        </div>
                                                        
                                                        )
                                                    }

                                                    <button
                                                        onClick={()=>addToCart('')}
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                                :
                                                <div>
                                                    <button
                                                        onClick={()=>addToCart('')}
                                                    >
                                                        Add
                                                    </button>
                                                    <p>{ translate('el-carrito-esta-vacio') }</p>
                                                </div>
                                            }
                                        </>
                                    )}
                                </Observer>
                                </Offcanvas.Body>
                            </Offcanvas>
                        </main>
                        <Footer main = {main} config = {config} setConfig = {setConfig} global = {global} />
                    </>
                }
        </div>
    );
}