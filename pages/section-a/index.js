import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import Context from "../../store";
import classes from "./index.module.css";

export const questions = [
  {
    key: "1",
    principle: "reciprocity",
    question:
      "When a family member does me a favor, I am very inclined to return this favor.",
  },
  {
    key: "2",
    principle: "reciprocity",
    question: "I always pay back a favor.",
  },
  {
    key: "3",
    principle: "reciprocity",
    question:
      "If someone does something for me, I try to do something of similar value to repay the favor.",
  },

  {
    key: "4",
    principle: "scarcity",
    question:
      "I believe rare products (scarce) are more valuable than mass products.",
  },
  {
    key: "5",
    principle: "scarcity",
    question:
      "When my favorite shop is about to close, I would visit it since it is my last chance.",
  },
  {
    key: "6",
    principle: "scarcity",
    question:
      "I would feel good if I was the last person to be able to buy something.",
  },

  {
    key: "7",
    principle: "authority",
    question: "I always follow advice from my general practitioner.",
  },
  {
    key: "8",
    principle: "authority",
    question:
      "When a professor tells me something I tend to believe it is true.",
  },
  {
    key: "9",
    principle: "authority",
    question: "I am very inclined to listen to authority figures.",
  },

  {
    key: "10",
    principle: "commitment",
    question: "Whenever I commit to an appointment I always follow through.",
  },
  {
    key: "11",
    principle: "commitment",
    question: "I try to do everything I have promised to do.",
  },
  {
    key: "12",
    principle: "commitment",
    question: "When I make plans I commit to them by writing them down.",
  },

  {
    key: "13",
    principle: "concensus",
    question:
      "If someone from my social network notifies me about a good book, I tend to read it.",
  },
  {
    key: "14",
    principle: "concensus",
    question:
      "When I am in a new situation I look at others to see what I should do.",
  },
  {
    key: "15",
    principle: "concensus",
    question:
      "I will do something as long as I know there are others doing it too.",
  },

  {
    key: "16",
    principle: "liking",
    question: "I accept advice from my social network.",
  },
  {
    key: "17",
    principle: "liking",
    question: "When I like someone, I am more inclined to believe him or her.",
  },
  {
    key: "18",
    principle: "liking",
    question: "I will do a favor for people that I like.",
  },
];

const SectionA = (props) => {
  const context = useContext(Context);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const router = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (context.questions.sectionA) {
      setShuffledQuestions(context.questions.sectionA);
    } else {
      context.setQuestions((prev) => {
        return {
          ...prev,
          sectionA: props.questions,
        };
      });
      setShuffledQuestions(props.questions);
    }
    return () => {};
  }, []);

  const nextHandler = () => {
    router.push("/summary");
  };

  const backHandler = () => {
    router.back();
  };

  // console.log(context);

  const handleChange = (e) => {
    let indexToUpdate = context.responses.sectionA.findIndex(
      (response) => response.key === e.target.name
    );
    context.setResponses((prev) => {
      const newResponses = prev.sectionA;
      let principle = questions.find((item) => item.key === e.target.name);
      newResponses[indexToUpdate] = {
        key: e.target.name,
        value: e.target.value,
        principle: principle.principle,
      };
      return {
        ...prev,
        sectionA: newResponses,
      };
    });
  };

  const validate = () => {
    let control = false;
    context.responses.sectionA.every((item) => {
      if (!item.principle) {
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
      <Grid container spacing={7}>
        <Grid item>
          <Typography variant="h2">Section A</Typography>
        </Grid>
        <Grid container direction="column" spacing={3} alignContent="center">
          {shuffledQuestions.map((question) => {
            let current = context.responses.sectionA.find((item) => {
              return item.key === question.key;
            });
            return (
              <Grid md={8} lg={10} item key={question.key}>
                <Paper className={classes.questions}>
                  <Typography variant="h5">{question.question}</Typography>
                  <FormControl component="fieldset" fullWidth={true}>
                    <RadioGroup
                      aria-label={question.key}
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
      </Grid>
      <div style={{ padding: "3rem" }}></div>
      <Navigation
        showBack={true}
        showNext={validated}
        nextHandler={nextHandler}
        backHandler={backHandler}
      />
    </>
  );
};

export async function getServerSideProps() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }

  return {
    props: {
      questions: questions,
    },
  };
}

export default SectionA;
