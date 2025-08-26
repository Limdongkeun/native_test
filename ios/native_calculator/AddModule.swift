import Foundation
import React
import static_lib

@objc(AddModule)
class AddModule: NSObject, RCTBridgeModule {
  @objc static func moduleName() -> String! { "AddModule" }
  @objc static func requiresMainQueueSetup() -> Bool { false }

  @objc(add:withB:withResolver:withRejecter:)
  func add(_ a: NSNumber,
           withB b: NSNumber,
           withResolver resolve: @escaping RCTPromiseResolveBlock,
           withRejecter reject: @escaping RCTPromiseRejectBlock) {
    print("[AddModule] add called a=\(a), b=\(b)")
    let sum = StaticCalculator.add(a.intValue, b.intValue)
    resolve("네이티브 호출됨 ✅ 결과 = \(sum)")
  }
}