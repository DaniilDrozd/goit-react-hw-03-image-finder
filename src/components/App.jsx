import React, { Component } from "react";
import Notiflix from "notiflix";
import SearchBar from "./Searchbar/Searchbar";
import Loader from "./Loader/Loader";
import Button from "./Button/Button";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal"
import { searchImages } from "components/Service/PixabayAPI";


class App extends Component {
  state = {
    topic: "",
    images: [],
    page: 1,
    totalHits: 0,
    status: "idle",
    error: null,
    selectedImage: "",
    alt: "",
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.topic !== this.state.topic || prevState.page !== this.state.page) {
      this.AddImages(); 
    }
  }

  AddImages = async () => {
    const { topic, page } = this.state;
    this.setState({ status: "pending" });

    try {
      const data = await searchImages(topic, page);

      if (data.hits.length === 0) {
        Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
        this.setState({ status: "idle" });
        return;
      }

      const normalizedImages = this.normalizedImages(data.hits);

      this.setState((prevState) => ({
        images: [...prevState.images, ...normalizedImages],
        status: "resolved",
        totalHits: data.totalHits,
      }));
    } catch (error) {
      this.setState({ status: "rejected", error: "Something went wrong!" });
    }
  };

  handleFormSubmit = (query) => {
    this.setState({
      topic: query,
      images: [],
      page: 1,
      totalHits: 0,
      error: null,
      showModal: false,
    });
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  handleSelectedImage = (imageURL, tags) => {
    this.setState({
      selectedImage: imageURL,
      alt: tags,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { images, status, selectedImage, alt, error, showModal, totalHits } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmit} />
        {status === "pending" && <Loader />}
        {error} 
        {images.length > 0 && (
          <ImageGallery images={images} selectedImage={this.handleSelectedImage} />
        )}
        {images.length !== totalHits && status === "resolved" && (
          <Button onClick={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal selectedImage={selectedImage} tags={alt} onClose={this.closeModal} />
        )}
      </>
    );
  }
}

export default App;
