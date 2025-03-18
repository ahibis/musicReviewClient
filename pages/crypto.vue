<template>
  <div class="flex justify-center pt-10">
    <div>
      <p>сообщение:</p>
      <UInput v-model="message" /><br>
      <UButton color="secondary" @click="signAndSendMessage">Подписать и отправить сообщение</UButton>
      <p>Статус верификации: {{ verificationStatus }}</p>
      <UButton color="secondary" @click="requestAndVerifyMessage">Получить сообщение</UButton>
      <p>{{ serverMessageRef }}</p>
      <p>Статус верификации: {{ clientVerificationStatus }}</p>

    </div>

  </div>
</template>

<script lang="ts" setup>
import JSEncrypt from 'jsencrypt';
import sha256 from 'crypto-js/sha256';
import Hex from 'crypto-js/enc-hex';



const message = ref('Hello, Server!');
const verificationStatus = ref('');
const clientPrivateKey = ref('');
const clientPublicKey = ref('');
const serverPublicKey = ref('');
const serverMessageRef = ref('');
const clientVerificationStatus = ref('');

const generateKeys = () => {
  const encrypt = new JSEncrypt({ default_key_size: "2048" });
  encrypt.getKey(); // Генерация ключей
  clientPrivateKey.value = encrypt.getPrivateKey();
  clientPublicKey.value = encrypt.getPublicKey();
  console.log('Ключи сгенерированы:', { privateKey: clientPrivateKey.value, publicKey: clientPublicKey.value });
};

const sendPublicKeyToServer = async () => {
  try {
    await $fetch('http://localhost:8080/crypto/set-client-public-key', {
      method: 'POST',
      body: { publicKey: clientPublicKey.value },
    });
    console.log('Открытый ключ отправлен на сервер');
  } catch (error) {
    console.error('Ошибка при отправке ключа:', error);
  }
};

// Подписание сообщения
const signMessage = (message: string) => {
  if (clientPrivateKey.value == "") {
    generateKeys();
  }
  const encrypt = new JSEncrypt();
  encrypt.setPrivateKey(clientPrivateKey.value);
  const hash = sha256(message).toString(Hex);
  return encrypt.sign(hash, (data) => sha256(data).toString(Hex), 'sha256');
};

// Отправка подписанного сообщения на сервер
const signAndSendMessage = async () => {
  const signedMessage = signMessage(message.value);
  console.log(signedMessage);
  await sendPublicKeyToServer();
  try {
    const response = await $fetch<{ status: string }>('http://localhost:8080/crypto/verify', {
      method: 'POST',
      body: { signedMessage, message: message.value },
    });
    verificationStatus.value = response.status;
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
    verificationStatus.value = 'Ошибка';
  }
};


// Запрос открытого ключа сервера
const requestServerPublicKey = async () => {
  try {
    const response = await $fetch<{ publicKey: string }>('http://localhost:8080/crypto/get-server-public-key');
    serverPublicKey.value = response.publicKey;
    console.log('Открытый ключ сервера получен:', serverPublicKey.value);
  } catch (error) {
    console.error('Ошибка при запросе ключа сервера:', error);
  }
};


// Запрос и верификация сообщения от сервера
const requestAndVerifyMessage = async () => {
  try {
    await requestServerPublicKey();
    const messageResponse = await $fetch('http://localhost:8080/crypto/generate-message');
    const { message: serverMessage, signedMessage } = messageResponse as { message: string, signedMessage: string };
    serverMessageRef.value = serverMessage
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(serverPublicKey.value);
    const hash = sha256(serverMessage).toString(Hex);
    console.log(serverMessage, signedMessage)
    clientVerificationStatus.value = encrypt.verify(hash, signedMessage, (data) => sha256(data).toString(Hex))
      ? 'Verified'
      : 'Not Verified';
  } catch (error) {
    console.error('Ошибка:', error);
    clientVerificationStatus.value = 'Ошибка';
  }
};
</script>
