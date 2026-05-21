function download(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Downloading ${url} ...`);
            resolve(url);
        }, 1000);
    });
}

function processFile(url) {
    console.log(`Processing file from ${url}`);
}

async function main() {
    try {
        let url = "https://images.pexels.com/photos/133472/pexels-photo-133472.jpeg";

        const downloadedPicture = await download(url);

        processFile(downloadedPicture);

    } catch (error) {
        console.log(`Error: ${error}`);
    } finally {
        console.log("Operation complete.");
    }
}

main();
