import {getMetadataNaming} from "@util/decorator";

const ControllerMetaKey = {
    path: getMetadataNaming("path"),
    prefix: getMetadataNaming("prefix"),
    method: getMetadataNaming("method"),
    middleware: getMetadataNaming("middleware"),
} as const;

const ArgMetaKey = {
    params: getMetadataNaming("arg:param_"),
    query: getMetadataNaming("arg:query_"),
    body: getMetadataNaming("arg:body_"),
    res: getMetadataNaming("arg:res_"),
    req: getMetadataNaming("arg:req_"),
} as const;

const ClassMetaKey = {
    property: getMetadataNaming("properties"),
}

export {ControllerMetaKey, ArgMetaKey, ClassMetaKey}