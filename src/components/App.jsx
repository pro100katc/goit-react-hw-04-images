import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import styles from 'components/App.module.css';
import { params } from "tools/params";
import {Searchbar} from './Searchbar/Searchbar';
import {ImageGallery} from './ImageGallery/ImageGallery';
import {Loader} from './Loader/Loader';
import {Button} from './Button/Button';
import {Modal} from './Modal/Modal';

export const App = () => {

  const [images, setImages] = useState([]);
  const [total, setTotal] = useState('');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageId, setImageId] = useState('');
  const [page, setPage] = useState('');

  const getImages = useCallback(async () => {
    if (page > 0)
    {try {
      setIsLoading(true)
      const {data} = await axios.get('https://pixabay.com/api/', {
        params: {
          q: search,
          page: page,
          ...params
        }});
      const {hits} = data;
      const newImages = hits.map((hit) => 
      {return {id: hit.id, webformatURL: hit.webformatURL, tags: hit.tags, largeImageURL: hit.largeImageURL}})
      setImages(prevImages => [...prevImages, ...newImages]);
      setTotal(data.total);
      } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }}
  }, [search, page])

  const handleLoadMore = () => {
    setPage(page + 1)
  }

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    setImages([]);
    setPage(1);
    setSearch(event.target.text.value);
  }

  const handleModalOpen = (event) => {
    setImageId(event.target.id);
  }

  const handleModalClose = (event) => {
    if (event.target === event.currentTarget || event.key === 'Escape') {
      setImageId('');
    }
  }

  useEffect(() => {
    getImages()
  }, [getImages]) 

  useEffect(() => {
    const interval = setInterval(() => {
      window.scrollBy(0, 10)
      if (document.documentElement.clientHeight + window.pageYOffset === document.body.offsetHeight) {
          clearInterval(interval)}
  }, 10)}, [images])

  const filterById = () => {
    const filteredImages = images.filter(image => Number(image.id) === Number(imageId))
    return filteredImages[0];
  }

  return <div className={styles.app}>
    <Searchbar onSubmitSearch={handleSubmitSearch}/>
    {images.length > 0 && <ImageGallery images={images} modalOpen={handleModalOpen}/>}
    {isLoading && <Loader/>}
    {!isLoading && images.length < total && images.length > 0 && <Button loadMore={handleLoadMore}/>}
    {imageId && <Modal image={filterById()} close={handleModalClose}/>}
  </div>
};
