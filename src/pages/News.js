// src/pages/News.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './News.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = '90b29a20d3554111ac2ae3973abee24b';  // Replace with your actual NewsAPI key

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=Formula%201&sortBy=publishedAt&apiKey=${apiKey}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }
          }
        );
        setNews(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to fetch news.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [apiKey]);

  if (loading) return <div className="news-loading">Loading...</div>;
  if (error) return <div className="news-error">{error}</div>;
  if (news.length === 0) return <div className="news-empty">No news available.</div>;

  return (
    <div className="news-container">
      <h2 className="news-title">Formula 1 News</h2>
      <ul className="news-list">
        {news.map((article, index) => (
          <li key={index} className="news-item">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-link">
              {article.title}
            </a>
            <p className="news-description">{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
