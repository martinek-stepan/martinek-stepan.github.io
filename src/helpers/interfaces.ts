
export interface ImageData {
    url: string;
    height?: number;
    caption: string;
}

export interface Project {
    id: string;
    title: string;
    date: string;
    technologies: Array < string > ;
    text: Array < string > ;
    repo: string;
    video: string;
    images: Array < ImageData > ;
}