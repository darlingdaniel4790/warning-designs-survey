import React, { useState } from "react";
import { questions as sectionAQuestions } from "../pages/section-a";
import { step3Questions } from "../pages/section-b";
import { questions as sectionCQuestions } from "../pages/section-c";
import placeholder from "../assets/placeholder.png";

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
        image: "",
        principle: "",
        responses: [
          "",
          [],
          [
            {
              key: "",
              value: "",
            },
          ],
          [],
          "",
          "",
          "",
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
    sectionA: false,
    summary: false,
    sectionB: false,
    sectionC: false,
    end: false,
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
        key: "highest",
        image: "",
        principle: "",
        responses: [
          "",
          ["", ""],
          step3Questions.map((question) => {
            return {
              key: question.key,
              value: "x",
            };
          }),
          ["", ""],
          "x",
          "",
          "x",
          "",
          "x",
          "",
          "x",
        ],
      },
      {
        key: "lowest",
        image: "",
        principle: "",
        responses: [
          "",
          ["", ""],
          step3Questions.map((question) => {
            return {
              key: question.key,
              value: "x",
            };
          }),
          ["", ""],
          "x",
          "",
          "x",
          "",
          "x",
          "",
          "x",
        ],
      },
      {
        key: "baseline",
        image: placeholder,
        responses: [
          "",
          ["", ""],
          step3Questions.map((question) => {
            return {
              key: question.key,
              value: "x",
            };
          }),
          ["", ""],
          "x",
          "",
          "x",
          "",
          "x",
          "",
          "x",
        ],
      },
    ],
    sectionC: sectionCQuestions.map((question) => {
      if (question.key === "5") {
        return {
          key: question.key,
          value: question.options.map((op) => false),
        };
      }
      return {
        key: question.key,
        value: "",
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
