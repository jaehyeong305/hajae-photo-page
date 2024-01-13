import { defaultUnsplashErrorHandler } from "@/app/api/global-error-handler";

// NOTE(hajae): GET /api/photos/:id
export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const photoId = params.id;
        const response = await fetch(`https://api.unsplash.com/photos/${photoId}`, {
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
            console.error('Error in GET /api/photos/:id : ', error.message);
        }
        throw error;
    }
};