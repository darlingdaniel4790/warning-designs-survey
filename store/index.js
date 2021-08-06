import React, { useState } from "react";
import { questions as sectionAQuestions } from "../pages/section-a";
import { step3Questions } from "../pages/section-b";
import { questions as sectionCQuestions } from "../pages/section-c";

const Context = React.createContext({
  responses: {
    sectionA: [
      {
        key: "",
        value: "",
        principle: "",
      },
    ],
    sectionB: [
      {
        key: "",
        responses: [
          "",
          [
            {
              key: "",
              value: "",
            },
          ],
          "",
          "",
          "",
          "",
        ],
      },
    ],
    sectionC: [
      {
        key: "",
        value: "",
      },
    ],
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
    sectionA: true,
    summary: true,
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
    sectionB: [
      {
        key: "baseline",
        responses: [
          "",
          step3Questions.map((question) => {
            return {
              key: question.key,
              value: "x",
            };
          }),
          "",
          "",
          "",
          "",
        ],
      },
      {
        key: "highest",
        principle: "",
        responses: [
          "",
          step3Questions.map((question) => {
            return {
              key: question.key,
              value: "x",
            };
          }),
          "",
          "",
          "",
          "",
        ],
      },
      {
        key: "lowest",
        principle: "",
        responses: [
          "",
          step3Questions.map((question) => {
            return {
              key: question.key,
              value: "x",
            };
          }),
          "",
          "",
          "",
          "",
        ],
      },
    ],
    sectionC: sectionCQuestions.map((question) => {
      return {
        key: question.key,
        value: "x",
      };
    }),
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
