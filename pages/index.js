import Head from "next/head";
import { Grid, Typography } from "@material-ui/core";
import Navigation from "../components/Navigation";
import { useRouter } from "next/router";
import Context from "../store";
import { useContext, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const context = useContext(Context);
  context.setCurrentSection(0);

  useEffect(() => {
    if (
      router.query.PROLIFIC_PID &&
      router.query.STUDY_ID &&
      router.query.SESSION_ID
    ) {
      context.setResponses((prev) => {
        return {
          ...prev,
          ProlificId: router.query.PROLIFIC_PID,
          StudyId: router.query.STUDY_ID,
          SessionId: router.query.SESSION_ID,
        };
      });
    }

    return () => {};
  }, []);

  const nextHandler = () => {
    context.setAccess((prev) => {
      return {
        ...prev,
        sectionA: true,
      };
    });
    router.replace("/section-a");
  };

  return (
    <>
      <Head>
        <title>Survey</title>
        <meta name="description" content="survey for research" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid item lg={9}>
        <Grid container direction="column">
          <Typography variant="h3">Welcome to this survey.</Typography>
          <br />
          <br />
          <Typography variant="h5">
            
            We are conducting a short survey on how people take certain decisions during online activities. <br />
            The online survey should take you a maximum [15 minutes]. You will at a certain point assume some roles e.g., secretary, sales representative, or an employee <br />
            <br />
            This is not an examination. Your participation in this research is
            voluntary.
            <br />
            <br />
            Note: At some point, you may notice similar questions. Do not get
            disturbed, you are still on track.
          </Typography>
          <br />
          <br />
          <br />
          <Typography variant="h5"></Typography>
        </Grid>
      </Grid>
      <Navigation showBack={false} showNext={true} nextHandler={nextHandler} />
    </>
  );
}
