import React from 'react';
import "./Article.css"

const Article = (props) => (
  <div className="newsBlocks">
    <h4 className="sources">{props.article.source}</h4>
    <p className="dates">{props.article.date}</p>
    <h3 className="title">{props.article.title}</h3>
    <p className="texts">{props.article.description}</p>
    <img src={props.article.image} alt={props.article.title} className="imgs" />
    <br/>
    <a href={props.article.url} className="sourcesLinks">Read more</a>
    <hr/>
  </div>
);

export default Article;
