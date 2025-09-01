const Spinner = ({ size = "md" }) => {
  return (
    <>
      <span className={`loading loading-spinner loading-${size}`}></span>
    </>
  );
};

export default Spinner;
