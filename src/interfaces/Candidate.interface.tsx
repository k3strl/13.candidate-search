import { createContext } from 'react';

// DONE?: Create an interface for the Candidate objects returned by the API

export interface CandidateInterface {
    id: string; // unique identifier
    name: string; // candidate's name
    avatar_url: string; // URL to the candidate's avatar
    bio: string; // Candidate's bio
    location: string; // Candidate's location
    public_repos: string; // # of public repos
    company: string;
    login: string;
    email: string;
    html_url: string;
}

const CandidateContext = createContext<CandidateInterface | null>( {} as CandidateInterface);

export default CandidateContext;