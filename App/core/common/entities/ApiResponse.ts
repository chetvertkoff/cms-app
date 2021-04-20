export class ApiResponse<Data> {

    public readonly code: number
    public readonly message: string
    private readonly data?: Data|undefined
    private readonly timestamp: number

    constructor(code: number, message: string, data?: Data) {
        this.code = code
        this.message = message
        this.data = data
        this.timestamp = Date.now()
    }

    public static success<Data>(data: Data): ApiResponse<Data> {
        const code = 200;
        const message = 'Success'
        return new ApiResponse<Data>(code, message, data)
    }

    public static error<Data>(code: number, message: string): ApiResponse<Data> {
        return new ApiResponse<Data>(code ?? 500, message ?? 'Internal error')
    }
}