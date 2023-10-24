import { gql } from 'urql';
const getTotalRecordsCount = async (client, category) => {

  const query = gql`
        query($category: String!){
          gifs_aggregate(where: {category: {_ilike: $category}}) {
            aggregate{
              count
            }
          }
        } 
    `

  const result = await client
    .query(query, {
      category
    })
    .toPromise()

  return result
}



export default getTotalRecordsCount;