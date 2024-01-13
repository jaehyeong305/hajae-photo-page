import { defaultUnsplashErrorHandler } from "@/app/api/global-error-handler";

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
            throw new Error(defaultUnsplashErrorHandler(errorData.status));
        }

        const photos = await response.json();
        return Response.json({ photos });
    } catch (error: any) {
        if (error instanceof Error) {
            console.error('Error in GET /api/search: ', error.message);
        } 
        throw error;
    }
};