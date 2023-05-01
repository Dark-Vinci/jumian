export enum AppEnv {
    DEVELOPMENT = 'development',
    STAGING = 'staging',
    PRODUCTION = 'production',
}

export enum ProtoPath {
    ACCOUNT = '../../sdk/src/GRPC/account/account.proto',
    SHOP = '../../sdk/src/GRPC/shops/shops.proto',
    SALES = '../../sdk/src/GRPC/sales/sales.proto',
    FEEDBACK = '../../sdk/src/GRPC/feedback/feedback.proto',
}

export enum RPCUrl {
    ACCOUNT = 'localhost:3006',
    SHOP = 'localhost:3005',
    SALES = 'localhost:3004',
    FEEDBACK = 'localhost:3003',
}

export enum RPCServiceName {
    ACCOUNT = 'account',
    SHOP = 'shops',
    SALES = 'sales',
    FEEDBACK = 'feedback',
}

export const name = 1;