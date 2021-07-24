import {
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import Context from "../../store";
import Head from "next/head";
import classes from "../section-a/index.module.css";

export const questions = [
  {
    key: "1",
    question: "What is your age group?",
    options: [
      "0 - 15 years old",
      "15 - 30 years old",
      "30 - 45 years old",
      "45+",
    ],
  },
  {
    key: "2",
    question: "Please specify your ethnicity.",
    options: [
      "Caucasian",
      "African-American",
      "Latino or Hispanic",
      "Asian",
      "Native American",
      "Native Hawaiian or Pacific Islander",
      "Two or More",
      "Other/Unknown",
    ],
  },
  {
    key: "3",
    question:
      "What is the highest degree or level of education you have completed?",
    options: [
      "Some High School",
      "High School",
      "Bachelor's Degree",
      "Master's Degree",
      "Ph.D. or higher",
      "Trade School",
    ],
  },
  {
    key: "4",
    question: "Are you married?",
    options: ["Yes", "No"],
  },
];

const SectionC = () => {
  const router = useRouter();
  const [showPage, setShowPage] = useState(false);
  const context = useContext(Context);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    // redirect if no access
    if (!context.access.sectionC) {
      router.replace("/section-b");
      return;
    }
    setShowPage(true);

    return () => {};
  }, []);

  const nextHandler = () => {
    context.setAccess((prev) => {
      return {
        ...prev,
        end: true,
      };
    });
    router.push("/end");
  };

  const backHandler = () => {
    router.push("/section-b/?fromC=true");
  };

  const handleChange = (e) => {
    let indexToUpdate = context.responses.sectionC.findIndex(
      (response) => response.key === e.target.name
    );
    context.setResponses((prev) => {
      const newResponses = prev.sectionC;
      newResponses[indexToUpdate] = {
        key: e.target.name,
        value: e.target.value,
      };
      return {
        ...prev,
        sectionC: newResponses,
      };
    });
  };

  const validate = () => {
    let control = false;
    context.responses.sectionC.every((item) => {
      if (item.value === "x") {
        control = false;
        return false;
      }
      control = true;
      return true;
    });
    if (control) {
      setValidated(control);
    }
  };
  if (!validated) validate();

  return (
    <>
      <Head>
        <title>Section C</title>
      </Head>
      {showPage && (
        <>
          <Grid item lg={9}>
            <Grid container>
              <Typography variant="h2" gutterBottom={true}>
                Section C
              </Typography>
              <Grid container direction="column" spacing={3}>
                {questions.map((question) => {
                  let current = context.responses.sectionC.find((item) => {
                    return item.key === question.key;
                  });
                  return (
                    <Grid item key={question.key}>
                      <Paper elevation={5} className={classes.questions}>
                        <Typography variant="h5">
                          {question.question}
                        </Typography>
                        <FormControl component="fieldset" fullWidth={true}>
                          <RadioGroup
                            aria-label={question.key}
                            name={question.key}
                            value={current.value}
                            onChange={handleChange}
                          >
                            <Grid
                              container
                              direction="column"
                              alignContent="flex-start"
                            >
                              {question.options.map((option, index) => (
                                <FormControlLabel
                                  value={option}
                                  control={<Radio />}
                                  label={option}
                                  key={index}
                                />
                              ))}
                            </Grid>
                          </RadioGroup>
                        </FormControl>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
            <div style={{ padding: "3rem" }}></div>
          </Grid>
          <Navigation
            showBack={true}
            showNext={validated}
            nextHandler={nextHandler}
            backHandler={backHandler}
          />
        </>
      )}
    </>
  );
};

export default SectionC;
