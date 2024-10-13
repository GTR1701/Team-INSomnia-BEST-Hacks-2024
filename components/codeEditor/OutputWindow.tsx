"use client"
import { Box, Typography } from "@mui/material";

const OutputWindow = ({ outputDetails }: any) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-green-500">
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };
  return (
    <>
      <Typography
        sx={{ height: "fit-content", backgroundColor: "black", paddingLeft: "1rem" }}
        variant="h4"
        className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2"
      >
        Output
      </Typography>
      <Box
        sx={{
          backgroundColor: "black",
          height: "calc(100vh - 4rem - 70vh - 2.5rem)",
          overflowY: "scroll",
          width: "100%",
          padding: "0 0.5rem",
        }}
      >
        {outputDetails ? <>{getOutput()}</> : null}
      </Box>
    </>
  );
};

export default OutputWindow;
