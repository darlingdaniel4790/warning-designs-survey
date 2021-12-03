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
                  Here, you assume a specific role - Ms. White
                  <br />
                  <br />
                  Most online platforms will require you to first sign up i.e., create an account before you would be able to use the application. .

                  <br />
                  Once the account registration is started, an email is sent asking you to click on a link within the email to complete your registration. 
                  <br />
 
                  <br />
                                    <br />
                  <br />
                  Please click the NEXT TAB TO PROCEED
                  <br />
                  
                  <br />
                  <br />
                </Typography>
              </Grid>{" "}
              <br />
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
