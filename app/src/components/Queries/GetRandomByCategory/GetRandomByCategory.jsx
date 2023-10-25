import React, { useEffect } from 'react';
import { gql, useQuery } from 'urql';
import Gif from '../../Gif/Gif';
import classes from './GetRandomByCategory.module.css'
import LoadingSpinner from '../../UI/LoagingSpinner/LoadingSpinner';
import EmptyResult from '../../UI/EmptyResult/EmptyResult';
import ErrorResult from '../../UI/ErrorResult/ErrorResult';

const GetRandomByCategory = ({ category, randomData }) => {


  const { amount, limit, firstId, lastId } = randomData

  let query = gql`
      query($category: String!, $firstId: Int!, $lastId: Int!, $amount: Int!){
          gifs(where: {category: {_ilike: $category}, _and: {id:{_gte:$firstId } _and:{id:{_lte:$lastId}}}}, limit:$amount) {
              id
              url
              category
            }
      }    
  `

  if (!category || limit === 0) {
    return <EmptyResult category={category} />
  }
  let [result] = useQuery({
    query,
    variables: {
      category,
      firstId,
      lastId,
      amount: limit
    }
  });

  let { data, fetching, error } = result;

  //loading
  if (fetching) return <LoadingSpinner />
  //Error
  if (error) return <ErrorResult error={error} />;

  const dataLength = data.gifs.length
  //Empty result
  if (dataLength == 0) return <EmptyResult category={category} />

  const categorySet = new Set()
  data.gifs.forEach(gift => categorySet.add(gift.category))


  const categoryCaption = [...categorySet].map(category => category.charAt(0).toUpperCase() + category.slice(1)).join("-")

  return <div className={classes.container}>
    <div className={classes.summary}>
      <span className={classes.summary_bold}>{categoryCaption}:</span> {dataLength}
    </div>
    <span className={classes.canvan}>
      {data.gifs.map(gif => <Gif key={gif.id} url={gif.url} category={category} />)}
    </span>
  </div>
}


export default React.memo(GetRandomByCategory);