import { Box, LinearProgress } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import Context from "../store";

export default function LinearDeterminate() {
  const context = useContext(Context);
  console.log(context.access);
  const [progress, setProgress] = useState(0);
  const numOfSections = 8;
  // const values = Object.values(context.access);
  let current = context.currentSection;
  console.log(current);
  if (progress !== current) {
    setProgress(current);
  }

  return (
    <Box>
      <LinearProgress
        variant="determinate"
        value={(progress * 100) / numOfSections}
        style={{ height: "1rem" }}
      />
    </Box>
  );
}
