import  {createContext} from 'react';

const checkContext = createContext({
    checkResult: ()=>{}
    
});
export const { Provider, Consumer }=checkContext;
export default checkContext;
