
import { styled } from '@mui/material'
import { Link as LinkComponenet } from 'react-router-dom';


export const VisuallyHiddenInput = styled('input')({
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1,
});

export const Link = styled(LinkComponenet)`
text-decoration: none;
color: black ;
padding: 1rem;
&:hover {
    
    background-color:rgb(0, 0, 0,0.3);
}


`;

export const InputBox = styled('input')({
    width: '100%',
    height: '80%',
    padding: '0 2rem',
    color: 'white',
    outline: 'none',
    border: 'none',


    background: 'transparent',
    // color: 'black',
    // fontSize: '1rem',
    // fontWeight: 'bold',

})

export const SearchField = styled('input')`
padding: 0.5rem;
width: 20vmax;

border: none;
outline: none;
font-size: 1.1rem;
color: white;
background-color:#9e9e9e;
border-radius: 1.5rem;

`;

export const CurveButton = styled('button')`
    padding: 0.5rem ;   
    border: none;
    outline: none;
    font-size: 1.rem;
    color: white;
    background-color: black;
    border-radius: 1.5rem;
    cursor: pointer;
    &:hover {
     background-color: #900000;
}   


`;
