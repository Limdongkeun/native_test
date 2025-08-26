import Foundation
import React
import static_lib

// @objc(AddModule)
// class AddModule: NSObject, RCTBridgeModule {
//   @objc static func moduleName() -> String! { "AddModule" }
//   @objc static func requiresMainQueueSetup() -> Bool { false }
//
//   @objc(add:withB:withResolver:withRejecter:)
//   func add(_ a: NSNumber,
//            withB b: NSNumber,
//            withResolver resolve: @escaping RCTPromiseResolveBlock,
//            withRejecter reject: @escaping RCTPromiseRejectBlock) {
//     print("[AddModule] add called a=\(a), b=\(b)")
//     let sum = StaticCalculator.add(a.intValue, b.intValue)
//     resolve("네이티브 호출됨 ✅ 결과 = \(sum)")
//   }
// }
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