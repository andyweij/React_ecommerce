import  {createContext} from 'react';

const searchContext = createContext({
    searchKeyWord: ()=>{}
    
});
export const { Provider, Consumer }=searchContext;
export default searchContext;
