export class Utils {

    static equals<T>(value: T, ...comparables: T[]): boolean {
        return !!(comparables.find(comparable => value === comparable));
    }

    static isBoolean(value: any): boolean {
        return typeof value === "boolean";
    }

    static isDefined(value: any): boolean {
        return value !== undefined && value !== null;
    }

    static isFunction(value: any): boolean {
        return typeof value === "function";
    }

    static isNumber(value: any): boolean {
        return typeof value === "number";
    }

    static isObject(value: any): boolean {
        return typeof value === "object";
    }

    static isTrueObject(value: any): boolean {
        return Utils.isDefined(value) && Utils.isObject(value);
    }

    static isNonEmptyObject(value: object): boolean {
        return Utils.isTrueObject(value) && Object.getOwnPropertyNames(value).length > 0;
    }

    static isString(value: any): boolean {
        return typeof value === "string";
    }

    static isEmptyString(value: string | null | undefined): boolean {
        return !Utils.isString(value) || value.length === 0;
    }

    static maskToString(mask: string | RegExp | (string | RegExp)[]): string | string[] {

        if (Utils.isString(mask)) {

            return mask as string;

        } else if (mask instanceof RegExp) {

            return mask.toString();

        } else if (Array.isArray(mask)) {

            return mask.map(value => Utils.maskToString(value)) as string[];
        }
    }

    static maskFromString(mask: string | string[]): string | RegExp | (string | RegExp)[] {

        if (Utils.isString(mask)) {

            let isRegExp = (mask as string).startsWith("/") && (mask as string).endsWith("/");

            return isRegExp ? new RegExp((mask as string).slice(1, mask.length - 1)) : mask;

        } else if (Array.isArray(mask)) {

            return (mask as string[]).map(value => Utils.maskFromString(value)) as string[];
        }
    }

    static merge(baseValue: any, defaultValue: any): any {

        if (!Utils.isDefined(baseValue)) {
            return defaultValue;
        }

        if (Utils.isObject(baseValue)) {

            for (let property in baseValue) {

                if (baseValue.hasOwnProperty(property) && Utils.isObject(baseValue[property])) {

                    baseValue[property] = Utils.merge(baseValue[property], defaultValue ? defaultValue[property] : null);
                }
            }

            return defaultValue ? Object.assign(defaultValue, baseValue) : baseValue;
        }

        return baseValue;
    }

    static parseJSONReviver(key: string, value: any): any {

        let regexDateISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;

        return Utils.isString(value) && regexDateISO.test(value) ? new Date(value) : value;
    }

    static log(msg: string) {
      console.log('%c' + msg, 'color: lightgray');
    }
    static warn(msg: string) {
      console.log(msg);
    }
    static err(msg: string) {
      console.log('%c' + msg, 'color: darkred');
    }
  
    /**
     * access object properties by dot notation or bracket notation
     * 
     * @param obj 
     * @param prop 
     * @param newVal 
     */
    static val(obj: any, prop: string, newVal?: any) {
      if (!prop || obj.constructor !== Object) {
        return undefined;
      }
      // TODO: convert bracket notation to dot notation. Specially, property name with dots or brackets.
      if (prop.indexOf('[') >= 0) {
        prop = prop.replace(/\[/g, '.').replace(/[\]"]/g, '');
      }
      return prop.split('.').reduce((o, k, i, a) => {
        if (o === undefined) {
          this.warn('The property ' + a.join('.') + ' not found!');
          return o;
        }
        if (i === a.length - 1 && newVal !== undefined) {
          // reach last prop key (dot notation)
          if (o[k] && o[k].constructor !== newVal.constructor) {
            Utils.err('object type mismatched! (' + k + ')');
          } else {
            o[k] = newVal;
          }
        } else if (o[k] === undefined && newVal !== undefined) {
          // rebuild the object structure
          o[k] = {};
        }
        return o[k];
      }, obj);
    }
}