import { Button, Grid, TextField } from "@material-ui/core";
import { parse } from "json2csv";
import { useState } from "react";
import { firestoreDB } from "./_app";
// import firebase from "firebase/app";

const Admin = (props) => {
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const downloadData = () => {
    let objects = [];
    // console.log("data processing...");
    firestoreDB
      .collection("responses")
      .get()
      .then((snapshot) => {
        let item = {};
        snapshot.forEach((doc) => {
          let data = doc.data();
          let response = JSON.parse(data.response);
          let date = data.date.toDate();
          let options = ["Chrome", "Firefox", "Internet Explorer", "Other"];
          let browserValue = "";
          response.sectionC[4].value.forEach((opt, i) => {
            if (opt) {
              if (i !== 0 && browserValue !== "") {
                browserValue += ", ";
              }
              browserValue += options[i];
            }
          });
          item = {
            "Firebase ID": doc.id,
            // ID: data.id,
            "Prolific ID": "TBR",
            // ProlificID: response.ProlificID,
            "Study ID": "TBR",
            // StudyID: response.StudyID,
            "Session ID": "TBR",
            // SessionID: response.SessionID,

            Date: date,
            "Total Survey Duration (in minutes)": response.TotalTime !== undefined && response.TotalTime,

            // SECTION A
            "Quality Check A": response.sectionA[9].value,
            A1: response.sectionA[0].value,
            A2: response.sectionA[1].value,
            A3: response.sectionA[2].value,
            A4: response.sectionA[3].value,
            A5: response.sectionA[4].value,
            A6: response.sectionA[5].value,
            A7: response.sectionA[6].value,
            A8: response.sectionA[7].value,
            A9: response.sectionA[8].value,
            A11: response.sectionA[10].value,
            A12: response.sectionA[11].value,
            A13: response.sectionA[12].value,
            A14: response.sectionA[13].value,
            A15: response.sectionA[14].value,
            A16: response.sectionA[15].value,
            A17: response.sectionA[16].value,
            A18: response.sectionA[17].value,
            A19: response.sectionA[18] !== undefined && response.sectionA[18].value,

            // SUMMARY
            // Reciprocity: "N/A",
            // Scarcity: "N/A",
            // Authority: "N/A",
            // Commitment: "N/A",
            // Consensus: "N/A",
            // Liking: "N/A",
            Reciprocity: response.summary !== undefined && response.summary.reciprocity,
            Scarcity: response.summary !== undefined && response.summary.scarcity,
            Authority: response.summary !== undefined && response.summary.authority,
            Commitment: response.summary !== undefined && response.summary.commitment,
            Consensus: response.summary !== undefined && response.summary.consensus,
            Liking: response.summary !== undefined && response.summary.liking,

            // SECTION B
            // PATH A
            "Quality Check B-1": response.sectionB[0].responses[11] !== undefined && response.sectionB[0].responses[11],
            "Path A": (response.sectionB[0].principle + "").toUpperCase(),
            "Path A-1": response.sectionB[0].responses[0],
            "Path A-2":
              response.sectionB[0].responses[1][0] === "Others"
                ? response.sectionB[0].responses[1][1]
                : response.sectionB[0].responses[1][0],
            "Path A-3-1": response.sectionB[0].responses[2][0].value,
            "Path A-3-2": response.sectionB[0].responses[2][0].value,
            "Path A-4":
              response.sectionB[0].responses[3][0] === "Others"
                ? response.sectionB[0].responses[3][1]
                : response.sectionB[0].responses[3][0],
            "Path A-5": response.sectionB[0].responses[4],
            "Path A-6": response.sectionB[0].responses[5],
            "Path A-7": response.sectionB[0].responses[6],
            "Path A-8": response.sectionB[0].responses[7],
            "Path A-9": response.sectionB[0].responses[8],
            "Path A-10": response.sectionB[0].responses[9],
            "Path A-11": response.sectionB[0].responses[10],
            "Time Taken for Path A": "TBC",

            // PATH B
            "Quality Check B-2": response.sectionB[1].responses[11] !== undefined && response.sectionB[1].responses[11],
            "Path B": (response.sectionB[1].principle + "").toUpperCase(),
            "Path B-1": response.sectionB[1].responses[0],
            "Path B-2":
              response.sectionB[1].responses[1][0] === "Others"
                ? response.sectionB[1].responses[1][1]
                : response.sectionB[1].responses[1][0],
            "Path B-3-1": response.sectionB[1].responses[2][0].value,
            "Path B-3-2": response.sectionB[1].responses[2][0].value,
            "Path B-4":
              response.sectionB[1].responses[3][0] === "Others"
                ? response.sectionB[1].responses[3][1]
                : response.sectionB[1].responses[3][0],
            "Path B-5": response.sectionB[1].responses[4],
            "Path B-6": response.sectionB[1].responses[5],
            "Path B-7": response.sectionB[1].responses[6],
            "Path B-8": response.sectionB[1].responses[7],
            "Path B-9": response.sectionB[1].responses[8],
            "Path B-10": response.sectionB[1].responses[9],
            "Path B-11": response.sectionB[1].responses[10],
            "Time Taken for Path B": "TBC",

            // BASELINE
            "Quality Check B-3": response.sectionB[2].responses[11] !== undefined && response.sectionB[2].responses[11],
            Baseline: "BASELINE",
            "Baseline-1": response.sectionB[2].responses[0],
            "Baseline-2":
              response.sectionB[2].responses[1][0] === "Others"
                ? response.sectionB[2].responses[1][1]
                : response.sectionB[2].responses[1][0],
            "Baseline-3-1": response.sectionB[2].responses[2][0].value,
            "Baseline-3-2": response.sectionB[2].responses[2][0].value,
            "Baseline-4":
              response.sectionB[2].responses[3][0] === "Others"
                ? response.sectionB[2].responses[3][1]
                : response.sectionB[2].responses[3][0],
            "Baseline-5": response.sectionB[2].responses[4],
            "Baseline-6": response.sectionB[2].responses[5],
            "Baseline-7": response.sectionB[2].responses[6],
            "Baseline-8": response.sectionB[2].responses[7],
            "Baseline-9": response.sectionB[2].responses[8],
            "Baseline-10": response.sectionB[2].responses[9],
            "Baseline-11": response.sectionB[2].responses[10],
            "Time Taken for Baseline": "TBC",

            // SECTION C
            C1: response.sectionC[0].value,
            C2: response.sectionC[1].value,
            C3: response.sectionC[2].value,
            C4: response.sectionC[3].value,
            C5: browserValue,
            C6: response.sectionC[5].value,
            C7: response.sectionC[6].value,
            "Time Taken for Section C": "TBC",
          };
          objects.push(item);
        });
        try {
          const csv = parse(objects);
          download(csv, "response.csv", "text/plain");
        } catch (err) {
          console.error(err);
        }
      });
  };
  const download = (content, fileName, contentType) => {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    if (e.target.value === props.pass) {
      setInput("");
      setUnlocked(true);
    }
  };

  return (
    <>
      <Grid container direction="column">
        {!unlocked ? (
          <TextField variant="filled" onChange={handleChange} value={input} />
        ) : (
          <Button variant="contained" onClick={downloadData}>
            Get Responses CSV
          </Button>
        )}
      </Grid>
    </>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      pass: "Joseph1234",
    },
  };
}

export default Admin;
