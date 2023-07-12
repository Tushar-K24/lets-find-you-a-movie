import "./PageLayout.css";

function PageLayout({ title, movieList }) {
  return (
    <div className="page-container">
      <h1 className="page-title">{title}</h1>
      <hr />
      <div className="page-content">{...movieList}</div>
    </div>
  );
}

export default PageLayout;
