import React from 'react'

const Artists = ({ data }: any) => {
    return (
        <div className="artists">
            {
                data?.artists?.primary?.map((item: any) => (
                    <div className="artistCont" key={item.id}>
                        <img src={item?.image?.[1]?.url || 'https://images5.alphacoders.com/349/thumb-1920-349108.jpg'} alt="" />
                        <p>{item.name}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Artists