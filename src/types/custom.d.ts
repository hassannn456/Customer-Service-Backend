export type User = {
    id: number,
    username?: string,
    name?: string,
    roles: string[],
    type?: string,
    internalNote?: string
}