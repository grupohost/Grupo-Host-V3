import { 
        Form, 
        FormControl,
        Button,
        Overlay,
        Tooltip
    } 
    from 'react-bootstrap';

import { 
        createContext, 
        useContext, 
        useState,
        useRef
    } 
    from 'react';

import axios from 'axios';

import { 
    ArrowClockwise
} from 'react-bootstrap-icons';

import NumberFormat from 'react-number-format';


export const SetupContext = createContext();

export const Loader = () => <div className='w-100 text-center py-3'><ArrowClockwise size={25} className={'spin'}/></div>;

export const MoneyFormat = ( {value, className} ) => {
    const { main } = useContext(SetupContext);
    return <NumberFormat className={className} displayType={'text'} thousandSeparator={true} prefix={main.selected_country.get_currency.symbol} value={value}/>
}

export const Price = ( props ) => {
    const { value, className } = props;
    return (
                <h1 className={className}>
                    <MoneyFormat value={value}/>
                </h1>
        );
}

export const fetching = async (config, global, alias, setFunction, extraParams = null) => {
        let url = global.domainBackEnd + alias;

        let params = {
            lang: config.lang,
            currency: config.currency,
            country: config.country,
        }

        if(extraParams !== null){
            params = { 
                ...params,
                ...extraParams
            }
        }

        let result = await axios.get( url, {
            params : params
        } );
        
        if(result.status === 200 ){
            setFunction(result.data)
            return result.data;
        }else{
            console.log(result);
            //setErrorMessage();
        }
    }



export const Translate = ( { alias } ) => {
    const translations = JSON.parse(localStorage.getItem('translations'));
    if(translations !== null){
        var selected = translations.filter(i=>i.alias === alias );
        if(selected.length > 0){
            return <>{selected[0].value}</>;
        }else{
            return <>{alias}</>;
        }
    }else{
        return <>{null}</>;
    }   
}
export const translate = ( alias, html = 1 ) => {
    const translations = JSON.parse(localStorage.getItem('translations'));
        if(translations !== null){
            var selected = translations.filter(i=>i.alias === alias );
            if(selected.length > 0){
                var value=selected[0].value;
                if(html === 0){
                    value = value.replace(/(<([^>]+)>)/gi, "");
                }

                return value;
            }else{
                return alias;
            }
        }else{
            return null;
        }
        
    }

export const searchIdFromValueTranslation = (field, model, value) => {
    let translations = JSON.parse(localStorage.getItem('translations'));
    translations = translations.filter(i => i.model === model && i.field === field && i.value.indexOf(value) > -1);
    if(translations.length > 0 ){
        translations = translations[0].itemid;
    }else{
        translations = null;
    }
    return translations;
}

export const Card = ( {header, children, className} ) => {
    return <div className={ 'cardspace w-100 p-3 '+className }>
        { header !== undefined && <p className='subtitle'>{header}</p> }
        { children }
    </div>
}


export const Searcher = ( {main} ) => {
    const { global } = useContext(SetupContext);
    const [ domainToSearch, setDomainToSearch ] = useState('');
    const [ show, setShow ] = useState(false);
    const target = useRef(null);
    const checkDomain = (e) => {
        e.preventDefault();
        domainToSearch === "" ? setShow(true) : e.target.submit(); 
    }
    return (
        <> { main !== null ?
            <div className={'d-block d-lg-flex w-100 gap-2 justify-content-end align-items-center domainsearcher'}>
                <div className='d-flex justify-content-center justify-content-lg-start align-items-center gap-3'>
                    <form
                        action='/domaincheck'
                        method='get'
                        className='d-flex justify-content-center justify-content-lg-start align-items-center gap-3'
                        onSubmit={checkDomain}
                    >
                        <Form.Group
                            controlId="validationSearchDomain"
                            className="position-relative"
                        >
                            <FormControl 
                                ref={target}
                                className={''}
                                style={{
                                    maxWidth:310,
                                    minWidth:275
                                }}
                                name={'name'}
                                onChange={(e)=>setDomainToSearch(e.target.value)}
                                value={domainToSearch}
                                placeholder={translate('find-the-right-domain-for-you')} 
                            />
                            <Overlay target={target} show={show} placement="bottom">
                                {(props) => (
                                <Tooltip id="overlay-example" {...props}>
                                    { translate('campo-obligatorio') }
                                </Tooltip>
                                )}
                            </Overlay>
                        </Form.Group>
                        <Button 
                            type={'submit'} 
                            variant={'outline-light'}
                        >
                            { translate('search') }
                        </Button>
                    </form>
                    
                    <div>
                        <div className={'d-flex gap-3 pc'}>
                            {
                                main.domains.map(it => <span key={'domainsext'+it.id}>
                                    {it.img !== "" && <img className={'desaturated'} src={global.domainFiles + it.img} /> }
                                    {it.catid === 2 && it.extension} 
                                </span>)
                            }
                        </div>

                        <div className={'text-sm text-sms mt-1 mb-0'}>
                            <a 
                                href={ translate('menu_items-32-link') }
                                style={{ whiteSpace: 'nowrap'}}
                            >
                                {translate('-extensiones-de-dominios')}
                            </a>
                        </div>
                    </div>
                </div>
                
            </div>
            :
                <Loader/>
            }
        </>
    )
}

export class CartItems{
    id;
    type;
    name;
    price;
    discount;
    _qty;
    taxes;

    constructor(id,type,name,price,taxes,qty,discount) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.price = price;
        this.taxes = taxes;
        this._qty = qty;
        this.discount = discount;
    }

    set qty(value){
        this._qty = value;
    }
}

export class Cart {
    _items = [];

    addToCart(type, name, price, taxes = 0, qty = 1, discount = 0){
        var count = this.items.length;
        var item = new CartItems(count,type,name,price,qty,discount);
        this._items.push(item);
    }

    removeFromCart(index){
        this._items.splice(index,1);
    }

    updateQty(index, qtyVal){
        this._items[index].qty = qtyVal;
    }

    get items(){
        return this._items;
    }

    get totalCart(){
        var total = this._items.reduce((prev,current) => prev + ( (current.price - current.discount) * current.qty), 0);
        return total;
    }

    get totalDiscount(){
        var discount = this._items.reduce((prev,current) => prev + (current.discount * current.qty), 0);
        return discount;
    }

    get subTotal(){
        var subtotal = this._items.reduce((prev,current) => prev + ( (current.price) * current.qty), 0);
        return subtotal;
    }

    get taxes(){
        var taxes = this._items.reduce((prev,current) => prev + ( (current.taxes) * current.qty), 0);
        return taxes;
    }
    
}