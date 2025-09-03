module.exports = {
  project: { ios: {}, android: {} },
  reactNativePath: './node_modules/react-native',
  codegenConfig: {
    // 일부 버전에서 아래 단일 오브젝트가 무시되는 경우가 있어
    // libraries 배열 형태로도 같이 명시해주는 편이 안전합니다.
    name: 'NativeCalculatorSpecs',
    type: 'modules',
    jsSrcsDir: './src/native',
    libraries: [
      {
        name: 'NativeCalculatorSpecs',
        type: 'modules',
        jsSrcsDir: './src',
      },
    ],
  },
};