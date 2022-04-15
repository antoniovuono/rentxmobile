import React, { useState } from 'react';
import {
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import theme from '../../styles/theme';
import { Container, Header, SubTitle, Title, Footer, Form } from './styles';
import { useAuth } from '../../hooks/auth';

export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();
    const { signIn } = useAuth();

    // eslint-disable-next-line consistent-return
    async function handleSignIn() {
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail obrigatórtio')
                    .email('Digite um e-mail válido'),
                password: Yup.string().required('A senha é obrigatória'),
            });

            await schema.validate({ email, password });

            signIn({ email, password });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return Toast.show({
                    type: 'error',
                    text1: 'Erro ao autenticar',
                    text2: error.message,
                });
            }

            Toast.show({
                type: 'error',
                text1: 'Erro ao autenticar',
                text2: 'Ocorreu um erro ao fazer login, verifique as credenciais',
            });
        }
    }

    function handleNewAccount() {
        navigation.navigate('FirstStep');
    }

    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="transparent"
                        translucent
                    />

                    <Header>
                        <Title>Estamos{`\n`}quase lá.</Title>
                        <SubTitle>
                            Faça seu login para começar{`\n`}uma experiência
                            incrível
                        </SubTitle>
                    </Header>

                    <Form>
                        <Input
                            iconName="mail"
                            placeholder="E-mail"
                            keyboardType="email-address"
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={setEmail}
                            value={email}
                        />

                        <PasswordInput
                            iconName="lock"
                            placeholder="Senha"
                            autoCapitalize="none"
                            onChangeText={setPassword}
                            value={password}
                        />
                    </Form>

                    <Footer>
                        <Button
                            title="Login"
                            onPress={handleSignIn}
                            loading={false}
                        />

                        <Button
                            title="Criar conta gratuita"
                            onPress={handleNewAccount}
                            loading={false}
                            color={theme.colors.background_secondary}
                            light
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
