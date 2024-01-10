// NOTE(hajae): GET /api/unsplash
export const GET = async (request: Request, { params }: { params: { page: string }}) => {
    try {
        const page = params.page;
        const response = await fetch(`https://api.unsplash.com/photos?per_page=20&page=${page}`, {
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
        console.error('Error in GET /api/unsplash: ', error);
        throw error;
    }
};