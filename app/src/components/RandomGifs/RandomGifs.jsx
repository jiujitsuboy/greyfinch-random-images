import React, { useCallback, useEffect, useState } from 'react';
import classes from './RandomGifs.module.css'
import GetRandomByCategory from '../Queries/GetRandomByCategory/GetRandomByCategory';
import getTotalRecordsCount from '../Queries/GetTotalRecordsCount';
import { useClient } from 'urql';

const RandomGifs = () => {

    let timer
    const numberOfImages = 50
    const initialData = {
        amount: 0,
        limit: 0,
        firstId: 0,
        lastId: 0
    }

    const client = useClient();
    const [randomData, setRandomData] = useState(initialData)
    const [category, setCategory] = useState("")

    const getRandomGifsByCategory = (event) => {
        setCategory(event.target.value)
    }

    const getRandomGifsByText = (event) => {
        clearTimeout(timer)
        timer = setTimeout(() => setCategory(event.target.value ? `%${event.target.value}%` : ''), 500)
    }

    const getRandomValues = async () => {

        const totalAmountGifsResp = await getTotalRecordsCount(client, category)

        if (totalAmountGifsResp && totalAmountGifsResp.data) {
            const amount = totalAmountGifsResp.data.gifs_aggregate.aggregate.count
            const limit = (parseInt(1 + (Math.random() * numberOfImages)))
            const size = (parseInt(1 + (Math.random() * amount / 2)))
            const firstId = 1 + size
            const lastId = amount - size

            setRandomData({
                amount,
                limit,
                firstId,
                lastId
            })

        }
    }

    useCallback(getRandomGifsByCategory, [])
    useCallback(getRandomGifsByText, [])

    useEffect(() => {
        if (category) {
            getRandomValues()
        }
    }, [category])

    return (
        <div className={classes.container}>
            <div className={classes.filter}>
                <div className={classes.select_dropdown}>
                    <label htmlFor='categotyFilter'>Category</label>
                    <select className={classes.select_dropdown_select} id='categoryList' size='5' onChange={(event) => getRandomGifsByCategory(event)} >
                        <option value='cat'>cat</option>
                        <option value='dog'>dog</option>
                        <option value='elephant'>elephant</option>
                        <option value='lion'>lion</option>
                        <option value='monkey'>monkey</option>
                    </select>
                </div>
                <div className={classes.select_filter}>
                    <label htmlFor='categotyFilter'>Category</label>
                    <input type='text' id='categotyFilter' placeholder='write a category...' size='50' onChange={(event) => getRandomGifsByText(event)}></input>
                </div>
            </div>
            <GetRandomByCategory category={category} randomData={randomData} />
        </div>
    );
};

export default RandomGifs;