"use client"
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Landing from "./Landing";

type CodeEditorProps = {
  description: string;
  codeEditorDefault: string;
  codeEditorSolution: string;
  nextLesson: string;
  previousLesson: string;
}

export default function CodeEditorLesson({
  description,
  codeEditorDefault,
  codeEditorSolution,
  nextLesson,
  previousLesson,
}: CodeEditorProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      {isMobile ? (
        <Box
          sx={{ display: "flex", width: "100%", height: "calc(100vh - 4rem)" }}
        >
          <Box
            sx={{
              width: "45%",
              height: "100%",
              overflow: "hidden",
              scrollbarWidth: "none",
              scrollbarColor: "transparent transparent",
              padding: "1rem",
            }}
          >
            {description}
          </Box>
          <Box
            sx={{
              width: "55%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Landing codeEditorDefault={codeEditorDefault} codeEditorSolution={codeEditorSolution} nextLesson={nextLesson} previousLesson={previousLesson} />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "fit-content",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "50vh",
              scrollbarWidth: "none",
              scrollbarColor: "transparent transparent",
              padding: "1rem",
            }}
          >
            {description}
          </Box>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Landing codeEditorDefault={codeEditorDefault} codeEditorSolution={codeEditorSolution} nextLesson={nextLesson} previousLesson={previousLesson} />
          </Box>
        </Box>
      )}
    </>
  );
}
