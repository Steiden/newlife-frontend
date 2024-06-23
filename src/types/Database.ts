export type AdvertType = {
    id?: number;
    title?: string;
    description?: string;
    animal_type_id?: number;
    advert_address_id?: number;
    user_id?: number;
    advert_status_id?: number;
    created_at?: Date;
    updated_at?: Date;
    animal_type?: AnimalTypeType;
    advert_address?: AdvertAddressType;
    user?: UserType;
    advert_status?: AdvertStatusType;
    advert_photos?: AdvertPhotoType[];
}

export type AdvertAddressType = {
    id?: number;
    street_name?: string;
    house_number?: string;
    locality_id?: number;
    created_at?: Date;
    updated_at?: Date;
    locality?: LocalityType;
}

export type AdvertPhotoType = {
    id?: number;
    image?: string;
    advert_id?: number;
    created_at?: Date;
    updated_at?: Date;
}

export type AdvertStatusType = {
    id?: number;
    name?: string;
    created_at?: Date;
    updated_at?: Date;
}

export type AnimalTypeType = {
    id?: number;
    name?: string;
    created_at?: Date;
    updated_at?: Date;
}

export type LocalityType = {
    id?: number;
    name?: string;
    region_id?: number;
    created_at?: Date;
    updated_at?: Date;
    region?: RegionType;
}

export type RegionType = {
    id?: number;
    name?: string;
    created_at?: Date;
    updated_at?: Date;
}

export type RoleType = {
    id?: number;
    name?: string;
    created_at?: Date;
    updated_at?: Date;
}

export type UserType = {
    id?: number;
    second_name?: string;
    first_name?: string;
    patronymic?: string;
    telephone?: string;
    email?: string;
    login?: string;
    password?: string;
    is_banned?: boolean;
    role_id?: number;
    created_at?: Date;
    updated_at?: Date;
    role?: RoleType;
    adverts?: AdvertType[];
}

export type UserActionType = {
    id?: number;
    user_action_type_id?: number;
    user_id?: number;
    created_at?: Date;
    updated_at?: Date;
    user_action_type?: UserActionTypeType;
    user?: UserType;
}

export enum UserActionTypeEnum {
    CREATE_ADVERT = 1,
    UPDATE_ADVERT = 2,
    DELETE_ADVERT = 3,
    UPDATE_ACCOUNT = 4,
    LOG_IN = 5
}

export type UserActionTypeType = {
    id?: number;
    name?: UserActionTypeEnum;
    created_at?: Date;
    updated_at?: Date;
}

export type UserBlockingType = {
    id?: number;
    period?: number;
    reason?: string;
    user_id?: number;
    created_at?: Date;
    updated_at?: Date;
    user?: UserType;
}