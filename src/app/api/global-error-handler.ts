
/* https://unsplash.com/documentation#error-messages
 * 200 - OK	Everything worked as expected
 * 400 - Bad Request	The request was unacceptable, often due to missing a required parameter
 * 401 - Unauthorized	Invalid Access Token
 * 403 - Forbidden	Missing permissions to perform request
 * 404 - Not Found	The requested resource doesn’t exist
 * 500, 503	Something went wrong on our end
 */
export const defaultUnsplashErrorHandler = (status: number): string => {
    switch (status) {
        case 400:
            return 'API request failed: Bad Request';
        case 401:
            return 'API request failed: Unauthorized';
        case 403:
            return 'API request failed: Forbidden';
        case 404:
            return 'API request failed: Not Found';
        case 500:
        case 503:
            return 'API request failed: Unsplash Server Error';
        default:
            return 'API request failed'
    }
}