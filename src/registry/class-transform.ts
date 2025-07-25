import {IClassTransform, IClassTransformProps} from "@interfaces/loader";

export default abstract class ClassTransform {

    static toClassInstance(plainObject: Object, classTran: IClassTransform): Object {
        const rawObj: Object = this.plainToInstance(classTran.classModule, plainObject);
        const transedObj: Object = this.instanceToTransform(rawObj, classTran.transProps);
        return transedObj;
    }

     private static instanceToTransform(obj: Object, properties: IClassTransformProps[]): Object {
        for ( const property of properties) {
            obj[property.key] = property.callBack(obj[property.key]);
        }
        return obj;
    }

     private static plainToInstance<T>(cls: new () => T, plainObj: object): T {
        const instance = new cls();
        for (const key in plainObj) {
            if (Object.prototype.hasOwnProperty.call(plainObj, key)) {
                (instance as any)[key] = (plainObj as any)[key];
            }
        }
        return instance;
    }

}