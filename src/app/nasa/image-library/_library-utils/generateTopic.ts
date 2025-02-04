export const generateRandomTopic = (): string => {
    const topics = [
        "neil armstrong",
        "apollo",
        "space shuttle",
        "artemis",
        "voyager",
        "pluto",
        "supernova",
    ];

    return topics[Math.floor(Math.random() * topics.length)];
}
