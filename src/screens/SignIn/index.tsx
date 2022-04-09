import React, { useState } from 'react';
import {
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import theme from '../../styles/theme';

import { Container, Header, SubTitle, Title, Footer, Form } from './styles';

export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSignIn() {}

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
                            onPress={() => {}}
                            enabled
                            loading={false}
                        />

                        <Button
                            title="Criar conta gratuita"
                            onPress={handleSignIn}
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
