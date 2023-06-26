import "./ListHeaders.css";

const ListHeaders = (props) => {
  const { header } = props;

  return (
    <>
      <div className="header">
        <small className="list-header">{header}</small>
      </div>
    </>
  );
};

export default ListHeaders;
