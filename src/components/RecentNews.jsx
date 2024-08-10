
const RecentNews = ({ title, image, url, date }) => {

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'});

  return (
    <div className="d-flex flex-column mb-3">
      <a href={url} className="link-body-emphasis d-flex">
        <img
          src={image}
          className="img-fluid rounded-start recent-news-img me-3"
          alt={title}
        />
        <div className="d-flex flex-column justify-content-between">
          <h6 className="mb-1 text-decoration-none">{title}</h6>
          <small className="text-muted">{formattedDate}</small>
        </div>
      </a>
      <hr />
    </div>
  );
};

export default RecentNews;
