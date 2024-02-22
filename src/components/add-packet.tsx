import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import Input from './input';
import {Search} from 'lucide-react-native';
import {useToast} from './toast';
import Dialog from 'react-native-dialog';
import {useState} from 'react';
import {packetClient} from '../services/packet/packet.client';
import useToken from '../hooks/use-token';
import {useQueryClient} from '@tanstack/react-query';

export default function AddPacket() {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [creating, setCreating] = useState(false);
  const {toast} = useToast();
  const authorization = useToken();
  const queryClient = useQueryClient();

  const {mutate: createPacket, isPending} =
    packetClient.createPacket.useMutation({
      onSuccess: () => {
        toast(`Encomenda ${name} adicionada com sucesso!`, 'success');
        queryClient.invalidateQueries({
          queryKey: ['packets'],
        });
        reset();
      },
      onError: () => toast('Erro ao adicionar encomenda', 'destructive'),
    });

  const onAddPacket = async () => {
    createPacket({body: {code, name}, headers: {authorization}});
  };

  const reset = () => {
    setCreating(false);
    setName('');
    setCode('');
  };

  return (
    <>
      <View className="relative flex flex-col items-center justify-center mt-4">
        <Input
          className="bg-white rounded-[8px] h-12 w-full"
          placeholder="AB1234566CD"
          value={code}
          onChange={e => setCode(e.nativeEvent.text)}
        />
        <TouchableOpacity
          onPress={() => setCreating(true)}
          className="absolute right-3"
        >
          <Search size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <Dialog.Container visible={creating}>
        <Dialog.Title>Nova encomenda</Dialog.Title>
        <Dialog.Description>
          Digite um nome para sua nova encomenda.
        </Dialog.Description>
        <Dialog.Input
          value={name}
          onChange={e => setName(e.nativeEvent.text)}
        />
        {!isPending && <Dialog.Button onPress={reset} label="Cancelar" />}
        {!isPending && <Dialog.Button onPress={onAddPacket} label="Criar" />}

        {isPending && <ActivityIndicator className="mb-5" />}
      </Dialog.Container>
    </>
  );
}
