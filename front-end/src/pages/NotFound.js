import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import notfound from '../resources/images/404.svg'
import { translate } from '../utils/generals';

export const NotFound = () => (
    <div className='light-gardient'>
        <Container fluid className='py-5'>
            <Row fluid className='py-5 align-items-center'>
                <Col>
                    <h2 className='jumbo'>{ translate('algo-falta') }</h2>
                    <p>{ translate('esta-pagina-no-existe') }</p>
                    <a href='/'>{ translate('ir-a-la-pagina-inicial') }</a>
                </Col>
                <Col>
                    <img src={notfound} />
                </Col>
            </Row>
        </Container>
    </div>
)

export default NotFound;