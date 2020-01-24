export declare const METADATA_KEY_SERIALIZABLE = "SERIALIZABLE";
export interface SerializableProperty {
    key: string;
    name: string;
}
export declare function serializable(name?: string): (target: any, key: string) => void;
export declare function getSerializables(target: any): SerializableProperty[];
export declare function serialize(target: any, prototype?: any): Object;
