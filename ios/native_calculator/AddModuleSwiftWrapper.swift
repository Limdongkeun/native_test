import Foundation
import static_lib

@_cdecl("AddModule_InvokeWrapper")
public func AddModule_InvokeWrapper(_ method: NSString, _ args: NSString) -> NSString {
    do {
        let out = try StaticLib.invoke(method: method as String, json: args as String)
        return out as NSString
    } catch {
        return "{\"ok\":false,\"code\":\"E_SWIFT\",\"message\":\"\\(error)\"}" as NSString
    }
}

@_cdecl("AddModule_ListWrapper")
public func AddModule_ListWrapper() -> NSString {
    return StaticLib.listMethods() as NSString
}

// 링크 타기 강제(최적화로 지워지지 않도록)
private let _forceLink_AddModuleFuncs: Void = { _ = AddModule_InvokeWrapper; _ = AddModule_ListWrapper }()