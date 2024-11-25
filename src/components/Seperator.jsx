const Seperator = ({ direction }) => {
  return (
    <>
      {direction === "vertical" ? (
        <span className="vertical-seperator" />
      ) : (
        <span className="horizontal-seperator" />
      )}
    </>
  );
};

export default Seperator;
