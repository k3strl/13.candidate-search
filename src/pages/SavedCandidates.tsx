import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { CandidateInterface as Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const location = useLocation();
  const initialCandidates: Candidate[] = location.state?.savedCandidates || [];

  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    const storedCandidates = localStorage.getItem('savedCandidates');
    const parsedCandidates = storedCandidates ? JSON.parse(storedCandidates) : initialCandidates;
    return parsedCandidates;
  });

  // Save candidates to local storage
  useEffect(() => {
    const savedCandidates = JSON.parse(
      localStorage.getItem("savedCandidates") || "[]"
    );
    setSavedCandidates(savedCandidates);
    console.log("Saved Candidates:", savedCandidates);
  }, []);

  // Remove saved candidate 
  const deleteCandidate = (id: number) => {
    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.id !== id
    );
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  return (
    <div>
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
                  <img
                    src={candidate.avatar_url}
                    alt={`Avatar for ${candidate.login}`}
                  />
                </td>
                <td>
                  {candidate.name ? candidate.name : "No Email on Record"}
                </td>
                <td>{candidate.login}</td>
                <td>
                  {candidate.location
                    ? candidate.location
                    : "No Email on Record"}
                </td>
                <td>
                  {candidate.email ? candidate.email : "No Email on Record"}
                </td>
                <td>
                  {candidate.company ? candidate.company : "No Email on Record"}
                </td>
                <td>
                  <a href={candidate.html_url}>Website</a>
                </td>
                <td>
                  <button
                    onClick={() =>
                      candidate.id !== undefined && deleteCandidate(candidate.id)
                    }
                    style={{ margin: "20px", backgroundColor: "red" }}
                  >
                    -
                  </button>
                </td>
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
          <div>
            <tbody>No Saved Candidates</tbody>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedCandidates;