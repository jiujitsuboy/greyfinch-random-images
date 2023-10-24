import { createClient, gql, Provider, useQuery } from 'urql';
import RandomGifs from './components/RandomGifs/RandomGifs';
import MainLabel from './components/MainLabel/MainLabel';

let client = createClient({
  url: 'http://localhost:8080/v1/graphql',
});

function App() {
  return <>
    <MainLabel />
    <Provider value={client}>
      <RandomGifs />
    </Provider>
  </>
}

export default App