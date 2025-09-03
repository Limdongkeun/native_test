
/**
 * Sample React Native App adjusted to call a native Swift module
 */

import AddModule from './src/native/NativeAddModule';
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
} from 'react-native';

type InvokeResponse = { raw: string; parsed: any };

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);

  const runOp = async (op: 'calc.add' | 'calc.multiply' | 'calc.divide' | 'calc.modulo' | 'calc.addDouble') => {
    const aNum = Number(a);
    const bNum = Number(b);
    if (Number.isNaN(aNum) || Number.isNaN(bNum)) {
      Alert.alert('입력 오류', '숫자를 입력해 주세요.');
      return;
    }
    try {
      const res: InvokeResponse = await AddModule.invoke(op, JSON.stringify({ a: aNum, b: bNum }));
      if (res?.parsed?.ok) {
        setResult(`Native(Turbo): ${String(res.parsed.result)}`);
      } else {
        setResult(`Error: ${JSON.stringify(res)}`);
      }
    } catch (e: any) {
      Alert.alert('에러', e?.message ?? String(e));
    }
  };

  const onAdd = () => runOp('calc.add');
  const onMultiply = () => runOp('calc.multiply');
  const onDivide = () => runOp('calc.divide');
  const onModulo = () => runOp('calc.modulo');
  const onAddDouble = () => runOp('calc.addDouble');


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

      <View style={styles.buttonsRow}>
        <View style={styles.buttonWrap}><Button title="+더하기+" onPress={onAdd} /></View>
        <View style={styles.buttonWrap}><Button title="*곱하기*" onPress={onMultiply} /></View>
        <View style={styles.buttonWrap}><Button title="/나누기/" onPress={onDivide} /></View>
        <View style={styles.buttonWrap}><Button title="%나머지%" onPress={onModulo} /></View>
        <View style={styles.buttonWrap}><Button title="두번 더하기" onPress={onAddDouble} /></View>
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
  buttonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  buttonWrap: {
    minWidth: 110,
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
