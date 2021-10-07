import { Grid, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Context from "../store";
import Head from "next/head";
import { firestoreDB } from "./_app";
import firebase from "firebase/app";

const End = () => {
  const router = useRouter();
  const [showPage, setShowPage] = useState(false);
  const context = useContext(Context);
  context.setCurrentSection(8);
  const [done, setDone] = useState(false);
  const uploadToFirestore = () => {
    let response = JSON.stringify(context.responses);
    firestoreDB
      .collection("responses")
      .doc()
      .set({
        date: firebase.firestore.Timestamp.now(),
        response,
      })
      .then(() => {
        setDone(true);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    // redirect if no access
    if (!context.access.end) {
      router.replace("/section-c");
      return;
    }
    setShowPage(true);
    uploadToFirestore();

    return () => {};
  }, []);

  return (
    <>
      <Head>
        <title>End</title>
      </Head>
      {showPage && done && (
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
