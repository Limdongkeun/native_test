import Foundation
import static_lib
import Foundation
import React

@objc(AddModule)
class AddModule: NSObject {

  // RN에서 호출하는 단일 엔트리포인트
  @objc(invoke:withArgs:withResolver:withRejecter:)
  func invoke(_ method: NSString,
              withArgs args: NSString,
              withResolver resolve: @escaping RCTPromiseResolveBlock,
              withRejecter reject: @escaping RCTPromiseRejectBlock) {
    do {
      let out = try StaticLib.invoke(method: method as String,
                                     json: args as String)
      print("[네이티브]out=\(out)")
      resolve(out)  // JSON string
    } catch {
      reject("E_INVOKE", "\(error)", error)
    }
  }

  // (선택) 메서드 목록
  @objc(methods:withRejecter:)
  func methods(_ resolve: @escaping RCTPromiseResolveBlock,
               withRejecter reject: @escaping RCTPromiseRejectBlock) {
    resolve(StaticLib.listMethods())
  }

  @objc static func requiresMainQueueSetup() -> Bool { false }
}