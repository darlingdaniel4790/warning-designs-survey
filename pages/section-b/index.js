import {
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useRouter } from "next/router";
import Navigation from "../../components/Navigation";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import Context from "../../store";
import classes from "../section-a/index.module.css";
import Image from "next/image";

export const stepsLength = 7;
export const step3Questions = [
  {
    key: "1",
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
  {
    key: "2",
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
  {
    key: "3",
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
  {
    key: "4",
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
];

const SectionB = (props) => {
  const router = useRouter();
  const [showPage, setShowPage] = useState(false);
  const context = useContext(Context);
  const [activeStep, setActiveStep] = useState(() => {
    if (props.activeStep) {
      router.replace("/section-b");
      return props.activeStep;
    }
    return 1;
  });
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [validated, setValidated] = useState(activeStep);
  const [currentRoute, setCurrentRoute] = useState(() =>
    props.activeStep ? 2 : 0
  );
  const [showBack, setShowBack] = useState(true);
  const [images] = useState(
    context.responses.sectionB.map((obj) => {
      return {
        key: obj.principle,
        value: obj.image,
      };
    })
  );
  if (activeStep === 1) {
    if (showBack) setShowBack(false);
  } else {
    if (!showBack) setShowBack(true);
  }

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
    if (activeStep === stepsLength) {
      // last question
      if (currentRoute === 2) {
        // last route last question
        console.log(context.responses);
        context.setAccess((prev) => {
          return {
            ...prev,
            sectionC: true,
          };
        });
        router.push("/section-c");
      } else {
        // switch to next route and start over
        setActiveStep(1);
        setValidated(1);
        setCurrentRoute((prev) => prev + 1);
      }
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const backHandler = () => {
    if (activeStep === 1) {
      // first question
      router.push("/summary");
    } else {
      setActiveStep((prev) => prev - 1);
    }
  };

  let questionShown = () => {
    let handleChange, value;
    switch (activeStep) {
      case 1:
        return (
          <>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Paper elevation={5} className={classes.questions}>
                  <Typography variant="h4">
                    Ms. white is a new secretary of a popular logistic company
                    (name not shown due to privacy) she is presently activating
                    user accounts and assigning new orders. She clicked orders
                    A54 received on 8/07/2021 and it returned the following
                    message.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </>
        );
      case 2:
        handleChange = (e) => {
          if (validated !== activeStep) {
            setValidated(activeStep);
          }
          context.setResponses((prev) => {
            const newResponses = prev.sectionB;
            newResponses[currentRoute].responses[0] = e.target.value;
            return {
              ...prev,
              sectionB: newResponses,
            };
          });
        };

        value = context.responses.sectionB[currentRoute].responses[0];

        return (
          <>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Paper elevation={5} className={classes.questions}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item style={{ margin: "15px 0" }}>
                      <Image
                        src={images[currentRoute].value}
                        alt={images[currentRoute].key}
                      />
                    </Grid>
                  </Grid>
                  <Typography variant="h5">
                    Did you read the entire text of the message?
                  </Typography>
                  <FormControl component="fieldset" fullWidth={true}>
                    <RadioGroup name="1" value={value} onChange={handleChange}>
                      <Grid
                        container
                        direction="column"
                        alignContent="flex-start"
                      >
                        <FormControlLabel
                          value="Yes"
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="Partially"
                          control={<Radio />}
                          label="Partially"
                        />
                        <FormControlLabel
                          value="No"
                          control={<Radio />}
                          label="No"
                        />
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>
            </Grid>
          </>
        );
      case 3:
        let control = context.responses.sectionB[
          currentRoute
        ].responses[1].every((item) => {
          if (item.value === "x") {
            return false;
          }
          return true;
        });
        if (control && validated !== activeStep) {
          setValidated(activeStep);
        }
        handleChange = (e) => {
          let indexToUpdate = context.responses.sectionB[
            currentRoute
          ].responses[1].findIndex(
            (response) => response.key === e.target.name
          );
          context.setResponses((prev) => {
            const newResponses = prev.sectionB;
            newResponses[currentRoute].responses[1][indexToUpdate] = {
              key: e.target.name,
              value: e.target.value,
            };
            return {
              ...prev,
              sectionB: newResponses,
            };
          });
        };

        return (
          <>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Paper elevation={5} className={classes.questions}>
                  <Typography variant="h5">
                    Imagine you clicked on an email link and the following pop
                    up message appears.
                  </Typography>
                  <Grid container direction="column" alignItems="center">
                    <Grid item style={{ margin: "15px 0" }}>
                      <Image
                        src={images[currentRoute].value}
                        alt={images[currentRoute].key}
                      />
                    </Grid>
                  </Grid>
                  <Typography variant="h5">
                    Please rate the following statements (all statements were
                    rated on a 5-point Likert scale, ranging from {`"`}Don{`'`}t
                    agree{`"`} to {`"`}Totally agree{`"`}).
                  </Typography>
                </Paper>
              </Grid>
              {step3Questions.map((question) => {
                let current = context.responses.sectionB[
                  currentRoute
                ].responses[1].find((item) => {
                  return item.key === question.key;
                });
                return (
                  <Grid item key={question.key}>
                    <Paper elevation={5} className={classes.questions}>
                      <Typography variant="h5">{question.question}</Typography>
                      <FormControl component="fieldset" fullWidth={true}>
                        <RadioGroup
                          name={question.key}
                          value={current.value}
                          onChange={handleChange}
                        >
                          <Grid
                            container
                            className={classes.questionsRadios}
                            direction={!matches ? "column" : "row"}
                            alignContent={matches ? "center" : "flex-start"}
                          >
                            <FormControlLabel
                              value="1"
                              control={<Radio />}
                              label="Strongly Disagree"
                              labelPlacement={matches ? "bottom" : "end"}
                            />
                            <FormControlLabel
                              value="2"
                              control={<Radio />}
                              label="Disagree"
                              labelPlacement={matches ? "bottom" : "end"}
                            />
                            <FormControlLabel
                              value="3"
                              control={<Radio />}
                              label="Not Sure"
                              labelPlacement={matches ? "bottom" : "end"}
                            />
                            <FormControlLabel
                              value="4"
                              control={<Radio />}
                              label="Agree"
                              labelPlacement={matches ? "bottom" : "end"}
                            />
                            <FormControlLabel
                              value="5"
                              control={<Radio />}
                              label="Strongly Agree"
                              labelPlacement={matches ? "bottom" : "end"}
                            />
                          </Grid>
                        </RadioGroup>
                      </FormControl>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </>
        );
      case 4:
        handleChange = (e) => {
          if (e.target.value !== "" && validated !== activeStep) {
            setValidated(activeStep);
          } else if (validated === activeStep && e.target.value === "") {
            setValidated(activeStep - 1);
          }
          context.setResponses((prev) => {
            const newResponses = prev.sectionB;
            newResponses[currentRoute].responses[2] = e.target.value;
            return {
              ...prev,
              sectionB: newResponses,
            };
          });
        };

        value = context.responses.sectionB[currentRoute].responses[2];
        if (value !== "" && validated !== activeStep) {
          setValidated(activeStep);
        } else if (validated === activeStep && value === "") {
          setValidated(activeStep - 1);
        }

        return (
          <>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Paper elevation={5} className={classes.questions}>
                  <Typography variant="h5">
                    Imagine you clicked on an email link and the following pop
                    up message appears.
                  </Typography>
                  <Grid container direction="column" alignItems="center">
                    <Grid item style={{ margin: "15px 0" }}>
                      <Image
                        src={images[currentRoute].value}
                        alt={images[currentRoute].key}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item>
                <Paper elevation={5} className={classes.questions}>
                  <Typography variant="h5">
                    Which word(s) did you find confusing or too technical?
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      variant="filled"
                      multiline
                      rows={10}
                      rowsMax={20}
                      value={value}
                      onChange={handleChange}
                      placeholder="Your response here."
                    />
                  </FormControl>
                </Paper>
              </Grid>
            </Grid>
          </>
        );
      case 5:
        handleChange = (e) => {
          if (e.target.value !== "" && validated !== activeStep) {
            setValidated(activeStep);
          } else if (validated === activeStep && e.target.value === "") {
            setValidated(activeStep - 1);
          }
          context.setResponses((prev) => {
            const newResponses = prev.sectionB;
            newResponses[currentRoute].responses[3] = e.target.value;
            return {
              ...prev,
              sectionB: newResponses,
            };
          });
        };

        value = context.responses.sectionB[currentRoute].responses[3];

        return (
          <>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Paper elevation={5} className={classes.questions}>
                  <Typography variant="h5">
                    Imagine you clicked on an email link and the following pop
                    up message appears.
                  </Typography>
                  <Grid container direction="column" alignItems="center">
                    <Grid item style={{ margin: "15px 0" }}>
                      <Image
                        src={images[currentRoute].value}
                        alt={images[currentRoute].key}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item>
                <Paper elevation={5} className={classes.questions}>
                  <Typography variant="h5">
                    Please rate the amount of risk you feel you were warned
                    against?
                  </Typography>
                  <FormControl fullWidth>
                    <Select value={value} onChange={handleChange} displayEmpty>
                      <MenuItem value="">
                        <em>Select One</em>
                      </MenuItem>
                      <MenuItem value={0}>None</MenuItem>
                      <MenuItem value={1}>Option 1</MenuItem>
                      <MenuItem value={2}>Option 2</MenuItem>
                      <MenuItem value={3}>Option 3</MenuItem>
                      <MenuItem value={4}>Option 4</MenuItem>
                    </Select>
                  </FormControl>
                </Paper>
              </Grid>
            </Grid>
          </>
        );
      case 6:
        handleChange = (e) => {
          if (e.target.value !== "" && validated !== activeStep) {
            setValidated(activeStep);
          } else if (validated === activeStep && e.target.value === "") {
            setValidated(activeStep - 1);
          }
          context.setResponses((prev) => {
            const newResponses = prev.sectionB;
            newResponses[currentRoute].responses[4] = e.target.value;
            return {
              ...prev,
              sectionB: newResponses,
            };
          });
        };

        value = context.responses.sectionB[currentRoute].responses[4];

        return (
          <>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Paper elevation={5} className={classes.questions}>
                  <Typography variant="h5">
                    Imagine you clicked on an email link and the following pop
                    up message appears.
                  </Typography>
                  <Grid container direction="column" alignItems="center">
                    <Grid item style={{ margin: "15px 0" }}>
                      <Image
                        src={images[currentRoute].value}
                        alt={images[currentRoute].key}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item>
                <Paper elevation={5} className={classes.questions}>
                  <Typography variant="h5">
                    What action, if any, did the popup message want you to take?
                  </Typography>
                  <FormControl fullWidth>
                    <Select value={value} onChange={handleChange} displayEmpty>
                      <MenuItem value="">
                        <em>Select One</em>
                      </MenuItem>
                      <MenuItem value={0}>None</MenuItem>
                      <MenuItem value={1}>Option 1</MenuItem>
                      <MenuItem value={2}>Option 2</MenuItem>
                      <MenuItem value={3}>Option 3</MenuItem>
                      <MenuItem value={4}>Option 4</MenuItem>
                    </Select>
                  </FormControl>
                </Paper>
              </Grid>
            </Grid>
          </>
        );
      case 7:
        handleChange = (e) => {
          if (e.target.value !== "" && validated !== activeStep) {
            setValidated(activeStep);
          } else if (validated === activeStep && e.target.value === "") {
            setValidated(activeStep - 1);
          }
          context.setResponses((prev) => {
            const newResponses = prev.sectionB;
            newResponses[currentRoute].responses[5] = e.target.value;
            return {
              ...prev,
              sectionB: newResponses,
            };
          });
        };

        value = context.responses.sectionB[currentRoute].responses[5];
        if (value !== "" && validated !== activeStep) {
          setValidated(activeStep);
        } else if (validated === activeStep && value === "") {
          setValidated(activeStep - 1);
        }
        return (
          <>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Paper elevation={5} className={classes.questions}>
                  <Typography variant="h5">
                    Imagine you clicked on an email link and the following pop
                    up message appears.
                  </Typography>
                  <Grid container direction="column" alignItems="center">
                    <Grid item style={{ margin: "15px 0" }}>
                      <Image
                        src={images[currentRoute].value}
                        alt={images[currentRoute].key}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item>
                <Paper elevation={5} className={classes.questions}>
                  <Typography variant="h5">
                    What do you think this message means? Short answers.
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      variant="filled"
                      multiline
                      rows={10}
                      rowsMax={20}
                      value={value}
                      onChange={handleChange}
                      placeholder="Your response here."
                    />
                  </FormControl>
                </Paper>
              </Grid>
            </Grid>
          </>
        );
      default:
        break;
    }
  };

  return (
    <>
      <Head>
        <title>Section B - {`${currentRoute + 1} - ${activeStep}`}</title>
      </Head>
      {showPage && (
        <>
          <Grid item lg={9} style={{ width: "100%" }}>
            <Typography variant="h2" gutterBottom={true}>
              Section B - {`${currentRoute + 1} - ${activeStep}`}
            </Typography>
            {questionShown()}
            <div style={{ padding: "3rem" }}></div>
          </Grid>
          <Navigation
            showBack={showBack}
            showNext={activeStep === 1 || validated >= activeStep}
            nextHandler={nextHandler}
            backHandler={backHandler}
          />
        </>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  let activeStep = "";
  if (context.query.fromC === "true") {
    activeStep = stepsLength;
  }
  return {
    props: {
      activeStep: activeStep,
    },
  };
}

export default SectionB;
