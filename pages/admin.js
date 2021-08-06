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
          // let response = JSON.parse(data.response);
          let date = data.date.toDate();
          item = {
            ID: doc.id,
            Date: date,
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
