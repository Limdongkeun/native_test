#import <React/RCTBridgeModule.h>


@interface RCT_EXTERN_MODULE(AddModule, NSObject)
RCT_EXTERN_METHOD(invoke:(nonnull NSString *)method
                  withArgs:(nonnull NSString *)args
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(methods:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
+ (BOOL)requiresMainQueueSetup { return NO; }
@end