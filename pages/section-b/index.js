import { Card, Grid, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import Navigation from "../../components/Navigation";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import Context from "../../store";

const SectionB = () => {
  const router = useRouter();
  const [showPage, setShowPage] = useState(false);
  const context = useContext(Context);

  useEffect(() => {
    // redirect if no access
    if (!context.access.sectionB) {
      router.replace("/summary");
      return;
    }
    setShowPage(true);

    return () => {};
  }, []);

  const nextHandler = () => {
    context.setAccess((prev) => {
      return {
        ...prev,
        sectionC: true,
      };
    });
    router.push("/section-c");
  };

  const backHandler = () => {
    router.back();
  };
  return (
    <>
      <Head>
        <title>Section B</title>
      </Head>
      {showPage && (
        <>
          <Grid item lg={9}>
            <Grid item>
              <Typography variant="h2">Section B</Typography>
            </Grid>
          </Grid>
          <Navigation
            showBack={true}
            showNext={true}
            nextHandler={nextHandler}
            backHandler={backHandler}
          />
        </>
      )}
    </>
  );
};

export default SectionB;
