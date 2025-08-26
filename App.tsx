
/**
 * Sample React Native App adjusted to call a native Swift module
 */

import React, {useState} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
  NativeModules,
} from 'react-native';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);

  const onAdd = async () => {
    const aNum = Number(a);
    const bNum = Number(b);

    if (Number.isNaN(aNum) || Number.isNaN(bNum)) {
      Alert.alert('입력 오류', '숫자를 입력해 주세요.');
      return;
    }
    console.log('NativeModules keys:', Object.keys(NativeModules));
    try {
      const { AddModule } = NativeModules as any;
      if (AddModule?.add) {
        const msg: string = await AddModule.add(aNum, bNum);
        setResult(`Native: ${msg}`);
      } else {
        setResult(`JS 경로(네이티브 모듈 없음): ${aNum + bNum}`);
      }
    } catch (e: any) {
      Alert.alert('에러', e?.message ?? String(e));
    }
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <Text style={styles.title}>Native Calculator</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="첫 번째 숫자"
          keyboardType="number-pad"
          value={a}
          onChangeText={setA}
        />
        <Text style={styles.plus}>＋</Text>
        <TextInput
          style={styles.input}
          placeholder="두 번째 숫자"
          keyboardType="number-pad"
          value={b}
          onChangeText={setB}
        />
      </View>

      <View style={styles.buttonWrap}>
        <Button title="더하기" onPress={onAdd} />
      </View>

      <Text style={styles.resultLabel}>결과</Text>
      <Text style={styles.resultValue}>
        {result ?? '-'}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  containerDark: {
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 18,
  },
  plus: {
    marginHorizontal: 10,
    fontSize: 22,
    fontWeight: '700',
  },
  buttonWrap: {
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  resultLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 6,
  },
  resultValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default App;
