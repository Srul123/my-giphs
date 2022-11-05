export interface GiphData {
    id: string;
    category: string;
    images: any;
    title: string;
}



export interface SavedQueries {
    [key: string]: GiphData[];
}