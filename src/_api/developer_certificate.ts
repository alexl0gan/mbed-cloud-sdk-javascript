/**
 * Provisioning endpoints - developer certificates.
 * A developer certificate is used during development to allow quick association of the device with the mbed Cloud account of the developer. It is used instead of the Factory Tool.  The developer should generate a key-pair (NIST P-256 Elliptic Curve), add the public key to the mbed Cloud account using these APIs, and use the private key on the device (typically in a file named identity_dev_security.c). This creates an association between the device and the cloud.  Only one developer certificate per account is allowed.  As an example, a developer certificate can be created using OpenSSL as follows:  ``` openssl ecparam -out key.pem -name prime256v1 -genkey openssl ec -text -in key.pem -pubout ```  The output is:  ``` read EC key Private-Key: (256 bit) priv:     4e:50:25:1c:c0:70:29:05:dc:1d:7b:58:ba:a1:27:     c3:6f:aa:92:22:ca:0f:f1:af:74:cb:15:a4:cb:36:     98:3f pub:     04:35:54:40:80:f8:fb:45:ad:8a:fc:1a:9e:8c:88:     58:fa:84:91:ca:51:d2:09:d5:7b:35:9f:72:10:31:     a2:7c:d6:18:8b:49:d9:56:91:f0:99:b7:a9:a0:c6:     c1:5b:b8:d3:24:a8:cd:0c:76:9f:f0:c8:41:b0:a3:     dd:d3:2c:88:e1 ASN1 OID: prime256v1 NIST CURVE: P-256 writing EC key -----BEGIN PUBLIC KEY----- MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAENVRAgPj7Ra2K/BqejIhY+oSRylHS CdV7NZ9yEDGifNYYi0nZVpHwmbepoMbBW7jTJKjNDHaf8MhBsKPd0yyI4Q== -----END PUBLIC KEY----- ```  The bytes under \"priv\" are the 32 private key bytes. They should be placed on the device (in the identity_dev_security.c file), as a byte array.  The text starting with \"BEGIN PUBLIC KEY\" is the public key in PEM format, which should be uploaded using the POST API.  Another example, using Python:  ``` from ecdsa import SigningKey, NIST256p private_key = SigningKey.generate(curve=NIST256p) public_key = private_key.get_verifying_key() print \"Public key:\" print public_key.to_pem() bytes = bytearray(private_key.to_string()) for byte in bytes:   print hex(byte) + \",\", ``` 
 *
 * OpenAPI spec version: 0.8
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
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

import superagent = require('superagent');

let defaultBasePath = 'https://api.mbedcloud.com';

// ===============================================
// This file is autogenerated - Please do not edit
// ===============================================

/* tslint:disable:no-unused-variable */

export interface RequestOptions {
    auth?:{username?:string, password?:string};
    form?:any;
    formData?:any;
    method?:string;
    qs?:any;
    headers?:any;
    uri?:string;
    useQuerystring?: boolean;
    json?: boolean;
    encoding?: string | null;
    body?:any;
}

export function request(options:any, callback?:Function): superagent.SuperAgentRequest {
    var url = options.uri;
    var request = superagent(options.method, url);

    if (options.auth && (options.auth.username || options.auth.password)) {
        request.auth(options.auth.username || '', options.auth.password || '');
    }

    // set query parameters
    request.query(normalizeParams(options.qs));

    // set header parameters
    request.set(normalizeParams(options.headers));

    // set request timeout
    request.timeout(60000);

    if (options.json) {
        request.type("application/json");
        request.accept("application/json");
    }

    if (options.form) {
        request.type("application/x-www-form-urlencoded");
        request.send(normalizeParams(options.form));
    } else if (options.formData) {
        request.type("multipart/form-data");
        var formParams = normalizeParams(options.formData);
        for (var key in formParams) {
            if (formParams.hasOwnProperty(key)) {
                if (isFileParam(formParams[key])) {
                    // file field
                    request.attach(key, formParams[key]);
                } else {
                    request.field(key, formParams[key]);
                }
            }
        }
    } else if (options.body) {
        request.send(options.body);
    }

    request.end(function(error, response) {
        if (callback) {
            var data = null;

            if (response && !error) {
                data = response.body || response.text;
            }

            callback(error, data, response);
        }
    });

    return request;
}

/**
* Normalizes parameter values:
* <ul>
* <li>remove nils</li>
* <li>keep files and arrays</li>
* <li>format to string with `paramToString` for other cases</li>
* </ul>
* @param {Object.<String, Object>} params The parameters as object properties.
* @returns {Object.<String, Object>} normalized parameters.
*/
export function normalizeParams(params:any) {
    var newParams = {};

    for (var key in params) {
        if (params.hasOwnProperty(key) && params[key] != undefined && params[key] != null) {
            var value = params[key];
            if (isFileParam(value) || Array.isArray(value)) {
                newParams[key] = value;
            } else {
                newParams[key] = paramToString(value);
            }
        }
    }

    return newParams;
}

/**
* Checks whether the given parameter value represents file-like content.
* @param param The parameter to check.
* @returns {Boolean} <code>true</code> if <code>param</code> represents a file.
*/
export function isFileParam(param:any) {
    // fs.ReadStream in Node.js (but not in runtime like browserify)
    if (typeof window === 'undefined' &&
        typeof require === 'function' &&
        require('fs') &&
        param instanceof require('fs').ReadStream) {
        return true;
    }

    // Buffer in Node.js
    if (typeof Buffer === 'function' && param instanceof Buffer) {
        return true;
    }

    // Blob in browser
    if (typeof Blob === 'function' && param instanceof Blob) {
        return true;
    }

    // File in browser (it seems File object is also instance of Blob, but keep this for safe)
    if (typeof File === 'function' && param instanceof File) {
        return true;
    }

    return false;
}

/**
* Returns a string representation for an actual parameter.
* @param param The actual parameter.
* @returns {String} The string representation of <code>param</code>.
*/
export function paramToString(param:any) {
    if (param == undefined || param == null) {
        return '';
    }

    if (param instanceof Date) {
        return param.toJSON();
    }

    return param.toString();
}

export class Body {
    /**
    * The developer certificate public key in PEM format (NIST P-256 curve).
    */
    'pubKey': string;
}

export class DeveloperCertificate {
    /**
    * UTC time of the entity creation.
    */
    'createdAt': string;
    /**
    * Currently not used.
    */
    'etag': string;
    /**
    * The developer certificate public key in raw format (65 bytes), Base64 encoded, NIST P-256 curve.
    */
    'pubKey': string;
    /**
    * Currently not used.
    */
    'object': string;
    /**
    * Entity ID.
    */
    'id': string;
}


export interface Authentication {
    /**
    * Apply authentication settings to header and query params.
    */
    applyToRequest(requestOptions: RequestOptions): void;
}

export class HttpBasicAuth implements Authentication {
    public username: string;
    public password: string;
    applyToRequest(requestOptions: RequestOptions): void {
        requestOptions.auth = {
            username: this.username, password: this.password
        }
    }
}

export class OAuth implements Authentication {
    public accessToken: string;

    applyToRequest(requestOptions: RequestOptions): void {
        if (requestOptions && requestOptions.headers) {
            requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
        }
    }
}

export class ApiKeyAuth implements Authentication {
    public apiKey: string;

    constructor(private location: string, private paramName: string) {
    }

    applyToRequest(requestOptions: RequestOptions): void {
        if (this.location == "query") {
            (<any>requestOptions.qs)[this.paramName] = this.apiKey;
        } else if (this.location == "header" && requestOptions && requestOptions.headers) {
            requestOptions.headers[this.paramName] = this.apiKey;
        }
    }
}

export class VoidAuth implements Authentication {
    public username: string;
    public password: string;
    applyToRequest(_: RequestOptions): void {
        // Do nothing
    }
}

export enum DefaultApiApiKeys {
    Bearer,
}

export class DefaultApi {
    protected basePath = defaultBasePath;
    protected defaultHeaders : any = {};
    protected _useQuerystring : boolean = false;

    protected authentications = {
        'default': <Authentication>new VoidAuth(),
        'Bearer': new ApiKeyAuth('header', 'Authorization'),
    }

    constructor(basePath?: string);
    constructor(basePathOrUsername: string, password?: string, basePath?: string) {
        if (password) {
            if (basePath) {
                this.basePath = basePath;
            }
        } else {
            if (basePathOrUsername) {
                this.basePath = basePathOrUsername
            }
        }
    }

    set useQuerystring(value: boolean) {
        this._useQuerystring = value;
    }

    public setApiKey(key: DefaultApiApiKeys, value: string) {
        this.authentications[DefaultApiApiKeys[key]].apiKey = value;
    }
    private extendObj<T1,T2>(objA: T1, objB: T2) {
        for(let key in objB){
            if(objB.hasOwnProperty(key)){
                objA[key] = objB[key];
            }
        }
        return <T1&T2>objA;
    }
    /**
     * 
     * Deletes the account&#39;s developer certificate (only one per account allowed).
     * @param authorization \&quot;Bearer\&quot; followed by the reference token or API key.
     */
    public v3DeveloperCertificateDelete (authorization: string, callback?: Function): superagent.SuperAgentRequest {
        const localVarPath = this.basePath + '/v3/developer-certificate';
        let queryParameters: any = {};
        let headerParams: any = this.extendObj({}, this.defaultHeaders);
        let formParams: any = {};


        // verify required parameter 'authorization' is not null or undefined
        if (authorization === null || authorization === undefined) {
            throw new Error('Required parameter authorization was null or undefined when calling v3DeveloperCertificateDelete.');
        }

        headerParams['Authorization'] = authorization;

        let useFormData = false;

        let requestOptions: RequestOptions = {
            method: 'DELETE',
            qs: queryParameters,
            headers: headerParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };

        this.authentications.Bearer.applyToRequest(requestOptions);
        this.authentications.default.applyToRequest(requestOptions);

        if (Object.keys(formParams).length) {
            if (useFormData) {
                (<any>requestOptions).formData = formParams;
            } else {
                requestOptions.form = formParams;
            }
        }

        return request(requestOptions, (error, data, response) => {
            if (callback) {
                callback(error, data, response);
            }
        });
    }
    /**
     * 
     * Gets the developer certificate of the account.
     * @param authorization \&quot;Bearer\&quot; followed by the reference token or API key.
     */
    public v3DeveloperCertificateGet (authorization: string, callback?: Function): superagent.SuperAgentRequest {
        const localVarPath = this.basePath + '/v3/developer-certificate';
        let queryParameters: any = {};
        let headerParams: any = this.extendObj({}, this.defaultHeaders);
        let formParams: any = {};


        // verify required parameter 'authorization' is not null or undefined
        if (authorization === null || authorization === undefined) {
            throw new Error('Required parameter authorization was null or undefined when calling v3DeveloperCertificateGet.');
        }

        headerParams['Authorization'] = authorization;

        let useFormData = false;

        let requestOptions: RequestOptions = {
            method: 'GET',
            qs: queryParameters,
            headers: headerParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };

        this.authentications.Bearer.applyToRequest(requestOptions);
        this.authentications.default.applyToRequest(requestOptions);

        if (Object.keys(formParams).length) {
            if (useFormData) {
                (<any>requestOptions).formData = formParams;
            } else {
                requestOptions.form = formParams;
            }
        }

        return request(requestOptions, (error, data, response) => {
            if (callback) {
                callback(error, data, response);
            }
        });
    }
    /**
     * 
     * Adds a developer certificate to the account (only one per account allowed).
     * @param authorization \&quot;Bearer\&quot; followed by the reference token or API key.
     * @param body 
     */
    public v3DeveloperCertificatePost (authorization: string, body: Body, callback?: Function): superagent.SuperAgentRequest {
        const localVarPath = this.basePath + '/v3/developer-certificate';
        let queryParameters: any = {};
        let headerParams: any = this.extendObj({}, this.defaultHeaders);
        let formParams: any = {};


        // verify required parameter 'authorization' is not null or undefined
        if (authorization === null || authorization === undefined) {
            throw new Error('Required parameter authorization was null or undefined when calling v3DeveloperCertificatePost.');
        }

        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling v3DeveloperCertificatePost.');
        }

        headerParams['Authorization'] = authorization;

        let useFormData = false;

        let requestOptions: RequestOptions = {
            method: 'POST',
            qs: queryParameters,
            headers: headerParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: body,
        };

        this.authentications.Bearer.applyToRequest(requestOptions);
        this.authentications.default.applyToRequest(requestOptions);

        if (Object.keys(formParams).length) {
            if (useFormData) {
                (<any>requestOptions).formData = formParams;
            } else {
                requestOptions.form = formParams;
            }
        }

        return request(requestOptions, (error, data, response) => {
            if (callback) {
                callback(error, data, response);
            }
        });
    }
}
