import React, { useState } from "react";
import { questions as sectionAQuestions } from "../pages/section-a";
import { step3Questions } from "../pages/section-b";
import { questions as sectionCQuestions } from "../pages/section-c";
import placeholder from "../assets/placeholder.png";

const Context = React.createContext({
  currentSection: 0,
  setCurrentSection: () => {},
  responses: {
    Left: [],
    StartTime: "",
    TotalTime: "",
    ProlificId: "",
    StudyId: "",
    SessionId: "",
    sectionA: [
      {
        key: "",
        value: "",
        principle: "",
      },
    ],
    summary: {
      reciprocity: 0,
      scarcity: 0,
      authority: 0,
      commitment: 0,
      consensus: 0,
      liking: 0,
    },
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
    sectionB1: false,
    sectionB2: false,
    sectionB3: false,
    sectionC: false,
    end: false,
  },
  setAccess: () => {},
});

export const ContextProvider = (props) => {
  // states here
  const [currentSection, setCurrentSection] = useState(0);
  const [access, setAccess] = useState({
    sectionA: false,
    summary: false,
    sectionB: false,
    sectionB1: false,
    sectionB2: false,
    sectionB3: false,
    sectionC: false,
    end: true,
  });
  const [questions, setQuestions] = useState({});
  const [responses, setResponses] = useState({
    Left: [0,1,2],
    StartTime: new Date(),
    TotalTime: "",
    ProlificId: "",
    StudyId: "",
    SessionId: "",
    sectionA: sectionAQuestions.map((question) => {
      return {
        key: question.key,
        value: "4",
        principle: "reciprocity",
      };
    }),
    summary: {
      reciprocity: 0,
      scarcity: 0,
      authority: 0,
      commitment: 0,
      consensus: 0,
      liking: 0,
    },
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
          "x"
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
          "x"
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
          "x"
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
        currentSection: currentSection,
        setCurrentSection: setCurrentSection,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
