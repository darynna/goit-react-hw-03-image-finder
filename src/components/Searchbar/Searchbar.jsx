import '../styles.css'
import {BsFillSearchHeartFill} from 'react-icons/bs'
export const SearchBar = ({onSubmit})=>{
    return(
        <header className='Searchbar'>
    <form className="SearchForm" onSubmit={onSubmit}>
    <button type="submit" className="SearchForm-button">
      <span className="SearchForm-button-label">Search</span>
      <BsFillSearchHeartFill/>
    </button>

    <input
      className="SearchForm-input"
      name="search"
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </form>
</header>
    )
}