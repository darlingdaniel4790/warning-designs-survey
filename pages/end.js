import { Grid, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Context from "../store";
import Head from "next/head";

const End = () => {
  const router = useRouter();
  const [showPage, setShowPage] = useState(false);
  const context = useContext(Context);
  console.log(context.responses);

  useEffect(() => {
    // redirect if no access
    if (!context.access.end) {
      router.replace("/section-c");
      return;
    }
    setShowPage(true);

    return () => {};
  }, []);

  return (
    <>
      <Head>
        <title>End</title>
      </Head>
      {showPage && (
        <>
          <Grid
            container
            style={{ height: "80vh" }}
            alignItems="center"
            justifyContent="center"
          >
            <Typography align="center" variant="h4">
              Thank you for taking part in this survey. Click{" "}
              <a href="">here</a> to return to Prolific.
            </Typography>
          </Grid>
        </>
      )}
    </>
  );
};

export default End;
