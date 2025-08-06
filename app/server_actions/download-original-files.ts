
export const getDownloadOriginalFiles = async (id: number, token: string) => {
    const response = await fetch(`/api/proxy/download-original-files?id=${id}&token=${token}`);
    return {
        status: response.status,
        data: response,
    };
}
