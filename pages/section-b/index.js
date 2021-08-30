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
  const [disabled, setDisabled] = useState(true);

  const router = useRouter();
  const [showPage, setShowPage] = useState(false);
  const context = useContext(Context);
  const [activeStep, setActiveStep] = useState(() => {
    if (props.activeStep) {
      router.replace("/section-b");
      return props.activeStep;
    }
    return 0;
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
  if (activeStep === 1 || activeStep === 0) {
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
    setDisabled(true);
    if (activeStep === stepsLength) {
      // last question
      if (currentRoute === 2) {
        // last route last question
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
    setDisabled(true);
    if (activeStep === 1) {
      // first question
      router.push("/summary");
    } else {
      setActiveStep((prev) => prev - 1);
    }
  };

  let questionShown = () => {
    let handleChange, value, textAreaValue;
    switch (activeStep) {
      case 0:
        return (
          <>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Typography variant="h4">
                  The Image you will find require you carefully observe, read,
                  and analyse.
                </Typography>
              </Grid>
            </Grid>
          </>
        );
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
        handleChange = (e) => {
          if (e.target.type === "textarea") {
            // textarea
            if (e.target.value !== "" && validated !== activeStep) {
              setValidated(activeStep);
            } else if (e.target.value === "") {
              setValidated(activeStep - 1);
            }

            context.setResponses((prev) => {
              const newResponses = prev.sectionB;
              newResponses[currentRoute].responses[1][1] = e.target.value;
              return {
                ...prev,
                sectionB: newResponses,
              };
            });
          } else {
            // selects
            if (
              e.target.value !== "" &&
              validated !== activeStep &&
              e.target.value !== "Others"
            ) {
              setValidated(activeStep);
            } else if (
              (validated === activeStep && e.target.value === "") ||
              e.target.value === "Others"
            ) {
              setValidated(activeStep - 1);
            }
            if (e.target.value === "Others") {
              disabled && setDisabled(false);
            } else {
              !disabled && setDisabled(true);
            }

            context.setResponses((prev) => {
              const newResponses = prev.sectionB;
              newResponses[currentRoute].responses[1][0] = e.target.value;
              newResponses[currentRoute].responses[1][1] = "";
              return {
                ...prev,
                sectionB: newResponses,
              };
            });
          }
        };

        value = context.responses.sectionB[currentRoute].responses[1][0];
        textAreaValue =
          context.responses.sectionB[currentRoute].responses[1][1];
        textAreaValue && disabled && setDisabled(false);

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
                    When you saw the popup message what was your first reaction?
                  </Typography>
                  <FormControl fullWidth>
                    <Select value={value} onChange={handleChange} displayEmpty>
                      <MenuItem value="">
                        <em>Select One</em>
                      </MenuItem>
                      <MenuItem value={"Go back"}>Go back</MenuItem>
                      <MenuItem value={"Go forward"}>Go forward</MenuItem>
                      <MenuItem value={"Others"}>Others</MenuItem>
                    </Select>
                    <TextField
                      variant={disabled ? "filled" : "outlined"}
                      multiline
                      // rows={10}
                      // rowsMax={20}
                      value={textAreaValue}
                      onChange={handleChange}
                      // placeholder="Your response here."
                      disabled={disabled}
                    />
                  </FormControl>
                </Paper>
              </Grid>
            </Grid>
          </>
        );

      case 4:
        let control = context.responses.sectionB[
          currentRoute
        ].responses[2].every((item) => {
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
          ].responses[2].findIndex(
            (response) => response.key === e.target.name
          );
          context.setResponses((prev) => {
            const newResponses = prev.sectionB;
            newResponses[currentRoute].responses[2][indexToUpdate] = {
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
                ].responses[2].find((item) => {
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
      case 5:
        handleChange = (e) => {
          if (e.target.type === "textarea") {
            // textarea
            if (e.target.value !== "" && validated !== activeStep) {
              setValidated(activeStep);
            } else if (e.target.value === "") {
              setValidated(activeStep - 1);
            }

            context.setResponses((prev) => {
              const newResponses = prev.sectionB;
              newResponses[currentRoute].responses[3][1] = e.target.value;
              return {
                ...prev,
                sectionB: newResponses,
              };
            });
          } else {
            // selects
            if (
              e.target.value !== "" &&
              validated !== activeStep &&
              e.target.value !== "Others"
            ) {
              setValidated(activeStep);
            } else if (
              (validated === activeStep && e.target.value === "") ||
              e.target.value === "Others"
            ) {
              setValidated(activeStep - 1);
            }
            if (e.target.value === "Others") {
              disabled && setDisabled(false);
            } else {
              !disabled && setDisabled(true);
            }

            context.setResponses((prev) => {
              const newResponses = prev.sectionB;
              newResponses[currentRoute].responses[3][0] = e.target.value;
              newResponses[currentRoute].responses[3][1] = "";
              return {
                ...prev,
                sectionB: newResponses,
              };
            });
          }
        };

        value = context.responses.sectionB[currentRoute].responses[3][0];
        textAreaValue =
          context.responses.sectionB[currentRoute].responses[3][1];
        textAreaValue && disabled && setDisabled(false);

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
                      <MenuItem value={"To continue to the website"}>
                        To continue to the website
                      </MenuItem>
                      <MenuItem
                        value={"To be careful while continuing to the website"}
                      >
                        To be careful while continuing to the website
                      </MenuItem>
                      <MenuItem value={"To not continue to the website"}>
                        To not continue to the website
                      </MenuItem>
                      <MenuItem value={"I did not feel anything"}>
                        I did not feel anything
                      </MenuItem>
                      <MenuItem value={"Others"}>Others</MenuItem>
                    </Select>
                    <TextField
                      variant={disabled ? "filled" : "outlined"}
                      multiline
                      // rows={10}
                      // rowsMax={20}
                      value={textAreaValue}
                      onChange={handleChange}
                      // placeholder="Your response here."
                      disabled={disabled}
                    />
                  </FormControl>
                </Paper>
              </Grid>
            </Grid>
          </>
        );

      case 6:
        handleChange = (e) => {
          if (e.target.value !== "x" && validated !== activeStep) {
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
                    Please rate the amount of risk you feel you were warned
                    against.
                  </Typography>
                  <FormControl component="fieldset" fullWidth={true}>
                    <RadioGroup
                      // name={question.key}
                      value={value}
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
                          label="Very low risk"
                          labelPlacement={matches ? "bottom" : "end"}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="Low risk"
                          labelPlacement={matches ? "bottom" : "end"}
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="Moderate risk"
                          labelPlacement={matches ? "bottom" : "end"}
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="High risk"
                          labelPlacement={matches ? "bottom" : "end"}
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="Very high risk"
                          labelPlacement={matches ? "bottom" : "end"}
                        />
                      </Grid>
                    </RadioGroup>
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
                      rows={5}
                      rowsMax={10}
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

      case 8:
        handleChange = (e) => {
          if (e.target.value !== "x" && validated !== activeStep) {
            setValidated(activeStep);
          } else if (validated === activeStep && e.target.value === "") {
            setValidated(activeStep - 1);
          }
          context.setResponses((prev) => {
            const newResponses = prev.sectionB;
            newResponses[currentRoute].responses[6] = e.target.value;
            return {
              ...prev,
              sectionB: newResponses,
            };
          });
        };

        value = context.responses.sectionB[currentRoute].responses[6];

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
                    Please rate your level of trust for this message.
                  </Typography>
                  <FormControl component="fieldset" fullWidth={true}>
                    <RadioGroup
                      // name={question.key}
                      value={value}
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
            </Grid>
          </>
        );
      case 9:
        handleChange = (e) => {
          if (e.target.value !== "" && validated !== activeStep) {
            setValidated(activeStep);
          } else if (validated === activeStep && e.target.value === "") {
            setValidated(activeStep - 1);
          }
          context.setResponses((prev) => {
            const newResponses = prev.sectionB;
            newResponses[currentRoute].responses[7] = e.target.value;
            return {
              ...prev,
              sectionB: newResponses,
            };
          });
        };

        value = context.responses.sectionB[currentRoute].responses[7];
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
                    In a short sentence summarize the aim of the message.
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      variant="filled"
                      multiline
                      rows={5}
                      rowsMax={10}
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

      case 10:
        handleChange = (e) => {
          if (e.target.value !== "x" && validated !== activeStep) {
            setValidated(activeStep);
          } else if (validated === activeStep && e.target.value === "") {
            setValidated(activeStep - 1);
          }
          context.setResponses((prev) => {
            const newResponses = prev.sectionB;
            newResponses[currentRoute].responses[8] = e.target.value;
            return {
              ...prev,
              sectionB: newResponses,
            };
          });
        };

        value = context.responses.sectionB[currentRoute].responses[8];

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
                    How likely is it that something bad would happen if you
                    continued to the website after seeing this message?
                  </Typography>
                  <FormControl component="fieldset" fullWidth={true}>
                    <RadioGroup
                      // name={question.key}
                      value={value}
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
                          label="Very Unlikely"
                          labelPlacement={matches ? "bottom" : "end"}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="Unlikely"
                          labelPlacement={matches ? "bottom" : "end"}
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="Neutral"
                          labelPlacement={matches ? "bottom" : "end"}
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="Likely"
                          labelPlacement={matches ? "bottom" : "end"}
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="Very Likely"
                          labelPlacement={matches ? "bottom" : "end"}
                        />
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>
            </Grid>
          </>
        );

      case 11:
        handleChange = (e) => {
          if (e.target.value !== "" && validated !== activeStep) {
            setValidated(activeStep);
          } else if (validated === activeStep && e.target.value === "") {
            setValidated(activeStep - 1);
          }
          context.setResponses((prev) => {
            const newResponses = prev.sectionB;
            newResponses[currentRoute].responses[9] = e.target.value;
            return {
              ...prev,
              sectionB: newResponses,
            };
          });
        };

        value = context.responses.sectionB[currentRoute].responses[9];
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
                    Which of the words/sentences was most convincing to you?
                    (Please pick a word/sentence from the picture message)
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      variant="filled"
                      multiline
                      rows={5}
                      rowsMax={10}
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

      case 12:
        handleChange = (e) => {
          if (e.target.value !== "x" && validated !== activeStep) {
            setValidated(activeStep);
          } else if (validated === activeStep && e.target.value === "") {
            setValidated(activeStep - 1);
          }
          context.setResponses((prev) => {
            const newResponses = prev.sectionB;
            newResponses[currentRoute].responses[10] = e.target.value;
            return {
              ...prev,
              sectionB: newResponses,
            };
          });
        };

        value = context.responses.sectionB[currentRoute].responses[10];

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
                    Do you agree with the reasons and recommendations of the
                    message?
                  </Typography>
                  <FormControl component="fieldset" fullWidth={true}>
                    <RadioGroup
                      // name={question.key}
                      value={value}
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
        <title>
          Section B {currentRoute !== 0 ? "- " : ""}
          {currentRoute !== 0 ? `${currentRoute + 1} - ${activeStep}` : ""}
        </title>
      </Head>
      {showPage && (
        <>
          <Grid item lg={9} style={{ width: "100%" }}>
            <Typography variant="h2" gutterBottom={true}>
              Section B {currentRoute !== 0 && "- "}
              {currentRoute !== 0 && `${currentRoute + 1} - ${activeStep}`}
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
