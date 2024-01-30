import { defaultUnsplashErrorHandler } from "@/app/api/GlobalErrorHandler";

// NOTE(hajae): GET /api/unsplash
export const GET = async (request: Request, { params }: { params: { page: string } }) => {
    try {
        const page = params.page;
        const response = await fetch(`https://api.unsplash.com/photos?per_page=20&page=${page}`, {
            headers: {
                'Authorization': `Client-ID ${process.env.NEXT_PUBLIC_API_CLIENT_ID}`,
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
            console.error('Error in GET /api/unsplash: ', error.message);
        }
        throw error;
    }
};