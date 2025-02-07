class NewsInfo {
    constructor(res, isGNews = false,category = null) {
      this.articles = res.articles.slice(0,10).map(article => ({
        headline: article.title,
        source: article.source.name,
        publishedAt: article.publishedAt, 
        summary: article.description,
        url: article.url, 
        image: isGNews ? article.image : article.urlToImage, 
        category: category
      }));
    }
  }

export default NewsInfo;