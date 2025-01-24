export interface NasaImageData {
    center: string;
    date_created: string;
    description: string;
    keywords: string[];
    location: string;
    media_type: string;
    nasa_id: string;
    photographer?: string;
    secondary_creator?: string;
    title: string;
}

export interface NasaImageLink {
    href: string;
    rel: string;
    render: string;
    width?: number;
    height?: number;
    size?: number;
}

export interface NasaItem {
    href: string;
    data: NasaImageData[];
    keywords: string[];
    links?: NasaImageLink[];
}

export interface NasaCollection {
    version: string;
    href: string;
    items: NasaItem[];
}

export interface NasaApiResponse {
    collection: NasaCollection;
}
