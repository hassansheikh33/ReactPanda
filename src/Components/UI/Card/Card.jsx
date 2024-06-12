import classes from './Card.module.css'

export default function Card(props) {
    const classList = classes.card + ' ' + props.className;
    return (
        <div className={classList}>{props.children}</div>
    )
}