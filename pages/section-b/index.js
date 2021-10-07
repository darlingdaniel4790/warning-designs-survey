import { Grid, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import Navigation from "../../components/Navigation";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import Context from "../../store";

export const stepsLength = 12;
export const step3Questions = [
  {
    key: "1",
    question: "I understood the message clearly.",
  },
  {
    key: "2",
    question: "I am not interested in such popup messages.",
  },
];

const SectionB = (props) => {
  const router = useRouter();
  const [showPage, setShowPage] = useState(false);
  const context = useContext(Context);
  context.setCurrentSection(3);

  useEffect(() => {
    // redirect if no access
    if (!context.access.sectionB) {
      router.replace("/summary");
      return;
    }
    setShowPage(true);
  }, []);

  const nextHandler = () => {
    context.setAccess((prev) => {
      return {
        ...prev,
        sectionB1: true,
      };
    });
    router.push("/section-b/part-1");
  };

  return (
    <>
      <Head>
        <title>Section B</title>
      </Head>
      {showPage && (
        <>
          <Grid item lg={9} style={{ width: "100%" }}>
            <Typography variant="h2" gutterBottom={true}>
              Section B
            </Typography>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Typography variant="h4">
                  The Image you will find require you carefully observe, read,
                  and analyse.
                </Typography>
              </Grid>
            </Grid>
            <div style={{ padding: "3rem" }}></div>
          </Grid>
          <Navigation
            showBack={false}
            showNext={true}
            nextHandler={nextHandler}
          />
        </>
      )}
    </>
  );
};

export default SectionB;
