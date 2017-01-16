import { ConnectionOptions } from "../helpers/interfaces";
import { EndpointsApi, NotificationsApi, ResourcesApi, SubscriptionsApi } from "../_api/mds";
import { DefaultApi as CatalogApi } from "../_api/device_catalog";
import { DefaultApi as QueryApi } from "../_api/device_query_service";
export declare class Api {
    endpoints: EndpointsApi;
    notifications: NotificationsApi;
    resources: ResourcesApi;
    subscriptions: SubscriptionsApi;
    catalog: CatalogApi;
    query: QueryApi;
    constructor(options: ConnectionOptions);
}