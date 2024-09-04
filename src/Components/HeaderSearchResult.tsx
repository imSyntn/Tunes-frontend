import React, { useEffect } from 'react'
import { ResultsInDataType } from '../App.types'

interface HeaderSearchResultProps {
    headerName: string;
    result: ResultsInDataType[];
}

const HeaderSearchResult: React.FC<HeaderSearchResultProps> = ({ headerName, result }) => {

    useEffect(() => {
        // console.log(result)
    }, [])

    return (
        <div className='HeaderSearchResult'>
            <div className="top">
                <h5>{headerName.toUpperCase()}</h5>
                <button>View all</button>
            </div>
            {
                result.map((item, index) => (
                    <div className="container" key={index}>
                        <img src={item.image[0].url} alt="" />
                        <div className="detaiils">
                            <p className='mainName'>{item.title}</p>
                            <p>{(item.description.length > 25) ? item.description.slice(0, 25) + ' ...' : item.description}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default HeaderSearchResult