import React, { useState } from "react";
import { questions as sectionAQuestions } from "../pages/section-a";

const Context = React.createContext({
  responses: {
    sectionA: [],
    sectionB: [],
    sectionC: [],
  },
  setResponses: () => {},
  questions: {
    sectionA: [],
  },
  setQuestions: () => {},
});

export const ContextProvider = (props) => {
  // states here
  const [questions, setQuestions] = useState({});
  const [responses, setResponses] = useState({
    sectionA: sectionAQuestions.map((question) => {
      return {
        key: question.key,
        value: "x",
      };
    }),
    sectionB: "",
    sectionC: "",
  });

  // functions here

  return (
    <Context.Provider
      value={{
        responses: responses,
        setResponses: setResponses,
        questions: questions,
        setQuestions: setQuestions,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
