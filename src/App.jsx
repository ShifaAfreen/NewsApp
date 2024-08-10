import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import NewsItem from './components/NewsItem';
import RecentNews from './components/RecentNews';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const currentDate = new Date();
        const fromDate = new Date(currentDate);
        fromDate.setDate(fromDate.getDate() - 2);
        
        const formattedCurrentDate = currentDate.toISOString().split('T')[0];
        const formattedFromDate = fromDate.toISOString().split('T')[0];

        let url;
        if (searchQuery) {
          url = `https://newsapi.org/v2/everything?q=${searchQuery}&from=${formattedFromDate}&to=${formattedCurrentDate}&sortBy=popularity&apiKey=${import.meta.env.VITE_API_KEY}`;
        } else {
          url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;
        }

        const response = await axios.get(url);
        setNews(response.data.articles);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchNews();
  }, [category, searchQuery]);

  const newsWithImages = news.filter(newsItem => newsItem.urlToImage);
  const newsWithoutImages = news.filter(newsItem => !newsItem.urlToImage);

  // Ensure both sections have content
  const mainNews = newsWithoutImages.length > 0 ? newsWithoutImages : newsWithImages.slice(0, Math.ceil(newsWithImages.length / 2));
  const recentNews = newsWithoutImages.length > 0 ? newsWithImages : newsWithImages.slice(Math.ceil(newsWithImages.length / 2));

  // Pagination logic
  const itemsPerPage = 10;
  const recentItemsPerPage = 3;
  const maxRecentPages = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const [recentNewsPage, setRecentNewsPage] = useState(1);

  const displayedMainNews = mainNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const displayedRecentNews = recentNews.slice((recentNewsPage - 1) * recentItemsPerPage, recentNewsPage * recentItemsPerPage);

  const totalPages = Math.ceil(mainNews.length / itemsPerPage);
  const totalRecentPages = Math.min(Math.ceil(recentNews.length / recentItemsPerPage), maxRecentPages);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleRecentPageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalRecentPages) {
      setRecentNewsPage(newPage);
    }
  };


  return (
    <>
      <Navbar setCategory={setCategory} setSearchQuery={setSearchQuery} />
      <div className="container">
        <div className="row">
          <div
            className={`col-md-${recentNews.length > 0 ? '7' : '10'} my-5 py-4 px-5 bg-white border rounded`}
          >
            {displayedMainNews.map((newsItem, index) => (
              <NewsItem
                key={index}
                title={newsItem.title}
                date={newsItem.publishedAt}
                author={newsItem.author}
                source={newsItem.source.name}
                url={newsItem.url}
                
              />
            ))}
            <div className="d-flex justify-content-between">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
          </div>
          {recentNews.length > 0 && (
            <div
              className="col-md-4 position-sticky bg-white  pt-3 pb-4 px-3"
              style={{ top: '10rem', marginTop: '5rem',marginBottom:'5rem', maxHeight: '500px', overflowY: 'auto'}}
            >
              <h4 className="fst-italic pb-3">Recent News</h4>
              {displayedRecentNews.map((newsItem, index) => (
                <RecentNews
                  key={index}
                  title={newsItem.title}
                  url={newsItem.url}
                  date={newsItem.publishedAt}
                  image={newsItem.urlToImage}
                />
              ))}
              <div className="d-flex justify-content-between">
                <button onClick={() => handleRecentPageChange(recentNewsPage - 1)} disabled={recentNewsPage === 1}>Previous</button>
                <span>Page {recentNewsPage} of {totalRecentPages}</span>
                <button onClick={() => handleRecentPageChange(recentNewsPage + 1)} disabled={recentNewsPage === totalRecentPages}>Next</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
