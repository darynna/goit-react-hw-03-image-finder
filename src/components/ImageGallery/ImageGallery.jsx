import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'
import '../styles.css'

export const ImageGallery = ({images})=>{
    return(
        <ul className='ImageGallery'>
            {images.map(image => {
                return(
                    <ImageGalleryItem image={image.webformatURL} alt={image.tags} id={image.id} largeImage={image.largeImageURL}/>
                )
            })}
</ul>
    )
}