import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import avatar from "../assets/avatar.png";

import "./Diff.css";
import { CodeSnippet } from "../components";

const Diff = (props) => {
  const { owner, repository, commitSHA } = useParams();
  const [diffData, setDiffData] = useState([]);
  const [commitData, setCommitData] = useState([]);

  const fetchGitDiffData = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:2817/repositories/${owner}/${repository}/commits/${commitSHA}/diff`
      );
      console.log(res.data);
      setDiffData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGitCommitfData = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:2817/repositories/${owner}/${repository}/commits/${commitSHA}`
      );
      console.log(res.data);
      setCommitData(res.data);
      console.log(commitData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGitDiffData();
    fetchGitCommitfData();
  }, []);

  return (
    <>
      <div className="diffContainer">
        <div className="flex-row">
          <img src={avatar} style={{ width: 49, height: 49 }} alt="hello" />
          <div style={{ width: "100%", marginLeft: "10px" }}>
            <h3>{commitData[0]?.message} (#14142)</h3>
            <div className="flex-row justify-sp-bw">
              <div>
                <h4>Authored by {commitData[0]?.author?.name} four days ago</h4>
                <p style={{ maxWidth: "715px" }}>
                  This is body text. Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Eget ipsum massa egestas id pellentesque
                  volutpat maecenas amet.
                </p>
              </div>
              <div>
                <p>
                  Commited by {commitData[0]?.committer?.name} three days ago
                </p>
                <p>Commit {commitData[0]?.oid}</p>
                <p>Parent {commitData[0]?.parents[0]?.oid}</p>
              </div>
            </div>
          </div>
        </div>

        {diffData?.map((file) => {
          return (
            <div
              style={{
                marginTop: "20px",
                border: "1px solid grey",
                padding: "10px",
              }}
            >
              {file.hunks.map((hunk) => {
                return <CodeSnippet data={hunk}></CodeSnippet>;
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Diff;
