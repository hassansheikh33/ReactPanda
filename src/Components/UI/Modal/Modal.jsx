import classes from './Modal.module.css'
import Card from '../Card/Card'
import ReactDOM from 'react-dom'

export default function Modal(props) {

    //or we could also make custom components from the code of backdrop and modal here and use them in return statement (to keep the code leaner)

    return (
        <>
            {ReactDOM.createPortal(<div className={classes.backdrop} onClick={props.onClose}></div>, document.getElementById('backdrop-root'))}
            {ReactDOM.createPortal(<Card className={classes.modal}>
                <div className={classes.content}>
                    {props.children}
                </div>
            </Card>, document.getElementById('overlay-root'))}
        </>
    )
}