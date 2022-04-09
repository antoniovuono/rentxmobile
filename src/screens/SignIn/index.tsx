import React, { useState } from 'react';
import {
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native';
import * as Yup from 'yup';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import theme from '../../styles/theme';

import { Container, Header, SubTitle, Title, Footer, Form } from './styles';

export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            Alert.alert('Deu certo!');
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return Alert.alert('Opa', error.message);
            }

            Alert.alert(
                'Erro ao autenticar',
                'Ocorreu um erro ao fazer login, verifique as credenciais ',
            );
        }
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
                            onPress={() => {}}
                            enabled={false}
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
