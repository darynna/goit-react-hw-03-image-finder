import axios from "axios"

export const fetchImages = async (category, page)=>{
    try{
const response = await axios.get(`https://pixabay.com/api/?q=${category}&page=${page}&key=38896914-6f1d45dc8333692d1d560c965&image_type=photo&orientation=horizontal&per_page=12`)
return response.data}
catch{
    throw new Error('Something went wrong!');
}
}