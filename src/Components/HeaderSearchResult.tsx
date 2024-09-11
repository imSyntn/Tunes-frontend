import React, { useEffect } from 'react'
import { ResultsInDataType } from '../App.types'
import { useNavigate } from 'react-router-dom'
// import { songIdContext } from '../App';

interface HeaderSearchResultProps {
    headerName: string;
    result: ResultsInDataType[];
    setSearchClicked: React.Dispatch<React.SetStateAction<boolean>>
}

const HeaderSearchResult: React.FC<HeaderSearchResultProps> = ({ headerName, result, setSearchClicked }) => {

    const navigate = useNavigate()

    // useEffect(() => {
    //     // console.log(result)
    // }, [])

    return (
        <>
            {
                (result.length != 0) && (
                    <div className='HeaderSearchResult'>
                        <div className="top">
                            <h5>{headerName.toUpperCase()}</h5>
                            <button>View all</button>
                        </div>
                        {
                            result.map((item:ResultsInDataType) => (
                                <div className="container" key={item.id} onClick={() => {
                                    navigate(`/${item.type}/${item.id}`);
                                    setSearchClicked(false)
                                }}>
                                    <img src={item?.image?.[0].url || 'https://images5.alphacoders.com/349/thumb-1920-349108.jpg'} alt="" />
                                    <div className="detaiils">
                                        <p className='mainName'>{item.title}</p>
                                        <p>{(item.description && item.description.length > 25) ? item.description.slice(0, 25) + ' ...' : item.description}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}

export default HeaderSearchResult