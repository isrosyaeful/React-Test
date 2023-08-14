import './Button.scss'
interface PropsData{
    children:string,
    onClick: ()=> void
}
const Button = (props:PropsData) =>{
    return (
        <button className={'common-button'} onClick={props.onClick}>{props.children}</button>
    )
}
export default Button;