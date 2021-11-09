import { Grid, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import Context from "../../store";
import Head from "next/head";

import authorityImage1 from "../../assets/authority/Age_authority.png";
import authorityImage2 from "../../assets/authority/Alexa_authority.png";
import authorityImage3 from "../../assets/authority/Archive_authority.png";
import authorityImage4 from "../../assets/authority/Domain_authority.png";
import authorityImage5 from "../../assets/authority/HTTPs_authority.png";
import authorityImage6 from "../../assets/authority/Server_authority.png";
import authorityImage7 from "../../assets/authority/URL_authority.png";

import commitmentImage1 from "../../assets/commitment/Age_commitment.png";
import commitmentImage2 from "../../assets/commitment/Alexa_commitment.png";
import commitmentImage3 from "../../assets/commitment/Archive_commitment.png";
import commitmentImage4 from "../../assets/commitment/Domain_commitment.png";
import commitmentImage5 from "../../assets/commitment/HTTPs_commitment.png";
import commitmentImage6 from "../../assets/commitment/Server_commitment.png";
import commitmentImage7 from "../../assets/commitment/URL_commitment.png";

import consensusImage1 from "../../assets/consensus/Age_consensus.png";
import consensusImage2 from "../../assets/consensus/Alexa_consensus.png";
import consensusImage3 from "../../assets/consensus/Archive_consensus.png";
import consensusImage4 from "../../assets/consensus/Domain_consensus.png";
import consensusImage5 from "../../assets/consensus/HTTPs_consensus.png";
import consensusImage6 from "../../assets/consensus/Server_consensus.png";
import consensusImage7 from "../../assets/consensus/URL_consensus.png";

import likingImage1 from "../../assets/liking/Age_liking.png";
import likingImage2 from "../../assets/liking/Alexa_liking.png";
import likingImage3 from "../../assets/liking/Archive_liking.png";
import likingImage4 from "../../assets/liking/Domain_liking.png";
import likingImage5 from "../../assets/liking/HTTPs_liking.png";
import likingImage6 from "../../assets/liking/Server_liking.png";
import likingImage7 from "../../assets/liking/URL_liking.png";

import reciprocityImage1 from "../../assets/reciprocity/Age_reciprocity.png";
import reciprocityImage2 from "../../assets/reciprocity/Alexa_reciprocity.png";
import reciprocityImage3 from "../../assets/reciprocity/Archive_reciprocity.png";
import reciprocityImage4 from "../../assets/reciprocity/Domain_reciprocity.png";
import reciprocityImage5 from "../../assets/reciprocity/HTTPs_reciprocity.png";
import reciprocityImage6 from "../../assets/reciprocity/Server_reciprocity.png";
import reciprocityImage7 from "../../assets/reciprocity/URL_reciprocity.png";

import scarcityImage1 from "../../assets/scarcity/Age_scarcity.png";
import scarcityImage2 from "../../assets/scarcity/Alexa_scarcity.png";
import scarcityImage3 from "../../assets/scarcity/Archive_scarcity.png";
import scarcityImage4 from "../../assets/scarcity/Domain_scarcity.png";
import scarcityImage5 from "../../assets/scarcity/HTTPs_scarcity.png";
import scarcityImage6 from "../../assets/scarcity/Server_scarcity.png";
import scarcityImage7 from "../../assets/scarcity/URL_scarcity.png";

const Summary = () => {
  const authorityImage = [
    authorityImage1,
    authorityImage2,
    authorityImage3,
    authorityImage4,
    authorityImage5,
    authorityImage6,
    authorityImage7,
  ];
  const commitmentImage = [
    commitmentImage1,
    commitmentImage2,
    commitmentImage3,
    commitmentImage4,
    commitmentImage5,
    commitmentImage6,
    commitmentImage7,
  ];
  const consensusImage = [
    consensusImage1,
    consensusImage2,
    consensusImage3,
    consensusImage4,
    consensusImage5,
    consensusImage6,
    consensusImage7,
  ];
  const likingImage = [
    likingImage1,
    likingImage2,
    likingImage3,
    likingImage4,
    likingImage5,
    likingImage6,
    likingImage7,
  ];
  const reciprocityImage = [
    reciprocityImage1,
    reciprocityImage2,
    reciprocityImage3,
    reciprocityImage4,
    reciprocityImage5,
    reciprocityImage6,
    reciprocityImage7,
  ];
  const scarcityImage = [
    scarcityImage1,
    scarcityImage2,
    scarcityImage3,
    scarcityImage4,
    scarcityImage5,
    scarcityImage6,
    scarcityImage7,
  ];

  const router = useRouter();
  const context = useContext(Context);
  context.setCurrentSection(2);

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
    context.setResponses((prev) => {
      prev.summary = {
        reciprocity: (temp[0][0] / 3).toFixed(1),
        scarcity: (temp[1][0] / 3).toFixed(1),
        authority: (temp[2][0] / 3).toFixed(1),
        commitment: (temp[3][0] / 3).toFixed(1),
        consensus: (temp[4][0] / 3).toFixed(1),
        liking: (temp[5][0] / 3).toFixed(1),
      };
      return prev;
    });
    switch (indexOfMaxValue) {
      case 0:
        setChosenMessage("You will now proceed for the Reciprocity test.");
        context.setResponses((prev) => {
          prev.sectionB[0].principle = "reciprocity";
          prev.sectionB[0].image =
            reciprocityImage[Math.floor(Math.random() * 7)];
          return prev;
        });
        break;
      case 1:
        setChosenMessage("You will now proceed for the Scarcity test.");
        context.setResponses((prev) => {
          prev.sectionB[0].principle = "scarcity";
          prev.sectionB[0].image = scarcityImage[Math.floor(Math.random() * 7)];
          return prev;
        });

        break;
      case 2:
        setChosenMessage("You will now proceed for the Authority test.");
        context.setResponses((prev) => {
          prev.sectionB[0].principle = "authority";
          prev.sectionB[0].image =
            authorityImage[Math.floor(Math.random() * 7)];
          return prev;
        });

        break;
      case 3:
        setChosenMessage("You will now proceed for the Commitment test.");
        context.setResponses((prev) => {
          prev.sectionB[0].principle = "commitment";
          prev.sectionB[0].image =
            commitmentImage[Math.floor(Math.random() * 7)];
          return prev;
        });

        break;
      case 4:
        setChosenMessage("You will now proceed for the Consensus test.");
        context.setResponses((prev) => {
          prev.sectionB[0].principle = "consensus";
          prev.sectionB[0].image =
            consensusImage[Math.floor(Math.random() * 7)];
          return prev;
        });

        break;
      case 5:
        setChosenMessage("You will now proceed for the Liking test.");
        context.setResponses((prev) => {
          prev.sectionB[0].principle = "liking";
          prev.sectionB[0].image = likingImage[Math.floor(Math.random() * 7)];
          return prev;
        });

        break;

      default:
        break;
    }

    switch (indexOfMinValue) {
      case 0:
        context.setResponses((prev) => {
          prev.sectionB[1].principle = "reciprocity";
          prev.sectionB[1].image =
            reciprocityImage[Math.floor(Math.random() * 7)];
          return prev;
        });
        break;
      case 1:
        context.setResponses((prev) => {
          prev.sectionB[1].principle = "scarcity";
          prev.sectionB[1].image = scarcityImage[Math.floor(Math.random() * 7)];
          return prev;
        });

        break;
      case 2:
        context.setResponses((prev) => {
          prev.sectionB[1].principle = "authority";
          prev.sectionB[1].image =
            authorityImage[Math.floor(Math.random() * 7)];
          return prev;
        });

        break;
      case 3:
        context.setResponses((prev) => {
          prev.sectionB[1].principle = "commitment";
          prev.sectionB[1].image =
            commitmentImage[Math.floor(Math.random() * 7)];
          return prev;
        });

        break;
      case 4:
        context.setResponses((prev) => {
          prev.sectionB[1].principle = "consensus";
          prev.sectionB[1].image =
            consensusImage[Math.floor(Math.random() * 7)];
          return prev;
        });

        break;
      case 5:
        context.setResponses((prev) => {
          prev.sectionB[1].principle = "liking";
          prev.sectionB[1].image = likingImage[Math.floor(Math.random() * 7)];
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
            showBack={false}
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
