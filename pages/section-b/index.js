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
              Here, you will be asked to assume a specific role e.g., manager, secretary, or company representative. We are interested on the advice, decision, and inferences you will take in each situation. Very simple and direct questions follow immediately. Please be careful to read the text on the picture image carefully

              <br/><br/>Ms. white is a secretary of a popular logistic company (name not shown due to privacy). She was recently deployed to the Cargo dispatch unit with three stage process for each request order received. (For each request order to be completed, the following activities should be completed)
              <br/>1.)	Activation of new sale representative accounts 
              <br/>2.)	Assigning of new orders to staff for subsequent dispatch
              <br/>3.)	Processing of payments for orders received
<br/><br/>She clicked on request order A54 received on the 15th of October and the following picture image (see below) popped up. 
<br/><br/>Please kindly read the following question and select the best option you will take if you were Ms White.  

                </Typography>
              </Grid> <br/>
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
