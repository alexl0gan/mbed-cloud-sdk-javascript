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

import { EventEmitter } from "events";
import { CallbackFn } from "../../common/interfaces";
import { asyncStyle } from "../../common/functions";
import { ConnectApi } from "../connectApi";
import { AsyncResponse } from "../types";

/**
 * Resource
 */
export class Resource extends EventEmitter {

    /**
     * Resource notification event which returns the notification when handling notifications, otherwise an asyncId
     * @event
     */
    public static EVENT_NOTIFICATION: string = "notification";

    /**
     * Related device ID
     */
    public readonly deviceId: string;
    /**
     * Resource's URL
     */
    public readonly path: string;
    /**
     * Resource's type
     */
    public readonly type: string;
    /**
     * The content type of the resource
     */
    public readonly contentType: string;
    /**
     * Whether you can subscribe to changes for this resource
     */
    public readonly observable: boolean;

    constructor(init?: Partial<Resource>, private _api?: ConnectApi) {
        super();
        for (const key in init) {
            if (init.hasOwnProperty(key)) {
                this[key] = init[key];
            }
        }

        this.on("newListener", eventName => {
            if (eventName === Resource.EVENT_NOTIFICATION) {
                this.addSubscription( data => this.emit(Resource.EVENT_NOTIFICATION, data));
            }
        });

        this.on("removeListener", eventName => {
            if (eventName === Resource.EVENT_NOTIFICATION) {
                if (this.listenerCount(Resource.EVENT_NOTIFICATION) === 0) {
                    this.deleteSubscription();
                }
            }
        });
    }

    /**
     * Subscribe to a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param notifyFn Function to call with notification
     * @returns empty Promise
     */
    private addSubscription(notifyFn?: (any) => any): Promise<void>;
    /**
     * Subscribe to a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param notifyFn Function to call with notification
     * @param callback A function that is passed any error
     */
    private addSubscription(notifyFn?: (any) => any, callback?: CallbackFn<void>): void;
    private addSubscription(notifyFn?: (any) => any, callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle( done => {
            if (!this.observable) { return done(null, null); }
            this._api.addResourceSubscription(this.deviceId, this.path, notifyFn, done);
        }, callback);
    }

    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     * @returns empty Promise
     */
    private deleteSubscription(): Promise<void>;
    /**
     * Deletes a resource's subscription
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param callback A function that is passed any error
     */
    private deleteSubscription(callback: CallbackFn<void>): void;
    private deleteSubscription(callback?: CallbackFn<void>): Promise<void> {
        return asyncStyle( done => {
            this._api.deleteResourceSubscription(this.deviceId, this.path, done);
        }, callback);
    }

    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The requested mime type format of the value
     * @returns Promise of resource value
     */
    public getValue(timeout?: number, mimeType?: string): Promise<string | number | void>;
    /**
     * Gets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The requested mime type format of the value
     * @param callback A function that is passed the arguments (error, value) where value is the resource value
     */
    public getValue(timeout?: number, mimeType?: string, callback?: CallbackFn<string | number | void>): void;
    public getValue(timeout?: number, mimeType?: any, callback?: CallbackFn<string | number | void>): Promise<string | number | void> {
        if (typeof timeout === "function") {
            callback = timeout;
            timeout = null;
        }
        if (typeof mimeType === "function") {
            callback = mimeType;
            mimeType = null;
        }

        return asyncStyle(done => {
            this._api.getResourceValue(this.deviceId, this.path, timeout, mimeType, done);
        }, callback);
    }

    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param value The value of the resource
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The mime type format of the value
     * @returns the AsyncResponse
     */
    public setValue(value: string, timeout?: number, mimeType?: string): Promise<AsyncResponse>;
    /**
     * Sets the value of a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param value The value of the resource
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The mime type format of the value
     * @param callback A function that is passed any error
     */
    public setValue(value: string, timeout?: number, mimeType?: string, callback?: CallbackFn<AsyncResponse>): void;
    public setValue(value: string, timeout?: number, mimeType?: any, callback?: CallbackFn<AsyncResponse>): Promise<AsyncResponse> {
        if (typeof timeout === "function") {
            callback = timeout;
            timeout = null;
        }
        if (typeof mimeType === "function") {
            callback = mimeType;
            mimeType = null;
        }

        return asyncStyle(done => {
            this._api.setResourceValue(this.deviceId, this.path, value, timeout, mimeType, done);
        }, callback);
    }

    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param payload The payload to be sent to the device.
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The content type of the payload
     * @param accepts The content type of an accepted response
     * @returns the AsyncResponse
     */
    public execute(payload?: any, timeout?: number, mimeType?: string, accepts?: string): Promise<AsyncResponse>;
    /**
     * Execute a function on a resource
     *
     * __Note:__ This method requires a notification channel to be set up
     * @param payload The payload to be sent to the device.
     * @param timeout async request will timeout after given number of milliseconds
     * @param mimeType The content type of the payload
     * @param accepts The content type of an accepted response
     * @param callback A function that is passed any error
     */
    public execute(payload?: any, timeout?: number, mimeType?: string, accepts?: string, callback?: CallbackFn<AsyncResponse>): void;
    public execute(payload?: any, timeout?: number, mimeType?: any, accepts?: string, callback?: CallbackFn<AsyncResponse>): Promise<AsyncResponse> {
        if (typeof payload === "function") {
            callback = payload;
            payload = null;
        }
        if (typeof timeout === "function") {
            callback = timeout;
            timeout = null;
        }
        if (typeof accepts === "function") {
            callback = accepts;
            accepts = null;
        }
        if (typeof mimeType === "function") {
            callback = mimeType;
            mimeType = null;
        }

        return asyncStyle(done => {
            this._api.executeResource(this.deviceId, this.path, timeout, mimeType, accepts, payload, done);
        }, callback);
    }

    /**
     * Gets the status of a resource's subscription
     * @returns Promise containing resource subscription status
     */
    public getSubscription(): Promise<boolean>;
    /**
     * Gets the status of a resource's subscription
     * @param callback A function that is passed (error, subscribed) where subscribed is true or false
     */
    public getSubscription(callback: CallbackFn<boolean>): void;
    public getSubscription(callback?: CallbackFn<boolean>): Promise<boolean> {
        return asyncStyle( done => {
            if (!this.observable) { return done(null, false); }
            this._api.getResourceSubscription(this.deviceId, this.path, done);
        }, callback);
    }
}
