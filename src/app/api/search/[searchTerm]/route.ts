// NOTE(hajae): GET /api/search
export const GET = async (request: Request, { params }: { params: { searchTerm: string }}) => {
    try {
        const searchTerm = params.searchTerm;
        const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${searchTerm}`, {
            headers: {
                'Authorization': `Client-ID 35uTnjYzFrY-HrbqXeIQC8n2byaF0PtHxxGFj0e956w`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API request failed: ${errorData.message}`);
        }

        const photos = await response.json();
        return Response.json({ photos });
    } catch (error) {
        console.error('Error in GET /api/search: ', error);
        throw error;
    }
};