import { createGlobalStyle } from 'styled-components';
import OpenSans from 'assets/fonts/OpenSans/OpenSans-Regular.ttf';

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'OpenSans';
    font-style: normal;
    font-weight: normal;
    src: local('OpenSans'), url(${OpenSans}) format('truetype');
    }   

    * {
    /*temporary helper
    uncomment to see borders of every HTML element on the website, helps with positioning*/
    /* border: 1px blue solid;  */
    }

  body, html {
        margin: 0;
        padding: 0;
        font-family: 'OpenSans';
    }

    *, *:before, *:after {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        font-family: inherit;
        color: ${({ theme }) => theme.font};
    }

    
    main, header{
        color: ${({ theme }) => theme.font};
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .Toastify__toast-body {
        color: #fff;
    }

    .Toastify__toast-body > div {
        color: #fff;
    }

    .Toastify__close-button > svg {
        fill: #fff;
    }
`;

export default GlobalStyle;
