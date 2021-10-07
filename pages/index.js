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
    router.push("/section-a");
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
            The survey contains Three sections, A, B and C. You are expected to
            choose the best option that best suits you. Kindly answer the
            questions to the best of your ability.
          </Typography>
          <br />
          <br />
          <br />
          <Typography variant="h5">
            This is not an examination.
            <br />
            <br />
            The online survey should take you around [10 minutes].
            <br />
            <br />
            Your participation in this research is voluntary.
          </Typography>
        </Grid>
      </Grid>
      <Navigation showBack={false} showNext={true} nextHandler={nextHandler} />
    </>
  );
}
