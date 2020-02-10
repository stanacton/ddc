export interface JWTValidator {
    verify(token: string): Promise<any>;
}