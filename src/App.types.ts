export interface DataType {
    [key: string]: {
        results: ResultsInDataType[]
    }
}
export interface ResultsInDataType {
    artist : string ,
    description  : string ,
    id : string ,
    image : {quality : string, url: string}[],
    language : string ,
    songIds : string  ,
    title : string   ,
    type : string  ,
    url : string ,
    year : string ,
}