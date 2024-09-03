import React from 'react'

const HeaderSearchResult = () => {
    return (
        <div className='HeaderSearchResult'>
            <div className="top">
                <h5>RESULTS</h5>
                <button>View all</button>
            </div>
            {
                new Array(3).fill(1).map((item, index) => (
                    <div className="container" key={index}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYHMKdYQTG3r9YF1Vu1U49QyWGFBXkRKOeAQ&s" alt="" />
                        <div className="detaiils">
                            <p className='mainName'>Starboy</p>
                            <p>{'The Keekenf, Daft Punk'.slice(0,25) + ' ...'}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default HeaderSearchResult