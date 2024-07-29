// src/News.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './News.css';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=Formula%201&sortBy=publishedAt&apiKey=90b29a20d3554111ac2ae3973abee24b`
        );
        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="news-container">
      <h1>F1 News</h1>
      {articles.map((article, index) => (
        <div key={index} className="news-article">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            <img src={article.urlToImage || 'https://via.placeholder.com/150'} alt={article.title} />
            <div>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <p><small>{new Date(article.publishedAt).toLocaleDateString()}</small></p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default News;
