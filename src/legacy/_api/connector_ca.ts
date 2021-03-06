/* tslint:disable:array-type */
/* tslint:disable:no-namespace */
/* tslint:disable:no-string-literal */
/* tslint:disable:max-classes-per-file */
/* tslint:disable:no-trailing-whitespace */

// ===============================================
// This file is autogenerated - Please do not edit
// Tracks base typescript-fetch mustache 01/02/17
// ===============================================

/**
 * Connect CA API
 * mbed Cloud Connect CA API allows services to get device credentials.
 *
 * OpenAPI spec version: 3
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as superagent from "superagent";
import { ApiBase } from "../common/apiBase";
import { SDKError } from "../common/sdkError";

export interface AllServerCredentialsResponseData {
    "bootstrap"?: CredentialsResponseData;
    "lwm2m"?: CredentialsResponseData;
}

export interface CredentialsResponseData {
    /**
     * PEM format X.509 server certificate that will be used to validate the server certificate that will be received during the TLS/DTLS handshake.
     */
    "certificate"?: string;
    /**
     * Server URI to which the client needs to connect to.
     */
    "url"?: string;
}

export interface DeveloperCertificateRequestData {
    /**
     * Description for the developer certificate. There is a limit on the length of the description. Please see [TrustedCertificateReq](/docs/v1.2/api-references/account-management-api.html#trustedcertificatereq)
     */
    "description"?: string;
    /**
     * Name of the developer certificate, must be unique. There is a limit on the length of the name. Please see [TrustedCertificateReq](/docs/v1.2/api-references/account-management-api.html#trustedcertificatereq)
     */
    "name": string;
}

export interface DeveloperCertificateResponseData {
    /**
     * account to which the developer certificate belongs
     */
    "account_id"?: string;
    /**
     * Creation UTC time RFC3339.
     */
    "created_at"?: Date;
    /**
     * Description for the developer certificate.
     */
    "description"?: string;
    /**
     * PEM format X.509 developer certificate.
     */
    "developer_certificate"?: string;
    /**
     * PEM format developer private key associated to the certificate.
     */
    "developer_private_key"?: string;
    /**
     * API resource entity version.
     */
    "etag"?: string;
    /**
     * mUUID that uniquely identifies the developer certificate.
     */
    "id"?: string;
    /**
     * Name of the developer certificate.
     */
    "name"?: string;
    /**
     * Entity name, always 'trusted-cert'
     */
    "object"?: string;
    /**
     * Content of the security.c file that will be flashed into the device to provide the security credentials
     */
    "security_file_content"?: string;
}

export namespace ErrorResponse {
    export type CodeEnum = "400" | "401" | "404";
    export type ObjectEnum = "error";
    export type TypeEnum = "validation_error" | "invalid_token" | "invalid_apikey" | "reauth_required" | "access_denied" | "account_limit_exceeded" | "not_found" | "method_not_supported" | "not_acceptable" | "duplicate" | "precondition_failed" | "unsupported_media_type" | "rate_limit_exceeded" | "internal_server_error" | "system_unavailable";
}
export interface ErrorResponse {
    /**
     * Response code.
     */
    "code"?: ErrorResponse.CodeEnum;
    /**
     * Failed input fields during request object validation.
     */
    "fields"?: Array<Field>;
    /**
     * A human readable message with detailed info.
     */
    "message"?: string;
    /**
     * Entity name, always 'error'.
     */
    "object"?: ErrorResponse.ObjectEnum;
    /**
     * Request ID (muuid).
     */
    "request_id"?: string;
    /**
     * Error type.
     */
    "type"?: ErrorResponse.TypeEnum;
}

export interface Field {
    /**
     * A message describing the error situation.
     */
    "message"?: string;
    /**
     * The name of the erroneous field.
     */
    "name"?: string;
}

export interface ServerCredentialsResponseData {
    /**
     * Creation UTC time RFC3339.
     */
    "created_at"?: Date;
    /**
     * API resource entity version.
     */
    "etag"?: string;
    /**
     * mUUID that uniquely identifies the entity.
     */
    "id"?: string;
    /**
     * Entity name, always 'server-credentials'
     */
    "object"?: string;
    /**
     * PEM format X.509 server certificate that will be used to validate the server certificate that will be received during the TLS/DTLS handshake.
     */
    "server_certificate"?: string;
    /**
     * Server URI to which the client needs to connect to.
     */
    "server_uri"?: string;
}

/**
 * DeveloperCertificateApi
 */
export class DeveloperCertificateApi extends ApiBase {

    /**
     * Create a new developer certificate to connect to the bootstrap server.
     * This REST API is intended to be used by customers to get a developer certificate (a certificate that can be flashed into multiple devices to connect to bootstrap server).  **Note:** The number of developer certificates allowed per account is limited. Please see [Using your own certificate authority](/docs/v1.2/mbed-cloud-deploy/instructions-for-factory-setup-and-device-provision.html#using-your-own-certificate-authority-with-mbed-cloud).  **Example usage:** curl -X POST \&quot;http://api.us-east-1.mbedcloud.com/v3/developer-certificates\&quot; -H \&quot;accept: application/json\&quot; -H \&quot;Authorization: Bearer THE_ACCESS_TOKEN\&quot; -H \&quot;content-type: application/json\&quot; -d \&quot;{ \\\&quot;name\\\&quot;: \\\&quot;THE_CERTIFICATE_NAME\\\&quot;, \\\&quot;description\\\&quot;: \\\&quot;THE_CERTIFICATE_DESCRIPTION\\\&quot;}\&quot;         
     * @param authorization Bearer {Access Token}. 
     * @param body 
     */
    public createDeveloperCertificate(authorization: string, body: DeveloperCertificateRequestData, callback?: (error: any, data?: DeveloperCertificateResponseData, response?: superagent.Response) => any, requestOptions?: { [key: string]: any }): superagent.SuperAgentRequest {
        // verify required parameter "authorization" is set
        if (authorization === null || authorization === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'authorization' missing."));
            }
            return;
        }
        // verify required parameter "body" is set
        if (body === null || body === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'body' missing."));
            }
            return;
        }

        const headerParams: any = {};
        if (authorization !== undefined) {
            headerParams["Authorization"] = authorization;
        }

        const queryParameters: any = {};

        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams: any = {};

        // Determine the Content-Type header
        const contentTypes: Array<string> = [
        ];

        // Determine the Accept header
        const acceptTypes: Array<string> = [
            "application/json",
        ];

        return this.request<DeveloperCertificateResponseData>({
            url: "/v3/developer-certificates",
            method: "POST",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    }
    /**
     * Fetch an existing developer certificate to connect to the bootstrap server.
     * This REST API is intended to be used by customers to fetch an existing developer certificate (a certificate that can be flashed into multiple devices to connect to bootstrap server).  **Example usage:** curl -X GET \&quot;http://api.us-east-1.mbedcloud.com/v3/developer-certificates/THE_CERTIFICATE_ID\&quot; -H \&quot;accept: application/json\&quot; -H \&quot;Authorization: Bearer THE_ACCESS_TOKEN\&quot; 
     * @param developerCertificateId A unique identifier for the developer certificate. 
     * @param authorization Bearer {Access Token}. 
     */
    public getDeveloperCertificate(developerCertificateId: string, authorization: string, callback?: (error: any, data?: DeveloperCertificateResponseData, response?: superagent.Response) => any, requestOptions?: { [key: string]: any }): superagent.SuperAgentRequest {
        // verify required parameter "developerCertificateId" is set
        if (developerCertificateId === null || developerCertificateId === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'developerCertificateId' missing."));
            }
            return;
        }
        // verify required parameter "authorization" is set
        if (authorization === null || authorization === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'authorization' missing."));
            }
            return;
        }

        const headerParams: any = {};
        if (authorization !== undefined) {
            headerParams["Authorization"] = authorization;
        }

        const queryParameters: any = {};

        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams: any = {};

        // Determine the Content-Type header
        const contentTypes: Array<string> = [
        ];

        // Determine the Accept header
        const acceptTypes: Array<string> = [
            "application/json",
        ];

        return this.request<DeveloperCertificateResponseData>({
            url: "/v3/developer-certificates/{developerCertificateId}".replace("{" + "developerCertificateId" + "}", String(developerCertificateId)),
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    }
}
/**
 * ServerCredentialsApi
 */
export class ServerCredentialsApi extends ApiBase {

    /**
     * Fetch all (Bootstrap and LWM2M) server credentials.
     * This REST API is intended to be used by customers to fetch all (Bootstrap and LWM2M) server credentials that they will need to use with their clients to connect to bootstrap or LWM2M server.  **Example usage:** curl -X GET \&quot;http://api.us-east-1.mbedcloud.com/v3/server-credentials\&quot; -H \&quot;accept: application/json\&quot; -H \&quot;Authorization: Bearer THE_ACCESS_TOKEN\&quot;         
     * @param authorization Bearer {Access Token}. 
     */
    public getAllServerCredentials(authorization: string, callback?: (error: any, data?: AllServerCredentialsResponseData, response?: superagent.Response) => any, requestOptions?: { [key: string]: any }): superagent.SuperAgentRequest {
        // verify required parameter "authorization" is set
        if (authorization === null || authorization === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'authorization' missing."));
            }
            return;
        }

        const headerParams: any = {};
        if (authorization !== undefined) {
            headerParams["Authorization"] = authorization;
        }

        const queryParameters: any = {};

        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams: any = {};

        // Determine the Content-Type header
        const contentTypes: Array<string> = [
        ];

        // Determine the Accept header
        const acceptTypes: Array<string> = [
            "application/json",
        ];

        return this.request<AllServerCredentialsResponseData>({
            url: "/v3/server-credentials",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    }
    /**
     * Fetch bootstrap server credentials.
     * This REST API is intended to be used by customers to fetch bootstrap server credentials that they will need to use with their clients to connect to bootstrap server.  **Example usage:** curl -X GET \&quot;http://api.us-east-1.mbedcloud.com/v3/server-credentials/bootstrap\&quot; -H \&quot;accept: application/json\&quot; -H \&quot;Authorization: Bearer THE_ACCESS_TOKEN\&quot; 
     * @param authorization Bearer {Access Token}. 
     */
    public getBootstrapServerCredentials(authorization: string, callback?: (error: any, data?: ServerCredentialsResponseData, response?: superagent.Response) => any, requestOptions?: { [key: string]: any }): superagent.SuperAgentRequest {
        // verify required parameter "authorization" is set
        if (authorization === null || authorization === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'authorization' missing."));
            }
            return;
        }

        const headerParams: any = {};
        if (authorization !== undefined) {
            headerParams["Authorization"] = authorization;
        }

        const queryParameters: any = {};

        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams: any = {};

        // Determine the Content-Type header
        const contentTypes: Array<string> = [
        ];

        // Determine the Accept header
        const acceptTypes: Array<string> = [
            "application/json",
        ];

        return this.request<ServerCredentialsResponseData>({
            url: "/v3/server-credentials/bootstrap",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    }
    /**
     * Fetch LWM2M server credentials.
     * This REST API is intended to be used by customers to fetch LWM2M server credentials that they will need to use with their clients to connect to LWM2M server.  **Example usage:** curl -X GET \&quot;http://api.us-east-1.mbedcloud.com/v3/server-credentials/lwm2m\&quot; -H \&quot;accept: application/json\&quot; -H \&quot;Authorization: Bearer THE_ACCESS_TOKEN\&quot; 
     * @param authorization Bearer {Access Token}. 
     */
    public getL2M2MServerCredentials(authorization: string, callback?: (error: any, data?: ServerCredentialsResponseData, response?: superagent.Response) => any, requestOptions?: { [key: string]: any }): superagent.SuperAgentRequest {
        // verify required parameter "authorization" is set
        if (authorization === null || authorization === undefined) {
            if (callback) {
                callback(new SDKError("Required parameter 'authorization' missing."));
            }
            return;
        }

        const headerParams: any = {};
        if (authorization !== undefined) {
            headerParams["Authorization"] = authorization;
        }

        const queryParameters: any = {};

        // tslint:disable-next-line:prefer-const
        let useFormData = false;
        const formParams: any = {};

        // Determine the Content-Type header
        const contentTypes: Array<string> = [
        ];

        // Determine the Accept header
        const acceptTypes: Array<string> = [
            "application/json",
        ];

        return this.request<ServerCredentialsResponseData>({
            url: "/v3/server-credentials/lwm2m",
            method: "GET",
            headers: headerParams,
            query: queryParameters,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
        }, callback);
    }
}
