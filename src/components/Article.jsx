import React from 'react';

const Article = (props) => (
  <div>
    <h4>{props.article.source}</h4>
    <p>{props.article.date}</p>
    <h3>{props.article.title}</h3>
    <p>{props.article.description}</p>
    <img src={props.article.image} alt={props.article.title} />
    <br/>
    <a href={props.article.url}>Read more</a>
  </div>
);

export default Article;
