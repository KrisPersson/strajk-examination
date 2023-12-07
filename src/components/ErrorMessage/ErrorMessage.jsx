import './ErrorMessage.scss';

function ErrorMessage() {
    return (
        <article role='error-msg' className='error-message'>
            <p className='error-message__text'>Fill out all the fields and make sure that people and shoes is the same number.</p>
        </article>
    )
}

export default ErrorMessage;