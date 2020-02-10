export class JWTValidatorOpts {
    algorithm: string;
    publicCertPath: string;
    publicCertUrl: string;

    constructor(opts: any = {}) {
        this.algorithm = opts.algorithm || "RS256";
        this.publicCertPath = opts.publicCertPath;
        this.publicCertUrl = opts.publicCertUrl;
    }
}