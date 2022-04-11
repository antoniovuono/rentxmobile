import React, { useState } from 'react';
import * as Yup from 'yup';
import {
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Bullet } from '../../../components/Bullet';
import {
    Container,
    Header,
    BulletsWrapper,
    Title,
    SubTitle,
    Form,
    FormTitle,
} from './styles';
import { BackButton } from '../../../components/BackButton';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

export function FirstStep() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [driverLicense, setDriverLicense] = useState('');

    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

    async function handleNextStep() {
        try {
            const schema = Yup.object().shape({
                driverLicense: Yup.string().required('CNH é obrigatória'),
                email: Yup.string()
                    .email('E-mail inválido')
                    .required('E-mail é obrigatório'),
                name: Yup.string().required('O nome é obrigatório'),
            });

            const data = { name, email, driverLicense };

            await schema.validate(data);

            navigation.navigate('SecondStep', { user: data });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return Toast.show({
                    type: 'error',
                    text1: 'Opa',
                    text2: error.message,
                });
            }
        }
    }

    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <BackButton onPress={handleGoBack} />
                        <BulletsWrapper>
                            <Bullet active />
                            <Bullet />
                        </BulletsWrapper>
                    </Header>

                    <Title>Crie sua{'\n'}conta</Title>
                    <SubTitle>
                        Faça seu cadastro de{'\n'}
                        forma rápida e fácil
                    </SubTitle>

                    <Form>
                        <FormTitle>1. Dados</FormTitle>
                        <Input
                            iconName="user"
                            placeholder="Nome"
                            onChangeText={setName}
                        />
                        <Input
                            iconName="mail"
                            placeholder="E-mail"
                            keyboardType="email-address"
                            onChangeText={setEmail}
                        />
                        <Input
                            iconName="credit-card"
                            placeholder="CNH"
                            keyboardType="numeric"
                            onChangeText={setDriverLicense}
                        />
                    </Form>

                    <Button title="Próximo" onPress={handleNextStep} />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
