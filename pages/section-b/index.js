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
import placeholder from "../../assets/placeholder.jpg";

const stepsLength = 7;

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
      context.setAccess((prev) => {
        return {
          ...prev,
          sectionC: true,
        };
      });
      router.push("/section-c");
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
    switch (activeStep) {
      case 1:
        return (
          <>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Paper elevation={5} className={classes.questions}>
                  <Typography variant="h5">
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
        break;
      case 2:
        return (
          <>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Paper elevation={5} className={classes.questions}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item style={{ margin: "15px 0" }}>
                      <Image src={placeholder} alt="placeholder" />
                    </Grid>
                  </Grid>
                  <Typography variant="h5">
                    Did you read the entire text of the message?
                  </Typography>
                  <FormControl component="fieldset" fullWidth={true}>
                    <RadioGroup
                    // aria-label={question.key}
                    // name={question.key}
                    // value={current.value}
                    // onChange={handleChange}
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
            </Grid>
          </>
        );
        break;
      case 3:
        let questions = [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
        ];
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
                      <Image src={placeholder} alt="placeholder" />
                    </Grid>
                  </Grid>
                  <Typography variant="h5">
                    Please rate the following statements (all statements were
                    rated on a 5-point Likert scale, ranging from {`"`}Don{`'`}t
                    agree{`"`} to {`"`}Totally agree{`"`}).
                  </Typography>
                </Paper>
              </Grid>
              {questions.map((question, index) => {
                // let current = context.responses.sectionA.find((item) => {
                //   return item.key === question.key;
                // });
                return (
                  <Grid item key={index}>
                    <Paper elevation={5} className={classes.questions}>
                      <Typography variant="h5">{question}</Typography>
                      <FormControl component="fieldset" fullWidth={true}>
                        <RadioGroup
                          aria-label={index.toString()}
                          name={index.toString()}
                          // value={current.value}
                          // onChange={handleChange}
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
        break;
      case 4:
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
                      <Image src={placeholder} alt="placeholder" />
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
                      id="journal-entry"
                      // value={response[0]}
                      // onChange={handleChange}
                      placeholder="Your response here."
                    />
                  </FormControl>
                </Paper>
              </Grid>
            </Grid>
          </>
        );
        break;
      case 5:
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
                      <Image src={placeholder} alt="placeholder" />
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
                    <Select
                      // value={age}
                      // onChange={handleChange}
                      displayEmpty
                      // className={classes.selectEmpty}
                      // inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
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
        break;
      case 6:
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
                      <Image src={placeholder} alt="placeholder" />
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
                    <Select
                      // value={age}
                      // onChange={handleChange}
                      displayEmpty
                      // className={classes.selectEmpty}
                      // inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
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
        break;
      case 7:
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
                      <Image src={placeholder} alt="placeholder" />
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
                      id="journal-entry"
                      // value={response[0]}
                      // onChange={handleChange}
                      placeholder="Your response here."
                    />
                  </FormControl>
                </Paper>
              </Grid>
            </Grid>
          </>
        );
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Head>
        <title>Section B - {activeStep}</title>
      </Head>
      {showPage && (
        <>
          <Grid item lg={9} style={{ width: "inherit" }}>
            <Typography variant="h2" gutterBottom={true}>
              Section B - {activeStep}
            </Typography>
            {questionShown()}
            <div style={{ padding: "3rem" }}></div>
          </Grid>
          <Navigation
            showBack={true}
            showNext={true}
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
