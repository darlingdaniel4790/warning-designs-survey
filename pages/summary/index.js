import { Grid, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import Context from "../../store";
import Head from "next/head";
import authorityImage from "../../assets/authority.png";
import commitmentImage from "../../assets/commitment.png";
import consensusImage from "../../assets/consensus.png";
import likingImage from "../../assets/liking.png";
import reciprocityImage from "../../assets/reciprocity.png";
import scarcityImage from "../../assets/scarcity.png";

const Summary = () => {
  const router = useRouter();
  const context = useContext(Context);
  const [responses, setResponses] = useState();
  const [chosenMessage, setChosenMessage] = useState("");
  const [showPage, setShowPage] = useState(false);

  // 1,2,3 - reciprocity
  const reciprocity = [1, 2, 3];

  // 4,5,6 - scarcity
  const scarcity = [4, 5, 6];

  // 7,8,9 - authority
  const authority = [7, 8, 9];

  // 10,11,12 - commitment
  const commitment = [10, 11, 12];

  // 13,14,15 - consensus
  const consensus = [13, 14, 15];

  // 16,17,18 - liking
  const liking = [16, 17, 18];

  let summary = {
    reciprocity: [],
    scarcity: [],
    authority: [],
    commitment: [],
    consensus: [],
    liking: [],
  };

  useEffect(() => {
    // redirect if no access
    if (!context.access.summary) {
      router.replace("/section-a");
      return;
    }
    setShowPage(true);

    context.responses.sectionA.map((item) => {
      if (reciprocity.includes(parseInt(item.key))) {
        summary.reciprocity.push(item.value);
      } else if (scarcity.includes(parseInt(item.key))) {
        summary.scarcity.push(item.value);
      } else if (authority.includes(parseInt(item.key))) {
        summary.authority.push(item.value);
      } else if (commitment.includes(parseInt(item.key))) {
        summary.commitment.push(item.value);
      } else if (consensus.includes(parseInt(item.key))) {
        summary.consensus.push(item.value);
      } else if (liking.includes(parseInt(item.key))) {
        summary.liking.push(item.value);
      }
    });

    let temp = [];

    temp.push(
      summary.reciprocity.reduce((acc, item) => {
        return acc + (parseInt(item) * 100) / 5;
      }, 0)
    );
    temp.push(
      summary.scarcity.reduce((acc, item) => {
        return acc + (parseInt(item) * 100) / 5;
      }, 0)
    );
    temp.push(
      summary.authority.reduce((acc, item) => {
        return acc + (parseInt(item) * 100) / 5;
      }, 0)
    );
    temp.push(
      summary.commitment.reduce((acc, item) => {
        return acc + (parseInt(item) * 100) / 5;
      }, 0)
    );
    temp.push(
      summary.consensus.reduce((acc, item) => {
        return acc + (parseInt(item) * 100) / 5;
      }, 0)
    );
    temp.push(
      summary.liking.reduce((acc, item) => {
        return acc + (parseInt(item) * 100) / 5;
      }, 0)
    );

    var indexOfMaxValue = temp.reduce(
      (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
      0
    );
    var indexOfMinValue = temp.reduce(
      (iMax, x, i, arr) => (x < arr[iMax] ? i : iMax),
      0
    );
    temp = temp.map((element, index) => {
      if (index === indexOfMaxValue) {
        return (element = [element, "limegreen"]);
      } else if (index === indexOfMinValue) {
        return (element = [element, "red"]);
      } else {
        return (element = [element, ""]);
      }
    });

    setResponses({
      reciprocity: temp[0],
      scarcity: temp[1],
      authority: temp[2],
      commitment: temp[3],
      consensus: temp[4],
      liking: temp[5],
    });

    switch (indexOfMaxValue) {
      case 0:
        setChosenMessage("You will now proceed for the Reciprocity test.");
        context.setResponses((prev) => {
          prev.sectionB[1].principle = "reciprocity";
          prev.sectionB[1].image = reciprocityImage;
          return prev;
        });
        break;
      case 1:
        setChosenMessage("You will now proceed for the Scarcity test.");
        context.setResponses((prev) => {
          prev.sectionB[1].principle = "scarcity";
          prev.sectionB[1].image = scarcityImage;
          return prev;
        });

        break;
      case 2:
        setChosenMessage("You will now proceed for the Authority test.");
        context.setResponses((prev) => {
          prev.sectionB[1].principle = "authority";
          prev.sectionB[1].image = authorityImage;
          return prev;
        });

        break;
      case 3:
        setChosenMessage("You will now proceed for the Commitment test.");
        context.setResponses((prev) => {
          prev.sectionB[1].principle = "commitment";
          prev.sectionB[1].image = commitmentImage;
          return prev;
        });

        break;
      case 4:
        setChosenMessage("You will now proceed for the Consensus test.");
        context.setResponses((prev) => {
          prev.sectionB[1].principle = "consensus";
          prev.sectionB[1].image = consensusImage;
          return prev;
        });

        break;
      case 5:
        setChosenMessage("You will now proceed for the Liking test.");
        context.setResponses((prev) => {
          prev.sectionB[1].principle = "liking";
          prev.sectionB[1].image = likingImage;
          return prev;
        });

        break;

      default:
        break;
    }

    switch (indexOfMinValue) {
      case 0:
        context.setResponses((prev) => {
          prev.sectionB[2].principle = "reciprocity";
          prev.sectionB[2].image = reciprocityImage;
          return prev;
        });
        break;
      case 1:
        context.setResponses((prev) => {
          prev.sectionB[2].principle = "scarcity";
          prev.sectionB[2].image = scarcityImage;
          return prev;
        });

        break;
      case 2:
        context.setResponses((prev) => {
          prev.sectionB[2].principle = "authority";
          prev.sectionB[2].image = authorityImage;
          return prev;
        });

        break;
      case 3:
        context.setResponses((prev) => {
          prev.sectionB[2].principle = "commitment";
          prev.sectionB[2].image = commitmentImage;
          return prev;
        });

        break;
      case 4:
        context.setResponses((prev) => {
          prev.sectionB[2].principle = "consensus";
          prev.sectionB[2].image = consensusImage;
          return prev;
        });

        break;
      case 5:
        context.setResponses((prev) => {
          prev.sectionB[2].principle = "liking";
          prev.sectionB[2].image = likingImage;
          return prev;
        });

        break;

      default:
        break;
    }
    return () => {};
  }, []);

  const nextHandler = () => {
    context.setAccess((prev) => {
      return {
        ...prev,
        sectionB: true,
      };
    });
    router.push("/section-b");
  };

  const backHandler = () => {
    router.push("/section-a");
  };

  let output;
  if (responses)
    output = (
      <>
        <Typography
          style={{ color: `${responses.reciprocity[1]}` }}
          variant="h4"
        >
          <br />
          {`Reciprocity: ${(responses.reciprocity[0] / 3).toFixed(
            1
          )}% inclined`}
        </Typography>
        <Typography
          style={{ color: `${responses.scarcity[1]}` }}
          variant="h4"
        >{`Scarcity: ${(responses.scarcity[0] / 3).toFixed(
          1
        )}% inclined`}</Typography>
        <Typography
          style={{ color: `${responses.authority[1]}` }}
          variant="h4"
        >{`Authority: ${(responses.authority[0] / 3).toFixed(
          1
        )}% inclined`}</Typography>
        <Typography
          style={{ color: `${responses.commitment[1]}` }}
          variant="h4"
        >{`Commitment: ${(responses.commitment[0] / 3).toFixed(
          1
        )}% inclined`}</Typography>
        <Typography
          style={{ color: `${responses.consensus[1]}` }}
          variant="h4"
        >{`Consensus: ${(responses.consensus[0] / 3).toFixed(
          1
        )}% inclined`}</Typography>
        <Typography
          style={{ color: `${responses.liking[1]}` }}
          variant="h4"
        >{`Liking: ${(responses.liking[0] / 3).toFixed(
          1
        )}% inclined`}</Typography>
      </>
    );
  else output = "";

  return (
    <>
      <Head>
        <title>Section A - Summary</title>
      </Head>
      {showPage && (
        <>
          <Grid item lg={9}>
            <Grid container direction="column">
              <Typography variant="h2">Section A Summary</Typography>
              {output}
              <Typography variant="h4">
                <br />
                {chosenMessage}
              </Typography>
            </Grid>
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

export default Summary;
