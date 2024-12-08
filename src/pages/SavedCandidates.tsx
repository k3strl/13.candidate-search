import { useEffect, useState } from "react";
import { CandidateInterface as Candidate } from "../interfaces/Candidate.interface";



const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    setSavedCandidates(savedCandidates);
    console.log("Saved Candidates:", savedCandidates);
  }, []);

  const deleteCandidate = (id: number) => {
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.id !== id);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  return (
    <div style={{margin: "40px"}}>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Login</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Website</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>
                  <img src={candidate.avatar_url} alt={`Avatar for ${candidate.login}`} style={{height: "100px"}}/>
                </td>
                <td>{candidate.name ? candidate.name : "No Email on Record"}</td>
                <td>{candidate.login}</td>
                <td>{candidate.location ? candidate.location : "No Email on Record"}</td>
                <td>{candidate.email ? candidate.email : "No Email on Record"}</td>
                <td>{candidate.company ? candidate.company : "No Email on Record"}</td>
                <td>
                  <a href={candidate.html_url}>Website</a>
                </td>
                <button onClick={() => candidate.id !== undefined && deleteCandidate(candidate.id)} style={{ margin: "20px", backgroundColor: "red"}}>-</button>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Username</th>
                <th>Location</th>
                <th>Email</th>
                <th>Company</th>
                <th>Website</th>
              </tr>
            </thead>
          </table>
          <tbody>No Saved Candidates</tbody>
        </div>
      )}
    </div>
  );
};

export default SavedCandidates;
