

const NewsItem = ({title, date, author,source, url}) => {

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'});

  return (

    <div >
     <small className="blog-post-meta mb-0" > <i className="bi bi-globe-central-south-asia"></i>   {source}</small>
       <h5 className="my-2"><a href={url} className="link-body-emphasis">{title}</a></h5>
    <small className=" text-body-secondary">{formattedDate} . {author}</small>
    <hr />
  </div>
       
  )
}
export default NewsItem

