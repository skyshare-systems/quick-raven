import React from "react";
import GridLoader from "react-spinners/GridLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Loading = () => {
  return (
    <div className="fixed top-0 flex justify-center items-center h-[100vh] w-full z-[999999999999] bg-black/50 backdrop-blur-sm">
      <GridLoader
        color={"#36d1b2"}
        loading={true}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
