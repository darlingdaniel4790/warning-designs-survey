import {
  FormControl,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  TextField,
  FormHelperText,
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
    question: "Age group?",
    options: ["18 - 24", "25 - 29", "30 - 34", "35+"],
  },
  {
    key: "2",
    question: "Gender?",
    options: ["Female", "Male", "Decline to answer"],
  },
  {
    key: "3",
    question: "What is your current major?",
  },
  {
    key: "4",
    question: "What is your highest level of education?",
    options: ["High School/GED", "Bachelor's Degree", "Master's Degree"],
  },
  {
    key: "5",
    question: "Which internet browser do you use?",
    options: ["Chrome", "Firefox", "Internet Explorer", "Other"],
  },
  {
    key: "6",
    question: "How many hours in a week do you spend surfing the internet?",
  },
  {
    key: "7",
    question: "Please could you drop your final comments on this survey?",
  },
];

const SectionC = () => {
  const router = useRouter();
  const [showPage, setShowPage] = useState(false);
  const context = useContext(Context);
  console.log(context.responses.sectionB);
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

  const handleCheckChange = (e) => {
    let indexToUpdate = context.responses.sectionC.findIndex(
      (response) => response.key === e.target.name
    );
    context.setResponses((prev) => {
      const newResponses = prev.sectionC;
      newResponses[indexToUpdate].value[e.target.value] =
        !newResponses[indexToUpdate].value[e.target.value];
      return {
        ...prev,
        sectionC: newResponses,
      };
    });
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
    let control = false,
      control2 = false;
    context.responses.sectionC.every((item) => {
      if (item.value === "") {
        control = false;
        return false;
      }
      control = true;
      return true;
    });
    context.responses.sectionC[4].value.every((item) => {
      if (item) {
        control2 = true;
        return false;
      }
      control2 = false;
      return true;
    });
    control = control && control2;
    if (validated !== control) setValidated(control);
  };
  validate();

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
                          {question.options ? (
                            question.key === "5" ? (
                              <FormControl component="fieldset">
                                <FormHelperText>
                                  Choose at least one
                                </FormHelperText>
                                <FormGroup>
                                  {question.options.map((option, index) => (
                                    <FormControlLabel
                                      name={question.key}
                                      control={
                                        <Checkbox
                                          color="primary"
                                          onChange={handleCheckChange}
                                          checked={current.value[index]}
                                          value={index}
                                        />
                                      }
                                      label={option}
                                      key={index}
                                    />
                                  ))}
                                </FormGroup>
                              </FormControl>
                            ) : (
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
                            )
                          ) : question.key === "6" ? (
                            <TextField
                              type="number"
                              variant="filled"
                              // multiline
                              // rows={10}
                              // rowsMax={20}
                              name={question.key}
                              value={current.value}
                              onChange={handleChange}
                              placeholder="Your response here."
                            />
                          ) : (
                            <TextField
                              variant="filled"
                              multiline
                              // rows={10}
                              // rowsMax={20}
                              name={question.key}
                              value={current.value}
                              onChange={handleChange}
                              placeholder="Your response here."
                            />
                          )}
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
            showBack={false}
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
