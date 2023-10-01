import { Component } from "react";
import { SearchBar } from "./Searchbar/Searchbar";
import { fetchImages } from "./services/api";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class App extends Component{

  state={
    images: [],
    category: '',
    isLoading: false,
    page: 1,
    loadMore: true,
  }


  componentDidUpdate(prevProps, prevState){
     if(prevState.category !== this.state.category || prevState.page !== this.state.page){
      this.getImages()
     }
  }

  getImages= async()=>{
    try {
    const {category, page} = this.state
    this.setState({isLoading: true})
    const response = await fetchImages(category, page)
    const images = response.hits;
    const totalHits = response.totalHits ;
    this.setState(prevState=>({images: [...prevState.images, ...images], loadMore: this.state.page < Math.ceil(totalHits / 12 )}))
    } catch (error) {
      Notify.failure(error.message);
    }finally{
      this.setState({isLoading: false})
    }
  }

  handleSubmit=(e)=>{
    e.preventDefault()
    const imageTofind = e.currentTarget.elements.search.value
    if (imageTofind.trim()===""){
      return Notify.warning('It is not possible to make a request for an empty srtring')
    }
    this.setState({category: imageTofind, images: [], page: 1})

  }

  handleLoadMore=()=>{
    const {loadMore} = this.state
    if(loadMore){
      this.setState(prevstate => ({page: prevstate.page + 1}))
    }else {
      this.setState({buttonHidden: true})
    }
    
  }


  render(){
   const {isLoading, images, loadMore} = this.state;


  return (
    <div className="App">
      <SearchBar onSubmit={this.handleSubmit}/>
      {isLoading && <Loader/>}
      {images.length > 0 ? <><ImageGallery images={this.state.images}/></> : <p className="InformLoadMore">Search for images!</p>}
      {loadMore && !isLoading && images.length > 0 && (
          <Button onClick={this.handleLoadMore} />)}
      {loadMore === false && <p className="InformLoadMore">Sorry, there all images we have!</p>}
      
    </div>
  );}
};
