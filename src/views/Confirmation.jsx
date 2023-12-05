import './Confirmation.scss';
import { useLocation } from 'react-router-dom';
import { useState } from 'react'
import Top from '../components/Top/Top';
import Navigation from '../components/Navigation/Navigation';
import Input from '../components/Input/Input';

function Confirmation() {
    const { state } = useLocation();
    const [confirmed, setConfirmed] = useState(false)
    

    return (
        <section role='confirmation-view' className='confirmation'>
            <Navigation />
            <Top title="See you soon!" />
            { state && !confirmed ?
                <form className='confirmation__details' onSubmit={() => setConfirmed(true) }> 
                    <Input role='confirmation-when' label="When" type="text" customClass="confirmation__input"
                    defaultValue={ state.confirmationDetails.when.replace('T', ' ') }
                    disabled="disabled" />
                    <Input role='confirmation-who' label="Who" type="text"  customClass="confirmation__input"
                    defaultValue={ state.confirmationDetails.people }
                    disabled="disabled" />
                    <Input role='confirmation-lanes' label="Lanes" type="text" customClass="confirmation__input"
                    defaultValue={ state.confirmationDetails.lanes }
                    disabled="disabled" />
                    <Input role='confirmation-booking-nr' label="Booking number" type="text" customClass="confirmation__input"
                    defaultValue={ state.confirmationDetails.id }
                    disabled="disabled" />
                    <article className='confirmation__price'>
                        <p>Total:</p>
                        <p role='total-price'>{ state.confirmationDetails.price } sek</p>
                    </article>
                    <button role='sweet-lets-go-btn' className='button confirmation__button'>Sweet, let's go!</button>
                </form> : <h2 role='no-booking-made' className='confirmation__no-booking'>Inga bokning gjord!</h2>
            }
        </section>
    )
}

export default Confirmation;