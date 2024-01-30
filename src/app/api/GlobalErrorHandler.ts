import { Enums } from "@/enums/enums";

/* https://unsplash.com/documentation#error-messages
 * 200 - OK	Everything worked as expected
 * 400 - Bad Request	The request was unacceptable, often due to missing a required parameter
 * 401 - Unauthorized	Invalid Access Token
 * 403 - Forbidden	Missing permissions to perform request
 * 404 - Not Found	The requested resource doesn’t exist
 * 500, 503	Something went wrong on our end
 */
export const defaultUnsplashErrorHandler = (status: number): string => {
    const errorStatus = status.toString();
    
    switch (errorStatus) {
        case Enums.UnsplashError.BadRequest.code:
            return Enums.UnsplashError.BadRequest.message;
        case Enums.UnsplashError.Unauthorized.code:
            return Enums.UnsplashError.Unauthorized.message;
        case Enums.UnsplashError.Forbidden.code:
            return Enums.UnsplashError.Forbidden.message;
        case Enums.UnsplashError.NotFound.code:
            return Enums.UnsplashError.NotFound.message;
        case Enums.UnsplashError.UnsplashServerError1.code:
        case Enums.UnsplashError.UnsplashServerError2.code:
            return Enums.UnsplashError.UnsplashServerError1.message;
        default:
            return Enums.UnsplashError.Other.message;
    }
}