import Head from "next/head";
import { Grid, Typography } from "@material-ui/core";
import Navigation from "../components/Navigation";
import { useRouter } from "next/router";
import Context from "../store";
import { useContext } from "react";

export default function Home() {
  const router = useRouter();
  const context = useContext(Context);
  context.setCurrentSection(0);

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
            As smart working becomes inevitable due to several reasons e.g.,
            cost, covid etc. Users must be careful in making the right choice on
            the internet especially with the upsurge of cybercriminals. <br />
            <br />
            We are conducting a short survey with users on how they take
            critical decisions during online activities. The online survey
            should take you maximum [15 minutes]. You will at a certain point be
            asked to assume some roles e.g., secretary, sales representative, or
            an employee. The study aims at analyzing user perception on certain
            scenario. <br />
            <br />
            There are three (3) short sections A, B, and C. In all sections you
            will be expected to choose an option or provide short answers.{" "}
            <br />
            <br />
            Section A (getting to know you) <br />
            In this section, we save you the time of introducing yourself and
            ask you simple getting to know you chats. <br />
            <br />
            Section B1 (main sections) <br />
            Here, you will be asked to assume a specific role e.g., manager,
            secretary, or company representative. We are interested on the
            advice, decision, and inferences you will take in each situation.
            Very simple and direct questions follow immediately. Please be
            careful to read the text on the picture image carefully. <br />
            <br />
            Section B2 is similar to section B1 but will also require that you
            observe the picture images carefully. <br />
            <br />
            Section B3 is similar to section B2 but will also require that you
            observe the picture images carefully.
            <br />
            <br />
            Section C <br />
            Demographics <br />
            <br />
            Final notes <br />
            This is not an examination. Your participation in this research is
            voluntary. <br />
            <br />
            Note: At some point you may notice similar question. Don’t be
            disturbed, you are still on track.
          </Typography>
          <br />
          <br />
          <br />
          <Typography variant="h5">
            {/* This is not an examination.
            <br />
            <br />
            The online survey should take you around [10 minutes].
            <br />
            <br />
            Your participation in this research is voluntary. */}
          </Typography>
        </Grid>
      </Grid>
      <Navigation showBack={false} showNext={true} nextHandler={nextHandler} />
    </>
  );
}
