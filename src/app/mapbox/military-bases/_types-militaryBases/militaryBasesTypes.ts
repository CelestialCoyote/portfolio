export type ZipHoverInfo = {
    longitude: number;
    latitude: number;
    ID?: string;
    ZCTA?: string;
    mha_name?: string;
    mha?: string;
} | null;

type BahData = {
    [key: string]: [number | "NULL", number | "NULL"]; // Each pay grade has an array of two values
}

export type ZipClickedInfo = {
    ZCTA?: string;
    mha_name?: string;
    mha?: string;
    bah?: BahData[];
} | null;

export type MHAData = {
    mha: string;
    mha_name: string;
    bah?: BahData[];
    zip_codes: string[];
}[];
