import { TRPC_ERROR_CODE_KEY, TRPCError } from "@trpc/server";

export function createTrpcErrorResponse(code: TRPC_ERROR_CODE_KEY, message: string) {
    return new TRPCError({
        code: code,
        message: message,
    })
}

export function createTrpcSuccessResponse(code: number, message: string, data?: object) {
    return {
        code: code,
        message: message,
        data: data
    }
}
