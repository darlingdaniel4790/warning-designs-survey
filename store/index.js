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
  access: {
    sectionA: false,
    summary: false,
    sectionB: false,
    sectionC: false,
    end: false,
  },
  setAccess: () => {},
});

export const ContextProvider = (props) => {
  // states here
  const [access, setAccess] = useState({
    sectionA: false,
    summary: false,
    sectionB: true,
    sectionC: true,
    end: true,
  });
  const [questions, setQuestions] = useState({});
  const [responses, setResponses] = useState({
    sectionA: sectionAQuestions.map((question) => {
      return {
        key: question.key,
        value: "x",
        principle: "",
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
        access: access,
        setAccess: setAccess,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
