import { createClient, gql, Provider, useQuery } from 'urql';

let client = createClient({
  url: 'http://localhost:8080/v1/graphql',
});

function App() {
  return (
    <Provider value={client}>
      <div style={{ margin: 24 }}>
        <SampleQuery />
      </div>
    </Provider>
  )
}

export default App

let query = gql`
{
  gifs_aggregate(where: {category: { _eq: "dog" }}) {
    aggregate {
      count
    }
  }
}
`
function SampleQuery() {
  let [result, reexecuteQuery] = useQuery({
    query,
  });

  let { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div>
      This is a sample query on how to connect to GraphQL.
      There are {data.gifs_aggregate.aggregate.count} dogs.
    </div>
  );
}