export const getBase64 = (file: File, callback: Function) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        callback(reader.result);
    };
};

export function readFileAsync(file: File): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result?.toString());
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
}

export function getFileFromUrl(url: string, fileName: string) {
    fetch(url).then(async (response) => {
        const contentType = response.headers.get('content-type');
        const blob = await response.blob();
        const file = new File([blob], fileName, {
            type: blob.type,
        });
        // access file here
    });
}
