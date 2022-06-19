import { useState, useEffect, useContext, useRef } from 'react';
import { Container, Row, Col, ListGroup} from 'react-bootstrap';
import { fetching, translate, SetupContext, searchIdFromValueTranslation } from '../utils/generals';
import { useParams } from "react-router-dom";
import {Helmet} from "react-helmet";


const Legalities = ( ) => {
    const [ contents, setContents ] = useState(null);
    const [ contentSelected, setContentSelected ] = useState(null);
    const [ id, setId ] = useState(null);
    const { global, config } = useContext(SetupContext);
    let params = useParams();

    const loadContents = async () =>{
        fetching(config, global, 'legalities', setContents).then(oo =>{
            var currentID
            if(params.alias !== undefined){
                var alias = params.alias;
                currentID = searchIdFromValueTranslation('alias','Content',alias)
                setId(currentID);
            }else{
                currentID=26;
                setId(26);
            }
            setContentSelected(oo.contents.filter(i => i.id === currentID))
        });
    }
   

    useEffect(() => loadContents(), [])

    return (
        <div className=''>
            {contents != null && contentSelected !== null &&
                (
                <Container  >
                    <Row className='py-5'>
                        <Col>
                            <h3 className='dark-gray'>{translate (contentSelected[0].title, 0) }</h3>                            
                            <div className='text-justify' dangerouslySetInnerHTML={{ __html : translate (contentSelected[0].content) }}>
                            </div>
                        </Col>
                        <Col xs={12} sm={6} md={4} lg={4} xl={3}>
                            <div className=''>
                                <ListGroup className='cardspace p-0'>
                                    <ListGroup.Item><p className='m-0 subtitle dark-gray'>{ translate('legalidades') }</p></ListGroup.Item>
                                    {contents.contents.map( (it, itind) => {
                                        var link 
                                        if(it.id !== 26){
                                            link = translate('menu_items-4-link',0) + '/' + translate(it.alias,0);
                                        } else{
                                            link = translate('menu_items-4-link',0);
                                        } 
                                        return <ListGroup.Item action active={it.id === id ? true : false} href={ link }>{ translate(it.title,0) }</ListGroup.Item>
                                    }
                                    )}
                                </ListGroup>
                            </div>
                        </Col>
                    </Row>
                </Container>
                )
            }
        </div>

    );
};

export default Legalities;