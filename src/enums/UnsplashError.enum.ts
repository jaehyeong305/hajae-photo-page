import { EnumBase, EnumDef } from "@/enums/EnumBase";

const UnsplashErrorCode = {
    BadRequest: '400',
    Unauthorized: '401',
    Forbidden: '403',
    NotFound: '404',
    UnsplashServerError1: '500',
    UnsplashServerError2: '503',
    Other: '0'
} as const;
type UnsplashErrorCode = typeof UnsplashErrorCode[keyof typeof UnsplashErrorCode];

const UnsplashErrorName = {
    BadRequest: 'Bad Request',
    Unauthorized: 'Unauthorized',
    Forbidden: 'Forbidden',
    NotFound: 'Not Found',
    UnsplashServerError1: 'Unsplash Server Error',
    UnsplashServerError2: 'Unsplash Server Error',
    Other: 'Other'
} as const;
type UnsplashErrorName = typeof UnsplashErrorName[keyof typeof UnsplashErrorName];

const UnsplashErrorMessage = {
    BadRequest: 'API request failed: Bad Request',
    Unauthorized: 'API request failed: Unauthorized',
    Forbidden: 'API request failed: Forbidden',
    NotFound: 'API request failed: Not Found',
    UnsplashServerError1: 'API request failed: Unsplash Server Error',
    UnsplashServerError2: 'API request failed: Unsplash Server Error',
    Other: 'API request failed',
} as const;
type UnsplashErrorMessage = typeof UnsplashErrorMessage[keyof typeof UnsplashErrorMessage];

export type UnsplashErrorEnumDef = EnumDef & {
    code: UnsplashErrorCode,
    name: UnsplashErrorName,
    message: UnsplashErrorMessage,
}

export class UnsplashError extends EnumBase<UnsplashErrorEnumDef> {
    BadRequest = {
        code: UnsplashErrorCode.BadRequest,
        name: UnsplashErrorName.BadRequest,
        message: UnsplashErrorMessage.BadRequest,
    };

    Unauthorized = {
        code: UnsplashErrorCode.Unauthorized,
        name: UnsplashErrorName.Unauthorized,
        message: UnsplashErrorMessage.Unauthorized,
    };

    Forbidden = {
        code: UnsplashErrorCode.Forbidden,
        name: UnsplashErrorName.Forbidden,
        message: UnsplashErrorMessage.Forbidden,
    };

    NotFound = {
        code: UnsplashErrorCode.NotFound,
        name: UnsplashErrorName.NotFound,
        message: UnsplashErrorMessage.NotFound,
    };

    UnsplashServerError1 = {
        code: UnsplashErrorCode.UnsplashServerError1,
        name: UnsplashErrorName.UnsplashServerError1,
        message: UnsplashErrorMessage.UnsplashServerError1,
    };

    UnsplashServerError2 = {
        code: UnsplashErrorCode.UnsplashServerError2,
        name: UnsplashErrorName.UnsplashServerError2,
        message: UnsplashErrorMessage.UnsplashServerError2,
    };

    Other = {
        code: UnsplashErrorCode.Other,
        name: UnsplashErrorName.Other,
        message: UnsplashErrorMessage.Other,
    };

    values = [this.BadRequest, this.Unauthorized, this.Forbidden, this.NotFound, this.UnsplashServerError1, this.UnsplashServerError2, this.Other];
}