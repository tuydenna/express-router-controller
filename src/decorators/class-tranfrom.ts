import "reflect-metadata"
import {ClassMetaKey} from "@constant/metadakey";

function Transform(callBack: (value: unknown) => unknown) {
	return function (target: any, propertyKey: string) {
		const existingKeys = Reflect.getMetadata(ClassMetaKey.property, target) || [];
		Reflect.defineMetadata(ClassMetaKey.property, [...existingKeys, {key: propertyKey, callBack}], target);
	};
}

function ToNumber(value: string): number {
	return +value
}

export {Transform, ToNumber};