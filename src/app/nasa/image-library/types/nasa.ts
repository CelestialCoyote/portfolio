export type NasaItem = {
    data: {
        center?: string;
        date_created: string;
        description: string;
        keywords?: string[];
        location?: string;
        media_type: string;
        nasa_id: string;
        photographer?: string;
        secondary_creator?: string;
        title: string;
    }[];
    links: {
        href: string;
        rel: string;
        render: string;
    }[];
}

export type NasaApiResponse = {
    collection: {
        items: NasaItem[];
    };
}