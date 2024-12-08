// TODO: Create an interface for the Candidate objects returned by the API




export interface CandidateInterface {
    id: string, // unique identifier
    name: string, // candidate's name
    avatar_url: string, // URL to the candidate's avatar
    bio: string, // Candidate's bio
    location: string, // Candidate's location
    public_repos: string, // # of public repos

}