export declare class Utils {
    static equals<T>(value: T, ...comparables: T[]): boolean;
    static isBoolean(value: any): boolean;
    static isDefined(value: any): boolean;
    static isFunction(value: any): boolean;
    static isNumber(value: any): boolean;
    static isObject(value: any): boolean;
    static isTrueObject(value: any): boolean;
    static isNonEmptyObject(value: object): boolean;
    static isString(value: any): boolean;
    static isEmptyString(value: string | null | undefined): boolean;
    static maskToString(mask: string | RegExp | (string | RegExp)[]): string | string[];
    static maskFromString(mask: string | string[]): string | RegExp | (string | RegExp)[];
    static merge(baseValue: any, defaultValue: any): any;
    static parseJSONReviver(key: string, value: any): any;
    static log(msg: string): void;
    static warn(msg: string): void;
    static err(msg: string): void;
    /**
     * access object properties by dot notation or bracket notation
     *
     * @param obj
     * @param prop
     * @param newVal
     */
    static val(obj: any, prop: string, newVal?: any): any;
}
