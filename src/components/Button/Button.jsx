import '../styles.css'
export const Button = ({onClick})=>{
    return(
        <button className='Button' type='button' onClick={onClick}>Load more</button>
    )
}