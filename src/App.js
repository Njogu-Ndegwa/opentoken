
import './App.css';
// import Home from './pages/home';
import { useQuery, gql } from '@apollo/client';
const GET_LOCATIONS = gql`
query {
  getAllItems(
    search: "M4001900000501"
    first: 2
    queryorder: DESC
  ) {
page {
  edges {
    node {
        _id
          assetAccount {
            _id
            user {
              contact {
                phone
              }
            }
            credit {
              balance
            }
        }
    }
  }
}
}
}
`;
function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <br/>
      <DisplayLocations />
    </div>
  );
}

function DisplayLocations() {
  const {loading, error, data} = useQuery(GET_LOCATIONS)

  if(loading) return <p>Loading...</p>;
  if(error) {
    console.log(error, "-Error---")
    return <p>Error : {error.message}</p>;
    }

  return data.locations.map(({id, name, description, photo}) => (
    <div key={id}>
      <h3>{name}</h3>
      <img width="400" height="250" alt="location-reference" src={`${photo}`}/>
      <br />
      <b>About this location:</b>
      <p>{description}</p>
      <br />
    </div>
  ))
}

export default App;
