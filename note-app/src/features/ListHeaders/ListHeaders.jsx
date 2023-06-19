const ListHeaders = (props) => {
  const { header } = props;

  return (
    <>
      <div className="header">
        <small>{header}</small>
      </div>
    </>
  );
};

export default ListHeaders;
