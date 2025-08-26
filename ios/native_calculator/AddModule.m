#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(AddModule, NSObject)

RCT_EXTERN_METHOD(add:(nonnull NSNumber *)a
                  withB:(nonnull NSNumber *)b
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup { return NO; }
@end