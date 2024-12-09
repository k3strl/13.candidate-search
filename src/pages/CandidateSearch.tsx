// imports

import { useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { CandidateInterface } from '../interfaces/Candidate.interface'
import { useNavigate } from 'react-router-dom';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<CandidateInterface | null>(null); 
  const [savedCandidates, setSavedCandidates] = useState<CandidateInterface[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); //state for search input
  const navigate = useNavigate();

  // Retrieve a random candidate
  const getRandomCandidate = async () => {
    try {
      const candidates = await searchGithub(); 
      if (candidates.length > 0) {
        const candidateDetails = await searchGithubUser(candidates[0].login);
        setCandidate(candidateDetails);
      }
    } catch (error) {
      console.error("Error fetching random candidate:", error);
    }
  };

  // Search for a specific candidate by username
const getSpecificCandidate = async (username: string) => {
  try {
    const candidateDetails = await searchGithubUser(username);
    setCandidate(candidateDetails);
  } catch (error) {
    console.error("Candidate not found", error);
    setCandidate(null);
  }
};

// search button clicked
const handleSearch = () => {
  if (searchTerm.trim()) {
    getSpecificCandidate(searchTerm.trim());
  } else { // get random client if no search input exists
    getRandomCandidate();
  }
}

// Save candidate to local storage (Green + button)
const saveCandidate = () => {
  if (candidate) {
    setSavedCandidates([...savedCandidates, candidate]);
    getRandomCandidate();
  }
};

// Skip button (Red - button)
const skipCandidate = () => {
  getRandomCandidate();
};

// Potential Candidates page w/ saved candidates
const goToSavedCandidates = () => {
  navigate('/SavedCandidates', { state: { savedCandidates } });
};

  return (
    <div className="candidate-search">
      <h1>Candidate Search</h1>
      {/* Search Input and Button */}
      <div className="search-box">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for specific username, or leave blank for a random public user."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Display Candidate Info */}
      {candidate ? (
        <div className="candidate-card">
          <img
          src={candidate.avatar_url}
          alt={`${candidate.login} avatar`}
          className="candidate-avatar"/>
          <div className="candidate-info">
            <h2>Name: {candidate.name}</h2>
            <p>Username: {candidate.login}</p>
            <p>Location: {candidate.location ?? 'N/A'}</p>
            <p>Email: {candidate.email ?? 'N/A'}</p>
            <p>Company: {candidate.company ?? 'N/A'}</p>
            <p>Bio: {candidate.bio ?? 'N/A'}</p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              View My Profile!
            </a>
          </div>
          <div>
            <button className="skip-button" onClick={skipCandidate}>-</button>
            <button className="save-button" onClick={saveCandidate}>+</button>
          </div>
        </div>
      ) : (
      <div>
        <p>Type in a username to search for it.</p>
        <p>Or, leave it blank for a random username!</p>
      </div>
      )}

      {/* Potential Candidates button */}
      <button onClick={goToSavedCandidates}>View Potential Candidates</button>
    </div>
  );
};

export default CandidateSearch;
