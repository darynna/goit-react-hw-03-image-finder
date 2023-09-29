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
    totalPages: 0,
    buttonHidden:  false
  }


  componentDidUpdate(prevProps, prevState){
     if(prevState.category !== this.state.category){
      this.setState({images: []})
      this.getImages()
     }

      if(prevState.page !== this.state.page){
      this.getImages()
     }
  }

  getImages= async()=>{
    try {
    const {category, page} = this.state
    this.setState({isLoading: true})
    const response = await fetchImages(category, page)
    const images = response.hits;
    const totalPages = response.total
    this.setState(prevState=>({images: [...prevState.images, ...images], totalPages: Math.ceil(totalPages / 12)}))
    } catch (error) {
      Notify.failure(error.message);
      console.log(error)
    }finally{
      this.setState({isLoading: false})
    }
  }

  handleSubmit=(e)=>{
    e.preventDefault()
    const imageTofind = e.currentTarget.elements.search.value
    console.log(imageTofind)
    this.setState({category: imageTofind})

  }

  handleLoadMore=()=>{
    const {page, totalPages} = this.state
    if(page < totalPages){
      this.setState(prevstate => ({page: prevstate.page + 1}))
    }else {
      this.setState({buttonHidden: true})
    }
    
  }


  render(){
   const {isLoading, images, buttonHidden} = this.state;


  return (
    <div className="App">
      <SearchBar onSubmit={this.handleSubmit}/>
      {isLoading && <Loader/>}
      {images.length > 0 ? <><ImageGallery images={this.state.images} handleModalOpen={this.handleModalOpen}/></> : <p className="InformLoadMore">Search for images!</p>}
      {images.length > 0 && !buttonHidden && <Button onClick={this.handleLoadMore}/>}
      {buttonHidden && <p className="InformLoadMore">Sorry, there all images we have!</p>}
      
    </div>
  );}
};
