import React from 'react'

const SongCard = ({ result }: any) => {
    return (
        <div className='SongCard'>
            <h3><svg
    fill="#ffffff"
    width="256px"
    height="256px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="icon flat-line"
  >
    <g strokeWidth="0"></g>
    <g strokeLinecap="round" strokeLinejoin="round"></g>
    <g>
      <circle
        cx="9.5"
        cy="17.5"
        r="3.5"
        style={{ fill: "#fafafa", strokeWidth: 2 }}
      ></circle>
      <path
        d="M13,17.5V3a25.84,25.84,0,0,0,3.44,3c1.66,1.07,1.91,2.76,1.15,5"
        style={{
          fill: "none",
          stroke: "#14ff92",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
        }}
      ></path>
      <circle
        cx="9.5"
        cy="17.5"
        r="3.5"
        style={{
          fill: "none",
          stroke: "red",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
        }}
      ></circle>
    </g>
  </svg>{result.name}</h3>
            <p>
                {
                    result.artists.primary.reduce((str: string, acc: any) => str + ' ' + acc.name + ',', '')
                }
            </p>
            <p>{(result.duration/60).toFixed(2)}</p>
        </div>
    )
}

export default SongCard