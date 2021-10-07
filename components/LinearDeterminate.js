import { Box, LinearProgress } from "@material-ui/core";
import { useContext, useState } from "react";
import Context from "../store";

export default function LinearDeterminate() {
  const context = useContext(Context);
  const [progress, setProgress] = useState(0);
  const numOfSections = 8;
  // const values = Object.values(context.access);
  let current = context.currentSection;
  if (progress !== current) {
    setProgress(current);
  }

  return (
    <Box style={{ position: "sticky", top: 0, zIndex: 999 }}>
      <LinearProgress
        variant="determinate"
        value={(progress * 100) / numOfSections}
        style={{ height: "1rem" }}
      />
    </Box>
  );
}
