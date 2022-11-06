import React from "react";
import { CircularProgress } from "@mui/material";

const LoaderSpinner: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        right: "50%",
        transform: "translate(50%,-50%)",
      }}
    >
      <CircularProgress size={'10em'} />
    </div>
  );
};

export default LoaderSpinner;
