#import "AddModule.h"
#import <React/RCTBridge+Private.h>
#import <ReactCommon/RCTTurboModule.h>
#import "NativeCalculatorSpecsJSI.h"
extern "C" NSString *AddModule_InvokeWrapper(NSString *method, NSString *args);
extern "C" NSString *AddModule_ListWrapper(void);

// static_lib 브리징 (Swift 심볼을 ObjC에서 쓰려면 <ModuleName>/<ModuleName>-Swift.h 가 생성됨)
// 정적 xcframework를 Swift로 작성했다면 ObjC에서 직접 접근하지 말고 아래처럼 C 함수 래퍼를 두는 편이 깔끔합니다.
// 우리는 여기서 Swift를 거치지 않고, Swift 쪽 기능을 "AddModule.mm"에서 호출하지 않습니다.
// 대신 Swift 정적 라이브러리의 기능을 네이티브 Swift 파일에서 래핑해도 괜찮습니다.

using namespace facebook;
using namespace facebook::react;

@implementation AddModule
RCT_EXPORT_MODULE();

// TurboModule 인스턴스 바인딩 (JSI)
- (std::shared_ptr<TurboModule>)getTurboModule:(const ObjCTurboModule::InitParams &)params
{
//   return std::make_shared<NativeCalculatorSpecsJSI>(params);
return std::make_shared<NativeAddModuleSpecJSI>(params);
}

// Spec에 선언된 메서드 구현

- (void)invoke:(NSString *)method
          args:(NSString *)args
       resolve:(RCTPromiseResolveBlock)resolve
        reject:(RCTPromiseRejectBlock)reject
{
  @try {
    // StaticLib.invoke 를 Swift(정적 라이브러리)에서 호출 -> JSON String
    // ObjC에서 Swift 심볼을 바로 부르지 않는다면, 기존 Old Bridge에서 하던 방식대로
    // Swift 파일(앱 타겟)에 아래 C 함수 래퍼를 만들어 연결할 수 있습니다.
    // 여기서는 간단히 NSBundle 경유 Swift 호출 없이, 앱 내 Swift 파일에 만든 래퍼를 부른다고 가정:

      // extern NSString* AddModule_InvokeWrapper(NSString*, NSString*);
      NSString *raw = AddModule_InvokeWrapper(method, args);
      NSData *data = [raw dataUsingEncoding:NSUTF8StringEncoding];
      id parsed = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
      resolve(@{ @"raw": raw ?: @"", @"parsed": parsed ?: [NSNull null] });
  }
  @catch (NSException *e) {
    reject(@"E_INVOKE", e.reason, nil);
  }
}

- (void)methods:(RCTPromiseResolveBlock)resolve
        reject:(RCTPromiseRejectBlock)reject
{
  // StaticLib.listMethods() 를 호출해서 문자열을 반환하도록 동일 래퍼를 사용
  // extern NSString* AddModule_ListWrapper(void);
  resolve(AddModule_ListWrapper());
}

@end