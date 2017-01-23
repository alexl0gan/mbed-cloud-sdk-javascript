export interface DevicesApiType {
    /**
     * Whether webhooks or long polling are being used on this API
     */
    polling: boolean;
}
export declare type MechanismEnum = "connector" | "direct";
export declare type DeviceStateEnum = "unenrolled" | "cloud_enrolling" | "bootstrapped" | "registered";
export declare type DeploymentEnum = "development" | "production";
export interface DeviceType {
    /**
     * The key used to provision the device
     */
    provisionKey?: string;
    /**
     * The ID of the channel used to communicate with the device
     */
    mechanism?: MechanismEnum;
    /**
     * The current state of the device
     */
    state?: DeviceStateEnum;
    /**
     * The state of the device's deployment
     */
    deployedState?: DeploymentEnum;
    /**
     * The ID of the device
     */
    id?: string;
    /**
     * The name of the device
     */
    name?: string;
    /**
     * The description of the device
     */
    description?: string;
    /**
     * The time the device was bootstrapped
     */
    bootstrappedTimestamp?: string;
    /**
     * The time the device was updated
     */
    updatedAt?: Date;
    /**
     * Up to 5 custom JSON attributes
     */
    customAttributes?: {};
    /**
     * The device class
     */
    deviceClass?: string;
    /**
     * Mark this device for auto firmware update
     */
    autoUpdate?: boolean;
    /**
     * The serial number of the device
     */
    serialNumber?: string;
    /**
     * The device vendor ID
     */
    vendorId?: string;
    /**
     * The owning IAM account ID
     */
    accountId?: string;
    /**
     * The device trust level
     */
    trustLevel?: number;
    /**
     * The device trust class
     */
    trustClass?: number;
    /**
     * The last deployment used on the device
     */
    deployment?: string;
    /**
     * The address of the connector to use
     */
    mechanismUrl?: string;
    /**
     * The time the device was created
     */
    createdAt?: Date;
    /**
     * URL for the current device manifest
     */
    manifest?: string;
}
export interface DeviceEventType {
    /**
     * The ID of the device
     */
    id?: string;
    /**
     * The type of the device
     */
    type?: string;
    /**
     * The queue mode of the device
     */
    queueMode?: boolean;
    /**
     * The resources of the device
     */
    resources?: ResourceType[];
}
export interface ResourceType {
    /**
     * Whether you can subscribe to changes for this resource
     */
    observable: boolean;
    /**
     * Resource's type
     */
    type: string;
    /**
     * The content type of the resource
     */
    contentType: string;
    /**
     * Resource's url
     */
    path: string;
    /**
     * Related device ID
     */
    deviceId?: string;
}
export interface QueryType {
    /**
     * The ID of the query
     */
    id: string;
    /**
     * The name of the query
     */
    name?: string;
    /**
     * The device query
     */
    query?: string;
    /**
     * The description of the query
     */
    description?: string;
    /**
     * The time the query was created
     */
    createdAt?: Date;
    /**
     * The time the query was updated
     */
    updatedAt?: Date;
}
export interface WebhookType {
    /**
     * The URL to which the notifications must be sent
     */
    url?: string;
    /**
     * Headers (key/value) that must be sent with the request
     */
    headers?: {
        [key: string]: string;
    };
}
export interface PresubscriptionType {
    id?: string;
    type?: string;
    resourcePaths?: string[];
}
