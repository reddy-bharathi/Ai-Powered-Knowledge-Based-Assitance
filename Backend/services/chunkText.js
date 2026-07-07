export const chunkText = (
    text,
    chunkSize = 800,
    overlap = 100
) => {

    const cleaned = text
        .replace(/\r/g, "")
        .replace(/\n+/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const chunks = [];

    let start = 0;

    while (start < cleaned.length) {

        let end = start + chunkSize;

        if (end > cleaned.length) {
            end = cleaned.length;
        }

        chunks.push(cleaned.substring(start, end));

        start += chunkSize - overlap;
    }

    return chunks;
};