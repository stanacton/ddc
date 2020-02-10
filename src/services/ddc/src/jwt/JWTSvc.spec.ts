import { expect } from 'chai';
import 'mocha';
import * as fs from 'fs';
import {JWTValidatorImpl} from "./JWTSvc";
import {JWTValidatorOpts} from "./JWTValidatorOpts";


describe("JWTSvc", () => {
    let svc : JWTValidatorImpl;
    before(() => {
        const opts = new JWTValidatorOpts();
        opts.publicCertPath = "./test/ecdsa-public.pem";
        opts.algorithm = 'ES256';
        svc = new JWTValidatorImpl(opts);
    });

    describe("verify", () => {
        let token : string;
        before(() => {
            token = fs.readFileSync("./test/test_jwt.txt", "utf-8");
        });
        it("should be true if the signature is valid", async () => {
            let result = await svc.verify(token);
            expect(result).to.not.be.empty;
        });
        it("should be false if the signature is not valid", async () => {
            const opts = new JWTValidatorOpts();
            opts.publicCertPath = "./test/ecdsa-public2.pem";
            opts.algorithm = 'ES256';
            const svc2 = new JWTValidatorImpl(opts);

            let error = false;
            try {
                await svc2.verify(token);
            } catch (e) {
                error = true;
            }
            expect(error).to.be.true;
        });
    });
});