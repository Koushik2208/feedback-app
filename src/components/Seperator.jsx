const Seperator = ({ direction }) => {
  return (
    <>
      {direction === "vertical" ? (
        <span className="vertical-seperator sm-hide" />
      ) : (
        <span className="horizontal-seperator" />
      )}
    </>
  );
};

export default Seperator;
