import React from 'react';
import styled from 'styled-components';
import { CardInformacion } from './general-card';

type CardListInterface = {
    data:Array<Object>;
}

export const CardList = ({data}: CardListInterface) => {

    return(
            <Content>
            <Column>
            {Object.keys(data).map((current, index) =>{
                if (index % 2 === 0 ){
                    return (
                    <CardInformacion data={data[current]} />) }
            })}
            </Column>
            <Column>
            {Object.keys(data).map((current, index) =>{
                if (index % 2 !== 0 ){
                    return(
                        <CardInformacion data={data[current]} />
                    )}
            })}
            </Column>
            </Content> 
    )
    };

    const Content = styled.div`
    display:flex;
    flex-direction: row;
    `;
    const Column = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    `;