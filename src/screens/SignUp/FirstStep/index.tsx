import React from 'react';
import { useNavigation } from '@react-navigation/native';
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

export function FirstStep() {
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

    return (
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
            </Form>
        </Container>
    );
}
