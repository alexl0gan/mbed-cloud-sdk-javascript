/**
 * Provisioning endpoints - the factory provisioning package.
 * The factory provisioning package needs to be installed in factories to enroll devices onto the mbed Cloud ecosystem.  These APIs allow downloading the most recent version of the factory provisioning package for various operating systems. 
 *
 * OpenAPI spec version: 0.8
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

// ===============================================
// This file is autogenerated - Please do not edit
// Tracks base typescript-fetch mustache 01/02/17
// ===============================================

/* tslint:disable:no-unused-variable */

import superagent = require('superagent');
import { ApiBase } from "../common/apiBase";

export interface AListOfDownloadableFactoryToolVersions_ {
    "linArchiveInfo"?: FactoryToolDownload;
    "winArchiveInfo"?: FactoryToolDownload;
}

export interface FactoryToolDownload {
    /**
     * Download URL path for the specific archive.
     */
    "downloadPath"?: string;
    /**
     * Supported operating system.
     */
    "os"?: string;
    /**
     * The archive filename.
     */
    "filename"?: string;
    /**
     * Factory Tool version.
     */
    "version"?: string;
    /**
     * Generated SHA256 value of the archive file.
     */
    "Sha256"?: string;
    /**
     * Supported client versions for the tool.
     */
    "clientVersions"?: string;
    /**
     * Size of archive file (MB).
     */
    "size"?: string;
}

/**
 * DefaultApi
 */
export class DefaultApi extends ApiBase {

    /** 
     * Returns a specific Factory Tool package in a ZIP archive. * mbed Cloud user role must be Administrator. * mbed Cloud account must have Factory Tool downloads enabled. 
     * @param os Requires Factory Tool OS name (Windows or Linux).
     */
    downloadsMbedFactoryProvisioningPackageGet (os: string, callback?: (error:any, data?:string, response?: superagent.Response) => any): superagent.SuperAgentRequest {
        // verify required parameter "os" is set
        if (os === null || os === undefined) {
            if (callback) {
                callback(new Error("Required parameter 'os' missing when calling 'downloadsMbedFactoryProvisioningPackageGet'."));
            }
            return;
        }

        let headerParams: any = {};

        let queryParameters: any = {};
        if (os !== undefined) {
            queryParameters['os'] = os;
        }

        let useFormData = false;
        let formParams: any = {};

        return this.request({
            url: '/downloads/mbed_factory_provisioning_package',
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    }
    /** 
     * Gets a list of downloadable Factory Tool versions. * mbed Cloud user role must be Administrator. * mbed Cloud account must have Factory Tool downloads enabled. 
     */
    downloadsMbedFactoryProvisioningPackageInfoGet (callback?: (error:any, data?:AListOfDownloadableFactoryToolVersions_, response?: superagent.Response) => any): superagent.SuperAgentRequest {

        let headerParams: any = {};

        let queryParameters: any = {};

        let useFormData = false;
        let formParams: any = {};

        return this.request({
            url: '/downloads/mbed_factory_provisioning_package/info',
            method: 'GET',
            headers: headerParams,
            query: queryParameters,
            useFormData: useFormData,
            formParams: formParams,
            json: true,
        }, callback);
    }
}

