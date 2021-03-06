/*
* Pelion Device Management JavaScript SDK
* Copyright Arm Limited 2017
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import { matchWithWildcard, decodeBase64, dateToBillingMonth } from "../../src/legacy/common/functions";
import { TlvValue } from "../../src/common/tlv";

describe("testFunctions", () => {

    test("nullWildcardString", () => {
        const wildcard = null;
        const match = matchWithWildcard(wildcard, "3/0/0");
        expect(match).toBeTruthy();
    });

    test("undefinedWildcardString", () => {
        const wildcard = undefined;
        const match = matchWithWildcard(wildcard, "3/0/0");
        expect(match).toBeTruthy();
    });

    test("emptyWildcardString", () => {
        const wildcard = "";
        const match = matchWithWildcard(wildcard, "3/0/0");
        expect(match).toBeTruthy();
    });

    test("correctWildcarsString", () => {
        const wildcard = "3/0/0";
        const match = matchWithWildcard(wildcard, "3/0/0");
        expect(match).toBeTruthy();
    });

    test("wildcardString", () => {
        let wildcard = "3/*";
        let match = matchWithWildcard(wildcard, "3/0/0");
        expect(match).toBeTruthy();

        wildcard = "3/0/*";
        match = matchWithWildcard(wildcard, "3/0/0");
        expect(match).toBeTruthy();

        wildcard = "3/0/*";
        match = matchWithWildcard(wildcard, "3/1/0");
        expect(match).toBeFalsy();

        wildcard = "*";
        match = matchWithWildcard(wildcard, "3/1/0");
        expect(match).toBeTruthy();
    });

});

describe("testPayloadDecoding", () => {

    test("string", () => {
        const payload = decodeBase64("dGVzdA==", "text/plain");
        expect(typeof payload).toBe("string");
    });

    test("number", () => {
        const payload = decodeBase64("NQ==", "text/plain");
        expect(typeof payload).toBe("number");
    });

    test("tlv", () => {
        const payload = decodeBase64("AAA=", "tlv") as IterableIterator<TlvValue>;
        const value = payload.next().value as TlvValue;
        expect(value.id).toEqual(0);
        expect(value.value).toEqual([]);
    });
});

describe("testBillingMonth", () => {
    test("singleDigitMonth", () => {
        const date = new Date(2018, 4);
        const string = dateToBillingMonth(date);
        expect(string).toBe("2018-05");
    });

    test("doubleDigitMonth", () => {
        const date = new Date(2018, 11);
        const string = dateToBillingMonth(date);
        expect(string).toBe("2018-12");
    });
});
