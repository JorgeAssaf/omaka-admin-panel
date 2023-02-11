import React from 'react';
import styled from 'styled-components';
import { CardInformacion } from './general-card';

type CardListInterface = {
    data:Array<Object>;
}

export const CardList = ({data}: CardListInterface) => {

    return(
        <div>
            {Object.keys(data).map((current, index) =>(

            <Content>
            <Column>
            {(index + 1) % 2 !== 0 ? <CardInformacion data={data[current]} /> : <div/> }
            </Column>
            <Column>
            {(index + 1) % 2 !== 0 ? <CardInformacion data={data[current]} /> : <div/> }
            </Column>
            </Content> 
            )) 
            }
        </div>

    )};

    const Content = styled.div`
    display:flex;
    flex-direction: row;
    `;
    const Column = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    justify-content: space-between;
    `;