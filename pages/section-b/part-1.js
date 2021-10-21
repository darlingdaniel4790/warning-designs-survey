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

export const numOfQuestions = 11;
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

const Part1 = (props) => {
  const [disabled1, setDisabled1] = useState(true);
  const [disabled3, setDisabled3] = useState(true);

  const router = useRouter();
  const [showPage, setShowPage] = useState(false);
  const context = useContext(Context);
  context.setCurrentSection(4);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [validated, setValidated] = useState([false]);
  // console.log(validated);
  const [allValidated, setAllValidated] = useState(false);
  const [images] = useState(
    context.responses.sectionB.map((obj) => {
      return {
        key: obj.principle,
        value: obj.image,
      };
    })
  );
  useEffect(() => {
    // redirect if no access
    if (!context.access.sectionB1) {
      router.replace("/summary");
      return;
    }
    setShowPage(true);

    return () => {};
  }, []);

  const nextHandler = () => {
    context.setAccess((prev) => {
      return {
        ...prev,
        sectionB2: true,
      };
    });
    router.push("/section-b/part-2");
  };

  // const backHandler = () => {
  //   setDisabled(true);
  //   if (activeStep === 1) {
  //     // first question
  //     router.push("/summary");
  //   } else {
  //     setActiveStep((prev) => prev - 1);
  //   }
  // };

  // HANDLE CHANGES FOR ALL QUESTIONS
  const handleChange0 = (e) => {
    setValidated((prev) => {
      prev[0] = true;
      return prev;
    });

    context.setResponses((prev) => {
      const newResponses = prev.sectionB;
      newResponses[0].responses[0] = e.target.value;
      return {
        ...prev,
        sectionB: newResponses,
      };
    });
  };

  const handleChange1 = (e) => {
    if (e.target.type === "textarea") {
      // textarea
      if (e.target.value !== "" && !validated[1]) {
        setValidated((prev) => {
          prev[1] = true;
          return prev;
        });
      } else if (e.target.value === "") {
        setValidated((prev) => {
          prev[1] = false;
          return prev;
        });
      }

      context.setResponses((prev) => {
        const newResponses = prev.sectionB;
        newResponses[0].responses[1][1] = e.target.value;
        return {
          ...prev,
          sectionB: newResponses,
        };
      });
    } else {
      // selects
      if (
        e.target.value !== "" &&
        !validated[1] &&
        e.target.value !== "Others"
      ) {
        setValidated((prev) => {
          prev[1] = true;
          return prev;
        });
      } else if (
        (validated[1] && e.target.value === "") ||
        e.target.value === "Others"
      ) {
        setValidated((prev) => {
          prev[1] = false;
          return prev;
        });
      }
      if (e.target.value === "Others") {
        disabled1 && setDisabled1(false);
      } else {
        !disabled1 && setDisabled1(true);
      }

      context.setResponses((prev) => {
        const newResponses = prev.sectionB;
        newResponses[0].responses[1][0] = e.target.value;
        newResponses[0].responses[1][1] = "";
        return {
          ...prev,
          sectionB: newResponses,
        };
      });
    }
  };

  // check for radio questions validation
  if (!validated[2]) {
    let control = context.responses.sectionB[0].responses[2].every((item) => {
      if (item.value === "x") {
        return false;
      }
      return true;
    });
    if (control) {
      setValidated((prev) => {
        prev[2] = true;
        return prev;
      });
    }
  }

  if (
    validated.length === numOfQuestions &&
    validated.every((item) => item === true) &&
    !allValidated
  ) {
    setAllValidated(true);
  } else if (
    validated.length === numOfQuestions &&
    !validated.every((item) => item === true) &&
    allValidated
  ) {
    setAllValidated(false);
  }

  const handleChange2 = (e) => {
    let indexToUpdate = context.responses.sectionB[0].responses[2].findIndex(
      (response) => response.key === e.target.name
    );
    context.setResponses((prev) => {
      const newResponses = prev.sectionB;
      newResponses[0].responses[2][indexToUpdate] = {
        key: e.target.name,
        value: e.target.value,
      };
      return {
        ...prev,
        sectionB: newResponses,
      };
    });
  };

  const handleChange3 = (e) => {
    if (e.target.type === "textarea") {
      // textarea
      if (e.target.value !== "" && !validated[3]) {
        setValidated((prev) => {
          prev[3] = true;
          return prev;
        });
      } else if (e.target.value === "") {
        setValidated((prev) => {
          prev[3] = false;
          return prev;
        });
      }

      context.setResponses((prev) => {
        const newResponses = prev.sectionB;
        newResponses[0].responses[3][1] = e.target.value;
        return {
          ...prev,
          sectionB: newResponses,
        };
      });
    } else {
      // selects
      if (
        e.target.value !== "" &&
        !validated[3] &&
        e.target.value !== "Others"
      ) {
        setValidated((prev) => {
          prev[3] = true;
          return prev;
        });
      } else if (
        (validated[3] && e.target.value === "") ||
        e.target.value === "Others"
      ) {
        setValidated((prev) => {
          prev[3] = false;
          return prev;
        });
      }
      if (e.target.value === "Others") {
        disabled3 && setDisabled3(false);
      } else {
        !disabled3 && setDisabled3(true);
      }

      context.setResponses((prev) => {
        const newResponses = prev.sectionB;
        newResponses[0].responses[3][0] = e.target.value;
        newResponses[0].responses[3][1] = "";
        return {
          ...prev,
          sectionB: newResponses,
        };
      });
    }
  };

  const handleChange4 = (e) => {
    setValidated((prev) => {
      prev[4] = true;
      return prev;
    });
    context.setResponses((prev) => {
      const newResponses = prev.sectionB;
      newResponses[0].responses[4] = e.target.value;
      return {
        ...prev,
        sectionB: newResponses,
      };
    });
  };

  const handleChange5 = (e) => {
    if (e.target.value !== "" && !validated[5]) {
      setValidated((prev) => {
        prev[5] = true;
        return prev;
      });
    } else if (validated[5] && e.target.value === "") {
      setValidated((prev) => {
        prev[5] = false;
        return prev;
      });
    }
    context.setResponses((prev) => {
      const newResponses = prev.sectionB;
      newResponses[0].responses[5] = e.target.value;
      return {
        ...prev,
        sectionB: newResponses,
      };
    });
  };

  const handleChange6 = (e) => {
    setValidated((prev) => {
      prev[6] = true;
      return prev;
    });
    context.setResponses((prev) => {
      const newResponses = prev.sectionB;
      newResponses[0].responses[6] = e.target.value;
      return {
        ...prev,
        sectionB: newResponses,
      };
    });
  };

  const handleChange7 = (e) => {
    if (e.target.value !== "" && !validated[7]) {
      setValidated((prev) => {
        prev[7] = true;
        return prev;
      });
    } else if (validated[7] && e.target.value === "") {
      setValidated((prev) => {
        prev[7] = false;
        return prev;
      });
    }
    context.setResponses((prev) => {
      const newResponses = prev.sectionB;
      newResponses[0].responses[7] = e.target.value;
      return {
        ...prev,
        sectionB: newResponses,
      };
    });
  };

  const handleChange8 = (e) => {
    setValidated((prev) => {
      prev[8] = true;
      return prev;
    });
    context.setResponses((prev) => {
      const newResponses = prev.sectionB;
      newResponses[0].responses[8] = e.target.value;
      return {
        ...prev,
        sectionB: newResponses,
      };
    });
  };

  const handleChange9 = (e) => {
    if (e.target.value !== "" && !validated[9]) {
      setValidated((prev) => {
        prev[9] = true;
        return prev;
      });
    } else if (validated[9] && e.target.value === "") {
      setValidated((prev) => {
        prev[9] = false;
        return prev;
      });
    }
    context.setResponses((prev) => {
      const newResponses = prev.sectionB;
      newResponses[0].responses[9] = e.target.value;
      return {
        ...prev,
        sectionB: newResponses,
      };
    });
  };

  const handleChange10 = (e) => {
    setValidated((prev) => {
      prev[10] = true;
      return prev;
    });
    context.setResponses((prev) => {
      const newResponses = prev.sectionB;
      newResponses[0].responses[10] = e.target.value;
      return {
        ...prev,
        sectionB: newResponses,
      };
    });
  };

  // VALUES FOR ALL QUESTIONS
  const value0 = context.responses.sectionB[0].responses[0];
  const value1 = context.responses.sectionB[0].responses[1][0];
  const textAreaValue1 = context.responses.sectionB[0].responses[1][1];
  textAreaValue1 && disabled1 && setDisabled1(false);
  // const value2 = context.responses.sectionB[0].responses[0]; // not needed
  const value3 = context.responses.sectionB[0].responses[3][0];
  const textAreaValue3 = context.responses.sectionB[0].responses[3][1];
  textAreaValue3 && disabled3 && setDisabled3(false);
  const value4 = context.responses.sectionB[0].responses[4];
  const value5 = context.responses.sectionB[0].responses[5];
  const value6 = context.responses.sectionB[0].responses[6];
  const value7 = context.responses.sectionB[0].responses[7];
  const value8 = context.responses.sectionB[0].responses[8];
  const value9 = context.responses.sectionB[0].responses[9];
  const value10 = context.responses.sectionB[0].responses[10];

  return (
    <>
      <Head>
        <title>Section B - Part 1</title>
      </Head>
      {showPage && (
        <>
          <Grid item lg={9} style={{ width: "100%" }}>
            <Typography variant="h2" gutterBottom={true}>
              Section B - Part 1
            </Typography>
            <Grid container direction="column" spacing={3}>
              {/* STORY */}
              <Grid item>
                <Paper elevation={5} className={classes.questions}>
                  <Typography variant="h4">
                  Activation of new sale representative accounts
                  </Typography>
                </Paper>
              </Grid>

              {/* IMAGE */}
              <Grid item>
                <Paper elevation={5} className={classes.questions}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item style={{ margin: "15px 0" }}>
                      <Image src={images[0].value} alt={images[0].key} />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              {/* QUESTION 1 */}
              <Grid item>
                <Paper elevation={5} className={classes.questions}>
                  <Typography variant="h5">
                    Did you read the entire text of the message?
                  </Typography>
                  <FormControl component="fieldset" fullWidth={true}>
                    <RadioGroup
                      name="1"
                      value={value0}
                      onChange={handleChange0}
                    >
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

              {/* QUESTION 2 */}
              <Grid item>
                <Paper elevation={5} className={classes.questions}>
                  <Typography variant="h5">
                    When you saw the popup message what was your first reaction?
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={value1}
                      onChange={handleChange1}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <em>Select One</em>
                      </MenuItem>
                      <MenuItem value={"Go back"}>Go back</MenuItem>
                      <MenuItem value={"Go forward"}>Go forward</MenuItem>
                      <MenuItem value={"Others"}>Others</MenuItem>
                    </Select>
                    <TextField
                      variant={disabled1 ? "filled" : "outlined"}
                      multiline
                      // rows={10}
                      // rowsMax={20}
                      value={textAreaValue1}
                      onChange={handleChange1}
                      // placeholder="Your response here."
                      disabled={disabled1}
                    />
                  </FormControl>
                </Paper>
              </Grid>

              {/* QUESTION 3 */}
              <Grid item>
                <Paper elevation={5} className={classes.questions}>
                  <Typography variant="h5">
                    Please rate the following statements (all statements were
                    rated on a 5-point Likert scale, ranging from {`"`}Don{`'`}t
                    agree{`"`} to {`"`}Totally agree{`"`}).
                  </Typography>
                  <br />
                  <Grid container direction="column" spacing={3}>
                    {step3Questions.map((question) => {
                      let current =
                        context.responses.sectionB[0].responses[2].find(
                          (item) => {
                            return item.key === question.key;
                          }
                        );
                      return (
                        <Grid
                          item
                          key={question.key}
                          className={classes.radioQuestions}
                        >
                          <Typography variant="h5">
                            {question.question}
                          </Typography>
                          <FormControl component="fieldset" fullWidth={true}>
                            <RadioGroup
                              name={question.key}
                              value={current.value}
                              onChange={handleChange2}
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
                        </Grid>
                      );
                    })}
                  </Grid>
                </Paper>
              </Grid>

              {/* QUESTION 4 */}
              <Grid item>
                <Paper elevation={5} className={classes.questions}>
                  <Typography variant="h5">
                    What action, if any, did the popup message want you to take?
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={value3}
                      onChange={handleChange3}
                      displayEmpty
                    >
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
                      variant={disabled3 ? "filled" : "outlined"}
                      multiline
                      // rows={10}
                      // rowsMax={20}
                      value={textAreaValue3}
                      onChange={handleChange3}
                      // placeholder="Your response here."
                      disabled={disabled3}
                    />
                  </FormControl>
                </Paper>
              </Grid>

              {/* QUESTION 5 */}
              <Grid item>
                <Paper elevation={5} className={classes.questions}>
                  <Typography variant="h5">
                    Please rate the amount of risk you feel you were warned
                    against.
                  </Typography>
                  <FormControl component="fieldset" fullWidth={true}>
                    <RadioGroup
                      // name={question.key}
                      value={value4}
                      onChange={handleChange4}
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

              {/* QUESTION 6 */}
              <Grid item>
                <Paper elevation={5} className={classes.questions}>
                  <Typography variant="h5">
                    What do you think this message means? Short answers.
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      variant="filled"
                      multiline
                      // rows={5}
                      maxRows={10}
                      value={value5}
                      onChange={handleChange5}
                      placeholder="Your response here."
                    />
                  </FormControl>
                </Paper>
              </Grid>

              {/* QEUSTION 7 */}
              <Grid item>
                <Paper elevation={5} className={classes.questions}>
                  <Typography variant="h5">
                    Please rate your level of trust for this message.
                  </Typography>
                  <FormControl component="fieldset" fullWidth={true}>
                    <RadioGroup
                      // name={question.key}
                      value={value6}
                      onChange={handleChange6}
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
                          label="0%"
                          labelPlacement={matches ? "bottom" : "end"}
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="25%"
                          labelPlacement={matches ? "bottom" : "end"}
                        />
                        <FormControlLabel
                          value="3"
                          control={<Radio />}
                          label="50%"
                          labelPlacement={matches ? "bottom" : "end"}
                        />
                        <FormControlLabel
                          value="4"
                          control={<Radio />}
                          label="75%"
                          labelPlacement={matches ? "bottom" : "end"}
                        />
                        <FormControlLabel
                          value="5"
                          control={<Radio />}
                          label="100%"
                          labelPlacement={matches ? "bottom" : "end"}
                        />
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </Paper>
              </Grid>

              {/* QEUSTION 8 */}
              <Grid item>
                <Paper elevation={5} className={classes.questions}>
                  <Typography variant="h5">
                    In a short sentence summarize the aim of the message.
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      variant="filled"
                      multiline
                      // rows={5}
                      maxRows={10}
                      value={value7}
                      onChange={handleChange7}
                      placeholder="Your response here."
                    />
                  </FormControl>
                </Paper>
              </Grid>

              {/* QEUSTION 9 */}
              <Grid item>
                <Paper elevation={5} className={classes.questions}>
                  <Typography variant="h5">
                    How likely is it that something bad would happen if you
                    continued to the website after seeing this message?
                  </Typography>
                  <FormControl component="fieldset" fullWidth={true}>
                    <RadioGroup
                      // name={question.key}
                      value={value8}
                      onChange={handleChange8}
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

              {/* QEUSTION 10 */}
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
                      // rows={5}
                      maxRows={10}
                      value={value9}
                      onChange={handleChange9}
                      placeholder="Your response here."
                    />
                  </FormControl>
                </Paper>
              </Grid>

              {/* QEUSTION 11 */}
              <Grid item>
                <Paper elevation={5} className={classes.questions}>
                  <Typography variant="h5">
                    Do you agree with the reasons and recommendations of the
                    message?
                  </Typography>
                  <FormControl component="fieldset" fullWidth={true}>
                    <RadioGroup
                      // name={question.key}
                      value={value10}
                      onChange={handleChange10}
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

              {/* QEUSTIONS END */}
            </Grid>
            <div style={{ padding: "3rem" }}></div>
          </Grid>
          <Navigation
            showBack={false}
            showNext={allValidated}
            nextHandler={nextHandler}
            // backHandler={backHandler}
          />
        </>
      )}
    </>
  );
};

export default Part1;
